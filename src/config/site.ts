/**
 * Site-wide configuration driven by Vite environment variables.
 *
 * Set values in .env.local (never committed).
 * See .env.example for a full list of variables.
 */

/* ─── WhatsApp support widget ──────────────────────────────────────── */

export const WHATSAPP_NUMBER: string =
  import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'; // Default business WhatsApp (country code without +)

export const WHATSAPP_MESSAGE: string =
  import.meta.env.VITE_WHATSAPP_MESSAGE ||
  'Hi! I visited your website and would like to know more about your beauty products.';

/** Returns the wa.me Click-to-Chat URL format. */
export function whatsAppUrl(customNumber?: string, customMessage?: string): string {
  const rawNumber = customNumber || WHATSAPP_NUMBER;
  const cleaned = rawNumber.replace(/[^0-9]/g, '');
  if (!cleaned) return '';
  const message = customMessage || WHATSAPP_MESSAGE;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
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

