import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { ingredients } from '../../data/ingredients';
import { articles } from '../../data/articles';
import { getConcern, searchProducts } from '../../utils/catalog';
import { pluralize } from '../../utils/format';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { ArticleCard } from '../../components/content/ArticleCard';

export function Ingredients() {
  useDocumentMeta('Ingredients guide', 'Learn what popular skincare ingredients do, what they pair well with, and which products contain them.');
  const [query, setQuery] = useState('');
  const list = ingredients.filter((i) => i.name.toLowerCase().includes(query.trim().toLowerCase()));
  const explainers = articles.filter((a) => a.published && a.kind === 'ingredient');

  return (
    <Container className="pb-20">
      <ListingHeader
        crumbs={[{ label: 'Discover', to: '/discover' }, { label: 'Ingredients guide' }]}
        title="Ingredients guide"
        description="A plain-English guide to the ingredients you’ll see most often, and where to find them."
        aside={
        <div className="w-full md:w-72">
            <label htmlFor="ingredient-search" className="sr-only">Filter ingredients</label>
            <input id="ingredient-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter ingredients" className="h-11 w-full rounded-lg border border-line px-3.5 text-[15px] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25" />
          </div>
        } />
      
      {list.length === 0 ?
      <p className="py-10 text-ink-2">No ingredients match “{query}”.</p> :

      <ul className="divide-y divide-line border-y border-line">
          {list.map((ing) => {
          const count = searchProducts(ing.name.split(' (')[0]).length;
          return (
            <li key={ing.slug} className="grid gap-4 py-7 md:grid-cols-[240px_1fr_auto] md:gap-10">
                <h2 className="font-display text-2xl text-ink">{ing.name}</h2>
                <div className="text-[15px] text-ink-2">
                  <p>{ing.summary}</p>
                  <p className="mt-2 text-sm"><span className="font-medium text-ink">Pairs well with:</span> {ing.pairsWith}</p>
                  {ing.caution &&
                <p className="mt-2 flex gap-2 text-sm text-ink-2"><AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" /> {ing.caution}</p>
                }
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ing.goodFor.map(getConcern).map((c) => c &&
                  <Link key={c.slug} to={`/skin-concern/${c.slug}`} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink hover:bg-brand-pale">{c.name}</Link>
                  )}
                  </div>
                </div>
                {count > 0 &&
              <Link to={`/search?q=${encodeURIComponent(ing.name.split(' (')[0])}`} className="self-start whitespace-nowrap text-sm font-medium text-brand underline-offset-2 hover:underline">
                    Shop {pluralize(count, 'product')}
                  </Link>
              }
              </li>);

        })}
        </ul>
      }
      {explainers.length > 0 &&
      <section className="mt-16">
          <h2 className="font-display text-3xl text-ink">Ingredient deep dives</h2>
          <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {explainers.map((a) => <li key={a.slug}><ArticleCard article={a} /></li>)}
          </ul>
        </section>
      }
    </Container>);

}