import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { catalogProducts, getTopCategories } from '../../utils/catalog';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { ProductListing, SubcategoryChips } from '../../components/listing/ProductListing';

export function Shop() {
  useDocumentMeta('Shop all', 'Browse every product we stock — skincare, makeup, body care, hair care, fragrance and tools.');
  return (
    <Container className="pb-16">
      <ListingHeader crumbs={[{ label: 'Shop all' }]} title="Shop all" description="Everything we currently stock, from everyday essentials to new discoveries." />
      <SubcategoryChips items={getTopCategories().map((c) => ({ label: c.name, to: `/category/${c.slug}` }))} />
      <ProductListing listingKey="shop-all" resolveProducts={() => catalogProducts} />
    </Container>);

}