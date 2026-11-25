import { img } from '../data/images';
import type { Brand, Product } from '../types/catalog';
import {
  catalogBrands,
  catalogProducts,
  catalogConcerns,
  catalogSkinTypes,
  getCategoryById,
  getCategoryUrl,
  isOnSale,
  productsByBrand,
  productsInCategory,
} from '../utils/catalog';
import { readStorage, writeStorage } from '../utils/storage';

/* ═══════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════ */

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
  | 'makeup'
  | 'skincare'
  | 'haircare'
  | 'bath-body'
  | 'fragrance'
  | 'brands'
  | 'offers'
  | 'none';

export interface NavigationItemConfig {
  id: string;
  label: string;
  href: string;
  order: number;
  published: boolean;
  megaMenuType: MegaMenuType;
  /** Subtle accent styling (used for Offers). */
  accent?: boolean;
  badge?: string;
  badgeVariant?: 'brand' | 'sage' | 'accent';
  promoCard?: PromoCardConfig;
}

export interface MegaMenuLink {
  label: string;
  href: string;
  badge?: string;
}

export interface MegaMenuColumn {
  heading: string;
  headingHref?: string;
  links: MegaMenuLink[];
}

export interface MegaMenuData {
  columns: MegaMenuColumn[];
  /** "Shop All …" link shown prominently in the panel. */
  shopAll?: { label: string; href: string };
  promoCard?: PromoCardConfig;
  /** Optional product spotlight (e.g. live offers). */
  spotlight?: { heading: string; products: Product[] };
  /** Kept for backwards compatibility with older admin data. */
  featuredBrands?: { id: string; name: string; slug: string; origin: string; logo?: string }[];
  footerLink?: { label: string; href: string };
}

/* ═══════════════════════════════════════════════════════════════════
   Announcements & navigation items (admin-manageable, persisted)
   ═══════════════════════════════════════════════════════════════════ */

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

export const defaultNavigationItems: NavigationItemConfig[] = [
  { id: 'new-in', label: 'New In', href: '/collection/new-arrivals', order: 1, published: true, megaMenuType: 'none' },
  { id: 'makeup', label: 'Makeup', href: '/category/makeup', order: 2, published: true, megaMenuType: 'makeup' },
  { id: 'skincare', label: 'Skincare', href: '/category/skincare', order: 3, published: true, megaMenuType: 'skincare' },
  { id: 'haircare', label: 'Haircare', href: '/category/hair-care', order: 4, published: true, megaMenuType: 'haircare' },
  { id: 'bath-body', label: 'Bath & Body', href: '/category/body-care', order: 5, published: true, megaMenuType: 'bath-body' },
  { id: 'fragrance', label: 'Fragrance', href: '/category/fragrance', order: 6, published: true, megaMenuType: 'fragrance' },
  { id: 'brands', label: 'Brands', href: '/brands', order: 7, published: true, megaMenuType: 'brands' },
  { id: 'offers', label: 'Offers', href: '/collection/offers', order: 8, published: true, megaMenuType: 'offers', accent: true },
];

const STORAGE_ANNOUNCEMENTS_KEY = 'admin:announcements';
// v3: new category-led navigation. Older saved menus (v2) are intentionally not migrated.
const STORAGE_NAV_ITEMS_KEY = 'admin:navigation-items-v3';

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

/* ═══════════════════════════════════════════════════════════════════
   Catalogue-driven link resolution
   A link is described by what it *matches* in the catalogue; it is only
   shown when at least one published product matches, and its URL is
   derived from catalogue data.
   ═══════════════════════════════════════════════════════════════════ */

type LinkDef = {
  label: string;
  /** Category ids (descendants included). */
  categories?: string[];
  /** Exact product types (narrows within the categories). */
  types?: string[];
  /** Product tags (e.g. 'gift' for sets). */
  tags?: string[];
  /** Explicit destination (static routes, collections). */
  href?: string;
  /** Show even with no matching products (static pages). */
  always?: boolean;
};

