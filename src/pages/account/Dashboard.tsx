import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrdersContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useReviews } from '../../contexts/ReviewsContext';
import { pluralize } from '../../utils/format';
import { OrderCard } from '../../components/account/OrderCard';
import { Button } from '../../components/ui/Button';

export function Dashboard() {
  useDocumentMeta('My account', undefined, { noindex: true });
  const { customer } = useAuth();
  const { ordersFor } = useOrders();
  const { count } = useWishlist();
  const { reviewsBy } = useReviews();
  if (!customer) return null;
  const orders = ordersFor(customer.id);
  const latest = orders[0];
  const defaultAddress = customer.addresses.find((a) => a.isDefault);

  const tiles = [
  { label: 'Profile', value: customer.email, to: '/account/profile' },
  { label: 'Default address', value: defaultAddress ? `${defaultAddress.line1}, ${defaultAddress.city}` : 'No address saved yet', to: '/account/addresses' },
  { label: 'Wishlist', value: count ? pluralize(count, 'saved item') : 'Nothing saved yet', to: '/account/wishlist' },
  { label: 'Reviews', value: pluralize(reviewsBy(customer.id).length, 'review'), to: '/account/reviews' }];


  return (
    <div className="space-y-10">
      <section aria-labelledby="latest-h">
        <div className="mb-4 flex items-center justify-between">
          <h1 id="latest-h" className="text-xl font-semibold text-ink">Latest order</h1>
          {orders.length > 1 &&
          <Link to="/account/orders" className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-brand">
              All orders ({orders.length}) <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        </div>
        {latest ?
        <OrderCard order={latest} /> :

        <div className="rounded-xl bg-surface p-6">
            <p className="text-ink-2">You haven’t placed any orders yet.</p>
            <Button to="/shop" className="mt-4">Start shopping</Button>
          </div>
        }
      </section>

      <section aria-labelledby="details-h">
        <h2 id="details-h" className="mb-4 text-xl font-semibold text-ink">Your details</h2>
        <ul className="divide-y divide-line border-y border-line">
          {tiles.map((t) =>
          <li key={t.label}>
              <Link to={t.to} className="group flex items-center gap-4 py-4">
                <span className="w-36 shrink-0 text-sm text-ink-2">{t.label}</span>
                <span className="min-w-0 flex-1 truncate text-[15px] text-ink">{t.value}</span>
                <ArrowRightIcon className="h-4 w-4 text-ink-muted group-hover:text-brand" aria-hidden="true" />
              </Link>
            </li>
          )}
        </ul>
      </section>
    </div>);

}