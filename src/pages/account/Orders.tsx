import React, { useState } from 'react';
import { PackageIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrdersContext';
import { OrderCard } from '../../components/account/OrderCard';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/States';

type Filter = 'all' | 'active' | 'completed';

export function Orders() {
  useDocumentMeta('My orders', undefined, { noindex: true });
  const { customer } = useAuth();
  const { ordersFor } = useOrders();
  const [filter, setFilter] = useState<Filter>('all');
  if (!customer) return null;
  const all = ordersFor(customer.id);
  const list = all.filter((o) => filter === 'all' ? true : filter === 'active' ? !['delivered', 'cancelled'].includes(o.status) : ['delivered', 'cancelled'].includes(o.status));

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">My orders</h1>
      {all.length === 0 ?
      <EmptyState icon={<PackageIcon className="h-6 w-6" />} title="No orders yet" description="When you place an order while signed in, it’ll appear here." action={<Button to="/shop">Start shopping</Button>} /> :

      <>
          <div className="mt-5 flex gap-2" role="group" aria-label="Filter orders">
            {(['all', 'active', 'completed'] as Filter[]).map((f) =>
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={twMerge('h-9 rounded-full border px-4 text-sm font-medium capitalize', filter === f ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-ink')}>
            
                {f}
              </button>
          )}
          </div>
          {list.length === 0 ?
        <p className="mt-8 text-ink-2">No {filter} orders.</p> :

        <ul className="mt-6 space-y-3">
              {list.map((o) =>
          <li key={o.reference}><OrderCard order={o} /></li>
          )}
            </ul>
        }
        </>
      }
    </div>);

}