import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

export type Crumb = {label: string;to?: string;};

export function Breadcrumbs({ items }: {items: Crumb[];}) {
  const all: Crumb[] = [{ label: 'Home', to: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-2">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1">
              {c.to && !last ?
              <Link to={c.to} className="hover:text-ink hover:underline underline-offset-2">
                  {c.label}
                </Link> :

              <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink' : undefined}>
                  {c.label}
                </span>
              }
              {!last && <ChevronRightIcon className="h-3 w-3 text-ink-muted" aria-hidden="true" />}
            </li>);

        })}
      </ol>
    </nav>);

}