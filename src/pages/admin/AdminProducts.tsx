import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowUpDown,
  Upload,
  X,
  Sparkles,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { Product, ProductVariant } from '../../types/catalog';
import { formatLKR } from '../../utils/pricing';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { img } from '../../data/images';

export function AdminProducts() {
  const { user } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>(() => adminStore.getProducts());
  const categories = adminStore.getCategories();
  const brands = adminStore.getBrands();

  // Search, Filters & Sorting
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [stockStatus, setStockStatus] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'name' | 'stock'>('newest');
  
  // Selection & Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal / Drawer state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formTab, setFormTab] = useState<'basic' | 'images' | 'pricing' | 'inventory' | 'attributes' | 'badges'>('basic');
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [formVariant, setFormVariant] = useState<Partial<ProductVariant>>({
    sku: '',
    label: 'Standard Size',
    price: 3500,
    compareAtPrice: 0,
    stock: 25,
  });

  const refreshProducts = () => {
    setProducts(adminStore.getProducts());
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(search.toLowerCase())) ||
        p.productType.toLowerCase().includes(search.toLowerCase());

      // Category
      const matchesCat =
        selectedCategory === 'all' || p.categoryIds.includes(selectedCategory);

      // Brand
      const matchesBrand =
        selectedBrand === 'all' || p.brandId === selectedBrand;

      // Stock
      const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
      let matchesStock = true;
      if (stockStatus === 'in_stock') matchesStock = totalStock > 5;
      else if (stockStatus === 'low_stock') matchesStock = totalStock > 0 && totalStock <= 5;
      else if (stockStatus === 'out_of_stock') matchesStock = totalStock === 0;

      // Published / Draft
      const matchesPublished =
        statusFilter === 'all' ||
        (statusFilter === 'published' && p.published) ||
        (statusFilter === 'draft' && !p.published);

      return matchesSearch && matchesCat && matchesBrand && matchesStock && matchesPublished;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt.localeCompare(a.createdAt);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price_asc') return (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0);
      if (sortBy === 'price_desc') return (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0);
      if (sortBy === 'stock') {
        const stockA = a.variants.reduce((s, v) => s + v.stock, 0);
        const stockB = b.variants.reduce((s, v) => s + v.stock, 0);
        return stockA - stockB;
      }
      return 0;
    });
  }, [products, search, selectedCategory, selectedBrand, stockStatus, statusFilter, sortBy]);

  // Handle Add Product Click
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      brandId: brands[0]?.id || '',
      categoryIds: [categories[0]?.id || ''],
      productType: 'Skincare',
      shortDescription: '',
      description: '',
      images: [img.cleanser],
      variantKind: 'Size',
      benefits: ['Dermatologist tested', 'Gentle barrier support'],
      keyIngredients: ['Centella asiatica', 'Niacinamide'],
      ingredients: 'Aqua, Glycerin, Centella Asiatica Extract, Niacinamide.',
      howToUse: 'Smooth over cleansed skin morning and night.',
      skinTypes: ['dry', 'oily', 'combination'],
      concerns: ['dullness', 'dehydration'],
      tags: ['featured'],
      badge: 'new',
      published: true,
      salesRank: 10,
    });
    setFormVariant({
      sku: `NB-${Math.floor(1000 + Math.random() * 9000)}`,
      label: '50 ml',
      price: 3850,
      compareAtPrice: 4200,
      stock: 30,
    });
    setFormTab('basic');
    setIsModalOpen(true);
  };

  // Handle Edit Product Click
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setFormVariant(product.variants[0] || {
      sku: 'SKU',
      label: 'Standard',
      price: 0,
      stock: 0,
    });
    setFormTab('basic');
    setIsModalOpen(true);
  };

  // Save Product Handler (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brandId) return;

    const slug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const variant: ProductVariant = {
      id: formVariant.id || `v-${Date.now()}`,
      sku: formVariant.sku || `SKU-${Date.now().toString().slice(-4)}`,
      label: formVariant.label || 'Standard',
      price: Number(formVariant.price) || 0,
      compareAtPrice: formVariant.compareAtPrice ? Number(formVariant.compareAtPrice) : undefined,
      stock: Number(formVariant.stock) || 0,
    };

    if (editingProduct) {
      adminStore.updateProduct(
        editingProduct.id,
        {
          ...formData,
          slug,
          variants: [variant, ...(editingProduct.variants.slice(1) || [])],
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    } else {
      adminStore.createProduct(
        {
          name: formData.name || 'Untitled Product',
          slug,
          brandId: formData.brandId || brands[0]?.id || '',
          categoryIds: formData.categoryIds || [categories[0]?.id || ''],
          productType: formData.productType || 'Skincare',
          shortDescription: formData.shortDescription || '',
          description: formData.description || '',
          images: formData.images && formData.images.length > 0 ? formData.images : [img.cleanser],
          variantKind: formData.variantKind || 'Size',
          variants: [variant],
          benefits: formData.benefits || [],
          keyIngredients: formData.keyIngredients || [],
          ingredients: formData.ingredients || '',
          howToUse: formData.howToUse || '',
          warnings: formData.warnings || '',
          skinTypes: formData.skinTypes || [],
          concerns: formData.concerns || [],
          tags: formData.tags || [],
          badge: formData.badge,
          published: formData.published !== false,
          salesRank: formData.salesRank || 20,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    }

    refreshProducts();
    setIsModalOpen(false);
  };

  // Delete Handler
  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      adminStore.deleteProduct(id, user ? { name: user.name, email: user.email } : undefined);
      refreshProducts();
    }
  };

  // Bulk Actions
  const handleBulkPublish = (publish: boolean) => {
    adminStore.bulkUpdateProducts(selectedIds, { published: publish }, user ? { name: user.name, email: user.email } : undefined);
    setSelectedIds([]);
    refreshProducts();
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Permanently delete ${selectedIds.length} selected products?`)) {
      selectedIds.forEach((id) => adminStore.deleteProduct(id, user ? { name: user.name, email: user.email } : undefined));
      setSelectedIds([]);
      refreshProducts();
    }
  };

  const brandName = (id: string) => brands.find((b) => b.id === id)?.name || id;
  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name || id;

  return (
    <div className="space-y-6">
      {/* ─── Page Header & Action Buttons ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Product Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage your catalogue, prices, stock levels, skin taxonomy and storefront visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* ─── Search, Filters & Bulk Action Bar ────────────────────────────── */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="search"
              placeholder="Search product or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:border-[#9F2438] focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 text-xs rounded-xl border border-neutral-200 bg-neutral-50 px-3 focus:border-[#9F2438] focus:outline-none"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="h-10 text-xs rounded-xl border border-neutral-200 bg-neutral-50 px-3 focus:border-[#9F2438] focus:outline-none"
          >
            <option value="all">All Brands ({brands.length})</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockStatus}
            onChange={(e) => setStockStatus(e.target.value as any)}
            className="h-10 text-xs rounded-xl border border-neutral-200 bg-neutral-50 px-3 focus:border-[#9F2438] focus:outline-none"
          >
            <option value="all">All Stock Statuses</option>
            <option value="in_stock">In Stock (&gt; 5)</option>
            <option value="low_stock">Low Stock (1 - 5)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-10 text-xs rounded-xl border border-neutral-200 bg-neutral-50 px-3 focus:border-[#9F2438] focus:outline-none"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="price_asc">Sort: Price (Low to High)</option>
            <option value="price_desc">Sort: Price (High to Low)</option>
            <option value="stock">Sort: Stock Quantity</option>
          </select>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#9F2438]/5 border border-[#9F2438]/20 text-xs animate-in fade-in">
            <span className="font-semibold text-[#9F2438]">
              {selectedIds.length} products selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleBulkPublish(true)}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 font-medium"
              >
                Publish Selected
              </button>
              <button
                type="button"
                onClick={() => handleBulkPublish(false)}
                className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 font-medium"
              >
                Unpublish (Draft)
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Products Table Listing ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(filteredProducts.map((p) => p.id));
                      else setSelectedIds([]);
                    }}
                    className="rounded border-neutral-300 text-[#9F2438] focus:ring-[#9F2438]"
                  />
                </th>
                <th className="py-4 pr-3">Product</th>
                <th className="py-4 px-3">SKU</th>
                <th className="py-4 px-3">Brand</th>
                <th className="py-4 px-3">Category</th>
                <th className="py-4 px-3">Price</th>
                <th className="py-4 px-3">Stock</th>
                <th className="py-4 px-3">Status</th>
                <th className="py-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProducts.map((product) => {
                const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
                const primaryVariant = product.variants[0];
                const isSelected = selectedIds.includes(product.id);

                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-neutral-50/60 transition-colors ${
                      isSelected ? 'bg-rose-50/20' : ''
                    }`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds([...selectedIds, product.id]);
                          else setSelectedIds(selectedIds.filter((id) => id !== product.id));
                        }}
                        className="rounded border-neutral-300 text-[#9F2438] focus:ring-[#9F2438]"
                      />
                    </td>
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0] || img.cleanser}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover border border-neutral-200/80 shrink-0 bg-stone-50"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900 truncate max-w-xs sm:max-w-sm">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-neutral-400 truncate">
                            {product.productType} • {primaryVariant?.label}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-medium text-neutral-600">
                      {primaryVariant?.sku || 'NO-SKU'}
                    </td>
                    <td className="py-3.5 px-3 font-medium text-neutral-800">
                      {brandName(product.brandId)}
                    </td>
                    <td className="py-3.5 px-3 text-neutral-600">
                      {categoryName(product.categoryIds[0])}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold font-serif text-neutral-900">
                        {formatLKR(primaryVariant?.price || 0)}
                      </div>
                      {primaryVariant?.compareAtPrice && (
                        <div className="text-[10px] text-neutral-400 line-through">
                          {formatLKR(primaryVariant.compareAtPrice)}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          totalStock === 0
                            ? 'text-rose-600'
                            : totalStock <= 5
                            ? 'text-amber-600'
                            : 'text-emerald-700'
                        }`}
                      >
                        {totalStock} units
                        {totalStock <= 5 && totalStock > 0 && (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => {
                          adminStore.updateProduct(
                            product.id,
                            { published: !product.published },
                            user ? { name: user.name, email: user.email } : undefined
                          );
                          refreshProducts();
                        }}
                        title="Click to toggle published / draft state"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          product.published
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {product.published ? (
                          <>
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 text-neutral-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 pr-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-neutral-500 space-y-2">
            <Package className="h-10 w-10 mx-auto text-neutral-300" />
            <p className="text-sm font-semibold">No products found</p>
            <p className="text-xs text-neutral-400">
              Try adjusting your search query, filters, or add a new product.
            </p>
          </div>
        )}
      </div>

      {/* ─── Add / Edit Product Comprehensive Modal Drawer ───────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <div>
                <h2 className="text-lg font-bold font-serif text-neutral-900">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Beauty Product'}
                </h2>
                <p className="text-xs text-neutral-500">
                  Changes save directly to the unified Nelum catalogue database
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 border-b border-neutral-200 bg-neutral-50/60 overflow-x-auto text-xs font-semibold">
              {[
                { id: 'basic', label: '1. Basic Info' },
                { id: 'images', label: '2. Images & Media' },
                { id: 'pricing', label: '3. Pricing & Margins' },
                { id: 'inventory', label: '4. Inventory & SKU' },
                { id: 'attributes', label: '5. Skin Taxonomy' },
                { id: 'badges', label: '6. Toggles & SEO' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFormTab(tab.id as any)}
                  className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                    formTab === tab.id
                      ? 'border-[#9F2438] text-[#9F2438]'
                      : 'border-transparent text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Tab 1: Basic Information */}
              {formTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                        placeholder="e.g. Pure Botanical Barrier Cream"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Product Slug (URL)
                      </label>
                      <input
                        type="text"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                        placeholder="pure-botanical-barrier-cream"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Brand Partner *
                      </label>
                      <select
                        value={formData.brandId || ''}
                        onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                        className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                      >
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} ({b.origin})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Primary Category *
                      </label>
                      <select
                        value={formData.categoryIds?.[0] || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, categoryIds: [e.target.value] })
                        }
                        className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Product Type
                      </label>
                      <input
                        type="text"
                        value={formData.productType || ''}
                        onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                        className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                        placeholder="e.g. Cleanser, Serum, Cream"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Short Description (Storefront cards)
                    </label>
                    <input
                      type="text"
                      value={formData.shortDescription || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, shortDescription: e.target.value })
                      }
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                      placeholder="Brief highlight of formula and benefits"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Description & Formula Details
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                      placeholder="Comprehensive product benefits, botanical actives and tropical climate recommendations..."
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Images */}
              {formTab === 'images' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Main Product Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.images?.[0] || ''}
                      onChange={(e) => {
                        const nextImages = [...(formData.images || [])];
                        nextImages[0] = e.target.value;
                        setFormData({ ...formData, images: nextImages });
                      }}
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                      placeholder="/images/product.jpg or https://..."
                    />
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                    {formData.images?.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 bg-stone-50">
                        <img src={url} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                          {idx === 0 ? 'Primary' : `Gallery ${idx}`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-neutral-300 text-center bg-neutral-50/50">
                    <Upload className="h-6 w-6 mx-auto text-neutral-400 mb-1" />
                    <p className="text-xs font-semibold text-neutral-700">Add Gallery Image</p>
                    <p className="text-[11px] text-neutral-400">
                      Supports JPG, PNG, WEBP (square 1:1 recommended)
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Pricing */}
              {formTab === 'pricing' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Regular Selling Price (LKR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formVariant.price || ''}
                      onChange={(e) =>
                        setFormVariant({ ...formVariant, price: Number(e.target.value) })
                      }
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Compare at Price / Original (LKR)
                    </label>
                    <input
                      type="number"
                      value={formVariant.compareAtPrice || ''}
                      onChange={(e) =>
                        setFormVariant({
                          ...formVariant,
                          compareAtPrice: Number(e.target.value),
                        })
                      }
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Calculated Discount (%)
                    </label>
                    <div className="w-full h-10 px-3 text-xs rounded-xl bg-neutral-100 flex items-center font-bold text-[#9F2438]">
                      {formVariant.compareAtPrice && formVariant.price && formVariant.compareAtPrice > formVariant.price
                        ? `${Math.round(((formVariant.compareAtPrice - formVariant.price) / formVariant.compareAtPrice) * 100)}% Off`
                        : 'No Discount'}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Inventory */}
              {formTab === 'inventory' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      SKU Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formVariant.sku || ''}
                      onChange={(e) => setFormVariant({ ...formVariant, sku: e.target.value })}
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Initial Stock Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formVariant.stock || 0}
                      onChange={(e) =>
                        setFormVariant({ ...formVariant, stock: Number(e.target.value) })
                      }
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Variant Label (e.g. Size/Shade)
                    </label>
                    <input
                      type="text"
                      value={formVariant.label || ''}
                      onChange={(e) => setFormVariant({ ...formVariant, label: e.target.value })}
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 5: Attributes */}
              {formTab === 'attributes' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Ingredients (INCI List)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.ingredients || ''}
                      onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                      className="w-full p-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Usage Instructions
                    </label>
                    <input
                      type="text"
                      value={formData.howToUse || ''}
                      onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                      className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 6: Badges & SEO */}
              {formTab === 'badges' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published !== false}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                      />
                      <span className="text-xs font-semibold">Published on Store</span>
                    </label>

                    <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.badge === 'bestseller'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            badge: e.target.checked ? 'bestseller' : undefined,
                          })
                        }
                        className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                      />
                      <span className="text-xs font-semibold">Best Seller Badge</span>
                    </label>

                    <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.badge === 'new'}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            badge: e.target.checked ? 'new' : undefined,
                          })
                        }
                        className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                      />
                      <span className="text-xs font-semibold">New Arrival Badge</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
