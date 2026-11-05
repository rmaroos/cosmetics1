import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Award,
  Boxes,
  ShoppingCart,
  Users,
  Star,
  Tag,
  Globe,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminStore } from '../../services/adminStore';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  badge?: number;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export function AdminSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const isSubpath = location.pathname.startsWith('/admin');
  const prefix = isSubpath ? '/admin' : '';

  // Dynamic badge counts
  const pendingOrdersCount = adminStore.getOrders().filter((o) => o.status === 'placed').length;
  const pendingReviewsCount = adminStore.getReviews().filter((r) => r.status === 'pending').length;
  const lowStockCount = adminStore.getProducts().filter((p) => p.variants.some((v) => v.stock <= 5)).length;

  const navGroups: NavGroup[] = [
    {
      group: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: prefix || '/', icon: LayoutDashboard, exact: true },
      ],
    },
    {
      group: 'CATALOGUE & COMMERCE',
      items: [
        { name: 'Products', path: `${prefix}/products`, icon: Package },
        { name: 'Categories', path: `${prefix}/categories`, icon: FolderTree },
        { name: 'Brands', path: `${prefix}/brands`, icon: Award },
        {
          name: 'Inventory',
          path: `${prefix}/inventory`,
          icon: Boxes,
          badge: lowStockCount > 0 ? lowStockCount : undefined,
          badgeColor: 'bg-amber-100 text-amber-800',
        },
        {
          name: 'Orders',
          path: `${prefix}/orders`,
          icon: ShoppingCart,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined,
          badgeColor: 'bg-[#9F2438]/10 text-[#9F2438]',
        },
        { name: 'Customers', path: `${prefix}/customers`, icon: Users },
        {
          name: 'Reviews',
          path: `${prefix}/reviews`,
          icon: Star,
          badge: pendingReviewsCount > 0 ? pendingReviewsCount : undefined,
          badgeColor: 'bg-rose-100 text-rose-800',
        },
      ],
    },
    {
      group: 'MARKETING & CONTENT',
      items: [
        { name: 'Promotions', path: `${prefix}/promotions`, icon: Tag },
        { name: 'Website CMS', path: `${prefix}/cms`, icon: Globe },
        { name: 'Blog & Journal', path: `${prefix}/journal`, icon: BookOpen },
      ],
    },
    {
      group: 'ADMINISTRATION',
      items: [
        { name: 'Reports & Analytics', path: `${prefix}/reports`, icon: BarChart3 },
        { name: 'Staff & Roles', path: `${prefix}/staff`, icon: ShieldCheck },
        { name: 'Settings', path: `${prefix}/settings`, icon: Settings },
      ],
    },
  ];

  const roleNameMap: Record<string, string> = {
    super_admin: 'Super Admin',
    store_manager: 'Store Manager',
    product_manager: 'Product Manager',
    order_manager: 'Order Manager',
    content_manager: 'Content Manager',
    marketing_manager: 'Marketing Manager',
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-neutral-200/80">
          <Link
            to="/admin"
            className="flex items-center gap-3 overflow-hidden text-neutral-900 focus-visible:outline-none"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9F2438] text-white shadow-xs font-serif font-black text-xl">
              N
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-neutral-900 leading-none">
                  NELUM
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-[#9F2438] uppercase mt-0.5">
                  Admin Panel
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => onCloseMobile()}
                    title={collapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#9F2438] text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/80'
                      } ${collapsed ? 'justify-center' : ''}`
                    }
                  >
                    <Icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" />
                    {!collapsed && (
                      <span className="flex-1 truncate tracking-tight">{item.name}</span>
                    )}
                    {!collapsed && item.badge !== undefined && (
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Footer & Quick Links */}
        <div className="border-t border-neutral-200/80 p-3 bg-neutral-50/50 space-y-2">
          {/* Quick Storefront Link */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Open customer storefront in new tab"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <ExternalLink className="h-4 w-4 shrink-0 text-neutral-400" />
            {!collapsed && <span>View Storefront</span>}
          </Link>

          {/* Current Staff Profile */}
          <div
            className={`flex items-center gap-3 p-2 rounded-xl bg-white border border-neutral-200/70 shadow-2xs ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="h-8 w-8 shrink-0 rounded-full bg-[#9F2438]/10 text-[#9F2438] flex items-center justify-center font-bold text-xs uppercase">
              {user?.name ? user.name.slice(0, 2) : 'AD'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[11px] text-neutral-500 truncate">
                  {roleNameMap[user?.role || 'super_admin']}
                </p>
              </div>
            )}
            {!collapsed && (
              <button
                type="button"
                onClick={logout}
                title="Log out"
                className="text-neutral-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

