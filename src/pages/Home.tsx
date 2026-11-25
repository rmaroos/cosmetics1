<<<<<<< HEAD
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HeroCampaign } from '../components/home/HeroCampaign';
import { TrustStrip } from '../components/home/TrustStrip';
import { CollectionTiles } from '../components/home/CollectionTiles';
import { ProductSection } from '../components/home/ProductSection';
import { getCollectionBySlug, productsInCategory, productsInCollection } from '../utils/catalog';
import type { Product } from '../types/catalog';

const HOME_GRID_LIMIT = 12; // 3 rows × 4 columns on desktop
const HOME_EDIT_LIMIT = 8; // 2 rows × 4 columns on desktop

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
=======
import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getCollectionBySlug, productsInCollection } from '../utils/catalog';
import { HeroCampaign } from '../components/home/HeroCampaign';
import { TrustStrip } from '../components/home/TrustStrip';
import { CategoryShortcuts } from '../components/home/CategoryShortcuts';
import { ProductSection } from '../components/home/ProductSection';
import { CampaignBanners } from '../components/home/CampaignBanners';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
import { BrandStrip } from '../components/home/BrandStrip';
import { SkinTypeSection } from '../components/home/SkinTypeSection';
import { SkinConcernSection } from '../components/home/SkinConcernSection';
import { EditorialRow } from '../components/home/EditorialRow';
import { InstagramSection } from '../components/home/InstagramSection';
<<<<<<< HEAD
=======
import { NewsletterSection } from '../components/home/NewsletterSection';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9

export function Home() {
  useDocumentMeta(
    '',
    'Shop skincare, makeup, hair, body care and fragrance from trusted brands, with islandwide delivery across Sri Lanka.'
  );

<<<<<<< HEAD
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
      />

      {/* 6. Shop by brand */}
      <BrandStrip />

      {/* 7. Shop by skin concern */}
      <SkinConcernSection />

      {/* 8. Beauty journal */}
      <EditorialRow />

      {/* 9. Instagram */}
      <InstagramSection />
=======
  // Collections for independent homepage product showcases
  const bestSellersCollection = getCollectionBySlug('best-sellers');
  const newArrivalsCollection = getCollectionBySlug('new-arrivals');
  const trendingCollection = getCollectionBySlug('trending');
  const offersCollection = getCollectionBySlug('offers');

  // Independent product subsets with dedicated sorting logic
  const bestSellers = bestSellersCollection
    ? productsInCollection(bestSellersCollection).slice(0, 4)
    : [];

  const newArrivals = newArrivalsCollection
    ? productsInCollection(newArrivalsCollection).slice(0, 4)
    : [];

  const trending = trendingCollection
    ? productsInCollection(trendingCollection).slice(0, 4)
    : [];

  const offers = offersCollection
    ? productsInCollection(offersCollection).slice(0, 4)
    : [];

  return (
    <>
      {/* 1. Hero Campaign */}
      <HeroCampaign />

      {/* 2. Shopping Benefits / Trust Indicators */}
      <TrustStrip />

      {/* 3. Shop by Category */}
      <CategoryShortcuts />

      {/* 4. Section A: Best Sellers */}
      <ProductSection
        id="best-sellers"
        eyebrow="Best Sellers"
        title="Customer Favourites"
        description="Discover the products our customers love."
        products={bestSellers}
        viewAllHref="/collection/best-sellers"
        viewAllLabel="View All"
      />

      {/* 5. Promotional Campaign Banners */}
      <CampaignBanners />

      {/* 6. Section B: New Arrivals */}
      <ProductSection
        id="new-arrivals"
        eyebrow="New Arrivals"
        title="Just Arrived"
        description="The latest additions to our botanical and luxury beauty shelves."
        products={newArrivals}
        viewAllHref="/collection/new-arrivals"
        viewAllLabel="Shop New Arrivals"
      />

      {/* 7. Shop by Brand */}
      <BrandStrip />

      {/* 8. Shop by Skin Type */}
      <SkinTypeSection />

      {/* 9. Section C: Trending Now */}
      <ProductSection
        id="trending-now"
        eyebrow="Trending Now"
        title="Trending Now"
        description="The beauty picks everyone's talking about."
        products={trending}
        viewAllHref="/collection/trending"
        viewAllLabel="View All"
      />

      {/* 10. Shop by Skin Concern */}
      <SkinConcernSection />

      {/* 11. Special Offers */}
      {offers.length > 0 && (
        <ProductSection
          id="special-offers"
          eyebrow="Limited Time"
          title="On Offer Now"
          description="Limited-time prices on selected botanicals and skincare staples."
          products={offers}
          viewAllHref="/collection/offers"
          viewAllLabel="Shop All Offers"
        />
      )}

      {/* 13. Beauty Journal / Editorial */}
      <EditorialRow />

      {/* 14. Instagram – Stay Connected */}
      <InstagramSection />

      {/* 15. Newsletter Subscription */}
      <NewsletterSection />
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
    </>
  );
}
