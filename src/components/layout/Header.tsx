import { useCallback, useEffect, useRef, useState } from 'react';
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
import { twMerge } from 'tailwind-merge';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { siteConfig } from '../../data/site';
import { Container } from './Container';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { SearchOverlay } from './SearchOverlay';
import type { NavigationItemConfig } from '../../config/navigationConfig';

export function Header() {
  const { itemCount, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { customer } = useAuth();
  const { activeNavigationItems, getMegaMenu } = useNavigation();
  const location = useLocation();

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
        e.preventDefault();
        setSearchOpen(true);
      }
    };
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
  );
}
