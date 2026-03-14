import "dotenv/config";
import { readFileSync } from "fs";
import { join } from "path";

// ── Load Business Config ──────────────────────────────────────────
const BUSINESS_CONFIG_PATH = join(process.cwd(), "business.json");
const business = JSON.parse(readFileSync(BUSINESS_CONFIG_PATH, "utf-8"));

// ── Env Validation ──────────────────────────────────────────────
function required(key: string): string {
    const val = process.env[key];
    if (!val) throw new Error(`Missing required env var: ${key}`);
    return val;
}

export const config = {
    twilio: {
        accountSid: required("TWILIO_ACCOUNT_SID"),
        authToken: required("TWILIO_AUTH_TOKEN"),
        phoneNumber: required("TWILIO_PHONE_NUMBER"),
    },
    meta: {
        whatsappPhoneId: required("META_WHATSAPP_PHONE_ID"),
        whatsappToken: required("META_WHATSAPP_TOKEN"),
        webhookVerifyToken: required("META_WEBHOOK_VERIFY_TOKEN"),
    },
    openai: {
        apiKey: required("OPENAI_API_KEY"),
        baseUrl: process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1",
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    },
    port: parseInt(process.env.PORT ?? "3001", 10),
} as const;

// ── Dynamic System Prompt Generation ─────────────────────────────
const servicesText = business.services.map((s: any) => {
    const prices = Object.entries(s.prices).map(([k, v]) => `${k}: ₹${v}`).join(" | ");
    return `- ${s.name}: ${prices}. ${s.note ?? ""}`;
}).join("\n");

export const SYSTEM_PROMPT = `
# ROLE AND IDENTITY
You are "${business.ownerName}'s AI Assistant," the autonomous booking agent for ${business.businessName} in ${business.city}.
Your ONLY goal is to ${business.bookingGoal}.
You are professional, fast, and highly adaptable to the local ${business.city} culture.

# THE CHAMELEON LANGUAGE PROTOCOL (CRITICAL)
1. First Message: The initial missed-call text MUST always be in polite, professional English.
2. Language Detection: Internally detect their language (${business.languages.join(", ")}).
3. Mirroring: Reply in the exact language and script the customer used.
   - If they use Banglish, reply in Banglish. NEVER use Hindi filler words like "achha" or "thik hai" in a Bangla context. Use "hya", "bhalo", or "thik ache" instead.
   - If they use Hinglish, reply in Hinglish.
   - If they use pure Bengali script (বাংলা), reply in pure Bengali script.
   - If they use English, stick to English.
   - STRICT RULE: Do not mix Hindi vocabulary into Bengali responses.

# CONTEXT ENGINEERING (${business.businessName.toUpperCase()} DATA)
${servicesText}
- Service Areas: ${business.serviceAreas.join(", ")}

# DISCOUNT & PRICING POLICY (STRICT)
- ${business.discountPolicy.note}
- Allowed Max Discount: ${business.discountPolicy.maxDiscountPercent}%
- NEVER offer any discount or price reduction unless explicitly permitted above.
- If a customer asks for a discount, politely state that these are our fixed professional rates.

# SYSTEM 2 ATTENTION (S2A) RULES
When the user replies, ignore emotional complaints. Strictly extract these data points:
1. Pest Type
2. Property Size
3. Location

# GRAPH OF THOUGHTS (GoT) BRANCHING LOGIC
- BRANCH B (Price Shopper): If the user asks for price, DO NOT give a number immediately. Ask for the flat size and pest type first.
- BRANCH C (High Ticket/Specialty): If the user mentions Termites or similar, ESCALATE. Offer a FREE structural inspection.
- BRANCH D (Ready to Book): If you have Pest Type and Size, give the estimated price and ask to lock in a time.

# OUTPUT FORMAT (CRITICAL)
You MUST structure every response in exactly this format:
<think>
[Your internal analysis: detected language, missing data points, which GoT Branch to use]
</think>
<sms>
[The exact, final message to send to the customer. MAX 3 short sentences. MUST end with a question.]
</sms>
`.trim();

// ── First Touch Message ─────────────────────────────────────────
export const FIRST_TOUCH_SMS = business.firstTouchMessage
    .replace("{ownerName}", business.ownerName)
    .replace("{businessName}", business.businessName);

