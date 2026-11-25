import React, { useState, useMemo } from 'react';
import {
  Star,
  Check,
  X,
  Trash2,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { SubmittedReview } from '../../types/commerce';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export function AdminReviews() {
  const { user } = useAdminAuth();
  const [reviews, setReviews] = useState<SubmittedReview[]>(() => adminStore.getReviews());
  const products = adminStore.getProducts();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [search, setSearch] = useState('');

  const refreshReviews = () => {
    setReviews(adminStore.getReviews());
  };

  const handleUpdateStatus = (id: string, status: SubmittedReview['status']) => {
    adminStore.updateReviewStatus(id, status, user ? { name: user.name, email: user.email } : undefined);
    refreshReviews();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer review?')) {
      adminStore.deleteReview(id, user ? { name: user.name, email: user.email } : undefined);
      refreshReviews();
    }
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
      const prod = products.find((p) => p.id === r.productId);
      const matchesSearch =
        !search ||
        r.author.toLowerCase().includes(search.toLowerCase()) ||
        r.body.toLowerCase().includes(search.toLowerCase()) ||
        (prod && prod.name.toLowerCase().includes(search.toLowerCase()));

      return matchesStatus && matchesSearch;
    });
  }, [reviews, filterStatus, search, products]);

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Customer Reviews Moderation
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Moderate customer testimonials and product reviews. Only approved reviews display on storefront product pages.
          </p>
        </div>

        {/* Quick Filter Status Tabs */}
        <div className="flex items-center rounded-xl bg-white p-1 border border-neutral-200 shadow-2xs self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'all' ? 'bg-[#9F2438] text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All ({reviews.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'pending'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('approved')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterStatus === 'approved'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Approved ({approvedCount})
          </button>
        </div>
      </div>

      {/* ─── Search Bar ──────────────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="search"
            placeholder="Search review by author, product name, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-[#9F2438] focus:outline-none"
          />
        </div>
      </div>

      {/* ─── Reviews List ────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {filteredReviews.map((rev) => {
          const product = products.find((p) => p.id === rev.productId);

          return (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  {/* Rating Stars */}
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rev.rating ? 'fill-amber-400' : 'text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="font-bold text-xs text-neutral-900">{rev.author}</span>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="h-3 w-3" />
                      Verified Purchase
                    </span>
                  )}

                  <span className="text-[11px] text-neutral-400">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Status Badge */}
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      rev.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rev.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>
              </div>

              {/* Product Reference */}
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>Product:</span>
                <span className="font-semibold text-neutral-900 font-serif">
                  {product ? product.name : `Product ID: ${rev.productId}`}
                </span>
              </div>

              {/* Review Text */}
              <div className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 p-3 rounded-xl">
                {rev.title && <p className="font-bold text-neutral-900 mb-1">{rev.title}</p>}
                <p>{rev.body}</p>
              </div>

              {/* Moderation Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                {rev.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(rev.id, 'approved')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Approve for Storefront</span>
                  </button>
                )}

                {rev.status !== 'rejected' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(rev.id, 'rejected')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Reject / Hide</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(rev.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center text-neutral-500 space-y-2">
            <MessageSquare className="h-10 w-10 mx-auto text-neutral-300" />
            <p className="text-sm font-semibold">No reviews matched the current filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

