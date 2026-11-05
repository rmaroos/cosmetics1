import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../../types/content';
import { formatDate } from '../../utils/format';

export function ArticleCard({ article, large }: {article: Article;large?: boolean;}) {
  return (
    <article className="group flex h-full flex-col">
      <Link to={`/journal/${article.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-xl">
        <img
          src={article.image}
          alt=""
          loading="lazy"
          className={`w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${large ? 'aspect-[4/3] lg:aspect-[16/11]' : 'aspect-[3/2]'}`} />
        
      </Link>
      <p className="mt-4 text-xs font-medium text-brand">{article.topic}</p>
      <h3 className={`mt-1.5 font-display leading-tight text-ink ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
        <Link to={`/journal/${article.slug}`} className="hover:underline underline-offset-4 decoration-1">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-[15px] text-ink-2">{article.excerpt}</p>
      <p className="mt-auto pt-3 text-xs text-ink-muted">
        {formatDate(article.publishedAt)} · {article.readMinutes} min read
      </p>
    </article>);

}