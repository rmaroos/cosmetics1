import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchIcon, SearchXIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { searchBrands, searchCategories, searchProducts, getCategoryUrl } from '../../utils/catalog';
import { popularSearches } from '../../data/site';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { ProductListing } from '../../components/listing/ProductListing';
import { EmptyState } from '../../components/ui/States';
import { Button } from '../../components/ui/Button';
import { addRecentSearch } from '../../components/layout/SearchOverlay';

export function Search() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = (params.get('q') ?? '').trim().slice(0, 100);
  const [input, setInput] = useState(q);
  useEffect(() => setInput(q), [q]);
  useDocumentMeta(q ? `Search: ${q}` : 'Search', undefined, { noindex: true });

  const matchedBrands = q ? searchBrands(q) : [];
  const matchedCategories = q ? searchCategories(q) : [];
  const hasProducts = q ? searchProducts(q).length > 0 : false;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = input.trim();
    if (!term) return;
    addRecentSearch(term);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <Container className="pb-16">
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <form role="search" onSubmit={submit} className="max-w-2xl">
        <label htmlFor="search-page-input" className="mb-2 block font-display text-4xl text-ink md:text-5xl">
          {q ? <>Results for “{q}”</> : 'Search'}
        </label>
        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
            <input
              id="search-page-input"
              type="search"
              value={input}
              maxLength={100}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search products, brands or ingredients"
              className="h-12 w-full rounded-lg border border-line pl-10 pr-3 text-[15px] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25" />
            
          </div>
          <Button type="submit" size="lg">Search</Button>
        </div>
      </form>

      {(matchedBrands.length > 0 || matchedCategories.length > 0) &&
      <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-2">Jump to:</span>
          {matchedBrands.map((b) =>
        <Link key={b.id} to={`/brand/${b.slug}`} className="rounded-full border border-line px-3.5 py-1.5 text-ink hover:border-ink">
              {b.name} <span className="text-ink-muted">· Brand</span>
            </Link>
        )}
          {matchedCategories.map((c) =>
        <Link key={c.id} to={getCategoryUrl(c)} className="rounded-full border border-line px-3.5 py-1.5 text-ink hover:border-ink">
              {c.name} <span className="text-ink-muted">· Category</span>
            </Link>
        )}
        </div>
      }

      <div className="mt-8">
        {!q ?
        <EmptyState
          icon={<SearchIcon className="h-6 w-6" />}
          title="What are you looking for?"
          description="Search by product name, brand, ingredient or concern."
          action={popularSearches.map((p) =>
          <Button key={p} to={`/search?q=${encodeURIComponent(p)}`} variant="secondary" size="sm">
                {p}
              </Button>
          )} /> :

        !hasProducts ?
        <EmptyState
          icon={<SearchXIcon className="h-6 w-6" />}
          title="No products found"
          description={`We couldn’t find anything for “${q}”. Check the spelling, try a more general term, or explore a popular search.`}
          action={
          <>
                {popularSearches.slice(0, 4).map((p) =>
            <Button key={p} to={`/search?q=${encodeURIComponent(p)}`} variant="secondary" size="sm">
                    {p}
                  </Button>
            )}
                <Button to="/shop" size="sm">Shop all</Button>
              </>
          } /> :


        <ProductListing listingKey={`search-${q}`} resolveProducts={() => searchProducts(q)} query={q} />
        }
      </div>
    </Container>);

}