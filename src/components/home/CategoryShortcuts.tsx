import React from 'react';
import { Link } from 'react-router-dom';
import { getTopCategories, categoryProductCount } from '../../utils/catalog';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';

export function CategoryShortcuts() {
  const cats = getTopCategories().filter((c) => c.image && categoryProductCount(c.id) > 0);
  if (!cats.length) return null;
  return (
    <section aria-labelledby="shop-category" className="pt-16 md:pt-24">
      <Container>
        <SectionHeader id="shop-category" title="Shop by category" align="center" />
        <ul className="no-scrollbar -mx-4 mt-10 flex gap-5 overflow-x-auto px-4 sm:-mx-6 sm:px-6 md:mt-12 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-6 lg:overflow-visible lg:px-0">
          {cats.map((c, idx) => (
            <ScrollItem
              key={c.id}
              as="li"
              index={idx}
              yOffset={24}
              duration={0.65}
              className="w-28 shrink-0 sm:w-32 lg:w-auto"
            >
              <Link to={`/category/${c.slug}`} className="group flex flex-col items-center text-center">
                <span className="block aspect-square w-full overflow-hidden rounded-full bg-product p-1 ring-1 ring-line transition-[box-shadow] duration-300 group-hover:ring-gold">
                  <span className="block h-full w-full overflow-hidden rounded-full">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </span>
                </span>
                <span className="mt-4 type-label leading-tight text-ink transition-colors group-hover:text-brand">
                  {c.name}
                </span>
              </Link>
            </ScrollItem>
          ))}
        </ul>
      </Container>
    </section>
  );
}
