import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquareIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { getProductReviews, getRatingSummary } from '../../utils/catalog';
import { useAuth } from '../../contexts/AuthContext';
import { useReviews } from '../../contexts/ReviewsContext';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import { Overlay } from '../ui/Overlay';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';

type Sort = 'newest' | 'highest' | 'lowest' | 'photos';
const PAGE = 4;

export function ReviewsSection({ product }: {product: Product;}) {
  const { customer } = useAuth();
  const { reviewsBy, hasReviewed } = useReviews();
  const location = useLocation();
  const summary = getRatingSummary(product.id);
  const [sort, setSort] = useState<Sort>('newest');
  const [visible, setVisible] = useState(PAGE);
  const [formOpen, setFormOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const published = useMemo(() => {
    const list = [...getProductReviews(product.id)];
    if (sort === 'highest') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'lowest') list.sort((a, b) => a.rating - b.rating);
    if (sort === 'photos') return list.filter((r) => r.photos?.length);
    return list;
  }, [product.id, sort]);

  const mine = customer ? reviewsBy(customer.id).filter((r) => r.productId === product.id && r.status === 'pending') : [];
  const alreadyReviewed = customer ? hasReviewed(customer.id, product.id) : false;

  const writeAction = !customer ?
  <Button to={`/login?redirect=${encodeURIComponent(location.pathname + '#reviews')}`} variant="secondary">Sign in to write a review</Button> :
  alreadyReviewed ?
  <p className="text-sm text-ink-2">You’ve reviewed this product. <Link to="/account/reviews" className="text-ink underline underline-offset-2">View my reviews</Link></p> :

  <Button variant="secondary" onClick={() => setFormOpen(true)}>Write a review</Button>;


  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
        <div>
          <h2 id="reviews-heading" className="font-display text-3xl text-ink md:text-4xl">Reviews</h2>
          {summary.count > 0 ?
          <>
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-6xl leading-none text-ink">{summary.average.toFixed(1)}</span>
                <div className="pb-1">
                  <StarRating value={summary.average} size="md" />
                  <p className="mt-1 text-sm text-ink-2">Based on {summary.count} reviews</p>
                </div>
              </div>
              {summary.count >= 3 &&
            <ul className="mt-6 space-y-1.5" aria-label="Rating distribution">
                  {([5, 4, 3, 2, 1] as const).map((star) => {
                const n = summary.distribution[star];
                return (
                  <li key={star} className="flex items-center gap-3 text-sm">
                        <span className="w-10 text-ink-2">{star} star</span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
                          <span className="block h-full rounded-full bg-ink" style={{ width: `${n / summary.count * 100}%` }} />
                        </span>
                        <span className="w-6 text-right tabular-nums text-ink-muted">{n}</span>
                      </li>);

              })}
                </ul>
            }
            </> :

          <p className="mt-3 text-ink-2">No reviews yet. Share your experience to help others.</p>
          }
          <div className="mt-6">{writeAction}</div>
        </div>

        <div>
          {summary.count > 0 &&
          <div className="flex items-center justify-between border-b border-line pb-3">
              <p className="text-sm text-ink-2">{published.length} {published.length === 1 ? 'review' : 'reviews'}</p>
              <label className="flex items-center gap-2 text-sm text-ink-2">
                Sort
                <select value={sort} onChange={(e) => {setSort(e.target.value as Sort);setVisible(PAGE);}} className="h-9 rounded-lg border border-line bg-white px-2 text-sm text-ink focus:outline-none focus:border-brand">
                  <option value="newest">Newest</option>
                  <option value="highest">Highest rating</option>
                  <option value="lowest">Lowest rating</option>
                  <option value="photos">With photos</option>
                </select>
              </label>
            </div>
          }
          {mine.map((r) =>
          <ReviewCard key={r.id} {...r} pending onPhotoClick={setPhoto} />
          )}
          {summary.count === 0 && mine.length === 0 &&
          <div className="flex flex-col items-center rounded-2xl bg-surface px-6 py-12 text-center">
              <MessageSquareIcon className="h-8 w-8 text-ink-muted" aria-hidden="true" />
              <p className="mt-3 text-ink-2">Be the first to review {product.name}.</p>
            </div>
          }
          {published.slice(0, visible).map((r) =>
          <ReviewCard key={r.id} {...r} onPhotoClick={setPhoto} />
          )}
          {sort === 'photos' && published.length === 0 && summary.count > 0 && <p className="py-6 text-sm text-ink-2">No reviews with photos yet.</p>}
          {visible < published.length &&
          <Button variant="secondary" className="mt-6" onClick={() => setVisible((v) => v + PAGE)}>
              Show more reviews
            </Button>
          }
        </div>
      </div>

      <Overlay open={formOpen} onClose={() => setFormOpen(false)} title="Write a review">
        <ReviewForm product={product} onDone={() => setFormOpen(false)} />
      </Overlay>
      <Overlay open={Boolean(photo)} onClose={() => setPhoto(null)} title="Customer photo" variant="modal">
        {photo && <img src={photo} alt="Customer-submitted product photo" className="max-h-[75vh] w-full object-contain" />}
      </Overlay>
    </section>);

}