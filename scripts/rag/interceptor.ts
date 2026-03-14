import { GoogleGenAI } from '@google/genai';
import { queryKnowledgeBase } from './query';
import { spawn } from 'child_process';
import 'dotenv/config';

// ─── NAMESPACE AUTO-DETECTION ────────────────────────
// Maps keywords to Pinecone namespaces for targeted RAG queries
const NAMESPACE_KEYWORDS: Record<string, string[]> = {
    'blade-websites': ['website', 'web design', 'landing page', 'vite', 'react', 'frontend', 'ui', 'ux', 'mobile-first', 'responsive', 'template', 'generative ui', 'adaptive ux', 'framer'],
    'seo-optimization': ['seo', 'google rank', 'search engine', 'keyword', 'meta tag', 'backlink', 'local seo', 'gbp', 'google business', 'map pack', 'citation', 'search console', 'zero-click', 'entity-based', 'knowledge graph', 'atomic content', 'sge'],
    'whatsapp-bot': ['whatsapp', 'missed call', 'text back', 'chatbot', 'bot', 'twilio', 'wati', 'automation', 'auto reply', 'template message', 'whatsapp flows', 'vernacular ai'],
    'content-writing': ['content', 'copywriting', 'blog', 'article', 'caption', 'headline', 'writing', 'proof shard', 'search engineering'],
    'geo-mastery': ['google maps', 'gmb', 'google my business', 'local listing', 'directory', 'near me', 'geo mastery', 'geo', 'generative engine optimization', 'gps-tagged'],
    'social-media': ['social media', 'instagram', 'facebook', 'linkedin', 'posting', 'reel', 'story', 'engagement', 'viral loop', 'sora', 'veo', 'ai video'],
    'ai-chatbot': ['ai chat', 'chatbot on website', 'customer support bot', 'live chat', 'conversational ai', 'gemini 2.0', 'agentic rag', 'graphrag', 'cag'],
};

function detectNamespaces(input: string): string[] {
    const lower = input.toLowerCase();
    const matches: Set<string> = new Set();

    for (const [namespace, keywords] of Object.entries(NAMESPACE_KEYWORDS)) {
        for (const keyword of keywords) {
            if (lower.includes(keyword)) {
                matches.add(namespace);
                break;
            }
        }
    }

    const result = Array.from(matches);
    if (result.length > 0) {
        console.log(`⚙️ [INTERCEPTOR] Auto-detected namespaces: [${result.join(', ')}]`);
    }
    return result;
}

// Ensure Required Variables Exist
const requireEnv = (key: string) => {
    const val = process.env[key];
    if (!val) throw new Error(`Missing environment variable: ${key}`);
    return val;
};

const GEMINI_API_KEY = requireEnv('GEMINI_API_KEY');

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// The extremely fast interceptor model
const FAST_LLM_MODEL = "gemini-2.0-flash";

// 🧠 THE MASTER PROMPT: This governs how the Interceptor behaves
const MASTER_PROMPT_SYSTEM_INSTRUCTION = `
You are an elite, world-class Prompt Engineer and AI Whisperer. 
Your sole purpose is to take extremely poor, raw, vague, or short inputs from the user and "UPGRADE" them into highly structured, expert-level prompts.
The output you generate will be sent directly to a much slower, heavy-lifting LLM to do the actual work.

**YOUR OBJECTIVE:**
Take the User's Raw Input and rewrite it into a master-level prompt. 

**RULES FOR THE UPGRADED PROMPT:**
1.  **Define the Persona:** Assign a world-class persona relevant to the task (e.g., "Act as a top-tier direct response copywriter with 15 years doing B2B SaaS").
2.  **State the Goal Clearly:** Define the exact objective.
3.  **Provide Context / Constraints:** Inject specific constraints (e.g., tone, target audience, formatting).
4.  **Define the Output Format:** Use markdown blocks, specific rules, and structural demands to ensure the final LLM output is perfectly formatted.
5.  **Inject RAG Context (If Provided):** If relevant knowledge base context is attached, tell the LLM to strictly adhere to that context.

**OUTPUT INSTRUCTIONS:**
Do NOT converse with the user. Do NOT explain what you did.
ONLY output the newly engineered, upgraded prompt text.
`;

