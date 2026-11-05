import React from 'react';
import { StarIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
};

const sizeMap = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' };

export function StarRating({ value, size = 'sm', className, label }: Props) {
  return (
    <span
      className={twMerge('inline-flex items-center gap-0.5', className)}
      role="img"
      aria-label={label ?? `Rated ${value.toFixed(1)} out of 5`}>
      
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span key={i} className={twMerge('relative inline-block', sizeMap[size])} aria-hidden="true">
            <StarIcon className={twMerge('absolute inset-0 text-line', sizeMap[size])} fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarIcon className={twMerge('text-ink', sizeMap[size])} fill="currentColor" strokeWidth={0} />
            </span>
          </span>);

      })}
    </span>);

}

type InputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

export function StarRatingInput({ value, onChange, error }: InputProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">
        Your rating <span className="text-error" aria-hidden="true">*</span>
      </legend>
      <div className="flex items-center gap-3">
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((i) =>
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i}
            aria-label={`${i} star${i > 1 ? 's' : ''} — ${ratingLabels[i]}`}
            onClick={() => onChange(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                onChange(Math.min(5, (value || 0) + 1));
              }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                onChange(Math.max(1, (value || 2) - 1));
              }
            }}
            className="rounded p-1 transition-transform duration-100 ease-out hover:scale-110">
            
              <StarIcon className={twMerge('h-7 w-7', i <= value ? 'text-brand' : 'text-line')} fill="currentColor" strokeWidth={0} />
            </button>
          )}
        </div>
        {value > 0 && <span className="text-sm text-ink-2">{ratingLabels[value]}</span>}
      </div>
      {error &&
      <p className="mt-1.5 text-xs font-medium text-error" role="alert">
          {error}
        </p>
      }
    </fieldset>);

}