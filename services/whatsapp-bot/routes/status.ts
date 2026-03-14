import { Router, Request, Response } from "express";
import { getConversation, markFirstTouchSent } from "../store.js";
import { sendWhatsApp } from "../whatsapp.js";
import { FIRST_TOUCH_SMS } from "../config.js";

const router = Router();

/**
 * POST /voice/status — Twilio Call Status Callback
 *
 * Fires when a call reaches a terminal state.
 * On missed call → sends the first-touch message via WhatsApp.
 */
router.post("/voice/status", async (req: Request, res: Response) => {
    const { CallStatus, From, CallDuration } = req.body;

    console.log(`📊 Call status: ${CallStatus} | From: ${From} | Duration: ${CallDuration}s`);

    // Determine if this was a "missed" call
    const isMissed =
        CallStatus === "no-answer" ||
        CallStatus === "busy" ||
        CallStatus === "failed" ||
        (CallStatus === "completed" && parseInt(CallDuration ?? "0", 10) <= 5);

    if (!isMissed || !From) {
        res.sendStatus(200);
        return;
    }

    // Check if we already sent the first-touch for this number
    const conv = getConversation(From);
    if (conv.firstTouchSent) {
        console.log(`⏭️  First-touch already sent to ${From}, skipping`);
        res.sendStatus(200);
        return;
    }

    // Send first-touch via WhatsApp
    try {
        await sendWhatsApp(From, FIRST_TOUCH_SMS);
        markFirstTouchSent(From);
        console.log(`🚀 First-touch WhatsApp sent to ${From}`);
    } catch (err) {
        console.error(`❌ Failed to send first-touch WhatsApp to ${From}:`, err);
    }

    res.sendStatus(200);
});

export default router;
