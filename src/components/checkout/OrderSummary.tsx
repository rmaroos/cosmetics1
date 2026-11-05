import React from 'react';
import { formatPrice } from '../../utils/format';

export type SummaryLine = {
  key: string;
  name: string;
  brandName?: string;
  variantLabel: string;
  image: string;
  quantity: number;
  lineTotal: number;
  unavailable?: boolean;
};

type Props = {
  lines: SummaryLine[];
  subtotal: number;
  discount: number;
  promoCode?: string | null;
  deliveryFee: number | null;
  deliveryLabel?: string;
  children?: React.ReactNode;
  compact?: boolean;
};

export function OrderSummary({ lines, subtotal, discount, promoCode, deliveryFee, deliveryLabel, children, compact }: Props) {
  const total = subtotal - discount + (deliveryFee ?? 0);
  return (
    <div>
      {!compact &&
      <ul className="divide-y divide-line">
          {lines.map((l) =>
        <li key={l.key} className="flex gap-3 py-3">
              <div className="relative shrink-0">
                <img src={l.image} alt="" className="h-16 w-16 rounded-lg bg-product object-cover" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ink px-1 text-[11px] font-semibold text-white">{l.quantity}</span>
              </div>
              <div className="min-w-0 flex-1">
                {l.brandName && <p className="text-[11px] uppercase tracking-wide text-ink-2">{l.brandName}</p>}
                <p className="text-sm leading-snug text-ink">{l.name}</p>
                <p className="text-xs text-ink-muted">{l.variantLabel}</p>
                {l.unavailable && <p className="text-xs font-medium text-error">Out of stock — not included</p>}
              </div>
              <p className="text-sm font-medium tabular-nums text-ink">{formatPrice(l.lineTotal)}</p>
            </li>
        )}
        </ul>
      }
      <dl className={`space-y-2.5 text-sm ${compact ? '' : 'mt-4 border-t border-line pt-4'}`}>
        <div className="flex justify-between">
          <dt className="text-ink-2">Subtotal</dt>
          <dd className="tabular-nums text-ink">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 &&
        <div className="flex justify-between">
            <dt className="text-ink-2">Discount{promoCode && <span className="ml-1 rounded bg-success-soft px-1.5 py-0.5 text-xs font-medium text-success">{promoCode}</span>}</dt>
            <dd className="tabular-nums text-success">−{formatPrice(discount)}</dd>
          </div>
        }
        <div className="flex justify-between">
          <dt className="text-ink-2">Delivery{deliveryLabel && <span className="block text-xs text-ink-muted">{deliveryLabel}</span>}</dt>
          <dd className="tabular-nums text-ink">{deliveryFee === null ? <span className="text-ink-muted">Calculated at checkout</span> : deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3">
          <dt className="text-base font-semibold text-ink">{deliveryFee === null ? 'Estimated total' : 'Total'}</dt>
          <dd className="text-lg font-semibold tabular-nums text-ink">
            <span className="mr-1 text-xs font-normal text-ink-muted">LKR</span>
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
      {children}
    </div>);

}