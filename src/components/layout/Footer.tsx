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
<<<<<<< HEAD
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
=======
  const linkClass = 'text-sm text-ink-2 hover:text-ink hover:underline underline-offset-2';
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <p className="font-display text-3xl text-ink">Join our list</p>
            <p className="mt-2 text-sm text-ink-2">New arrivals, routine tips and members-first offers. No spam.</p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
            <ul className="mt-8 space-y-2.5 text-sm text-ink-2">
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="hover:text-ink">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircleIcon className="h-4 w-4" aria-hidden="true" />
                <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
                  WhatsApp {siteConfig.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
<<<<<<< HEAD
                <MailIcon className="h-4 w-4 text-gold" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-ivory">{siteConfig.email}</a>
=======
                <MailIcon className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">{siteConfig.email}</a>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
              </li>
            </ul>
          </div>

          <div className="hidden grid-cols-3 gap-8 md:grid">
            {groups().map((g) =>
            <nav key={g.heading} aria-label={g.heading}>
<<<<<<< HEAD
                <h2 className="type-label text-ivory">{g.heading}</h2>
                <ul className="mt-5 space-y-3">
=======
                <h2 className="text-sm font-semibold text-ink">{g.heading}</h2>
                <ul className="mt-4 space-y-2.5">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
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
<<<<<<< HEAD
            <Accordion key={g.heading} title={g.heading} headingLevel="h2" tone="dark">
=======
            <Accordion key={g.heading} title={g.heading} headingLevel="h2">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
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

<<<<<<< HEAD
        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/15 pt-7 text-sm text-sand md:flex-row md:items-center md:justify-between">
=======
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-ink-2 md:flex-row md:items-center md:justify-between">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          <p>© {new Date().getFullYear()} {siteConfig.name}. {siteConfig.address}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>We accept: Cash on delivery · Bank transfer</span>
            <Link
              to="/admin"
<<<<<<< HEAD
              className="inline-flex items-center gap-1 font-medium text-ivory underline decoration-ivory/40 underline-offset-4 hover:decoration-ivory"
=======
              className="inline-flex items-center gap-1 font-semibold text-[#9F2438] hover:underline"
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
            >
              <span>Admin Portal</span>
              <span aria-hidden="true">↗</span>
            </Link>
            <ul className="flex gap-4">
              {siteConfig.social.map((s) =>
              <li key={s.label}>
<<<<<<< HEAD
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">{s.label}</a>
=======
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">{s.label}</a>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </footer>);

}