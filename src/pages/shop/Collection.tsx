import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { catalogCollections, getCollectionBySlug, productsInCollection } from '../../utils/catalog';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { ProductListing, SubcategoryChips } from '../../components/listing/ProductListing';
import { NotFound } from '../NotFound';

export function Collection() {
  const { slug = '' } = useParams();
  const collection = getCollectionBySlug(slug);
  useDocumentMeta(collection?.name ?? 'Collection', collection?.description);
  if (!collection) return <NotFound title="This collection has ended" description="It may have been a limited-time edit. Explore our current collections instead." />;

  return (
    <Container className="pb-16">
      <ListingHeader crumbs={[{ label: 'Collections', to: '/collections' }, { label: collection.name }]} title={collection.name} description={collection.description} />
      <SubcategoryChips items={catalogCollections.map((c) => ({ label: c.name, to: `/collection/${c.slug}`, active: c.id === collection.id }))} />
      <ProductListing
        listingKey={`collection-${collection.id}`}
        resolveProducts={() => productsInCollection(collection)}
        emptyTitle="This collection is empty right now"
        emptyDescription="Check back soon — we update our collections regularly." />
      
    </Container>);

}