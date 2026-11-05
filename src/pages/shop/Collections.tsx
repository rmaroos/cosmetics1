import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { catalogCollections, productsInCollection } from '../../utils/catalog';
import { pluralize } from '../../utils/format';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';

export function Collections() {
  useDocumentMeta('Collections', 'Curated edits: new arrivals, best sellers, offers, gift sets and more.');
  const list = catalogCollections.filter((c) => productsInCollection(c).length > 0);
  return (
    <Container className="pb-16">
      <ListingHeader crumbs={[{ label: 'Collections' }]} title="Collections" description="Curated edits from our beauty team." />
      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) =>
        <li key={c.id}>
            <Link to={`/collection/${c.slug}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-product">
                {c.image && <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />}
              </div>
              <h2 className="mt-4 font-display text-2xl text-ink group-hover:text-brand">{c.name}</h2>
              <p className="mt-1 text-sm text-ink-2">{c.description}</p>
              <p className="mt-1 text-xs text-ink-muted">{pluralize(productsInCollection(c).length, 'product')}</p>
            </Link>
          </li>
        )}
      </ul>
    </Container>);

}