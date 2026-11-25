import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  ExternalLink,
  ShieldAlert,
  Package,
  ShoppingCart,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminStore } from '../../services/adminStore';
import type { AdminRole } from '../../types/admin';

interface AdminHeaderProps {
  onOpenMobile: () => void;
}

export function AdminHeader({ onOpenMobile }: AdminHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, switchRole, logout } = useAdminAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isSubpath = location.pathname.startsWith('/admin');
  const prefix = isSubpath ? '/admin' : '';

  // Derive breadcrumb from pathname
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const relevantSegment = isSubpath
    ? (pathSegments.length > 1 ? pathSegments[1] : '')
    : (pathSegments.length > 0 ? pathSegments[0] : '');
  const currentTitle = relevantSegment
    ? relevantSegment.charAt(0).toUpperCase() + relevantSegment.slice(1).replace('-', ' ')
    : 'Dashboard';

  const roles: { role: AdminRole; label: string; desc: string }[] = [
    { role: 'super_admin', label: 'Super Admin', desc: 'Full system access & settings' },
    { role: 'store_manager', label: 'Store Manager', desc: 'Products, orders, inventory & reports' },
    { role: 'product_manager', label: 'Product Manager', desc: 'Products, categories & brands' },
    { role: 'order_manager', label: 'Order Manager', desc: 'Orders, customers & fulfillment' },
    { role: 'content_manager', label: 'Content Manager', desc: 'Homepage CMS, banners & journal' },
    { role: 'marketing_manager', label: 'Marketing Manager', desc: 'Promotions & discounts' },
  ];

  // Dynamic alerts for notifications
  const lowStockProducts = adminStore.getProducts().filter((p) => p.variants.some((v) => v.stock <= 5));
  const pendingOrders = adminStore.getOrders().filter((o) => o.status === 'placed');
  const recentLogs = adminStore.getAuditLogs().slice(0, 3);

  const totalAlerts = lowStockProducts.length + pendingOrders.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${prefix}/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-neutral-200 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open mobile navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm">
          <Link to={prefix || '/'} className="text-neutral-500 hover:text-neutral-900 font-medium">
            Admin
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="font-semibold text-neutral-900">{currentTitle}</span>
        </nav>
      </div>

      {/* Center: Global Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:flex relative w-full max-w-xs xl:max-w-md mx-4"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, orders, SKU, customers..."
          className="w-full h-9 rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-4 text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-[#9F2438] focus:outline-none focus:ring-1 focus:ring-[#9F2438] transition-all"
        />
      </form>

      {/* Right: Actions, RBAC Role Switcher & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill (Interactive RBAC Demonstration) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowNotifications(false);
            }}
            title="Switch administrative role to test permissions"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-[#9F2438]" />
            <span className="hidden sm:inline">Role:</span>
            <span className="text-[#9F2438] capitalize">
              {role.replace('_', ' ')}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
          </button>

          {/* Role Switcher Dropdown */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white p-2 shadow-xl border border-neutral-200 z-50">
              <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                <p className="text-xs font-bold text-neutral-900">Switch Role (RBAC)</p>
                <p className="text-[11px] text-neutral-500">Test access permissions across modules</p>
              </div>
              <div className="space-y-1">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => {
                      switchRole(r.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col ${
                      role === r.role
                        ? 'bg-[#9F2438]/10 text-[#9F2438] font-semibold'
                        : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <span className="font-medium">{r.label}</span>
                    <span className="text-[10px] text-neutral-400">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowRoleMenu(false);
            }}
            aria-label="View notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {totalAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9F2438] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9F2438]" />
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white p-3 shadow-xl border border-neutral-200 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-2">
                <h4 className="text-xs font-bold text-neutral-900">Store Notifications</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9F2438]/10 text-[#9F2438] font-semibold">
                  {totalAlerts} Actionable
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {pendingOrders.length > 0 && (
                  <Link
                    to="/admin/orders"
                    onClick={() => setShowNotifications(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg bg-rose-50/60 hover:bg-rose-50 text-xs text-neutral-800 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4 text-[#9F2438] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{pendingOrders.length} Pending Orders</p>
                      <p className="text-[11px] text-neutral-500">Require fulfillment or confirmation</p>
                    </div>
                  </Link>
                )}

                {lowStockProducts.length > 0 && (
                  <Link
                    to="/admin/inventory"
                    onClick={() => setShowNotifications(false)}
                    className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50/60 hover:bg-amber-50 text-xs text-neutral-800 transition-colors"
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{lowStockProducts.length} Low Stock Products</p>
                      <p className="text-[11px] text-neutral-500">Stock count is below 5 units</p>
                    </div>
                  </Link>
                )}

                {recentLogs.map((log) => (
                  <div key={log.id} className="p-2 rounded-lg bg-neutral-50 text-[11px] text-neutral-600">
                    <p className="font-medium text-neutral-900">{log.action}</p>
                    <p className="truncate text-neutral-500">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Storefront Link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition-colors"
        >
          <span>Storefront</span>
          <ExternalLink className="h-3 w-3 text-neutral-400" />
        </Link>
      </div>
    </header>
  );
}

