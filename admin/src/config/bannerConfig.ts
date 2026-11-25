import { img } from '../data/images';
import { readStorage, writeStorage } from '../utils/storage';

export interface HeroBannerSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  desktopImage: string;
  mobileImage?: string;
  imageAlt: string;
  textAlignment: 'left' | 'center' | 'right';
  tone: 'blush' | 'sage' | 'rose' | 'sand' | 'ivory';
  order: number;
  active: boolean;
  startDate?: string; // ISO date string YYYY-MM-DD
  endDate?: string;   // ISO date string YYYY-MM-DD
}

export interface BannerSliderSettings {
  autoplay: boolean;
  slideDuration: number; // in milliseconds (e.g. 5000)
  transitionEffect: 'slide' | 'fade';
  pauseOnHover: boolean;
}

/* ─── 5 Initial Campaign Slides ─────────────────────────────────────────────── */
export const defaultBannerSlides: HeroBannerSlide[] = [
  {
    id: 'slide-brand',
    eyebrow: 'INTRODUCING NELUM BEAUTY',
    title: 'Beauty that feels as good as it looks.',
    description: 'Dermatologist-tested skincare and beauty essentials crafted for tropical climates and everyday radiance.',
    ctaText: 'Shop Best Sellers',
    ctaUrl: '/collection/best-sellers',
    secondaryCtaText: 'Explore Skincare',
    secondaryCtaUrl: '/category/skincare',
    desktopImage: img.hero,
    mobileImage: img.hero,
    imageAlt: 'Radiant model with glowing skin holding a frosted skincare bottle',
    textAlignment: 'left',
    tone: 'blush',
    order: 1,
    active: true,
  },
  {
    id: 'slide-skincare',
    eyebrow: 'THE DAILY GLOW EDIT',
    title: 'Hydration, barrier health & essential daily SPF.',
    description: 'Lightweight actives, soothing botanicals and non-greasy sun protection formulated for warm, humid weather.',
    ctaText: 'Shop Skincare Collection',
    ctaUrl: '/category/skincare',
    secondaryCtaText: 'Find Your Routine',
    secondaryCtaUrl: '/discover',
    desktopImage: img.campaignSkincare,
    mobileImage: img.campaignSkincare,
    imageAlt: 'Curated skincare bottles and restorative facial cream jars',
    textAlignment: 'left',
    tone: 'sage',
    order: 2,
    active: true,
  },
  {
    id: 'slide-makeup',
    eyebrow: 'THE RADIANT COMPLEXION EDIT',
    title: 'Flawless, breathable finishes for South Asian undertones.',
    description: 'Serum foundations, velvety matte lipsticks and buildable cream blushes designed for all-day comfort.',
    ctaText: 'Discover Makeup',
    ctaUrl: '/category/makeup',
    secondaryCtaText: 'View Lip Shades',
    secondaryCtaUrl: '/category/makeup/lips',
    desktopImage: img.campaignMakeup,
    mobileImage: img.campaignMakeup,
    imageAlt: 'High-fashion model featuring luminous radiant makeup and satin lip colour',
    textAlignment: 'left',
    tone: 'rose',
    order: 3,
    active: true,
  },
  {
    id: 'slide-offers',
    eyebrow: 'LIMITED-TIME PROMOTION',
    title: 'Up to 20% off selected favourites & curated sets.',
    description: 'Special seasonal prices on island favourites, anti-aging ampoules and luxury fragrance mists.',
    ctaText: 'Shop Special Offers',
    ctaUrl: '/collection/offers',
    secondaryCtaText: 'Gift Sets',
    secondaryCtaUrl: '/collection/gift-sets',
    desktopImage: img.journalSunscreen,
    mobileImage: img.journalSunscreen,
    imageAlt: 'Golden hour sunlight illuminating luxury skincare serums and treatments',
    textAlignment: 'left',
    tone: 'sand',
    order: 4,
    active: true,
  },
  {
    id: 'slide-new',
    eyebrow: 'JUST ARRIVED ON SHELVES',
    title: 'Fresh beauty drops from Seoul, Colombo & Paris.',
    description: 'Explore this week’s newly arrived clean botanical cleansers, French haute parfumerie and Korean barrier science.',
    ctaText: 'Explore New In',
    ctaUrl: '/collection/new-arrivals',
    secondaryCtaText: 'Browse Brands',
    secondaryCtaUrl: '/brands',
    desktopImage: img.journalMakeup,
    mobileImage: img.journalMakeup,
    imageAlt: 'Contemporary beauty photography with elegant cosmetics and treatment textures',
    textAlignment: 'left',
    tone: 'ivory',
    order: 5,
    active: true,
  },
];

