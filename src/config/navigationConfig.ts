import { img } from '../data/images';
import {
  catalogBrands,
  catalogCollections,
  catalogConcerns,
  catalogSkinTypes,
  getChildCategories,
  getTopCategories,
  getCategoryUrl,
} from '../utils/catalog';
import { readStorage, writeStorage } from '../utils/storage';

export interface AnnouncementMessage {
  id: string;
  text: string;
  linkLabel?: string;
  href?: string;
  link?: string;
  active: boolean;
}

export interface PromoCardConfig {
  image: string;
  title: string;
  description?: string;
  href: string;
  cta: string;
}

export type MegaMenuType =
  | 'shop'
  | 'discover'
  | 'brands'
  | 'none';

export interface NavigationItemConfig {
  id: string;
  label: string;
  href: string;
  order: number;
  published: boolean;
  megaMenuType: MegaMenuType;
  badge?: string;
  badgeVariant?: 'brand' | 'sage' | 'accent';
  promoCard?: PromoCardConfig;
}

export interface MegaMenuColumn {
  heading: string;
  headingHref?: string;
  links: {
    label: string;
    href: string;
    badge?: string;
  }[];
}

export interface MegaMenuData {
  columns: MegaMenuColumn[];
  featuredBrands?: {
    id: string;
    name: string;
    slug: string;
    origin: string;
    logo?: string;
  }[];
  promoCard?: PromoCardConfig;
  footerLink?: {
    label: string;
    href: string;
  };
}

/* ─── Default Announcements (Managed by Admin Panel) ────────────────────────── */
export const defaultAnnouncements: AnnouncementMessage[] = [
  {
    id: 'ann-1',
    text: 'Free standard delivery across Sri Lanka on orders over Rs 10,000',
    linkLabel: 'Delivery details',
    href: '/delivery-information',
    active: true,
  },
  {
    id: 'ann-2',
    text: 'Seasonal Edit: Up to 20% off selected serums, palettes & fragrance',
    linkLabel: 'Shop Offers',
    href: '/collection/offers',
    active: true,
  },
];

/* ─── Default Navigation Menu Items (Order & Visibility manageable via Admin) ─ */
/* 
 * Streamlined luxury beauty navigation:
 * 1. Shop (mega-menu)
 * 2. Discover (mega-menu)
 * 3. New In
 * 4. Best Sellers
 * 5. Brands
 * 6. Offers
 */
export const defaultNavigationItems: NavigationItemConfig[] = [
  {
    id: 'shop',
    label: 'Shop',
    href: '/shop',
    order: 1,
    published: true,
    megaMenuType: 'shop',
    promoCard: {
      image: img.editorialRoutine,
      title: 'Curated Daily Essentials',
      description: 'Dermatologist-tested skincare and beauty formulas formulated for daily glow.',
      href: '/shop',
      cta: 'Shop All Products',
    },
  },
  {
    id: 'discover',
    label: 'Discover',
    href: '/discover',
    order: 2,
    published: true,
    megaMenuType: 'discover',
    promoCard: {
      image: img.editorialIngredients,
      title: 'Find What Works',
      description: 'Explore active ingredients and routines tailored for your skin type.',
      href: '/routines',
      cta: 'Read the Guides',
    },
  },
  {
    id: 'new-in',
    label: 'New In',
    href: '/collection/new-arrivals',
    order: 3,
    published: true,
    megaMenuType: 'none',
  },
  {
    id: 'best-sellers',
    label: 'Best Sellers',
    href: '/collection/best-sellers',
    order: 4,
    published: true,
    megaMenuType: 'none',
  },
  {
    id: 'brands',
    label: 'Brands',
    href: '/brands',
    order: 5,
    published: true,
    megaMenuType: 'brands',
  },
  {
    id: 'offers',
    label: 'Offers',
    href: '/collection/offers',
    order: 6,
    published: true,
    megaMenuType: 'none',
    badge: 'OFFERS',
    badgeVariant: 'brand',
  },
];

/* ─── LocalStorage Persistence for Admin Management ────────────────────────── */
const STORAGE_ANNOUNCEMENTS_KEY = 'admin:announcements';
const STORAGE_NAV_ITEMS_KEY = 'admin:navigation-items-v2';

export function getStoredAnnouncements(): AnnouncementMessage[] {
  return readStorage<AnnouncementMessage[]>(STORAGE_ANNOUNCEMENTS_KEY, defaultAnnouncements);
}

export function saveStoredAnnouncements(messages: AnnouncementMessage[]): void {
  writeStorage(STORAGE_ANNOUNCEMENTS_KEY, messages);
}

export function getStoredNavigationItems(): NavigationItemConfig[] {
  return readStorage<NavigationItemConfig[]>(STORAGE_NAV_ITEMS_KEY, defaultNavigationItems);
}

