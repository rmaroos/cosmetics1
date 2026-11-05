import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { faqs } from '../../data/faqs';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { Accordion } from '../../components/ui/Accordion';

export function Faqs() {
  useDocumentMeta('FAQs', 'Answers to common questions about orders, delivery, payment, products and returns.');
  const topics = Array.from(new Set(faqs.map((f) => f.topic)));
  return (
    <Container className="max-w-4xl pb-20">
      <Breadcrumbs items={[{ label: 'FAQs' }]} />
      <h1 className="font-display text-4xl text-ink md:text-5xl">Frequently asked questions</h1>
      <nav aria-label="FAQ topics" className="mt-6 flex flex-wrap gap-2">
        {topics.map((t) =>
        <a key={t} href={`#faq-${t.toLowerCase()}`} className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:border-ink">{t}</a>
        )}
      </nav>
      <div className="mt-10 space-y-12">
        {topics.map((t) =>
        <section key={t} id={`faq-${t.toLowerCase()}`} aria-labelledby={`faq-h-${t}`} className="scroll-mt-24">
            <h2 id={`faq-h-${t}`} className="mb-2 text-xl font-semibold text-ink">{t}</h2>
            <div className="border-t border-line">
              {faqs.filter((f) => f.topic === t).map((f) =>
            <Accordion key={f.question} title={f.question}>{f.answer}</Accordion>
            )}
            </div>
          </section>
        )}
      </div>
      <p className="mt-12 rounded-2xl bg-surface p-6 text-ink-2">
        Can’t find what you’re looking for? <Link to="/contact" className="font-medium text-ink underline underline-offset-2">Contact our team</Link>.
      </p>
    </Container>);

}