import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// ── Types ───────────────────────────────────────────────────────
export interface ConversationState {
    messages: ChatCompletionMessageParam[];
    detectedLanguage: string | null;
    pestType: string | null;
    propertySize: string | null;
    location: string | null;
    firstTouchSent: boolean;
    createdAt: number;
    updatedAt: number;
}

// ── In-Memory Store ─────────────────────────────────────────────
const store = new Map<string, ConversationState>();

const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/** Get or create conversation state for a phone number */
export function getConversation(phone: string): ConversationState {
    const existing = store.get(phone);
    if (existing && Date.now() - existing.createdAt < TTL_MS) {
        return existing;
    }

    const fresh: ConversationState = {
        messages: [],
        detectedLanguage: null,
        pestType: null,
        propertySize: null,
        location: null,
        firstTouchSent: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    store.set(phone, fresh);
    return fresh;
}

/** Mark first-touch SMS as sent */
export function markFirstTouchSent(phone: string): void {
    const conv = getConversation(phone);
    conv.firstTouchSent = true;
    conv.updatedAt = Date.now();
}

/** Add a message to conversation history */
export function addMessage(
    phone: string,
    role: "user" | "assistant",
    content: string
): void {
    const conv = getConversation(phone);
    conv.messages.push({ role, content });
    conv.updatedAt = Date.now();
}

/** Periodic cleanup of expired conversations */
export function cleanupExpired(): void {
    const now = Date.now();
    for (const [phone, conv] of store.entries()) {
        if (now - conv.createdAt > TTL_MS) {
            store.delete(phone);
        }
    }
}

// Run cleanup every hour
setInterval(cleanupExpired, 60 * 60 * 1000);
