import React from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { getCollectionBySlug, productsInCollection } from '../utils/catalog';
import { HeroCampaign } from '../components/home/HeroCampaign';
import { TrustStrip } from '../components/home/TrustStrip';
import { CategoryShortcuts } from '../components/home/CategoryShortcuts';
import { ProductSection } from '../components/home/ProductSection';
import { CampaignBanners } from '../components/home/CampaignBanners';
import { BrandStrip } from '../components/home/BrandStrip';
import { SkinTypeSection } from '../components/home/SkinTypeSection';
import { SkinConcernSection } from '../components/home/SkinConcernSection';
import { EditorialRow } from '../components/home/EditorialRow';
import { InstagramSection } from '../components/home/InstagramSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export function Home() {
  useDocumentMeta(
    '',
    'Shop skincare, makeup, hair, body care and fragrance from trusted brands, with islandwide delivery across Sri Lanka.'
  );

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
    </>
  );
}
