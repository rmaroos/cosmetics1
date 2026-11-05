import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { useReviews } from '../../contexts/ReviewsContext';
import { useOrders } from '../../contexts/OrdersContext';
import { getProductById } from '../../utils/catalog';
import { formatDate } from '../../utils/format';
import { StarRating } from '../../components/ui/StarRating';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/States';

const statusText = { pending: 'Awaiting approval', published: 'Published', rejected: 'Not published' };
const statusTone = { pending: 'bg-warning-soft text-warning', published: 'bg-success-soft text-success', rejected: 'bg-error-soft text-error' };

export function MyReviews() {
  useDocumentMeta('My reviews', undefined, { noindex: true });
  const { customer } = useAuth();
  const { reviewsBy, hasReviewed } = useReviews();
  const { ordersFor } = useOrders();
  if (!customer) return null;
  const mine = reviewsBy(customer.id);

  const toReview = Array.from(new Set(ordersFor(customer.id).filter((o) => o.status === 'delivered').flatMap((o) => o.items.map((i) => i.productId)))).
  filter((id) => !hasReviewed(customer.id, id)).
  map(getProductById).
  filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="space-y-10">
      {toReview.length > 0 &&
      <section aria-labelledby="to-review-h">
          <h2 id="to-review-h" className="text-xl font-semibold text-ink">Ready to review</h2>
          <p className="mt-1 text-sm text-ink-2">Products from your delivered orders.</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {toReview.map((p) =>
          <li key={p.id} className="flex items-center gap-4 py-3">
                <img src={p.images[0]} alt="" className="h-14 w-14 rounded-lg bg-product object-cover" />
                <p className="flex-1 text-[15px] text-ink">{p.name}</p>
                <Button to={`/product/${p.slug}#reviews`} variant="secondary" size="sm">Write a review</Button>
              </li>
          )}
          </ul>
        </section>
      }

      <section aria-labelledby="my-reviews-h">
        <h1 id="my-reviews-h" className="text-xl font-semibold text-ink">My reviews</h1>
        {mine.length === 0 ?
        <EmptyState icon={<MessageSquareIcon className="h-6 w-6" />} title="No reviews yet" description="Share your experience on any product page to help other customers." action={<Button to="/shop">Browse products</Button>} /> :

        <ul className="mt-4 divide-y divide-line border-y border-line">
            {mine.map((r) => {
            const p = getProductById(r.productId);
            return (
              <li key={r.id} className="py-5">
                  <div className="flex flex-wrap items-center gap-3">
                    {p ? <Link to={`/product/${p.slug}`} className="font-medium text-ink hover:underline underline-offset-2">{p.name}</Link> : <span className="font-medium text-ink">Product no longer available</span>}
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone[r.status]}`}>{statusText[r.status]}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <StarRating value={r.rating} />
                    {r.title && <span className="text-sm font-semibold text-ink">{r.title}</span>}
                  </div>
                  <p className="mt-1.5 text-sm text-ink-2">{r.body}</p>
                  {r.photos.length > 0 &&
                <div className="mt-2 flex gap-2">
                      {r.photos.map((src, i) => <img key={i} src={src} alt={`Your photo ${i + 1}`} className="h-14 w-14 rounded-lg object-cover" />)}
                    </div>
                }
                  <p className="mt-2 text-xs text-ink-muted">Submitted {formatDate(r.createdAt)}{r.status === 'pending' && ' · Reviews are usually checked within 2 working days.'}</p>
                </li>);

          })}
          </ul>
        }
      </section>
    </div>);

}