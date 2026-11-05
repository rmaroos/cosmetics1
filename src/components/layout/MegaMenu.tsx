import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import type { MegaMenuData } from '../../config/navigationConfig';
import { Container } from './Container';

export interface MegaMenuProps {
  id: string;
  data: MegaMenuData;
  onNavigate: () => void;
}

export function MegaMenu({ id, data, onNavigate }: MegaMenuProps) {
  const { columns = [], featuredBrands, promoCard, footerLink } = data || {};

  return (
    <motion.div
      id={id}
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
    </motion.div>
  );
}
