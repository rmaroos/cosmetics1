import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  FileSpreadsheet,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  CheckCircle,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import { formatLKR } from '../../utils/pricing';

export function AdminReports() {
  const [activeReport, setActiveReport] = useState<'sales' | 'products' | 'inventory' | 'customers'>('sales');

  const products = adminStore.getProducts();
  const orders = adminStore.getOrders();
  const customers = adminStore.getCustomers();

  // Export to CSV helper
  const exportToCSV = (filename: string, rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows.map((e) => e.map((cell) => `"${cell}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSales = () => {
    const headers = ['Order Reference', 'Date', 'Customer', 'Payment Method', 'Status', 'Total (LKR)'];
    const data = orders.map((o) => [
      o.reference,
      new Date(o.createdAt).toLocaleDateString(),
      `${o.contact.firstName} ${o.contact.lastName}`,
      o.paymentMethodId.toUpperCase(),
      o.status,
      o.total,
    ]);
    exportToCSV('nelum-sales-report', [headers, ...data]);
  };

  const handleExportProducts = () => {
    const headers = ['Product Name', 'SKU', 'Brand', 'Price (LKR)', 'Stock', 'Sales Rank'];
    const data = products.map((p) => [
      p.name,
      p.variants[0]?.sku || '',
      p.brandId,
      p.variants[0]?.price || 0,
      p.variants.reduce((sum, v) => sum + v.stock, 0),
      p.salesRank,
    ]);
    exportToCSV('nelum-products-report', [headers, ...data]);
  };

  const handleExportInventory = () => {
    const headers = ['Product Name', 'Variant', 'SKU', 'Stock Level', 'Unit Price (LKR)', 'Total Value (LKR)'];
    const data = products.flatMap((p) =>
      p.variants.map((v) => [
        p.name,
        v.label,
        v.sku,
        v.stock,
        v.price,
        v.stock * v.price,
      ])
    );
    exportToCSV('nelum-inventory-valuation', [headers, ...data]);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const totalStockUnits = products.reduce((sum, p) => sum + p.variants.reduce((s, v) => s + v.stock, 0), 0);
  const inventoryValuation = products.reduce(
    (sum, p) => sum + p.variants.reduce((s, v) => s + v.stock * v.price, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Financial Reports &amp; Business Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Generate and export CSV datasets for accounting, inventory valuation, and sales velocity.
          </p>
        </div>

        {/* Report Selector Tabs */}
        <div className="flex items-center rounded-xl bg-white p-1 border border-neutral-200 shadow-2xs self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveReport('sales')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeReport === 'sales'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Sales Report
          </button>
          <button
            type="button"
            onClick={() => setActiveReport('products')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeReport === 'products'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Product Velocity
          </button>
          <button
            type="button"
            onClick={() => setActiveReport('inventory')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeReport === 'inventory'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Inventory Valuation
          </button>
        </div>
      </div>

      {/* ─── High Level Financial KPI Strip ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-500">Gross Sales Revenue</p>
            <p className="text-2xl font-bold font-serif text-neutral-900 mt-1">{formatLKR(totalRevenue)}</p>
          </div>
          <div className="p-3 rounded-xl bg-[#9F2438]/10 text-[#9F2438]">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-500">Warehouse Inventory Value</p>
            <p className="text-2xl font-bold font-serif text-neutral-900 mt-1">{formatLKR(inventoryValuation)}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Package className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-500">Total Tracked Stock</p>
            <p className="text-2xl font-bold font-serif text-neutral-900 mt-1">{totalStockUnits} units</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ─── REPORT CONTENT CONTAINER ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-bold text-neutral-900 font-serif">
              {activeReport === 'sales'
                ? 'Detailed Sales & Revenue Log'
                : activeReport === 'products'
                ? 'Product Performance & Demand Rankings'
                : 'Inventory Asset Valuation Breakdown'}
            </h3>
            <p className="text-xs text-neutral-500">
              Live records pulled directly from the active PostgreSQL / local database store
            </p>
          </div>

          <button
            type="button"
            onClick={
              activeReport === 'sales'
                ? handleExportSales
                : activeReport === 'products'
                ? handleExportProducts
                : handleExportInventory
            }
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>Export to CSV / Excel</span>
          </button>
        </div>

        {/* Sales Table */}
        {activeReport === 'sales' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-semibold uppercase text-[10px]">
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Order Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders.map((o) => (
                  <tr key={o.reference} className="hover:bg-neutral-50">
                    <td className="py-3 font-mono font-bold text-neutral-900">{o.reference}</td>
                    <td className="py-3 text-neutral-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 font-medium text-neutral-900">
                      {o.contact.firstName} {o.contact.lastName}
                    </td>
                    <td className="py-3 text-neutral-600">{o.paymentMethodId.toUpperCase()}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-100 text-neutral-700">
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-serif font-bold text-neutral-900">
                      {formatLKR(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Products Table */}
        {activeReport === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-semibold uppercase text-[10px]">
                  <th className="pb-3">Product Name</th>
                  <th className="pb-3">SKU</th>
                  <th className="pb-3">Selling Price</th>
                  <th className="pb-3">In-Stock Units</th>
                  <th className="pb-3 text-right">Sales Rank Velocity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50">
                    <td className="py-3 font-semibold text-neutral-900">{p.name}</td>
                    <td className="py-3 font-mono text-neutral-600">{p.variants[0]?.sku}</td>
                    <td className="py-3 font-serif font-semibold">{formatLKR(p.variants[0]?.price || 0)}</td>
                    <td className="py-3 font-mono">
                      {p.variants.reduce((sum, v) => sum + v.stock, 0)} units
                    </td>
                    <td className="py-3 text-right">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#9F2438]/10 text-[#9F2438]">
                        Rank #{p.salesRank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Inventory Valuation Table */}
        {activeReport === 'inventory' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 font-semibold uppercase text-[10px]">
                  <th className="pb-3">Product Item</th>
                  <th className="pb-3">Variant SKU</th>
                  <th className="pb-3">Stock Units</th>
                  <th className="pb-3">Unit Retail</th>
                  <th className="pb-3 text-right">Gross Retail Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.flatMap((p) =>
                  p.variants.map((v) => (
                    <tr key={`${p.id}-${v.id}`} className="hover:bg-neutral-50">
                      <td className="py-3 font-medium text-neutral-900">{p.name}</td>
                      <td className="py-3 font-mono text-neutral-600">
                        {v.sku} ({v.label})
                      </td>
                      <td className="py-3 font-mono font-bold text-neutral-800">{v.stock}</td>
                      <td className="py-3 font-serif">{formatLKR(v.price)}</td>
                      <td className="py-3 text-right font-serif font-bold text-neutral-900">
                        {formatLKR(v.stock * v.price)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
