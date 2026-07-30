# Resend Functionality Test

A tiny script that checks whether [Resend](https://resend.com) email sending is working.

## Setup

```bash
npm install
```

## Run

```bash
# Required: your Resend API key (get one at https://resend.com/api-keys)
export RESEND_API_KEY="re_xxxxxxxx"

# Optional: override the default test sender/recipient
# export FROM_EMAIL="onboarding@resend.dev"
# export TO_EMAIL="you@example.com"

node test-resend.js
```

## What you'll see

- **Working:** `✅ Resend is working! Message id: ...`
- **Not working:** `❌ Resend is NOT working. Error: ...` (exit code 1)

By default it sends from `onboarding@resend.dev` (Resend's built-in test sender,
no domain setup needed) to `delivered@resend.dev` (Resend's test inbox), so you
can verify your API key works before configuring your own domain.
