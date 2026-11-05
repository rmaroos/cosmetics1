import React from 'react';
import { campaigns } from '../../data/site';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { ScrollItem } from '../ui/ScrollReveal';

export function CampaignBanners() {
  if (!campaigns.length) return null;
  return (
    <section aria-label="Current campaigns" className="pb-4">
      <Container className="grid gap-4 md:grid-cols-2 md:gap-6">
        {campaigns.map((c, idx) => (
          <ScrollItem
            key={c.id}
            as="article"
            index={idx}
            yOffset={24}
            duration={0.7}
            className={`grid overflow-hidden rounded-2xl sm:grid-cols-2 ${c.tone === 'sage' ? 'bg-sage-soft' : 'bg-brand-soft'}`}
          >
            <div className="flex flex-col justify-center p-6 lg:p-8">
              <h2 className="font-display text-[28px] leading-tight text-ink lg:text-[32px]">{c.title}</h2>
              <p className="mt-2 text-sm text-ink-2">{c.description}</p>
              <Button to={c.href} variant="dark" size="sm" className="mt-5 self-start">
                {c.cta}
              </Button>
            </div>
            <img src={c.image} alt="" loading="lazy" className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto" />
          </ScrollItem>
        ))}
      </Container>
    </section>
  );
}