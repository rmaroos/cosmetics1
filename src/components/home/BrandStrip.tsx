import React from 'react';
import { Link } from 'react-router-dom';
import { catalogBrands, productsByBrand } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ScrollReveal, ScrollItem } from '../ui/ScrollReveal';

export function BrandStrip() {
  // Dynamically populated from brand data (published brands with available products)
  const brandsToDisplay = catalogBrands.filter(
    (b) => b.published && productsByBrand(b.id).length > 0
  );

  if (!brandsToDisplay.length) return null;

  return (
<<<<<<< HEAD
    <section aria-labelledby="shop-by-brand-heading" className="border-y border-line/70 py-16 md:py-20">
      <Container>
        {/* Section Header */}
        <ScrollReveal yOffset={20} duration={0.65}>
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <h2
              id="shop-by-brand-heading"
              className="heading-xl"
=======
    <section aria-labelledby="shop-by-brand-heading" className="bg-white py-12 md:py-16">
      <Container>
        {/* Section Header */}
        <ScrollReveal yOffset={20} duration={0.65}>
          <div className="mb-6 flex items-baseline justify-between sm:mb-8">
            <h2
              id="shop-by-brand-heading"
              className="font-display text-2xl font-normal text-ink sm:text-3xl md:text-4xl"
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
            >
              Shop by Brand
            </h2>
            <Link
              to="/brands"
<<<<<<< HEAD
              className="link-luxe"
=======
              className="text-sm font-medium text-ink-2 transition-colors duration-150 hover:text-brand"
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
            >
              View all
            </Link>
          </div>
        </ScrollReveal>

        {/* Clean Horizontal Grid with Staggered Logos */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {brandsToDisplay.map((brand, idx) => (
            <ScrollItem
              key={brand.id}
              index={idx}
              yOffset={20}
              duration={0.6}
            >
              <Link
                to={`/brand/${brand.slug}`}
<<<<<<< HEAD
                className="group flex aspect-[3/2] items-center justify-center rounded-2xl border border-line/70 bg-white p-5 transition-all duration-300 ease-out hover:border-gold/60 hover:shadow-soft"
=======
                className="group flex aspect-[3/2] items-center justify-center rounded-lg bg-[#F5F5F5] p-4 transition-all duration-200 ease-out hover:bg-[#ECECED] hover:shadow-sm"
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
                aria-label={`Shop ${brand.name}`}
              >
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
<<<<<<< HEAD
                    className="max-h-7 sm:max-h-8 md:max-h-9 w-auto max-w-[80%] object-contain opacity-70 grayscale transition-all duration-300 ease-out group-hover:opacity-100 group-hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-display text-xl font-normal tracking-wide text-ink-2 transition-colors duration-200 group-hover:text-ink">
=======
                    className="max-h-7 sm:max-h-8 md:max-h-9 w-auto max-w-[80%] object-contain transition-transform duration-200 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-display text-lg font-medium text-ink transition-colors duration-150 group-hover:text-brand">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
                    {brand.name}
                  </span>
                )}
              </Link>
            </ScrollItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
