import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminStore } from '../../services/adminStore';
import type { AdminRole } from '../../types/admin';

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('admin@nelum.lk');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    setLoading(false);

    if (!success) {
      setError('Invalid admin credentials. Please use an authorized staff account.');
    }
  };

  const handleQuickLogin = (role: AdminRole) => {
    const staff = adminStore.getStaff().find((s) => s.role === role) || adminStore.getStaff()[0];
    if (staff) {
      setEmail(staff.email);
      login(staff.email);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F8F8] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9F2438] text-white shadow-md font-serif font-black text-2xl mb-3">
            N
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-neutral-900">
            Nelum Beauty Admin
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            Enter your credentials to access the store management panel
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 text-sm focus:border-[#9F2438] focus:ring-1 focus:ring-[#9F2438] focus:outline-none"
                placeholder="name@nelum.lk"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 text-sm focus:border-[#9F2438] focus:ring-1 focus:ring-[#9F2438] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white font-medium text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick Demo Access Buttons */}
        <div className="mt-8 pt-6 border-t border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-neutral-700">Quick Demo Roles (1-Click)</span>
            <span className="text-[10px] text-[#9F2438] font-semibold">Instant Access</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('super_admin')}
              className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-left transition-colors"
            >
              <p className="font-semibold text-neutral-900">Super Admin</p>
              <p className="text-[10px] text-neutral-500">Full control</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('store_manager')}
              className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-left transition-colors"
            >
              <p className="font-semibold text-neutral-900">Store Manager</p>
              <p className="text-[10px] text-neutral-500">Inventory & orders</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('product_manager')}
              className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-left transition-colors"
            >
              <p className="font-semibold text-neutral-900">Product Manager</p>
              <p className="text-[10px] text-neutral-500">Catalogue CRUD</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('content_manager')}
              className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-left transition-colors"
            >
              <p className="font-semibold text-neutral-900">Content Manager</p>
              <p className="text-[10px] text-neutral-500">Homepage CMS</p>
            </button>
          </div>
        </div>

        {/* Back to Storefront */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← Return to Nelum Beauty Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

