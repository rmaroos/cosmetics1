import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, Calendar, Eye, CheckCircle, XCircle, X } from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { Article, ArticleKind } from '../../types/content';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { img } from '../../data/images';

export function AdminJournal() {
  const { user } = useAdminAuth();
  const [articles, setArticles] = useState<Article[]>(() => adminStore.getArticles());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [kind, setKind] = useState<ArticleKind>('journal');
  const [topic, setTopic] = useState('Sun care');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('Nelum Beauty Team');
  const [image, setImage] = useState(img.journalSunscreen);
  const [readMinutes, setReadMinutes] = useState(5);
  const [published, setPublished] = useState(true);

  const refreshArticles = () => {
    setArticles(adminStore.getArticles());
  };

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setTitle('');
    setSlug('');
    setKind('journal');
    setTopic('Sun care');
    setExcerpt('');
    setAuthor('Nelum Beauty Team');
    setImage(img.journalSunscreen);
    setReadMinutes(5);
    setPublished(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setTitle(art.title);
    setSlug(art.slug);
    setKind(art.kind);
    setTopic(art.topic);
    setExcerpt(art.excerpt);
    setAuthor(art.author);
    setImage(art.image);
    setReadMinutes(art.readMinutes);
    setPublished(art.published);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const articleData: Article = {
      title,
      slug: finalSlug,
      kind,
      topic,
      excerpt,
      author,
      image,
      readMinutes: Number(readMinutes) || 5,
      published,
      publishedAt: editingArticle?.publishedAt || new Date().toISOString().slice(0, 10),
      body: editingArticle?.body || [
        { type: 'p', text: excerpt || 'Article introduction paragraph...' },
        { type: 'h2', text: 'Key Botanical Insights' },
        { type: 'p', text: 'Detailed cosmetic science analysis and application routine.' },
      ],
    };

    if (editingArticle) {
      adminStore.updateArticle(
        editingArticle.slug,
        articleData,
        user ? { name: user.name, email: user.email } : undefined
      );
    } else {
      adminStore.createArticle(
        articleData,
        user ? { name: user.name, email: user.email } : undefined
      );
    }

    refreshArticles();
    setIsModalOpen(false);
  };

  const handleDelete = (art: Article) => {
    if (window.confirm(`Permanently delete article "${art.title}"?`)) {
      adminStore.deleteArticle(art.slug, user ? { name: user.name, email: user.email } : undefined);
      refreshArticles();
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Blog &amp; Beauty Journal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Publish skincare routines, ingredient spotlights, and tropical barrier health guides on the storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* ─── Articles Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((art) => (
          <div
            key={art.slug}
            className="bg-white rounded-2xl border border-neutral-200/80 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-stone-100 border border-neutral-200">
                <img src={art.image} alt={art.title} className="h-full w-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                  {art.kind}
                </span>
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    art.published ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-200'
                  }`}
                >
                  {art.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <h3 className="font-bold text-sm text-neutral-900 font-serif line-clamp-2 leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
              <span>
                {art.readMinutes} min read • By {art.author}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(art)}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
                  title="Edit article"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(art)}
                  className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                  title="Delete article"
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
                {editingArticle ? `Edit Article: ${editingArticle.title}` : 'Write New Journal Article'}
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
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="e.g. How to care for sensitive skin in tropical heat"
                />
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
                    Article Kind
                  </label>
                  <select
                    value={kind}
                    onChange={(e) => setKind(e.target.value as any)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  >
                    <option value="journal">Beauty Journal</option>
                    <option value="routine">Curated Routine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Excerpt / Introduction Summary
                </label>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="Summary of the article displayed on journal listing cards..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Topic / Category
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                    placeholder="Sun care, Barrier Health..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Est. Reading Time (Mins)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={readMinutes}
                    onChange={(e) => setReadMinutes(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                />
                <span className="text-xs font-semibold">Published on Storefront Journal</span>
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

