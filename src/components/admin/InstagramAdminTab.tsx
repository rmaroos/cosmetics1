import { useState } from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  EyeOffIcon,
  Instagram as InstagramIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
  Video as VideoIcon,
} from 'lucide-react';
import type {
  InstagramPost,
  InstagramProfileConfig,
  InstagramSectionSettings,
} from '../../config/instagramConfig';
import { img } from '../../data/images';

interface InstagramAdminTabProps {
  profile: InstagramProfileConfig;
  settings: InstagramSectionSettings;
  posts: InstagramPost[];
  onUpdateProfile: (field: keyof InstagramProfileConfig, value: any) => void;
  onUpdateSettings: (field: keyof InstagramSectionSettings, value: any) => void;
  onUpdatePost: (id: string, field: keyof InstagramPost, value: any) => void;
  onTogglePostActive: (id: string) => void;
  onMovePost: (index: number, direction: 'up' | 'down') => void;
  onRemovePost: (id: string) => void;
  onAddPost: () => void;
}

export function InstagramAdminTab({
  profile,
  settings,
  posts,
  onUpdateProfile,
  onUpdateSettings,
  onUpdatePost,
  onTogglePostActive,
  onMovePost,
  onRemovePost,
  onAddPost,
}: InstagramAdminTabProps) {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* ─── 1. Section & Layout Controls Bar ────────────────────────────── */}
      <div className="rounded-lg border border-line bg-surface/70 p-3.5 text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-line/60 pb-2.5">
          <span className="font-semibold text-ink flex items-center gap-1.5">
            <SlidersHorizontalIcon className="h-3.5 w-3.5 text-brand" /> Section & Layout Controls
          </span>
          <label className="flex items-center gap-2 cursor-pointer font-medium text-ink">
            <input
              type="checkbox"
              checked={settings.enabled}
              onChange={(e) => onUpdateSettings('enabled', e.target.checked)}
              className="rounded border-line text-brand focus:ring-brand"
            />
            Display on Homepage
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className="text-[10px] font-medium text-ink-muted">Section Background</label>
            <select
              value={settings.background}
              onChange={(e) => onUpdateSettings('background', e.target.value)}
              className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            >
              <option value="white">Clean White</option>
              <option value="ivory">Warm Ivory (#FAF8F5)</option>
              <option value="blush">Soft Blush (#FAF1F0)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-medium text-ink-muted">Posts to Show</label>
            <select
              value={settings.postsCount}
              onChange={(e) => onUpdateSettings('postsCount', Number(e.target.value))}
              className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            >
              <option value={10}>10 Posts (Recommended 5×2 Grid)</option>
              <option value={5}>5 Posts (1 Row)</option>
              <option value={6}>6 Posts</option>
              <option value={8}>8 Posts</option>
              <option value={12}>12 Posts</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-medium text-ink-muted">Desktop Grid</label>
            <select
              value={settings.columnsDesktop}
              onChange={(e) => onUpdateSettings('columnsDesktop', Number(e.target.value))}
              className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            >
              <option value={5}>5 Columns (Recommended 5×2 Grid)</option>
              <option value={6}>6 Columns</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-medium text-ink-muted">Mobile Columns</label>
            <select
              value={settings.columnsMobile}
              onChange={(e) => onUpdateSettings('columnsMobile', Number(e.target.value))}
              className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            >
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── 2. Official Instagram Profile Settings ────────────────────────── */}
      <div className="rounded-lg border border-line bg-white p-3.5 text-xs space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-line pb-2.5">
          <InstagramIcon className="h-4 w-4 text-brand" />
          <h3 className="font-semibold text-ink">Official Instagram Profile & Header</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-medium text-ink-muted">Section Heading</label>
            <input
              type="text"
              value={profile.sectionHeading}
              onChange={(e) => onUpdateProfile('sectionHeading', e.target.value)}
              placeholder="e.g. Stay Connected"
              className="mt-1 w-full rounded border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium text-ink-muted">Supporting Heading</label>
            <input
              type="text"
              value={profile.supportingHeading}
              onChange={(e) => onUpdateProfile('supportingHeading', e.target.value)}
              placeholder="e.g. Follow Us on Instagram"
              className="mt-1 w-full rounded border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-medium text-ink-muted">Instagram Handle / Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => onUpdateProfile('username', e.target.value)}
              placeholder="e.g. @nelumbeauty"
              className="mt-1 w-full rounded border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium text-ink-muted">Official Profile URL</label>
            <input
              type="text"
              value={profile.profileUrl}
              onChange={(e) => onUpdateProfile('profileUrl', e.target.value)}
              placeholder="https://instagram.com/nelumbeauty"
              className="mt-1 w-full rounded border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-medium text-ink-muted">Profile Avatar Image URL</label>
            <div className="mt-1 flex items-center gap-2">
              <img
                src={profile.profileImage}
                alt="Profile preview"
                className="h-7 w-7 rounded-full object-cover border border-line shrink-0"
              />
              <input
                type="text"
                value={profile.profileImage}
                onChange={(e) => onUpdateProfile('profileImage', e.target.value)}
                className="flex-1 rounded border border-line bg-surface px-2 py-1 text-xs text-ink focus:border-brand focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium text-ink-muted">CTA Button Text</label>
            <input
              type="text"
              value={profile.ctaText}
              onChange={(e) => onUpdateProfile('ctaText', e.target.value)}
              placeholder="Follow Us on Instagram"
              className="mt-1 w-full rounded border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-medium text-ink-muted">Community Description</label>
          <textarea
            rows={2}
            value={profile.description}
            onChange={(e) => onUpdateProfile('description', e.target.value)}
            className="mt-1 w-full rounded border border-line bg-surface p-2 text-xs text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <div className="rounded border border-line/70 bg-surface/50 p-2.5">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-ink">
            <input
              type="checkbox"
              checked={profile.showFollowerCount}
              onChange={(e) => onUpdateProfile('showFollowerCount', e.target.checked)}
              className="rounded border-line text-brand focus:ring-brand"
            />
            Display Follower Count (only when authorized integration or real count is set)
          </label>
          {profile.showFollowerCount && (
            <div className="mt-2 pl-5">
              <label className="text-[10px] text-ink-muted">Follower Count Value</label>
              <input
                type="text"
                value={profile.followerCount ?? ''}
                onChange={(e) => onUpdateProfile('followerCount', e.target.value)}
                placeholder="e.g. 18.5k"
                className="mt-1 w-44 rounded border border-line bg-white px-2 py-1 text-xs text-ink focus:border-brand focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* ─── 3. Instagram Posts Management ───────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Instagram Posts Gallery ({posts.length} posts)
          </h3>
          <button
            type="button"
            onClick={onAddPost}
            className="inline-flex items-center gap-1 rounded bg-brand px-2.5 py-1 text-xs font-medium text-white hover:bg-brand-hover shadow-2xs"
          >
            <PlusIcon className="h-3 w-3" /> Add Post
          </button>
        </div>

        <div className="space-y-2.5">
          {posts.map((post, idx) => {
            const isExpanded = expandedPostId === post.id;
            const isVideo = post.mediaType === 'video';

            return (
              <div
                key={post.id}
                className={`rounded-lg border transition-all ${
                  post.active ? 'border-line bg-white' : 'border-dashed border-line/80 bg-surface/50 opacity-70'
                }`}
              >
                {/* Compact Card Header */}
                <div className="flex items-center justify-between p-2.5">
                  <div
                    className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                    onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-[10px] font-semibold text-ink-muted">
                      {idx + 1}
                    </span>
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-product border border-line">
                      <img src={post.imageUrl} alt="" className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 right-0 rounded-tl bg-black/60 p-0.5 text-white">
                        {isVideo ? <VideoIcon className="h-2.5 w-2.5" /> : <InstagramIcon className="h-2.5 w-2.5" />}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-ink">
                        {post.caption || 'Nelum Beauty Instagram post'}
                      </p>
                      <p className="truncate text-[10px] text-ink-muted">
                        {isVideo ? 'Reel / Video' : 'Photo Post'} • {post.postUrl}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={() => onMovePost(idx, 'up')}
                      disabled={idx === 0}
                      className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-surface disabled:opacity-30"
                      title="Move post up"
                    >
                      <ArrowUpIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onMovePost(idx, 'down')}
                      disabled={idx === posts.length - 1}
                      className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-surface disabled:opacity-30"
                      title="Move post down"
                    >
                      <ArrowDownIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onTogglePostActive(post.id)}
                      className={`flex h-7 w-7 items-center justify-center rounded ${
                        post.active ? 'text-brand hover:bg-brand-soft' : 'text-ink-muted hover:bg-surface'
                      }`}
                      title={post.active ? 'Hide post' : 'Show post'}
                    >
                      {post.active ? <EyeIcon className="h-3.5 w-3.5" /> : <EyeOffIcon className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemovePost(post.id)}
                      className="flex h-7 w-7 items-center justify-center rounded text-ink-muted hover:bg-error-soft hover:text-error"
                      title="Delete post"
                    >
                      <Trash2Icon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Post Editor */}
                {isExpanded && (
                  <div className="border-t border-line/70 bg-surface/30 p-3.5 space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-medium text-ink-muted">Media Type</label>
                        <select
                          value={post.mediaType}
                          onChange={(e) => onUpdatePost(post.id, 'mediaType', e.target.value)}
                          className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                        >
                          <option value="image">Photo Post</option>
                          <option value="video">Reel / Video</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-ink-muted">Quick Asset Preset</label>
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              onUpdatePost(post.id, 'imageUrl', e.target.value);
                            }
                          }}
                          className="mt-1 w-full rounded border border-line bg-white px-2 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                        >
                          <option value="">Select image asset...</option>
                          <option value={img.creamJar}>Cream Jar</option>
                          <option value={img.serum}>Botanical Serum</option>
                          <option value={img.editorialRoutine}>Hydration Routine</option>
                          <option value={img.lipstick}>Velvet Lipstick</option>
                          <option value={img.sunscreen}>Mineral SPF</option>
                          <option value={img.campaignSkincare}>Campaign Skincare</option>
                          <option value={img.palette}>Eyeshadow Palette</option>
                          <option value={img.cleanser}>Gentle Cleanser</option>
                          <option value={img.perfume}>Botanical Fragrance</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-medium text-ink-muted">Image / Thumbnail URL</label>
                      <input
                        type="text"
                        value={post.imageUrl}
                        onChange={(e) => onUpdatePost(post.id, 'imageUrl', e.target.value)}
                        placeholder="/path/to/image.jpg or https://..."
                        className="mt-1 w-full rounded border border-line bg-white px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-medium text-ink-muted">
                        Original Instagram Post or Reel URL
                      </label>
                      <input
                        type="text"
                        value={post.postUrl}
                        onChange={(e) => onUpdatePost(post.id, 'postUrl', e.target.value)}
                        placeholder="https://www.instagram.com/p/... or https://www.instagram.com/reel/..."
                        className="mt-1 w-full rounded border border-line bg-white px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-medium text-ink-muted">Caption (displayed on hover)</label>
                      <textarea
                        rows={2}
                        value={post.caption ?? ''}
                        onChange={(e) => onUpdatePost(post.id, 'caption', e.target.value)}
                        placeholder="Short post caption or product highlight..."
                        className="mt-1 w-full rounded border border-line bg-white p-2 text-xs text-ink focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-medium text-ink-muted">Image Alt Text (Accessibility)</label>
                      <input
                        type="text"
                        value={post.altText}
                        onChange={(e) => onUpdatePost(post.id, 'altText', e.target.value)}
                        placeholder="Describe the image content..."
                        className="mt-1 w-full rounded border border-line bg-white px-2.5 py-1.5 text-xs text-ink focus:border-brand focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

