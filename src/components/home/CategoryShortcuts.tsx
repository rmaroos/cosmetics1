import React from 'react';
import { Link } from 'react-router-dom';
import { getTopCategories, categoryProductCount } from '../../utils/catalog';
import { Container } from '../layout/Container';

export function CategoryShortcuts() {
  const cats = getTopCategories().filter((c) => c.image && categoryProductCount(c.id) > 0);
  if (!cats.length) return null;
  return (
    <section aria-labelledby="shop-category" className="py-12 md:py-16">
      <Container>
        <h2 id="shop-category" className="font-display text-3xl text-ink md:text-4xl">
          Shop by category
        </h2>
        <ul className="no-scrollbar -mx-4 mt-6 flex gap-5 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-6 lg:overflow-visible lg:px-0">
          {cats.map((c) =>
          <li key={c.id} className="w-24 shrink-0 sm:w-28 lg:w-auto">
              <Link to={`/category/${c.slug}`} className="group flex flex-col items-center text-center">
                <span className="block aspect-square w-full overflow-hidden rounded-full bg-product">
                  <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
                </span>
                <span className="mt-3 text-sm font-medium leading-tight text-ink group-hover:text-brand">{c.name}</span>
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </section>);

}