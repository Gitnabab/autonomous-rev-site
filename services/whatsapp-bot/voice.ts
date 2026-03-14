import { Router, Request, Response } from "express";
import twilio from "twilio";

const router = Router();

/**
 * POST /voice — Twilio Voice Webhook
 *
 * When someone calls our Twilio number, this webhook fires.
 * We let it ring briefly (10 seconds), then if unanswered,
 * the status callback (/voice/status) handles sending the SMS.
 *
 * The TwiML tells Twilio to:
 * 1. Say a brief message
 * 2. Hang up
 * The status callback URL will fire with the final call status.
 */
router.post("/voice", (_req: Request, res: Response) => {
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();

    // Brief message if they stay on the line
    response.say(
        { voice: "alice", language: "en-IN" },
        "Thank you for calling Orion Pest Solutions. We are currently busy. We will text you back shortly."
    );
    response.hangup();

    res.type("text/xml");
    res.send(response.toString());

    console.log("📞 Incoming call handled with TwiML response");
});

export default router;
