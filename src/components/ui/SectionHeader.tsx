import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

type Props = {
  id: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  align?: 'left' | 'center';
};

/** Editorial section heading shared across storefront sections. */
export function SectionHeader({ id, title, description, linkHref, linkLabel = 'View all', align = 'left' }: Props) {
  if (align === 'center') {
    return (
      <ScrollReveal yOffset={20} duration={0.65}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={id} className="heading-xl">{title}</h2>
          {description && (
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-2">{description}</p>
          )}
          {linkHref && (
            <Link to={linkHref} className="link-luxe mt-6">
              {linkLabel}
            </Link>
          )}
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal yOffset={20} duration={0.65}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h2 id={id} className="heading-xl">{title}</h2>
          {description && (
            <p className="mt-5 text-base leading-relaxed text-ink-2">{description}</p>
          )}
        </div>
        {linkHref && (
          <div className="hidden shrink-0 pb-2 sm:block">
            <Link to={linkHref} className="link-luxe group">
              <span>{linkLabel}</span>
              <ArrowRightIcon
                className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

/** Full-width outline link shown under grids on mobile. */
export function MobileViewAll({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-10 flex justify-center sm:hidden">
      <Link
        to={href}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-brand type-button text-brand transition-colors active:bg-brand-soft"
      >
        {label}
        <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
      </Link>
    </div>
  );
}
