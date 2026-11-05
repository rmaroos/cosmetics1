export type Category = {
  id: string;
  slug: string;
  name: string;
  parentId: string | null;
  order: number;
  description?: string;
  image?: string;
  published: boolean;
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  origin: string;
  description: string;
  featured?: boolean;
  published: boolean;
  logo?: string;
  tagline?: string;
};

export type VariantKind = 'Size' | 'Shade';

export type ProductVariant = {
  id: string;
  sku: string;
  label: string;
  swatch?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
};

export type ProductBadge = 'new' | 'bestseller';

export type Product = {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  categoryIds: string[];
  productType: string;
  shortDescription: string;
  description: string;
  images: string[];
  variantKind: VariantKind;
  variants: ProductVariant[];
  benefits?: string[];
  keyIngredients?: string[];
  ingredients?: string;
  howToUse?: string;
  warnings?: string;
  skinTypes: string[];
  concerns: string[];
  tags: string[];
  badge?: ProductBadge;
  createdAt: string;
  salesRank: number;
  relatedIds?: string[];
  published: boolean;
};

export type CollectionSource =
{type: 'tag';tag: string;} |
{type: 'sale';} |
{type: 'newest';} |
{type: 'bestsellers';};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  source: CollectionSource;
  published: boolean;
};

export type SkinAttribute = {
  slug: string;
  name: string;
  description: string;
  published: boolean;
  image?: string;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
  verified: boolean;
  photos?: string[];
};