import React from 'react';
import { MessageCircleIcon, ShieldCheckIcon, TruckIcon, WalletIcon } from 'lucide-react';
import { trustItems } from '../../data/site';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';

const icons = { truck: TruckIcon, wallet: WalletIcon, shield: ShieldCheckIcon, message: MessageCircleIcon };

export function TrustStrip() {
  return (
    <section aria-label="Our service" className="py-10 md:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {trustItems.map((t, idx) => {
            const Icon = icons[t.icon];
            return (
              <ScrollItem
                key={t.id}
                as="li"
                index={idx}
                yOffset={20}
                duration={0.65}
                className="flex items-start gap-3"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-ink">{t.title}</p>
                  <p className="mt-0.5 text-sm text-ink-2">{t.text}</p>
                </div>
              </ScrollItem>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}