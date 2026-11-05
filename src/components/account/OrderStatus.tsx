import React from 'react';
import { CheckIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import type { Order, OrderStatus as Status, PaymentStatus } from '../../types/commerce';
import { formatDate } from '../../utils/format';

export const statusLabels: Record<Status, string> = {
  placed: 'Order placed',
  confirmed: 'Confirmed',
  processing: 'Being prepared',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

export const paymentLabels: Record<PaymentStatus, string> = {
  pending: 'Pay on delivery',
  awaiting_transfer: 'Awaiting bank transfer',
  paid: 'Paid'
};

const tone: Record<Status, string> = {
  placed: 'bg-info-soft text-info',
  confirmed: 'bg-info-soft text-info',
  processing: 'bg-warning-soft text-warning',
  shipped: 'bg-brand-pale text-brand',
  delivered: 'bg-success-soft text-success',
  cancelled: 'bg-error-soft text-error'
};

export function StatusBadge({ status }: {status: Status;}) {
  return <span className={twMerge('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', tone[status])}>{statusLabels[status]}</span>;
}

const flow: Status[] = ['placed', 'confirmed', 'processing', 'shipped', 'delivered'];

/** Only shows events that have actually happened, plus remaining steps as upcoming. */
export function StatusTimeline({ order }: {order: Order;}) {
  if (order.status === 'cancelled') {
    const at = order.statusHistory.find((h) => h.status === 'cancelled')?.at;
    return <p className="text-sm text-error">This order was cancelled{at ? ` on ${formatDate(at)}` : ''}.</p>;
  }
  return (
    <ol className="relative space-y-5">
      {flow.map((s, i) => {
        const event = order.statusHistory.find((h) => h.status === s);
        const done = Boolean(event);
        const isLast = i === flow.length - 1;
        return (
          <li key={s} className="relative flex gap-4">
            {!isLast && <span className={twMerge('absolute left-[11px] top-6 h-[calc(100%+4px)] w-px', done ? 'bg-success' : 'bg-line')} aria-hidden="true" />}
            <span className={twMerge('relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2', done ? 'border-success bg-success text-white' : 'border-line bg-white')} aria-hidden="true">
              {done && <CheckIcon className="h-3.5 w-3.5" />}
            </span>
            <div className="-mt-0.5">
              <p className={twMerge('text-sm font-medium', done ? 'text-ink' : 'text-ink-muted')}>
                {statusLabels[s]}
                <span className="sr-only">{done ? ' — completed' : ' — not yet'}</span>
              </p>
              {event && <p className="text-xs text-ink-muted">{formatDate(event.at, 'd MMM yyyy, h:mm a')}</p>}
            </div>
          </li>);

      })}
    </ol>);

}