export async function enhancePrompt(rawInput: string, usePythonSubagent: boolean = true): Promise<string> {
    console.log(`\n⚙️ [INTERCEPTOR] Catching Raw Input: "${rawInput}"`);

    if (usePythonSubagent) {
        console.log(`⚙️ [INTERCEPTOR] Passing to Python Prompt Subagent...`);
        try {
            return await callPythonSubagent(rawInput);
        } catch (error) {
            console.warn(`⚠️ [INTERCEPTOR] Python Subagent failed, falling back to Native Interceptor.`, error);
        }
    }

    let ragContext = "";
    // Step 1: Auto-detect namespaces and Query Vector DB
    const detectedNamespaces = detectNamespaces(rawInput);

    if (detectedNamespaces.length === 0) {
        console.log(`⚙️ [INTERCEPTOR] No specific namespace detected, querying default/all...`);
    }

    const queryNamespaces = detectedNamespaces.length > 0 ? detectedNamespaces : ['default'];

    for (const ns of queryNamespaces) {
        console.log(`⚙️ [INTERCEPTOR] Pulling relevant context from Knowledge Base [namespace: ${ns}]...`);
        const matches = await queryKnowledgeBase(rawInput, 2, ns);
        if (matches && matches.length > 0) {
            ragContext += `### Context from Service Mastery: ${ns}\n`;
            matches.forEach((m, i) => {
                ragContext += `[Knowledge Snippet ${i + 1}]: ${m.text}\n\n`;
            });
            console.log(`⚙️ [INTERCEPTOR] Successfully injected ${matches.length} context shards from ${ns}.`);
        }
    }

    // Step 2: Build the Payload
    let payload = `User's Raw Input: "${rawInput}"\n\n`;
    if (ragContext) {
        payload += `Internal Knowledge Base Data (Inject this into the prompt):\n${ragContext}`;
    }

    console.log(`⚙️ [INTERCEPTOR] Sending to Native Prompt Master Engineer (${FAST_LLM_MODEL})...`);

    // Step 3: Call the Fast LLM to rewrite the prompt
    try {
        const response = await ai.models.generateContent({
            model: FAST_LLM_MODEL,
            contents: payload,
            config: {
                systemInstruction: MASTER_PROMPT_SYSTEM_INSTRUCTION,
                temperature: 0.3,
            }
        });

        // @ts-ignore
        const upgradedPrompt = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!upgradedPrompt) {
            throw new Error("Native Interceptor failed.");
        }

        return upgradedPrompt.trim();

    } catch (error) {
        // @ts-ignore
        console.error("❌ [INTERCEPTOR] Native upgrade failed:", error.message || error);
        return rawInput;
    }
}

async function callPythonSubagent(input: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = "c:\\Users\\being\\Antigravity\\scripts\\python\\prompt_sub_agent.py";
        console.log(`   ➔ Executing: python "${pythonScriptPath}"`);

        const pyProcess = spawn('python', [pythonScriptPath, input], {
            env: { ...process.env }
        });
        let output = '';
        let errorOutput = '';

        pyProcess.stdout.on('data', (data: Buffer) => {
            output += data.toString();
        });

        pyProcess.stderr.on('data', (data: Buffer) => {
            errorOutput += data.toString();
        });

        pyProcess.on('close', (code: number) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}. Error: ${errorOutput}`));
                return;
            }

            // Extract the enhanced prompt between our delimiters
            const startMarker = "---BEGIN ENHANCED PROMPT---";
            const endMarker = "---END ENHANCED PROMPT---";

            const startIndex = output.indexOf(startMarker);
            const endIndex = output.indexOf(endMarker);

            if (startIndex !== -1 && endIndex !== -1) {
                const finalPrompt = output.substring(startIndex + startMarker.length, endIndex).trim();
                resolve(finalPrompt);
            } else {
                reject(new Error("Could not find enhanced prompt markers in Python output."));
            }
        });
    });
}

// If run directly from CLI for testing
if (process.argv[1] && process.argv[1].endsWith('interceptor.ts')) {
    const args = process.argv.slice(2);
    const query = args.join(' ') || "write a linkedin post for our razor offer";

    enhancePrompt(query).then(upgraded => {
        console.log(`\n✨ [INTERCEPTOR] Final Upgraded Prompt:\n`);
        console.log(upgraded);
        console.log(`\n======================================================\n`);
    }).catch(console.error);
}
