import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { catalogConcerns } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';
import { MobileViewAll, SectionHeader } from '../ui/SectionHeader';

export function SkinConcernSection() {
  const skinConcerns = catalogConcerns.filter((s) => s.published);
  if (!skinConcerns.length) return null;

  return (
    <section aria-labelledby="shop-skin-concern-heading" className="bg-sand py-16 md:py-24">
      <Container>
        <SectionHeader
          id="shop-skin-concern-heading"
          title="Shop by skin concern"
          description="Botanical actives and clinical formulas for the specific results you want to see."
          linkHref="/discover#concerns"
          linkLabel="All concerns"
        />

        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:mt-12 lg:grid-cols-6 lg:gap-x-6">
          {skinConcerns.map((concern, idx) => (
            <ScrollItem key={concern.slug} index={idx} yOffset={24} duration={0.65}>
              <Link
                to={`/skin-concern/${concern.slug}`}
                className="group flex flex-col focus:outline-none"
                aria-label={`Shop products for ${concern.name}`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-product group-focus-visible:ring-2 group-focus-visible:ring-brand">
                  <img
                    src={concern.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex items-center justify-between gap-2 border-b border-line pb-2.5 pt-3.5 transition-colors duration-300 group-hover:border-ink">
                  <span className="truncate type-label text-ink transition-colors duration-200 group-hover:text-brand">
                    {concern.name}
                  </span>
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-brand"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </ScrollItem>
          ))}
        </div>

        <MobileViewAll href="/discover#concerns" label="All concerns" />
      </Container>
    </section>
  );
}
