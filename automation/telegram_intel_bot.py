import os
import requests

# PRE-REQUISITES:
# 1. Create a Bot via @BotFather and get the API_TOKEN
# 2. Get your Chat ID via @userinfobot
# 3. Add these to your environment variables or replace directly for testing.

API_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', 'YOUR_BOT_TOKEN_HERE')
CHAT_ID = os.getenv('TELEGRAM_CHAT_ID', 'YOUR_CHAT_ID_HERE')

def send_intel_alert(message):
    """
    Relays lead data or payment alerts to the agency owner's Telegram.
    """
    url = f"https://api.telegram.org/bot{API_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": f"🚨 **INTEL ALERT: AUTONOMOUS.REV.**\n\n{message}",
        "parse_mode": "Markdown"
    }
    
    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Successfully relayed intel to Telegram.")
        else:
            print(f"Failed to relay intel: {response.text}")
    except Exception as e:
        print(f"Connection error: {e}")

# Example usage for Lead Engine:
# lead_data = "New Request for Free Preview\nSector: Pest Control\nWhatsApp: +91 98XXX XXXX"
# send_intel_alert(lead_data)
