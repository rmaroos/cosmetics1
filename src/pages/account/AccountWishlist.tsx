import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { WishlistGrid } from '../../components/product/WishlistGrid';

export function AccountWishlist() {
  useDocumentMeta('My wishlist', undefined, { noindex: true });
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-ink">My wishlist</h1>
      <WishlistGrid />
    </div>);

}