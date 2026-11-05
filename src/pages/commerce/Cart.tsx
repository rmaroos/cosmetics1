import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon, LockIcon, ShoppingBagIcon, TagIcon, Trash2Icon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../../contexts/CartContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { formatPrice } from '../../utils/format';
import { freeDeliveryThreshold } from '../../utils/pricing';
import { getCollectionBySlug, productsInCollection } from '../../utils/catalog';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { Button } from '../../components/ui/Button';
import { QuantityStepper } from '../../components/ui/QuantityStepper';
import { Alert, EmptyState } from '../../components/ui/States';
import { OrderSummary } from '../../components/checkout/OrderSummary';
import { ProductRail } from '../../components/product/ProductRail';

const issueText = {
  unavailable: 'This item is now out of stock and won’t be included in your order.',
  'price-changed': 'The price has changed since you added this item.',
  'quantity-reduced': 'Only limited stock is available, so we’ve reduced the quantity.'
};

export function Cart() {
  useDocumentMeta('Your bag', undefined, { noindex: true });
  const { lines, subtotal, discount, promoCode, promoError, hasIssues, updateQuantity, removeItem, restoreItem, applyPromo, removePromo, acknowledgeChanges } = useCart();
  const [code, setCode] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ok: boolean;text: string;} | null>(null);
  const threshold = freeDeliveryThreshold();
  const best = getCollectionBySlug('best-sellers');

  const onRemove = (key: string, name: string) => {
    const removed = removeItem(key);
    if (removed) toast(`${name} removed`, { action: { label: 'Undo', onClick: () => restoreItem(removed) } });
  };

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    const r = applyPromo(code);
    setPromoMsg({ ok: r.ok, text: r.message });
    if (r.ok) setCode('');
  };

  if (!lines.length) {
    return (
      <>
        <Container>
          <EmptyState
            className="py-20"
            icon={<ShoppingBagIcon className="h-6 w-6" />}
            title="Your bag is empty"
            description="Looks like you haven’t added anything yet. Explore our best sellers or browse by category."
            action={
            <>
                <Button to="/shop">Start shopping</Button>
                <Button to="/wishlist" variant="secondary">View wishlist</Button>
              </>
            } />
          
        </Container>
        {best && <ProductRail title="Customer favourites" products={productsInCollection(best).slice(0, 8)} viewAllHref="/collection/best-sellers" />}
      </>);

  }

  return (
    <Container className="pb-20">
      <Breadcrumbs items={[{ label: 'Bag' }]} />
      <h1 className="font-display text-4xl text-ink md:text-5xl">Your bag</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div>
          {hasIssues &&
          <Alert tone="warning" title="Some items in your bag have changed" className="mb-6">
              <p>Please review the highlighted items below.</p>
              <button type="button" onClick={acknowledgeChanges} className="mt-2 font-medium text-ink underline underline-offset-2">
                Accept changes and continue
              </button>
            </Alert>
          }
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((l) =>
            <li key={l.key} className="flex gap-4 py-6 sm:gap-6">
                <Link to={`/product/${l.product.slug}`} className="shrink-0">
                  <img src={l.product.images[0]} alt={l.product.name} className="h-24 w-24 rounded-xl bg-product object-cover sm:h-32 sm:w-32" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      {l.brand && <Link to={`/brand/${l.brand.slug}`} className="text-xs uppercase tracking-wide text-ink-2 hover:text-brand">{l.brand.name}</Link>}
                      <h2 className="text-[15px] leading-snug text-ink sm:text-base">
                        <Link to={`/product/${l.product.slug}`} className="hover:underline underline-offset-2">{l.product.name}</Link>
                      </h2>
                      <p className="mt-1 text-sm text-ink-2">{l.product.variantKind}: {l.variant.label}</p>
                      <p className="mt-1 text-sm tabular-nums text-ink-2">
                        {formatPrice(l.unitPrice)} each
                        {l.issue === 'price-changed' && <span className="ml-2 text-xs text-ink-muted line-through">{formatPrice(l.priceSnapshot)}</span>}
                      </p>
                    </div>
                    <p className="shrink-0 text-[15px] font-semibold tabular-nums text-ink">{formatPrice(l.lineTotal)}</p>
                  </div>
                  {l.issue &&
                <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-warning" role="status">
                      <AlertTriangleIcon className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {issueText[l.issue]}
                    </p>
                }
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {l.issue === 'unavailable' ? <span /> : <QuantityStepper value={l.quantity} max={l.maxQty} onChange={(q) => updateQuantity(l.key, q)} size="sm" label={`Quantity for ${l.product.name}`} />}
                    <button type="button" onClick={() => onRemove(l.key, l.product.name)} className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-error">
                      <Trash2Icon className="h-4 w-4" aria-hidden="true" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>
          <Link to="/shop" className="mt-6 inline-block text-sm font-medium text-ink underline underline-offset-4 hover:text-brand">
            Continue shopping
          </Link>
        </div>

        <aside aria-labelledby="summary-heading" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-surface p-6">
            <h2 id="summary-heading" className="text-lg font-semibold text-ink">Order summary</h2>

            <form onSubmit={onApply} className="mt-5">
              {promoCode && !promoError ?
              <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success-soft px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 font-medium text-success"><TagIcon className="h-4 w-4" aria-hidden="true" /> {promoCode} applied</span>
                  <button type="button" onClick={() => {removePromo();setPromoMsg(null);}} className="flex h-7 w-7 items-center justify-center rounded-full text-ink-2 hover:bg-white" aria-label={`Remove code ${promoCode}`}>
                    <XIcon className="h-4 w-4" />
                  </button>
                </div> :

              <>
                  <label htmlFor="promo" className="mb-1.5 block text-sm font-medium text-ink">Promo code</label>
                  <div className="flex gap-2">
                    <input id="promo" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} maxLength={20} autoComplete="off" className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-white px-3 text-sm uppercase focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25" aria-describedby="promo-msg" />
                    <Button type="submit" variant="secondary" disabled={!code.trim()}>Apply</Button>
                  </div>
                </>
              }
              <div id="promo-msg" aria-live="polite">
                {promoCode && promoError &&
                <p className="mt-2 text-xs font-medium text-error">
                    {promoCode} no longer applies: {promoError}{' '}
                    <button type="button" className="underline" onClick={removePromo}>Remove</button>
                  </p>
                }
                {promoMsg && !promoMsg.ok && <p className="mt-2 text-xs font-medium text-error">{promoMsg.text}</p>}
                {promoMsg && promoMsg.ok && !promoError && <p className="mt-2 text-xs text-success">{promoMsg.text}</p>}
              </div>
            </form>

            <div className="mt-5 border-t border-line pt-5">
              <OrderSummary lines={[]} compact subtotal={subtotal} discount={discount} promoCode={promoCode} deliveryFee={null} />
            </div>
            {threshold !== undefined &&
            <p className="mt-3 text-xs text-ink-muted">
                {subtotal - discount >= threshold ? 'Your order qualifies for free standard delivery.' : `Standard delivery is free on orders over ${formatPrice(threshold)}.`}
              </p>
            }
            <Button to="/checkout" size="lg" fullWidth className={`mt-5 ${hasIssues ? 'pointer-events-none opacity-50' : ''}`} aria-label={hasIssues ? 'Review bag changes before checkout' : 'Proceed to checkout'}>
              <LockIcon className="h-4 w-4" aria-hidden="true" /> Checkout
            </Button>
            {hasIssues && <p className="mt-2 text-center text-xs text-warning">Accept the changes above to continue.</p>}
            <p className="mt-4 text-center text-xs text-ink-muted">Pay by cash on delivery or bank transfer</p>
          </div>
        </aside>
      </div>
    </Container>);

}