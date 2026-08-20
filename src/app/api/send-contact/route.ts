import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    // Mock mode if no real API key
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder_key_replace_me") {
      console.log("[CONTACT MESSAGE - MOCK]", { name, email, subject, message });
      return NextResponse.json({ success: true, mock: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Scientific Scribe <hello@scientificscribe.com>",
      to: "hello@scientificscribe.com",
      replyTo: email,
      subject: `Contact: ${subject} — ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
