import React from 'react';
import type { Product } from '../../types/catalog';
import { Container } from '../layout/Container';
import { ProductCard } from '../product/ProductCard';
import { ScrollItem } from '../ui/ScrollReveal';
import { MobileViewAll, SectionHeader } from '../ui/SectionHeader';
import { SectionBotanicals, type BotanicalLayout } from '../ui/Botanicals';

type Props = {
  id?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  viewAllLabel?: string;
  columns?: 4 | 5;
  className?: string;
  /** Faint leaf/flower decorations in the section's empty corners. */
  decor?: BotanicalLayout;
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
  decor,
}: Props) {
  if (!products.length) return null;

  // 2 mobile · 3 large phone · 4 tablet · 6 laptop & desktop
  const colClass = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';

  const headingId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <section aria-labelledby={headingId} className={`relative overflow-hidden ${className}`}>
      {decor && <SectionBotanicals layout={decor} />}
      <Container className="relative">


        <SectionHeader
          id={headingId}
          title={title}
          description={description}
          linkHref={viewAllHref}
          linkLabel={viewAllLabel}
        />

        <ul className={`mt-10 grid gap-x-3 gap-y-8 sm:gap-x-4 md:mt-12 lg:gap-y-10 ${colClass}`}>
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
