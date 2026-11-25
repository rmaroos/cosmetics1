import React from 'react';
import { Link } from 'react-router-dom';
import { TruckIcon } from 'lucide-react';
import type { Order } from '../../types/commerce';
import { formatDate, formatPrice } from '../../utils/format';
import { bankDetails } from '../../data/site';
import { OrderSummary } from '../checkout/OrderSummary';
import { StatusBadge, StatusTimeline, paymentLabels } from './OrderStatus';
import { getProductById } from '../../utils/catalog';

export function BankTransferDetails({ order }: {order: Order;}) {
  if (order.paymentMethod.id !== 'bank' || order.paymentStatus !== 'awaiting_transfer') return null;
  return (
    <div className="rounded-xl border border-info/20 bg-info-soft p-5">
      <p className="font-semibold text-ink">Complete your bank transfer</p>
      <p className="mt-1 text-sm text-ink-2">Please transfer {formatPrice(order.total)} within 48 hours, using your order reference as the payment reference. We’ll dispatch once payment is confirmed.</p>
      <dl className="mt-4 grid grid-cols-[130px_1fr] gap-y-1.5 text-sm">
        <dt className="text-ink-2">Bank</dt><dd className="text-ink">{bankDetails.bank}</dd>
        <dt className="text-ink-2">Account name</dt><dd className="text-ink">{bankDetails.accountName}</dd>
        <dt className="text-ink-2">Account number</dt><dd className="font-medium tabular-nums text-ink">{bankDetails.accountNumber}</dd>
        <dt className="text-ink-2">Branch</dt><dd className="text-ink">{bankDetails.branch}</dd>
        <dt className="text-ink-2">Reference</dt><dd className="font-medium text-ink">{order.reference}</dd>
      </dl>
    </div>);

}

export function OrderDetailView({ order, hideBankDetails }: {order: Order;hideBankDetails?: boolean;}) {
  const a = order.address;
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={order.status} />
        <span className="text-sm text-ink-2">Placed {formatDate(order.createdAt, 'd MMM yyyy, h:mm a')}</span>
      </div>

      {!hideBankDetails && <BankTransferDetails order={order} />}

      <div className="grid gap-8 md:grid-cols-2">
        <section aria-labelledby="track-h">
          <h2 id="track-h" className="mb-4 text-base font-semibold text-ink">Order status</h2>
          <StatusTimeline order={order} />
          {order.tracking &&
          <p className="mt-5 flex items-start gap-2 rounded-lg bg-surface px-4 py-3 text-sm text-ink-2">
              <TruckIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{order.tracking.courier} · Tracking number <span className="font-medium text-ink">{order.tracking.number}</span></span>
            </p>
          }
        </section>
        <section aria-labelledby="deliver-h" className="space-y-5 text-sm">
          <div>
            <h2 id="deliver-h" className="mb-2 text-base font-semibold text-ink">Delivery</h2>
            <p className="text-ink">{a.fullName}</p>
            <p className="text-ink-2">{a.line1}{a.line2 && `, ${a.line2}`}</p>
            <p className="text-ink-2">{a.city}, {a.district}{a.postalCode && ` ${a.postalCode}`}</p>
            <p className="text-ink-2">{a.phone}</p>
            {a.instructions && <p className="mt-1 text-xs text-ink-muted">Note: {a.instructions}</p>}
            <p className="mt-2 text-ink-2">{order.deliveryMethod.name} · {order.deliveryMethod.description}</p>
          </div>
          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Payment</h2>
            <p className="text-ink-2">{order.paymentMethod.name} · <span className="text-ink">{paymentLabels[order.paymentStatus]}</span></p>
          </div>
        </section>
      </div>

      <section aria-labelledby="items-h">
        <h2 id="items-h" className="mb-2 text-base font-semibold text-ink">Items</h2>
        <OrderSummary
          lines={order.items.map((i) => ({ key: i.variantId, name: i.name, brandName: i.brandName, variantLabel: i.variantLabel, image: i.image, quantity: i.quantity, lineTotal: i.unitPrice * i.quantity }))}
          subtotal={order.subtotal}
          discount={order.discount}
          promoCode={order.promoCode}
          deliveryFee={order.deliveryFee}
          deliveryLabel={order.deliveryMethod.name} />
        
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {order.items.map((i) => {
            const p = getProductById(i.productId);
            return p ?
            <li key={i.variantId}>
                <Link to={`/product/${p.slug}`} className="text-ink-2 underline underline-offset-2 hover:text-ink">Buy {p.name} again</Link>
              </li> :
            null;
          })}
        </ul>
      </section>
    </div>);

}