import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Load environment variable for local development
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { subject, name, email, message, honeypot } = req.body; // Use req.body instead of await request.json()

  // Check honeypot field - if filled, it's likely a bot
  if (honeypot && honeypot.trim() !== "") {
    return res.status(400).json({ error: "Invalid submission" });
  }

  try {
    const data = await resend.emails.send({
      from: "Quentin - Woodform <no-reply@resend.dev>",
      to: "lamare.quentin@icloud.com",
      subject,
      text: `
        You have a new message from ${name} (${email}):
        \n\n
        Message: ${message}
      `,
      replyTo: email,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
