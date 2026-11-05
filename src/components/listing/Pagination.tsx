import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {page: number;totalPages: number;onChange: (page: number) => void;};

function range(page: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('gap');
    out.push(p);
  });
  return out;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;
  const go = (p: number) => {
    onChange(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const btn = 'flex h-10 min-w-[40px] items-center justify-center rounded-lg px-2 text-sm font-medium';
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1">
      <button type="button" className={twMerge(btn, 'text-ink hover:bg-surface disabled:opacity-40')} onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <ChevronLeftIcon className="h-4 w-4" />
      </button>
      {range(page, totalPages).map((p, i) =>
      p === 'gap' ?
      <span key={`gap-${i}`} className="px-1 text-ink-muted" aria-hidden="true">…</span> :

      <button
        key={p}
        type="button"
        onClick={() => go(p)}
        aria-current={p === page ? 'page' : undefined}
        aria-label={`Page ${p}`}
        className={twMerge(btn, p === page ? 'bg-ink text-white' : 'text-ink hover:bg-surface')}>
        
            {p}
          </button>

      )}
      <button type="button" className={twMerge(btn, 'text-ink hover:bg-surface disabled:opacity-40')} onClick={() => go(page + 1)} disabled={page >= totalPages} aria-label="Next page">
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>);

}