# Zoho Mail "Forever Free" Setup Guide

Setting up professional agency email (e.g., `contact@yourdomain.com`) is critical for premium branding. Zoho Mail offers a generous free tier for up to 5 users, which is perfect for our agency launch.

## 🔗 Live Link to Register

**[Click here for the Zoho Mail Forever Free Plan Page](https://www.zoho.com/mail/zohomail-pricing.html)** 
*(Scroll to the very bottom to find the "Forever Free Plan" and click "Sign Up Now")*

---

## 🛠️ Step-by-Step Configuration Process

### Phase 1: Registration & Domain Connection
1. **Sign Up**: Click the link above, enter your name, email/mobile, and password to create a Zoho account.
2. **Add Domain**: Select **"Sign up with a domain I already own"**.
3. **Enter Details**: Type in your new agency domain (e.g., `yourdomain.com`) and your preferred industry.

### Phase 2: Domain Verification
Zoho needs to know you actually own this domain. They will give you a specific `TXT` string.
1. Open your domain registrar's DNS settings (e.g., Namecheap, GoDaddy, Hostinger).
2. Create a new DNS record:
   - **Type**: `TXT`
   - **Name/Host**: `@` (or leave blank depending on registrar)
   - **Value**: *Paste the unique `zoho-verification` string they provide you.*
3. Go back to Zoho and click **Verify**. (Wait 1-5 minutes if it fails on the first try).

### Phase 3: Create The Admin Email 
1. Once verified, Zoho will ask you to create your super admin email.
2. Type in your desired prefix (e.g., `hello`, `contact`, or `nabab`).
3. Click **Create**.

### Phase 4: Configure Email Routing (MX Records)
This is the most critical step. MX records tell the internet to send incoming emails to Zoho's servers.
1. Delete any existing `MX` records in your DNS dashboard to prevent conflicts.
2. Add the following 3 new MX records:
   - **Record 1**:  Type `MX`, Name `@`, Value `mx.zoho.in`, Priority `10`
   - **Record 2**:  Type `MX`, Name `@`, Value `mx2.zoho.in`, Priority `20`
   - **Record 3**:  Type `MX`, Name `@`, Value `mx3.zoho.in`, Priority `50`
*(Note: If you signed up on Zoho.com instead of Zoho.in, use `mx.zoho.com` respectively. Check what the wizard shows you).*

### Phase 5: Ensure High Deliverability (SPF & DKIM)
To prevent your outgoing emails from landing in clients' Spam folders, set up SPF and DKIM.

**SPF (Sender Policy Framework)**:
1. Add a new `TXT` record.
2. **Name**: `@`
3. **Value**: `v=spf1 include:zoho.in ~all`

**DKIM (DomainKeys Identified Mail)**:
1. In the Zoho setup wizard, generate a DKIM key. 
2. Add a new `TXT` record in your DNS.
3. **Name**: *[zoho_selector]._domainkey* (Zoho will specify this selector)
4. **Value**: *Paste the long text string Zoho provides.*

---

## ✅ Final Checklist
- [ ] Account created on the Forever Free tier
- [ ] Domain verified via TXT
- [ ] Admin user (`contact@...`) created
- [ ] MX records updated the DNS
- [ ] SPF & DKIM configured
- [ ] Test Email: Send an email to your personal Gmail and reply back to confirm 2-way traffic works.
