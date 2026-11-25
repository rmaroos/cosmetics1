import React, { useState } from 'react';
import { Plus, Tag, Edit, Trash2, Calendar, CheckCircle, XCircle, X } from 'lucide-react';
import { adminStore } from '../services/adminStore';
import type { CouponDiscount } from '../types/admin';
import { formatLKR } from '../utils/pricing';
import { useAdminAuth } from '../contexts/AdminAuthContext';

export function AdminPromotions() {
  const { user } = useAdminAuth();
  const [coupons, setCoupons] = useState<CouponDiscount[]>(() => adminStore.getCoupons());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponDiscount | null>(null);

  // Form State
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(10);
  const [minSpend, setMinSpend] = useState<number>(3000);
  const [maxDiscount, setMaxDiscount] = useState<number>(1500);
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [usageLimit, setUsageLimit] = useState<number>(500);
  const [active, setActive] = useState(true);

  const refreshCoupons = () => {
    setCoupons(adminStore.getCoupons());
  };

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setCode('');
    setTitle('');
    setDescription('');
    setDiscountType('percentage');
    setDiscountValue(10);
    setMinSpend(3000);
    setMaxDiscount(1500);
    setStartDate(new Date().toISOString().slice(0, 10));
    setEndDate('2026-12-31');
    setUsageLimit(500);
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: CouponDiscount) => {
    setEditingCoupon(c);
    setCode(c.code);
    setTitle(c.title);
    setDescription(c.description || '');
    setDiscountType(c.discountType);
    setDiscountValue(c.discountValue);
    setMinSpend(c.minSpend || 0);
    setMaxDiscount(c.maxDiscount || 0);
    setStartDate(c.startDate);
    setEndDate(c.endDate);
    setUsageLimit(c.usageLimit || 0);
    setActive(c.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    if (editingCoupon) {
      adminStore.updateCoupon(
        editingCoupon.id,
        {
          code,
          title,
          description,
          discountType,
          discountValue: Number(discountValue),
          minSpend: minSpend ? Number(minSpend) : undefined,
          maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
          startDate,
          endDate,
          usageLimit: usageLimit ? Number(usageLimit) : undefined,
          active,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    } else {
      adminStore.createCoupon(
        {
          code,
          title,
          description,
          discountType,
          discountValue: Number(discountValue),
          minSpend: minSpend ? Number(minSpend) : undefined,
          maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
          startDate,
          endDate,
          usageLimit: usageLimit ? Number(usageLimit) : undefined,
          active,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    }

    refreshCoupons();
    setIsModalOpen(false);
  };

  const handleDelete = (c: CouponDiscount) => {
    if (window.confirm(`Permanently delete coupon "${c.code}"?`)) {
      adminStore.deleteCoupon(c.id, user ? { name: user.name, email: user.email } : undefined);
      refreshCoupons();
    }
  };

  const handleToggleActive = (c: CouponDiscount) => {
    adminStore.updateCoupon(c.id, { active: !c.active }, user ? { name: user.name, email: user.email } : undefined);
    refreshCoupons();
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Promotions &amp; Coupon Codes
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Configure promotional voucher codes, minimum spend rules, discount caps, and campaign schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* ─── Coupons Cards Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-[#9F2438]/10 text-[#9F2438] flex items-center justify-center font-bold">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-sm text-neutral-900 tracking-wider">
                      {coupon.code}
                    </h3>
                    <p className="text-xs text-neutral-500">{coupon.title}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleActive(coupon)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    coupon.active ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {coupon.active ? 'Active' : 'Inactive'}
                </button>
              </div>

              {/* Value Badge */}
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 my-3">
                <p className="text-lg font-bold font-serif text-[#9F2438]">
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}% OFF`
                    : `${formatLKR(coupon.discountValue)} FLAT OFF`}
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {coupon.minSpend ? `Min order ${formatLKR(coupon.minSpend)}` : 'No minimum spend'}
                  {coupon.maxDiscount ? ` • Max cap ${formatLKR(coupon.maxDiscount)}` : ''}
                </p>
              </div>

              <div className="space-y-1 text-xs text-neutral-600">
                <p className="flex items-center gap-1.5 text-neutral-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    Valid: {coupon.startDate} to {coupon.endDate}
                  </span>
                </p>
                <p className="text-neutral-500">
                  Redeemed: <strong className="text-neutral-900">{coupon.timesUsed}</strong> /{' '}
                  {coupon.usageLimit ? `${coupon.usageLimit} uses` : 'Unlimited'}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-neutral-400">
                Checkout Promo
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(coupon)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Edit coupon"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(coupon)}
                  className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete coupon"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Add / Edit Modal ─────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-lg overflow-hidden animate-in fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="text-base font-bold font-serif text-neutral-900">
                {editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Create Promotion Coupon'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-mono font-bold uppercase"
                    placeholder="e.g. GLOW20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Discount Type *
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  >
                    <option value="percentage">Percentage (%) Off</option>
                    <option value="fixed">Fixed LKR (Rs.) Off</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="e.g. Summer Skincare Flash Sale"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Value ({discountType === 'percentage' ? '%' : 'Rs.'}) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Min Spend (LKR)
                  </label>
                  <input
                    type="number"
                    value={minSpend}
                    onChange={(e) => setMinSpend(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Max Cap (LKR)
                  </label>
                  <input
                    type="number"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                />
                <span className="text-xs font-semibold">Active &amp; Redeemable at Storefront Checkout</span>
              </label>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-md"
                >
                  Save Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



