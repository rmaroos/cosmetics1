import React from 'react';
import { MessageCircleIcon, ShieldCheckIcon, TruckIcon, WalletIcon } from 'lucide-react';
import { trustItems } from '../../data/site';
import { Container } from '../layout/Container';

const icons = { truck: TruckIcon, wallet: WalletIcon, shield: ShieldCheckIcon, message: MessageCircleIcon };

export function TrustStrip() {
  return (
    <section aria-label="Our service" className="py-10 md:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {trustItems.map((t) => {
            const Icon = icons[t.icon];
            return (
              <li key={t.id} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-ink">{t.title}</p>
                  <p className="mt-0.5 text-sm text-ink-2">{t.text}</p>
                </div>
              </li>);

          })}
        </ul>
      </Container>
    </section>);

}