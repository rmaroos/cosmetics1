import React from 'react';
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HeartIcon, LayoutGridIcon, LogOutIcon, MapPinIcon, MessageSquareIcon, PackageIcon, UserIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { Container } from '../layout/Container';
import { Skeleton } from '../ui/States';

const links = [
{ to: '/account', label: 'Overview', icon: LayoutGridIcon, end: true },
{ to: '/account/orders', label: 'Orders', icon: PackageIcon },
{ to: '/account/profile', label: 'Profile', icon: UserIcon },
{ to: '/account/addresses', label: 'Addresses', icon: MapPinIcon },
{ to: '/account/wishlist', label: 'Wishlist', icon: HeartIcon },
{ to: '/account/reviews', label: 'Reviews', icon: MessageSquareIcon }];


/** Protects every account route and provides account navigation. */
export function AccountLayout() {
  const { customer, ready, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!ready && !customer) {
    return (
      <Container className="py-16">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-6 h-64 w-full" />
      </Container>);

  }
  if (!customer) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;

  const signOut = () => {
    logout();
    toast('You’ve been signed out');
    navigate('/');
  };

  return (
    <Container className="py-8 md:py-12">
      <p className="text-sm text-ink-2">My account</p>
      <p className="font-display text-3xl text-ink md:text-4xl">Hello, {customer.firstName}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        <nav aria-label="Account">
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0.5 lg:px-0">
            {links.map((l) =>
            <li key={l.to} className="shrink-0">
                <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                twMerge(
                  'flex h-10 items-center gap-3 rounded-full border px-4 text-sm font-medium lg:h-11 lg:rounded-lg lg:border-0',
                  isActive ? 'border-ink bg-ink text-white lg:bg-brand-pale lg:text-ink' : 'border-line text-ink-2 hover:text-ink lg:hover:bg-surface'
                )
                }>
                
                  <l.icon className="hidden h-4 w-4 lg:block" aria-hidden="true" />
                  {l.label}
                </NavLink>
              </li>
            )}
            <li className="shrink-0 lg:mt-4 lg:border-t lg:border-line lg:pt-4">
              <button type="button" onClick={signOut} className="flex h-10 items-center gap-3 rounded-full border border-line px-4 text-sm font-medium text-ink-2 hover:text-error lg:h-11 lg:w-full lg:rounded-lg lg:border-0">
                <LogOutIcon className="hidden h-4 w-4 lg:block" aria-hidden="true" /> Sign out
              </button>
            </li>
          </ul>
        </nav>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </Container>);

}