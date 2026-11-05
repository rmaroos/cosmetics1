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
  getRatingSummary,
} from '../../utils/catalog';
import { discountPercent, formatPrice } from '../../utils/format';
import { useCart } from '../../contexts/CartContext';

type Props = { product: Product; priority?: boolean };

/* ─── Badge ───────────────────────────────────────────────────────── */

type BadgeInfo = { label: string; color: string };

function badgeFor(product: Product, inStock: boolean): BadgeInfo | null {
  if (!inStock)
    return { label: 'Sold Out', color: '#1a1a1a' };
  if (isOnSale(product)) {
    const { price, compareAt } = getDisplayPrice(product);
    const pct = discountPercent(price, compareAt);
    return { label: pct ? `−${pct}%` : 'Sale', color: '#B43D42' };
  }
  if (product.tags?.includes('most-repurchased'))
    return { label: 'Most Repurchased', color: '#9B6DC8' };   // purple – matches ref
  if (product.badge === 'bestseller')
    return { label: 'Best Seller', color: '#3A8A4E' };        // green – matches ref
  if (product.badge === 'new')
    return { label: 'New Arrival', color: '#2D6FA3' };        // blue
  if (product.tags?.includes('trending'))
    return { label: 'Trending', color: '#A96A19' };           // amber
  return null;
}

/* ─── Stock ───────────────────────────────────────────────────────── */

function stockStatus(product: Product): 'out' | 'low' | 'in' {
  if (!isInStock(product)) return 'out';
  const inStockVars = product.variants.filter((v) => v.stock > 0);
  if (inStockVars.length > 0 && inStockVars.every((v) => isLowStock(v))) return 'low';
  return 'in';
}

const STOCK: Record<'out' | 'low' | 'in', { dot: string; text: string; cls: string }> = {
  out: { dot: '#B43D42', text: 'Out of stock', cls: 'text-[#B43D42]' },
  low: { dot: '#A96A19', text: 'Low stock',    cls: 'text-[#A96A19]' },
  in:  { dot: '#397653', text: 'In stock',     cls: 'text-[#397653]' },
};

/* ─── Stars ───────────────────────────────────────────────────────── */

function StarRow({ average, count }: { average: number; count: number }) {
  const filled = Math.round(average);
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className={`h-[14px] w-[14px] ${i <= filled ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </span>
      <span className="text-[12px] text-gray-500">
        {count} {count === 1 ? 'review' : 'reviews'}
      </span>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────── */

export function ProductCard({ product, priority }: Props) {
  const brand            = getBrandById(product.brandId);
  const { price, compareAt } = getDisplayPrice(product);
  const inStock          = isInStock(product);
  const badge            = badgeFor(product, inStock);
  const stock            = STOCK[stockStatus(product)];
  const rating           = getRatingSummary(product.id);
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
    adding === 'done'    ? 'Added!' :
    !inStock             ? 'Out of stock' :
                           'Add to cart';
  const btnBg =
    adding === 'done' ? '#397653' :
    !inStock          ? '#6b7280' :
                        '#1a1a1a';   // black – matches reference

  return (
    <article className="group flex h-full flex-col bg-white">

      {/* ══ Image ══════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1 / 1' }}>

        {/* Background fills neutral – visible if image has transparency */}
        <div className="absolute inset-0 bg-[#EDEAE6]" />

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
              'h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]',
              !inStock ? 'opacity-55' : '',
            ].filter(Boolean).join(' ')}
          />
        </Link>

        {/* Badge – angled ribbon flush to top-right corner */}
        {badge && (
          <span
            aria-label={badge.label}
            className="pointer-events-none absolute right-0 top-0 z-10 py-2 pl-7 pr-3 text-[11px] font-semibold leading-none tracking-wide text-white"
            style={{
              background: badge.color,
              clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* ══ Info ═══════════════════════════════════════════════════ */}
      {/*
          flex-1 + flex-col ensures the card stretches to the grid row height.
          The spacer div above the button pushes it to the bottom.
      */}
      <div className="flex flex-1 flex-col pt-3">

        {/* Brand */}
        {brand && (
          <Link
            to={`/brand/${brand.slug}`}
            className="text-[11px] font-normal uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors"
          >
            {brand.name}
          </Link>
        )}

        {/* Product name – regular weight, natural wrap */}
        <h3 className="mt-1 text-[14px] font-normal leading-snug text-[#1a1a1a]">
          <Link
            to={`/product/${product.slug}`}
            className="line-clamp-3 hover:underline underline-offset-2"
          >
            {product.name}
          </Link>
        </h3>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
          <span className="text-[16px] font-bold tabular-nums text-[#1a1a1a]">
            {formatPrice(price)}
          </span>
          {compareAt != null && compareAt > price && (
            <span className="text-[13px] tabular-nums text-gray-400 line-through">
              {formatPrice(compareAt)}
            </span>
          )}
        </div>

        {/* Star rating – only when reviews exist */}
        {rating.count > 0 && (
          <div className="mt-1.5">
            <StarRow average={rating.average} count={rating.count} />
          </div>
        )}

        {/* Stock status */}
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
            style={{ background: stock.dot }}
          />
          <span className={`text-[12px] font-medium ${stock.cls}`}>
            {stock.text}
          </span>
        </div>

        {/* Spacer – pushes button to card bottom regardless of content height */}
        <div className="flex-1" />

        {/* Add to Cart – black, full-width, bottom of card */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={!inStock || adding !== 'idle'}
          aria-label={
            inStock
              ? `Add ${product.name} to cart`
              : `${product.name} is out of stock`
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md py-3.5 text-[13px] font-bold tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          style={{ background: btnBg }}
        >
          {adding === 'loading' && (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {adding === 'done' && (
            <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {btnText}
        </button>

      </div>
    </article>
  );
}
