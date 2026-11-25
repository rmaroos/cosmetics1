<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
  HeartIcon,
  MessageCircleIcon,
  PackageSearchIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
<<<<<<< HEAD
  HelpCircleIcon,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Overlay } from '../ui/Overlay';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { featuredCollections } from '../../config/navigationConfig';
=======
} from 'lucide-react';
import { Overlay } from '../ui/Overlay';
import { Accordion } from '../ui/Accordion';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useNavigation } from '../../contexts/NavigationContext';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
import { siteConfig } from '../../data/site';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
<<<<<<< HEAD
  /** Opens the global search overlay. */
  onSearch: () => void;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function MobileNav({ open, onClose, onSearch }: MobileNavProps) {
  const { customer } = useAuth();
  const { count: wishCount } = useWishlist();
  const { activeNavigationItems, getMegaMenu, openAdminModal } = useNavigation();
  const reduce = useReducedMotion();

  // null = top level; otherwise the id of the category being browsed
  const [panel, setPanel] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    if (!open) setPanel(null);
  }, [open]);

  const openPanel = (id: string) => {
    setDirection(1);
    setPanel(id);
  };
  const back = () => {
    setDirection(-1);
    setPanel(null);
  };

  const item = activeNavigationItems.find((i) => i.id === panel);
  const menu = item ? getMegaMenu(item.megaMenuType, item.promoCard) : null;

  const slide = {
    initial: (d: number) => ({ x: reduce ? 0 : d * 40, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: reduce ? 0 : d * -40, opacity: 0 }),
  };

  const row =
    'flex min-h-[52px] w-full items-center justify-between gap-3 border-b border-line/70 text-left text-[17px] text-ink transition-colors active:bg-surface';
  const utility = 'flex min-h-[48px] items-center gap-3.5 text-[15px] text-ink transition-colors active:text-brand';

  return (
    <Overlay open={open} onClose={onClose} title="Menu" side="left" className="max-w-[400px] bg-ivory">
      <div className="relative flex min-h-full flex-col overflow-x-hidden">
        {/* Search */}
        <div className="px-5 pt-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSearch();
            }}
            className="flex h-12 w-full items-center gap-3 rounded-full border border-line bg-white px-5 text-left text-[15px] text-ink-muted"
          >
            <SearchIcon className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.35} aria-hidden="true" />
            Search products, brands…
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {!panel || !item || !menu ? (
            /* ── Level 1 · departments ── */
            <motion.nav
              key="root"
              aria-label="Mobile"
              custom={direction}
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: EASE }}
              className="px-5 pt-4"
            >
              <ul>
                {activeNavigationItems.map((nav) => {
                  const hasMenu = nav.megaMenuType !== 'none';
                  const tone = nav.accent ? 'text-sale' : '';
                  return (
                    <li key={nav.id}>
                      {hasMenu ? (
                        <button type="button" className={twMerge(row, tone)} onClick={() => openPanel(nav.id)} aria-label={`${nav.label} — view categories`}>
                          {nav.label}
                          <ChevronRightIcon className="h-[18px] w-[18px] text-ink-muted" strokeWidth={1.35} aria-hidden="true" />
                        </button>
                      ) : (
                        <Link to={nav.href} onClick={onClose} className={twMerge(row, tone)}>
                          {nav.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Featured collections */}
              <p className="mt-8 type-label text-gold-text">Featured</p>
              <ul className="mt-4 grid grid-cols-3 gap-3">
                {featuredCollections.map((c) => (
                  <li key={c.href}>
                    <Link to={c.href} onClick={onClose} className="block">
                      <span className="block aspect-[4/5] overflow-hidden rounded-xl bg-product">
                        <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </span>
                      <span className="mt-2 block text-[13px] font-medium text-ink">{c.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : (
            /* ── Level 2 · categories within a department ── */
            <motion.nav
              key={panel}
              aria-label={item.label}
              custom={direction}
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: EASE }}
              className="px-5 pt-3"
            >
              <button
                type="button"
                onClick={back}
                className="-ml-1 flex min-h-[48px] items-center gap-2 text-[14px] font-medium text-ink-2 active:text-ink"
              >
                <ArrowLeftIcon className="h-[18px] w-[18px]" strokeWidth={1.35} aria-hidden="true" />
                All categories
              </button>

              <p className="mt-1 font-display text-[34px] font-normal leading-tight text-ink">{item.label}</p>

              {menu.shopAll && (
                <Link to={menu.shopAll.href} onClick={onClose} className="mt-3 inline-flex min-h-[44px] items-center link-luxe">
                  {menu.shopAll.label}
                </Link>
              )}

              {menu.columns.map((col) => (
                <section key={col.heading} className="mt-7">
                  <h3 className="type-label text-gold-text">{col.heading}</h3>
                  <ul className="mt-2">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link to={l.href} onClick={onClose} className={twMerge(row, 'text-[16px]')}>
                          {l.label}
                          <ChevronRightIcon className="h-4 w-4 text-ink-muted/70" strokeWidth={1.35} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              {menu.promoCard && (
                <Link to={menu.promoCard.href} onClick={onClose} className="relative mt-8 block overflow-hidden rounded-2xl bg-product">
                  <img src={menu.promoCard.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="block font-display text-[24px] leading-tight">{menu.promoCard.title}</span>
                    <span className="mt-1 block type-label text-white/85">{menu.promoCard.cta}</span>
                  </span>
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Account & support */}
        <div className="mt-auto px-5 pb-6 pt-8">
          <div className="border-t border-line pt-3">
            <Link to={customer ? '/account' : '/login'} onClick={onClose} className={utility}>
              <UserIcon className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.35} aria-hidden="true" />
              {customer ? `My account (${customer.firstName})` : 'Sign in / Create account'}
            </Link>
            <Link to="/wishlist" onClick={onClose} className={`${utility} justify-between`}>
              <span className="flex items-center gap-3.5">
                <HeartIcon className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.35} aria-hidden="true" />
                Wishlist
              </span>
              {wishCount > 0 && (
                <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-medium text-white">{wishCount}</span>
              )}
            </Link>
            <Link to="/track-order" onClick={onClose} className={utility}>
              <PackageSearchIcon className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.35} aria-hidden="true" />
              Track an order
            </Link>
            <Link to="/contact" onClick={onClose} className={utility}>
              <HelpCircleIcon className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.35} aria-hidden="true" />
              Help & contact
            </Link>
=======
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { customer } = useAuth();
  const { count: wishCount } = useWishlist();
  const { activeNavigationItems, getMegaMenu, openAdminModal } = useNavigation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    onClose();
    setSearchQuery('');
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const linkClass =
    'block py-2 text-sm text-ink-2 transition-colors hover:text-ink';

  return (
    <Overlay open={open} onClose={onClose} title="Navigation Menu" side="left">
      <div className="flex h-full flex-col justify-between overflow-y-auto">
        <nav aria-label="Mobile Navigation" className="px-5 pb-6 pt-2">
          {/* Quick Mobile Search Form */}
          <form onSubmit={handleSearchSubmit} className="mb-5">
            <div className="relative flex items-center">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, routines..."
                className="h-10 w-full rounded-full border border-line bg-surface pl-9 pr-4 text-xs text-ink placeholder:text-ink-muted focus:border-brand focus:bg-white focus:outline-none"
              />
              <SearchIcon className="absolute left-3 h-4 w-4 text-ink-muted" aria-hidden="true" />
            </div>
          </form>

          {/* Configurable Menu Items */}
          <div className="divide-y divide-line/60">
            {activeNavigationItems.map((item) => {
              const megaData =
                item.megaMenuType !== 'none' ? getMegaMenu(item.megaMenuType) : null;

              // If item has a mega-menu / dropdown columns, render as expandable Accordion
              if (megaData && megaData.columns.length > 0) {
                return (
                  <Accordion
                    key={item.id}
                    title={
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink">{item.label}</span>
                        {item.badge && (
                          <span className="rounded bg-brand-soft px-1.5 py-0.5 text-[9px] font-bold text-brand uppercase">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    }
                    className="border-none py-1"
                  >
                    <div className="space-y-3 pb-3 pl-3 pt-1">
                      {/* Parent Link */}
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="inline-block text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
                      >
                        All {item.label} →
                      </Link>

                      {/* Sub-groups */}
                      {megaData.columns.map((col) => (
                        <div key={col.heading} className="space-y-1">
                          {col.headingHref ? (
                            <Link
                              to={col.headingHref}
                              onClick={onClose}
                              className="text-xs font-semibold text-ink hover:text-brand"
                            >
                              {col.heading}
                            </Link>
                          ) : (
                            <p className="text-xs font-semibold text-ink">
                              {col.heading}
                            </p>
                          )}
                          <ul className="space-y-0.5 pl-2">
                            {col.links.map((sub) => (
                              <li key={sub.href + sub.label}>
                                <Link
                                  to={sub.href}
                                  onClick={onClose}
                                  className={linkClass}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Accordion>
                );
              }

              // Simple Direct Link (e.g. New In, Best Sellers, Offers)
              return (
                <div key={item.id} className="py-2.5">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between text-sm font-medium text-ink transition-colors hover:text-brand"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold text-brand uppercase">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Account & Utilities Section */}
          <div className="mt-6 space-y-1 border-t border-line pt-4">
            <Link
              to={customer ? '/account' : '/login'}
              onClick={onClose}
              className="flex items-center gap-3 py-2 text-sm text-ink hover:text-brand"
            >
              <UserIcon className="h-4 w-4 text-ink-muted" />
              <span>{customer ? `My Account (${customer.firstName})` : 'Sign in / Create Account'}</span>
            </Link>

            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-sm text-ink hover:text-brand"
            >
              <div className="flex items-center gap-3">
                <HeartIcon className="h-4 w-4 text-ink-muted" />
                <span>Wishlist</span>
              </div>
              {wishCount > 0 && (
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                  {wishCount}
                </span>
              )}
            </Link>

            <Link
              to="/track-order"
              onClick={onClose}
              className="flex items-center gap-3 py-2 text-sm text-ink hover:text-brand"
            >
              <PackageSearchIcon className="h-4 w-4 text-ink-muted" />
              <span>Track an Order</span>
            </Link>

>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className={utility}
            >
              <MessageCircleIcon className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.35} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

=======
              className="flex items-center gap-3 py-2 text-sm text-ink hover:text-brand"
            >
              <MessageCircleIcon className="h-4 w-4 text-ink-muted" />
              <span>Need help? WhatsApp Us</span>
            </a>
          </div>
        </nav>

        {/* Bottom Drawer Footer */}
        <div className="border-t border-line bg-surface/50 p-4">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          <button
            type="button"
            onClick={() => {
              onClose();
              openAdminModal();
            }}
<<<<<<< HEAD
            className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-line text-xs font-medium text-ink-2"
          >
            <SettingsIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Admin: manage menu & announcements
=======
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white py-2 text-xs font-medium text-ink-2 shadow-2xs hover:text-brand"
          >
            <SettingsIcon className="h-3.5 w-3.5" />
            <span>Admin: Manage Menu & Announcements</span>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          </button>
        </div>
      </div>
    </Overlay>
  );
}
