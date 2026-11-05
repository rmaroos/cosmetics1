import type { Product } from '../types/catalog';
import { img } from './images';

export const beautyProducts: Product[] = [
{
  id: 'p20', slug: 'satin-matte-lipstick', name: 'Satin Matte Lipstick', brandId: 'velvet-hue', categoryIds: ['lips'], productType: 'Lipstick',
  shortDescription: 'A comfortable satin-matte lipstick with rich, even colour.',
  description: 'A creamy lipstick that glides on with full colour payoff and sets to a soft satin-matte finish. Enriched with shea butter so lips stay comfortable for hours.',
  images: [img.lipstick, img.campaignMakeup], variantKind: 'Shade',
  variants: [
  { id: 'p20-rose', sku: 'VH-SML-01', label: 'Rose Nude', swatch: '#B8796F', price: 3200, stock: 25 },
  { id: 'p20-terra', sku: 'VH-SML-02', label: 'Terracotta', swatch: '#A4553E', price: 3200, stock: 14 },
  { id: 'p20-berry', sku: 'VH-SML-03', label: 'Berry', swatch: '#7C2E45', price: 3200, stock: 0 },
  { id: 'p20-mauve', sku: 'VH-SML-04', label: 'Mauve', swatch: '#9B6B78', price: 3200, stock: 6 }],

  benefits: ['Full colour in one swipe', 'Comfortable satin finish', 'Long-wearing'],
  keyIngredients: ['Shea butter', 'Vitamin E'],
  ingredients: 'Ricinus Communis Seed Oil, Isododecane, Butyrospermum Parkii Butter, Silica, Tocopherol. May contain: CI 77491, CI 77492, CI 15850, CI 77891.',
  howToUse: 'Apply directly from the bullet, starting at the centre of the lips and working outwards.',
  skinTypes: [], concerns: [], tags: ['featured'], badge: 'bestseller', createdAt: '2025-09-01', salesRank: 5, relatedIds: ['p24', 'p21'], published: true
},
{
  id: 'p21', slug: 'second-skin-serum-foundation', name: 'Second Skin Serum Foundation', brandId: 'velvet-hue', categoryIds: ['face-makeup'], productType: 'Foundation',
  shortDescription: 'A light-to-medium coverage serum foundation with a natural, skin-like finish.',
  description: 'A fluid serum foundation that evens skin tone while letting your skin show through. Buildable coverage, a natural satin finish and a breathable feel make it easy to wear in heat.',
  images: [img.foundation], variantKind: 'Shade',
  variants: [
  { id: 'p21-110', sku: 'VH-SSF-110', label: '110 Fair', swatch: '#E9C9AE', price: 6800, stock: 8 },
  { id: 'p21-220', sku: 'VH-SSF-220', label: '220 Light', swatch: '#DDB08D', price: 6800, stock: 12 },
  { id: 'p21-340', sku: 'VH-SSF-340', label: '340 Medium', swatch: '#C18E68', price: 6800, stock: 15 },
  { id: 'p21-420', sku: 'VH-SSF-420', label: '420 Tan', swatch: '#A06E4A', price: 6800, stock: 10 },
  { id: 'p21-510', sku: 'VH-SSF-510', label: '510 Deep', swatch: '#6E4630', price: 6800, stock: 2 }],

  benefits: ['Buildable coverage', 'Natural satin finish', 'Breathable feel'],
  keyIngredients: ['Niacinamide', 'Hyaluronic acid'],
  ingredients: 'Aqua, Cyclopentasiloxane, Glycerin, Niacinamide, Sodium Hyaluronate, Phenoxyethanol. May contain: CI 77891, CI 77491, CI 77492, CI 77499.',
  howToUse: 'Shake well. Apply with fingertips, a brush or a damp sponge, building where more coverage is needed.',
  skinTypes: ['dry', 'oily', 'combination', 'normal'], concerns: [], tags: [], badge: 'new', createdAt: '2026-10-05', salesRank: 17, relatedIds: ['p27', 'p24'], published: true
},
{
  id: 'p22', slug: 'warm-nudes-eyeshadow-palette', name: 'Warm Nudes Eyeshadow Palette', brandId: 'rosa-rye', categoryIds: ['eyes'], productType: 'Eyeshadow',
  shortDescription: 'Nine blendable mattes and shimmers in warm rose and bronze tones.',
  description: 'A versatile palette of nine everyday shades, from soft matte transition tones to luminous shimmers. Designed to flatter warm and deeper skin tones.',
  images: [img.palette, img.campaignMakeup], variantKind: 'Size',
  variants: [{ id: 'p22-9', sku: 'RR-WNP-9', label: '9 × 1.2 g', price: 7900, compareAtPrice: 9500, stock: 9 }],
  benefits: ['Easy to blend', 'Matte and shimmer finishes', 'Travel-friendly mirror case'],
  ingredients: 'Talc, Mica, Magnesium Stearate, Dimethicone, Octyldodecanol. May contain: CI 77491, CI 77492, CI 77499, CI 77891.',
  howToUse: 'Sweep matte shades through the crease with a fluffy brush; press shimmers onto the lid with a fingertip.',
  skinTypes: [], concerns: [], tags: ['trending'], createdAt: '2026-03-01', salesRank: 20, relatedIds: ['p23', 'p27'], published: true
},
{
  id: 'p23', slug: 'lift-define-mascara', name: 'Lift & Define Mascara', brandId: 'rosa-rye', categoryIds: ['eyes'], productType: 'Mascara',
  shortDescription: 'A lengthening, humidity-resistant mascara that holds curl.',
  description: 'A flexible, buildable formula with a precision brush that separates and lengthens lashes. Resists smudging in humidity and removes easily with warm water and cleanser.',
  images: [img.mascara], variantKind: 'Size',
  variants: [{ id: 'p23-8', sku: 'RR-LDM-8', label: '8 ml · Black', price: 3900, stock: 31 }],
  benefits: ['Lengthens and separates', 'Humidity-resistant', 'Holds curl'],
  ingredients: 'Aqua, Paraffin, Acacia Senegal Gum, Stearic Acid, Glyceryl Stearate, CI 77499.',
  howToUse: 'Wiggle the brush from root to tip. Build a second coat while the first is still wet.',
  warnings: 'Discard three months after opening.',
  skinTypes: [], concerns: [], tags: [], createdAt: '2025-12-18', salesRank: 21, relatedIds: ['p22'], published: true
},
{
  id: 'p24', slug: 'cream-blush-stick', name: 'Cream Blush Stick', brandId: 'velvet-hue', categoryIds: ['face-makeup'], productType: 'Blush',
  shortDescription: 'A sheer, buildable cream blush for cheeks and lips.',
  description: 'A blendable balm blush that melts into skin for a natural flush. Use on cheeks for colour or on lips for a soft tint.',
  images: [img.lipstick, img.journalMakeup], variantKind: 'Shade',
  variants: [
  { id: 'p24-peach', sku: 'VH-CBS-01', label: 'Soft Peach', swatch: '#E39A7F', price: 3600, stock: 18 },
  { id: 'p24-rose', sku: 'VH-CBS-02', label: 'Dusty Rose', swatch: '#C17B83', price: 3600, stock: 11 }],

  benefits: ['Cheek and lip use', 'Natural, sheer flush', 'Easy fingertip blending'],
  ingredients: 'Caprylic/Capric Triglyceride, Ozokerite, Polyethylene, Silica, Tocopherol. May contain: CI 15850, CI 77491, CI 77891.',
  howToUse: 'Dab onto the apples of the cheeks and blend upwards with fingertips.',
  skinTypes: [], concerns: [], tags: ['trending'], badge: 'new', createdAt: '2026-10-22', salesRank: 22, relatedIds: ['p20', 'p21'], published: true
},
{
  id: 'p25', slug: 'jasmin-de-nuit-eau-de-parfum', name: 'Jasmin de Nuit Eau de Parfum', brandId: 'maison-ivoire', categoryIds: ['eau-de-parfum'], productType: 'Eau de parfum',
  shortDescription: 'A luminous white floral with night jasmine, neroli and soft musk.',
  description: 'An elegant floral built around night-blooming jasmine, brightened with neroli and settled on a warm base of white musk and sandalwood.',
  images: [img.perfume], variantKind: 'Size',
  variants: [
  { id: 'p25-30', sku: 'MI-JDN-30', label: '30 ml', price: 14500, stock: 6 },
  { id: 'p25-50', sku: 'MI-JDN-50', label: '50 ml', price: 21500, stock: 5 }],

  benefits: ['Top: neroli, bergamot', 'Heart: jasmine sambac', 'Base: white musk, sandalwood'],
  ingredients: 'Alcohol Denat., Parfum, Aqua, Linalool, Limonene, Benzyl Salicylate, Hydroxycitronellal.',
  howToUse: 'Spray onto pulse points from a distance of 15 cm.',
  warnings: 'Flammable. Keep away from heat and flame.',
  skinTypes: [], concerns: [], tags: ['featured', 'gift'], createdAt: '2026-04-30', salesRank: 23, relatedIds: ['p26', 'p28'], published: true
},
{
  id: 'p26', slug: 'fig-cedar-eau-de-parfum', name: 'Fig & Cedar Eau de Parfum', brandId: 'rosa-rye', categoryIds: ['eau-de-parfum'], productType: 'Eau de parfum',
  shortDescription: 'A green, creamy fig over warm cedarwood.',
  description: 'A modern, gender-neutral scent pairing milky green fig with dry cedarwood and a hint of black pepper.',
  images: [img.perfume], variantKind: 'Size',
  variants: [{ id: 'p26-50', sku: 'RR-FCE-50', label: '50 ml', price: 18900, compareAtPrice: 22000, stock: 4 }],
  benefits: ['Top: fig leaf, black pepper', 'Heart: fig milk', 'Base: cedarwood, vetiver'],
  ingredients: 'Alcohol Denat., Parfum, Aqua, Coumarin, Limonene, Linalool.',
  howToUse: 'Spray onto skin or clothing.',
  warnings: 'Flammable. Keep away from heat and flame.',
  skinTypes: [], concerns: [], tags: ['gift'], createdAt: '2025-11-20', salesRank: 26, relatedIds: ['p25'], published: true
},
{
  id: 'p27', slug: 'essential-brush-set', name: 'Essential Brush Set', brandId: 'rosa-rye', categoryIds: ['brushes-tools'], productType: 'Brush set',
  shortDescription: 'Four soft synthetic brushes for foundation, powder, blush and eyes.',
  description: 'A curated set of four cruelty-free synthetic brushes with weighted handles, ideal for blending liquids, creams and powders.',
  images: [img.brushSet], variantKind: 'Size',
  variants: [{ id: 'p27-4', sku: 'RR-EBS-4', label: '4 pieces', price: 6500, stock: 12 }],
  benefits: ['Soft synthetic fibres', 'Works with liquids and powders', 'Includes storage pouch'],
  howToUse: 'Wash brushes weekly with mild cleanser and lay flat to dry.',
  skinTypes: [], concerns: [], tags: ['gift'], createdAt: '2026-07-14', salesRank: 24, relatedIds: ['p21', 'p22'], published: true
},
{
  id: 'p28', slug: 'frangipani-body-mist', name: 'Frangipani Body Mist', brandId: 'ceylon-leaf', categoryIds: ['body-mists'], productType: 'Body mist',
  shortDescription: 'A light, sunny mist of temple-flower frangipani.',
  description: 'A refreshing body mist capturing the scent of frangipani in bloom, softened with coconut water. Light enough to reapply through warm days.',
  images: [img.perfume, img.bodyLifestyle], variantKind: 'Size',
  variants: [{ id: 'p28-150', sku: 'CL-FBM-150', label: '150 ml', price: 3800, stock: 20 }],
  benefits: ['Light, fresh scent', 'Reapply through the day'],
  ingredients: 'Aqua, Alcohol Denat., Parfum, Cocos Nucifera Water, Glycerin, Linalool.',
  howToUse: 'Mist over body and hair after showering.',
  warnings: 'Flammable. Avoid eyes.',
  skinTypes: [], concerns: [], tags: ['trending'], createdAt: '2026-06-02', salesRank: 25, relatedIds: ['p29'], published: true
},
{
  id: 'p29', slug: 'coconut-shea-body-lotion', name: 'Coconut & Shea Body Lotion', brandId: 'kandy-herbals', categoryIds: ['body-lotions'], productType: 'Body lotion',
  shortDescription: 'A fast-absorbing lotion with virgin coconut oil and shea.',
  description: 'A nourishing daily lotion that absorbs quickly without stickiness, leaving skin soft and lightly scented with coconut.',
  images: [img.bodyLotion, img.bodyLifestyle], variantKind: 'Size',
  variants: [
  { id: 'p29-250', sku: 'KH-CSL-250', label: '250 ml', price: 2900, stock: 35 },
  { id: 'p29-500', sku: 'KH-CSL-500', label: '500 ml', price: 4800, stock: 16 }],

  benefits: ['Fast-absorbing', 'Non-sticky in humidity', '24-hour softness'],
  keyIngredients: ['Virgin coconut oil', 'Shea butter'],
  ingredients: 'Aqua, Cocos Nucifera Oil, Butyrospermum Parkii Butter, Glycerin, Cetearyl Alcohol, Parfum, Phenoxyethanol.',
  howToUse: 'Massage over body after bathing, focusing on dry areas.',
  skinTypes: ['dry', 'normal'], concerns: ['dehydration'], tags: ['featured'], badge: 'bestseller', createdAt: '2025-05-15', salesRank: 3.5, relatedIds: ['p30', 'p28'], published: true
},
{
  id: 'p30', slug: 'tea-leaf-exfoliating-body-wash', name: 'Tea Leaf Exfoliating Body Wash', brandId: 'lumen-botanics', categoryIds: ['body-wash'], productType: 'Body wash',
  shortDescription: 'A gently exfoliating wash with Ceylon tea and fine bamboo powder.',
  description: 'A refreshing body wash that gently polishes skin with fine bamboo powder while Ceylon green tea leaves skin feeling clean and fresh.',
  images: [img.bodyLotion], variantKind: 'Size',
  variants: [{ id: 'p30-300', sku: 'LB-TBW-300', label: '300 ml', price: 2600, stock: 0 }],
  benefits: ['Gentle physical exfoliation', 'Fresh tea scent'],
  keyIngredients: ['Ceylon green tea', 'Bamboo powder'],
  ingredients: 'Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Bambusa Arundinacea Stem Powder, Camellia Sinensis Leaf Extract, Parfum.',
  howToUse: 'Lather over wet skin and rinse. Use 2–3 times a week.',
  skinTypes: ['oily', 'normal', 'combination'], concerns: ['dullness'], tags: [], createdAt: '2026-02-26', salesRank: 27, relatedIds: ['p29'], published: true
},
{
  id: 'p31', slug: 'herbal-strengthening-shampoo', name: 'Herbal Strengthening Shampoo', brandId: 'ceylon-leaf', categoryIds: ['shampoo-conditioner'], productType: 'Shampoo',
  shortDescription: 'A sulphate-free shampoo with hibiscus and curry leaf.',
  description: 'A gentle, sulphate-free shampoo that cleanses the scalp and helps hair feel stronger and look shinier, inspired by traditional hibiscus and curry leaf hair rinses.',
  images: [img.shampoo, img.hairLifestyle], variantKind: 'Size',
  variants: [{ id: 'p31-300', sku: 'CL-HSS-300', label: '300 ml', price: 2750, stock: 28 }],
  benefits: ['Sulphate-free', 'Helps reduce breakage from brushing', 'Adds shine'],
  keyIngredients: ['Hibiscus', 'Curry leaf', 'Amla'],
  ingredients: 'Aqua, Sodium Cocoyl Isethionate, Coco-Glucoside, Hibiscus Rosa-Sinensis Flower Extract, Murraya Koenigii Leaf Extract, Phyllanthus Emblica Fruit Extract, Parfum.',
  howToUse: 'Massage into wet scalp, lather and rinse. Repeat if needed.',
  skinTypes: [], concerns: [], tags: [], createdAt: '2026-01-08', salesRank: 28, relatedIds: ['p32'], published: true
},
{
  id: 'p32', slug: 'cold-pressed-hair-oil', name: 'Cold-Pressed Nourishing Hair Oil', brandId: 'kandy-herbals', categoryIds: ['hair-treatments'], productType: 'Hair oil',
  shortDescription: 'A pre-wash oil with coconut, sesame and bhringraj.',
  description: 'A traditional-style pre-wash treatment that softens hair and conditions the scalp, blending cold-pressed coconut and sesame oils with bhringraj.',
  images: [img.hairOil, img.hairLifestyle], variantKind: 'Size',
  variants: [{ id: 'p32-100', sku: 'KH-NHO-100', label: '100 ml', price: 2300, stock: 22 }],
  benefits: ['Softens dry lengths', 'Conditions the scalp', 'Traditional pre-wash ritual'],
  keyIngredients: ['Coconut oil', 'Sesame oil', 'Bhringraj'],
  ingredients: 'Cocos Nucifera Oil, Sesamum Indicum Seed Oil, Eclipta Prostrata Extract, Tocopherol.',
  howToUse: 'Massage into scalp and lengths 30 minutes to overnight before shampooing.',
  skinTypes: [], concerns: [], tags: ['gift'], badge: 'new', createdAt: '2026-10-12', salesRank: 29, relatedIds: ['p31'], published: true
}];