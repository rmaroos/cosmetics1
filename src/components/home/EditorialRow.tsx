import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { articles } from '../../data/articles';
import { Container } from '../layout/Container';
import { ArticleCard } from '../content/ArticleCard';
import { ScrollReveal, ScrollItem } from '../ui/ScrollReveal';

export function EditorialRow() {
  const list = articles.filter((a) => a.published).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);
  if (!list.length) return null;
  const [lead, ...rest] = list;
  return (
<<<<<<< HEAD
    <section aria-labelledby="journal-heading" className="bg-brand-pale py-16 md:py-24">
      <Container>
        <ScrollReveal yOffset={20} duration={0.65}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><h2 id="journal-heading" className="heading-xl">
              Notes on beautiful skin
            </h2></div>
            <Link to="/journal" className="link-luxe self-start sm:self-auto">
              Read more <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-[3fr_2fr] lg:gap-12">
=======
    <section aria-labelledby="journal-heading" className="bg-brand-pale py-12 md:py-20">
      <Container>
        <ScrollReveal yOffset={20} duration={0.65}>
          <div className="flex items-end justify-between gap-4">
            <h2 id="journal-heading" className="font-display text-3xl text-ink md:text-4xl">
              From the journal
            </h2>
            <Link to="/journal" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-brand">
              Read more <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          <ScrollItem index={0} yOffset={24} duration={0.7}>
            <ArticleCard article={lead} large />
          </ScrollItem>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((a, idx) => (
              <ScrollItem key={a.slug} index={idx + 1} yOffset={24} duration={0.7}>
                <ArticleCard article={a} />
              </ScrollItem>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}