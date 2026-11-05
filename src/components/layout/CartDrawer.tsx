import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../../contexts/CartContext';
import { Overlay } from '../ui/Overlay';
import { Button } from '../ui/Button';
import { QuantityStepper } from '../ui/QuantityStepper';
import { formatPrice } from '../../utils/format';
import { freeDeliveryThreshold } from '../../utils/pricing';

export function CartDrawer() {
  const { lines, drawerOpen, closeDrawer, subtotal, itemCount, updateQuantity, removeItem, restoreItem, hasIssues } = useCart();
  const threshold = freeDeliveryThreshold();
  const remaining = threshold ? Math.max(0, threshold - subtotal) : 0;

  const onRemove = (key: string, name: string) => {
    const removed = removeItem(key);
    if (removed) toast(`${name} removed from your bag`, { action: { label: 'Undo', onClick: () => restoreItem(removed) } });
  };

  return (
    <Overlay
      open={drawerOpen}
      onClose={closeDrawer}
      title={`Your bag (${itemCount})`}
      footer={
      lines.length > 0 ?
      <div className="space-y-3">
            <div className="flex items-center justify-between text-[15px]">
              <span className="text-ink-2">Subtotal</span>
              <span className="font-semibold tabular-nums text-ink">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-ink-muted">Delivery and any promo codes are calculated in your bag and at checkout.</p>
            <Button to="/checkout" onClick={closeDrawer} fullWidth size="lg" className={hasIssues ? 'pointer-events-none opacity-50' : undefined}>
              Checkout
            </Button>
            <Button to="/cart" onClick={closeDrawer} variant="secondary" fullWidth>
              View bag
            </Button>
          </div> :
      undefined
      }>
      
      {lines.length === 0 ?
      <div className="flex flex-col items-center px-6 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-pale text-brand">
            <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="font-display text-2xl text-ink">Your bag is empty</p>
          <p className="mt-1.5 text-sm text-ink-2">Discover something new for your routine.</p>
          <Button to="/shop" onClick={closeDrawer} className="mt-6">
            Start shopping
          </Button>
        </div> :

      <div>
          {threshold !== undefined &&
        <div className="border-b border-line px-5 py-4">
              <p className="text-sm text-ink">
                {remaining > 0 ?
            <>
                    Add <strong className="font-semibold">{formatPrice(remaining)}</strong> more for free standard delivery
                  </> :

            'Your order qualifies for free standard delivery'
            }
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
                <div className="h-full rounded-full bg-sage transition-[width] duration-300 ease-out" style={{ width: `${Math.min(100, subtotal / threshold * 100)}%` }} />
              </div>
            </div>
        }
          {hasIssues &&
        <p className="mx-5 mt-4 rounded-lg bg-warning-soft px-3 py-2 text-sm text-ink" role="status">
              Some items have changed. Review your bag before checking out.
            </p>
        }
          <ul className="divide-y divide-line px-5">
            {lines.map((l) =>
          <li key={l.key} className="flex gap-4 py-5">
                <Link to={`/product/${l.product.slug}`} onClick={closeDrawer} className="shrink-0">
                  <img src={l.product.images[0]} alt={l.product.name} className="h-24 w-24 rounded-lg bg-product object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-xs uppercase tracking-wide text-ink-2">{l.brand?.name}</p>
                  <Link to={`/product/${l.product.slug}`} onClick={closeDrawer} className="text-sm leading-snug text-ink hover:underline underline-offset-2">
                    {l.product.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {l.product.variantKind}: {l.variant.label}
                  </p>
                  {l.issue === 'unavailable' && <p className="mt-1 text-xs font-medium text-error">Now out of stock</p>}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    {l.issue === 'unavailable' ?
                <span /> :

                <QuantityStepper size="sm" value={l.quantity} max={l.maxQty} onChange={(q) => updateQuantity(l.key, q)} label={`Quantity for ${l.product.name}`} />
                }
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium tabular-nums text-ink">{formatPrice(l.lineTotal)}</span>
                      <button type="button" onClick={() => onRemove(l.key, l.product.name)} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-2 hover:bg-surface hover:text-error" aria-label={`Remove ${l.product.name}`}>
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
          )}
          </ul>
        </div>
      }
    </Overlay>);

}