import { img } from '../data/images';
import { readStorage, writeStorage } from '../utils/storage';

export type InstagramMediaType = 'image' | 'video';

export interface InstagramPost {
  id: string;
  imageUrl: string;
  postUrl: string;
  caption?: string;
  mediaType: InstagramMediaType;
  altText: string;
  order: number;
  active: boolean;
  publishedAt?: string;
}

export interface InstagramProfileConfig {
  username: string;
  profileUrl: string;
  profileImage: string;
  sectionHeading: string;
  supportingHeading: string;
  description: string;
  ctaText: string;
  showFollowerCount: boolean;
  followerCount?: string;
}

export interface InstagramSectionSettings {
  enabled: boolean;
  postsCount: number;
  columnsDesktop: 4 | 5 | 6;
  columnsTablet: 3 | 4;
  columnsMobile: 2 | 3;
  background: 'ivory' | 'white' | 'blush';
  // Optional authorized API integration settings
  apiEndpoint?: string;
  apiAccessToken?: string;
  autoRefreshFeed?: boolean;
}

/* ─── Default Profile Information ────────────────────────────────────────── */
export const defaultInstagramProfile: InstagramProfileConfig = {
  username: '@nelumbeauty',
  profileUrl: 'https://instagram.com/nelumbeauty',
  profileImage: img.serum,
  sectionHeading: 'Stay Connected',
  supportingHeading: 'Follow Us on Instagram',
  description:
    'Discover beauty inspiration, skincare tips, new arrivals and everyday favourites. Join our beauty community and stay connected with us.',
  ctaText: 'Follow Us on Instagram',
  showFollowerCount: false,
  followerCount: '18.5k',
};

/* ─── Default Section Settings (10 Posts in 5-Col × 2-Row Grid) ─────────── */
export const defaultInstagramSettings: InstagramSectionSettings = {
  enabled: true,
  postsCount: 10,
  columnsDesktop: 5,
  columnsTablet: 3,
  columnsMobile: 2,
  background: 'white',
  autoRefreshFeed: false,
};

