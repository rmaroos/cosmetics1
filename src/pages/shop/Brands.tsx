import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { catalogBrands, productsByBrand } from '../../utils/catalog';
import { pluralize } from '../../utils/format';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { EmptyState } from '../../components/ui/States';
import { Button } from '../../components/ui/Button';

export function Brands() {
  useDocumentMeta('Brands', 'Discover the skincare, makeup and beauty brands available at our store.');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogBrands.filter((b) => productsByBrand(b.id).length > 0 && (!q || b.name.toLowerCase().includes(q) || b.origin.toLowerCase().includes(q)));
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((b) => {
      const letter = b.name[0].toUpperCase();
      map.set(letter, [...(map.get(letter) ?? []), b]);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <Container className="pb-16">
      <ListingHeader
        crumbs={[{ label: 'Brands' }]}
        title="Brands"
        description="From Sri Lankan botanical makers to international favourites."
        aside={
        <div className="relative w-full md:w-72">
            <label htmlFor="brand-search" className="sr-only">Search brands</label>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
            <input
            id="brand-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands"
            className="h-11 w-full rounded-lg border border-line pl-10 pr-3 text-[15px] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25" />
          
          </div>
        } />
      
      {grouped.length === 0 ?
      <EmptyState title="No brands found" description={`We don’t stock a brand matching “${query}” yet.`} action={<Button variant="secondary" onClick={() => setQuery('')}>Clear search</Button>} /> :

      <div className="space-y-10">
          {grouped.map(([letter, list]) =>
        <section key={letter} aria-labelledby={`letter-${letter}`} className="grid gap-4 border-t border-line pt-6 md:grid-cols-[80px_1fr]">
              <h2 id={`letter-${letter}`} className="font-display text-4xl text-brand">{letter}</h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((b) => (
                  <li key={b.id}>
                    <Link
                      to={`/brand/${b.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {b.logo && (
                          <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-lg border border-line/60 bg-surface/80 p-1.5 transition-colors group-hover:border-brand/30">
                            <img
                              src={b.logo}
                              alt={`${b.name} logo`}
                              className="max-h-8 w-auto max-w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-display text-xl text-ink transition-colors group-hover:text-brand">
                            {b.name}
                          </p>
                          <p className="truncate text-xs text-ink-2">
                            {b.origin} · {pluralize(productsByBrand(b.id).length, 'product')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
        )}
        </div>
      }
    </Container>);

}