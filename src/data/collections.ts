import type { Collection } from '../types/catalog';
import { img } from './images';

export const collections: Collection[] = [
{ id: 'new-arrivals', slug: 'new-arrivals', name: 'New Arrivals', description: 'The latest additions to our shelves.', image: img.campaignSkincare, source: { type: 'newest' }, published: true },
{ id: 'best-sellers', slug: 'best-sellers', name: 'Best Sellers', description: 'The products our customers come back for.', image: img.creamJar, source: { type: 'bestsellers' }, published: true },
{ id: 'trending', slug: 'trending', name: 'Trending Now', description: 'What people are adding to their routines this month.', image: img.serum, source: { type: 'tag', tag: 'trending' }, published: true },
{ id: 'featured', slug: 'featured', name: 'Featured Picks', description: 'Hand-picked favourites from our beauty team.', image: img.campaignMakeup, source: { type: 'tag', tag: 'featured' }, published: true },
{ id: 'offers', slug: 'offers', name: 'Offers', description: 'Products currently available at a reduced price.', image: img.palette, source: { type: 'sale' }, published: true },
{ id: 'gift-sets', slug: 'gift-sets', name: 'Gift Sets & Bundles', description: 'Thoughtful sets and gifting favourites.', image: img.perfume, source: { type: 'tag', tag: 'gift' }, published: true },
{ id: 'monsoon-edit', slug: 'monsoon-edit', name: 'Monsoon Edit', description: 'Draft collection.', source: { type: 'tag', tag: 'monsoon' }, published: false }];