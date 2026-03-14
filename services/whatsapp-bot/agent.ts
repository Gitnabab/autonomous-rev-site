import OpenAI from "openai";
import { config, SYSTEM_PROMPT } from "./config.js";
import { getConversation, addMessage } from "./store.js";

// ── OpenAI-Compatible Client (works with OpenRouter, etc.) ──────
const openai = new OpenAI({
    apiKey: config.openai.apiKey,
    baseURL: config.openai.baseUrl,
});

// ── Response Parsing ────────────────────────────────────────────
interface AgentResponse {
    think: string;
    sms: string;
}

/**
 * Strip ALL XML-like tags (think, sms, etc.) from text.
 * Safety net to ensure no tags ever leak to the customer.
 */
function sanitize(text: string): string {
    return text
        .replace(/<\/?think>/gi, "")
        .replace(/<\/?sms>/gi, "")
        .replace(/<\/?message>/gi, "")
        .replace(/```[\s\S]*?```/g, "")   // strip markdown code blocks
        .trim();
}

function parseResponse(raw: string): AgentResponse {
    // Handle various LLM response quirks: markdown-wrapped tags, extra whitespace, etc.
    const cleaned = raw.replace(/```(?:xml|html)?\n?/g, "").replace(/```/g, "");

    const thinkMatch = cleaned.match(/<think>([\s\S]*?)<\/think>/i);
    const smsMatch = cleaned.match(/<sms>([\s\S]*?)<\/sms>/i);

    let smsContent: string;
    if (smsMatch) {
        smsContent = smsMatch[1].trim();
    } else {
        // Fallback: strip <think> block entirely, use remaining text
        smsContent = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
    }

    // Final safety: strip any remaining tags
    smsContent = sanitize(smsContent);

    return {
        think: thinkMatch?.[1]?.trim() ?? "",
        sms: smsContent || "Hi! How can I help you today? — Orion Pest Solutions",
    };
}

// ── Agent Core ──────────────────────────────────────────────────

const FALLBACK_MSG =
    "Hi! Sorry, we're experiencing a brief technical issue. Please reply again in a minute and we'll get right back to you. — Orion Pest Solutions";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Process a customer SMS message through the LLM agent.
 * Returns the SMS text to send back.
 * Includes retry logic and fallback so the customer always gets a reply.
 */
export async function processMessage(
    phone: string,
    userMessage: string
): Promise<string> {
    // Store the user message
    addMessage(phone, "user", userMessage);

    const conv = getConversation(phone);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            // Build the chat completion request
            const completion = await openai.chat.completions.create({
                model: config.openai.model,
                temperature: 0.7,
                max_tokens: 300,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...conv.messages,
                ],
            });

            const raw = completion.choices[0]?.message?.content ?? "";
            const parsed = parseResponse(raw);

            // Log the thinking (server-side only, never sent to customer)
            console.log(`\n🧠 [${phone}] THINK:`, parsed.think);
            console.log(`📱 [${phone}] SMS:`, parsed.sms);

            // Store the assistant response
            addMessage(phone, "assistant", parsed.sms);

            return parsed.sms;
        } catch (err) {
            console.error(`❌ LLM attempt ${attempt}/${MAX_RETRIES} failed for ${phone}:`, err);
            if (attempt < MAX_RETRIES) {
                console.log(`⏳ Retrying in ${RETRY_DELAY_MS}ms...`);
                await sleep(RETRY_DELAY_MS);
            }
        }
    }

    // All retries exhausted — send a friendly fallback
    console.error(`🚨 All ${MAX_RETRIES} LLM attempts failed for ${phone}. Sending fallback.`);
    addMessage(phone, "assistant", FALLBACK_MSG);
    return FALLBACK_MSG;
}
