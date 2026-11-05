import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { InfoIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { catalogConcerns, catalogSkinTypes, getConcern, getSkinType, productsByConcern, productsBySkinType } from '../../utils/catalog';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { ProductListing, SubcategoryChips } from '../../components/listing/ProductListing';
import { NotFound } from '../NotFound';

type Props = {mode: 'type' | 'concern';};

export function SkinResults({ mode }: Props) {
  const { slug = '' } = useParams();
  const attr = mode === 'type' ? getSkinType(slug) : getConcern(slug);
  const title = attr
    ? mode === 'type'
      ? attr.name.toLowerCase().endsWith('skin')
        ? attr.name
        : `${attr.name} skin`
      : attr.name
    : 'Skin discovery';
  useDocumentMeta(title, attr?.description);
  if (!attr) return <NotFound title="We couldn’t find that skin guide" description="Explore all skin types and concerns instead." />;

  const siblings = mode === 'type' ? catalogSkinTypes : catalogConcerns;
  const base = mode === 'type' ? 'skin-type' : 'skin-concern';

  return (
    <Container className="pb-16">
      <ListingHeader
        crumbs={[{ label: 'Discover', to: '/discover' }, { label: mode === 'type' ? 'Skin type' : 'Skin concern', to: `/discover#${mode === 'type' ? 'skin-types' : 'concerns'}` }, { label: attr.name }]}
        eyebrow={mode === 'type' ? 'Shop by skin type' : 'Shop by skin concern'}
        title={title}
        description={attr.description} />
      
      <SubcategoryChips items={siblings.map((s) => ({ label: s.name, to: `/${base}/${s.slug}`, active: s.slug === attr.slug }))} />
      <p className="mb-6 flex items-start gap-2 rounded-lg bg-info-soft px-4 py-3 text-sm text-ink-2">
        <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-hidden="true" />
        <span>
          Products are matched using brand-supplied suitability information. Results vary between individuals — patch test new products and consult a dermatologist for medical skin conditions.{' '}
          <Link to="/ingredients" className="font-medium text-ink underline underline-offset-2">Learn about ingredients</Link>
        </span>
      </p>
      <ProductListing
        listingKey={`${base}-${attr.slug}`}
        resolveProducts={() => mode === 'type' ? productsBySkinType(attr.slug) : productsByConcern(attr.slug)}
        hiddenFilters={[mode === 'type' ? 'skin' : 'concern']} />
      
    </Container>);

}