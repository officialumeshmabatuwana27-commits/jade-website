import { NextResponse } from "next/server";
import { saveContact } from "@/lib/db";
import nodemailer from "nodemailer";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Persist to JSON file
    saveContact({ name, email, subject, message });

    // Send email if configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_USER !== "your-gmail@gmail.com") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from: `"JADE Coatings Website" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO || "info@colourmax.lk",
        replyTo: email,
        subject: `[Website Inquiry] ${subject}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><div style="background:#2E7D4F;padding:24px;border-radius:8px 8px 0 0"><h2 style="color:white;margin:0">New Contact Form Submission</h2><p style="color:#b7e4c7;margin:4px 0 0">JADE Coatings Website</p></div><div style="background:#f9f9f9;padding:24px;border-radius:0 0 8px 8px"><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;font-weight:bold;color:#555;width:100px">Name:</td><td style="padding:8px 0">${name}</td></tr><tr><td style="padding:8px 0;font-weight:bold;color:#555">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr><tr><td style="padding:8px 0;font-weight:bold;color:#555">Subject:</td><td>${subject}</td></tr></table><hr style="border:none;border-top:1px solid #ddd;margin:16px 0"/><p style="font-weight:bold;color:#555;margin-bottom:8px">Message:</p><p style="background:white;padding:16px;border-radius:4px;border-left:4px solid #2E7D4F;white-space:pre-wrap">${message}</p></div></div>`,
      });
    }

    return NextResponse.json({ success: true, message: "Thank you for your message! We will get back to you within 24 hours." });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
