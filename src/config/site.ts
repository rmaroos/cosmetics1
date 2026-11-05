/**
 * Site-wide configuration driven by Vite environment variables.
 *
 * Set values in .env.local (never committed).
 * See .env.example for a full list of variables.
 */

/* ─── WhatsApp support widget ──────────────────────────────────────── */

export const WHATSAPP_NUMBER: string =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? '';   // e.g. "94712345678" (no +, no spaces)

export const WHATSAPP_MESSAGE: string =
  import.meta.env.VITE_WHATSAPP_MESSAGE ?? 'Hello! I need help with my order.';

/** Returns the wa.me URL, or '' if no number is configured. */
export function whatsAppUrl(): string {
  if (!WHATSAPP_NUMBER) return '';
  const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/* ─── Instalment / payment options ─────────────────────────────────── */

/**
 * Whether to show instalment information on product cards.
 * Set VITE_SHOW_INSTALMENTS=true in .env.local to enable.
 */
export const SHOW_INSTALMENTS: boolean =
  import.meta.env.VITE_SHOW_INSTALMENTS === 'true';

/** Number of instalments (default 3). */
export const INSTALMENT_COUNT: number =
  Number(import.meta.env.VITE_INSTALMENT_COUNT ?? 3);

/** Cashback percentage offered by the primary provider (e.g. 8). */
export const INSTALMENT_CASHBACK_PCT: number =
  Number(import.meta.env.VITE_INSTALMENT_CASHBACK_PCT ?? 8);

/**
 * Short display names for primary instalment providers.
 * Comma-separated, e.g. "amipay,mintpay"
 */
export const INSTALMENT_PROVIDERS: string[] = (
  import.meta.env.VITE_INSTALMENT_PROVIDERS ?? ''
)
  .split(',')
  .map((s: string) => s.trim())
  .filter(Boolean);

/**
 * Secondary BNPL provider shown on the second payment line (e.g. "Koko").
 * Leave empty to hide the second line.
 */
export const BNPL_PROVIDER: string =
  import.meta.env.VITE_BNPL_PROVIDER ?? '';

/** Format a price amount for instalment display (no currency symbol). */
export function instalmentAmount(price: number): string {
  if (INSTALMENT_COUNT < 1) return '';
  const per = price / INSTALMENT_COUNT;
  return per.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

