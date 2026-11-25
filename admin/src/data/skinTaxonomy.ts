import type { SkinAttribute } from '../types/catalog';

export const skinTypes: SkinAttribute[] = [
  {
    slug: 'oily',
    name: 'Oily Skin',
    image: '/skin/type-oily.jpg',
    published: true,
    description: 'Skin that produces excess sebum and looks shiny through the day. Lightweight, oil-free formulas and gentle balancing cleansing help keep it fresh and clear.'
  },
  {
    slug: 'normal',
    name: 'Normal Skin',
    image: '/skin/type-normal.jpg',
    published: true,
    description: 'Generally balanced, neither very oily nor very dry. Focus on environmental protection, antioxidants, and daily hydration maintenance.'
  },
  {
    slug: 'dry',
    name: 'Dry Skin',
    image: '/skin/type-dry.jpg',
    published: true,
    description: 'Skin that often feels tight or rough and can flake. Look for rich, cushioning textures, lipid replenishment, and barrier-supporting ceramides.'
  },
  {
    slug: 'sensitive',
    name: 'Sensitive Skin',
    image: '/skin/type-sensitive.jpg',
    published: true,
    description: 'Skin that reacts easily with redness or stinging. Choose simple, calming, fragrance-free formulas with centella and soothing botanicals.'
  },
  {
    slug: 'combination',
    name: 'Combination Skin',
    image: '/skin/type-combination.jpg',
    published: true,
    description: 'Oilier through the T-zone and normal to dry along cheeks. Dual-action balancing textures work comfortably across all facial zones.'
  }
];

export const skinConcerns: SkinAttribute[] = [
  {
    slug: 'acne',
    name: 'Acne & Blemishes',
    image: '/skin/concern-acne.jpg',
    published: true,
    description: 'Targeted formulas with gotu kola, niacinamide, and gentle BHA to clarify congested pores and calm active breakouts.'
  },
  {
    slug: 'anti-aging',
    name: 'Anti-Aging',
    image: '/skin/concern-anti-aging.jpg',
    published: true,
    description: 'Restorative retinal, peptides, and collagen-boosting botanicals that improve elasticity and smooth the appearance of fine lines.'
  },
  {
    slug: 'hyperpigmentation',
    name: 'Hyperpigmentation',
    image: '/skin/concern-hyperpigmentation.jpg',
    published: true,
    description: 'Clinically proven actives that fade post-inflammatory marks, sun spots, and uneven pigmentation over time.'
  },
  {
    slug: 'brightening',
    name: 'Brightening',
    image: '/skin/concern-brightening.jpg',
    published: true,
    description: 'Stabilized Vitamin C, licorice root, and AHA tonics to illuminate fatigue and reveal healthy, radiant skin.'
  },
  {
    slug: 'dark-circles',
    name: 'Dark Circles',
    image: '/skin/concern-dark-circles.jpg',
    published: true,
    description: 'Peptide and caffeine eye treatments formulated to awaken tired under-eyes and soften puffiness.'
  },
  {
    slug: 'pores',
    name: 'Open Pores',
    image: '/skin/concern-pores.jpg',
    published: true,
    description: 'Gentle refining exfoliants and clay masks that minimize the appearance of enlarged, visible pores.'
  },
  {
    slug: 'dehydration',
    name: 'Dehydration',
    image: '/skin/concern-dehydration.jpg',
    published: true,
    description: 'Multi-molecular hyaluronic acid and fermented essences that saturate thirsty skin cells with weightless moisture.'
  },
  {
    slug: 'dullness',
    name: 'Dullness',
    image: '/skin/concern-dullness.jpg',
    published: true,
    description: 'Gentle fruit enzyme exfoliants and micro-polishing botanicals for an instantly revived, refreshed glow.'
  },
  {
    slug: 'redness',
    name: 'Redness',
    image: '/skin/concern-redness.jpg',
    published: true,
    description: 'Barrier-reinforcing ceramides, gotu kola, and colloidal oatmeal to cool flushing and comfort sensitized barriers.'
  },
  {
    slug: 'sun-protection',
    name: 'Sun Protection',
    image: '/skin/concern-sun-protection.jpg',
    published: true,
    description: 'Broad-spectrum SPF 50+ mineral and invisible fluids designed for hot, humid tropical climates without white cast.'
  }
];
