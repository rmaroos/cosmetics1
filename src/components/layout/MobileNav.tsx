import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartIcon,
  MessageCircleIcon,
  PackageSearchIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';
import { Overlay } from '../ui/Overlay';
import { Accordion } from '../ui/Accordion';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { siteConfig } from '../../data/site';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
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

            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-2 text-sm text-ink hover:text-brand"
            >
              <MessageCircleIcon className="h-4 w-4 text-ink-muted" />
              <span>Need help? WhatsApp Us</span>
            </a>
          </div>
        </nav>

        {/* Bottom Drawer Footer */}
        <div className="border-t border-line bg-surface/50 p-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              openAdminModal();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-white py-2 text-xs font-medium text-ink-2 shadow-2xs hover:text-brand"
          >
            <SettingsIcon className="h-3.5 w-3.5" />
            <span>Admin: Manage Menu & Announcements</span>
          </button>
        </div>
      </div>
    </Overlay>
  );
}
