import React from 'react';
import { twMerge } from 'tailwind-merge';
import { discountPercent, formatPrice } from '../../utils/format';

type Props = {
  price: number;
  compareAt?: number;
  from?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' };

export function Price({ price, compareAt, from, size = 'sm', className }: Props) {
  const pct = discountPercent(price, compareAt);
  return (
    <div className={twMerge('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span className={twMerge('font-semibold text-ink tabular-nums', sizes[size])}>
        {from && <span className="font-normal text-ink-2">From </span>}
        {pct && <span className="sr-only">Sale price </span>}
        {formatPrice(price)}
      </span>
      {pct && compareAt &&
      <>
          <span className={twMerge('text-ink-muted line-through tabular-nums', size === 'lg' ? 'text-base' : 'text-xs')}>
            <span className="sr-only">Original price </span>
            {formatPrice(compareAt)}
          </span>
          <span className={twMerge('font-medium text-error', size === 'lg' ? 'text-sm' : 'text-xs')}>−{pct}%</span>
        </>
      }
    </div>);

}