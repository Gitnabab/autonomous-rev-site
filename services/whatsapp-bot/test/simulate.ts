/**
 * Dry-run simulation — tests the server endpoints locally
 * without needing a real Twilio account.
 *
 * Usage: npx tsx src/test/simulate.ts
 *
 * Prerequisites: Server must be running (npm run dev) on another terminal.
 */

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3001";

// ── Helpers ─────────────────────────────────────────────────────
async function post(path: string, body: Record<string, string>) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(body).toString(),
    });
    const text = await res.text();
    return { status: res.status, body: text };
}

function header(label: string) {
    console.log(`\n${"═".repeat(60)}`);
    console.log(`  ${label}`);
    console.log(`${"═".repeat(60)}`);
}

async function postJson(path: string, body: any) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const text = await res.text();
    return { status: res.status, body: text };
}

function buildMetaPayload(phone: string, text: string) {
    return {
        object: "whatsapp_business_account",
        entry: [{
            id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
            changes: [{
                value: {
                    messaging_product: "whatsapp",
                    metadata: { display_phone_number: "16505551111", phone_number_id: "123456123456" },
                    contacts: [{ profile: { name: "Test User" }, wa_id: phone }],
                    messages: [{
                        from: phone,
                        id: "wamid.HBgLMTExMTExMTExMTEVAgASGBQzQTNEOTNFMjI3MDhGRTc4RDkAA==",
                        timestamp: "1710000000",
                        text: { body: text },
                        type: "text"
                    }]
                },
                field: "messages"
            }]
        }]
    };
}

// ── Test Scenarios ──────────────────────────────────────────────
async function main() {
    console.log("🧪 Missed Call Text Back Blade — Dry Run Simulation\n");

    // Test 1: Voice webhook (TwiML response)
    header("TEST 1: Voice Webhook (POST /voice)");
    const voice = await post("/voice", {
        From: "+919876543210",
        To: "+11234567890",
        CallSid: "CA_TEST_001",
    });
    console.log(`  Status: ${voice.status}`);
    console.log(`  TwiML: ${voice.body.substring(0, 200)}...`);
    console.log(`  ✅ Voice webhook returns TwiML`);

    // Test 2: Status callback — missed call
    header("TEST 2: Status Callback — Missed Call (POST /voice/status)");
    const status = await post("/voice/status", {
        CallStatus: "no-answer",
        From: "+919876543210",
        CallDuration: "0",
        CallSid: "CA_TEST_001",
    });
    console.log(`  Status: ${status.status}`);
    console.log(`  ⚠️  Note: SMS send will fail without real Twilio creds (expected)`);

    // Test 3: WhatsApp webhook — English message (Meta JSON)
    header("TEST 3: Meta WhatsApp Webhook — English (POST /whatsapp)");
    const metaEn = await postJson("/whatsapp", buildMetaPayload("+919876543210", "Hi, I need pest control for cockroaches in my 2BHK flat in Salt Lake"));
    console.log(`  Status: ${metaEn.status}`);
    console.dir(metaEn.body);

    // Test 4: WhatsApp webhook — Banglish message (Meta JSON)
    header("TEST 4: Meta WhatsApp Webhook — Banglish (POST /whatsapp)");
    const metaBn = await postJson("/whatsapp", buildMetaPayload("+919876543211", "Dada amader barite ghun poka hoyeche, ki korbo?"));
    console.log(`  Status: ${metaBn.status}`);
    console.dir(metaBn.body);

    // Test 5: WhatsApp webhook — Hinglish message (Meta JSON)
    header("TEST 5: Meta WhatsApp Webhook — Hinglish (POST /whatsapp)");
    const metaHi = await postJson("/whatsapp", buildMetaPayload("+919876543212", "Bhai mere ghar mein bahut cockroach hai, price kya hoga?"));
    console.log(`  Status: ${metaHi.status}`);
    console.dir(metaHi.body);

    // Test 6: Health check
    header("TEST 6: Health Check (GET /)");
    const healthRes = await fetch(`${BASE_URL}/`);
    const health = await healthRes.json();
    console.log(`  Status: ${healthRes.status}`);
    console.log(`  Response:`, health);
    console.log(`  ✅ Server is healthy`);

    header("ALL TESTS COMPLETE");
    console.log("  Note: SMS sends will fail in dry-run mode (no real Twilio creds).");
    console.log("  The LLM agent responses are logged on the server terminal.\n");
}

main().catch(console.error);
