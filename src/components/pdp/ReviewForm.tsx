import React, { useState } from 'react';
import { CheckCircle2Icon, ImagePlusIcon, XIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { useAuth } from '../../contexts/AuthContext';
import { useReviews } from '../../contexts/ReviewsContext';
import { useOrders } from '../../contexts/OrdersContext';
import { StarRatingInput } from '../ui/StarRating';
import { TextArea, TextField } from '../ui/Field';
import { Button } from '../ui/Button';
import { Alert } from '../ui/States';
import { REVIEW_PHOTO_MAX_BYTES, REVIEW_PHOTO_MAX_COUNT, REVIEW_PHOTO_TYPES, sanitiseText } from '../../utils/validation';

type Props = {product: Product;onDone: () => void;};

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export function ReviewForm({ product, onDone }: Props) {
  const { customer } = useAuth();
  const { submitReview } = useReviews();
  const { hasPurchased } = useOrders();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState(customer ? `${customer.firstName} ${customer.lastName.charAt(0)}.` : '');
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!customer) return null;

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files);
    const next: string[] = [];
    for (const f of list) {
      if (photos.length + next.length >= REVIEW_PHOTO_MAX_COUNT) {
        setErrors((e) => ({ ...e, photos: `You can upload up to ${REVIEW_PHOTO_MAX_COUNT} photos.` }));
        break;
      }
      if (!REVIEW_PHOTO_TYPES.includes(f.type)) {
        setErrors((e) => ({ ...e, photos: `${f.name} isn’t supported. Use JPG, PNG or WebP.` }));
        continue;
      }
      if (f.size > REVIEW_PHOTO_MAX_BYTES) {
        setErrors((e) => ({ ...e, photos: `${f.name} is larger than 5 MB.` }));
        continue;
      }
      try {
        next.push(await readAsDataUrl(f));
      } catch {
        setErrors((e) => ({ ...e, photos: `We couldn’t read ${f.name}. Try another photo.` }));
      }
    }
    if (next.length) {
      setPhotos((p) => [...p, ...next]);
      if (photos.length + next.length <= REVIEW_PHOTO_MAX_COUNT) setErrors(({ photos: _p, ...rest }) => rest);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!rating) errs.rating = 'Please choose a star rating.';
    if (body.trim().length < 20) errs.body = 'Please write at least 20 characters so others can learn from your experience.';
    if (!name.trim()) errs.name = 'Enter the name to show with your review.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('submitting');
    setSubmitError(null);
    const result = await submitReview({
      productId: product.id,
      customerId: customer.id,
      author: sanitiseText(name, 40),
      rating,
      title: sanitiseText(title, 80) || undefined,
      body: sanitiseText(body, 1500),
      photos,
      verified: hasPurchased(customer.id, product.id)
    });
    if (!result.ok) {
      setSubmitError(result.error);
      setStatus('idle');
      return;
    }
    setStatus('done');
  };

  if (status === 'done') {
    return (
      <div className="px-5 py-10 text-center">
        <CheckCircle2Icon className="mx-auto h-10 w-10 text-success" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl text-ink">Thank you for your review</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">
          Reviews are checked by our team before they’re published, usually within 2 working days. You can see its status in My Reviews.
        </p>
        <Button className="mt-6" onClick={onDone}>Done</Button>
      </div>);

  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 p-5">
      <p className="text-sm text-ink-2">
        Reviewing <span className="font-medium text-ink">{product.name}</span>
      </p>
      <StarRatingInput value={rating} onChange={setRating} error={errors.rating} />
      <TextField label="Review title" optional value={title} maxLength={80} onChange={(e) => setTitle(e.target.value)} />
      <TextArea label="Your review" required value={body} maxLength={1500} onChange={(e) => setBody(e.target.value)} error={errors.body} hint="What did you like or dislike? How did it work for your skin?" />
      <div>
        <p className="mb-1.5 text-sm font-medium text-ink">Photos <span className="font-normal text-ink-muted">(optional)</span></p>
        <div className="flex flex-wrap gap-2">
          {photos.map((src, i) =>
          <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg bg-product">
              <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              <button type="button" onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink" aria-label={`Remove photo ${i + 1}`}>
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          {photos.length < REVIEW_PHOTO_MAX_COUNT &&
          <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-line text-xs text-ink-2 hover:border-ink focus-within:ring-2 focus-within:ring-brand/30">
              <ImagePlusIcon className="h-5 w-5" aria-hidden="true" />
              Add
              <input type="file" accept={REVIEW_PHOTO_TYPES.join(',')} multiple className="sr-only" onChange={(e) => {onFiles(e.target.files);e.target.value = '';}} aria-label="Upload photos" />
            </label>
          }
        </div>
        <p className="mt-1.5 text-xs text-ink-muted">Up to 3 photos. JPG, PNG or WebP, max 5 MB each.</p>
        {errors.photos && <p className="mt-1 text-xs font-medium text-error" role="alert">{errors.photos}</p>}
      </div>
      <TextField label="Display name" required value={name} maxLength={40} onChange={(e) => setName(e.target.value)} error={errors.name} hint="Shown publicly with your review." />
      {submitError && <Alert tone="error">{submitError}</Alert>}
      <p className="text-xs text-ink-muted">By submitting, you confirm this review reflects your own experience. Reviews are moderated before publication.</p>
      <Button type="submit" fullWidth size="lg" loading={status === 'submitting'}>Submit review</Button>
    </form>);

}