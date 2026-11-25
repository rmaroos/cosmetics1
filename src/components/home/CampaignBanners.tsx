import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { campaigns } from '../../data/site';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';

export function CampaignBanners() {
  if (!campaigns.length) return null;
  return (
    <section aria-label="Current campaigns" className="py-4 md:py-8">
      <Container className="grid gap-4 md:grid-cols-2 md:gap-6">
        {campaigns.map((c, idx) => (
          <ScrollItem key={c.id} as="article" index={idx} yOffset={24} duration={0.7}>
            <Link
              to={c.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-product sm:aspect-[5/4]"
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                <h2 className="max-w-[16ch] type-section">
                  {c.title}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">{c.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 border-b border-white/60 pb-1 type-button transition-colors group-hover:border-white">
                  {c.cta}
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          </ScrollItem>
        ))}
      </Container>
    </section>
  );
}
