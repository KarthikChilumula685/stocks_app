// test-email.ts
import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
  connectionTimeout: 30_000,
  greetingTimeout: 30_000,
  socketTimeout: 30_000,
});

async function testEmail() {
  console.log("Testing email configuration...");
  console.log("Email:", process.env.NODEMAILER_EMAIL);
  console.log("Password set:", !!process.env.NODEMAILER_PASSWORD);

  try {
    console.log("\n1. Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified!");

    console.log("\n2. Sending test email...");
    const info = await transporter.sendMail({
      from: `"Signalist Test" <${process.env.NODEMAILER_EMAIL}>`,
      to: process.env.NODEMAILER_EMAIL,
      subject: "Test Email from Signalist",
      text: "If you receive this, your email configuration is working!",
      html: "<h1>Success!</h1><p>Your email configuration is working correctly.</p>",
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email test failed:");
    console.error(error);
    return { success: false, error };
  }
}

testEmail()
  .then((result) => {
    console.log("\n" + "=".repeat(50));
    console.log("Test Result:", result.success ? "✅ PASSED" : "❌ FAILED");
    console.log("=".repeat(50));
    process.exit(result.success ? 0 : 1);
  })
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });