import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Eye,
  CheckCircle,
  X,
  CreditCard,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { Customer, Order } from '../../types/commerce';
import { formatLKR } from '../../utils/pricing';

export function AdminCustomers() {
  const [customers] = useState<Customer[]>(() => adminStore.getCustomers());
  const orders = adminStore.getOrders();

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Compute spend & orders per customer
  const customerStats = useMemo(() => {
    const stats = new Map<string, { count: number; spend: number; orders: Order[] }>();
    customers.forEach((c) => {
      const custOrders = orders.filter((o) => o.customerId === c.id || o.contact.email.toLowerCase() === c.email.toLowerCase());
      const totalSpend = custOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
      stats.set(c.id, {
        count: custOrders.length,
        spend: totalSpend,
        orders: custOrders,
      });
    });
    return stats;
  }, [customers, orders]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
      );
    });
  }, [customers, search]);

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Customer Directory & Profiles
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Browse registered shoppers across Sri Lanka, lifetime purchase histories, and delivery profiles.
          </p>
        </div>
      </div>

      {/* ─── Search Bar ──────────────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="search"
            placeholder="Search customer by name, email, phone number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-[#9F2438] focus:outline-none"
          />
        </div>
      </div>

      {/* ─── Customers Table ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-5 pr-3">Customer</th>
                <th className="py-3.5 px-3">Contact Email</th>
                <th className="py-3.5 px-3">Phone</th>
                <th className="py-3.5 px-3">Registered Date</th>
                <th className="py-3.5 px-3">Total Orders</th>
                <th className="py-3.5 px-3">Lifetime Spend</th>
                <th className="py-3.5 pr-5 text-right">View Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCustomers.map((cust) => {
                const stat = customerStats.get(cust.id) || { count: 0, spend: 0, orders: [] };

                return (
                  <tr key={cust.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#9F2438]/10 text-[#9F2438] font-bold text-xs flex items-center justify-center">
                          {cust.firstName[0]}
                          {cust.lastName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">
                            {cust.firstName} {cust.lastName}
                          </p>
                          <p className="text-[11px] text-neutral-400">
                            {cust.addresses[0]?.city || 'Sri Lanka'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-neutral-600">{cust.email}</td>
                    <td className="py-3.5 px-3 font-mono text-neutral-600">{cust.phone}</td>
                    <td className="py-3.5 px-3 text-neutral-500 whitespace-nowrap">
                      {new Date(cust.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-neutral-900">{stat.count} orders</span>
                    </td>
                    <td className="py-3.5 px-3 font-serif font-bold text-neutral-900">
                      {formatLKR(stat.spend)}
                    </td>
                    <td className="py-3.5 pr-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(cust)}
                        className="inline-flex p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        title="View Customer Profile"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="p-12 text-center text-neutral-500 space-y-2">
            <Users className="h-10 w-10 mx-auto text-neutral-300" />
            <p className="text-sm font-semibold">No customers matched query</p>
          </div>
        )}
      </div>

      {/* ─── Customer Profile Drawer ─────────────────────────────────────── */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#9F2438] text-white font-bold text-base flex items-center justify-center">
                  {selectedCustomer.firstName[0]}
                  {selectedCustomer.lastName[0]}
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900 font-serif">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Registered {new Date(selectedCustomer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* Financial Metrics */}
              {(() => {
                const stat = customerStats.get(selectedCustomer.id) || { count: 0, spend: 0, orders: [] };
                return (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <p className="text-neutral-500 font-medium">Lifetime Spend</p>
                      <p className="text-lg font-bold font-serif text-neutral-900 mt-1">
                        {formatLKR(stat.spend)}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <p className="text-neutral-500 font-medium">Completed Orders</p>
                      <p className="text-lg font-bold font-serif text-neutral-900 mt-1">
                        {stat.count} orders
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Contact Information */}
              <div className="p-4 rounded-xl border border-neutral-200 space-y-2">
                <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                  Contact Information
                </p>
                <div className="space-y-1 text-neutral-700">
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-neutral-400" />
                    <span>{selectedCustomer.email}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono">
                    <Phone className="h-3.5 w-3.5 text-neutral-400" />
                    <span>{selectedCustomer.phone}</span>
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Marketing Opt-in: {selectedCustomer.marketingOptIn ? 'Subscribed' : 'Unsubscribed'}
                  </p>
                </div>
              </div>

              {/* Saved Addresses */}
              <div className="p-4 rounded-xl border border-neutral-200 space-y-2">
                <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                  Delivery Addresses ({selectedCustomer.addresses.length})
                </p>
                <div className="space-y-2">
                  {selectedCustomer.addresses.map((addr) => (
                    <div key={addr.id} className="p-2.5 rounded-lg bg-neutral-50 text-neutral-700 border border-neutral-200/60">
                      <p className="font-semibold">{addr.fullName} ({addr.label})</p>
                      <p>{addr.line1}</p>
                      <p>{addr.city}, {addr.district}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order History */}
              <div className="space-y-2">
                <p className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                  Order History
                </p>
                {(() => {
                  const stat = customerStats.get(selectedCustomer.id);
                  const custOrders = stat?.orders || [];

                  if (custOrders.length === 0) {
                    return <p className="text-neutral-400 italic">No orders recorded yet.</p>;
                  }

                  return (
                    <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100">
                      {custOrders.map((ord) => (
                        <div key={ord.reference} className="p-3 flex items-center justify-between">
                          <div>
                            <p className="font-mono font-semibold text-neutral-900">{ord.reference}</p>
                            <p className="text-[11px] text-neutral-400">
                              {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-serif font-bold text-neutral-900">{formatLKR(ord.total)}</p>
                            <span className="text-[10px] uppercase font-bold text-[#9F2438]">
                              {ord.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="p-4 border-t border-neutral-200 text-right">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
