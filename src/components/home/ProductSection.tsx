import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { Container } from '../layout/Container';
import { ProductCard } from '../product/ProductCard';
import { ScrollReveal, ScrollItem } from '../ui/ScrollReveal';

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  viewAllLabel?: string;
  columns?: 4 | 5;
  className?: string;
};

export function ProductSection({
  id,
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = 'View All',
  columns = 4,
  className = 'py-12 md:py-16',
}: Props) {
  if (!products.length) return null;

  const colClass =
    columns === 5
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  const headingId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <section aria-labelledby={headingId} className={className}>
      <Container>
        {/* Section Header */}
        <ScrollReveal yOffset={20} duration={0.65}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              {eyebrow && (
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand">
                  {eyebrow}
                </p>
              )}
              <h2
                id={headingId}
                className="font-display text-3xl font-normal text-ink sm:text-4xl"
              >
                {title}
              </h2>
              {description && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2 sm:text-base">
                  {description}
                </p>
              )}
            </div>

            <div className="shrink-0 pt-1 sm:pt-0">
              <Link
                to={viewAllHref}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:text-brand"
              >
                <span>{viewAllLabel}</span>
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Product Grid with Staggered Card Reveal */}
        <ul className={`mt-8 grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${colClass}`}>
          {products.map((product, i) => (
            <ScrollItem
              key={product.id}
              as="li"
              index={i}
              yOffset={24}
              duration={0.65}
            >
              <ProductCard product={product} priority={i < 4} />
            </ScrollItem>
          ))}
        </ul>

        {/* Mobile View All Link */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to={viewAllHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white py-2.5 text-sm font-medium text-ink shadow-sm transition-colors active:bg-surface"
          >
            <span>{viewAllLabel}</span>
            <ArrowRightIcon className="h-4 w-4 text-brand" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

