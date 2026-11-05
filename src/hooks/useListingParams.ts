import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterKeys, parseFilters, sortOptions, type FilterKey, type ListingFilters, type SortKey } from '../utils/listing';

/** Filters, sort and page live in the URL so listings are shareable and survive back navigation. */
export function useListingParams() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(() => parseFilters(params), [params]);
  const sortParam = params.get('sort') as SortKey | null;
  const sort: SortKey = sortOptions.some((o) => o.value === sortParam) ? sortParam as SortKey : 'recommended';
  const page = Math.max(1, Number(params.get('page')) || 1);

  const update = useCallback(
    (mutate: (next: URLSearchParams) => void, resetPage = true) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          mutate(next);
          if (resetPage) next.delete('page');
          return next;
        },
        { replace: false, preventScrollReset: true }
      );
    },
    [setParams]
  );

  const toggleFilter = useCallback(
    (key: FilterKey, value: string) =>
    update((next) => {
      const current = (next.get(key) ?? '').split(',').filter(Boolean);
      const list = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (list.length) next.set(key, list.join(','));else
      next.delete(key);
    }),
    [update]
  );

  const setAllFilters = useCallback(
    (f: ListingFilters) =>
    update((next) => {
      filterKeys.forEach((k) => {
        if (f[k].length) next.set(k, f[k].join(','));else
        next.delete(k);
      });
    }),
    [update]
  );

  const clearFilters = useCallback(() => update((next) => filterKeys.forEach((k) => next.delete(k))), [update]);

  const setSort = useCallback(
    (value: SortKey) =>
    update((next) => {
      if (value === 'recommended') next.delete('sort');else
      next.set('sort', value);
    }),
    [update]
  );

  const setPage = useCallback(
    (value: number) =>
    update((next) => {
      if (value <= 1) next.delete('page');else
      next.set('page', String(value));
    }, false),
    [update]
  );

  return { filters, sort, page, toggleFilter, setAllFilters, clearFilters, setSort, setPage };
}