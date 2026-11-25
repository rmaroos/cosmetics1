import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, ClockIcon, SearchIcon, TrendingUpIcon, XIcon } from 'lucide-react';
import {
  catalogProducts,
  getBrandById,
  getCategoryUrl,
  getDisplayPrice,
  getTopCategories,
  searchBrands,
  searchCategories,
  searchProducts,
} from '../../utils/catalog';
import type { Product } from '../../types/catalog';
import { formatPrice } from '../../utils/format';
import { readStorage, writeStorage } from '../../utils/storage';
import { popularSearches } from '../../data/site';
import { Container } from './Container';

const RECENT_KEY = 'recent-searches';
const EASE = [0.23, 1, 0.32, 1] as const;

export function addRecentSearch(term: string) {
  const t = term.trim();
  if (!t) return;
  const list = readStorage<string[]>(RECENT_KEY, []).filter((x) => x.toLowerCase() !== t.toLowerCase());
  writeStorage(RECENT_KEY, [t, ...list].slice(0, 6));
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    setRecent(readStorage<string[]>(RECENT_KEY, []));
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (trimmed.length < 2) return null;
    const products = searchProducts(trimmed);
    return {
      total: products.length,
      products: products.slice(0, 6),
      brands: searchBrands(trimmed).slice(0, 5),
      categories: searchCategories(trimmed).slice(0, 5),
    };
  }, [trimmed]);

  const trending = useMemo(
    () => catalogProducts.filter((p) => p.tags.includes('trending')).sort((a, b) => a.salesRank - b.salesRank).slice(0, 4),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  const goToResults = (term: string) => {
    const t = term.trim();
    if (!t) return;
    addRecentSearch(t);
    close();
    navigate(`/search?q=${encodeURIComponent(t)}`);
  };

  const close = () => {
    onClose();
    setQuery('');
  };

  const pick = () => {
    if (trimmed) addRecentSearch(trimmed);
    close();
  };

  const clearRecent = () => {
    writeStorage(RECENT_KEY, []);
    setRecent([]);
  };

  const chip =
    'inline-flex h-10 items-center rounded-full border border-line bg-white px-4 text-sm text-ink transition-colors duration-200 hover:border-ink';
  const heading = 'type-label text-gold-text';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
          <motion.div
            className="absolute inset-0 bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -16 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative max-h-[90vh] overflow-y-auto border-b border-line bg-ivory pb-12"
          >
            <Container>
              {/* Large search field */}
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  goToResults(query);
                }}
                className="flex items-center gap-4 border-b border-ink/15 pb-4 pt-8 md:pt-12"
              >
                <SearchIcon className="h-6 w-6 shrink-0 text-ink" strokeWidth={1.35} aria-hidden="true" />
                <label htmlFor="global-search" className="sr-only">
                  Search products, brands and categories
                </label>
                <input
                  ref={inputRef}
                  id="global-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  autoComplete="off"
                  maxLength={100}
                  className="h-14 min-w-0 flex-1 bg-transparent text-[22px] font-normal text-ink placeholder:text-ink-muted focus:outline-none md:text-[30px] [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="type-label text-ink-2 transition-colors hover:text-ink"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-product"
                  aria-label="Close search"
                >
                  <XIcon className="h-[22px] w-[22px]" strokeWidth={1.35} />
                </button>
              </form>

              {/* ── Empty state: trending & recent ── */}
              {!results && (
                <div className="grid gap-10 pt-9 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                  <div className="space-y-9">
                    <div>
                      <p className={heading}>Trending searches</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {popularSearches.map((p) => (
                          <button key={p} type="button" onClick={() => setQuery(p)} className={chip}>
                            <TrendingUpIcon className="mr-2 h-3.5 w-3.5 text-ink-muted" strokeWidth={1.5} aria-hidden="true" />
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {recent.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between">
                          <p className={heading}>Recent searches</p>
                          <button type="button" onClick={clearRecent} className="text-xs text-ink-2 underline underline-offset-2 hover:text-ink">
                            Clear history
                          </button>
                        </div>
                        <ul className="mt-3">
                          {recent.map((r) => (
                            <li key={r}>
                              <button
                                type="button"
                                onClick={() => setQuery(r)}
                                className="flex min-h-[40px] items-center gap-3 text-[15px] text-ink-2 transition-colors hover:text-ink"
                              >
                                <ClockIcon className="h-4 w-4 text-ink-muted" strokeWidth={1.5} aria-hidden="true" />
                                {r}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <p className={heading}>Shop by category</p>
                      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                        {getTopCategories().map((c) => (
                          <li key={c.id}>
                            <Link to={getCategoryUrl(c)} onClick={close} className="text-[15px] text-ink-2 transition-colors hover:text-ink">
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {trending.length > 0 && (
                    <div>
                      <p className={heading}>Trending now</p>
                      <ul className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-4">
                        {trending.map((p) => (
                          <li key={p.id}>
                            <ProductTile product={p} onPick={close} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ── Live results ── */}
              {results && (
                <div className="grid gap-10 pt-9 lg:grid-cols-[1fr_280px] lg:gap-16" aria-live="polite">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className={heading}>Products</p>
                      {results.total > 0 && (
                        <span className="text-xs text-ink-muted">
                          {results.total} {results.total === 1 ? 'result' : 'results'}
                        </span>
                      )}
                    </div>

                    {results.products.length === 0 ? (
                      <p className="mt-4 text-[15px] text-ink-2">
                        No products match “{trimmed}”. Try a brand name, an ingredient or a broader term.
                      </p>
                    ) : (
                      <ul className="mt-2 divide-y divide-line/70">
                        {results.products.map((p) => (
                          <li key={p.id}>
                            <ProductRow product={p} onPick={pick} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {results.total > 0 && (
                      <button type="button" onClick={() => goToResults(query)} className="link-luxe group mt-7">
                        View all {results.total} results
                        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[250ms] group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-9">
                    {results.categories.length > 0 && (
                      <div>
                        <p className={heading}>Categories</p>
                        <ul className="mt-3 space-y-1">
                          {results.categories.map((c) => (
                            <li key={c.id}>
                              <Link to={getCategoryUrl(c)} onClick={pick} className="block py-1.5 text-[15px] text-ink-2 transition-colors hover:text-ink">
                                {c.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.brands.length > 0 && (
                      <div>
                        <p className={heading}>Brands</p>
                        <ul className="mt-3 space-y-1">
                          {results.brands.map((b) => (
                            <li key={b.id}>
                              <Link to={`/brand/${b.slug}`} onClick={pick} className="block py-1.5 text-[15px] text-ink-2 transition-colors hover:text-ink">
                                {b.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {results.categories.length === 0 && results.brands.length === 0 && (
                      <div>
                        <p className={heading}>Try</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {popularSearches.slice(0, 4).map((p) => (
                            <button key={p} type="button" onClick={() => setQuery(p)} className={chip}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Container>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ProductRow({ product, onPick }: { product: Product; onPick: () => void }) {
  const { price, compareAt } = getDisplayPrice(product);
  return (
    <Link to={`/product/${product.slug}`} onClick={onPick} className="group flex items-center gap-5 py-3.5">
      <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-product">
        <img src={product.images[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block type-label text-ink-muted">{getBrandById(product.brandId)?.name}</span>
        <span className="mt-1 block truncate text-[15px] font-medium text-ink transition-colors group-hover:text-brand">{product.name}</span>
      </span>
      <span className="shrink-0 text-right text-[15px] tabular-nums">
        {compareAt && compareAt > price && <span className="mr-2 text-sm text-ink-muted line-through">{formatPrice(compareAt)}</span>}
        <span className={compareAt && compareAt > price ? 'text-sale' : 'text-ink'}>{formatPrice(price)}</span>
      </span>
    </Link>
  );
}

function ProductTile({ product, onPick }: { product: Product; onPick: () => void }) {
  const { price } = getDisplayPrice(product);
  return (
    <Link to={`/product/${product.slug}`} onClick={onPick} className="group block">
      <span className="block aspect-[4/5] overflow-hidden rounded-xl bg-product">
        <img src={product.images[0]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      </span>
      <span className="mt-3 block type-label text-ink-muted">{getBrandById(product.brandId)?.name}</span>
      <span className="mt-1 block truncate text-sm font-medium text-ink">{product.name}</span>
      <span className="mt-0.5 block text-sm tabular-nums text-ink">{formatPrice(price)}</span>
    </Link>
  );
}
