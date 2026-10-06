/**
 * POST /api/contact — Vercel serverless function.
 *
 * Receives contact / project-discovery form submissions from the website and
 * emails them to the company inbox via Gmail SMTP. The visitor's address is
 * set as Reply-To, so pressing "Reply" in Gmail answers the visitor directly.
 *
 * Required environment variables (Vercel → Project → Settings → Environment
 * Variables, or `.env.local` for local dev):
 *   GMAIL_USER          Gmail account that sends the mail (e.g. incasoftsolutions@gmail.com)
 *   GMAIL_APP_PASSWORD  16-character Google App Password for that account
 * Optional:
 *   CONTACT_TO          Inbox that receives messages (defaults to GMAIL_USER)
 */

import nodemailer from "nodemailer";

interface Lead {
  kind: "contact" | "discovery";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  message?: string;
  projectType?: string;
  industry?: string;
  idea?: string;
  website?: string;
}

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  company: 160,
  phone: 40,
  whatsapp: 40,
  projectType: 120,
  industry: 120,
  message: 5000,
  idea: 5000,
};

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Strip control characters / line breaks from single-line values (header-injection safe). */
const oneLine = (v: string) => v.replace(/\p{Cc}+/gu, " ").trim();

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Validate and normalise an untrusted request body. Returns an error string or the clean lead. */
export function parseLead(input: unknown): Lead | string {
  if (!input || typeof input !== "object") return "Invalid request.";
  const raw = input as Record<string, unknown>;
  const lead: Record<string, string> = {};

  for (const [key, max] of Object.entries(LIMITS)) {
    const value = raw[key];
    if (value === undefined || value === null || value === "") continue;
    if (typeof value !== "string") return `Invalid ${key}.`;
    const clean = key === "message" || key === "idea" ? value.trim() : oneLine(value);
    if (clean.length > max) return `${key} is too long.`;
    if (clean) lead[key] = clean;
  }

  const kind = raw.kind === "discovery" ? "discovery" : "contact";
  if (!lead.name) return "Please tell us your name.";
  if (!lead.email || !isEmail(lead.email)) return "Please enter a valid email address.";
  const body = kind === "discovery" ? lead.idea : lead.message;
  if (!body || body.length < 10) return "Please add a short message (min. 10 characters).";

  return { ...lead, kind, website: typeof raw.website === "string" ? raw.website : "" } as Lead;
}

/** Build the notification email sent to the company inbox. */
export function buildLeadEmail(lead: Lead, receivedAt = new Date()) {
  const isDiscovery = lead.kind === "discovery";
  const subject = isDiscovery
    ? `New project inquiry: ${lead.projectType ?? "New project"} from ${lead.name}`
    : `New website message from ${lead.name}`;

  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Phone", lead.phone],
    ["WhatsApp", lead.whatsapp],
    ["Project type", lead.projectType],
    ["Industry", lead.industry],
  ];
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]));
  const body = (isDiscovery ? lead.idea : lead.message) ?? "";
  const when = receivedAt.toLocaleString("en-GB", { timeZone: "Asia/Colombo", dateStyle: "medium", timeStyle: "short" });
  const heading = isDiscovery ? "New project inquiry" : "New website message";
  const bodyLabel = isDiscovery ? "Project details" : "Message";

  const text = [
    `${heading} — received ${when} (Sri Lanka time)`,
    "",
    ...filled.map(([k, v]) => `${k}: ${v}`),
    "",
    `${bodyLabel}:`,
    body,
    "",
    "—",
    "Sent from the INCASOFT Solutions website. Reply to this email to answer the sender directly.",
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f4f6f9;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b2340">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px">
    <div style="background:#0b2340;border-radius:12px 12px 0 0;padding:20px 24px">
      <p style="margin:0;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#2fb5d4;font-weight:700">INCASOFT Solutions website</p>
      <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff">${heading}</h1>
    </div>
    <div style="background:#ffffff;border:1px solid #e3e8ef;border-top:0;border-radius:0 0 12px 12px;padding:24px">
      <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
        ${filled
          .map(
            ([k, v]) => `<tr>
          <td style="padding:8px 0;color:#5b6b80;width:130px;vertical-align:top">${k}</td>
          <td style="padding:8px 0;font-weight:600">${
            k === "Email" ? `<a href="mailto:${escapeHtml(v)}" style="color:#0b6e8a">${escapeHtml(v)}</a>` : escapeHtml(v)
          }</td>
        </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#5b6b80;font-weight:700">${bodyLabel}</p>
      <div style="white-space:pre-wrap;background:#f4f6f9;border-radius:8px;padding:16px;font-size:14px;line-height:1.6">${escapeHtml(body)}</div>
      <a href="mailto:${escapeHtml(lead.email)}?subject=${encodeURIComponent(`Re: ${subject}`)}"
         style="display:inline-block;margin-top:20px;background:#2fb5d4;color:#06202e;text-decoration:none;font-weight:700;font-size:14px;padding:10px 20px;border-radius:999px">Reply to ${escapeHtml(lead.name)}</a>
      <p style="margin:20px 0 0;font-size:12px;color:#8a97a8">Received ${when} (Sri Lanka time). Replying to this email goes straight to the sender.</p>
    </div>
  </div>
</body></html>`;

  return { subject, text, html };
}

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request): Promise<Response> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("[contact] GMAIL_USER / GMAIL_APP_PASSWORD are not configured");
    return json(500, { ok: false, error: "Email service is not configured." });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json(429, { ok: false, error: "Too many messages. Please try again later." });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }

  const lead = parseLead(input);
  if (typeof lead === "string") return json(400, { ok: false, error: lead });

  // Honeypot filled → pretend success, send nothing.
  if (lead.website) return json(200, { ok: true });

  const { subject, text, html } = buildLeadEmail(lead);
  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

  try {
    await transporter.sendMail({
      from: { name: "INCASOFT Website", address: user },
      to: process.env.CONTACT_TO || user,
      replyTo: { name: lead.name, address: lead.email },
      subject,
      text,
      html,
    });
    return json(200, { ok: true });
  } catch (err) {
    const code = (err as { responseCode?: number }).responseCode;
    if (code === 534 || code === 535) {
      console.error(
        "[contact] Gmail rejected the login. GMAIL_APP_PASSWORD must be a 16-character Google App Password " +
          "(https://myaccount.google.com/apppasswords), not the normal Gmail password.",
      );
    } else {
      console.error("[contact] sendMail failed:", err);
    }
    return json(502, { ok: false, error: "We couldn't send your message right now." });
  }
}
