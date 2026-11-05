import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { getBrandBySlug, productsByBrand } from '../../utils/catalog';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { ProductListing } from '../../components/listing/ProductListing';
import { NotFound } from '../NotFound';

export function Brand() {
  const { slug = '' } = useParams();
  const brand = getBrandBySlug(slug);
  useDocumentMeta(brand?.name ?? 'Brand', brand?.description);
  if (!brand) return <NotFound title="This brand isn’t available" description="We may no longer stock this brand. Explore our full brand directory instead." />;

  return (
    <Container className="pb-16">
      <ListingHeader
        crumbs={[{ label: 'Brands', to: '/brands' }, { label: brand.name }]}
        eyebrow={`Made in ${brand.origin}`}
        title={brand.name}
        description={brand.description}
        aside={
          brand.logo ? (
            <div className="flex h-16 w-44 items-center justify-center rounded-xl border border-line/80 bg-white p-3 shadow-sm">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="max-h-10 w-auto max-w-full object-contain"
              />
            </div>
          ) : undefined
        }
      />
      <ProductListing listingKey={`brand-${brand.id}`} resolveProducts={() => productsByBrand(brand.id)} hiddenFilters={['brand']} />
    </Container>);

}