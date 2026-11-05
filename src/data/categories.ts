import type { Category } from '../types/catalog';
import { img } from './images';

export const categories: Category[] = [
{ id: 'skincare', slug: 'skincare', name: 'Skincare', parentId: null, order: 1, image: img.cleanser, published: true, description: 'Cleansers, toners, moisturisers and sun protection to build a routine that suits your skin.' },
{ id: 'cleansers', slug: 'cleansers', name: 'Cleansers', parentId: 'skincare', order: 1, published: true },
{ id: 'toners', slug: 'toners', name: 'Toners', parentId: 'skincare', order: 2, published: true },
{ id: 'moisturisers', slug: 'moisturisers', name: 'Moisturisers', parentId: 'skincare', order: 3, published: true },
{ id: 'sunscreens', slug: 'sunscreens', name: 'Sunscreens', parentId: 'skincare', order: 4, published: true },
{ id: 'exfoliators', slug: 'exfoliators', name: 'Exfoliators', parentId: 'skincare', order: 5, published: true },
{ id: 'masks-treatments', slug: 'masks-treatments', name: 'Masks & Treatments', parentId: 'skincare', order: 6, published: true },

{ id: 'face-creams-serums', slug: 'face-creams-serums', name: 'Face Creams & Serums', parentId: null, order: 2, image: img.serum, published: true, description: 'Targeted serums, day and night creams, and eye care for specific skin goals.' },
{ id: 'day-night-creams', slug: 'day-night-creams', name: 'Day & Night Creams', parentId: 'face-creams-serums', order: 1, published: true },
{ id: 'face-serums', slug: 'face-serums', name: 'Face Serums', parentId: 'face-creams-serums', order: 2, published: true },
{ id: 'eye-creams-oils', slug: 'eye-creams-oils', name: 'Eye Creams & Face Oils', parentId: 'face-creams-serums', order: 3, published: true },

{ id: 'makeup', slug: 'makeup', name: 'Makeup', parentId: null, order: 3, image: img.lipstick, published: true, description: 'Complexion, lips and eyes in shades chosen for a wide range of skin tones.' },
{ id: 'face-makeup', slug: 'face-makeup', name: 'Face', parentId: 'makeup', order: 1, published: true },
{ id: 'lips', slug: 'lips', name: 'Lips', parentId: 'makeup', order: 2, published: true },
{ id: 'eyes', slug: 'eyes', name: 'Eyes', parentId: 'makeup', order: 3, published: true },

{ id: 'body-care', slug: 'body-care', name: 'Body Care', parentId: null, order: 4, image: img.bodyLotion, published: true, description: 'Lotions and washes that keep skin soft through heat and humidity.' },
{ id: 'body-lotions', slug: 'body-lotions', name: 'Body Lotions & Butters', parentId: 'body-care', order: 1, published: true },
{ id: 'body-wash', slug: 'body-wash', name: 'Body Wash & Scrubs', parentId: 'body-care', order: 2, published: true },

{ id: 'hair-care', slug: 'hair-care', name: 'Hair Care', parentId: null, order: 5, image: img.shampoo, published: true, description: 'Shampoos, conditioners and treatments for healthy-looking hair.' },
{ id: 'shampoo-conditioner', slug: 'shampoo-conditioner', name: 'Shampoo & Conditioner', parentId: 'hair-care', order: 1, published: true },
{ id: 'hair-treatments', slug: 'hair-treatments', name: 'Oils & Treatments', parentId: 'hair-care', order: 2, published: true },

{ id: 'fragrance', slug: 'fragrance', name: 'Fragrance', parentId: null, order: 6, image: img.perfume, published: true, description: 'Eau de parfum and body mists, from soft florals to warm woods.' },
{ id: 'eau-de-parfum', slug: 'eau-de-parfum', name: 'Eau de Parfum', parentId: 'fragrance', order: 1, published: true },
{ id: 'body-mists', slug: 'body-mists', name: 'Body Mists', parentId: 'fragrance', order: 2, published: true },

{ id: 'beauty-tools', slug: 'beauty-tools', name: 'Tools & Accessories', parentId: null, order: 7, image: img.brushSet, published: true, description: 'Brushes and tools for precise, hygienic application.' },
{ id: 'brushes-tools', slug: 'brushes-tools', name: 'Brushes & Tools', parentId: 'beauty-tools', order: 1, published: true },

{ id: 'nail-care', slug: 'nail-care', name: 'Nail Care', parentId: null, order: 8, published: false, description: 'Not yet published.' }];