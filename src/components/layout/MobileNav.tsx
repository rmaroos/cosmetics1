import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MessageCircleIcon,
  PackageSearchIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  HelpCircleIcon,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Overlay } from '../ui/Overlay';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { featuredCollections } from '../../config/navigationConfig';
import { siteConfig } from '../../data/site';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
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
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={utility}
            >
              <MessageCircleIcon className="h-[18px] w-[18px] text-ink-2" strokeWidth={1.35} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              openAdminModal();
            }}
            className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-line text-xs font-medium text-ink-2"
          >
            <SettingsIcon className="h-3.5 w-3.5" aria-hidden="true" />
            Admin: manage menu & announcements
          </button>
        </div>
      </div>
    </Overlay>
  );
}
