import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'left' | 'right';
  variant?: 'drawer' | 'modal';
  hideTitle?: boolean;
  className?: string;
};

const EASE = [0.23, 1, 0.32, 1] as const;

function useFocusTrap(open: boolean, ref: React.RefObject<HTMLDivElement>, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = ref.current;
    const focusables = () =>
    Array.from(
      node?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])') ?? []
    );
    const t = window.setTimeout(() => {
      const auto = node?.querySelector<HTMLElement>('[data-autofocus]');
      (auto ?? focusables()[0] ?? node)?.focus();
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Tab') {
        const list = focusables();
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, ref, onClose]);
}

export function Overlay({ open, onClose, title, children, footer, side = 'right', variant = 'drawer', hideTitle, className }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useFocusTrap(open, ref, onClose);

  const drawerMotion = {
    initial: { x: reduce ? 0 : side === 'right' ? '100%' : '-100%', opacity: reduce ? 0 : 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: reduce ? 0 : side === 'right' ? '100%' : '-100%', opacity: reduce ? 0 : 1 }
  };
  const modalMotion = {
    initial: { opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 8 }
  };

  return (
    <AnimatePresence>
      {open &&
      <div className={twMerge('fixed inset-0 z-50', variant === 'modal' && 'flex items-center justify-center p-4')}>
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={onClose}
          aria-hidden="true" />
        
          <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          {...variant === 'drawer' ? drawerMotion : modalMotion}
          transition={{ duration: variant === 'drawer' ? 0.28 : 0.22, ease: EASE }}
          className={twMerge(
            'flex flex-col overflow-hidden bg-white shadow-xl focus:outline-none',
            variant === 'drawer' ?
            twMerge('absolute inset-y-0 w-full max-w-[420px]', side === 'right' ? 'right-0' : 'left-0') :
            'relative max-h-[90vh] w-full max-w-lg rounded-2xl',
            className
          )}>
          
            <div className={twMerge('flex items-center justify-between border-b border-line px-5 py-4', hideTitle && 'border-none pb-0')}>
              <h2 className={twMerge('text-base font-semibold text-ink', hideTitle && 'sr-only')}>{title}</h2>
              <button
              type="button"
              onClick={onClose}
              className="-mr-2 ml-auto flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-surface"
              aria-label="Close">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
            {footer && <div className="border-t border-line p-5">{footer}</div>}
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}