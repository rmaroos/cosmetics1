import type { Product } from '../types/catalog';
import { img } from './images';

export const skincareProducts: Product[] = [
{
  id: 'p01', slug: 'gotu-kola-gentle-gel-cleanser', name: 'Gotu Kola Gentle Gel Cleanser', brandId: 'lumen-botanics', categoryIds: ['cleansers'], productType: 'Cleanser',
  shortDescription: 'A low-foam gel that removes sunscreen and sweat without leaving skin tight.',
  description: 'This soft gel cleanser lifts away daily build-up, sunscreen and excess oil while respecting the skin barrier. Gotu kola (centella) and panthenol help skin feel calm after cleansing, making it a dependable morning and evening step for most skin types.',
  images: [img.cleanser, img.editorialRoutine], variantKind: 'Size',
  variants: [
  { id: 'p01-150', sku: 'LB-GKC-150', label: '150 ml', price: 2850, stock: 24 },
  { id: 'p01-300', sku: 'LB-GKC-300', label: '300 ml', price: 4950, stock: 9 }],

  benefits: ['Cleanses without stripping', 'Suitable for twice-daily use', 'Fragrance-free'],
  keyIngredients: ['Centella asiatica', 'Panthenol', 'Glycerin'],
  ingredients: 'Aqua, Glycerin, Cocamidopropyl Betaine, Sodium Cocoyl Glycinate, Centella Asiatica Extract, Panthenol, Allantoin, Citric Acid, Phenoxyethanol, Ethylhexylglycerin.',
  howToUse: 'Massage a small amount onto damp skin for 30–60 seconds, then rinse with lukewarm water. Use morning and evening.',
  skinTypes: ['dry', 'oily', 'combination', 'normal', 'sensitive'], concerns: ['redness', 'acne-blemishes'],
  tags: ['featured'], badge: 'bestseller', createdAt: '2026-03-14', salesRank: 3, relatedIds: ['p04', 'p05', 'p07'], published: true
},
{
  id: 'p02', slug: 'low-ph-rice-foam-cleanser', name: 'Low pH Rice Foam Cleanser', brandId: 'sera-lab', categoryIds: ['cleansers'], productType: 'Cleanser',
  shortDescription: 'A creamy foam with rice bran extract for a fresh, clean finish.',
  description: 'A gently foaming cleanser with a skin-friendly pH that helps remove oil and impurities. Rice bran extract leaves skin looking brighter and feeling smooth, ideal for oily and combination skin in humid weather.',
  images: [img.cleanser], variantKind: 'Size',
  variants: [{ id: 'p02-120', sku: 'SL-RFC-120', label: '120 ml', price: 3200, stock: 18 }],
  benefits: ['Removes excess oil', 'Leaves skin looking brighter', 'Low pH formula'],
  keyIngredients: ['Rice bran extract', 'Glycerin'],
  ingredients: 'Aqua, Glycerin, Potassium Myristate, Lauric Acid, Oryza Sativa (Rice) Bran Extract, Sodium Chloride, Butylene Glycol, Fragrance.',
  howToUse: 'Work into a lather with water and massage over damp skin. Rinse thoroughly.',
  warnings: 'Contains fragrance. Avoid contact with eyes.',
  skinTypes: ['oily', 'combination'], concerns: ['dullness', 'large-pores'],
  tags: ['trending'], createdAt: '2026-01-20', salesRank: 14, relatedIds: ['p06', 'p12'], published: true
},
{
  id: 'p03', slug: 'hydra-balance-toner', name: 'Hydra Balance Toner', brandId: 'aqua-derma', categoryIds: ['toners'], productType: 'Toner',
  shortDescription: 'A watery toner that floods skin with layered hydration.',
  description: 'A lightweight, alcohol-free toner with multi-weight hyaluronic acid. Pat in one to three layers after cleansing to prepare skin for serums and moisturiser.',
  images: [img.toner], variantKind: 'Size',
  variants: [{ id: 'p03-200', sku: 'AD-HBT-200', label: '200 ml', price: 3650, compareAtPrice: 4300, stock: 15 }],
  benefits: ['Instant hydration', 'Alcohol-free', 'Layers well'],
  keyIngredients: ['Hyaluronic acid', 'Glycerin', 'Trehalose'],
  ingredients: 'Aqua, Butylene Glycol, Glycerin, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Trehalose, Allantoin, 1,2-Hexanediol.',
  howToUse: 'After cleansing, pour onto palms and gently press into skin. Repeat for extra hydration.',
  skinTypes: ['dry', 'normal', 'sensitive'], concerns: ['dehydration'],
  tags: [], createdAt: '2025-11-02', salesRank: 9, relatedIds: ['p05', 'p14'], published: true
},
{
  id: 'p04', slug: 'rose-water-niacinamide-toner', name: 'Rose Water & Niacinamide Toner', brandId: 'lumen-botanics', categoryIds: ['toners'], productType: 'Toner',
  shortDescription: 'A refreshing mist toner with Sri Lankan rose water and 4% niacinamide.',
  description: 'A fine-mist toner that refreshes skin through the day. Niacinamide helps skin look more even and pores less visible, while rose water adds a softly calming feel.',
  images: [img.toner, img.editorialIngredients], variantKind: 'Size',
  variants: [
  { id: 'p04-100', sku: 'LB-RNT-100', label: '100 ml', price: 2400, stock: 30 },
  { id: 'p04-200', sku: 'LB-RNT-200', label: '200 ml', price: 3900, stock: 12 }],

  benefits: ['Refreshes on the go', 'Helps skin look more even', 'Mist application'],
  keyIngredients: ['Rose water', 'Niacinamide 4%'],
  ingredients: 'Rosa Damascena Flower Water, Niacinamide, Glycerin, Panthenol, Sodium PCA, Phenoxyethanol.',
  howToUse: 'Mist over clean skin morning and evening, or through the day over makeup.',
  skinTypes: ['dry', 'oily', 'combination', 'normal'], concerns: ['uneven-tone', 'large-pores'],
  tags: [], badge: 'new', createdAt: '2026-10-18', salesRank: 18, relatedIds: ['p01', 'p11'], published: true
},
{
  id: 'p05', slug: 'ceramide-barrier-moisturiser', name: 'Ceramide Barrier Moisturiser', brandId: 'sera-lab', categoryIds: ['moisturisers'], productType: 'Moisturiser',
  shortDescription: 'A cushiony cream with ceramides to support a comfortable, resilient barrier.',
  description: 'A rich-feeling but non-greasy cream with three essential ceramides, cholesterol and fatty acids. It helps reduce moisture loss and leaves dry or sensitised skin feeling comfortable all day.',
  images: [img.creamJar, img.campaignSkincare], variantKind: 'Size',
  variants: [
  { id: 'p05-50', sku: 'SL-CBM-50', label: '50 ml', price: 5600, stock: 20 },
  { id: 'p05-100', sku: 'SL-CBM-100', label: '100 ml', price: 9800, stock: 4 }],

  benefits: ['Supports the skin barrier', 'Long-lasting comfort', 'Fragrance-free'],
  keyIngredients: ['Ceramides NP, AP, EOP', 'Cholesterol', 'Squalane'],
  ingredients: 'Aqua, Glycerin, Squalane, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Cholesterol, Phytosphingosine, Carbomer, Xanthan Gum, Phenoxyethanol.',
  howToUse: 'Apply a pea-sized amount to face and neck as the last step of your evening routine, and before sunscreen in the morning.',
  skinTypes: ['dry', 'sensitive', 'normal'], concerns: ['dehydration', 'redness'],
  tags: ['featured'], badge: 'bestseller', createdAt: '2025-08-10', salesRank: 1, relatedIds: ['p03', 'p07', 'p11'], published: true
},
{
  id: 'p06', slug: 'oil-free-water-gel-moisturiser', name: 'Oil-Free Water Gel Moisturiser', brandId: 'aqua-derma', categoryIds: ['moisturisers'], productType: 'Moisturiser',
  shortDescription: 'A bouncy, fast-absorbing gel that hydrates without shine.',
  description: 'A refreshing water-gel that sinks in quickly, leaving skin hydrated with a soft matte finish. Ideal for oily and combination skin in tropical heat.',
  images: [img.creamJar], variantKind: 'Size',
  variants: [{ id: 'p06-50', sku: 'AD-WGM-50', label: '50 ml', price: 4800, stock: 22 }],
  benefits: ['Oil-free hydration', 'Soft matte finish', 'Non-comedogenic'],
  keyIngredients: ['Hyaluronic acid', 'Green tea extract'],
  ingredients: 'Aqua, Dimethicone, Glycerin, Sodium Hyaluronate, Camellia Sinensis Leaf Extract, Carbomer, Tromethamine, Phenoxyethanol.',
  howToUse: 'Smooth over face after serums, morning and evening.',
  skinTypes: ['oily', 'combination'], concerns: ['acne-blemishes', 'large-pores'],
  tags: ['trending'], createdAt: '2026-05-02', salesRank: 8, relatedIds: ['p02', 'p12'], published: true
},
{
  id: 'p07', slug: 'daily-mineral-sunscreen-spf50', name: 'Daily Mineral Sunscreen SPF 50', brandId: 'lumen-botanics', categoryIds: ['sunscreens'], productType: 'Sunscreen',
  shortDescription: 'A sheer mineral sunscreen with zinc oxide and no white cast on most skin tones.',
  description: 'A lightweight, broad-spectrum mineral sunscreen with a tinted-sheer base that blends easily into medium and deeper skin tones. Gentle enough for sensitive skin and comfortable under makeup.',
  images: [img.sunscreen, img.journalSunscreen], variantKind: 'Size',
  variants: [{ id: 'p07-50', sku: 'LB-MSS-50', label: '50 ml', price: 4200, stock: 40 }],
  benefits: ['Broad-spectrum SPF 50', 'Sheer finish', 'Suitable for sensitive skin'],
  keyIngredients: ['Zinc oxide', 'Niacinamide'],
  ingredients: 'Aqua, Zinc Oxide, Caprylic/Capric Triglyceride, Niacinamide, Glycerin, Iron Oxides, Tocopherol, Phenoxyethanol.',
  howToUse: 'Apply generously as the last step of your morning routine. Reapply every two hours in sun, and after swimming or sweating.',
  warnings: 'For external use only. Sunscreen is one part of sun protection; also seek shade and wear protective clothing.',
  skinTypes: ['dry', 'oily', 'combination', 'normal', 'sensitive'], concerns: ['sun-protection', 'redness'],
  tags: ['featured'], badge: 'bestseller', createdAt: '2025-06-01', salesRank: 2, relatedIds: ['p05', 'p08'], published: true
},
{
  id: 'p08', slug: 'invisible-fluid-sunscreen-spf50', name: 'Invisible Fluid Sunscreen SPF 50+ PA++++', brandId: 'aqua-derma', categoryIds: ['sunscreens'], productType: 'Sunscreen',
  shortDescription: 'A watery, invisible sunscreen fluid for daily wear in humid weather.',
  description: 'An ultra-light fluid that dries down quickly with no residue or white cast. Its sweat-resistant formula is designed for everyday use in tropical conditions.',
  images: [img.sunscreen], variantKind: 'Size',
  variants: [
  { id: 'p08-40', sku: 'AD-IFS-40', label: '40 ml', price: 4950, stock: 0 },
  { id: 'p08-80', sku: 'AD-IFS-80', label: '80 ml', price: 8200, stock: 6 }],

  benefits: ['Invisible finish', 'Sweat-resistant', 'High UVA protection'],
  keyIngredients: ['Modern UV filters', 'Hyaluronic acid'],
  ingredients: 'Aqua, Alcohol Denat., Ethylhexyl Methoxycinnamate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Glycerin, Sodium Hyaluronate.',
  howToUse: 'Shake well. Apply evenly as the final skincare step. Reapply regularly.',
  warnings: 'Contains alcohol. Avoid eye area.',
  skinTypes: ['oily', 'combination', 'normal'], concerns: ['sun-protection'],
  tags: ['trending'], createdAt: '2026-04-12', salesRank: 6, relatedIds: ['p07', 'p06'], published: true
},
{
  id: 'p09', slug: 'aha-7-glow-exfoliating-tonic', name: 'AHA 7% Glow Exfoliating Tonic', brandId: 'maison-ivoire', categoryIds: ['exfoliators'], productType: 'Exfoliant',
  shortDescription: 'A glycolic acid tonic that gently resurfaces for a smoother, brighter look.',
  description: 'A 7% glycolic acid exfoliating tonic that helps remove dull surface cells and refine skin texture. Aloe and ginseng help soften the experience.',
  images: [img.toner], variantKind: 'Size',
  variants: [{ id: 'p09-150', sku: 'MI-AHA-150', label: '150 ml', price: 6900, compareAtPrice: 8200, stock: 11 }],
  benefits: ['Smoother-looking texture', 'Brighter appearance', 'Evening use'],
  keyIngredients: ['Glycolic acid 7%', 'Aloe vera'],
  ingredients: 'Aqua, Glycolic Acid, Rosa Damascena Flower Water, Aloe Barbadensis Leaf Water, Glycerin, Panax Ginseng Root Extract, Sodium Hydroxide.',
  howToUse: 'In the evening, sweep over clean skin with a cotton pad. Start two to three times a week. Do not rinse.',
  warnings: 'Increases sun sensitivity — use sunscreen daily. Patch test first. Not for broken or irritated skin.',
  skinTypes: ['normal', 'oily', 'combination'], concerns: ['dullness', 'uneven-tone', 'large-pores'],
  tags: [], createdAt: '2025-09-15', salesRank: 12, relatedIds: ['p11', 'p07'], published: true
},
{
  id: 'p10', slug: 'pink-clay-purifying-mask', name: 'Pink Clay Purifying Mask', brandId: 'kandy-herbals', categoryIds: ['masks-treatments'], productType: 'Mask',
  shortDescription: 'A kaolin and pink clay mask that helps draw out excess oil.',
  description: 'A creamy clay mask with kaolin, pink clay and neem leaf that helps absorb excess oil and leaves pores looking refined, without over-drying.',
  images: [img.clayMask], variantKind: 'Size',
  variants: [{ id: 'p10-100', sku: 'KH-PCM-100', label: '100 g', price: 3400, stock: 3 }],
  benefits: ['Absorbs excess oil', 'Refines the look of pores', 'Weekly treatment'],
  keyIngredients: ['Kaolin', 'Pink clay', 'Neem leaf'],
  ingredients: 'Aqua, Kaolin, Illite, Glycerin, Azadirachta Indica Leaf Extract, Cetearyl Alcohol, Xanthan Gum, Sodium Benzoate.',
  howToUse: 'Apply an even layer to clean skin, avoiding eyes and lips. Leave for 10 minutes, then rinse with warm water. Use 1–2 times a week.',
  skinTypes: ['oily', 'combination'], concerns: ['acne-blemishes', 'large-pores'],
  tags: [], createdAt: '2025-12-05', salesRank: 16, relatedIds: ['p02', 'p12'], published: true
},
{
  id: 'p11', slug: 'vitamin-c-15-brightening-serum', name: 'Vitamin C 15% Brightening Serum', brandId: 'sera-lab', categoryIds: ['face-serums'], productType: 'Serum',
  shortDescription: 'A stable vitamin C serum for a brighter, more even-looking complexion.',
  description: 'This serum pairs 15% ascorbyl glucoside with ferulic acid and vitamin E to help skin look brighter and more even with consistent morning use.',
  images: [img.serum, img.editorialIngredients], variantKind: 'Size',
  variants: [{ id: 'p11-30', sku: 'SL-VCS-30', label: '30 ml', price: 7400, stock: 14 }],
  benefits: ['Helps skin look brighter', 'Antioxidant support', 'Lightweight texture'],
  keyIngredients: ['Vitamin C 15%', 'Ferulic acid', 'Vitamin E'],
  ingredients: 'Aqua, Ascorbyl Glucoside, Propanediol, Glycerin, Ferulic Acid, Tocopherol, Sodium Hyaluronate, Xanthan Gum, Phenoxyethanol.',
  howToUse: 'Apply 3–4 drops to clean skin each morning before moisturiser and sunscreen.',
  warnings: 'Store away from direct sunlight. Patch test before first use.',
  skinTypes: ['normal', 'combination', 'oily'], concerns: ['uneven-tone', 'dullness'],
  tags: ['featured'], badge: 'bestseller', createdAt: '2025-10-01', salesRank: 4, relatedIds: ['p07', 'p05', 'p12'], published: true
},
{
  id: 'p12', slug: 'niacinamide-10-zinc-serum', name: 'Niacinamide 10% + Zinc Serum', brandId: 'lumen-botanics', categoryIds: ['face-serums'], productType: 'Serum',
  shortDescription: 'A balancing serum that helps reduce the look of shine and visible pores.',
  description: 'A water-light serum with 10% niacinamide and 1% zinc PCA, designed to help skin look clearer, more balanced and less shiny through the day.',
  images: [img.serum], variantKind: 'Size',
  variants: [{ id: 'p12-30', sku: 'LB-NZS-30', label: '30 ml', price: 3900, stock: 26 }],
  benefits: ['Helps balance shine', 'Pores look smaller', 'Layers under makeup'],
  keyIngredients: ['Niacinamide 10%', 'Zinc PCA 1%'],
  ingredients: 'Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Tamarindus Indica Seed Gum, Xanthan Gum, Phenoxyethanol.',
  howToUse: 'Apply a few drops to face morning and evening before heavier creams.',
  skinTypes: ['oily', 'combination'], concerns: ['acne-blemishes', 'large-pores'],
  tags: ['trending'], badge: 'new', createdAt: '2026-10-28', salesRank: 7, relatedIds: ['p06', 'p02'], published: true
},
{
  id: 'p13', slug: 'retinal-night-renewal-cream', name: 'Retinal Night Renewal Cream', brandId: 'maison-ivoire', categoryIds: ['day-night-creams'], productType: 'Night cream',
  shortDescription: 'An encapsulated retinal night cream for smoother-looking skin.',
  description: 'A nourishing night cream with encapsulated retinal for a gradual release, supported by peptides and shea butter to help minimise dryness while you sleep.',
  images: [img.creamJar], variantKind: 'Size',
  variants: [{ id: 'p13-50', sku: 'MI-RNC-50', label: '50 ml', price: 12500, stock: 7 }],
  benefits: ['Smoother-looking skin', 'Gradual-release retinoid', 'Nourishing texture'],
  keyIngredients: ['Encapsulated retinal', 'Peptides', 'Shea butter'],
  ingredients: 'Aqua, Butyrospermum Parkii Butter, Glycerin, Caprylic/Capric Triglyceride, Retinal, Palmitoyl Tripeptide-1, Tocopherol, Carbomer, Phenoxyethanol.',
  howToUse: 'Apply in the evening to clean, dry skin. Start every third night and increase gradually.',
  warnings: 'Not recommended during pregnancy or breastfeeding. Use sunscreen daily. Avoid using with exfoliating acids on the same night.',
  skinTypes: ['normal', 'dry', 'combination'], concerns: ['fine-lines', 'uneven-tone'],
  tags: [], createdAt: '2026-02-11', salesRank: 11, relatedIds: ['p15', 'p05'], published: true
},
{
  id: 'p14', slug: 'hyaluronic-plumping-day-cream', name: 'Hyaluronic Plumping Day Cream', brandId: 'aqua-derma', categoryIds: ['day-night-creams'], productType: 'Day cream',
  shortDescription: 'A light day cream that keeps skin hydrated and plump-looking.',
  description: 'A silky day cream with hyaluronic acid and squalane that hydrates and smooths, creating a comfortable base for sunscreen and makeup.',
  images: [img.creamJar], variantKind: 'Size',
  variants: [{ id: 'p14-50', sku: 'AD-HPC-50', label: '50 ml', price: 6400, compareAtPrice: 7500, stock: 10 }],
  benefits: ['Long-lasting hydration', 'Smooth makeup base', 'Light texture'],
  keyIngredients: ['Hyaluronic acid', 'Squalane'],
  ingredients: 'Aqua, Glycerin, Squalane, Sodium Hyaluronate, Cetyl Alcohol, Dimethicone, Tocopherol, Phenoxyethanol.',
  howToUse: 'Apply each morning after serum and before sunscreen.',
  skinTypes: ['dry', 'normal'], concerns: ['dehydration', 'fine-lines'],
  tags: [], createdAt: '2025-07-22', salesRank: 13, relatedIds: ['p03', 'p07'], published: true
},
{
  id: 'p15', slug: 'peptide-eye-cream', name: 'Peptide Eye Cream', brandId: 'maison-ivoire', categoryIds: ['eye-creams-oils'], productType: 'Eye cream',
  shortDescription: 'A delicate eye cream that helps the eye area look smoother and more rested.',
  description: 'A lightweight cream for the delicate eye contour with peptides and caffeine to help the area look smoother and less puffy.',
  images: [img.creamJar], variantKind: 'Size',
  variants: [{ id: 'p15-15', sku: 'MI-PEC-15', label: '15 ml', price: 8900, stock: 9 }],
  benefits: ['Smoother-looking eye area', 'Helps reduce puffiness', 'Ophthalmologist tested'],
  keyIngredients: ['Peptides', 'Caffeine'],
  ingredients: 'Aqua, Glycerin, Caprylic/Capric Triglyceride, Caffeine, Acetyl Hexapeptide-8, Palmitoyl Tetrapeptide-7, Carbomer, Phenoxyethanol.',
  howToUse: 'Gently pat a rice-grain amount around the orbital bone morning and night.',
  skinTypes: ['dry', 'oily', 'combination', 'normal', 'sensitive'], concerns: ['fine-lines'],
  tags: ['featured'], createdAt: '2026-06-30', salesRank: 15, relatedIds: ['p13'], published: true
},
{
  id: 'p16', slug: 'sandalwood-saffron-face-oil', name: 'Sandalwood & Saffron Face Oil', brandId: 'ceylon-leaf', categoryIds: ['eye-creams-oils'], productType: 'Face oil',
  shortDescription: 'A nourishing face oil inspired by traditional Sri Lankan beauty rituals.',
  description: 'A blend of cold-pressed oils with sandalwood and saffron that leaves dry skin feeling nourished and looking radiant.',
  images: [img.hairOil], variantKind: 'Size',
  variants: [{ id: 'p16-30', sku: 'CL-SSO-30', label: '30 ml', price: 5200, stock: 13 }],
  benefits: ['Nourishes dry skin', 'Radiant-looking finish'],
  keyIngredients: ['Sandalwood', 'Saffron', 'Sesame oil'],
  ingredients: 'Sesamum Indicum Seed Oil, Prunus Amygdalus Dulcis Oil, Santalum Album Oil, Crocus Sativus Flower Extract, Tocopherol.',
  howToUse: 'Warm 2–3 drops between palms and press onto skin as the final evening step.',
  warnings: 'Contains natural fragrance components. Patch test before use.',
  skinTypes: ['dry', 'normal'], concerns: ['dullness', 'dehydration'],
  tags: ['gift'], createdAt: '2026-08-08', salesRank: 19, relatedIds: ['p05'], published: true
},
{
  id: 'p17', slug: 'glow-routine-gift-set', name: 'Glow Routine Gift Set', brandId: 'lumen-botanics', categoryIds: ['skincare'], productType: 'Gift set',
  shortDescription: 'A four-step routine: cleanser, toner, serum and SPF in travel sizes.',
  description: 'A thoughtful introduction to a complete routine, presented in a reusable gift box. Includes Gotu Kola Gentle Gel Cleanser (50 ml), Rose Water & Niacinamide Toner (50 ml), Niacinamide 10% + Zinc Serum (15 ml) and Daily Mineral Sunscreen SPF 50 (20 ml).',
  images: [img.campaignSkincare, img.serum], variantKind: 'Size',
  variants: [{ id: 'p17-set', sku: 'LB-GRS-4', label: '4-piece set', price: 11900, compareAtPrice: 14200, stock: 8 }],
  benefits: ['Complete AM routine', 'Travel-friendly sizes', 'Gift-ready box'],
  howToUse: 'Use the cleanser, toner, serum and sunscreen in that order each morning.',
  skinTypes: ['oily', 'combination', 'normal'], concerns: ['large-pores', 'sun-protection'],
  tags: ['gift', 'featured'], createdAt: '2026-09-25', salesRank: 10, relatedIds: ['p01', 'p04', 'p12', 'p07'], published: true
},
{
  id: 'p18', slug: 'overnight-sleeping-mask-draft', name: 'Overnight Sleeping Mask', brandId: 'sera-lab', categoryIds: ['masks-treatments'], productType: 'Mask',
  shortDescription: 'Draft product.', description: 'Draft product.', images: [img.creamJar], variantKind: 'Size',
  variants: [{ id: 'p18-70', sku: 'SL-OSM-70', label: '70 ml', price: 5400, stock: 10 }],
  skinTypes: ['dry'], concerns: ['dehydration'], tags: [], createdAt: '2026-11-01', salesRank: 99, published: false
}];