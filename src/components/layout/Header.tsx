import { useCallback, useEffect, useRef, useState } from 'react';
import type React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, HeartIcon, MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { siteConfig } from '../../data/site';
import type { NavigationItemConfig } from '../../config/navigationConfig';
import { AnnouncementBar } from './AnnouncementBar';
import { Container } from './Container';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { SearchOverlay } from './SearchOverlay';

/*
 * Three-level header (announcement · main bar · primary navigation), fixed to
 * the top. A spacer of the *expanded* height sits in the document flow, so the
 * compact sticky state never shifts page content.
 *
 *   Announcement  h-9  (36px)              → collapses to 0 when compact
 *   Main bar      h-16 (64px) / lg 76px    → 56px / lg 60px when compact
 *   Primary nav   lg only, h-12 (48px)     → always visible on desktop
 *   + 1px bottom border (and 1px nav top border on lg)
 */
const SPACER = 'h-[101px] lg:h-[162px]';

const COMPACT_AT = 120; // px scrolled before compacting
const EXPAND_AT = 40; // px — hysteresis so the header doesn't flicker
const OPEN_DELAY = 90; // ms hover intent before first open
const CLOSE_DELAY = 220; // ms grace period when leaving the header

const ICON = 'h-[21px] w-[21px]';
const STROKE = 1.35;

