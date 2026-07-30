# Simple all-in-one script to test whether Resend is working.
#
# 1. Install the library:   pip install resend
# 2. Paste your API key and email below.
# 3. Run:                   python test_resend.py

import resend

# ---- EDIT THESE ----
API_KEY = "re_xxxxxxxxxxxxxxxx"        # <-- paste your Resend API key here
FROM_EMAIL = "onboarding@resend.dev"   # Resend's built-in test sender (no domain setup needed)
TO_EMAIL = "delivered@resend.dev"      # <-- change to your own email to actually receive it
# --------------------

resend.api_key = API_KEY

print(f"Sending a test email from {FROM_EMAIL} to {TO_EMAIL} ...")

try:
    result = resend.Emails.send({
        "from": FROM_EMAIL,
        "to": TO_EMAIL,
        "subject": "Resend test ✅",
        "html": "<p>If you can read this, Resend is working!</p>",
    })
    print("✅ Resend is working! Message id:", result.get("id"))
except Exception as err:
    print("❌ Resend is NOT working. Error:")
    print(err)
