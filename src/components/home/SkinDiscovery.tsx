import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { catalogConcerns, catalogSkinTypes } from '../../utils/catalog';
import { Container } from '../layout/Container';

export function SkinDiscovery() {
  const [activeTab, setActiveTab] = useState<'type' | 'concern'>('type');

  // Dynamic catalog data: active & published items only
  const skinTypes = catalogSkinTypes.filter((s) => s.published);
  const skinConcerns = catalogConcerns.filter((s) => s.published);

  if (!skinTypes.length && !skinConcerns.length) return null;

  return (
    <section
      aria-labelledby="skin-discovery-heading"
      className="bg-white py-14 sm:py-16 md:py-20"
    >
      <Container>
        {/* 1. Main Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="skin-discovery-heading"
            className="font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Find What Your Skin Needs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-2 sm:text-base">
            Discover beauty products tailored to your skin type and the skincare concerns you want to focus on.
          </p>

          {/* 2. Two Switchable Views (Segmented Tab Control) */}
          <div className="mt-7 flex justify-center sm:mt-8">
            <div
              role="tablist"
              aria-label="Shop for Your Skin Views"
              className="inline-flex items-center rounded-full border border-line bg-[#F5F5F7] p-1.5 shadow-inner"
            >
              <button
                type="button"
                role="tab"
                id="tab-skin-type"
                aria-selected={activeTab === 'type'}
                aria-controls="panel-skin-type"
                onClick={() => setActiveTab('type')}
                className={`relative rounded-full px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 sm:px-7 sm:text-sm ${
                  activeTab === 'type'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-2 hover:text-ink'
                }`}
              >
                Shop by Skin Type
              </button>
              <button
                type="button"
                role="tab"
                id="tab-skin-concern"
                aria-selected={activeTab === 'concern'}
                aria-controls="panel-skin-concern"
                onClick={() => setActiveTab('concern')}
                className={`relative rounded-full px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-300 sm:px-7 sm:text-sm ${
                  activeTab === 'concern'
                    ? 'bg-white text-ink shadow-sm'
                    : 'text-ink-2 hover:text-ink'
                }`}
              >
                Shop by Skin Concern
              </button>
            </div>
          </div>
        </div>

        {/* 6. Complete Responsive Grid (No horizontal scrolling / No carousels) */}
        <div
          role="tabpanel"
          id={activeTab === 'type' ? 'panel-skin-type' : 'panel-skin-concern'}
          aria-labelledby={activeTab === 'type' ? 'tab-skin-type' : 'tab-skin-concern'}
          className="mt-10 sm:mt-12"
        >
          {activeTab === 'type' ? (
            /* 3. View One – Shop by Skin Type */
            <div
              key="skin-types-grid"
              className={`grid gap-4 sm:gap-6 ${
                skinTypes.length === 5
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
              }`}
            >
              {skinTypes.map((type) => (
                <Link
                  key={type.slug}
                  to={`/skin-type/${type.slug}`}
                  className="group flex flex-col focus:outline-none"
                  aria-label={`Shop products for ${type.name}`}
                >
                  {/* Portrait-oriented image container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-product shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-brand">
                    <img
                      src={type.image}
                      alt={`${type.name} - ${type.description}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Skin type name beneath image */}
                  <div className="pt-3 text-center sm:pt-3.5">
                    <span className="font-display text-lg font-medium text-ink transition-colors duration-200 group-hover:text-brand sm:text-xl">
                      {type.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* 4. View Two – Shop by Skin Concern */
            <div
              key="skin-concerns-grid"
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-6"
            >
              {skinConcerns.map((concern) => (
                <Link
                  key={concern.slug}
                  to={`/skin-concern/${concern.slug}`}
                  className="group flex flex-col focus:outline-none"
                  aria-label={`Shop products for ${concern.name}`}
                >
                  {/* Portrait-oriented image container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-product shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-brand">
                    <img
                      src={concern.image}
                      alt={`${concern.name} - ${concern.description}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Concern name beneath image with a small arrow icon */}
                  <div className="flex items-center justify-between gap-1.5 pt-3 sm:pt-3.5">
                    <span className="truncate font-display text-base font-medium text-ink transition-colors duration-200 group-hover:text-brand sm:text-lg lg:text-xl">
                      {concern.name}
                    </span>
                    <ArrowRightIcon
                      className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-brand"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