/* ─── 10 Curated Recent Instagram Posts (Chronological, Newest First) ────── */
export const defaultInstagramPosts: InstagramPost[] = [
  {
    id: 'ig-post-1',
    imageUrl: img.creamJar,
    postUrl: 'https://www.instagram.com/nelumbeauty/p/C3mNelum01/',
    caption: 'Restorative Barrier Cream: rich hydration formulated for humid island days.',
    mediaType: 'image',
    altText: 'Glass jar of Nelum restorative facial barrier moisturiser on warm stone',
    order: 1,
    active: true,
    publishedAt: '2026-04-18T10:00:00Z',
  },
  {
    id: 'ig-post-2',
    imageUrl: img.serum,
    postUrl: 'https://www.instagram.com/nelumbeauty/p/C3mNelum02/',
    caption: 'New Arrival: Botanical Vitamin C Radiance Serum for daily luminous glow.',
    mediaType: 'image',
    altText: 'Amber glass serum dropper bottle with golden botanical facial oil',
    order: 2,
    active: true,
    publishedAt: '2026-04-16T14:30:00Z',
  },
  {
    id: 'ig-post-3',
    imageUrl: img.editorialRoutine,
    postUrl: 'https://www.instagram.com/nelumbeauty/reel/C3mNelum03/',
    caption: 'Watch: 5-minute morning hydration ritual for tropical skin comfort.',
    mediaType: 'video',
    altText: 'Beauty tutorial demonstration showcasing soothing facial essence routine',
    order: 3,
    active: true,
    publishedAt: '2026-04-14T09:15:00Z',
  },
  {
    id: 'ig-post-4',
    imageUrl: img.lipstick,
    postUrl: 'https://www.instagram.com/nelumbeauty/p/C3mNelum04/',
    caption: 'Velvet Rose Satin Lip Edit: weightless colour tailored for warm undertones.',
    mediaType: 'image',
    altText: 'Sleek luxury rose-gold lipstick tube with velvety dusty-rose bullet',
    order: 4,
    active: true,
    publishedAt: '2026-04-12T16:00:00Z',
  },
  {
    id: 'ig-post-5',
    imageUrl: img.palette,
    postUrl: 'https://www.instagram.com/nelumbeauty/p/C3mNelum05/',
    caption: 'Radiant Complexion Palette: blendable, breathable shimmer for warm skin tones.',
    mediaType: 'image',
    altText: 'Multi-pan cosmetic eyeshadow and highlighter palette flat lay',
    order: 5,
    active: true,
    publishedAt: '2026-04-10T11:20:00Z',
  },
  {
    id: 'ig-post-6',
    imageUrl: img.sunscreen,
    postUrl: 'https://www.instagram.com/nelumbeauty/p/C3mNelum06/',
    caption: 'Daily Mineral SPF 50: zero white cast, non-sticky matte finish for everyday protection.',
    mediaType: 'image',
    altText: 'Clean minimalist sunscreen tube with hydrating lightweight UV shield lotion',
    order: 6,
    active: true,
    publishedAt: '2026-04-08T11:45:00Z',
  },
  {
    id: 'ig-post-7',
    imageUrl: img.cleanser,
    postUrl: 'https://www.instagram.com/nelumbeauty/reel/C3mNelum07/',
    caption: 'Watch: Gentle Cleansing Melt melts away waterproof sunscreen and daily buildup.',
    mediaType: 'video',
    altText: 'Gentle purifying botanical facial cleanser gel pump bottle',
    order: 7,
    active: true,
    publishedAt: '2026-04-06T13:10:00Z',
  },
  {
    id: 'ig-post-8',
    imageUrl: img.campaignSkincare,
    postUrl: 'https://www.instagram.com/nelumbeauty/reel/C3mNelum08/',
    caption: 'Behind the glow: inside our curated botanical collection & editorial shoot.',
    mediaType: 'video',
    altText: 'Editorial lifestyle skincare collection flat lay featuring frosted glass bottles',
    order: 8,
    active: true,
    publishedAt: '2026-04-04T15:20:00Z',
  },
  {
    id: 'ig-post-9',
    imageUrl: img.clayMask,
    postUrl: 'https://www.instagram.com/nelumbeauty/p/C3mNelum09/',
    caption: 'Sunday Self-Care: clarifying pink clay mask for smooth pore refinement.',
    mediaType: 'image',
    altText: 'Earthenware jar of restorative pink botanical clay facial mask',
    order: 9,
    active: true,
    publishedAt: '2026-04-02T18:00:00Z',
  },
  {
    id: 'ig-post-10',
    imageUrl: img.perfume,
    postUrl: 'https://www.instagram.com/nelumbeauty/p/C3mNelum10/',
    caption: 'Island Jasmine & Lotus: luminous botanical fragrance inspired by Ceylon dawn.',
    mediaType: 'image',
    altText: 'Faceted glass perfume bottle with natural golden fragrance essence',
    order: 10,
    active: true,
    publishedAt: '2026-03-31T17:40:00Z',
  },
];

/* ─── LocalStorage Keys ──────────────────────────────────────────────────── */
const STORAGE_KEYS = {
  PROFILE: 'instagram_profile',
  POSTS: 'instagram_posts',
  SETTINGS: 'instagram_settings',
  CACHE: 'instagram_feed_cache',
};

/* ─── Storage Getters ────────────────────────────────────────────────────── */
export function getStoredInstagramProfile(): InstagramProfileConfig {
  return readStorage<InstagramProfileConfig>(STORAGE_KEYS.PROFILE, defaultInstagramProfile);
}

export function getStoredInstagramPosts(): InstagramPost[] {
  const posts = readStorage<InstagramPost[]>(STORAGE_KEYS.POSTS, defaultInstagramPosts);
  if (!Array.isArray(posts) || posts.length === 0) {
    return defaultInstagramPosts;
  }
  // If stored posts are fewer than 10 from previous defaults, automatically upgrade to full 10 default posts
  if (posts.length < 10 && posts.every((p) => defaultInstagramPosts.some((dp) => dp.id === p.id))) {
    return defaultInstagramPosts;
  }
  return posts;
}

