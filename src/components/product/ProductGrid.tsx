import React from 'react';
import { twMerge } from 'tailwind-merge';
import type { Product } from '../../types/catalog';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../ui/States';

type Props = {products: Product[];className?: string;columns?: 3 | 4;};

const colClass = {
  // Shop/listing pages (filter sidebar takes space on large screens)
  3: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
  // Full-width grids
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
};

export function ProductGrid({ products, className, columns = 4 }: Props) {
  return (
    <ul className={twMerge('grid gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10', colClass[columns], className)}>
      {products.map((p, i) =>
      <li key={p.id}>
          <ProductCard product={p} priority={i < 4} />
        </li>
      )}
    </ul>);

}

export function ProductGridSkeleton({ count = 8, columns = 4 }: {count?: number;columns?: 3 | 4;}) {
  return (
    <div className={twMerge('grid gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10', colClass[columns])} aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) =>
      <div key={i}>
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="mt-3 h-3 w-20" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-24" />
        </div>
      )}
    </div>);

}