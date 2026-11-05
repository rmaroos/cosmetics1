import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ClockIcon, SearchIcon, XIcon } from 'lucide-react';
import { getBrandById, getDisplayPrice, searchBrands, searchCategories, searchProducts, getCategoryUrl } from '../../utils/catalog';
import { formatPrice } from '../../utils/format';
import { readStorage, writeStorage } from '../../utils/storage';
import { popularSearches } from '../../data/site';
import { Container } from './Container';

export function addRecentSearch(term: string) {
  const t = term.trim();
  if (!t) return;
  const list = readStorage<string[]>('recent-searches', []).filter((x) => x.toLowerCase() !== t.toLowerCase());
  writeStorage('recent-searches', [t, ...list].slice(0, 5));
}

export function SearchOverlay({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setRecent(readStorage<string[]>('recent-searches', []));
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (trimmed.length < 2) return null;
    return { products: searchProducts(trimmed).slice(0, 5), brands: searchBrands(trimmed).slice(0, 4), categories: searchCategories(trimmed).slice(0, 4) };
  }, [trimmed]);

  const submit = (term: string) => {
    const t = term.trim();
    if (!t) return;
    addRecentSearch(t);
    onClose();
    setQuery('');
    navigate(`/search?q=${encodeURIComponent(t)}`);
  };

  const clearRecent = () => {
    writeStorage('recent-searches', []);
    setRecent([]);
  };

  const chip = 'rounded-full border border-line px-3.5 py-1.5 text-sm text-ink hover:border-ink';

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
          <motion.div className="absolute inset-0 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} onClick={onClose} />
          <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="relative max-h-[85vh] overflow-y-auto bg-white pb-8 shadow-xl">
          
            <Container>
              <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                submit(query);
              }}
              className="flex items-center gap-3 border-b border-line py-4">
              
                <SearchIcon className="h-5 w-5 shrink-0 text-ink-2" aria-hidden="true" />
                <label htmlFor="global-search" className="sr-only">
                  Search products, brands and categories
                </label>
                <input
                id="global-search"
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands or ingredients"
                autoComplete="off"
                maxLength={100}
                className="h-12 flex-1 bg-transparent text-lg text-ink placeholder:text-ink-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden" />
              
                {query &&
              <button type="button" onClick={() => setQuery('')} className="text-sm text-ink-2 hover:text-ink">
                    Clear
                  </button>
              }
                <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface" aria-label="Close search">
                  <XIcon className="h-5 w-5" />
                </button>
              </form>

              {!results &&
            <div className="grid gap-8 pt-6 md:grid-cols-2">
                  {recent.length > 0 &&
              <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-ink">Recent searches</h2>
                        <button type="button" onClick={clearRecent} className="text-xs text-ink-2 underline underline-offset-2 hover:text-ink">
                          Clear
                        </button>
                      </div>
                      <ul className="space-y-1">
                        {recent.map((r) =>
                  <li key={r}>
                            <button type="button" onClick={() => submit(r)} className="flex items-center gap-2.5 py-1.5 text-[15px] text-ink-2 hover:text-ink">
                              <ClockIcon className="h-4 w-4" aria-hidden="true" /> {r}
                            </button>
                          </li>
                  )}
                      </ul>
                    </div>
              }
                  <div>
                    <h2 className="mb-3 text-sm font-semibold text-ink">Popular searches</h2>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((p) =>
                  <button key={p} type="button" onClick={() => submit(p)} className={chip}>
                          {p}
                        </button>
                  )}
                    </div>
                  </div>
                </div>
            }

              {results &&
            <div className="grid gap-8 pt-6 md:grid-cols-[1fr_240px]" aria-live="polite">
                  <div>
                    <h2 className="mb-3 text-sm font-semibold text-ink">Products</h2>
                    {results.products.length === 0 ?
                <p className="text-[15px] text-ink-2">No products match “{trimmed}”. Try a brand name or a broader term.</p> :

                <ul className="divide-y divide-line">
                        {results.products.map((p) =>
                  <li key={p.id}>
                            <Link to={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 py-2.5 hover:bg-surface">
                              <img src={p.images[0]} alt="" className="h-14 w-14 shrink-0 rounded-lg bg-product object-cover" />
                              <span className="min-w-0 flex-1">
                                <span className="block text-xs uppercase tracking-wide text-ink-2">{getBrandById(p.brandId)?.name}</span>
                                <span className="block truncate text-[15px] text-ink">{p.name}</span>
                              </span>
                              <span className="text-sm font-medium tabular-nums text-ink">{formatPrice(getDisplayPrice(p).price)}</span>
                            </Link>
                          </li>
                  )}
                      </ul>
                }
                    <button type="button" onClick={() => submit(query)} className="mt-4 text-sm font-medium text-brand hover:underline underline-offset-2">
                      See all results for “{trimmed}”
                    </button>
                  </div>
                  <div className="space-y-6">
                    {results.brands.length > 0 &&
                <div>
                        <h2 className="mb-2 text-sm font-semibold text-ink">Brands</h2>
                        <ul>
                          {results.brands.map((b) =>
                    <li key={b.id}>
                              <Link to={`/brand/${b.slug}`} onClick={onClose} className="block py-1.5 text-[15px] text-ink-2 hover:text-ink">
                                {b.name}
                              </Link>
                            </li>
                    )}
                        </ul>
                      </div>
                }
                    {results.categories.length > 0 &&
                <div>
                        <h2 className="mb-2 text-sm font-semibold text-ink">Categories</h2>
                        <ul>
                          {results.categories.map((c) =>
                    <li key={c.id}>
                              <Link to={getCategoryUrl(c)} onClick={onClose} className="block py-1.5 text-[15px] text-ink-2 hover:text-ink">
                                {c.name}
                              </Link>
                            </li>
                    )}
                        </ul>
                      </div>
                }
                  </div>
                </div>
            }
            </Container>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}