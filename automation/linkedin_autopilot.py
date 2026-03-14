import os
import json
import time
import requests
from datetime import datetime

# --- CONFIGURATION ---
# These will be populated from the LinkedIn Developer Portal credentials
CLIENT_ID = os.environ.get('LINKEDIN_CLIENT_ID')
CLIENT_SECRET = os.environ.get('LINKEDIN_CLIENT_SECRET')
ACCESS_TOKEN = os.environ.get('LINKEDIN_ACCESS_TOKEN')
PERSON_URN = os.environ.get('LINKEDIN_PERSON_URN') # format: 'urn:li:person:abcdef'

API_BASE_URL = "https://api.linkedin.com/v2"

def post_to_linkedin(content_text, visibility="PUBLIC"):
    """
    Posts a text-based update to LinkedIn personal profile.
    """
    if not ACCESS_TOKEN or not PERSON_URN:
        print("Error: Missing LinkedIn credentials. Please set environment variables.")
        return False

    post_data = {
        "author": PERSON_URN,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": content_text
                },
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": visibility
        }
    }

    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0"
    }

    response = requests.post(f"{API_BASE_URL}/ugcPosts", headers=headers, json=post_data)

    if response.status_code == 201:
        print(f"Successfully posted to LinkedIn at {datetime.now()}")
        return True
    else:
        print(f"Failed to post. Status: {response.status_code}")
        print(response.text)
        return False

def get_pending_posts():
    """Reads the content directory and returns a sorted list of post files."""
    content_dir = "content"
    if not os.path.exists(content_dir):
        return []
    
    files = [f for f in os.listdir(content_dir) if f.startswith("day_") and f.endswith(".txt")]
    return sorted(files)

def schedule_posts():
    """
    Simulates a scheduling engine that posts the next available content.
    """
    posts = get_pending_posts()
    if not posts:
        print("No pending posts found in the 'content/' directory.")
        return

    print(f"Found {len(posts)} scheduled posts. Starting sequence...")
    
    for post_file in posts:
        file_path = os.path.join("content", post_file)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        print(f"\n--- Preparing to post: {post_file} ---")
        # Removing metadata lines for the actual post
        clean_content = "\n".join([line for line in content.split("\n") if not line.startswith("[")])
        
        success = post_to_linkedin(clean_content.strip())
        if success:
            # In production, we might move the file to an 'archive' folder
            print(f"Success! Post {post_file} is live.")
        else:
            print(f"Skipping {post_file} due to missing credentials or API error.")

if __name__ == "__main__":
    print("AutoLeadForce LinkedIn Autopilot v1.0")
    schedule_posts()
