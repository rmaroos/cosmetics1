import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Plus,
  Minus,
  AlertTriangle,
  History,
  Search,
  Filter,
  ArrowDownCircle,
  ArrowUpCircle,
  RotateCcw,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { InventoryMovement } from '../../types/admin';
import type { Product } from '../../types/catalog';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { formatLKR } from '../../utils/pricing';

export function AdminInventory() {
  const { user } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>(() => adminStore.getProducts());
  const [inventoryLogs, setInventoryLogs] = useState<InventoryMovement[]>(() =>
    adminStore.getInventoryLogs()
  );

  const [activeTab, setActiveTab] = useState<'levels' | 'history'>('levels');
  const [search, setSearch] = useState('');
  const [filterStockStatus, setFilterStockStatus] = useState<'all' | 'low' | 'out'>('all');

  // Stock Adjustment Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [adjustmentType, setAdjustmentType] = useState<InventoryMovement['type']>('stock_in');
  const [quantityDelta, setQuantityDelta] = useState(10);
  const [reason, setReason] = useState('New inventory shipment intake');

  const refreshData = () => {
    setProducts(adminStore.getProducts());
    setInventoryLogs(adminStore.getInventoryLogs());
  };

  // Low & Out stock counts
  const lowStockCount = useMemo(
    () => products.filter((p) => p.variants.some((v) => v.stock > 0 && v.stock <= 5)).length,
    [products]
  );
  const outOfStockCount = useMemo(
    () => products.filter((p) => p.variants.some((v) => v.stock === 0)).length,
    [products]
  );

  // Flattened inventory variants list
  const variantList = useMemo(() => {
    return products.flatMap((p) =>
      p.variants.map((v) => ({
        product: p,
        variant: v,
        totalStock: v.stock,
      }))
    );
  }, [products]);

  // Filtered variant rows
  const filteredVariants = useMemo(() => {
    return variantList.filter((item) => {
      const matchesSearch =
        !search ||
        item.product.name.toLowerCase().includes(search.toLowerCase()) ||
        item.variant.sku.toLowerCase().includes(search.toLowerCase());

      let matchesStock = true;
      if (filterStockStatus === 'low') matchesStock = item.variant.stock > 0 && item.variant.stock <= 5;
      if (filterStockStatus === 'out') matchesStock = item.variant.stock === 0;

      return matchesSearch && matchesStock;
    });
  }, [variantList, search, filterStockStatus]);

  // Open Quick Adjust Modal
  const handleOpenAdjust = (product: Product, variantId: string) => {
    setSelectedProduct(product);
    setSelectedVariantId(variantId);
    setAdjustmentType('stock_in');
    setQuantityDelta(10);
    setReason('Restock shipment intake');
    setIsModalOpen(true);
  };

  // Submit Adjustment
  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedVariantId || !quantityDelta) return;

    const delta =
      adjustmentType === 'stock_out' ? -Math.abs(quantityDelta) : Math.abs(quantityDelta);

    adminStore.adjustStock(
      selectedProduct.id,
      selectedVariantId,
      delta,
      adjustmentType,
      reason,
      user ? { name: user.name, email: user.email } : undefined
    );

    refreshData();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Inventory & Warehouse Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Track current stock levels across all SKUs, adjust warehouse batches, and view full audit movement logs.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-xl bg-white p-1 border border-neutral-200 shadow-2xs self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('levels')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'levels'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Live Stock Levels ({variantList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'history'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Movement Audit History ({inventoryLogs.length})
          </button>
        </div>
      </div>

      {/* ─── Summary KPI Pills ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-neutral-500">Total Tracked Units</p>
            <p className="text-xl font-bold font-serif text-neutral-900 mt-1">
              {variantList.reduce((sum, v) => sum + v.variant.stock, 0)} units
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <Boxes className="h-5 w-5" />
          </div>
        </div>

        <div
          onClick={() => setFilterStockStatus(filterStockStatus === 'low' ? 'all' : 'low')}
          className={`bg-white p-4 rounded-xl border cursor-pointer transition-all shadow-2xs flex items-center justify-between ${
            filterStockStatus === 'low' ? 'border-amber-400 ring-2 ring-amber-100' : 'border-neutral-200/80'
          }`}
        >
          <div>
            <p className="text-xs font-semibold text-amber-700">Low Stock SKUs (&le; 5 units)</p>
            <p className="text-xl font-bold font-serif text-amber-800 mt-1">{lowStockCount} items</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        <div
          onClick={() => setFilterStockStatus(filterStockStatus === 'out' ? 'all' : 'out')}
          className={`bg-white p-4 rounded-xl border cursor-pointer transition-all shadow-2xs flex items-center justify-between ${
            filterStockStatus === 'out' ? 'border-rose-400 ring-2 ring-rose-100' : 'border-neutral-200/80'
          }`}
        >
          <div>
            <p className="text-xs font-semibold text-rose-700">Out of Stock (0 units)</p>
            <p className="text-xl font-bold font-serif text-rose-800 mt-1">{outOfStockCount} items</p>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ─── TAB 1: Live Stock Levels ─────────────────────────────────────── */}
      {activeTab === 'levels' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Search SKU or product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-[#9F2438] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="text-neutral-500">Filter:</span>
              <button
                type="button"
                onClick={() => setFilterStockStatus('all')}
                className={`px-2.5 py-1 rounded-lg ${
                  filterStockStatus === 'all'
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterStockStatus('low')}
                className={`px-2.5 py-1 rounded-lg ${
                  filterStockStatus === 'low'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                Low Stock
              </button>
              <button
                type="button"
                onClick={() => setFilterStockStatus('out')}
                className={`px-2.5 py-1 rounded-lg ${
                  filterStockStatus === 'out'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Out of Stock
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 pl-5 pr-3">Product & Variant</th>
                  <th className="py-3.5 px-3">SKU</th>
                  <th className="py-3.5 px-3">Price</th>
                  <th className="py-3.5 px-3">Available Stock</th>
                  <th className="py-3.5 px-3">Health Status</th>
                  <th className="py-3.5 pr-5 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredVariants.map(({ product, variant }) => {
                  const isOutOfStock = variant.stock === 0;
                  const isLowStock = variant.stock > 0 && variant.stock <= 5;

                  return (
                    <tr key={`${product.id}-${variant.id}`} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3 pl-5 pr-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-neutral-900 truncate max-w-xs">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-neutral-400">
                              {variant.label} ({product.productType})
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-neutral-600">
                        {variant.sku}
                      </td>
                      <td className="py-3 px-3 font-semibold font-serif text-neutral-900">
                        {formatLKR(variant.price)}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-sm font-mono text-neutral-900">
                          {variant.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {isOutOfStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
                            Out of Stock
                          </span>
                        ) : isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                            Healthy
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenAdjust(product, variant.id)}
                          className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#9F2438] hover:text-white text-neutral-700 font-semibold text-xs transition-colors"
                        >
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Movement Audit History ────────────────────────────────── */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 font-serif">
              Inventory Movement Audit Log
            </h3>
            <span className="text-xs text-neutral-500">
              Total Recorded Logs: {inventoryLogs.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 pl-5 pr-3">Timestamp</th>
                  <th className="py-3.5 px-3">Product & Variant</th>
                  <th className="py-3.5 px-3">Type</th>
                  <th className="py-3.5 px-3">Adjustment</th>
                  <th className="py-3.5 px-3">New Balance</th>
                  <th className="py-3.5 px-3">Reason</th>
                  <th className="py-3.5 pr-5">Performed By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {inventoryLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3 pl-5 pr-3 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-neutral-900">{log.productName}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">
                        {log.variantSku} ({log.variantLabel})
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          log.type === 'stock_in'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.type === 'stock_out'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {log.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`font-mono font-bold ${
                          log.quantityDelta > 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {log.quantityDelta > 0 ? `+${log.quantityDelta}` : log.quantityDelta}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-neutral-800">
                      {log.quantityAfter} units
                    </td>
                    <td className="py-3 px-3 text-neutral-600 max-w-xs truncate">
                      {log.reason}
                    </td>
                    <td className="py-3 pr-5 font-medium text-neutral-700">
                      {log.createdBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Adjust Stock Modal ───────────────────────────────────────────── */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-md p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold font-serif text-neutral-900">
                Adjust Inventory Stock
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
              <p className="font-semibold text-neutral-900">{selectedProduct.name}</p>
              <p className="text-neutral-500 mt-0.5">
                Current Variant: {selectedProduct.variants.find((v) => v.id === selectedVariantId)?.label} (
                {selectedProduct.variants.find((v) => v.id === selectedVariantId)?.stock} units in stock)
              </p>
            </div>

            <form onSubmit={handleSaveAdjustment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Movement Type
                </label>
                <select
                  value={adjustmentType}
                  onChange={(e) => setAdjustmentType(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                >
                  <option value="stock_in">Stock-In (+ Restock / Supplier Intake)</option>
                  <option value="stock_out">Stock-Out (- Damaged / Expired / Write-off)</option>
                  <option value="adjustment">Manual Count Audit Reconciliation</option>
                  <option value="return">Customer Return Restock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Quantity Units ({adjustmentType === 'stock_out' ? 'Decrease -' : 'Increase +'})
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={quantityDelta}
                  onChange={(e) => setQuantityDelta(Math.max(1, Number(e.target.value)))}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Reason / Reference Note *
                </label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="e.g. Batch PO #8892 from Colombo warehouse"
                />
              </div>

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
                  Apply Stock Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
