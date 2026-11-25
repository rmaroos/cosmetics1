import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { getTopCategories } from '../../utils/catalog';
import { Container } from './Container';
import { NewsletterForm } from './NewsletterForm';
import { Accordion } from '../ui/Accordion';

type Group = {heading: string;links: {label: string;to: string;}[];};

function groups(): Group[] {
  return [
  {
    heading: 'Shop',
    links: [
    ...getTopCategories().map((c) => ({ label: c.name, to: `/category/${c.slug}` })),
    { label: 'Brands', to: '/brands' },
    { label: 'New arrivals', to: '/collection/new-arrivals' },
    { label: 'Best sellers', to: '/collection/best-sellers' }]

  },
  {
    heading: 'Customer care',
    links: [
    { label: 'Contact us', to: '/contact' },
    { label: 'FAQs', to: '/faqs' },
    { label: 'Track an order', to: '/track-order' },
    { label: 'Delivery information', to: '/delivery-information' },
    { label: 'Returns & refunds', to: '/returns-refunds' }]

  },
  {
    heading: 'About',
    links: [
    { label: 'Our story', to: '/about' },
    { label: 'Beauty journal', to: '/journal' },
    { label: 'Ingredients guide', to: '/ingredients' },
    { label: 'Privacy policy', to: '/privacy-policy' },
    { label: 'Terms & conditions', to: '/terms-conditions' }]

  }];

}

export function Footer() {
  const linkClass = 'text-sm text-sand transition-colors duration-200 hover:text-ivory';
  return (
    <footer className="mt-auto bg-brand bg-botanical text-ivory">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <p className="font-display text-[32px] font-normal uppercase tracking-[0.12em] text-ivory">{siteConfig.name.split(' ')[0]}<span className="text-gold">.</span></p>
            <p className="mt-4 text-sm leading-relaxed text-sand">Curated skincare, makeup and fragrance from brands we trust — delivered islandwide. Join our list for new arrivals and members-first offers.</p>
            <div className="mt-5">
              <NewsletterForm tone="dark" />
            </div>
            <ul className="mt-8 space-y-2.5 text-sm text-sand">
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 text-gold" aria-hidden="true" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-ivory">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircleIcon className="h-4 w-4 text-gold" aria-hidden="true" />
                <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">
                  WhatsApp {siteConfig.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 text-gold" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-ivory">{siteConfig.email}</a>
              </li>
            </ul>
          </div>

          <div className="hidden grid-cols-3 gap-8 md:grid">
            {groups().map((g) =>
            <nav key={g.heading} aria-label={g.heading}>
                <h2 className="type-label text-ivory">{g.heading}</h2>
                <ul className="mt-5 space-y-3">
                  {g.links.map((l) =>
                <li key={l.to}>
                      <Link to={l.to} className={linkClass}>{l.label}</Link>
                    </li>
                )}
                </ul>
              </nav>
            )}
          </div>
          <div className="md:hidden">
            {groups().map((g) =>
            <Accordion key={g.heading} title={g.heading} headingLevel="h2" tone="dark">
                <ul className="space-y-2.5">
                  {g.links.map((l) =>
                <li key={l.to}>
                      <Link to={l.to} className={linkClass}>{l.label}</Link>
                    </li>
                )}
                </ul>
              </Accordion>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/15 pt-7 text-sm text-sand md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {siteConfig.address}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>We accept: Cash on delivery · Bank transfer</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 font-medium text-ivory underline decoration-ivory/40 underline-offset-4 hover:decoration-ivory"
            >
              <span>Admin Portal</span>
              <span aria-hidden="true">↗</span>
            </Link>
            <ul className="flex gap-4">
              {siteConfig.social.map((s) =>
              <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">{s.label}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </footer>);

}