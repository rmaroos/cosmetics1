import { catalogCollections, catalogConcerns, catalogSkinTypes, getChildCategories, getTopCategories } from '../../utils/catalog';

export type NavLink = {label: string;to: string;};
export type NavGroup = {heading: string;to?: string;links: NavLink[];};

/** Navigation is derived from published catalogue data — nothing is hardcoded per category. */
export function shopGroups(): NavGroup[] {
  return getTopCategories().map((c) => ({
    heading: c.name,
    to: `/category/${c.slug}`,
    links: getChildCategories(c.id).map((child) => ({ label: child.name, to: `/category/${c.slug}/${child.slug}` }))
  }));
}

export function collectionLinks(): NavLink[] {
  return catalogCollections.map((c) => ({ label: c.name, to: `/collection/${c.slug}` }));
}

export function discoverGroups(): NavGroup[] {
  return [
  { heading: 'Shop by skin type', to: '/discover#skin-types', links: catalogSkinTypes.map((s) => ({ label: s.name, to: `/skin-type/${s.slug}` })) },
  { heading: 'Shop by concern', to: '/discover#concerns', links: catalogConcerns.map((s) => ({ label: s.name, to: `/skin-concern/${s.slug}` })) },
  {
    heading: 'Learn',
    links: [
    { label: 'Ingredients guide', to: '/ingredients' },
    { label: 'Routine guides', to: '/routines' },
    { label: 'Beauty journal', to: '/journal' }]

  }];

}

export const primaryLinks: NavLink[] = [
{ label: 'New in', to: '/collection/new-arrivals' },
{ label: 'Best sellers', to: '/collection/best-sellers' },
{ label: 'Brands', to: '/brands' },
{ label: 'Offers', to: '/collection/offers' }];