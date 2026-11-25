import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  RotateCcwIcon,
  Trash2Icon,
} from 'lucide-react';
import { Overlay } from '../ui/Overlay';
import { useNavigation } from '../../contexts/NavigationContext';
import type { AnnouncementMessage, NavigationItemConfig } from '../../config/navigationConfig';
import {
  type HeroBannerSlide,
  type BannerSliderSettings,
  type MarqueeMessage,
  getStoredBanners,
  getStoredSliderSettings,
  getStoredMarqueeMessages,
  saveStoredBanners,
  saveStoredSliderSettings,
  saveStoredMarqueeMessages,
  resetBannersToDefaults,
  defaultBannerSlides,
  defaultSliderSettings,
  defaultMarqueeMessages,
} from '../../config/bannerConfig';
import {
  type InstagramPost,
  type InstagramProfileConfig,
  type InstagramSectionSettings,
  getStoredInstagramProfile,
  getStoredInstagramPosts,
  getStoredInstagramSettings,
  saveStoredInstagramProfile,
  saveStoredInstagramPosts,
  saveStoredInstagramSettings,
  resetInstagramToDefaults,
  defaultInstagramProfile,
  defaultInstagramPosts,
  defaultInstagramSettings,
} from '../../config/instagramConfig';
import { InstagramAdminTab } from './InstagramAdminTab';
import { img } from '../../data/images';

