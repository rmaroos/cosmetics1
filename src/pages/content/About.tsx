import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { siteConfig } from '../../data/site';
import { img } from '../../data/images';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { Button } from '../../components/ui/Button';

const principles = [
{ title: 'Sourced responsibly', text: 'We buy from brands and their authorised distributors, and store products away from heat and direct sun.' },
{ title: 'Honest information', text: 'Product details come from the brands we stock. We don’t promise results or make medical claims.' },
{ title: 'Made for our climate', text: 'We look for textures and formulas that work in heat and humidity, and shade ranges that suit Sri Lankan skin tones.' }];


export function About() {
  useDocumentMeta('Our story', `Learn about ${siteConfig.name}, a Sri Lankan beauty retailer.`);
  return (
    <div className="pb-20">
      <Container>
        <Breadcrumbs items={[{ label: 'Our story' }]} />
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="font-display text-4xl leading-tight text-ink md:text-6xl">Beauty, thoughtfully chosen for Sri Lanka</h1>
            <p className="mt-5 text-lg text-ink-2">
              {siteConfig.name} started in Colombo with a simple idea: make it easier to find skincare and beauty products that genuinely suit our climate, our skin and our routines.
            </p>
            <p className="mt-4 text-ink-2">
              We curate a focused range from local botanical makers and international brands, and deliver to every district on the island.
            </p>
          </div>
          <img src={img.about} alt="Our Colombo store with shelves of skincare products and plants" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </Container>
      <Container className="mt-20">
        <h2 className="font-display text-3xl text-ink md:text-4xl">What we stand for</h2>
        <ol className="mt-8 grid gap-10 md:grid-cols-3">
          {principles.map((p) =>
          <li key={p.title} className="border-t border-ink pt-5">
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-ink-2">{p.text}</p>
            </li>
          )}
        </ol>
      </Container>
      <Container className="mt-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brand-soft p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-3xl text-ink">Visit or get in touch</h2>
            <p className="mt-2 text-ink-2">{siteConfig.address} · {siteConfig.hours}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact" variant="dark">Contact us</Button>
            <Button to="/shop" variant="secondary">Shop now</Button>
          </div>
        </div>
      </Container>
    </div>);

}