"use server";

import { profile } from "@/data/portfolio";

export type ContactState = { status: "idle" | "success" | "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("company")) return { status: "success", message: "Thanks! Message sent." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 100) return { status: "error", message: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Please enter a valid email." };
  if (message.length < 10 || message.length > 5000)
    return { status: "error", message: "Message should be 10–5000 characters." };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: `The contact form isn't configured yet. Please email ${profile.email} directly.`,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || profile.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { status: "success", message: "Thanks! I'll get back to you soon." };
  } catch (err) {
    console.error("Contact form failed:", err);
    return {
      status: "error",
      message: `Something went wrong. Please email ${profile.email} directly.`,
    };
  }
}
