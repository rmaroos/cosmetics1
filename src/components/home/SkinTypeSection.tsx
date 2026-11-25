import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { ArrowUpRightIcon } from 'lucide-react';
import { catalogSkinTypes } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';
import { MobileViewAll, SectionHeader } from '../ui/SectionHeader';
=======
import { ArrowRightIcon } from 'lucide-react';
import { catalogSkinTypes } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ScrollReveal, ScrollItem } from '../ui/ScrollReveal';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9

export function SkinTypeSection() {
  const skinTypes = catalogSkinTypes.filter((s) => s.published);
  if (!skinTypes.length) return null;

  return (
<<<<<<< HEAD
    <section aria-labelledby="shop-skin-type-heading" className="bg-sand py-16 md:py-24">
      <Container>
        <SectionHeader
          id="shop-skin-type-heading"
          title="Shop by skin type"
          description="Nourish and balance your skin with textures formulated for how your skin behaves day to day."
          linkHref="/discover#skin-types"
          linkLabel="Explore skin types"
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:mt-12 lg:grid-cols-5 lg:gap-6">
          {skinTypes.map((type, idx) => (
            <ScrollItem key={type.slug} index={idx} yOffset={24} duration={0.65}>
              <Link
                to={`/skin-type/${type.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-product focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                aria-label={`Shop products for ${type.name}`}
              >
                <img
                  src={type.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                  <span className="type-category leading-none text-white">
                    {type.name}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
                    <ArrowUpRightIcon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
=======
    <section aria-labelledby="shop-skin-type-heading" className="bg-white py-12 md:py-16">
      <Container>
        {/* Section Header */}
        <ScrollReveal yOffset={20} duration={0.65}>
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
        </ScrollReveal>

        {/* 5-Card Responsive Grid with Staggered Reveal */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-6">
          {skinTypes.map((type, idx) => (
            <ScrollItem
              key={type.slug}
              index={idx}
              yOffset={24}
              duration={0.65}
            >
              <Link
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
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
                </div>
              </Link>
            </ScrollItem>
          ))}
        </div>
<<<<<<< HEAD

        <MobileViewAll href="/discover#skin-types" label="Explore skin types" />
=======
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
      </Container>
    </section>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
