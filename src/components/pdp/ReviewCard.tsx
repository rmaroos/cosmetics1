import React from 'react';
import { BadgeCheckIcon, ClockIcon } from 'lucide-react';
import { StarRating } from '../ui/StarRating';
import { formatDate } from '../../utils/format';

type Props = {
  author: string;
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
  verified: boolean;
  photos?: string[];
  pending?: boolean;
  onPhotoClick?: (src: string) => void;
};

export function ReviewCard({ author, rating, title, body, createdAt, verified, photos, pending, onPhotoClick }: Props) {
  return (
    <article className="border-b border-line py-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <StarRating value={rating} />
        {title && <h3 className="text-[15px] font-semibold text-ink">{title}</h3>}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{body}</p>
      {photos && photos.length > 0 &&
      <ul className="mt-3 flex gap-2">
          {photos.map((src, i) =>
        <li key={i}>
              <button type="button" onClick={() => onPhotoClick?.(src)} className="block h-16 w-16 overflow-hidden rounded-lg bg-product" aria-label={`View photo ${i + 1} from ${author}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
        )}
        </ul>
      }
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
        <span className="font-medium text-ink">{author}</span>
        <span>{formatDate(createdAt)}</span>
        {verified &&
        <span className="inline-flex items-center gap-1 text-success">
            <BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Verified purchase
          </span>
        }
        {pending &&
        <span className="inline-flex items-center gap-1 text-warning">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden="true" /> Awaiting approval — only visible to you
          </span>
        }
      </p>
    </article>);

}