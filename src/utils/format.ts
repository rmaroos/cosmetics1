import { format, parseISO } from 'date-fns';

const lkr = new Intl.NumberFormat('en-LK', { maximumFractionDigits: 0 });

export function formatPrice(amount: number): string {
  return `Rs ${lkr.format(Math.round(amount))}`;
}

export function formatDate(iso: string, pattern = 'd MMM yyyy'): string {
  try {
    return format(parseISO(iso), pattern);
  } catch {
    return iso;
  }
}

export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round((compareAt - price) / compareAt * 100);
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function slugify(value: string): string {
  return value.
  toLowerCase().
  replace(/[^a-z0-9]+/g, '-').
  replace(/(^-|-$)/g, '');
}