export function saveStoredNavigationItems(items: NavigationItemConfig[]): void {
  writeStorage(STORAGE_NAV_ITEMS_KEY, items);
}

export function resetNavigationToDefaults(): void {
  writeStorage(STORAGE_ANNOUNCEMENTS_KEY, defaultAnnouncements);
  writeStorage(STORAGE_NAV_ITEMS_KEY, defaultNavigationItems);
}

/* ─── Dynamic Mega Menu Resolvers (Using Published Catalog Data) ───────────── */
export function resolveMegaMenu(type: MegaMenuType, customPromo?: PromoCardConfig): MegaMenuData | null {
  switch (type) {
    case 'shop': {
      // Dynamic columns from published top categories and their children
      const topCats = getTopCategories();
      const catCols: MegaMenuColumn[] = topCats.slice(0, 4).map((top) => {
        const children = getChildCategories(top.id);
        return {
          heading: top.name,
          headingHref: getCategoryUrl(top),
          links: [
            { label: `All ${top.name}`, href: getCategoryUrl(top) },
            ...children.map((child) => ({
              label: child.name,
              href: getCategoryUrl(child),
            })),
          ],
        };
      });

      // Collections column
      const collectionCol: MegaMenuColumn = {
        heading: 'Curated Collections',
        headingHref: '/collections',
        links: [
          { label: 'Shop All Products', href: '/shop' },
          ...catalogCollections.map((col) => ({
            label: col.name,
            href: `/collection/${col.slug}`,
          })),
        ],
      };

      return {
        columns: [collectionCol, ...catCols],
        promoCard: customPromo ?? {
          image: img.editorialRoutine,
          title: 'The Daily Glow Edit',
          description: 'Carefully curated essentials designed for humid and tropical weather.',
          href: '/shop',
          cta: 'Shop All',
        },
        footerLink: {
          label: 'View all products & curated collections →',
          href: '/shop',
        },
      };
    }

    case 'discover': {
      return {
        columns: [
          {
            heading: 'Shop by Skin Type',
            headingHref: '/discover#skin-types',
            links: catalogSkinTypes.map((st) => ({
              label: `${st.name} Skin`,
              href: `/skin-type/${st.slug}`,
            })),
          },
          {
            heading: 'Shop by Skin Concern',
            headingHref: '/discover#concerns',
            links: catalogConcerns.slice(0, 6).map((c) => ({
              label: c.name,
              href: `/skin-concern/${c.slug}`,
            })),
          },
          {
            heading: 'Beauty Journal & Guides',
            headingHref: '/journal',
            links: [
              { label: 'Routine Guides', href: '/routines' },
              { label: 'Ingredients Glossary', href: '/ingredients' },
              { label: 'Beauty Journal', href: '/journal' },
              { label: 'Delivery & FAQs', href: '/faqs' },
            ],
          },
        ],
        promoCard: customPromo ?? {
          image: img.editorialIngredients,
          title: 'Build a Routine That Fits You',
          description: 'Tailored steps and ingredient combinations for lasting radiance.',
          href: '/routines',
          cta: 'Read the Guides',
        },
        footerLink: {
          label: 'Visit the Skin Discovery Hub →',
          href: '/discover',
        },
      };
    }

    case 'brands': {
      const publishedBrands = catalogBrands.slice(0, 8);
      return {
        columns: [
          {
            heading: 'Featured Brands',
            headingHref: '/brands',
            links: publishedBrands.slice(0, 4).map((b) => ({
              label: b.name,
              href: `/brand/${b.slug}`,
            })),
          },
          {
            heading: 'Global & Ceylon Partners',
            headingHref: '/brands',
            links: publishedBrands.slice(4, 8).map((b) => ({
              label: b.name,
              href: `/brand/${b.slug}`,
            })),
          },
          {
            heading: 'By Origin',
            headingHref: '/brands',
            links: [
              { label: 'Sri Lankan Botanicals', href: '/brands' },
              { label: 'Korean Skincare (K-Beauty)', href: '/brands' },
              { label: 'Japanese Layering Rituals', href: '/brands' },
              { label: 'French Haute Beauté', href: '/brands' },
            ],
          },
        ],
        featuredBrands: publishedBrands.map((b) => ({
          id: b.id,
          name: b.name,
          slug: b.slug,
          origin: b.origin,
          logo: b.logo,
        })),
        promoCard: customPromo ?? {
          image: img.cleanser,
          title: 'Authorized Brand Partners',
          description: '100% authentic formulas sourced directly from authorised distributors.',
          href: '/brands',
          cta: 'Explore Brands',
        },
        footerLink: {
          label: 'Explore all authorized brand partners →',
          href: '/brands',
        },
      };
    }

    default:
      return null;
  }
}

