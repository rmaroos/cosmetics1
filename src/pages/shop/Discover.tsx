import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { catalogConcerns, catalogSkinTypes, productsByConcern, productsBySkinType } from '../../utils/catalog';
import { pluralize } from '../../utils/format';
import { img } from '../../data/images';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';

export function Discover() {
  useDocumentMeta('Beauty discovery', 'Find products by skin type or skin concern, and learn about ingredients and routines.');
  return (
    <Container className="pb-16">
      <ListingHeader
        crumbs={[{ label: 'Discover' }]}
        title="Find what works for your skin"
        description="Your skin type describes how your skin generally behaves. A concern is something specific you’d like to focus on. Start with either." />
      

      <section id="skin-types" aria-labelledby="types-h" className="scroll-mt-24 border-t border-line pt-8">
        <h2 id="types-h" className="font-display text-3xl text-ink">Skin types</h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {catalogSkinTypes.map((s) =>
          <li key={s.slug} className="border-b border-line">
              <Link to={`/skin-type/${s.slug}`} className="group flex items-start justify-between gap-4 py-5">
                <span>
                  <span className="block text-lg font-medium text-ink group-hover:text-brand">{s.name}</span>
                  <span className="mt-1 block text-sm text-ink-2">{s.description}</span>
                  <span className="mt-2 block text-xs text-ink-muted">{pluralize(productsBySkinType(s.slug).length, 'product')}</span>
                </span>
                <ArrowRightIcon className="mt-1.5 h-4 w-4 shrink-0 text-ink-muted group-hover:text-brand" aria-hidden="true" />
              </Link>
            </li>
          )}
        </ul>
      </section>

      <section id="concerns" aria-labelledby="concerns-h" className="mt-14 scroll-mt-24 border-t border-line pt-8">
        <h2 id="concerns-h" className="font-display text-3xl text-ink">Skin concerns</h2>
        <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {catalogConcerns.map((s) =>
          <li key={s.slug} className="border-b border-line">
              <Link to={`/skin-concern/${s.slug}`} className="group block py-5">
                <span className="block text-lg font-medium text-ink group-hover:text-brand">{s.name}</span>
                <span className="mt-1 block text-xs text-ink-muted">{pluralize(productsByConcern(s.slug).length, 'product')}</span>
              </Link>
            </li>
          )}
        </ul>
      </section>

      <section aria-labelledby="learn-h" className="mt-16 grid gap-6 md:grid-cols-2">
        <h2 id="learn-h" className="sr-only">Learn more</h2>
        {[
        { title: 'Ingredients guide', text: 'What popular actives do, and how to pair them.', to: '/ingredients', image: img.editorialIngredients },
        { title: 'Routine guides', text: 'Simple morning and evening routines for every skin type.', to: '/routines', image: img.editorialRoutine }].
        map((c) =>
        <Link key={c.to} to={c.to} className="group grid overflow-hidden rounded-2xl bg-brand-pale sm:grid-cols-2">
            <img src={c.image} alt="" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            <span className="flex flex-col justify-center p-6">
              <span className="font-display text-2xl text-ink">{c.title}</span>
              <span className="mt-1.5 text-sm text-ink-2">{c.text}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Explore <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </Link>
        )}
      </section>
    </Container>);

}