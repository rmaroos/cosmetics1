import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Overlay } from '../ui/Overlay';

type Props = {images: string[];name: string;};

export function ProductGallery({ images, name }: Props) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const count = images.length;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count);
  const alt = (i: number) => `${name} — image ${i + 1} of ${count}`;

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
      {count > 1 &&
      <ul className="no-scrollbar flex gap-3 overflow-x-auto md:w-20 md:flex-col md:overflow-visible" aria-label="Product images">
          {images.map((src, i) =>
        <li key={src + i} className="shrink-0">
              <button
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={twMerge('block h-16 w-16 overflow-hidden rounded-lg border-2 bg-product md:h-20 md:w-20', i === index ? 'border-ink' : 'border-transparent hover:border-line')}>
            
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
        )}
        </ul>
      }
      <div
        className="group relative flex-1 overflow-hidden rounded-2xl bg-product"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}>
        
        <button type="button" onClick={() => setZoom(true)} className="block aspect-square w-full cursor-zoom-in" aria-label="Open larger image">
          <img src={images[index]} alt={alt(index)} className="h-full w-full object-cover" />
        </button>
        <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink" aria-hidden="true">
          <ExpandIcon className="h-4 w-4" />
        </span>
        {count > 1 &&
        <>
            <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white" aria-label="Previous image">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white" aria-label="Next image">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        }
      </div>

      <Overlay open={zoom} onClose={() => setZoom(false)} title={`${name} images`} variant="modal" className="max-w-3xl">
        <div className="relative bg-product">
          <img src={images[index]} alt={alt(index)} className="max-h-[75vh] w-full object-contain" />
          {count > 1 &&
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
              <button type="button" onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink" aria-label="Previous image">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <span className="flex items-center rounded-full bg-white px-3 text-xs tabular-nums text-ink">{index + 1} / {count}</span>
              <button type="button" onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink" aria-label="Next image">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          }
        </div>
      </Overlay>
    </div>);

}