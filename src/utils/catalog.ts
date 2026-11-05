import type { Brand, Category, Collection, Product, ProductVariant } from '../types/catalog';
import { products } from '../data/products';
import { brands } from '../data/brands';
import { categories } from '../data/categories';
import { collections } from '../data/collections';
import { reviews } from '../data/reviews';
import { skinConcerns, skinTypes } from '../data/skinTaxonomy';

/* ---------- Visibility (only published, with published brand) ---------- */
const publishedBrandIds = new Set(brands.filter((b) => b.published).map((b) => b.id));

export const catalogProducts: Product[] = products.filter((p) => p.published && publishedBrandIds.has(p.brandId));
export const catalogBrands: Brand[] = brands.filter((b) => b.published).sort((a, b) => a.name.localeCompare(b.name));
export const catalogCategories: Category[] = categories.filter((c) => c.published).sort((a, b) => a.order - b.order);
export const catalogCollections: Collection[] = collections.filter((c) => c.published);
export const catalogSkinTypes = skinTypes.filter((s) => s.published);
export const catalogConcerns = skinConcerns.filter((s) => s.published);

/* ---------- Lookups ---------- */
export const getProductBySlug = (slug: string) => catalogProducts.find((p) => p.slug === slug);
export const getProductById = (id: string) => catalogProducts.find((p) => p.id === id);
export const getBrandById = (id: string) => catalogBrands.find((b) => b.id === id);
export const getBrandBySlug = (slug: string) => catalogBrands.find((b) => b.slug === slug);
export const getCategoryBySlug = (slug: string) => catalogCategories.find((c) => c.slug === slug);
export const getCategoryById = (id: string) => catalogCategories.find((c) => c.id === id);
export const getCollectionBySlug = (slug: string) => catalogCollections.find((c) => c.slug === slug);
const CONCERN_SYNONYMS: Record<string, string[]> = {
  acne: ['acne', 'acne-blemishes'],
  'acne-blemishes': ['acne', 'acne-blemishes'],
  'anti-aging': ['anti-aging', 'fine-lines'],
  'fine-lines': ['anti-aging', 'fine-lines'],
  hyperpigmentation: ['hyperpigmentation', 'uneven-tone'],
  'uneven-tone': ['hyperpigmentation', 'uneven-tone'],
  pores: ['pores', 'large-pores', 'open-pores'],
  'large-pores': ['pores', 'large-pores', 'open-pores'],
  'open-pores': ['pores', 'large-pores', 'open-pores'],
  brightening: ['brightening', 'uneven-tone', 'dullness'],
  'dark-circles': ['dark-circles', 'fine-lines'],
};

export const getSkinType = (slug: string) => catalogSkinTypes.find((s) => s.slug === slug);
export const getConcern = (slug: string) => {
  const direct = catalogConcerns.find((s) => s.slug === slug);
  if (direct) return direct;
  const syns = CONCERN_SYNONYMS[slug] ?? [];
  return catalogConcerns.find((s) => syns.includes(s.slug));
};

export function getTopCategories(): Category[] {
  return catalogCategories.filter((c) => c.parentId === null);
}

export function getChildCategories(parentId: string): Category[] {
  return catalogCategories.filter((c) => c.parentId === parentId);
}

export function getCategoryPath(category: Category): Category[] {
  const path: Category[] = [category];
  let current = category;
  while (current.parentId) {
    const parent = getCategoryById(current.parentId);
    if (!parent) break;
    path.unshift(parent);
    current = parent;
  }
  return path;
}

export function getCategoryUrl(category: Category): string {
  return '/category/' + getCategoryPath(category).map((c) => c.slug).join('/');
}

function descendantIds(categoryId: string): string[] {
  const children = getChildCategories(categoryId);
  return [categoryId, ...children.flatMap((c) => descendantIds(c.id))];
}

export function getPrimaryCategory(product: Product): Category | undefined {
  return product.categoryIds.map(getCategoryById).find(Boolean);
}

/* ---------- Product groupings ---------- */
export function productsInCategory(categoryId: string): Product[] {
  const ids = new Set(descendantIds(categoryId));
  return catalogProducts.filter((p) => p.categoryIds.some((id) => ids.has(id)));
}

export function categoryProductCount(categoryId: string): number {
  return productsInCategory(categoryId).length;
}

