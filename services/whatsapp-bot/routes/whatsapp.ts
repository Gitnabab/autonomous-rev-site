import { Router, Request, Response } from "express";
import { processMessage } from "../agent.js";
import { sendWhatsApp } from "../whatsapp.js";
import { config } from "../config.js";

const router = Router();

/**
 * GET /whatsapp — Meta Webhook Verification
 * 
 * required when configuring the webhook URL in the Meta Developer Dashboard.
 */
router.get("/whatsapp", (req: Request, res: Response) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === config.meta.webhookVerifyToken) {
        console.log("✅ Meta Webhook Verified!");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST /whatsapp — Meta Incoming Message Webhook
 * 
 * Fires when a customer sends a WhatsApp message.
 */
router.post("/whatsapp", async (req: Request, res: Response) => {
    // Meta requires a 200 OK response immediately to acknowledge receipt
    res.sendStatus(200);

    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    // Ignore statuses (delivered, read, etc.) — we only care about user text messages
    if (!message || message.type !== "text") return;

    const phone = message.from;
    const body = message.text.body;

    console.log(`\n💬 Incoming Meta WhatsApp from ${phone}: "${body}"`);

    try {
        const replyText = await processMessage(phone, body);
        await sendWhatsApp(phone, replyText);
    } catch (err) {
        console.error(`❌ Error processing WhatsApp from ${phone}:`, err);
    }
});

export default router;
