import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, details, deadline, budget } = body;

    if (!name || !email || !service || !details) {
      return NextResponse.json(
        { error: "Name, email, service, and project details are required." },
        { status: 400 }
      );
    }

    // Mock mode if no real API key
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder_key_replace_me") {
      console.log("[QUOTE REQUEST - MOCK]", { name, email, service, details, deadline, budget });
      return NextResponse.json({ success: true, mock: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Scientific Scribe <hello@scientificscribe.com>",
      to: "hello@scientificscribe.com",
      replyTo: email,
      subject: `Quote Request: ${service} — ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Deadline:</strong> ${deadline || "Not specified"}</p>
        <p><strong>Budget Range:</strong> ${budget || "Not specified"}</p>
        <hr />
        <h3>Project Details</h3>
        <p>${details.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Failed to send quote request. Please try again." },
      { status: 500 }
    );
  }
}
