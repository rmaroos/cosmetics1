import React from 'react';
import { CheckIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  number: number;
  title: string;
  state: 'active' | 'complete' | 'upcoming';
  summary?: React.ReactNode;
  onEdit?: () => void;
  children: React.ReactNode;
};

export function CheckoutStep({ number, title, state, summary, onEdit, children }: Props) {
  return (
    <section aria-labelledby={`step-${number}`} className={twMerge('rounded-2xl bg-white p-5 sm:p-7', state === 'upcoming' && 'bg-white/60')}>
      <div className="flex items-center gap-3">
        <span
          className={twMerge(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
            state === 'complete' ? 'bg-success text-white' : state === 'active' ? 'bg-ink text-white' : 'bg-line text-ink-2'
          )}
          aria-hidden="true">
          
          {state === 'complete' ? <CheckIcon className="h-4 w-4" /> : number}
        </span>
        <h2 id={`step-${number}`} className={twMerge('flex-1 text-lg font-semibold', state === 'upcoming' ? 'text-ink-muted' : 'text-ink')}>
          {title}
          {state === 'complete' && <span className="sr-only"> (completed)</span>}
        </h2>
        {state === 'complete' && onEdit &&
        <button type="button" onClick={onEdit} className="text-sm font-medium text-ink underline underline-offset-2 hover:text-brand">
            Edit<span className="sr-only"> {title}</span>
          </button>
        }
      </div>
      {state === 'complete' && summary && <div className="mt-3 pl-10 text-sm text-ink-2">{summary}</div>}
      {state === 'active' && <div className="mt-6">{children}</div>}
    </section>);

}