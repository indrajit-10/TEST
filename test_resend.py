"""Simple script to test whether Resend is working.

Usage:
    1. pip install -r requirements.txt
    2. Set your API key:   export RESEND_API_KEY="re_xxxxxxxx"
    3. (optional) Set who to send to:  export TO_EMAIL="you@example.com"
    4. python test_resend.py

If everything is set up correctly it prints the message id and exits 0.
If anything is wrong (bad key, bad address, etc.) it prints the error and exits 1.
"""

import os
import sys

import resend

api_key = os.environ.get("RESEND_API_KEY")
if not api_key:
    print('❌ RESEND_API_KEY is not set. Run: export RESEND_API_KEY="re_..."')
    sys.exit(1)

resend.api_key = api_key

# Resend gives every account this test sender out of the box, so no domain
# setup is required just to check that things work.
from_email = os.environ.get("FROM_EMAIL", "onboarding@resend.dev")
to_email = os.environ.get("TO_EMAIL", "delivered@resend.dev")  # Resend's test inbox


def main():
    print(f"Sending a test email from {from_email} to {to_email} ...")

    try:
        result = resend.Emails.send(
            {
                "from": from_email,
                "to": to_email,
                "subject": "Resend test ✅",
                "html": "<p>If you can read this, Resend is working!</p>",
            }
        )
    except Exception as err:  # noqa: BLE001 - we want to catch anything and report it
        print("❌ Resend is NOT working. Error:")
        print(err)
        sys.exit(1)

    print("✅ Resend is working! Message id:", result.get("id"))


if __name__ == "__main__":
    main()
