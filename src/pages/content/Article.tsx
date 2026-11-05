import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { articles } from '../../data/articles';
import type { Product } from '../../types/catalog';
import { getCategoryBySlug, getCategoryUrl, getProductById } from '../../utils/catalog';
import { formatDate } from '../../utils/format';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { ProductCard } from '../../components/product/ProductCard';
import { ArticleCard } from '../../components/content/ArticleCard';
import { NotFound } from '../NotFound';

export function Article() {
  const { slug = '' } = useParams();
  const article = articles.find((a) => a.slug === slug && a.published);
  useDocumentMeta(article?.title ?? 'Article', article?.excerpt);
  if (!article) return <NotFound title="This article isn’t available" description="It may have been unpublished. Explore the latest stories in our journal." />;

  const category = article.relatedCategorySlug ? getCategoryBySlug(article.relatedCategorySlug) : undefined;
  const more = articles.filter((a) => a.published && a.slug !== article.slug).slice(0, 3);

  return (
    <article className="pb-20">
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ label: 'Journal', to: '/journal' }, { label: article.title }]} />
        <p className="text-sm font-medium text-brand">{article.topic}</p>
        <h1 className="mt-2 font-display text-4xl leading-[1.1] text-ink md:text-[52px]">{article.title}</h1>
        <p className="mt-4 text-lg text-ink-2">{article.excerpt}</p>
        <p className="mt-4 text-sm text-ink-muted">
          {article.author} · {formatDate(article.publishedAt)} · {article.readMinutes} min read
        </p>
      </Container>
      <Container className="mt-8 max-w-5xl">
        <img src={article.image} alt="" className="aspect-[16/9] w-full rounded-2xl object-cover" />
      </Container>
      <Container className="prose-content mt-10 max-w-3xl">
        {article.body.map((block, i) => {
          switch (block.type) {
            case 'p':
              return <p key={i}>{block.text}</p>;
            case 'h2':
              return <h2 key={i}>{block.text}</h2>;
            case 'h3':
              return <h3 key={i}>{block.text}</h3>;
            case 'ul':
              return <ul key={i}>{block.items.map((it) => <li key={it}>{it}</li>)}</ul>;
            case 'products':{
                const items = block.productIds.map(getProductById).filter((p): p is Product => Boolean(p));
                if (!items.length) return null;
                return (
                  <aside key={i} aria-label={block.title} className="my-10 rounded-2xl bg-brand-pale p-5 sm:p-6">
                  <p className="mb-5 text-sm font-semibold text-ink">{block.title}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                    {items.slice(0, 3).map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
                  </ul>
                  {items.length > 3 &&
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      {items.slice(3).map((p) => <li key={p.id}><Link to={`/product/${p.slug}`} className="text-ink underline underline-offset-2">{p.name}</Link></li>)}
                    </ul>
                    }
                </aside>);

              }
          }
        })}
        <p className="mt-10 border-t border-line pt-6 text-xs text-ink-muted">
          This article is for general information and isn’t medical advice. For skin conditions, please consult a qualified dermatologist.
        </p>
        {category &&
        <Link to={getCategoryUrl(category)} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            Shop {category.name.toLowerCase()} <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      </Container>

      {more.length > 0 &&
      <Container className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-3xl text-ink">Keep reading</h2>
          <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((a) => <li key={a.slug}><ArticleCard article={a} /></li>)}
          </ul>
        </Container>
      }
    </article>);

}