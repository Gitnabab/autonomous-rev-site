import { GoogleGenAI } from '@google/genai';
import { enhancePrompt } from './interceptor';
import 'dotenv/config';

// Ensure Required Variables Exist
const requireEnv = (key: string) => {
    const val = process.env[key];
    if (!val) throw new Error(`Missing environment variable: ${key}`);
    return val;
};

const GEMINI_API_KEY = requireEnv('GEMINI_API_KEY');

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Models for Phase 3
const HEAVY_MODEL = "gemini-2.5-flash"; // Used for execution and deep auditing

const AUDITOR_SYSTEM_PROMPT = `
You are the **AutoLeadForce Master Auditor (2026 Edition)**. You represent the pinnacle of agency intelligence.
Another AI (Agent A) has drafted a response. Your job is to audit, polish, and elevate it to the "Mastermind Standard".

**YOUR 2026 AUDIT RULES:**
1.  **Triple-Guard Validation**:
    - **Grounding**: Is the information factually accurate and grounded in the provided context?
    - **Tone**: Is the tone "Elite, Authoritative, yet Frictionless"? Remove all generic corporate apologies or robotic excitement.
    - **Utility**: Does the output solve the problem immediately? Is it actionable?
2.  **Trust Engineering**: Ensure the content includes **Proof Shards** (specific data points/metrics) and **Social Stacking**.
3.  **Modern Aesthetics**: Demand high-contrast formatting, Syne-style bold headings, and lean, scan-friendly sections.
4.  **Generative Intelligence**: If the draft includes technical strategies, ensure they align with Gemini 2.0 Flash, Agentic RAG, and GEO standards.

**OUTPUT FORMAT:**
You MUST return your response in two distinct sections separated by a markdown horizontal rule (---).

# Final Optimized Version
[Insert the flawless, client-ready work here. Elevate the language using the 2026 Mastery Frameworks.]

---

# Auditor's Log (Teacher Mode)
[Explain:
- Why the original was "Mid-tier".
- How you injected 2026 intelligence (e.g., added PAS+, fixed Trust Shards).
- Why this version will convert/win in a 2026 market.]
`;

export async function runDualAgentLoop(rawUserInput: string) {
    console.log(`\n======================================================`);
    console.log(`🚀 STARTING DUAL-AGENT PIPELINE`);
    console.log(`======================================================\n`);

    // STEP 1: The Interceptor (Phase 2)
    const upgradedPrompt = await enhancePrompt(rawUserInput, true);

    console.log(`\n------------------------------------------------------`);
    console.log(`🧠 [AGENT A: EXECUTOR] Drafting initial response...`);
    console.log(`------------------------------------------------------\n`);

    // STEP 2: Agent A (The Executor)
    let agentADraft = "";
    try {
        const responseA = await ai.models.generateContent({
            model: HEAVY_MODEL,
            contents: upgradedPrompt,
            config: {
                temperature: 0.7, // Higher temp for creative execution
            }
        });

        // @ts-ignore
        agentADraft = responseA?.text || responseA?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!agentADraft) throw new Error("Agent A failed to generate text.");
        console.log(`✅ [AGENT A] Draft completed.`);

    } catch (error) {
        // @ts-ignore
        console.error("❌ [AGENT A] Error:", error.message || error);
        return;
    }

    console.log(`\n------------------------------------------------------`);
    console.log(`👨‍🏫 [AGENT B: AUDITOR] Reviewing and polishing draft...`);
    console.log(`------------------------------------------------------\n`);

    // STEP 3: Agent B (The Auditor & Teacher)
    let finalOutput = "";
    try {
        const auditorPayload = `
**ORIGINAL PROMPT GIVEN TO AGENT A:**
${upgradedPrompt}

**AGENT A'S DRAFT V1:**
${agentADraft}

Review the draft above, fix it, and output the Final Version + Teacher's Log.
`;

        const responseB = await ai.models.generateContent({
            model: HEAVY_MODEL,
            contents: auditorPayload,
            config: {
                systemInstruction: AUDITOR_SYSTEM_PROMPT,
                temperature: 0.4, // Lower temp for strict formatting and analysis
            }
        });

        // @ts-ignore
        finalOutput = responseB?.text || responseB?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!finalOutput) throw new Error("Agent B failed to generate text.");
        console.log(`✅ [AGENT B] Audit complete. Final Output generated.\n`);

    } catch (error) {
        // @ts-ignore
        console.error("❌ [AGENT B] Error:", error.message || error);
        return;
    }

    console.log(`======================================================\n`);
    console.log(finalOutput);
    console.log(`\n======================================================\n`);

    return finalOutput;
}

// If run directly from CLI for testing
if (process.argv[1] && process.argv[1].endsWith('dual_agent.ts')) {
    const args = process.argv.slice(2);
    const query = args.join(' ') || "write a linkedin post for our razor offer";
    runDualAgentLoop(query).catch(console.error);
}
