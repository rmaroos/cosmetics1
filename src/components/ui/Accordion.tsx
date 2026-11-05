import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headingLevel?: 'h2' | 'h3';
};

export function Accordion({ title, children, defaultOpen = false, className, headingLevel = 'h3' }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const Heading = headingLevel;
  return (
    <div className={twMerge('border-b border-line', className)}>
      <Heading>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-ink">
          
          {title}
          <ChevronDownIcon
            className={twMerge('h-5 w-5 shrink-0 text-ink-2 transition-transform duration-200 ease-out', open && 'rotate-180')}
            aria-hidden="true" />
          
        </button>
      </Heading>
      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <div className="pb-5 text-[15px] leading-relaxed text-ink-2">{children}</div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}