import React from 'react';
import { Link } from 'react-router-dom';
import { getTopCategories, categoryProductCount } from '../../utils/catalog';
import { Container } from '../layout/Container';
<<<<<<< HEAD
import { ScrollItem } from '../ui/ScrollReveal';
import { SectionHeader } from '../ui/SectionHeader';
=======
import { ScrollReveal, ScrollItem } from '../ui/ScrollReveal';
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9

export function CategoryShortcuts() {
  const cats = getTopCategories().filter((c) => c.image && categoryProductCount(c.id) > 0);
  if (!cats.length) return null;
  return (
<<<<<<< HEAD
    <section aria-labelledby="shop-category" className="pt-16 md:pt-24">
      <Container>
        <SectionHeader id="shop-category" title="Shop by category" align="center" />
        <ul className="no-scrollbar -mx-4 mt-10 flex gap-5 overflow-x-auto px-4 sm:-mx-6 sm:px-6 md:mt-12 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-6 lg:overflow-visible lg:px-0">
=======
    <section aria-labelledby="shop-category" className="py-12 md:py-16">
      <Container>
        <ScrollReveal yOffset={20} duration={0.65}>
          <h2 id="shop-category" className="font-display text-3xl text-ink md:text-4xl">
            Shop by category
          </h2>
        </ScrollReveal>
        <ul className="no-scrollbar -mx-4 mt-6 flex gap-5 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-6 lg:overflow-visible lg:px-0">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          {cats.map((c, idx) => (
            <ScrollItem
              key={c.id}
              as="li"
              index={idx}
              yOffset={24}
              duration={0.65}
<<<<<<< HEAD
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
=======
              className="w-24 shrink-0 sm:w-28 lg:w-auto"
            >
              <Link to={`/category/${c.slug}`} className="group flex flex-col items-center text-center">
                <span className="block aspect-square w-full overflow-hidden rounded-full bg-product">
                  <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" />
                </span>
                <span className="mt-3 text-sm font-medium leading-tight text-ink group-hover:text-brand">{c.name}</span>
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
              </Link>
            </ScrollItem>
          ))}
        </ul>
      </Container>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
