import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../../types/catalog';
import {
  getBrandById,
  getDisplayPrice,
  isInStock,
  isLowStock,
  isOnSale,
} from '../../utils/catalog';
import { discountPercent, formatPrice } from '../../utils/format';
import { useCart } from '../../contexts/CartContext';
import { WishlistButton } from './WishlistButton';

type Props = { product: Product; priority?: boolean };

/* ─── Badge ─────────────────────────────────────────────────────────── */

type BadgeInfo = { label: string; tone: 'light' | 'dark' | 'sale' };

function badgeFor(product: Product, inStock: boolean): BadgeInfo | null {
  if (!inStock)
    return { label: 'Sold Out', tone: 'dark' };
  if (isOnSale(product)) {
    const { price, compareAt } = getDisplayPrice(product);
    const pct = discountPercent(price, compareAt);
    return { label: pct ? `−${pct}%` : 'Sale', tone: 'sale' };
  }
  if (product.tags?.includes('most-repurchased'))
    return { label: 'Most Repurchased', tone: 'light' };
  if (product.badge === 'bestseller')
    return { label: 'Best Seller', tone: 'light' };
  if (product.badge === 'new')
    return { label: 'New', tone: 'light' };
  if (product.tags?.includes('trending'))
    return { label: 'Trending', tone: 'light' };
  return null;
}

/* ─── Stock ─────────────────────────────────────────────────────────── */

function stockStatus(product: Product): 'out' | 'low' | 'in' {
  if (!isInStock(product)) return 'out';
  const inStockVars = product.variants.filter((v) => v.stock > 0);
  if (inStockVars.length > 0 && inStockVars.every((v) => isLowStock(v))) return 'low';
  return 'in';
}

/* ─── Component ─────────────────────────────────────────────────────── */

export function ProductCard({ product, priority }: Props) {
  const brand            = getBrandById(product.brandId);
  const { price, compareAt } = getDisplayPrice(product);
  const inStock          = isInStock(product);
  const badge            = badgeFor(product, inStock);
  const { addItem, openDrawer } = useCart();
  const [adding, setAdding] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock || adding !== 'idle') return;
    const v = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
    if (!v) return;
    setAdding('loading');
    const res = addItem(product.id, v.id, 1);
    if (res.ok) {
      setAdding('done');
      openDrawer();
      toast.success(`${product.name} added to bag`);
      setTimeout(() => setAdding('idle'), 1800);
    } else {
      toast.error(res.error);
      setAdding('idle');
    }
  };

  const btnText =
    adding === 'loading' ? 'Adding…' :
    adding === 'done'    ? 'Added to bag' :
    !inStock             ? 'Sold out' :
                           'Add to bag';

  const status = stockStatus(product);
  const secondImage = product.images[1];
  const swatches = product.variantKind === 'Shade' ? product.variants.filter((v) => v.swatch) : [];

  return (
    <article className="group flex h-full flex-col">

      {/* ══ Image ══════════════════════════════════════════════════ */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-product">
        <Link
          to={`/product/${product.slug}`}
          className="relative block h-full w-full"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={product.images[0]}
            alt=""
            loading={priority ? 'eager' : 'lazy'}
            className={[
              'h-full w-full object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04]',
              secondImage ? 'group-hover:opacity-0' : '',
              !inStock ? 'opacity-60' : '',
            ].filter(Boolean).join(' ')}
          />
          {secondImage && (
            <img
              src={secondImage}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Tags – quiet pills stacked top-left (merchandising tag + low-stock alert) */}
        {(badge || status === 'low') && (
          <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {badge && (
              <span
                className={[
                  'rounded-full px-3 py-1.5 type-label leading-none backdrop-blur-md',
                  badge.tone === 'sale' ? 'bg-sale text-white' :
                  badge.tone === 'dark' ? 'bg-brand text-white' :
                                          'bg-white/85 text-ink',
                ].join(' ')}
              >
                {badge.label}
              </span>
            )}
            {status === 'low' && (
              <span className="rounded-full bg-warning px-3 py-1.5 type-label leading-none text-white">
                Low stock
              </span>
            )}
          </div>
        )}

        {/* Wishlist */}
        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute right-3 top-3 z-10 h-9 w-9 bg-white/80 transition-all duration-200 shadow-2xs hover:scale-100 hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 md:aria-pressed:opacity-100"
        />

        {/* Quick add – slides up on hover (desktop), always visible on touch */}
        <div className="absolute inset-x-3 bottom-3 z-10 md:translate-y-3 md:opacity-0 md:transition-all md:duration-300 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!inStock || adding !== 'idle'}
            aria-label={inStock ? `Add ${product.name} to bag` : `${product.name} is sold out`}
            className={[
              'flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full type-button transition-colors duration-200 disabled:cursor-not-allowed',
              adding === 'done' ? 'bg-success text-white' :
              !inStock          ? 'bg-disabled text-disabled-text' :
                                  'bg-brand text-white hover:bg-brand-hover',
            ].join(' ')}
          >
            {adding === 'loading' && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {adding === 'done' && <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />}
            {btnText}
          </button>
        </div>
      </div>

      {/* ══ Info ═══════════════════════════════════════════════════ */}
      <div className="flex flex-1 flex-col pt-4 text-center">
        {brand && (
          <Link
            to={`/brand/${brand.slug}`}
            className="type-label text-ink-2 transition-colors hover:text-brand"
          >
            {brand.name}
          </Link>
        )}

        <h3 className="mt-2 type-product text-ink">
          <Link
            to={`/product/${product.slug}`}
            className="line-clamp-2 transition-colors duration-200 hover:text-brand"
          >
            {product.name}
          </Link>
        </h3>

        <div className="flex-1" />

        <div className="mt-2.5 flex flex-wrap items-baseline justify-center gap-x-2">
          {compareAt != null && compareAt > price && (
            <span className="text-sm tabular-nums text-ink-muted line-through">
              {formatPrice(compareAt)}
            </span>
          )}
          <span className={`type-product tabular-nums ${compareAt != null && compareAt > price ? 'text-sale' : 'text-ink'}`}>
            {formatPrice(price)}
          </span>
        </div>

        {/* Shade swatches */}
        {swatches.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-1.5" aria-label={`${swatches.length} shades available`}>
            {swatches.slice(0, 5).map((v) => (
              <span
                key={v.id}
                title={v.label}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-ink/15 ring-offset-2 ring-offset-ivory"
                style={{ background: v.swatch }}
              />
            ))}
            {swatches.length > 5 && (
              <span className="text-[11px] text-ink-muted">+{swatches.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
