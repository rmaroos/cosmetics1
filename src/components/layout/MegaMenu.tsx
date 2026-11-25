import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import type { MegaMenuData } from '../../config/navigationConfig';
import { getBrandById, getDisplayPrice } from '../../utils/catalog';
import { formatPrice } from '../../utils/format';
=======
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import type { MegaMenuData } from '../../config/navigationConfig';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
import { Container } from './Container';

export interface MegaMenuProps {
  id: string;
<<<<<<< HEAD
  /** Changes when the customer moves to another menu — content cross-fades. */
  menuKey: string;
  label: string;
=======
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
  data: MegaMenuData;
  onNavigate: () => void;
}

<<<<<<< HEAD
const EASE = [0.23, 1, 0.32, 1] as const;

const linkClass =
  'group/link relative inline-block py-1 text-[15px] leading-snug text-ink-2 transition-colors duration-200 hover:text-ink focus-visible:text-ink focus-visible:outline-none';
const underline =
  'absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[250ms] ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100';

export function MegaMenu({ id, menuKey, label, data, onNavigate }: MegaMenuProps) {
  const reduce = useReducedMotion();
  const { columns = [], shopAll, promoCard, spotlight } = data;
=======
export function MegaMenu({ id, data, onNavigate }: MegaMenuProps) {
  const { columns = [], featuredBrands, promoCard, footerLink } = data || {};
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9

  return (
    <motion.div
      id={id}
<<<<<<< HEAD
      role="region"
      aria-label={`${label} menu`}
      initial={{ opacity: 0, y: reduce ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
      transition={{ duration: 0.24, ease: EASE }}
      className="max-h-[calc(100vh-170px)] overflow-y-auto border-b border-line-subtle bg-ivory"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={menuKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Container className="py-11">
            <div className="flex gap-12 xl:gap-16">
              {/* Category columns */}
              <div className="grid min-w-0 flex-1 auto-cols-fr grid-flow-col gap-x-10 xl:gap-x-14">
                {columns.map((col) => (
                  <div key={col.heading} className="min-w-0">
                    {col.headingHref ? (
                      <Link
                        to={col.headingHref}
                        onClick={onNavigate}
                        className="block type-label text-gold-text transition-colors hover:text-ink"
                      >
                        {col.heading}
                      </Link>
                    ) : (
                      <p className="type-label text-gold-text">{col.heading}</p>
                    )}
                    <ul className="mt-5 space-y-2">
                      {col.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link to={link.href} onClick={onNavigate} className={linkClass}>
                            {link.label}
                            <span aria-hidden="true" className={underline} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Live offers spotlight */}
                {spotlight && spotlight.products.length > 0 && (
                  <div className="col-span-2 min-w-0">
                    <p className="block type-label text-gold-text">{spotlight.heading}</p>
                    <ul className="mt-5 grid grid-cols-3 gap-5">
                      {spotlight.products.map((p) => {
                        const { price, compareAt } = getDisplayPrice(p);
                        return (
                          <li key={p.id}>
                            <Link to={`/product/${p.slug}`} onClick={onNavigate} className="group/p block">
                              <span className="block aspect-square overflow-hidden rounded-xl bg-product">
                                <img
                                  src={p.images[0]}
                                  alt=""
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/p:scale-[1.04]"
                                />
                              </span>
                              <span className="mt-3 block type-label text-ink-muted">{getBrandById(p.brandId)?.name}</span>
                              <span className="mt-1 block truncate text-sm font-medium text-ink">{p.name}</span>
                              <span className="mt-0.5 block text-sm tabular-nums">
                                {compareAt && compareAt > price && (
                                  <span className="mr-1.5 text-ink-muted line-through">{formatPrice(compareAt)}</span>
                                )}
                                <span className="text-sale">{formatPrice(price)}</span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Editorial promotion */}
              {promoCard && (
                <Link
                  to={promoCard.href}
                  onClick={onNavigate}
                  className="group/promo relative hidden w-[300px] shrink-0 overflow-hidden rounded-2xl bg-product xl:block xl:w-[340px]"
                >
                  <img
                    src={promoCard.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover/promo:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="block font-display text-[30px] font-normal leading-[1.08]">{promoCard.title}</span>
                    {promoCard.description && (
                      <span className="mt-2.5 block text-sm leading-relaxed text-white/85">{promoCard.description}</span>
                    )}
                    <span className="mt-5 inline-flex items-center gap-2 border-b border-white/60 pb-0.5 type-button text-white transition-colors group-hover/promo:border-white">
                      {promoCard.cta}
                      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-[250ms] group-hover/promo:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              )}
            </div>

            {/* Shop all */}
            {shopAll && (
              <div className="mt-10 border-t border-line-subtle pt-6">
                <Link to={shopAll.href} onClick={onNavigate} className="link-luxe group">
                  {shopAll.label}
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 transition-transform duration-[250ms] ease-out group-hover:translate-x-1"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            )}
          </Container>
        </motion.div>
      </AnimatePresence>
=======
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-x-0 top-full z-50 border-b border-line bg-white shadow-[0_16px_32px_-12px_rgba(36,35,38,0.08)]"
    >
      <Container className="py-8">
        <div className="flex gap-10">
          {/* Main columns grid */}
          <div
            className={`grid flex-1 gap-x-8 gap-y-6 ${
              columns.length <= 3
                ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {columns.map((col) => (
              <div key={col.heading} className="space-y-3">
                {col.headingHref ? (
                  <Link
                    to={col.headingHref}
                    onClick={onNavigate}
                    className="inline-block text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:text-brand"
                  >
                    {col.heading}
                  </Link>
                ) : (
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                    {col.heading}
                  </p>
                )}

                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        to={link.href}
                        onClick={onNavigate}
                        className="group inline-flex items-center gap-1.5 text-sm text-ink-2 transition-all hover:translate-x-0.5 hover:text-ink"
                      >
                        <span className="decoration-line group-hover:underline underline-offset-4">
                          {link.label}
                        </span>
                        {link.badge && (
                          <span className="rounded bg-brand-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Brands Grid (if present) */}
          {featuredBrands && featuredBrands.length > 0 && (
            <div className="hidden w-64 shrink-0 border-l border-line/70 pl-8 lg:block">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
                Authorized Brands
              </p>
              <div className="grid grid-cols-2 gap-2">
                {featuredBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/brand/${brand.slug}`}
                    onClick={onNavigate}
                    className="group flex flex-col items-center justify-center rounded-lg border border-line/60 bg-surface/40 p-2.5 text-center transition-all hover:border-brand/40 hover:bg-white hover:shadow-sm"
                  >
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-6 w-auto max-w-[80px] object-contain opacity-75 transition-opacity group-hover:opacity-100"
                      />
                    ) : (
                      <span className="text-xs font-medium text-ink group-hover:text-brand">
                        {brand.name}
                      </span>
                    )}
                    <span className="mt-1 text-[10px] text-ink-muted">
                      {brand.origin}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Promotional Card */}
          {promoCard && (
            <div className="hidden w-72 shrink-0 border-l border-line/70 pl-8 xl:block">
              <Link
                to={promoCard.href}
                onClick={onNavigate}
                className="group block overflow-hidden rounded-xl bg-surface transition-all hover:shadow-sm"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-product">
                  <img
                    src={promoCard.image}
                    alt={promoCard.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-brand">
                    {promoCard.title}
                  </p>
                  {promoCard.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-ink-2">
                      {promoCard.description}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-brand">
                    {promoCard.cta}{' '}
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Footer Link Strip */}
        {footerLink && (
          <div className="mt-6 border-t border-line/60 pt-4 text-right">
            <Link
              to={footerLink.href}
              onClick={onNavigate}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-2 transition-colors hover:text-brand"
            >
              <span>{footerLink.label}</span>
            </Link>
          </div>
        )}
      </Container>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
    </motion.div>
  );
}
