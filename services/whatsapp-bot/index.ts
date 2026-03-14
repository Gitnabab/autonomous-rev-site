import express from "express";
import { config } from "./config.js";
import voiceRouter from "./routes/voice.js";
import statusRouter from "./routes/status.js";
import whatsappRouter from "./routes/whatsapp.js";

// ── Express App ─────────────────────────────────────────────────
const app = express();

// Parse Twilio webhook payloads (URL-encoded form data)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Catch JSON parsing errors
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
        console.error("❌ Invalid JSON Payload from Webhook:", err.message);
        return res.status(400).send({ status: 400, message: err.message });
    }
    next();
});

// ── Health Check ────────────────────────────────────────────────
app.get("/", (_req, res) => {
    res.json({
        service: "Orion Pest Solutions — Missed Call Text Back Blade",
        status: "running",
        uptime: process.uptime(),
    });
});

// ── Webhook Routes ──────────────────────────────────────────────
app.use(voiceRouter);       // POST /voice
app.use(statusRouter);      // POST /voice/status
app.use(whatsappRouter);    // POST /whatsapp

// ── Start Server ────────────────────────────────────────────────
app.listen(config.port, () => {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║   🪳  Orion Pest Solutions — Text Back Blade             ║
║   📡  Server running on http://localhost:${config.port}          ║
║                                                          ║
║   Webhook Endpoints:                                     ║
║   ├─ POST /voice         (Twilio Voice Webhook)          ║
║   ├─ POST /voice/status  (Call Status Callback)          ║
║   ├─ GET  /whatsapp      (Meta Webhook Verification)     ║
║   └─ POST /whatsapp      (Meta WhatsApp Webhook)         ║
║                                                          ║
║   Sender API: Meta Cloud API                             ║
╚══════════════════════════════════════════════════════════╝
  `);
});
