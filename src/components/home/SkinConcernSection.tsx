import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { catalogConcerns } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ScrollReveal, ScrollItem } from '../ui/ScrollReveal';

export function SkinConcernSection() {
  const skinConcerns = catalogConcerns.filter((s) => s.published);
  if (!skinConcerns.length) return null;

  return (
    <section aria-labelledby="shop-skin-concern-heading" className="bg-[#FAF9F8] py-12 md:py-16">
      <Container>
        {/* Section Header */}
        <ScrollReveal yOffset={20} duration={0.65}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand">
                Problem-Solution Discovery
              </p>
              <h2
                id="shop-skin-concern-heading"
                className="font-display text-3xl font-normal text-ink sm:text-4xl"
              >
                Shop by Skin Concern
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2 sm:text-base">
                Targeted botanical actives and clinical solutions for the specific results you want to achieve.
              </p>
            </div>

            <div className="shrink-0 pt-1 sm:pt-0">
              <Link
                to="/discover#concerns"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:text-brand"
              >
                <span>Explore All Concerns</span>
                <ArrowRightIcon
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* 10-Card Responsive Grid with Staggered Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {skinConcerns.map((concern, idx) => (
            <ScrollItem
              key={concern.slug}
              index={idx}
              yOffset={24}
              duration={0.65}
            >
              <Link
                to={`/skin-concern/${concern.slug}`}
                className="group flex flex-col focus:outline-none"
                aria-label={`Shop products for ${concern.name}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-product shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-brand">
                  <img
                    src={concern.image}
                    alt={`${concern.name} - ${concern.description}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex items-center justify-between gap-1.5 pt-3 sm:pt-3.5">
                  <span className="truncate font-display text-base font-medium text-ink transition-colors duration-200 group-hover:text-brand sm:text-lg">
                    {concern.name}
                  </span>
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-brand"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </ScrollItem>
          ))}
        </div>
      </Container>
    </section>
  );
}

