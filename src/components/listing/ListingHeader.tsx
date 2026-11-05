import React from 'react';
import { Breadcrumbs, type Crumb } from '../layout/Breadcrumbs';

type Props = {
  crumbs: Crumb[];
  title: string;
  description?: string;
  eyebrow?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

export function ListingHeader({ crumbs, title, description, eyebrow, aside, children }: Props) {
  return (
    <header className="pb-6 md:pb-8">
      <Breadcrumbs items={crumbs} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <p className="mb-2 text-sm font-medium text-brand">{eyebrow}</p>}
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">{title}</h1>
          {description && <p className="mt-3 text-[15px] leading-relaxed text-ink-2 md:text-base">{description}</p>}
        </div>
        {aside}
      </div>
      {children}
    </header>);

}