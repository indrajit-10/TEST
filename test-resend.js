// Simple script to test whether Resend is working.
//
// Usage:
//   1. npm install
//   2. Set your API key:   export RESEND_API_KEY="re_xxxxxxxx"
//   3. (optional) Set who to send to: export TO_EMAIL="you@example.com"
//   4. node test-resend.js
//
// If everything is set up correctly, it prints the message id and exits 0.
// If anything is wrong (bad key, bad address, etc.) it prints the error and exits 1.

const { Resend } = require("resend");

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("❌ RESEND_API_KEY is not set. Run: export RESEND_API_KEY=\"re_...\"");
  process.exit(1);
}

// Resend gives every account this test sender out of the box, so no domain
// setup is required just to check that things work.
const from = process.env.FROM_EMAIL || "onboarding@resend.dev";
const to = process.env.TO_EMAIL || "delivered@resend.dev"; // Resend's test inbox

const resend = new Resend(apiKey);

async function main() {
  console.log(`Sending a test email from ${from} to ${to} ...`);

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: "Resend test ✅",
    html: "<p>If you can read this, Resend is working!</p>",
  });

  if (error) {
    console.error("❌ Resend is NOT working. Error:");
    console.error(error);
    process.exit(1);
  }

  console.log("✅ Resend is working! Message id:", data.id);
}

main().catch((err) => {
  console.error("❌ Unexpected failure:", err);
  process.exit(1);
});
