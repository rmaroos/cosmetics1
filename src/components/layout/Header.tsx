import { useCallback, useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import type React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, HeartIcon, MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon } from 'lucide-react';
=======
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  ChevronDownIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from 'lucide-react';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
import { twMerge } from 'tailwind-merge';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { siteConfig } from '../../data/site';
<<<<<<< HEAD
import type { NavigationItemConfig } from '../../config/navigationConfig';
import { AnnouncementBar } from './AnnouncementBar';
=======
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
import { Container } from './Container';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { SearchOverlay } from './SearchOverlay';
<<<<<<< HEAD

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
=======
import type { NavigationItemConfig } from '../../config/navigationConfig';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9

export function Header() {
  const { itemCount, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { customer } = useAuth();
  const { activeNavigationItems, getMegaMenu } = useNavigation();
  const location = useLocation();

<<<<<<< HEAD
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
=======
  // Scroll detection for sticky header elevation & background
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeTimer = useRef<number>();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMegaMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setActiveMenuId(null);
  }, []);

  // Close menus on route change
  useEffect(() => {
    closeMegaMenu();
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search, closeMegaMenu]);

  // Pressing '/' opens global search overlay
  useEffect(() => {
    const handleSlash = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
        e.preventDefault();
        setSearchOpen(true);
      }
    };
<<<<<<< HEAD
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
=======
    window.addEventListener('keydown', handleSlash);
    return () => window.removeEventListener('keydown', handleSlash);
  }, []);

  // Close on Escape or click outside
  useEffect(() => {
    if (!activeMenuId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMegaMenu();
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMegaMenu();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [activeMenuId, closeMegaMenu]);

  const handleMouseEnter = (itemId: string, item: NavigationItemConfig) => {
    if (item.megaMenuType === 'none') {
      closeMegaMenu();
      return;
    }
    window.clearTimeout(closeTimer.current);
    setActiveMenuId(itemId);
  };

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => {
      setActiveMenuId(null);
    }, 150);
  };

  const activeItemConfig = activeNavigationItems.find((i) => i.id === activeMenuId);
  const activeMegaMenuData = activeItemConfig
    ? getMegaMenu(activeItemConfig.megaMenuType, activeItemConfig.promoCard)
    : null;

  const iconBtn =
    'relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand';

  const navLinkClass =
    'inline-flex h-16 items-center gap-1 px-3 text-[13px] font-medium tracking-wide text-ink transition-colors hover:text-brand';

  return (
    <header
      ref={headerRef}
      className={twMerge(
        'sticky top-0 z-40 w-full border-b border-line transition-all duration-300',
        isScrolled
          ? 'bg-white/95 shadow-[0_2px_12px_rgba(36,35,38,0.06)] backdrop-blur-md'
          : 'bg-white'
      )}
      onMouseLeave={handleMouseLeave}
    >
      <Container className="flex h-18 items-center justify-between gap-4">
        {/* ─── 1. Brand Logo (Left) & Mobile Toggle ───────────────────────── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={twMerge(iconBtn, '-ml-2 lg:hidden')}
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <Link
            to="/"
            className="flex items-center font-display text-[26px] font-medium tracking-tight text-ink transition-colors hover:text-brand sm:text-[28px]"
            aria-label={`${siteConfig.name} home`}
          >
            {siteConfig.name.split(' ')[0]}
            <span className="font-serif text-brand">.</span>
          </Link>
        </div>

        {/* ─── 2. Main Navigation Links (Center) ───────────────────────────── */}
        <nav
          aria-label="Main Storefront Navigation"
          className="hidden flex-1 items-center justify-center lg:flex"
        >
          <ul className="flex items-center gap-1 xl:gap-2">
            {activeNavigationItems.map((item) => {
              const hasMega = item.megaMenuType !== 'none';
              const isOpen = activeMenuId === item.id;

              if (hasMega) {
                return (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.id, item)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveMenuId((prev) => (prev === item.id ? null : item.id))}
                      className={twMerge(
                        navLinkClass,
                        isOpen && 'text-brand'
                      )}
                      aria-expanded={isOpen}
                      aria-controls={`mega-menu-${item.id}`}
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon
                        className={twMerge(
                          'h-3.5 w-3.5 transition-transform duration-200 ease-out text-ink-muted',
                          isOpen && 'rotate-180 text-brand'
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.id} onMouseEnter={closeMegaMenu}>
                  <RouterNavLink
                    to={item.href}
                    className={({ isActive }) =>
                      twMerge(
                        navLinkClass,
                        isActive && 'font-semibold text-brand'
                      )
                    }
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded bg-brand-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
                        {item.badge}
                      </span>
                    )}
                  </RouterNavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ─── 3. Action Shortcuts (Right) ─────────────────────────────────── */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Global Search Button */}
          <button
            type="button"
            className={iconBtn}
            onClick={() => setSearchOpen(true)}
            aria-label="Search products, brands and routines (Press /)"
            title="Search (Press /)"
          >
            <SearchIcon className="h-5 w-5" />
          </button>

          {/* Account Shortcut */}
          <Link
            to={customer ? '/account' : '/login'}
            className={iconBtn}
            aria-label={customer ? `My Account (${customer.firstName})` : 'Sign in or register'}
            title={customer ? `Hi, ${customer.firstName}` : 'My Account'}
          >
            <UserIcon className="h-5 w-5" />
          </Link>

          {/* Wishlist Shortcut */}
          <Link
            to="/wishlist"
            className={iconBtn}
            aria-label={`Wishlist, ${wishCount} items saved`}
            title="Wishlist"
          >
            <HeartIcon className="h-5 w-5" />
            {wishCount > 0 && (
              <span
                className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white shadow-2xs"
                aria-hidden="true"
              >
                {wishCount}
              </span>
            )}
          </Link>

          {/* Shopping Bag / Cart Shortcut */}
          <button
            type="button"
            className={twMerge(iconBtn, '-mr-1')}
            onClick={openDrawer}
            aria-label={`Shopping bag, ${itemCount} items`}
            title="Shopping Bag"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {itemCount > 0 && (
              <span
                className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white shadow-2xs"
                aria-hidden="true"
              >
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>
        </div>
      </Container>

      {/* ─── 4. Mega-Menu Dropdown Panel ──────────────────────────────────── */}
      <div
        className="hidden lg:block"
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
      >
        <AnimatePresence>
          {activeItemConfig && activeMegaMenuData && (
            <MegaMenu
              id={`mega-menu-${activeItemConfig.id}`}
              data={activeMegaMenuData}
              onNavigate={closeMegaMenu}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ─── 5. Mobile Drawer & Search Overlays ─────────────────────────────── */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
  );
}
