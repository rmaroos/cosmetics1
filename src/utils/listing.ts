import type { Product } from '../types/catalog';
import {
  catalogConcerns,
  catalogSkinTypes,
  getBrandById,
  getDisplayPrice,
  getRatingSummary,
  isInStock,
  isOnSale,
  scoreProduct } from
'./catalog';

export type SortKey = 'recommended' | 'newest' | 'price-asc' | 'price-desc' | 'bestselling' | 'rating';

export const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'recommended', label: 'Recommended' },
{ value: 'newest', label: 'Newest' },
{ value: 'bestselling', label: 'Best selling' },
{ value: 'rating', label: 'Highest rated' },
{ value: 'price-asc', label: 'Price: low to high' },
{ value: 'price-desc', label: 'Price: high to low' }];


export const priceBuckets = [
{ id: 'under-3000', label: 'Under Rs 3,000', min: 0, max: 2999 },
{ id: '3000-6000', label: 'Rs 3,000 – 6,000', min: 3000, max: 6000 },
{ id: '6000-10000', label: 'Rs 6,000 – 10,000', min: 6001, max: 10000 },
{ id: 'over-10000', label: 'Over Rs 10,000', min: 10001, max: Infinity }];


export type ListingFilters = {
  brand: string[];
  type: string[];
  skin: string[];
  concern: string[];
  price: string[];
  rating: string[];
  availability: string[];
};

export type FilterKey = keyof ListingFilters;

export const filterKeys: FilterKey[] = ['brand', 'type', 'skin', 'concern', 'price', 'rating', 'availability'];

export const filterLabels: Record<FilterKey, string> = {
  brand: 'Brand',
  type: 'Product type',
  skin: 'Skin type',
  concern: 'Skin concern',
  price: 'Price',
  rating: 'Rating',
  availability: 'Availability'
};

export type FacetOption = {value: string;label: string;count: number;};
export type Facets = Record<FilterKey, FacetOption[]>;

export function parseFilters(params: URLSearchParams): ListingFilters {
  const read = (key: string) => (params.get(key) ?? '').split(',').filter(Boolean);
  return {
    brand: read('brand'),
    type: read('type'),
    skin: read('skin'),
    concern: read('concern'),
    price: read('price'),
    rating: read('rating'),
    availability: read('availability')
  };
}

export function countActive(filters: ListingFilters): number {
  return filterKeys.reduce((sum, k) => sum + filters[k].length, 0);
}

function matches(product: Product, key: FilterKey, values: string[]): boolean {
  if (!values.length) return true;
  switch (key) {
    case 'brand':
      return values.includes(product.brandId);
    case 'type':
      return values.includes(product.productType);
    case 'skin':
      return values.some((v) => product.skinTypes.includes(v));
    case 'concern':
      return values.some((v) => product.concerns.includes(v));
    case 'price':{
        const { price } = getDisplayPrice(product);
        return values.some((id) => {
          const b = priceBuckets.find((x) => x.id === id);
          return b ? price >= b.min && price <= b.max : false;
        });
      }
    case 'rating':
      return values.some((v) => getRatingSummary(product.id).average >= Number(v));
    case 'availability':
      return values.every((v) => v === 'in-stock' ? isInStock(product) : v === 'on-sale' ? isOnSale(product) : true);
  }
}

export function applyFilters(list: Product[], filters: ListingFilters, except?: FilterKey): Product[] {
  return list.filter((p) => filterKeys.every((k) => k === except || matches(p, k, filters[k])));
}

export function sortProducts(list: Product[], sort: SortKey, query?: string): Product[] {
  const copy = [...list];
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case 'price-asc':
      return copy.sort((a, b) => getDisplayPrice(a).price - getDisplayPrice(b).price);
    case 'price-desc':
      return copy.sort((a, b) => getDisplayPrice(b).price - getDisplayPrice(a).price);
    case 'bestselling':
      return copy.sort((a, b) => a.salesRank - b.salesRank);
    case 'rating':
      return copy.sort((a, b) => getRatingSummary(b.id).average - getRatingSummary(a.id).average);
    default:
      if (query) return copy.sort((a, b) => scoreProduct(b, query) - scoreProduct(a, query));
      return copy.sort((a, b) => Number(isInStock(b)) - Number(isInStock(a)) || a.salesRank - b.salesRank);
  }
}

/** Facet counts reflect all other active filters, and empty options are hidden. */
export function buildFacets(base: Product[], filters: ListingFilters): Facets {
  const count = (key: FilterKey, value: string) =>
  applyFilters(base, filters, key).filter((p) => matches(p, key, [value])).length;

  const unique = <T,>(arr: T[]) => Array.from(new Set(arr));
  const nonEmpty = (opts: FacetOption[]) => opts.filter((o) => o.count > 0);

  return {
    brand: nonEmpty(
      unique(base.map((p) => p.brandId)).
      map((id) => ({ value: id, label: getBrandById(id)?.name ?? id, count: count('brand', id) })).
      sort((a, b) => a.label.localeCompare(b.label))
    ),
    type: nonEmpty(
      unique(base.map((p) => p.productType)).
      sort().
      map((t) => ({ value: t, label: t, count: count('type', t) }))
    ),
    skin: nonEmpty(catalogSkinTypes.map((s) => ({ value: s.slug, label: s.name, count: count('skin', s.slug) }))),
    concern: nonEmpty(catalogConcerns.map((s) => ({ value: s.slug, label: s.name, count: count('concern', s.slug) }))),
    price: nonEmpty(priceBuckets.map((b) => ({ value: b.id, label: b.label, count: count('price', b.id) }))),
    rating: nonEmpty([{ value: '4', label: '4 stars & up', count: count('rating', '4') }]),
    availability: nonEmpty([
    { value: 'in-stock', label: 'In stock', count: count('availability', 'in-stock') },
    { value: 'on-sale', label: 'On sale', count: count('availability', 'on-sale') }]
    )
  };
}

export function labelForFilter(key: FilterKey, value: string, facets: Facets): string {
  return facets[key].find((o) => o.value === value)?.label ?? value;
}