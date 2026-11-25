import React from 'react';
import type { Product } from '../../types/catalog';
import { Container } from '../layout/Container';
import { ProductCard } from '../product/ProductCard';
import { ScrollItem } from '../ui/ScrollReveal';
import { MobileViewAll, SectionHeader } from '../ui/SectionHeader';

type Props = {
  id?: string;
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
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = 'View All',
  columns = 4,
  className = 'py-16 md:py-24',
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
        <SectionHeader
          id={headingId}
          title={title}
          description={description}
          linkHref={viewAllHref}
          linkLabel={viewAllLabel}
        />

        <ul className={`mt-10 grid gap-x-4 gap-y-10 sm:gap-x-6 md:mt-12 lg:gap-x-8 lg:gap-y-14 ${colClass}`}>
          {products.map((product, i) => (
            <ScrollItem key={product.id} as="li" index={i} yOffset={24} duration={0.65}>
              <ProductCard product={product} priority={i < 4} />
            </ScrollItem>
          ))}
        </ul>

        <MobileViewAll href={viewAllHref} label={viewAllLabel} />
      </Container>
    </section>
  );
}