export function getStoredInstagramSettings(): InstagramSectionSettings {
  const settings = readStorage<InstagramSectionSettings>(STORAGE_KEYS.SETTINGS, defaultInstagramSettings);
  // Auto-upgrade previous default 6 columns/posts to the new 5 columns × 2 rows (10 posts)
  if (!settings.postsCount || settings.postsCount === 6) {
    settings.postsCount = 10;
  }
  if (!settings.columnsDesktop || settings.columnsDesktop === 6) {
    settings.columnsDesktop = 5;
  }
  return settings;
}

/* ─── Storage Setters ────────────────────────────────────────────────────── */
export function saveStoredInstagramProfile(profile: InstagramProfileConfig): void {
  writeStorage(STORAGE_KEYS.PROFILE, profile);
  notifyInstagramUpdated();
}

export function saveStoredInstagramPosts(posts: InstagramPost[]): void {
  writeStorage(STORAGE_KEYS.POSTS, posts);
  notifyInstagramUpdated();
}

export function saveStoredInstagramSettings(settings: InstagramSectionSettings): void {
  writeStorage(STORAGE_KEYS.SETTINGS, settings);
  notifyInstagramUpdated();
}

export function resetInstagramToDefaults(): void {
  writeStorage(STORAGE_KEYS.PROFILE, defaultInstagramProfile);
  writeStorage(STORAGE_KEYS.POSTS, defaultInstagramPosts);
  writeStorage(STORAGE_KEYS.SETTINGS, defaultInstagramSettings);
  notifyInstagramUpdated();
}

/* ─── Active Posts Resolver ──────────────────────────────────────────────── */
export function getActiveInstagramPosts(): InstagramPost[] {
  try {
    const posts = getStoredInstagramPosts();
    const settings = getStoredInstagramSettings();
    const limit = settings.postsCount || 10;

    const active = posts
      .filter((p) => p && p.active)
      .sort((a, b) => a.order - b.order);

    return active.length > 0 ? active.slice(0, limit) : defaultInstagramPosts.slice(0, limit);
  } catch (err) {
    console.error('Failed to resolve active Instagram posts:', err);
    return defaultInstagramPosts;
  }
}

/* ─── Event Notifier ─────────────────────────────────────────────────────── */
function notifyInstagramUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('nelum:instagram-updated'));
    window.dispatchEvent(new Event('storage'));
  }
}

/* ─── Optional API Integration / Cache Handler ───────────────────────────── */
interface CacheEntry {
  timestamp: number;
  data: InstagramPost[];
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function fetchInstagramFeedWithFallback(
  settings: InstagramSectionSettings
): Promise<InstagramPost[]> {
  // If no external endpoint is configured or auto-refresh is disabled, return manual posts
  if (!settings.apiEndpoint || !settings.autoRefreshFeed) {
    return getActiveInstagramPosts();
  }

  // Check cache
  const cached = readStorage<CacheEntry | null>(STORAGE_KEYS.CACHE, null);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS && Array.isArray(cached.data)) {
    return cached.data;
  }

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (settings.apiAccessToken) {
      headers.Authorization = `Bearer ${settings.apiAccessToken}`;
    }

    const response = await fetch(settings.apiEndpoint, { headers });
    if (!response.ok) {
      throw new Error(`Feed request failed with status: ${response.status}`);
    }

    const json = await response.json();
    const remoteItems = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];

    if (remoteItems.length > 0) {
      const mapped: InstagramPost[] = remoteItems.map((item: any, idx: number) => ({
        id: item.id || `remote-${idx}`,
        imageUrl: item.media_url || item.thumbnail_url || item.image || img.serum,
        postUrl: item.permalink || item.url || settings.apiEndpoint || 'https://instagram.com/nelumbeauty',
        caption: item.caption || '',
        mediaType: item.media_type === 'VIDEO' ? 'video' : 'image',
        altText: item.caption ? item.caption.slice(0, 100) : 'Nelum Beauty Instagram post',
        order: idx + 1,
        active: true,
        publishedAt: item.timestamp,
      }));

      writeStorage<CacheEntry>(STORAGE_KEYS.CACHE, {
        timestamp: Date.now(),
        data: mapped,
      });

      return mapped.slice(0, settings.postsCount || 6);
    }
  } catch (err) {
    console.warn('Authorized Instagram feed fetch error (falling back to stored posts):', err);
  }

  return getActiveInstagramPosts();
}

