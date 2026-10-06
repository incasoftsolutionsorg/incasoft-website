/**
 * Contact / lead submission.
 *
 * The form UI talks only to `submitLead()`, which POSTs JSON
 * ({ kind, name, email, ...payload }) to the `/api/contact` serverless
 * function (see `api/contact.ts`). That function emails the message to the
 * company inbox, with the visitor as Reply-To.
 *
 * Set VITE_CONTACT_ENDPOINT to send submissions somewhere else instead.
 * Credentials/API keys belong on the server, never in this bundle.
 */

import { company } from "@/data/company";

export interface LeadPayload {
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
  /** Honeypot — must stay empty; filled means bot. */
  website?: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || "/api/contact";

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

const fallback = `Please try again, or email us directly at ${company.email}.`;

export async function submitLead(lead: LeadPayload): Promise<SubmitResult> {
  // Spam protection: honeypot filled => silently accept and discard.
  if (lead.website) return { ok: true };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: `${data?.error ?? "We couldn't send your message."} ${fallback}` };
  } catch {
    return { ok: false, error: `Network error — your message wasn't sent. ${fallback}` };
  }
}