function matchingProducts(def: LinkDef): Product[] {
  let list: Product[] = [...catalogProducts];
  if (def.categories?.length) {
    const ids = new Set(def.categories.flatMap((c) => productsInCategory(c).map((p) => p.id)));
    list = list.filter((p) => ids.has(p.id));
  }
  if (def.types?.length) list = list.filter((p) => def.types!.includes(p.productType));
  if (def.tags?.length) list = list.filter((p) => p.tags.some((t) => def.tags!.includes(t)));
  return list;
}

function hrefFor(def: LinkDef): string {
  if (def.href) return def.href;
  const cats = (def.categories ?? []).map(getCategoryById).filter(Boolean);
  // A single category with no narrowing → its own page
  if (cats.length === 1 && !def.types?.length && !def.tags?.length) return getCategoryUrl(cats[0]!);
  // A single category narrowed by type → category page with type filter
  if (cats.length === 1 && def.types?.length) return `${getCategoryUrl(cats[0]!)}?type=${encodeURIComponent(def.types.join(','))}`;
  // Spans several categories → shop-all with type filter (or plain shop-all)
  const types = def.types?.length ? def.types : Array.from(new Set(matchingProducts(def).map((p) => p.productType)));
  return `/shop?type=${encodeURIComponent(types.join(','))}`;
}

function resolveLinks(defs: LinkDef[]): MegaMenuLink[] {
  return defs
    .filter((d) => d.always || matchingProducts(d).length > 0)
    .map((d) => ({ label: d.label, href: hrefFor(d) }));
}

/** Brands that stock products in the given categories, best-selling first. */
function brandsIn(categories: string[], limit = 6): Brand[] {
  const products = categories.flatMap(productsInCategory);
  const rank = new Map<string, number>();
  products.forEach((p) => rank.set(p.brandId, Math.min(rank.get(p.brandId) ?? Infinity, p.salesRank)));
  return catalogBrands
    .filter((b) => rank.has(b.id))
    .sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0))
    .slice(0, limit);
}

const brandLinks = (brands: Brand[]): MegaMenuLink[] => brands.map((b) => ({ label: b.name, href: `/brand/${b.slug}` }));

/* ─── Menu definitions ─────────────────────────────────────────────── */

type CategoryMenuDef = {
  label: string;
  /** Category ids that make up this department. */
  departments: string[];
  shopAllHref: string;
  subcategories: LinkDef[];
  explore?: LinkDef[];
  promo: PromoCardConfig;
};

