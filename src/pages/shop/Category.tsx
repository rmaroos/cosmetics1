import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { getCategoryBySlug, getCategoryPath, getCategoryUrl, getChildCategories, productsInCategory } from '../../utils/catalog';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { ProductListing, SubcategoryChips } from '../../components/listing/ProductListing';
import { NotFound } from '../NotFound';

export function Category() {
  const { '*': splat = '' } = useParams();
  const slugs = splat.split('/').filter(Boolean);
  const category = getCategoryBySlug(slugs[slugs.length - 1] ?? '');
  const path = category ? getCategoryPath(category) : [];
  // The URL hierarchy must match the published hierarchy.
  const valid = category && path.map((c) => c.slug).join('/') === slugs.join('/');

  useDocumentMeta(category?.name ?? 'Category', category?.description);

  if (!category || !valid) {
    return <NotFound title="This category isn’t available" description="It may have been renamed or is no longer published. Browse our other categories instead." />;
  }

  const parent = path.length > 1 ? path[path.length - 2] : null;
  const children = getChildCategories(category.id);
  const siblings = parent ? getChildCategories(parent.id) : [];
  const chipSource = children.length ? children : siblings;
  const chips = [
  ...(parent && !children.length ? [{ label: `All ${parent.name}`, to: getCategoryUrl(parent) }] : []),
  ...chipSource.map((c) => ({ label: c.name, to: getCategoryUrl(c), active: c.id === category.id }))];

  const crumbs = path.map((c, i) => ({ label: c.name, to: i < path.length - 1 ? getCategoryUrl(c) : undefined }));

  return (
    <Container className="pb-16">
      <ListingHeader crumbs={[{ label: 'Shop', to: '/shop' }, ...crumbs]} title={category.name} description={category.description ?? (parent ? `Explore ${category.name.toLowerCase()} in ${parent.name.toLowerCase()}.` : undefined)} />
      <SubcategoryChips items={chips} />
      <ProductListing
        listingKey={`category-${category.id}`}
        resolveProducts={() => productsInCategory(category.id)}
        emptyTitle={`No ${category.name.toLowerCase()} yet`}
        emptyDescription="We’re adding new products regularly. In the meantime, explore other categories." />
      
    </Container>);

}