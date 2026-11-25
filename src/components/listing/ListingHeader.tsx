import React from 'react';
import { Breadcrumbs, type Crumb } from '../layout/Breadcrumbs';

type Props = {
  crumbs: Crumb[];
  title: string;
  description?: string;
<<<<<<< HEAD
=======
  eyebrow?: string;
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

<<<<<<< HEAD
export function ListingHeader({ crumbs, title, description, aside, children }: Props) {
=======
export function ListingHeader({ crumbs, title, description, eyebrow, aside, children }: Props) {
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
  return (
    <header className="pb-6 md:pb-8">
      <Breadcrumbs items={crumbs} />
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
<<<<<<< HEAD
          <h1 className="type-page text-ink">{title}</h1>
          {description && <p className="mt-4 text-base leading-relaxed text-ink-2">{description}</p>}
=======
          {eyebrow && <p className="mb-2 text-sm font-medium text-brand">{eyebrow}</p>}
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">{title}</h1>
          {description && <p className="mt-3 text-[15px] leading-relaxed text-ink-2 md:text-base">{description}</p>}
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
        </div>
        {aside}
      </div>
      {children}
    </header>);

}