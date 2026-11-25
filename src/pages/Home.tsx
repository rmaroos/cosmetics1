import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HeroCampaign } from '../components/home/HeroCampaign';
import { TrustStrip } from '../components/home/TrustStrip';
import { CollectionTiles } from '../components/home/CollectionTiles';
import { ProductSection } from '../components/home/ProductSection';
import { getCollectionBySlug, productsInCategory, productsInCollection } from '../utils/catalog';
import type { Product } from '../types/catalog';

const HOME_GRID_LIMIT = 15; // 3 rows × 5 columns on desktop
const HOME_EDIT_LIMIT = 10; // 2 rows × 5 columns on desktop

function collectionProducts(slug: string) {
  const collection = getCollectionBySlug(slug);
  return collection ? productsInCollection(collection).slice(0, HOME_GRID_LIMIT) : [];
}

/** Best-ranked products across one or more top-level categories (deduplicated). */
function categoryEdit(categoryIds: string[], limit = HOME_EDIT_LIMIT): Product[] {
  const seen = new Map<string, Product>();
  categoryIds.flatMap(productsInCategory).forEach((p) => seen.set(p.id, p));
  return [...seen.values()].sort((a, b) => a.salesRank - b.salesRank).slice(0, limit);
}
import { BrandStrip } from '../components/home/BrandStrip';
import { SkinTypeSection } from '../components/home/SkinTypeSection';
import { SkinConcernSection } from '../components/home/SkinConcernSection';
import { EditorialRow } from '../components/home/EditorialRow';
import { InstagramSection } from '../components/home/InstagramSection';

export function Home() {
  useDocumentMeta(
    '',
    'Shop skincare, makeup, hair, body care and fragrance from trusted brands, with islandwide delivery across Sri Lanka.'
  );

  const bestSellers = collectionProducts('best-sellers');
  const newArrivals = collectionProducts('new-arrivals');
  const skincareEdit = categoryEdit(['skincare', 'face-creams-serums']);
  const makeupEdit = categoryEdit(['makeup', 'fragrance']);

  return (
    <>
      {/* 1. Full-bleed hero campaign */}
      <HeroCampaign />

      {/* 2. Shopping benefits */}
      <TrustStrip />

      {/* 3. Collection tiles (3 + 2 editorial grid) */}
      <CollectionTiles />

      {/* 4. Best Sellers — 3 rows (12 products) */}
      <ProductSection
        id="best-sellers"
        title="Best Sellers"
        description="The products our customers come back for, again and again."
        products={bestSellers}
        viewAllHref="/collection/best-sellers"
        viewAllLabel="Shop all best sellers"
        decor="a"
      />

      {/* 5. New Arrivals — 3 rows (12 products) */}
      <ProductSection
        id="new-arrivals"
        title="New Arrivals"
        description="The latest additions to our botanical and luxury beauty shelves."
        products={newArrivals}
        viewAllHref="/collection/new-arrivals"
        viewAllLabel="Shop all new arrivals"
        className="border-t border-line/70 py-16 md:py-24"
        decor="b"
      />

      {/* 6. Shop by skin type */}
      <SkinTypeSection />

      {/* 7. Skincare Essentials — 2 rows (8 products) */}
      <ProductSection
        id="skincare-essentials"
        title="Skincare Essentials"
        description="Cleansers, serums, moisturisers and SPF to build a routine around your skin."
        products={skincareEdit}
        viewAllHref="/category/skincare"
        viewAllLabel="Shop all skincare"
        className="py-16 md:py-24"
        decor="d"
      />

      {/* 8. Makeup & Fragrance — 2 rows (8 products) */}
      <ProductSection
        id="makeup-fragrance"
        title="Makeup & Fragrance"
        description="Complexion, lips and eyes, finished with a signature scent."
        products={makeupEdit}
        viewAllHref="/category/makeup"
        viewAllLabel="Shop all makeup"
        className="bg-sand py-16 md:py-24"
        decor="c"
      />

      {/* 6. Shop by brand */}
      <BrandStrip />

      {/* 7. Shop by skin concern */}
      <SkinConcernSection />

      {/* 8. Beauty journal */}
      <EditorialRow />

      {/* 9. Instagram */}
      <InstagramSection />
    </>
  );
}
