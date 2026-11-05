import React, { useState } from 'react';
import {
  Globe,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit,
  CheckCircle,
  Sliders,
  Image as ImageIcon,
  Megaphone,
  Instagram,
  Sparkles,
  Save,
  RotateCcw,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { HomepageSectionConfig } from '../../types/admin';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import {
  getStoredBanners,
  saveStoredBanners,
  type HeroBannerSlide,
} from '../../config/bannerConfig';
import {
  getStoredAnnouncements,
  saveStoredAnnouncements,
  type AnnouncementMessage,
} from '../../config/navigationConfig';

export function AdminCms() {
  const { user } = useAdminAuth();
  const [sections, setSections] = useState<HomepageSectionConfig[]>(() =>
    adminStore.getCmsSections()
  );
  const [activeTab, setActiveTab] = useState<'sections' | 'hero' | 'announcements'>('sections');

  // Hero Banners
  const [banners, setBanners] = useState<HeroBannerSlide[]>(getStoredBanners);
  const [editingBanner, setEditingBanner] = useState<HeroBannerSlide | null>(null);

  // Announcements
  const [announcements, setAnnouncements] = useState<AnnouncementMessage[]>(getStoredAnnouncements);

  // Section Editing Modal
  const [editingSection, setEditingSection] = useState<HomepageSectionConfig | null>(null);

  const refreshSections = () => {
    setSections(adminStore.getCmsSections());
  };

  // Reordering sections
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= sections.length) return;

    const list = [...sections];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    adminStore.reorderCmsSections(
      list.map((s) => s.id),
      user ? { name: user.name, email: user.email } : undefined
    );
    refreshSections();
  };

  const toggleSection = (sec: HomepageSectionConfig) => {
    adminStore.updateCmsSection(
      sec.id,
      { enabled: !sec.enabled },
      user ? { name: user.name, email: user.email } : undefined
    );
    refreshSections();
  };

  const handleSaveSectionEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;

    adminStore.updateCmsSection(
      editingSection.id,
      {
        title: editingSection.title,
        eyebrow: editingSection.eyebrow,
        subtitle: editingSection.subtitle,
        description: editingSection.description,
        ctaText: editingSection.ctaText,
        ctaUrl: editingSection.ctaUrl,
      },
      user ? { name: user.name, email: user.email } : undefined
    );

    setEditingSection(null);
    refreshSections();
  };

  const handleSaveBanners = () => {
    saveStoredBanners(banners);
    alert('Hero banner changes saved to storefront!');
  };

  const handleSaveAnnouncements = () => {
    saveStoredAnnouncements(announcements);
    alert('Announcement bar updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Website Content Management (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Visually manage storefront homepage sections, reorder layout hierarchy, edit hero slides, and configure announcement bars.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center rounded-xl bg-white p-1 border border-neutral-200 shadow-2xs self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'sections'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Homepage Sections ({sections.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'hero'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Hero Slides ({banners.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'announcements'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Announcement Bar
          </button>
        </div>
      </div>

      {/* ─── TAB 1: Homepage Sections Ordering & Visibility ───────────────── */}
      {activeTab === 'sections' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h3 className="font-bold text-sm text-neutral-900 font-serif">
                Homepage Layout Sequence &amp; Visibility
              </h3>
              <p className="text-xs text-neutral-500">
                Use arrows to change the order sections appear on the live storefront homepage.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#9F2438] bg-[#9F2438]/10 px-2.5 py-1 rounded-full">
              Live Storefront Dynamic Rendering
            </span>
          </div>

          <div className="space-y-2.5">
            {sections.map((sec, index) => (
              <div
                key={sec.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  sec.enabled
                    ? 'bg-neutral-50/50 border-neutral-200 hover:border-neutral-300'
                    : 'bg-neutral-100/50 border-neutral-200/60 opacity-60'
                }`}
              >
                {/* Drag / Sequence Handle & Details */}
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-neutral-200 font-mono text-xs font-bold text-neutral-700">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-neutral-900">{sec.title}</span>
                      {sec.eyebrow && (
                        <span className="text-[10px] uppercase font-semibold text-neutral-400">
                          [{sec.eyebrow}]
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate max-w-md">
                      {sec.subtitle || 'Standard layout component'}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1.5">
                  {/* Move Up */}
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveSection(index, 'up')}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-600 disabled:opacity-30"
                    title="Move section up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    disabled={index === sections.length - 1}
                    onClick={() => moveSection(index, 'down')}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-600 disabled:opacity-30"
                    title="Move section down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => toggleSection(sec)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                      sec.enabled
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-neutral-200 border-neutral-300 text-neutral-600'
                    }`}
                    title={sec.enabled ? 'Disable section' : 'Enable section'}
                  >
                    {sec.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>

                  {/* Edit Headings */}
                  <button
                    type="button"
                    onClick={() => setEditingSection(sec)}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-700"
                    title="Edit section titles"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 2: Hero Carousel Banners ─────────────────────────────────── */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h3 className="font-bold text-sm text-neutral-900 font-serif">
                Hero Campaign Carousel Slides
              </h3>
              <p className="text-xs text-neutral-500">
                Configure promotional hero images, headlines, and call-to-actions.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveBanners}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9F2438] text-white text-xs font-semibold shadow-xs"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((b, idx) => (
              <div
                key={b.id}
                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-neutral-900">Slide #{idx + 1}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
                    Tone: {b.tone}
                  </span>
                </div>

                <div className="aspect-[16/9] rounded-lg overflow-hidden border border-neutral-200 bg-stone-100">
                  <img src={b.desktopImage} alt={b.title} className="h-full w-full object-cover" />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Campaign Eyebrow
                  </label>
                  <input
                    type="text"
                    value={b.eyebrow}
                    onChange={(e) => {
                      const updated = [...banners];
                      updated[idx].eyebrow = e.target.value;
                      setBanners(updated);
                    }}
                    className="w-full h-8 px-2.5 text-xs rounded-lg border border-neutral-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={b.title}
                    onChange={(e) => {
                      const updated = [...banners];
                      updated[idx].title = e.target.value;
                      setBanners(updated);
                    }}
                    className="w-full h-8 px-2.5 text-xs rounded-lg border border-neutral-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    CTA Button Label &amp; URL
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={b.ctaText}
                      onChange={(e) => {
                        const updated = [...banners];
                        updated[idx].ctaText = e.target.value;
                        setBanners(updated);
                      }}
                      className="h-8 px-2.5 text-xs rounded-lg border border-neutral-200 bg-white"
                    />
                    <input
                      type="text"
                      value={b.ctaUrl}
                      onChange={(e) => {
                        const updated = [...banners];
                        updated[idx].ctaUrl = e.target.value;
                        setBanners(updated);
                      }}
                      className="h-8 px-2.5 text-xs rounded-lg border border-neutral-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 3: Announcement Bar ──────────────────────────────────────── */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h3 className="font-bold text-sm text-neutral-900 font-serif">
                Top Announcement Bar Messages
              </h3>
              <p className="text-xs text-neutral-500">
                Manage promotional notifications displayed at the very top of all pages.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSaveAnnouncements}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9F2438] text-white text-xs font-semibold shadow-xs"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Announcements</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann, idx) => (
              <div
                key={ann.id}
                className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row items-center gap-3"
              >
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    value={ann.text}
                    onChange={(e) => {
                      const updated = [...announcements];
                      updated[idx].text = e.target.value;
                      setAnnouncements(updated);
                    }}
                    className="w-full h-9 px-3 text-xs rounded-lg border border-neutral-200 bg-white"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <input
                    type="text"
                    value={ann.link || ''}
                    placeholder="Link (e.g. /offers)"
                    onChange={(e) => {
                      const updated = [...announcements];
                      updated[idx].link = e.target.value;
                      setAnnouncements(updated);
                    }}
                    className="w-full h-9 px-3 text-xs rounded-lg border border-neutral-200 bg-white"
                  />
                </div>
                <label className="flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={ann.active}
                    onChange={(e) => {
                      const updated = [...announcements];
                      updated[idx].active = e.target.checked;
                      setAnnouncements(updated);
                    }}
                    className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                  />
                  <span>Active</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Edit Section Modal ───────────────────────────────────────────── */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-lg p-6 space-y-4 animate-in fade-in">
            <h3 className="font-bold text-base text-neutral-900 font-serif">
              Edit Section Content: {editingSection.title}
            </h3>

            <form onSubmit={handleSaveSectionEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Eyebrow Tag</label>
                <input
                  type="text"
                  value={editingSection.eyebrow || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, eyebrow: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-neutral-200 focus:outline-none"
                  placeholder="e.g. CUSTOMER FAVOURITES"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Section Title *</label>
                <input
                  type="text"
                  required
                  value={editingSection.title}
                  onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-neutral-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Subtitle / Description
                </label>
                <textarea
                  rows={2}
                  value={editingSection.subtitle || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, subtitle: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl border border-neutral-200 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 font-semibold text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white font-semibold"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
