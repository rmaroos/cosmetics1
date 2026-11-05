import { useEffect } from 'react';
import { siteConfig } from '../data/site';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useDocumentMeta(title: string, description?: string, options?: {noindex?: boolean;}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} — Beauty & skincare in Sri Lanka`;
    document.title = fullTitle;
    const desc = description ?? siteConfig.tagline;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'robots', options?.noindex ? 'noindex, nofollow' : 'index, follow');
  }, [title, description, options?.noindex]);
}