const CATEGORY_MENUS: Record<'makeup' | 'skincare' | 'haircare' | 'bath-body' | 'fragrance', CategoryMenuDef> = {
  makeup: {
    label: 'Makeup',
    departments: ['makeup', 'beauty-tools'],
    shopAllHref: '/category/makeup',
    subcategories: [
      { label: 'Face', categories: ['face-makeup'] },
      { label: 'Eyes', categories: ['eyes'] },
      { label: 'Lips', categories: ['lips'] },
      { label: 'Nails', categories: ['nail-care'] },
      { label: 'Makeup Tools', categories: ['brushes-tools'] },
      { label: 'Makeup Sets', categories: ['makeup', 'beauty-tools'], tags: ['gift'], href: '/collection/gift-sets' },
    ],
    promo: {
      image: img.journalMakeup,
      title: 'The Colour Edit',
      description: 'Skin-like bases, soft flushes and lasting lips for every skin tone.',
      href: '/category/makeup',
      cta: 'Discover makeup',
    },
  },
  skincare: {
    label: 'Skincare',
    departments: ['skincare', 'face-creams-serums'],
    shopAllHref: '/category/skincare',
    subcategories: [
      { label: 'Cleansers', categories: ['cleansers'] },
      { label: 'Toners', categories: ['toners'] },
      { label: 'Serums', categories: ['face-serums'] },
      { label: 'Moisturizers', categories: ['moisturisers', 'day-night-creams'] },
      { label: 'Sunscreen', categories: ['sunscreens'] },
      { label: 'Face Masks', categories: ['masks-treatments'] },
      { label: 'Eye Care', categories: ['eye-creams-oils'], types: ['Eye cream'] },
      { label: 'Skincare Sets', categories: ['skincare', 'face-creams-serums'], tags: ['gift'], href: '/collection/gift-sets' },
    ],
    explore: [
      ...catalogSkinTypes.slice(0, 5).map((s) => ({ label: s.name, href: `/skin-type/${s.slug}`, always: true })),
    ],
    promo: {
      image: img.editorialRoutine,
      title: 'The Daily Ritual',
      description: 'Build a calm, effective routine for warm, humid days.',
      href: '/category/skincare',
      cta: 'Explore skincare',
    },
  },
  haircare: {
    label: 'Haircare',
    departments: ['hair-care'],
    shopAllHref: '/category/hair-care',
    subcategories: [
      { label: 'Shampoo', categories: ['hair-care'], types: ['Shampoo'] },
      { label: 'Conditioner', categories: ['hair-care'], types: ['Conditioner'] },
      { label: 'Hair Treatments', categories: ['hair-treatments'] },
      { label: 'Hair Styling', categories: ['hair-care'], types: ['Styling', 'Hair styling'] },
      { label: 'Hair Oils', categories: ['hair-care'], types: ['Hair oil'] },
      { label: 'Hair Masks', categories: ['hair-care'], types: ['Hair mask'] },
    ],
    promo: {
      image: img.hairLifestyle,
      title: 'Healthy Lengths',
      description: 'Nourishing oils and gentle cleansers for soft, glossy hair.',
      href: '/category/hair-care',
      cta: 'Discover haircare',
    },
  },
  'bath-body': {
    label: 'Bath & Body',
    departments: ['body-care'],
    shopAllHref: '/category/body-care',
    subcategories: [
      { label: 'Body Wash', categories: ['body-wash'], types: ['Body wash'] },
      { label: 'Body Lotion', categories: ['body-lotions'] },
      { label: 'Body Scrubs', categories: ['body-care'], types: ['Body scrub', 'Scrub'] },
      { label: 'Hand & Foot Care', categories: ['body-care'], types: ['Hand cream', 'Foot cream'] },
      { label: 'Bath Essentials', categories: ['body-care'], types: ['Bath oil', 'Bath salts', 'Bath soak'] },
    ],
    promo: {
      image: img.bodyLifestyle,
      title: 'Soft Skin, Daily',
      description: 'Light lotions and rich butters that love the tropical heat.',
      href: '/category/body-care',
      cta: 'Discover bath & body',
    },
  },
  fragrance: {
    label: 'Fragrance',
    departments: ['fragrance'],
    shopAllHref: '/category/fragrance',
    subcategories: [
      // Gendered collections appear automatically once products carry these types
      { label: "Women's Fragrance", categories: ['fragrance'], types: ["Women's fragrance"] },
      { label: "Men's Fragrance", categories: ['fragrance'], types: ["Men's fragrance"] },
      { label: 'Unisex Fragrance', categories: ['fragrance'], types: ['Unisex fragrance'] },
      { label: 'Eau de Parfum', categories: ['eau-de-parfum'] },
      { label: 'Body Mists', categories: ['body-mists'] },
      { label: 'Fragrance Sets', categories: ['fragrance'], tags: ['gift'], href: '/collection/gift-sets' },
    ],
    promo: {
      image: img.perfume,
      title: 'A Signature Scent',
      description: 'From soft florals to warm woods — find the one that feels like you.',
      href: '/category/fragrance',
      cta: 'Discover fragrance',
    },
  },
};

function resolveCategoryMenu(key: keyof typeof CATEGORY_MENUS, customPromo?: PromoCardConfig): MegaMenuData {
  const def = CATEGORY_MENUS[key];
  const columns: MegaMenuColumn[] = [
    { heading: `Shop ${def.label}`, headingHref: def.shopAllHref, links: resolveLinks(def.subcategories) },
  ];

  if (def.explore?.length) {
    columns.push({ heading: 'Shop by Skin Type', headingHref: '/discover#skin-types', links: resolveLinks(def.explore) });
  }

  const brands = brandsIn(def.departments);
  if (brands.length) columns.push({ heading: 'Top Brands', headingHref: '/brands', links: brandLinks(brands) });

  columns.push({
    heading: 'Highlights',
    links: resolveLinks([
      { label: 'New In', href: '/collection/new-arrivals', categories: def.departments },
      { label: 'Best Sellers', href: '/collection/best-sellers', always: true },
      { label: 'On Offer', href: '/collection/offers', always: true },
    ]),
  });

  return {
    columns: columns.filter((c) => c.links.length > 0),
    shopAll: { label: `Shop All ${def.label}`, href: def.shopAllHref },
    promoCard: customPromo ?? def.promo,
  };
}

