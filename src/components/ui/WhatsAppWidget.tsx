import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X as XIcon } from 'lucide-react';
import { whatsAppUrl } from '../../config/site';

export interface WhatsAppWidgetProps {
  phoneNumber?: string;
  message?: string;
}

/**
 * Premium floating WhatsApp contact overlay fixed at the bottom-right corner.
 * Features official branding, dismissible beauty assistance card, responsive sizing,
 * desktop tooltip and smooth entrance animations.
 */
export function WhatsAppWidget({ phoneNumber, message }: WhatsAppWidgetProps) {
  const url = whatsAppUrl(phoneNumber, message);
  const prefersReducedMotion = useReducedMotion();

  // Allow users to dismiss the card; persist dismiss state in sessionStorage
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('nelum:dismiss_whatsapp_card') === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    try {
      sessionStorage.setItem('nelum:dismiss_whatsapp_card', 'true');
    } catch {
      // Ignore sessionStorage exceptions in private browsing
    }
  };

  /* Don't render if no number is configured */
  if (!url) return null;

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.9, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: {
          duration: 0.45,
          delay: 0.6,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      };

  return (
    <motion.aside
      {...motionProps}
      aria-label="WhatsApp live chat assistance"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 md:bottom-7 md:right-7 z-40 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pointer-events-none"
    >
      <div className="pointer-events-auto relative flex flex-col items-end sm:flex-row sm:items-center gap-2.5 sm:gap-3">
        {/* ─── Dismissible Contact Assistance Card ────────────────────────── */}
        <AnimatePresence>
          {!isDismissed && (
            <motion.div
              key="whatsapp-text-card"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 10, x: 0 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-[calc(100vw-2.5rem)] max-w-[275px] sm:max-w-[310px] rounded-2xl bg-white p-3.5 sm:p-4 shadow-[0_12px_32px_-4px_rgba(36,35,38,0.12),0_3px_10px_rgba(0,0,0,0.05)] border border-stone-200/90 backdrop-blur-sm"
            >
              {/* Dismiss Button */}
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss shopping assistance card"
                className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              {/* Clickable Card Body */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/card block pr-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-lg"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#128C7E]">
                    Nelum Beauty Match
                  </span>
                </div>

                <h4 className="font-display text-[13px] sm:text-[14px] font-semibold text-ink leading-snug group-hover/card:text-brand transition-colors">
                  Need help finding your perfect beauty match?
                </h4>

                <p className="mt-1 text-[11px] sm:text-xs text-ink-2 leading-relaxed">
                  Get personalised product recommendations and shopping assistance.
                </p>

                <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#128C7E] group-hover/card:text-[#0b6459] transition-colors">
                  <span>Chat on WhatsApp</span>
                  <span aria-hidden="true" className="transition-transform group-hover/card:translate-x-0.5">
                    →
                  </span>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Circular WhatsApp Floating Button & Tooltip ─────────────────── */}
        <div className="group relative flex items-center">
          {/* Desktop Hover Tooltip (displayed when card is dismissed) */}
          {isDismissed && (
            <div
              role="tooltip"
              id="whatsapp-tooltip"
              className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 hidden sm:flex items-center opacity-0 translate-x-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0"
            >
              <div className="relative rounded-lg bg-ink px-3 py-1.5 text-xs font-medium tracking-wide text-white shadow-md whitespace-nowrap">
                Chat with us
                <span
                  className="absolute -right-1 top-1/2 -translate-y-1/2 h-0 w-0 border-y-4 border-y-transparent border-l-4 border-l-ink"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}

          {/* Official WhatsApp Floating Button */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Nelum Beauty on WhatsApp"
            aria-describedby={isDismissed ? 'whatsapp-tooltip' : undefined}
            className="relative flex h-[54px] w-[54px] sm:h-[58px] sm:w-[58px] shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.14),0_2px_6px_rgba(37,211,102,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18),0_4px_12px_rgba(37,211,102,0.35)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            {/* Official WhatsApp White Vector Icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 sm:h-[30px] sm:w-[30px] fill-white"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.aside>
  );
}
