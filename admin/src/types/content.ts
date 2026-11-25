export type ArticleBlock =
{type: 'p';text: string;} |
{type: 'h2';text: string;} |
{type: 'h3';text: string;} |
{type: 'ul';items: string[];} |
{type: 'products';title: string;productIds: string[];};

export type ArticleKind = 'journal' | 'routine' | 'ingredient';

export type Article = {
  slug: string;
  title: string;
  kind: ArticleKind;
  topic: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  body: ArticleBlock[];
  relatedCategorySlug?: string;
  published: boolean;
};

export type Ingredient = {
  slug: string;
  name: string;
  summary: string;
  goodFor: string[];
  pairsWith: string;
  caution?: string;
};

export type InfoPage = {
  slug: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: {heading: string;paragraphs?: string[];list?: string[];}[];
};

export type Faq = {
  topic: string;
  question: string;
  answer: string;
};