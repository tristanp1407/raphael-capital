import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "victor.levy@raphaelcapital.co.uk",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #2276fc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #666;">Name:</strong><br/>
              <span style="color: #1a1a1a;">${name}</span>
            </p>

            <p style="margin: 10px 0;">
              <strong style="color: #666;">Email:</strong><br/>
              <a href="mailto:${email}" style="color: #2276fc; text-decoration: none;">${email}</a>
            </p>

            <p style="margin: 10px 0;">
              <strong style="color: #666;">Message:</strong><br/>
              <span style="color: #1a1a1a; white-space: pre-wrap;">${message}</span>
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999; font-size: 12px;">
            <p>This message was sent from the Raphael Capital contact form.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
