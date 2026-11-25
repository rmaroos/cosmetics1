import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { catalogSkinTypes } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';
import { MobileViewAll, SectionHeader } from '../ui/SectionHeader';

export function SkinTypeSection() {
  const skinTypes = catalogSkinTypes.filter((s) => s.published);
  if (!skinTypes.length) return null;

  return (
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
                </div>
              </Link>
            </ScrollItem>
          ))}
        </div>

        <MobileViewAll href="/discover#skin-types" label="Explore skin types" />
      </Container>
    </section>
  );
}