export function Header() {
  const { itemCount, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { customer } = useAuth();
  const { activeNavigationItems, getMegaMenu } = useNavigation();
  const location = useLocation();

  const [compact, setCompact] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLElement | null>>({});
  const openTimer = useRef<number>();
  const closeTimer = useRef<number>();
  const lastPointer = useRef<string>('mouse');

  /* ── Sticky compact state ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact((c) => (c ? y > EXPAND_AT : y > COMPACT_AT));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Mega menu open / close ──────────────────────────────────── */
  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const closeMenu = useCallback((returnFocus = false) => {
    clearTimers();
    setActiveId((current) => {
      if (returnFocus && current) triggerRefs.current[current]?.focus();
      return null;
    });
  }, []);

  // Close everything on route change
  useEffect(() => {
    closeMenu();
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search, closeMenu]);

  // Escape closes; click outside closes
  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu(true);
    };
    const onDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [activeId, closeMenu]);

  // '/' opens search
  useEffect(() => {
    const onSlash = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onSlash);
    return () => window.removeEventListener('keydown', onSlash);
  }, []);

  const hoverOpen = (item: NavigationItemConfig) => {
    clearTimers();
    if (item.megaMenuType === 'none') {
      // Moving onto a plain link closes any open panel (after a short grace period)
      closeTimer.current = window.setTimeout(() => setActiveId(null), 120);
      return;
    }
    if (activeId) setActiveId(item.id); // switching between menus is instant
    else openTimer.current = window.setTimeout(() => setActiveId(item.id), OPEN_DELAY);
  };

  const scheduleClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveId(null), CLOSE_DELAY);
  };

  const focusFirstPanelLink = (id: string) => {
    window.setTimeout(() => {
      document.querySelector<HTMLElement>(`#mega-menu-${id} a`)?.focus();
    }, 60);
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent, item: NavigationItemConfig) => {
    if (item.megaMenuType === 'none') return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveId(item.id);
      focusFirstPanelLink(item.id);
    }
  };

  // Touch: first tap opens the panel, second tap follows the link
  const onTriggerClick = (e: React.MouseEvent, item: NavigationItemConfig) => {
    if (item.megaMenuType === 'none') return;
    if (lastPointer.current !== 'mouse' && activeId !== item.id) {
      e.preventDefault();
      setActiveId(item.id);
    }
  };

  // Close when keyboard focus leaves the header entirely
  const onWrapperBlur = (e: React.FocusEvent) => {
    if (activeId && !wrapperRef.current?.contains(e.relatedTarget as Node)) closeMenu();
  };

  const activeItem = activeNavigationItems.find((i) => i.id === activeId);
  const activeMenu = activeItem ? getMegaMenu(activeItem.megaMenuType, activeItem.promoCard) : null;

  /* ── Styles ──────────────────────────────────────────────────── */
  const iconBtn =
    'relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand';

  const navText = (active: boolean, accent?: boolean) =>
    twMerge(
      'relative inline-flex h-12 items-center whitespace-nowrap text-[14px] font-medium tracking-[0.025em] transition-colors duration-200',
      'after:absolute after:bottom-3 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-[250ms] after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100',
      accent ? 'text-sale hover:text-sale-hover' : 'text-ink hover:text-brand',
      active && (accent ? 'after:scale-x-100' : 'text-brand after:scale-x-100')
    );

  return (
    <>
      {/* Reserves the expanded header height in the document flow */}
      <div aria-hidden="true" className={SPACER} />

      <div
        ref={wrapperRef}
        className="fixed inset-x-0 top-0 z-40"
        onMouseLeave={scheduleClose}
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onBlur={onWrapperBlur}
      >
        {/* ── Level 01 · Announcement bar (hidden when compact) ── */}
        <div
          className={twMerge('overflow-hidden transition-[height] duration-[250ms] ease-out', compact ? 'h-0' : 'h-9')}
          aria-hidden={compact || undefined}
        >
          <AnnouncementBar />
        </div>

        <header
          className={twMerge(
            'border-b border-line-subtle bg-ivory transition-[background-color,box-shadow] duration-[250ms]',
            compact && 'bg-ivory/95 shadow-[0_1px_0_rgba(36,40,32,0.04)] backdrop-blur-md'
          )}
        >
          {/* ── Level 02 · Main bar ── */}
          <Container
            className={twMerge(
              'grid grid-cols-[1fr_auto_1fr] items-center gap-4 transition-[height] duration-[250ms] ease-out',
              compact ? 'h-14 lg:h-[60px]' : 'h-16 lg:h-[76px]'
            )}
          >
            {/* Left: menu (mobile) + search */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className={twMerge(iconBtn, '-ml-3 lg:hidden')}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <MenuIcon className={ICON} strokeWidth={STROKE} />
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="group flex h-11 cursor-pointer items-center gap-2.5 rounded-full px-2 text-ink transition-colors duration-200 hover:text-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand lg:-ml-2"
                aria-label="Search products, brands and categories (press /)"
              >
                <SearchIcon className={ICON} strokeWidth={STROKE} />
                <span className="relative hidden text-[14px] font-medium tracking-[0.025em] text-ink-2 transition-colors group-hover:text-ink lg:inline">
                  Search
                </span>
              </button>
            </div>

            {/* Centre: logo */}
            <Link
              to="/"
              aria-label={`${siteConfig.name} home`}
              className={twMerge(
                'flex items-baseline justify-self-center px-4 font-display text-[26px] font-normal uppercase leading-none tracking-[0.16em] text-ink transition-transform duration-[250ms] ease-out hover:text-ink sm:text-[30px] lg:text-[36px]',
                compact && 'scale-[0.84]'
              )}
            >
              {siteConfig.name.split(' ')[0]}
              <span className="text-gold">.</span>
            </Link>

            {/* Right: account, wishlist, bag */}
            <div className="flex items-center justify-end gap-0.5">
              <Link
                to={customer ? '/account' : '/login'}
                className={iconBtn}
                aria-label={customer ? `My account (${customer.firstName})` : 'Sign in or create an account'}
                title={customer ? `Hi, ${customer.firstName}` : 'Account'}
              >
                <UserIcon className={ICON} strokeWidth={STROKE} />
              </Link>
              <Link
                to="/wishlist"
                className={twMerge(iconBtn, 'hidden md:flex')}
                aria-label={`Wishlist, ${wishCount} ${wishCount === 1 ? 'item' : 'items'}`}
                title="Wishlist"
              >
                <HeartIcon className={ICON} strokeWidth={STROKE} />
                {wishCount > 0 && <CountBadge value={wishCount} />}
              </Link>
              <button
                type="button"
                className={twMerge(iconBtn, '-mr-3')}
                onClick={openDrawer}
                aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
                title="Shopping bag"
              >
                <ShoppingBagIcon className={ICON} strokeWidth={STROKE} />
                {itemCount > 0 && <CountBadge value={itemCount} />}
              </button>
            </div>
          </Container>

          {/* ── Level 03 · Primary navigation (desktop) ── */}
          <nav aria-label="Primary" className="hidden border-t border-line-subtle lg:block">
            <Container>
              <ul className="flex h-12 items-center justify-center gap-x-8 xl:gap-x-11">
                {activeNavigationItems.map((item) => {
                  const hasMega = item.megaMenuType !== 'none';
                  const isOpen = activeId === item.id;
                  return (
                    <li key={item.id} className="relative flex items-center" onMouseEnter={() => hoverOpen(item)}>
                      <NavLink
                        ref={(el) => (triggerRefs.current[item.id] = el)}
                        to={item.href}
                        onClick={(e) => onTriggerClick(e, item)}
                        onKeyDown={(e) => onTriggerKeyDown(e, item)}
                        aria-haspopup={hasMega || undefined}
                        aria-expanded={hasMega ? isOpen : undefined}
                        aria-controls={hasMega ? `mega-menu-${item.id}` : undefined}
                        className={({ isActive }) => navText(isOpen || isActive, item.accent)}
                      >
                        {item.label}
                      </NavLink>
                      {hasMega && (
                        // Keyboard / screen-reader toggle (visually subtle; visible on focus)
                        <button
                          type="button"
                          onClick={() => {
                            if (isOpen) closeMenu();
                            else {
                              setActiveId(item.id);
                              focusFirstPanelLink(item.id);
                            }
                          }}
                          aria-label={`${isOpen ? 'Close' : 'Open'} ${item.label} menu`}
                          aria-expanded={isOpen}
                          aria-controls={`mega-menu-${item.id}`}
                          // Absolutely positioned so it never affects the even spacing of the nav
                          className="absolute left-full top-1/2 ml-0.5 flex h-6 w-4 -translate-y-1/2 items-center justify-center text-ink-muted opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                        >
                          <ChevronDownIcon className={twMerge('h-3 w-3 transition-transform duration-200', isOpen && 'rotate-180')} />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Container>
          </nav>
        </header>

        {/* ── Mega menu panel ── */}
        <div className="hidden lg:block">
          <AnimatePresence>
            {activeItem && activeMenu && (
              <MegaMenu
                key="mega"
                id={`mega-menu-${activeItem.id}`}
                menuKey={activeItem.id}
                label={activeItem.label}
                data={activeMenu}
                onNavigate={() => closeMenu()}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Dim the page while a mega menu is open (click to close) */}
      <AnimatePresence>
        {activeItem && activeMenu && (
          <div
            aria-hidden="true"
            className="fixed inset-0 z-30 hidden bg-ink/10 lg:block"
            onMouseEnter={scheduleClose}
            onClick={() => closeMenu()}
          />
        )}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} onSearch={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function CountBadge({ value }: { value: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute right-1 top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-medium leading-none text-white"
    >
      {value > 99 ? '99+' : value}
    </span>
  );
}
