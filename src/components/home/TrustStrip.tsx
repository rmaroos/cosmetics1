import React from 'react';
import { MessageCircleIcon, ShieldCheckIcon, TruckIcon, WalletIcon } from 'lucide-react';
import { trustItems } from '../../data/site';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';

const icons = { truck: TruckIcon, wallet: WalletIcon, shield: ShieldCheckIcon, message: MessageCircleIcon };

export function TrustStrip() {
  return (
    <section aria-label="Our service" className="border-b border-line/70">
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line/80">
          {trustItems.map((t, idx) => {
            const Icon = icons[t.icon];
            return (
              <ScrollItem
                key={t.id}
                as="li"
                index={idx}
                yOffset={16}
                duration={0.6}
                className="flex flex-col items-center gap-3 px-4 py-8 text-center md:py-10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-text">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" strokeWidth={1.4} />
                </span>
                <div>
                  <p className="type-label text-ink">{t.title}</p>
                  <p className="mx-auto mt-2 max-w-[26ch] text-sm leading-snug text-ink-2">{t.text}</p>
                </div>
              </ScrollItem>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
