import { Link } from 'react-router-dom';
import { img } from '../../data/images';
import { Container } from '../layout/Container';
import { ScrollItem } from '../ui/ScrollReveal';

type Tile = {
  id: string;
  title: string;
  href: string;
  image: string;
  cta: string;
};

/** Editorial collection grid: three tiles, then two wide tiles. */
const topRow: Tile[] = [
  { id: 'skincare', title: 'Skincare essentials', href: '/category/skincare', image: img.editorialRoutine, cta: 'Shop now' },
  { id: 'makeup', title: 'Makeup in style', href: '/category/makeup', image: img.journalMakeup, cta: 'Shop now' },
  { id: 'body', title: 'Body care', href: '/category/body-care', image: img.bodyLifestyle, cta: 'Shop now' },
];

const bottomRow: Tile[] = [
  { id: 'hair', title: 'Hair care collection', href: '/category/hair-care', image: img.hairLifestyle, cta: 'Shop now' },
  { id: 'offers', title: 'Offers for everybody', href: '/collection/offers', image: img.campaignMakeup, cta: 'Shop offers' },
];

function TileCard({ tile, tall }: { tile: Tile; tall?: boolean }) {
  return (
    <Link
      to={tile.href}
      className={`group relative block overflow-hidden rounded-2xl bg-product focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        tall ? 'aspect-[4/5] sm:aspect-[4/4.4]' : 'aspect-[4/5] sm:aspect-[16/9]'
      }`}
    >
      <img
        src={tile.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <h3 className="type-category">
          {tile.title}
        </h3>
        <span className="mt-5 inline-flex h-10 items-center rounded-full bg-white px-6 type-button text-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
          {tile.cta}
        </span>
      </div>
    </Link>
  );
}

export function CollectionTiles() {
  return (
    <section aria-labelledby="collection-tiles-heading" className="pb-4 pt-12 md:pb-8 md:pt-16">
      <h2 id="collection-tiles-heading" className="sr-only">Shop collections</h2>
      <Container className="space-y-4 md:space-y-6">
        <div className="grid gap-4 sm:grid-cols-3 md:gap-6">
          {topRow.map((t, i) => (
            <ScrollItem key={t.id} index={i} yOffset={24} duration={0.7}>
              <TileCard tile={t} tall />
            </ScrollItem>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          {bottomRow.map((t, i) => (
            <ScrollItem key={t.id} index={i} yOffset={24} duration={0.7}>
              <TileCard tile={t} />
            </ScrollItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
