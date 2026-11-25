import React, { useState } from 'react';
import { Plus, Edit, Trash2, Award, Globe, ExternalLink, X } from 'lucide-react';
import { adminStore } from '../services/adminStore';
import type { Brand } from '../types/catalog';
import { useAdminAuth } from '../contexts/AdminAuthContext';

export function AdminBrands() {
  const { user } = useAdminAuth();
  const [brands, setBrands] = useState<Brand[]>(() => adminStore.getBrands());
  const [products] = useState(() => adminStore.getProducts());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [origin, setOrigin] = useState('Sri Lanka');
  const [description, setDescription] = useState('');
  const [tagline, setTagline] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  const refreshBrands = () => {
    setBrands(adminStore.getBrands());
  };

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setName('');
    setSlug('');
    setOrigin('Sri Lanka');
    setDescription('');
    setTagline('');
    setFeatured(false);
    setPublished(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setName(brand.name);
    setSlug(brand.slug);
    setOrigin(brand.origin);
    setDescription(brand.description);
    setTagline(brand.tagline || '');
    setFeatured(brand.featured ?? false);
    setPublished(brand.published);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalSlug =
      slug.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    if (editingBrand) {
      adminStore.updateBrand(
        editingBrand.id,
        {
          name,
          slug: finalSlug,
          origin,
          description,
          tagline,
          featured,
          published,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    } else {
      adminStore.createBrand(
        {
          name,
          slug: finalSlug,
          origin,
          description,
          tagline,
          featured,
          published,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    }

    refreshBrands();
    setIsModalOpen(false);
  };

  const handleDelete = (brand: Brand) => {
    if (window.confirm(`Permanently delete brand "${brand.name}"?`)) {
      adminStore.deleteBrand(brand.id, user ? { name: user.name, email: user.email } : undefined);
      refreshBrands();
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Brand Partner Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage global and Ceylon beauty brand authorizations, origin stories and storefront brand showcase.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Brand Partner</span>
        </button>
      </div>

      {/* ─── Brands Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {brands.map((brand) => {
          const associatedProductsCount = products.filter((p) => p.brandId === brand.id).length;

          return (
            <div
              key={brand.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold font-serif text-[#9F2438] text-lg">
                      {brand.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900 font-serif">{brand.name}</h3>
                      <p className="text-xs text-neutral-500">Origin: {brand.origin}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      brand.published ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {brand.published ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                  {brand.description || 'No description provided.'}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-medium text-neutral-700">
                  {associatedProductsCount} Products in Catalog
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(brand)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Edit Brand"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(brand)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Brand"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Add / Edit Modal ─────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-lg overflow-hidden animate-in fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="text-base font-bold font-serif text-neutral-900">
                {editingBrand ? `Edit Brand: ${editingBrand.name}` : 'Add Brand Partner'}
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
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="e.g. Lumen Botanics"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Slug / URL Key
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    placeholder="lumen-botanics"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Country of Origin *
                  </label>
                  <input
                    type="text"
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    placeholder="Sri Lanka, France, South Korea..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Tagline / Brand Bio
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="e.g. Pure botanical active extracts crafted in Sri Lanka"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Brand Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="Detailed brand philosophy, quality guarantees, and botanical heritage..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                  />
                  <span className="text-xs font-semibold">Featured Brand</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                  />
                  <span className="text-xs font-semibold">Active on Store</span>
                </label>
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
                  className="px-5 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold"
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



