import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { infoPages } from '../../data/infoPages';
import { formatDate } from '../../utils/format';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { NotFound } from '../NotFound';

export function InfoPage({ slug }: {slug: string;}) {
  const page = infoPages.find((p) => p.slug === slug);
  useDocumentMeta(page?.title ?? 'Information', page?.intro);
  if (!page) return <NotFound />;
  return (
    <Container className="pb-20">
      <Breadcrumbs items={[{ label: page.title }]} />
      <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <nav aria-label="Customer information" className="order-2 lg:order-1">
          <ul className="space-y-1 border-t border-line pt-4 lg:border-0 lg:pt-0">
            {infoPages.map((p) =>
            <li key={p.slug}>
                <Link to={`/${p.slug}`} aria-current={p.slug === slug ? 'page' : undefined} className={`block rounded-lg px-3 py-2 text-sm ${p.slug === slug ? 'bg-brand-pale font-medium text-ink' : 'text-ink-2 hover:text-ink'}`}>
                  {p.title}
                </Link>
              </li>
            )}
            <li><Link to="/faqs" className="block rounded-lg px-3 py-2 text-sm text-ink-2 hover:text-ink">FAQs</Link></li>
            <li><Link to="/contact" className="block rounded-lg px-3 py-2 text-sm text-ink-2 hover:text-ink">Contact us</Link></li>
          </ul>
        </nav>
        <div className="order-1 max-w-2xl lg:order-2">
          <h1 className="font-display text-4xl text-ink md:text-5xl">{page.title}</h1>
          <p className="mt-2 text-sm text-ink-muted">Last updated {formatDate(page.updatedAt)}</p>
          <div className="prose-content mt-6">
            <p className="text-lg">{page.intro}</p>
            {page.sections.map((s) =>
            <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.list && <ul>{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
              </section>
            )}
          </div>
        </div>
      </div>
    </Container>);

}