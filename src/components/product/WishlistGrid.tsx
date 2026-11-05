import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingBagIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../../types/catalog';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { getBrandById, getDisplayPrice, getProductById, isInStock } from '../../utils/catalog';
import { Button } from '../ui/Button';
import { Price } from '../ui/Price';
import { Alert, EmptyState } from '../ui/States';

export function WishlistGrid() {
  const { ids, remove, isGuestList } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const items = ids.map(getProductById).filter((p): p is Product => Boolean(p));

  const moveToBag = (p: Product) => {
    const variant = p.variants.find((v) => v.stock > 0);
    if (!variant) return;
    const r = addItem(p.id, variant.id, 1);
    if (!r.ok) {
      toast.error(r.error);
      return;
    }
    remove(p.id);
    toast.success('Moved to your bag', { description: `${p.name} · ${variant.label}` });
    openDrawer();
  };

  if (!items.length) {
    return (
      <EmptyState
        icon={<HeartIcon className="h-6 w-6" />}
        title="Your wishlist is empty"
        description="Tap the heart on any product to save it here for later."
        action={<Button to="/shop">Discover products</Button>} />);


  }

  return (
    <div>
      {isGuestList &&
      <Alert tone="info" className="mb-8">
          Your wishlist is saved on this device. <Link to="/login?redirect=/wishlist" className="font-medium text-ink underline underline-offset-2">Sign in</Link> or{' '}
          <Link to="/register" className="font-medium text-ink underline underline-offset-2">create an account</Link> to keep it across devices — we’ll merge these items in.
        </Alert>
      }
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => {
          const { price, compareAt, hasRange } = getDisplayPrice(p);
          const inStock = isInStock(p);
          const needsChoice = p.variants.filter((v) => v.stock > 0).length > 1;
          return (
            <li key={p.id} className="flex flex-col">
              <div className="relative overflow-hidden rounded-xl bg-product">
                <Link to={`/product/${p.slug}`} className="block aspect-square">
                  <img src={p.images[0]} alt={p.name} loading="lazy" className={`h-full w-full object-cover ${inStock ? '' : 'opacity-60'}`} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    remove(p.id);
                    toast('Removed from wishlist', { description: p.name });
                  }}
                  className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white"
                  aria-label={`Remove ${p.name} from wishlist`}>
                  
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-xs uppercase tracking-wide text-ink-2">{getBrandById(p.brandId)?.name}</p>
              <Link to={`/product/${p.slug}`} className="mt-1 line-clamp-2 text-[15px] leading-snug text-ink hover:underline underline-offset-2">
                {p.name}
              </Link>
              <div className="mt-auto pt-2">
                <Price price={price} compareAt={compareAt} from={hasRange} />
                {!inStock ?
                <p className="mt-3 flex h-9 items-center text-sm font-medium text-ink-muted">Out of stock</p> :
                needsChoice ?
                <Button to={`/product/${p.slug}`} variant="secondary" size="sm" fullWidth className="mt-3">
                    Choose {p.variantKind.toLowerCase()}
                  </Button> :

                <Button size="sm" fullWidth className="mt-3" onClick={() => moveToBag(p)}>
                    <ShoppingBagIcon className="h-4 w-4" aria-hidden="true" /> Move to bag
                  </Button>
                }
              </div>
            </li>);

        })}
      </ul>
    </div>);

}