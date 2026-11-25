import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useWishlist } from '../../contexts/WishlistContext';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { WishlistGrid } from '../../components/product/WishlistGrid';

export function Wishlist() {
  useDocumentMeta('Wishlist', undefined, { noindex: true });
  const { count } = useWishlist();
  return (
    <Container className="pb-20">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
<<<<<<< HEAD
      <h1 className="mb-8 type-page text-ink">
=======
      <h1 className="mb-8 font-display text-4xl text-ink md:text-5xl">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
        Wishlist {count > 0 && <span className="text-2xl text-ink-muted">({count})</span>}
      </h1>
      <WishlistGrid />
    </Container>);

}