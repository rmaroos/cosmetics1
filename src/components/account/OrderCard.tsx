import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import type { Order } from '../../types/commerce';
import { formatDate, formatPrice, pluralize } from '../../utils/format';
import { StatusBadge } from './OrderStatus';

export function OrderCard({ order }: {order: Order;}) {
  const count = order.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <Link to={`/account/orders/${order.reference}`} className="group flex flex-col gap-4 rounded-xl border border-line p-5 transition-[border-color] duration-150 hover:border-ink-muted sm:flex-row sm:items-center">
      <div className="flex -space-x-3">
        {order.items.slice(0, 3).map((i) =>
        <img key={i.variantId} src={i.image} alt="" className="h-14 w-14 rounded-lg border-2 border-white bg-product object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-ink">{order.reference}</p>
          <StatusBadge status={order.status} />
        </div>
        <p className="mt-1 text-sm text-ink-2">
          {formatDate(order.createdAt)} · {pluralize(count, 'item')} · {formatPrice(order.total)}
        </p>
        <p className="mt-0.5 truncate text-xs text-ink-muted">{order.items.map((i) => i.name).join(', ')}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-brand">
        View details <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>);

}