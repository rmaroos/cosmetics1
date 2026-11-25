import React from 'react';
import { MessageCircleIcon, ShieldCheckIcon, TruckIcon, WalletIcon } from 'lucide-react';
import { trustItems } from '../../data/site';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';

const icons = { truck: TruckIcon, wallet: WalletIcon, shield: ShieldCheckIcon, message: MessageCircleIcon };

export function TrustStrip() {
  return (
<<<<<<< HEAD
    <section aria-label="Our service" className="border-b border-line/70">
      <Container>
        <ul className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line/80">
=======
    <section aria-label="Our service" className="py-10 md:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          {trustItems.map((t, idx) => {
            const Icon = icons[t.icon];
            return (
              <ScrollItem
                key={t.id}
                as="li"
                index={idx}
<<<<<<< HEAD
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
=======
                yOffset={20}
                duration={0.65}
                className="flex items-start gap-3"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-ink">{t.title}</p>
                  <p className="mt-0.5 text-sm text-ink-2">{t.text}</p>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
                </div>
              </ScrollItem>
            );
          })}
        </ul>
      </Container>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