export const defaultSliderSettings: BannerSliderSettings = {
  autoplay: true,
  slideDuration: 3000,
  transitionEffect: 'slide',
  pauseOnHover: true,
};

/* ─── Promotional Marquee Messages ─────────────────────────────────────────── */
export interface MarqueeMessage {
  id: string;
  text: string;
  order: number;
  active: boolean;
}

export const defaultMarqueeMessages: MarqueeMessage[] = [
  { id: 'm1', text: 'Free Standard Delivery on Orders Over Rs. 10,000', order: 1, active: true },
  { id: 'm2', text: 'Discover Your New Beauty Essentials', order: 2, active: true },
  { id: 'm3', text: 'Shop Your Favourite International Beauty Brands', order: 3, active: true },
  { id: 'm4', text: 'Exclusive Beauty Offers & New Arrivals', order: 4, active: true },
];

/* ─── LocalStorage Persistence ─────────────────────────────────────────────── */
const STORAGE_BANNERS_KEY = 'admin:hero-banners-v1';
const STORAGE_SETTINGS_KEY = 'admin:hero-slider-settings-v1';
const STORAGE_MARQUEE_KEY = 'admin:hero-marquee-v1';

export function getStoredBanners(): HeroBannerSlide[] {
  return readStorage<HeroBannerSlide[]>(STORAGE_BANNERS_KEY, defaultBannerSlides);
}

export function saveStoredBanners(slides: HeroBannerSlide[]): void {
  writeStorage(STORAGE_BANNERS_KEY, slides);
}

export function getStoredSliderSettings(): BannerSliderSettings {
  return readStorage<BannerSliderSettings>(STORAGE_SETTINGS_KEY, defaultSliderSettings);
}

export function saveStoredSliderSettings(settings: BannerSliderSettings): void {
  writeStorage(STORAGE_SETTINGS_KEY, settings);
}

export function getStoredMarqueeMessages(): MarqueeMessage[] {
  return readStorage<MarqueeMessage[]>(STORAGE_MARQUEE_KEY, defaultMarqueeMessages);
}

export function saveStoredMarqueeMessages(messages: MarqueeMessage[]): void {
  writeStorage(STORAGE_MARQUEE_KEY, messages);
}

export function getActiveMarqueeMessages(messages?: MarqueeMessage[]): MarqueeMessage[] {
  const source = messages && Array.isArray(messages) && messages.length > 0 ? messages : getStoredMarqueeMessages();
  const active = (Array.isArray(source) ? source : defaultMarqueeMessages)
    .filter((m) => m && m.active)
    .sort((a, b) => a.order - b.order);
  return active.length > 0 ? active : defaultMarqueeMessages;
}

export function resetBannersToDefaults(): void {
  writeStorage(STORAGE_BANNERS_KEY, defaultBannerSlides);
  writeStorage(STORAGE_SETTINGS_KEY, defaultSliderSettings);
  writeStorage(STORAGE_MARQUEE_KEY, defaultMarqueeMessages);
}

/**
 * Filter slides that are active and within their scheduled date window (if configured).
 */
export function getActiveScheduledBanners(slides?: HeroBannerSlide[]): HeroBannerSlide[] {
  try {
    const source = slides && Array.isArray(slides) && slides.length > 0 ? slides : getStoredBanners();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const activeSlides = (Array.isArray(source) ? source : defaultBannerSlides)
      .filter((slide) => {
        if (!slide || !slide.active) return false;

        if (slide.startDate) {
          const start = new Date(slide.startDate);
          start.setHours(0, 0, 0, 0);
          if (now < start) return false;
        }

        if (slide.endDate) {
          const end = new Date(slide.endDate);
          end.setHours(23, 59, 59, 999);
          if (now > end) return false;
        }

        return true;
      })
      .sort((a, b) => a.order - b.order);

    return activeSlides.length > 0 ? activeSlides : defaultBannerSlides;
  } catch (err) {
    console.error('Error resolving active banners:', err);
    return defaultBannerSlides;
  }
}

