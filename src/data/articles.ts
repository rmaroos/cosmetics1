import type { Article } from '../types/content';
import { img } from './images';

export const articles: Article[] = [
{
  slug: 'choosing-sunscreen-for-tropical-climate', title: 'How to choose a sunscreen for Sri Lanka’s climate', kind: 'journal', topic: 'Sun care',
  excerpt: 'Heat, humidity and strong UV call for a sunscreen you’ll actually want to wear every day. Here’s what to look for.',
  image: img.journalSunscreen, author: 'Nelum Beauty Team', publishedAt: '2026-10-21', readMinutes: 5, relatedCategorySlug: 'sunscreens', published: true,
  body: [
  { type: 'p', text: 'Close to the equator, UV levels stay high throughout the year — even on cloudy monsoon days. The best sunscreen is the one you’ll reapply happily, so texture matters as much as the SPF number.' },
  { type: 'h2', text: 'Understand the labels' },
  { type: 'ul', items: ['SPF measures protection from UVB rays, which cause burning.', 'PA ratings and “broad spectrum” refer to UVA protection, linked to pigmentation and skin ageing.', 'Water or sweat resistance tells you how long protection holds while active.'] },
  { type: 'h2', text: 'Match the texture to your skin' },
  { type: 'p', text: 'Oily and combination skin usually prefers fluids and gels that dry down quickly. Drier skin may enjoy creamier formulas. If you have sensitive skin, mineral filters such as zinc oxide are often better tolerated.' },
  { type: 'products', title: 'Sunscreens to consider', productIds: ['p07', 'p08'] },
  { type: 'h2', text: 'Apply enough, and reapply' },
  { type: 'p', text: 'Most people apply less than half the amount used in testing. Aim for roughly two finger-lengths for face and neck, and reapply every two hours when outdoors. Sunscreen works best alongside shade, hats and protective clothing.' }]

},
{
  slug: 'am-pm-routine-for-oily-skin', title: 'A simple morning and evening routine for oily skin', kind: 'routine', topic: 'Routines',
  excerpt: 'Four steps in the morning, three at night — a balanced routine that keeps shine in check without stripping.',
  image: img.editorialRoutine, author: 'Nelum Beauty Team', publishedAt: '2026-10-02', readMinutes: 6, relatedCategorySlug: 'skincare', published: true,
  body: [
  { type: 'p', text: 'Oily skin still needs hydration. Over-cleansing or skipping moisturiser can leave skin feeling tight while it continues to look shiny. A consistent, gentle routine is usually more effective than harsh products.' },
  { type: 'h2', text: 'Morning' },
  { type: 'ul', items: ['Cleanse with a gentle, low pH cleanser.', 'Apply a balancing serum such as niacinamide.', 'Use a lightweight, oil-free gel moisturiser.', 'Finish with a fluid sunscreen.'] },
  { type: 'products', title: 'Morning essentials', productIds: ['p02', 'p12', 'p06', 'p08'] },
  { type: 'h2', text: 'Evening' },
  { type: 'ul', items: ['Cleanse thoroughly to remove sunscreen and sweat.', 'Two to three times a week, use an exfoliating tonic.', 'Moisturise with the same gel or a slightly richer cream.'] },
  { type: 'p', text: 'Introduce one new product at a time and patch test first. If breakouts are persistent or painful, a dermatologist can recommend suitable treatment.' }]

},
{
  slug: 'barrier-repair-routine-for-dry-skin', title: 'A barrier-friendly routine for dry and sensitive skin', kind: 'routine', topic: 'Routines',
  excerpt: 'Fewer steps, gentler formulas and the right moisturiser can make dry skin feel comfortable again.',
  image: img.campaignSkincare, author: 'Nelum Beauty Team', publishedAt: '2026-08-18', readMinutes: 5, relatedCategorySlug: 'moisturisers', published: true,
  body: [
  { type: 'p', text: 'Dry or sensitised skin often benefits from simplifying. Focus on gentle cleansing, layered hydration and a moisturiser that supports the skin barrier.' },
  { type: 'h2', text: 'The routine' },
  { type: 'ul', items: ['A fragrance-free gel cleanser.', 'A hydrating toner patted in layers.', 'A ceramide moisturiser morning and night.', 'Mineral sunscreen every morning.'] },
  { type: 'products', title: 'Build the routine', productIds: ['p01', 'p03', 'p05', 'p07'] }]

},
{
  slug: 'niacinamide-explained', title: 'Niacinamide, explained', kind: 'ingredient', topic: 'Ingredients',
  excerpt: 'Why this versatile form of vitamin B3 shows up in so many serums, toners and moisturisers.',
  image: img.editorialIngredients, author: 'Nelum Beauty Team', publishedAt: '2026-09-09', readMinutes: 4, relatedCategorySlug: 'face-serums', published: true,
  body: [
  { type: 'p', text: 'Niacinamide is a form of vitamin B3 that is generally well tolerated and easy to combine with other ingredients. It’s commonly used to help skin look more even, balance the appearance of oiliness and support the skin barrier.' },
  { type: 'h2', text: 'How to use it' },
  { type: 'p', text: 'Concentrations between 2% and 10% are common. Start with a lower strength if your skin is sensitive. It can be used morning and evening, and pairs well with hyaluronic acid, ceramides and sunscreen.' },
  { type: 'products', title: 'Products with niacinamide', productIds: ['p12', 'p04', 'p07'] }]

},
{
  slug: 'the-five-minute-natural-makeup-look', title: 'The five-minute natural makeup look', kind: 'journal', topic: 'Makeup',
  excerpt: 'Skin-like base, a cream flush and defined lashes — an easy look for busy mornings.',
  image: img.journalMakeup, author: 'Nelum Beauty Team', publishedAt: '2026-09-27', readMinutes: 4, relatedCategorySlug: 'makeup', published: true,
  body: [
  { type: 'p', text: 'A natural makeup look is about evening things out, not covering everything up. Start with well-moisturised skin and sunscreen.' },
  { type: 'h2', text: 'Step by step' },
  { type: 'ul', items: ['Apply a thin layer of serum foundation only where you need it.', 'Tap cream blush onto cheeks and blend upwards.', 'Sweep a matte transition shade through the crease.', 'Finish with one coat of mascara and a nude lip.'] },
  { type: 'products', title: 'Shop the look', productIds: ['p21', 'p24', 'p22', 'p23', 'p20'] }]

},
{
  slug: 'body-care-in-humid-weather', title: 'Body care that works in humid weather', kind: 'journal', topic: 'Body care',
  excerpt: 'Lightweight lotions, gentle exfoliation and fresh scents for skin that stays soft in the heat.',
  image: img.bodyLifestyle, author: 'Nelum Beauty Team', publishedAt: '2026-07-15', readMinutes: 3, relatedCategorySlug: 'body-care', published: true,
  body: [
  { type: 'p', text: 'Humidity doesn’t mean your skin is hydrated. Air-conditioning, sun and frequent showers can all leave body skin dry.' },
  { type: 'h2', text: 'Keep it light' },
  { type: 'p', text: 'Choose fast-absorbing lotions, apply right after showering while skin is damp, and exfoliate gently once or twice a week.' },
  { type: 'products', title: 'Body favourites', productIds: ['p29', 'p30', 'p28'] }]

}];