import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { getCollectionBySlug, productsInCollection } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ProductGrid } from '../product/ProductGrid';

const TAB_SLUGS = ['best-sellers', 'new-arrivals', 'trending'];

export function CollectionTabs() {
  const tabs = TAB_SLUGS.map(getCollectionBySlug).
  filter((c): c is NonNullable<typeof c> => Boolean(c)).
  map((c) => ({ collection: c, products: productsInCollection(c).slice(0, 8) })).
  filter((t) => t.products.length > 0);
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  if (!tabs.length) return null;
  const current = tabs[Math.min(active, tabs.length - 1)];

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="collections-heading" className="py-12 md:py-16">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="collections-heading" className="font-display text-3xl text-ink md:text-4xl">
            Customer favourites
          </h2>
          <div role="tablist" aria-label="Product collections" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            {tabs.map((t, i) =>
            <button
              key={t.collection.id}
              ref={(el) => refs.current[i] = el}
              role="tab"
              id={`tab-${t.collection.slug}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.collection.slug}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={twMerge(
                'h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-[background-color,border-color,color] duration-150 ease-out',
                i === active ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-ink'
              )}>
              
                {t.collection.name}
              </button>
            )}
          </div>
        </div>
        <div role="tabpanel" id={`panel-${current.collection.slug}`} aria-labelledby={`tab-${current.collection.slug}`} className="mt-8">
          <ProductGrid products={current.products} />
          <div className="mt-10 flex justify-center">
            <Link to={`/collection/${current.collection.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:text-brand hover:underline">
              Shop all {current.collection.name.toLowerCase()} <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>);

}