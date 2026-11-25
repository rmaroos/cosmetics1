import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import type { MegaMenuData } from '../../config/navigationConfig';
import { getBrandById, getDisplayPrice } from '../../utils/catalog';
import { formatPrice } from '../../utils/format';
import { Container } from './Container';

export interface MegaMenuProps {
  id: string;
  /** Changes when the customer moves to another menu — content cross-fades. */
  menuKey: string;
  label: string;
  data: MegaMenuData;
  onNavigate: () => void;
}

const EASE = [0.23, 1, 0.32, 1] as const;

const linkClass =
  'group/link relative inline-block py-1 text-[15px] leading-snug text-ink-2 transition-colors duration-200 hover:text-ink focus-visible:text-ink focus-visible:outline-none';
const underline =
  'absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[250ms] ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100';

export function MegaMenu({ id, menuKey, label, data, onNavigate }: MegaMenuProps) {
  const reduce = useReducedMotion();
  const { columns = [], shopAll, promoCard, spotlight } = data;

  return (
    <motion.div
      id={id}
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
    </motion.div>
  );
}