export const productsByBrand = (brandId: string) => catalogProducts.filter((p) => p.brandId === brandId);
export const productsBySkinType = (slug: string) => catalogProducts.filter((p) => p.skinTypes.includes(slug));
export const productsByConcern = (slug: string) => {
  const syns = CONCERN_SYNONYMS[slug] ?? [slug];
  return catalogProducts.filter((p) => p.concerns.some((c) => syns.includes(c)));
};

export function productsInCollection(collection: Collection): Product[] {
  const src = collection.source;
  switch (src.type) {
    case 'tag':
      return catalogProducts.filter((p) => p.tags.includes(src.tag));
    case 'sale':
      return catalogProducts.filter((p) => isOnSale(p));
    case 'newest':
      return [...catalogProducts].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 12);
    case 'bestsellers':
      return [...catalogProducts].sort((a, b) => a.salesRank - b.salesRank).slice(0, 12);
  }
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const explicit = (product.relatedIds ?? []).map(getProductById).filter((p): p is Product => Boolean(p));
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const fill = catalogProducts.filter(
    (p) => p.id !== product.id && !explicit.includes(p) && p.categoryIds.some((c) => product.categoryIds.includes(c))
  );
  return [...explicit, ...fill].slice(0, limit);
}

/* ---------- Price & stock ---------- */
export function getVariant(product: Product, variantId: string): ProductVariant | undefined {
  return product.variants.find((v) => v.id === variantId);
}

export function getDisplayPrice(product: Product): {price: number;compareAt?: number;hasRange: boolean;} {
  const available = product.variants.filter((v) => v.stock > 0);
  const pool = available.length ? available : product.variants;
  const cheapest = pool.reduce((min, v) => v.price < min.price ? v : min, pool[0]);
  const hasRange = new Set(product.variants.map((v) => v.price)).size > 1;
  return { price: cheapest.price, compareAt: cheapest.compareAtPrice, hasRange };
}

export const isInStock = (product: Product) => product.variants.some((v) => v.stock > 0);
export const isOnSale = (product: Product) => product.variants.some((v) => v.compareAtPrice && v.compareAtPrice > v.price);
export const isLowStock = (variant: ProductVariant) => variant.stock > 0 && variant.stock <= 5;

/* ---------- Ratings ---------- */
export type RatingSummary = {average: number;count: number;distribution: Record<1 | 2 | 3 | 4 | 5, number>;};

export function getRatingSummary(productId: string): RatingSummary {
  const list = reviews.filter((r) => r.productId === productId);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as RatingSummary['distribution'];
  list.forEach((r) => {
    distribution[r.rating as 1 | 2 | 3 | 4 | 5] += 1;
  });
  const average = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  return { average: Math.round(average * 10) / 10, count: list.length, distribution };
}

export const getProductReviews = (productId: string) =>
reviews.filter((r) => r.productId === productId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

/* ---------- Search ---------- */
function normalise(value: string): string {
  return value.toLowerCase().normalize('NFKD').replace(/[^\w\s%]/g, ' ');
}

export function scoreProduct(product: Product, query: string): number {
  const tokens = normalise(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return 0;
  const brand = getBrandById(product.brandId)?.name ?? '';
  const cats = product.categoryIds.map((id) => getCategoryById(id)?.name ?? '').join(' ');
  const fields: [string, number][] = [
  [normalise(product.name), 6],
  [normalise(brand), 5],
  [normalise(product.productType), 4],
  [normalise(cats), 3],
  [normalise((product.keyIngredients ?? []).join(' ')), 3],
  [normalise([...product.concerns, ...product.skinTypes].join(' ')), 2],
  [normalise(product.shortDescription), 1]];

  let total = 0;
  for (const token of tokens) {
    const stem = token.length > 4 ? token.replace(/(s|es)$/, '') : token;
    let best = 0;
    for (const [text, weight] of fields) {
      if (text.includes(stem)) best = Math.max(best, weight);
    }
    if (best === 0) return 0;
    total += best;
  }
  return total;
}

export function searchProducts(query: string): Product[] {
  return catalogProducts.
  map((p) => ({ p, s: scoreProduct(p, query) })).
  filter((x) => x.s > 0).
  sort((a, b) => b.s - a.s).
  map((x) => x.p);
}

export function searchBrands(query: string): Brand[] {
  const q = normalise(query).trim();
  if (!q) return [];
  return catalogBrands.filter((b) => normalise(b.name).includes(q));
}

export function searchCategories(query: string): Category[] {
  const q = normalise(query).trim();
  if (!q) return [];
  return catalogCategories.filter((c) => normalise(c.name).includes(q));
}