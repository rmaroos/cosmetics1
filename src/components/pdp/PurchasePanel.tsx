import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, PackageIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import type { Brand, Product } from '../../types/catalog';
import { useCart } from '../../contexts/CartContext';
import { isLowStock } from '../../utils/catalog';
import { formatPrice } from '../../utils/format';
import { MAX_QTY_PER_LINE, deliveryMethods } from '../../data/site';
import { Price } from '../ui/Price';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';
import { WishlistButton } from '../product/WishlistButton';

type Props = {product: Product;brand?: Brand;onStickyChange: (visible: boolean) => void;registerAdd: (fn: () => void) => void;};

export function PurchasePanel({ product, brand, onStickyChange, registerAdd }: Props) {
  const { addItem, openDrawer } = useCart();
  const isShade = product.variantKind === 'Shade' && product.variants.length > 1;
  const firstAvailable = product.variants.find((v) => v.stock > 0) ?? product.variants[0];
  const [variantId, setVariantId] = useState<string | null>(isShade ? null : firstAvailable.id);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? null;
  const priceSource = variant ?? firstAvailable;
  const max = variant ? Math.max(1, Math.min(variant.stock, MAX_QTY_PER_LINE)) : MAX_QTY_PER_LINE;
  const soldOut = product.variants.every((v) => v.stock <= 0);

  useEffect(() => {
    setVariantId(isShade ? null : firstAvailable.id);
    setQty(1);
    setError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => onStickyChange(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [onStickyChange]);

  const add = () => {
    if (!variant) {
      setError(`Please choose a ${product.variantKind.toLowerCase()}.`);
      document.getElementById('variant-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const result = addItem(product.id, variant.id, qty);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    toast.success('Added to your bag', { description: `${product.name} · ${variant.label}` });
    openDrawer();
  };

  useEffect(() => registerAdd(add));

  const freeOver = deliveryMethods.find((m) => m.freeOver)?.freeOver;

  return (
    <div>
      {brand &&
      <Link to={`/brand/${brand.slug}`} className="text-sm font-medium uppercase tracking-wide text-ink-2 hover:text-brand">
          {brand.name}
        </Link>
      }
      <h1 className="mt-2 font-display text-[34px] leading-[1.1] text-ink md:text-[42px]">{product.name}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{product.shortDescription}</p>

      <Price price={priceSource.price} compareAt={priceSource.compareAtPrice} size="lg" className="mt-5" />

      {product.variants.length > 1 ?
      <fieldset id="variant-group" className="mt-6">
          <legend className="mb-3 text-sm text-ink">
            <span className="font-medium">{product.variantKind}:</span> <span className="text-ink-2">{variant ? variant.label : `Select a ${product.variantKind.toLowerCase()}`}</span>
          </legend>
          <div className="flex flex-wrap gap-2.5" role="radiogroup">
            {product.variants.map((v) => {
            const out = v.stock <= 0;
            const selected = v.id === variantId;
            return isShade ?
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${v.label}${out ? ' — out of stock' : ''}`}
              title={`${v.label}${out ? ' (out of stock)' : ''}`}
              disabled={out}
              onClick={() => {
                setVariantId(v.id);
                setQty(1);
                setError(null);
              }}
              className={twMerge('relative h-11 w-11 rounded-full border-2 p-0.5 transition-[border-color] duration-150', selected ? 'border-ink' : 'border-transparent hover:border-line', out && 'cursor-not-allowed opacity-50')}>
              
                  <span className="block h-full w-full rounded-full" style={{ backgroundColor: v.swatch }} />
                  {out && <span className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-ink" aria-hidden="true" />}
                </button> :

            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={out}
              onClick={() => {
                setVariantId(v.id);
                setQty(1);
                setError(null);
              }}
              className={twMerge(
                'h-11 rounded-lg border px-4 text-sm font-medium transition-[border-color,background-color] duration-150',
                selected ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-ink',
                out && 'cursor-not-allowed text-ink-muted line-through hover:border-line'
              )}>
              
                  {v.label}
                  {out && <span className="sr-only"> — out of stock</span>}
                </button>;

          })}
          </div>
          {product.variants.some((v) => v.stock <= 0) && <p className="mt-2 text-xs text-ink-muted">Crossed-out options are currently out of stock.</p>}
        </fieldset> :

      <p className="mt-6 text-sm text-ink">
          <span className="font-medium">{product.variantKind}:</span> <span className="text-ink-2">{product.variants[0].label}</span>
        </p>
      }

      <div className="mt-5 text-sm" aria-live="polite">
        {soldOut ?
        <p className="font-medium text-error">Out of stock</p> :
        variant ?
        variant.stock <= 0 ?
        <p className="font-medium text-error">This option is out of stock</p> :
        isLowStock(variant) ?
        <p className="font-medium text-warning">Only {variant.stock} left</p> :

        <p className="flex items-center gap-1.5 font-medium text-success"><CheckIcon className="h-4 w-4" aria-hidden="true" /> In stock</p> :

        null}
      </div>

      <div ref={ctaRef} className="mt-4 flex flex-wrap gap-3">
        {!soldOut && <QuantityStepper value={qty} max={max} onChange={setQty} disabled={!variant} />}
        <Button size="lg" className="min-w-[180px] flex-1" onClick={add} disabled={soldOut}>
          {soldOut ? 'Sold out' : 'Add to bag'}
        </Button>
        <WishlistButton productId={product.id} productName={product.name} variant="button" className="w-full sm:w-auto" />
      </div>
      {error && <p className="mt-3 text-sm font-medium text-error" role="alert">{error}</p>}

      <ul className="mt-8 divide-y divide-line border-y border-line text-sm">
        <li className="flex gap-3 py-3.5">
          <TruckIcon className="h-5 w-5 shrink-0 text-ink-2" aria-hidden="true" />
          <span className="text-ink-2">
            <span className="font-medium text-ink">Islandwide delivery.</span> Standard {formatPrice(deliveryMethods[0].fee)}
            {freeOver && `, free over ${formatPrice(freeOver)}`}. Exact charges shown at checkout.
          </span>
        </li>
        <li className="flex gap-3 py-3.5">
          <PackageIcon className="h-5 w-5 shrink-0 text-ink-2" aria-hidden="true" />
          <span className="text-ink-2"><span className="font-medium text-ink">Cash on delivery</span> or bank transfer available.</span>
        </li>
        <li className="flex gap-3 py-3.5">
          <RotateCcwIcon className="h-5 w-5 shrink-0 text-ink-2" aria-hidden="true" />
          <span className="text-ink-2">
            Unopened items can be returned within 7 days. <Link to="/returns-refunds" className="text-ink underline underline-offset-2">Returns policy</Link>
          </span>
        </li>
      </ul>
    </div>);

}