import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { useAsync } from '../../hooks/useAsync';
import { useListingParams } from '../../hooks/useListingParams';
import { fetchProducts } from '../../utils/api';
import {
  applyFilters,
  buildFacets,
  countActive,
  filterKeys,
  labelForFilter,
  sortOptions,
  sortProducts,
  type FilterKey,
  type ListingFilters,
  type SortKey } from
'../../utils/listing';
import { pluralize } from '../../utils/format';
import { FilterPanel } from './FilterPanel';
import { Pagination } from './Pagination';
import { ProductGrid, ProductGridSkeleton } from '../product/ProductGrid';
import { Overlay } from '../ui/Overlay';
import { Button } from '../ui/Button';
import { EmptyState, ErrorState } from '../ui/States';

const PAGE_SIZE = 12;

type Props = {
  listingKey: string;
  resolveProducts: () => Product[];
  hiddenFilters?: FilterKey[];
  query?: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

export function ProductListing({ listingKey, resolveProducts, hiddenFilters = [], query, emptyTitle, emptyDescription }: Props) {
  const state = useAsync(() => fetchProducts(resolveProducts), [listingKey]);
  const { filters, sort, page, toggleFilter, setAllFilters, clearFilters, setSort, setPage } = useListingParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draft, setDraft] = useState<ListingFilters>(filters);

  useEffect(() => {
    if (drawerOpen) setDraft(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  const base = state.status === 'success' ? state.data : [];
  const facets = useMemo(() => buildFacets(base, filters), [base, filters]);
  const draftFacets = useMemo(() => buildFacets(base, draft), [base, draft]);
  const results = useMemo(() => sortProducts(applyFilters(base, filters), sort, query), [base, filters, sort, query]);
  const draftCount = useMemo(() => applyFilters(base, draft).length, [base, draft]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeCount = countActive(filters);

  const toggleDraft = (key: FilterKey, value: string) =>
  setDraft((d) => ({ ...d, [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value] }));

  if (state.status === 'error') return <ErrorState message={state.error} onRetry={state.retry} />;

  const activeChips = filterKeys.flatMap((k) => filters[k].map((v) => ({ key: k, value: v, label: labelForFilter(k, v, facets) })));

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-24">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h2 className="text-sm font-semibold text-ink">Filter</h2>
            {activeCount > 0 &&
            <button type="button" onClick={clearFilters} className="text-xs text-ink-2 underline underline-offset-2 hover:text-ink">
                Clear all
              </button>
            }
          </div>
          {state.status === 'loading' ?
          <div className="space-y-3 py-4" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) =>
            <div key={i} className="h-4 animate-pulse rounded bg-[#F1EDEB]" />
            )}
            </div> :

          <FilterPanel facets={facets} filters={filters} onToggle={toggleFilter} hidden={hiddenFilters} />
          }
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <p className="text-sm text-ink-2" aria-live="polite">
            {state.status === 'loading' ? 'Loading products…' : pluralize(results.length, 'product')}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setDrawerOpen(true)}>
              <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
              Filter{activeCount > 0 && ` (${activeCount})`}
            </Button>
            <label htmlFor={`sort-${listingKey}`} className="sr-only">
              Sort by
            </label>
            <select
              id={`sort-${listingKey}`}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 rounded-lg border border-line bg-white pl-3 pr-8 text-sm text-ink focus:border-brand focus:outline-none">
              
              {sortOptions.map((o) =>
              <option key={o.value} value={o.value}>
                  {o.value === 'recommended' && query ? 'Most relevant' : o.label}
                </option>
              )}
            </select>
          </div>
        </div>

        {activeChips.length > 0 &&
        <ul className="flex flex-wrap items-center gap-2 pt-4" aria-label="Active filters">
            {activeChips.map((c) =>
          <li key={`${c.key}-${c.value}`}>
                <button
              type="button"
              onClick={() => toggleFilter(c.key, c.value)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-brand-pale pl-3 pr-2 text-xs font-medium text-ink hover:bg-brand-soft"
              aria-label={`Remove filter: ${c.label}`}>
              
                  {c.label}
                  <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </li>
          )}
            <li>
              <button type="button" onClick={clearFilters} className="px-2 text-xs font-medium text-ink-2 underline underline-offset-2 hover:text-ink">
                Clear all
              </button>
            </li>
          </ul>
        }

        <div className="pt-6">
          {state.status === 'loading' ?
          <ProductGridSkeleton count={6} columns={3} /> :
          results.length === 0 ?
          base.length === 0 ?
          <EmptyState
            icon={<SearchXIcon className="h-6 w-6" />}
            title={emptyTitle ?? 'Nothing here yet'}
            description={emptyDescription ?? 'There are no products available in this section right now.'}
            action={<Button to="/shop">Browse all products</Button>} /> :


          <EmptyState
            icon={<SearchXIcon className="h-6 w-6" />}
            title="No products match these filters"
            description="Try removing a filter or two to see more results."
            action={
            <>
                    <Button onClick={clearFilters}>Clear filters</Button>
                    <Button to="/shop" variant="secondary">
                      Shop all
                    </Button>
                  </>
            } /> :



          <>
              <ProductGrid products={pageItems} columns={3} />
              <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
            </>
          }
        </div>
      </div>

      <Overlay
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filter products"
        side="right"
        footer={
        <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setDraft({ brand: [], type: [], skin: [], concern: [], price: [], rating: [], availability: [] })}>
              Clear all
            </Button>
            <Button
            className="flex-1"
            onClick={() => {
              setAllFilters(draft);
              setDrawerOpen(false);
            }}>
            
              Show {draftCount} {draftCount === 1 ? 'result' : 'results'}
            </Button>
          </div>
        }>
        
        <div className="px-5">
          <FilterPanel facets={draftFacets} filters={draft} onToggle={toggleDraft} hidden={hiddenFilters} />
        </div>
      </Overlay>
    </div>);

}

export function SubcategoryChips({ items }: {items: {label: string;to: string;active?: boolean;}[];}) {
  if (!items.length) return null;
  return (
    <nav aria-label="Subcategories" className="no-scrollbar -mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-2">
        {items.map((i) =>
        <li key={i.to} className="shrink-0">
            <Link
            to={i.to}
            aria-current={i.active ? 'page' : undefined}
            className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium ${i.active ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-ink'}`}>
            
              {i.label}
            </Link>
          </li>
        )}
      </ul>
    </nav>);

}