export function AdminNavModal() {
  const {
    isAdminModalOpen,
    closeAdminModal,
    announcements,
    updateAnnouncements,
    navigationItems,
    updateNavigationItems,
    resetAllToDefaults,
  } = useNavigation();

  const [activeTab, setActiveTab] = useState<'banners' | 'marquee' | 'navigation' | 'announcements' | 'instagram'>('banners');

  // Working drafts
  const [draftBanners, setDraftBanners] = useState<HeroBannerSlide[]>(getStoredBanners);
  const [draftSettings, setDraftSettings] = useState<BannerSliderSettings>(getStoredSliderSettings);
  const [draftMarquee, setDraftMarquee] = useState<MarqueeMessage[]>(getStoredMarqueeMessages);
  const [draftAnnouncements, setDraftAnnouncements] = useState<AnnouncementMessage[]>(announcements);
  const [draftNavItems, setDraftNavItems] = useState<NavigationItemConfig[]>(navigationItems);

  // Instagram drafts
  const [draftInstagramProfile, setDraftInstagramProfile] = useState<InstagramProfileConfig>(getStoredInstagramProfile);
  const [draftInstagramSettings, setDraftInstagramSettings] = useState<InstagramSectionSettings>(getStoredInstagramSettings);
  const [draftInstagramPosts, setDraftInstagramPosts] = useState<InstagramPost[]>(getStoredInstagramPosts);

  // Expanded slide ID in editor
  const [expandedSlideId, setExpandedSlideId] = useState<string | null>(null);

  // Sync draft when modal opens
  useEffect(() => {
    if (isAdminModalOpen) {
      setDraftBanners(getStoredBanners());
      setDraftSettings(getStoredSliderSettings());
      setDraftMarquee(getStoredMarqueeMessages());
      setDraftAnnouncements(announcements);
      setDraftNavItems(navigationItems);
      setDraftInstagramProfile(getStoredInstagramProfile());
      setDraftInstagramSettings(getStoredInstagramSettings());
      setDraftInstagramPosts(getStoredInstagramPosts());
    }
  }, [isAdminModalOpen, announcements, navigationItems]);

  /* ─── Hero Banner Handlers ────────────────────────────────────────────────── */
  const moveBanner = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= draftBanners.length) return;

    const list = [...draftBanners];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    setDraftBanners(reordered);
  };

  const toggleBannerActive = (id: string) => {
    setDraftBanners((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const updateBannerField = (id: string, field: keyof HeroBannerSlide, value: any) => {
    setDraftBanners((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const addBanner = () => {
    const newSlide: HeroBannerSlide = {
      id: `slide-${Date.now()}`,
      eyebrow: 'SEASONAL CAMPAIGN',
      title: 'New Beauty Campaign Collection',
      description: 'Discover curated beauty essentials crafted for your daily radiant glow.',
      ctaText: 'Shop Collection',
      ctaUrl: '/shop',
      desktopImage: img.hero,
      mobileImage: img.hero,
      imageAlt: 'Campaign promotional banner',
      textAlignment: 'left',
      tone: 'blush',
      order: draftBanners.length + 1,
      active: true,
    };
    setDraftBanners((prev) => [newSlide, ...prev]);
    setExpandedSlideId(newSlide.id);
  };

  const removeBanner = (id: string) => {
    if (draftBanners.length <= 1) {
      toast.error('At least one banner slide must remain.');
      return;
    }
    setDraftBanners((prev) => prev.filter((s) => s.id !== id));
  };

  /* ─── Marquee Handlers ────────────────────────────────────────────────────── */
  const moveMarquee = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= draftMarquee.length) return;

    const list = [...draftMarquee];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    setDraftMarquee(reordered);
  };

  const toggleMarqueeActive = (id: string) => {
    setDraftMarquee((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  const updateMarqueeField = (id: string, text: string) => {
    setDraftMarquee((prev) =>
      prev.map((m) => (m.id === id ? { ...m, text } : m))
    );
  };

  const addMarquee = () => {
    const newItem: MarqueeMessage = {
      id: `marquee-${Date.now()}`,
      text: 'Special Beauty Campaign Offer',
      order: draftMarquee.length + 1,
      active: true,
    };
    setDraftMarquee((prev) => [...prev, newItem]);
  };

  const removeMarquee = (id: string) => {
    if (draftMarquee.length <= 1) {
      toast.error('At least one marquee message must remain.');
      return;
    }
    setDraftMarquee((prev) => prev.filter((m) => m.id !== id));
  };

  /* ─── Announcement Handlers ──────────────────────────────────────────────── */
  const toggleAnnouncementActive = (id: string) => {
    setDraftAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  const updateAnnouncementField = (id: string, field: keyof AnnouncementMessage, val: string) => {
    setDraftAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: val } : a))
    );
  };

  const addAnnouncement = () => {
    const newAnn: AnnouncementMessage = {
      id: `ann-${Date.now()}`,
      text: 'New promotional campaign announcement message',
      linkLabel: 'Shop Now',
      href: '/shop',
      active: true,
    };
    setDraftAnnouncements((prev) => [newAnn, ...prev]);
  };

  const removeAnnouncement = (id: string) => {
    setDraftAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  /* ─── Navigation Item Handlers ───────────────────────────────────────────── */
  const moveNavItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= draftNavItems.length) return;

    const updated = [...draftNavItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setDraftNavItems(reordered);
  };

  const toggleNavItemPublished = (id: string) => {
    setDraftNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, published: !item.published } : item))
    );
  };

  const updateNavItemField = (id: string, field: 'label' | 'badge' | 'href', val: string) => {
    setDraftNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  /* ─── Instagram Handlers ──────────────────────────────────────────────────── */
  const moveInstagramPost = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= draftInstagramPosts.length) return;

    const updated = [...draftInstagramPosts];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setDraftInstagramPosts(reordered);
  };

  const toggleInstagramPostActive = (id: string) => {
    setDraftInstagramPosts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const removeInstagramPost = (id: string) => {
    if (draftInstagramPosts.length <= 1) {
      toast.error('At least one Instagram post is required.');
      return;
    }
    setDraftInstagramPosts((prev) =>
      prev
        .filter((item) => item.id !== id)
        .map((item, idx) => ({ ...item, order: idx + 1 }))
    );
  };

  const updateInstagramPostField = (id: string, field: keyof InstagramPost, value: any) => {
    setDraftInstagramPosts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addInstagramPost = () => {
    const newPost: InstagramPost = {
      id: `ig-post-${Date.now()}`,
      imageUrl: img.serum,
      postUrl: draftInstagramProfile.profileUrl || 'https://instagram.com/nelumbeauty',
      caption: 'New beauty favourite from Nelum Beauty.',
      mediaType: 'image',
      altText: 'Nelum Beauty curated beauty post',
      order: draftInstagramPosts.length + 1,
      active: true,
      publishedAt: new Date().toISOString(),
    };
    setDraftInstagramPosts((prev) => [newPost, ...prev].map((p, idx) => ({ ...p, order: idx + 1 })));
  };

  const updateInstagramProfileField = (field: keyof InstagramProfileConfig, value: any) => {
    setDraftInstagramProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateInstagramSettingsField = (field: keyof InstagramSectionSettings, value: any) => {
    setDraftInstagramSettings((prev) => ({ ...prev, [field]: value }));
  };

  /* ─── Save / Reset Actions ────────────────────────────────────────────────── */
  const handleSave = () => {
    saveStoredBanners(draftBanners);
    saveStoredSliderSettings(draftSettings);
    saveStoredMarqueeMessages(draftMarquee);
    updateAnnouncements(draftAnnouncements);
    updateNavigationItems(draftNavItems);
    saveStoredInstagramProfile(draftInstagramProfile);
    saveStoredInstagramSettings(draftInstagramSettings);
    saveStoredInstagramPosts(draftInstagramPosts);
    window.dispatchEvent(new Event('storage'));
    toast.success('Storefront configuration & Instagram showcase updated successfully!');
    closeAdminModal();
  };

  const handleReset = () => {
    if (window.confirm('Reset all hero banners, marquee messages, navigation, announcements and Instagram showcase to initial defaults?')) {
      resetBannersToDefaults();
      resetAllToDefaults();
      resetInstagramToDefaults();
      setDraftBanners(defaultBannerSlides);
      setDraftSettings(defaultSliderSettings);
      setDraftMarquee(defaultMarqueeMessages);
      setDraftInstagramProfile(defaultInstagramProfile);
      setDraftInstagramSettings(defaultInstagramSettings);
      setDraftInstagramPosts(defaultInstagramPosts);
      window.dispatchEvent(new Event('storage'));
      toast.info('Storefront reset to initial defaults.');
      closeAdminModal();
    }
  };

  return (
    <Overlay open={isAdminModalOpen} onClose={closeAdminModal} title="Admin Panel: Storefront Manager" side="right">
      <div className="flex h-full flex-col justify-between px-5 pb-6">
        <div className="overflow-y-auto pr-1">
          {/* Header tabs */}
          <div className="mb-4 flex border-b border-line text-xs overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('banners')}
              className={`flex-1 min-w-[76px] pb-3 text-center font-medium transition-colors ${
                activeTab === 'banners'
                  ? 'border-b-2 border-brand text-brand font-semibold'
                  : 'text-ink-2 hover:text-ink'
              }`}
            >
              Hero Slider ({draftBanners.filter((b) => b.active).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('marquee')}
              className={`flex-1 min-w-[65px] pb-3 text-center font-medium transition-colors ${
                activeTab === 'marquee'
                  ? 'border-b-2 border-brand text-brand font-semibold'
                  : 'text-ink-2 hover:text-ink'
              }`}
            >
              Marquee ({draftMarquee.filter((m) => m.active).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('navigation')}
              className={`flex-1 min-w-[55px] pb-3 text-center font-medium transition-colors ${
                activeTab === 'navigation'
                  ? 'border-b-2 border-brand text-brand font-semibold'
                  : 'text-ink-2 hover:text-ink'
              }`}
            >
              Menu ({draftNavItems.filter((i) => i.published).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('announcements')}
              className={`flex-1 min-w-[65px] pb-3 text-center font-medium transition-colors ${
                activeTab === 'announcements'
                  ? 'border-b-2 border-brand text-brand font-semibold'
                  : 'text-ink-2 hover:text-ink'
              }`}
            >
              Top Bar ({draftAnnouncements.filter((a) => a.active).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('instagram')}
              className={`flex-1 min-w-[75px] pb-3 text-center font-medium transition-colors ${
                activeTab === 'instagram'
                  ? 'border-b-2 border-brand text-brand font-semibold'
                  : 'text-ink-2 hover:text-ink'
              }`}
            >
              Instagram ({draftInstagramPosts.filter((p) => p.active).length})
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              TAB 1: HERO BANNER SLIDER MANAGER
             ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'banners' && (
            <div className="space-y-4">
              {/* Slider Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface p-3 text-xs text-ink-2">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftSettings.autoplay}
                      onChange={(e) =>
                        setDraftSettings((s) => ({ ...s, autoplay: e.target.checked }))
                      }
                      className="rounded accent-brand"
                    />
                    <span>Autoplay</span>
                  </label>

                  <div className="flex items-center gap-1">
                    <span>Duration:</span>
                    <select
                      value={draftSettings.slideDuration}
                      onChange={(e) =>
                        setDraftSettings((s) => ({ ...s, slideDuration: Number(e.target.value) }))
                      }
                      className="rounded border border-line bg-white px-1.5 py-0.5 text-xs text-ink"
                    >
                      <option value={3000}>3 seconds (Default)</option>
                      <option value={5000}>5 seconds</option>
                      <option value={7000}>7 seconds</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addBanner}
                  className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1 text-xs font-semibold text-brand shadow-2xs hover:bg-brand-soft"
                >
                  <PlusIcon className="h-3.5 w-3.5" /> Add Slide
                </button>
              </div>

              {/* Banner Slides List */}
              <div className="space-y-3">
                {draftBanners.map((slide, index) => {
                  const isExpanded = expandedSlideId === slide.id;
                  return (
                    <div
                      key={slide.id}
                      className={`rounded-lg border transition-all ${
                        slide.active ? 'border-line bg-white shadow-2xs' : 'border-line/40 bg-surface/60 opacity-60'
                      }`}
                    >
                      {/* Slide Header */}
                      <div className="flex items-center justify-between gap-2 p-3">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-surface text-xs font-bold text-ink-muted">
                            {index + 1}
                          </span>
                          <img
                            src={slide.desktopImage}
                            alt=""
                            className="h-9 w-14 shrink-0 rounded object-cover"
                          />
                          <div className="truncate">
                            <p className="truncate text-xs font-semibold text-ink">
                              {slide.title}
                            </p>
                            <p className="text-[10px] text-ink-muted truncate">
                              {slide.eyebrow} • {slide.ctaText} → {slide.ctaUrl}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => setExpandedSlideId(isExpanded ? null : slide.id)}
                            className="rounded px-2 py-1 text-xs font-medium text-ink-2 hover:bg-surface"
                          >
                            {isExpanded ? 'Collapse' : 'Edit'}
                          </button>

                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveBanner(index, 'up')}
                            className="flex h-7 w-7 items-center justify-center rounded hover:bg-surface disabled:opacity-20 text-ink-2"
                            title="Move Up"
                          >
                            <ArrowUpIcon className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            disabled={index === draftBanners.length - 1}
                            onClick={() => moveBanner(index, 'down')}
                            className="flex h-7 w-7 items-center justify-center rounded hover:bg-surface disabled:opacity-20 text-ink-2"
                            title="Move Down"
                          >
                            <ArrowDownIcon className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleBannerActive(slide.id)}
                            className={`flex h-7 w-7 items-center justify-center rounded ${
                              slide.active ? 'text-brand hover:bg-brand-soft' : 'text-ink-muted hover:bg-surface'
                            }`}
                            title={slide.active ? 'Disable slide' : 'Enable slide'}
                          >
                            {slide.active ? <EyeIcon className="h-3.5 w-3.5" /> : <EyeOffIcon className="h-3.5 w-3.5" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => removeBanner(slide.id)}
                            className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-error-soft hover:text-error"
                            title="Delete slide"
                          >
                            <Trash2Icon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Slide Editor Form */}
                      {isExpanded && (
                        <div className="border-t border-line/70 bg-surface/30 p-3.5 space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Eyebrow</label>
                              <input
                                type="text"
                                value={slide.eyebrow}
                                onChange={(e) => updateBannerField(slide.id, 'eyebrow', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Tone / Background</label>
                              <select
                                value={slide.tone}
                                onChange={(e) => updateBannerField(slide.id, 'tone', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              >
                                <option value="blush">Blush (#FAF3F2)</option>
                                <option value="sage">Sage (#F4F7F3)</option>
                                <option value="rose">Rose (#FAF2F4)</option>
                                <option value="sand">Sand (#FAF7F1)</option>
                                <option value="ivory">Ivory (#FBF9F7)</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-medium text-ink-muted">Main Headline</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => updateBannerField(slide.id, 'title', e.target.value)}
                              className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-medium text-ink-muted">Description</label>
                            <textarea
                              rows={2}
                              value={slide.description}
                              onChange={(e) => updateBannerField(slide.id, 'description', e.target.value)}
                              className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Primary CTA Text</label>
                              <input
                                type="text"
                                value={slide.ctaText}
                                onChange={(e) => updateBannerField(slide.id, 'ctaText', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Primary CTA URL</label>
                              <input
                                type="text"
                                value={slide.ctaUrl}
                                onChange={(e) => updateBannerField(slide.id, 'ctaUrl', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Secondary CTA Text (optional)</label>
                              <input
                                type="text"
                                value={slide.secondaryCtaText ?? ''}
                                onChange={(e) => updateBannerField(slide.id, 'secondaryCtaText', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Secondary CTA URL (optional)</label>
                              <input
                                type="text"
                                value={slide.secondaryCtaUrl ?? ''}
                                onChange={(e) => updateBannerField(slide.id, 'secondaryCtaUrl', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Desktop Image URL</label>
                              <input
                                type="text"
                                value={slide.desktopImage}
                                onChange={(e) => updateBannerField(slide.id, 'desktopImage', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-ink-muted">Mobile Image URL (optional)</label>
                              <input
                                type="text"
                                value={slide.mobileImage ?? ''}
                                onChange={(e) => updateBannerField(slide.id, 'mobileImage', e.target.value)}
                                className="w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Scheduling Window */}
                          <div className="rounded border border-line bg-white p-2.5">
                            <p className="flex items-center gap-1 text-[11px] font-semibold text-ink-2 mb-1.5">
                              <CalendarIcon className="h-3 w-3 text-brand" /> Campaign Schedule (Optional)
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] text-ink-muted">Start Date</label>
                                <input
                                  type="date"
                                  value={slide.startDate ?? ''}
                                  onChange={(e) => updateBannerField(slide.id, 'startDate', e.target.value)}
                                  className="w-full rounded border border-line bg-surface px-2 py-1 text-xs text-ink focus:border-brand focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-ink-muted">End Date</label>
                                <input
                                  type="date"
                                  value={slide.endDate ?? ''}
                                  onChange={(e) => updateBannerField(slide.id, 'endDate', e.target.value)}
                                  className="w-full rounded border border-line bg-surface px-2 py-1 text-xs text-ink focus:border-brand focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              TAB 2: HERO ANNOUNCEMENT MARQUEE MANAGER
             ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'marquee' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink-muted">
                  These promotional messages loop continuously in the announcement bar right below the hero carousel.
                </p>
                <button
                  type="button"
                  onClick={addMarquee}
                  className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1 text-xs font-semibold text-brand shadow-2xs hover:bg-brand-soft shrink-0"
                >
                  <PlusIcon className="h-3.5 w-3.5" /> Add Message
                </button>
              </div>

              <div className="space-y-2.5">
                {draftMarquee.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${
                      item.active ? 'border-line bg-white shadow-2xs' : 'border-line/40 bg-surface/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 flex-1">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-surface text-xs font-bold text-ink-muted">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateMarqueeField(item.id, e.target.value)}
                        placeholder="Promotional announcement text..."
                        className="w-full rounded border border-line bg-surface/40 px-2 py-1 text-xs text-ink focus:border-brand focus:bg-white focus:outline-none font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveMarquee(index, 'up')}
                        className="flex h-7 w-7 items-center justify-center rounded hover:bg-surface disabled:opacity-20 text-ink-2"
                        title="Move Up"
                      >
                        <ArrowUpIcon className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        disabled={index === draftMarquee.length - 1}
                        onClick={() => moveMarquee(index, 'down')}
                        className="flex h-7 w-7 items-center justify-center rounded hover:bg-surface disabled:opacity-20 text-ink-2"
                        title="Move Down"
                      >
                        <ArrowDownIcon className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleMarqueeActive(item.id)}
                        className={`flex h-7 w-7 items-center justify-center rounded ${
                          item.active ? 'text-brand hover:bg-brand-soft' : 'text-ink-muted hover:bg-surface'
                        }`}
                        title={item.active ? 'Disable message' : 'Enable message'}
                      >
                        {item.active ? <EyeIcon className="h-3.5 w-3.5" /> : <EyeOffIcon className="h-3.5 w-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeMarquee(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-error-soft hover:text-error"
                        title="Delete message"
                      >
                        <Trash2Icon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              TAB 3: MAIN NAVIGATION MENU MANAGER
             ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'navigation' && (
            <div className="space-y-4">
              <div className="rounded-lg bg-surface p-3 text-xs text-ink-2">
                <p>
                  <strong>Admin Notice:</strong> Reorder menu items or toggle visibility. Categories and dropdown contents dynamically pull from active catalogue data.
                </p>
              </div>

              <div className="space-y-2.5">
                {draftNavItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors ${
                      item.published ? 'border-line bg-white shadow-2xs' : 'border-line/40 bg-surface/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-surface text-xs font-semibold text-ink-muted">
                        {index + 1}
                      </span>
                      <div>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => updateNavItemField(item.id, 'label', e.target.value)}
                          className="font-medium text-ink bg-transparent text-sm hover:border-b hover:border-line focus:outline-none focus:border-brand"
                        />
                        <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                          <span>{item.href}</span>
                          <span>•</span>
                          <span className="capitalize">{item.megaMenuType !== 'none' ? `Mega Menu: ${item.megaMenuType}` : 'Direct Link'}</span>
                          {item.badge && (
                            <span className="rounded bg-brand-soft px-1.5 py-0.5 text-[10px] font-bold text-brand">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveNavItem(index, 'up')}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-surface disabled:opacity-20 text-ink-2"
                        title="Move Up"
                      >
                        <ArrowUpIcon className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        disabled={index === draftNavItems.length - 1}
                        onClick={() => moveNavItem(index, 'down')}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-surface disabled:opacity-20 text-ink-2"
                        title="Move Down"
                      >
                        <ArrowDownIcon className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleNavItemPublished(item.id)}
                        className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
                          item.published ? 'text-brand hover:bg-brand-soft' : 'text-ink-muted hover:bg-surface'
                        }`}
                        title={item.published ? 'Hide item from navigation' : 'Show item in navigation'}
                      >
                        {item.published ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              TAB 4: ANNOUNCEMENT BAR MANAGER
             ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'announcements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink-muted">Messages rotate at the top of the storefront.</p>
                <button
                  type="button"
                  onClick={addAnnouncement}
                  className="inline-flex items-center gap-1 rounded bg-surface px-2.5 py-1 text-xs font-medium text-ink hover:bg-brand-soft hover:text-brand"
                >
                  <PlusIcon className="h-3.5 w-3.5" /> Add Message
                </button>
              </div>

              <div className="space-y-3">
                {draftAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    className={`rounded-lg border p-3.5 transition-colors ${
                      ann.active ? 'border-line bg-white shadow-2xs' : 'border-line/50 bg-surface/50 opacity-60'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        Promotional Message
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleAnnouncementActive(ann.id)}
                          className={`rounded px-2 py-0.5 text-xs font-medium ${
                            ann.active
                              ? 'bg-success-soft text-success'
                              : 'bg-surface text-ink-muted'
                          }`}
                        >
                          {ann.active ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeAnnouncement(ann.id)}
                          className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-error-soft hover:text-error"
                          title="Delete message"
                        >
                          <Trash2Icon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={ann.text}
                      onChange={(e) => updateAnnouncementField(ann.id, 'text', e.target.value)}
                      placeholder="Message text..."
                      className="w-full rounded border border-line bg-surface p-2 text-xs text-ink focus:border-brand focus:outline-none"
                    />

                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-ink-muted">Link Label (optional)</label>
                        <input
                          type="text"
                          value={ann.linkLabel ?? ''}
                          onChange={(e) => updateAnnouncementField(ann.id, 'linkLabel', e.target.value)}
                          placeholder="e.g. Shop Now"
                          className="w-full rounded border border-line bg-surface px-2 py-1 text-xs text-ink focus:border-brand focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-ink-muted">Link URL (optional)</label>
                        <input
                          type="text"
                          value={ann.href ?? ''}
                          onChange={(e) => updateAnnouncementField(ann.id, 'href', e.target.value)}
                          placeholder="e.g. /collection/offers"
                          className="w-full rounded border border-line bg-surface px-2 py-1 text-xs text-ink focus:border-brand focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              TAB 5: INSTAGRAM SHOWCASE MANAGER
             ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'instagram' && (
            <InstagramAdminTab
              profile={draftInstagramProfile}
              settings={draftInstagramSettings}
              posts={draftInstagramPosts}
              onUpdateProfile={updateInstagramProfileField}
              onUpdateSettings={updateInstagramSettingsField}
              onUpdatePost={updateInstagramPostField}
              onTogglePostActive={toggleInstagramPostActive}
              onMovePost={moveInstagramPost}
              onRemovePost={removeInstagramPost}
              onAddPost={addInstagramPost}
            />
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" /> Reset to Defaults
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeAdminModal}
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink hover:bg-surface"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1 rounded-lg bg-ink px-4 py-1.5 text-xs font-medium text-white hover:bg-brand"
            >
              <CheckIcon className="h-3.5 w-3.5" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
