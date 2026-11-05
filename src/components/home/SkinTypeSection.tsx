import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { catalogSkinTypes } from '../../utils/catalog';
import { Container } from '../layout/Container';

export function SkinTypeSection() {
  const skinTypes = catalogSkinTypes.filter((s) => s.published);
  if (!skinTypes.length) return null;

  return (
    <section aria-labelledby="shop-skin-type-heading" className="bg-white py-12 md:py-16">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand">
              Targeted Formulation
            </p>
            <h2
              id="shop-skin-type-heading"
              className="font-display text-3xl font-normal text-ink sm:text-4xl"
            >
              Shop by Skin Type
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-2 sm:text-base">
              Nourish and balance your skin with textures formulated for how your skin behaves day to day.
            </p>
          </div>

          <div className="shrink-0 pt-1 sm:pt-0">
            <Link
              to="/discover#skin-types"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:text-brand"
            >
              <span>Explore Skin Types</span>
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* 5-Card Responsive Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {skinTypes.map((type) => (
            <Link
              key={type.slug}
              to={`/skin-type/${type.slug}`}
              className="group flex flex-col focus:outline-none"
              aria-label={`Shop products for ${type.name}`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-product shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-brand">
                <img
                  src={type.image}
                  alt={`${type.name} - ${type.description}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5"
                  aria-hidden="true"
                />
              </div>
              <div className="pt-3 text-center sm:pt-3.5">
                <span className="font-display text-lg font-medium text-ink transition-colors duration-200 group-hover:text-brand sm:text-xl">
                  {type.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

