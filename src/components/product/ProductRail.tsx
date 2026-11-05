import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { ProductCard } from './ProductCard';
import { Container } from '../layout/Container';

type Props = {
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
  headingId?: string;
};

/** Horizontal, scroll-snapped product row. Hidden entirely when there are no products. */
export function ProductRail({ title, description, products, viewAllHref, headingId }: Props) {
  const scroller = useRef<HTMLUListElement>(null);
  if (!products.length) return null;
  const id = headingId ?? `rail-${title.toLowerCase().replace(/\W+/g, '-')}`;

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby={id} className="py-12 md:py-16">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 id={id} className="font-display text-3xl leading-tight text-ink md:text-4xl">
              {title}
            </h2>
            {description && <p className="mt-1.5 text-ink-2">{description}</p>}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {viewAllHref &&
            <Link to={viewAllHref} className="mr-2 hidden items-center gap-1.5 text-sm font-medium text-ink hover:text-brand sm:inline-flex">
                View all <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
            <button type="button" onClick={() => scroll(-1)} className="hidden h-10 w-10 items-center justify-center rounded-full border border-line hover:border-ink md:flex" aria-label={`Scroll ${title} left`}>
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => scroll(1)} className="hidden h-10 w-10 items-center justify-center rounded-full border border-line hover:border-ink md:flex" aria-label={`Scroll ${title} right`}>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <ul ref={scroller} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-6 sm:px-6 lg:mx-0 lg:px-0">
          {products.map((p) =>
          <li key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[calc(25%-18px)]">
              <ProductCard product={p} />
            </li>
          )}
        </ul>
        {viewAllHref &&
        <Link to={viewAllHref} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink sm:hidden">
            View all <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      </Container>
    </section>);

}