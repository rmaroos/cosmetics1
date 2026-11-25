import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { articles } from '../../data/articles';
import type { ArticleKind } from '../../types/content';
import { Container } from '../../components/layout/Container';
import { ListingHeader } from '../../components/listing/ListingHeader';
import { SubcategoryChips } from '../../components/listing/ProductListing';
import { ArticleCard } from '../../components/content/ArticleCard';
import { EmptyState } from '../../components/ui/States';

type Props = {kind?: ArticleKind;};

const titles: Record<ArticleKind | 'all', {title: string;description: string;}> = {
  all: { title: 'Beauty journal', description: 'Routines, ingredient explainers and practical beauty advice for life in the tropics.' },
  journal: { title: 'Beauty journal', description: 'Routines, ingredient explainers and practical beauty advice.' },
  routine: { title: 'Routine guides', description: 'Simple, step-by-step routines for different skin types and goals.' },
  ingredient: { title: 'Ingredient explainers', description: 'What popular ingredients do and how to use them.' }
};

export function Journal({ kind }: Props) {
  const [params] = useSearchParams();
  const topic = params.get('topic');
  const meta = titles[kind ?? 'all'];
  useDocumentMeta(meta.title, meta.description);

  const published = articles.filter((a) => a.published && (!kind || a.kind === kind));
  const topics = Array.from(new Set(published.map((a) => a.topic)));
  const list = published.filter((a) => !topic || a.topic === topic).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const base = kind === 'routine' ? '/routines' : '/journal';

  return (
    <Container className="pb-20">
      <ListingHeader crumbs={kind === 'routine' ? [{ label: 'Discover', to: '/discover' }, { label: 'Routine guides' }] : [{ label: 'Journal' }]} title={meta.title} description={meta.description} />
      {topics.length > 1 &&
      <SubcategoryChips items={[{ label: 'All', to: base, active: !topic }, ...topics.map((t) => ({ label: t, to: `${base}?topic=${encodeURIComponent(t)}`, active: topic === t }))]} />
      }
      {list.length === 0 ?
      <EmptyState title="No articles yet" description="New stories are on the way." /> :

      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) =>
        <li key={a.slug}><ArticleCard article={a} /></li>
        )}
        </ul>
      }
    </Container>);

}