function resolveBrandsMenu(customPromo?: PromoCardConfig): MegaMenuData {
  const withProducts = catalogBrands.filter((b) => productsByBrand(b.id).length > 0);
  const featured = withProducts.filter((b) => b.featured).slice(0, 6);
  const popular = [...withProducts]
    .sort(
      (a, b) =>
        Math.min(...productsByBrand(a.id).map((p) => p.salesRank)) -
        Math.min(...productsByBrand(b.id).map((p) => p.salesRank))
    )
    .slice(0, 6);

  return {
    columns: [
      {
        heading: 'Explore Brands',
        headingHref: '/brands',
        links: [
          { label: 'All Brands', href: '/brands' },
          {
            label: 'Shop by Brand — A–Z',
            href: `/brands#letter-${(withProducts.map((b) => b.name).sort()[0] ?? 'A').charAt(0).toUpperCase()}`,
          },
        ],
      },
      { heading: 'Featured Brands', headingHref: '/brands', links: brandLinks(featured) },
      { heading: 'Popular Brands', headingHref: '/brands', links: brandLinks(popular) },
    ].filter((c) => c.links.length > 0),
    shopAll: { label: 'View All Brands', href: '/brands' },
    promoCard: customPromo ?? {
      image: img.about,
      title: 'Authentic, Always',
      description: 'Every brand sourced directly from the maker or an authorised distributor.',
      href: '/brands',
      cta: 'Meet our brands',
    },
  };
}

function resolveOffersMenu(customPromo?: PromoCardConfig): MegaMenuData {
  const onSale = catalogProducts.filter(isOnSale).sort((a, b) => a.salesRank - b.salesRank);
  return {
    columns: [
      {
        heading: 'Offers',
        headingHref: '/collection/offers',
        links: resolveLinks([
          { label: 'Special Offers', href: '/collection/offers', always: true },
          { label: 'Sale', href: '/shop?availability=on-sale', always: onSale.length > 0 },
          { label: 'Beauty Bundles', href: '/collection/gift-sets', tags: ['gift'] },
          { label: 'Exclusive Deals', href: '/collection/featured', tags: ['featured'] },
        ]),
      },
    ],
    shopAll: { label: 'Shop All Offers', href: '/collection/offers' },
    spotlight: onSale.length ? { heading: 'On offer now', products: onSale.slice(0, 3) } : undefined,
    promoCard: customPromo ?? {
      image: img.campaignMakeup,
      title: 'The Seasonal Edit',
      description: 'Limited-time prices on serums, palettes and fragrance.',
      href: '/collection/offers',
      cta: 'Shop offers',
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════
   Public resolver
   ═══════════════════════════════════════════════════════════════════ */
export function resolveMegaMenu(type: MegaMenuType, customPromo?: PromoCardConfig): MegaMenuData | null {
  switch (type) {
    case 'makeup':
    case 'skincare':
    case 'haircare':
    case 'bath-body':
    case 'fragrance':
      return resolveCategoryMenu(type, customPromo);
    case 'brands':
      return resolveBrandsMenu(customPromo);
    case 'offers':
      return resolveOffersMenu(customPromo);
    default:
      return null;
  }
}

/** Featured collections for the mobile drawer. */
export const featuredCollections = [
  { label: 'New In', href: '/collection/new-arrivals', image: img.campaignSkincare },
  { label: 'Best Sellers', href: '/collection/best-sellers', image: img.creamJar },
  { label: 'Gift Sets', href: '/collection/gift-sets', image: img.perfume },
];

/** Re-exported for consumers that need concern links (e.g. search suggestions). */
export const skinConcernLinks = () => catalogConcerns.map((c) => ({ label: c.name, href: `/skin-concern/${c.slug}` }));
