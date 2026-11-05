import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Printer,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Package,
  Calendar,
  CreditCard,
  User,
  MapPin,
  X,
  FileText,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { Order } from '../../types/commerce';
import { formatLKR } from '../../utils/pricing';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export function AdminOrders() {
  const { user } = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>(() => adminStore.getOrders());

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  // Selected Order Drawer
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order['status']>('placed');
  const [internalNote, setInternalNote] = useState('');

  // Invoice Print Modal
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  const refreshOrders = () => {
    setOrders(adminStore.getOrders());
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        !search ||
        o.reference.toLowerCase().includes(search.toLowerCase()) ||
        o.contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
        o.contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
        o.contact.phone.includes(search) ||
        o.shippingAddress.city.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || o.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setInternalNote('');
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const updated = adminStore.updateOrderStatus(
      selectedOrder.reference,
      newStatus,
      internalNote.trim() || undefined,
      user ? { name: user.name, email: user.email } : undefined
    );

    setSelectedOrder(updated);
    setInternalNote('');
    refreshOrders();
  };

  const statusColorMap: Record<string, string> = {
    placed: 'bg-amber-100 text-amber-800 border-amber-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    processing: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cancelled: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Order Fulfillment & Logistics
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Process customer orders, update tracking status, generate commercial invoices, and log customer communications.
          </p>
        </div>
      </div>

      {/* ─── Filter Bar ──────────────────────────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="search"
              placeholder="Search reference, customer name, phone, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-[#9F2438] focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 text-xs rounded-xl border border-neutral-200 bg-neutral-50 px-3 focus:border-[#9F2438] focus:outline-none"
          >
            <option value="all">All Fulfillment Statuses</option>
            <option value="placed">Pending (Placed)</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing &amp; Packed</option>
            <option value="shipped">Shipped (In Transit)</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="h-10 text-xs rounded-xl border border-neutral-200 bg-neutral-50 px-3 focus:border-[#9F2438] focus:outline-none"
          >
            <option value="all">All Payment Statuses</option>
            <option value="pending">Payment Pending</option>
            <option value="awaiting_transfer">Awaiting Bank Transfer</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* ─── Orders Table ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 pl-5 pr-3">Order Ref</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Customer</th>
                <th className="py-3.5 px-3">Destination</th>
                <th className="py-3.5 px-3">Total Amount</th>
                <th className="py-3.5 px-3">Payment</th>
                <th className="py-3.5 px-3">Fulfillment</th>
                <th className="py-3.5 pr-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOrders.map((order) => (
                <tr key={order.reference} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 pl-5 pr-3 font-mono font-bold text-neutral-900">
                    {order.reference}
                  </td>
                  <td className="py-3 px-3 text-neutral-500 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-semibold text-neutral-900">
                      {order.contact.firstName} {order.contact.lastName}
                    </p>
                    <p className="text-[11px] text-neutral-400">{order.contact.phone}</p>
                  </td>
                  <td className="py-3 px-3 text-neutral-600">
                    {order.shippingAddress.city}, {order.shippingAddress.district}
                  </td>
                  <td className="py-3 px-3 font-bold font-serif text-neutral-900">
                    {formatLKR(order.total)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.paymentMethodId.toUpperCase()} • {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        statusColorMap[order.status] || 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 pr-5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(order)}
                        className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        title="View order details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setInvoiceOrder(order)}
                        className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        title="Print invoice"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-neutral-500 space-y-2">
            <ShoppingCart className="h-10 w-10 mx-auto text-neutral-300" />
            <p className="text-sm font-semibold">No orders matched criteria</p>
          </div>
        )}
      </div>

      {/* ─── Order Detail Drawer ─────────────────────────────────────────── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg text-neutral-900">
                    {selectedOrder.reference}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      statusColorMap[selectedOrder.status]
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status Update Form */}
              <form onSubmit={handleUpdateStatus} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-800">
                    Update Order Fulfillment Status
                  </label>
                  <span className="text-[10px] text-neutral-400">Stores audit record</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="h-9 text-xs rounded-xl border border-neutral-200 bg-white px-2 focus:border-[#9F2438] focus:outline-none"
                  >
                    <option value="placed">Placed (Pending)</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing &amp; Packed</option>
                    <option value="shipped">Shipped (In Transit)</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    type="submit"
                    className="h-9 px-4 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-xs"
                  >
                    Save Status
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Add optional tracking / warehouse note..."
                    className="w-full h-8 px-2.5 text-xs rounded-lg border border-neutral-200 bg-white focus:outline-none"
                  />
                </div>
              </form>

              {/* Customer & Shipping Summary */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-neutral-200 space-y-1">
                  <p className="font-bold text-neutral-900 flex items-center gap-1.5 mb-1.5">
                    <User className="h-3.5 w-3.5 text-neutral-400" />
                    Customer Details
                  </p>
                  <p className="font-semibold">
                    {selectedOrder.contact.firstName} {selectedOrder.contact.lastName}
                  </p>
                  <p className="text-neutral-500">{selectedOrder.contact.email}</p>
                  <p className="text-neutral-500 font-mono">{selectedOrder.contact.phone}</p>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 space-y-1">
                  <p className="font-bold text-neutral-900 flex items-center gap-1.5 mb-1.5">
                    <MapPin className="h-3.5 w-3.5 text-neutral-400" />
                    Delivery Address
                  </p>
                  <p>{selectedOrder.shippingAddress.line1}</p>
                  <p>
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.district}
                  </p>
                  <p className="text-neutral-400">{selectedOrder.deliveryMethod.name}</p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                  Ordered Items ({selectedOrder.items.length})
                </h4>
                <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
                  {selectedOrder.items.map((item) => (
                    <div key={item.variantId} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-neutral-900">{item.name}</p>
                        <p className="text-[11px] text-neutral-400">
                          {item.variantLabel} • {item.quantity} x {formatLKR(item.unitPrice)}
                        </p>
                      </div>
                      <p className="font-bold font-serif text-neutral-900">
                        {formatLKR(item.lineTotal)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Totals */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>{formatLKR(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span>{formatLKR(selectedOrder.deliveryFee)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#9F2438]">
                    <span>Promotional Discount</span>
                    <span>-{formatLKR(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-900 font-serif">
                  <span>Total Order Value</span>
                  <span>{formatLKR(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Internal Notes & History */}
              {selectedOrder.notes && (
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-neutral-700 space-y-1">
                  <p className="font-bold text-amber-900">Internal Audit &amp; Timeline Notes:</p>
                  <p className="whitespace-pre-line text-neutral-600">{selectedOrder.notes}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInvoiceOrder(selectedOrder)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold"
              >
                <Printer className="h-4 w-4" />
                <span>Print Invoice</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Printable Commercial Invoice Modal ──────────────────────────── */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-2xl p-8 max-h-[95vh] overflow-y-auto">
            {/* Invoice Top */}
            <div className="flex items-start justify-between pb-6 border-b border-neutral-200">
              <div>
                <span className="font-serif font-black text-2xl text-[#9F2438]">NELUM BEAUTY</span>
                <p className="text-xs text-neutral-500 mt-1">
                  Botanical Science &amp; Luxury Cosmetics<br />
                  Colombo, Sri Lanka • care@nelum.lk
                </p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-xl text-neutral-900 font-serif">COMMERCIAL INVOICE</h3>
                <p className="font-mono text-xs font-semibold text-neutral-700 mt-1">
                  Invoice #: {invoiceOrder.reference}
                </p>
                <p className="text-xs text-neutral-500">
                  Date: {new Date(invoiceOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Customer & Shipping */}
            <div className="grid grid-cols-2 gap-6 py-6 text-xs border-b border-neutral-200">
              <div>
                <p className="font-bold text-neutral-400 uppercase tracking-wider mb-1">Billed To:</p>
                <p className="font-bold text-neutral-900 text-sm">
                  {invoiceOrder.contact.firstName} {invoiceOrder.contact.lastName}
                </p>
                <p className="text-neutral-600">{invoiceOrder.contact.phone}</p>
                <p className="text-neutral-600">{invoiceOrder.contact.email}</p>
              </div>
              <div>
                <p className="font-bold text-neutral-400 uppercase tracking-wider mb-1">Shipped To:</p>
                <p className="text-neutral-900">{invoiceOrder.shippingAddress.line1}</p>
                <p className="text-neutral-900">
                  {invoiceOrder.shippingAddress.city}, {invoiceOrder.shippingAddress.district}
                </p>
                <p className="text-neutral-600">Payment: {invoiceOrder.paymentMethodId.toUpperCase()}</p>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-6">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500 font-bold uppercase text-[10px]">
                    <th className="pb-2">Item Description</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Unit Price</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {invoiceOrder.items.map((it) => (
                    <tr key={it.variantId}>
                      <td className="py-2.5 font-medium text-neutral-900">
                        {it.name} <span className="text-neutral-400 font-normal">({it.variantLabel})</span>
                      </td>
                      <td className="py-2.5 text-center font-mono">{it.quantity}</td>
                      <td className="py-2.5 text-right font-serif">{formatLKR(it.unitPrice)}</td>
                      <td className="py-2.5 text-right font-serif font-semibold">{formatLKR(it.lineTotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-neutral-200 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs text-right">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal:</span>
                  <span>{formatLKR(invoiceOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery:</span>
                  <span>{formatLKR(invoiceOrder.deliveryFee)}</span>
                </div>
                {invoiceOrder.discount > 0 && (
                  <div className="flex justify-between text-[#9F2438]">
                    <span>Discount:</span>
                    <span>-{formatLKR(invoiceOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-neutral-900 font-serif pt-2 border-t border-neutral-200">
                  <span>Total:</span>
                  <span>{formatLKR(invoiceOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-4 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                Official electronic invoice generated by Nelum Beauty
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-md inline-flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceOrder(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
