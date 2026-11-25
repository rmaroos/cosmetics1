import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { WishlistGrid } from '../../components/product/WishlistGrid';

export function AccountWishlist() {
  useDocumentMeta('My wishlist', undefined, { noindex: true });
  return (
    <div>
<<<<<<< HEAD
      <h1 className="mb-6 type-category text-ink">My wishlist</h1>
=======
      <h1 className="mb-6 text-xl font-semibold text-ink">My wishlist</h1>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
      <WishlistGrid />
    </div>);

}