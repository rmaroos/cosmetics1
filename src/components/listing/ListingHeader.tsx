import React from 'react';
import { Breadcrumbs, type Crumb } from '../layout/Breadcrumbs';

type Props = {
  crumbs: Crumb[];
  title: string;
  description?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

export function ListingHeader({ crumbs, title, description, aside, children }: Props) {
  return (
    <header className="pb-6 md:pb-8">
      <Breadcrumbs items={crumbs} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="type-page text-ink">{title}</h1>
          {description && <p className="mt-4 text-base leading-relaxed text-ink-2">{description}</p>}
        </div>
        {aside}
      </div>
      {children}
    </header>);

}