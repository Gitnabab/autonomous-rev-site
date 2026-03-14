import { config } from "./config.js";

/**
 * Send a WhatsApp message via Meta Cloud API.
 * 
 * Uses the official Graph API endpoints instead of Twilio Sandbox.
 */
export async function sendWhatsApp(to: string, body: string): Promise<string> {
    // Ensure the phone number doesn't have a '+' or 'whatsapp:' prefix for Meta
    const cleanTo = to.replace(/^[+]/, "").replace(/^whatsapp:/, "");

    const payload = {
        messaging_product: "whatsapp",
        to: cleanTo,
        type: "text",
        text: { body },
    };

    const response = await fetch(
        `https://graph.facebook.com/v19.0/${config.meta.whatsappPhoneId}/messages`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${config.meta.whatsappToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error("❌ Meta API Error:", JSON.stringify(data, null, 2));
        throw new Error(`Failed to send WhatsApp message: ${data.error?.message || "Unknown error"}`);
    }

    const messageId = data.messages?.[0]?.id || "unknown_id";
    console.log(`✅ WhatsApp sent via Meta to ${cleanTo} | ID: ${messageId}`);

    return messageId;
}
