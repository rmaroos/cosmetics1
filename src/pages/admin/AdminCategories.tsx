import React, { useState } from 'react';
import { Plus, Edit, Trash2, FolderTree, CheckCircle, XCircle, ChevronRight, X } from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { Category } from '../../types/catalog';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export function AdminCategories() {
  const { user } = useAdminAuth();
  const [categories, setCategories] = useState<Category[]>(() => adminStore.getCategories());
  const [products] = useState(() => adminStore.getProducts());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteReassignModal, setDeleteReassignModal] = useState<Category | null>(null);
  const [reassignTargetId, setReassignTargetId] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [order, setOrder] = useState(1);
  const [published, setPublished] = useState(true);

  const refreshCategories = () => {
    setCategories(adminStore.getCategories());
  };

  const handleOpenAdd = (parent?: Category) => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setParentId(parent ? parent.id : null);
    setDescription('');
    setImage('/images/categories/skincare.jpg');
    setOrder(categories.length + 1);
    setPublished(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug);
    setParentId(category.parentId);
    setDescription(category.description || '');
    setImage(category.image || '');
    setOrder(category.order);
    setPublished(category.published);
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

    if (editingCategory) {
      adminStore.updateCategory(
        editingCategory.id,
        {
          name,
          slug: finalSlug,
          parentId,
          description,
          image,
          order: Number(order) || 1,
          published,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    } else {
      adminStore.createCategory(
        {
          name,
          slug: finalSlug,
          parentId,
          description,
          image,
          order: Number(order) || 1,
          published,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    }

    refreshCategories();
    setIsModalOpen(false);
  };

  const handleDeletePrompt = (cat: Category) => {
    const affectedProducts = products.filter((p) => p.categoryIds.includes(cat.id));
    if (affectedProducts.length > 0) {
      setDeleteReassignModal(cat);
      const otherCat = categories.find((c) => c.id !== cat.id);
      setReassignTargetId(otherCat?.id || '');
    } else {
      if (window.confirm(`Permanently delete category "${cat.name}"?`)) {
        adminStore.deleteCategory(cat.id, undefined, user ? { name: user.name, email: user.email } : undefined);
        refreshCategories();
      }
    }
  };

  const handleConfirmReassignDelete = () => {
    if (!deleteReassignModal) return;
    adminStore.deleteCategory(
      deleteReassignModal.id,
      reassignTargetId || undefined,
      user ? { name: user.name, email: user.email } : undefined
    );
    setDeleteReassignModal(null);
    refreshCategories();
  };

  // Group root & children
  const rootCategories = categories.filter((c) => !c.parentId);
  const getSubcategories = (pId: string) => categories.filter((c) => c.parentId === pId);

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Dynamic Category Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Build and arrange nested category trees with instant storefront navigation synchronization.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenAdd()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Root Category</span>
        </button>
      </div>

      {/* ─── Category Hierarchy Tree & List ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Category Structure ({categories.length} Categories Total)
          </span>
          <span className="text-xs text-neutral-500">
            Drag, edit or nest subcategories dynamically
          </span>
        </div>

        <div className="space-y-3">
          {rootCategories.map((root) => {
            const subs = getSubcategories(root.id);
            const count = products.filter((p) => p.categoryIds.includes(root.id)).length;

            return (
              <div
                key={root.id}
                className="rounded-xl border border-neutral-200 bg-neutral-50/40 p-4 transition-all hover:bg-neutral-50"
              >
                {/* Root Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-neutral-200 font-semibold text-neutral-800">
                      <FolderTree className="h-5 w-5 text-[#9F2438]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-neutral-900">{root.name}</span>
                        <span className="text-xs font-mono text-neutral-400">/{root.slug}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            root.published ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {root.published ? 'Live' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {count} assigned products • Display order: #{root.order}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenAdd(root)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                    >
                      + Subcategory
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(root)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-white"
                      title="Edit Category"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePrompt(root)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Delete Category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Subcategories (if any) */}
                {subs.length > 0 && (
                  <div className="mt-3 pl-8 sm:pl-12 space-y-2 border-l-2 border-neutral-200/60 ml-5">
                    {subs.map((sub) => {
                      const subCount = products.filter((p) => p.categoryIds.includes(sub.id)).length;
                      return (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-neutral-200/70"
                        >
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-neutral-400" />
                            <span className="font-semibold text-xs text-neutral-900">{sub.name}</span>
                            <span className="text-[11px] font-mono text-neutral-400">/{sub.slug}</span>
                            <span className="text-[10px] text-neutral-400">
                              ({subCount} products)
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(sub)}
                              className="p-1 text-neutral-400 hover:text-neutral-800 rounded"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePrompt(sub)}
                              className="p-1 text-neutral-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Add / Edit Modal ─────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-lg overflow-hidden animate-in fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="text-base font-bold font-serif text-neutral-900">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Category'}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="e.g. Lipsticks & Tints"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Parent Category (Optional for Nested)
                </label>
                <select
                  value={parentId || ''}
                  onChange={(e) => setParentId(e.target.value || null)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                >
                  <option value="">None (Top-Level Root Category)</option>
                  {rootCategories
                    .filter((c) => (editingCategory ? c.id !== editingCategory.id : true))
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Slug / URL Path
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    placeholder="auto-generated"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Display Order #
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="Short overview for category hero page"
                />
              </div>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                />
                <span className="text-xs font-semibold">Active & Visible on Storefront Navigation</span>
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
                  className="px-5 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Delete Reassignment Protection Modal ────────────────────────── */}
      {deleteReassignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              Reassign Products Before Deleting
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Category <strong>"{deleteReassignModal.name}"</strong> currently has products assigned.
              Select another category to reassign these products to so they remain accessible:
            </p>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Reassign Products To:
              </label>
              <select
                value={reassignTargetId}
                onChange={(e) => setReassignTargetId(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
              >
                {categories
                  .filter((c) => c.id !== deleteReassignModal.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteReassignModal(null)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReassignDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
              >
                Reassign & Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
