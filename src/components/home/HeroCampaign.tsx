import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { img } from '../../data/images';
import {
  type MarqueeMessage,
  defaultMarqueeMessages,
  getActiveMarqueeMessages,
} from '../../config/bannerConfig';

interface EditorialSlide {
  id: string;
  headlineLine1: string;
  headlineLine2Lead: string;
  headlineLine2Overlap: string;
  description: string;
  ctaPrimaryText: string;
  ctaPrimaryUrl: string;
  ctaSecondaryText: string;
  ctaSecondaryUrl: string;
  image: string;
  imageAlt: string;
  tagline: string;
  sinceYear: string;
}

const editorialSlides: EditorialSlide[] = [
  {
    id: 'glow',
    headlineLine1: 'Discover Your',
    headlineLine2Lead: 'Natural ',
    headlineLine2Overlap: 'Glow',
    description:
      'Discover beauty essentials curated to enhance your natural glow. Explore premium skincare, makeup and beauty products.',
    ctaPrimaryText: 'Shop Collection',
    ctaPrimaryUrl: '/collection/best-sellers',
    ctaSecondaryText: 'Explore Beauty',
    ctaSecondaryUrl: '/category/skincare',
    image: img.hero,
    imageAlt: 'Radiant model with glowing, luminous skin in warm natural light',
    tagline: 'Beauty product company',
    sinceYear: 'since 2021',
  },
  {
    id: 'botanicals',
    headlineLine1: 'Pure Botanical',
    headlineLine2Lead: 'Daily ',
    headlineLine2Overlap: 'Radiance',
    description:
      'Dermatologist-tested skincare and pure active botanicals crafted for tropical humidity and everyday radiance.',
    ctaPrimaryText: 'Shop Skincare',
    ctaPrimaryUrl: '/category/skincare',
    ctaSecondaryText: 'Find Your Routine',
    ctaSecondaryUrl: '/discover',
    image: img.campaignSkincare,
    imageAlt: 'Curated skincare bottles and restorative facial cream jars',
    tagline: 'Botanical science',
    sinceYear: 'since 2021',
  },
  {
    id: 'complexion',
    headlineLine1: 'Luminous Velvet',
    headlineLine2Lead: 'Complexion ',
    headlineLine2Overlap: 'Finish',
    description:
      'Flawless, breathable serum foundations and velvety textures tailored for South Asian undertones.',
    ctaPrimaryText: 'Discover Makeup',
    ctaPrimaryUrl: '/category/makeup',
    ctaSecondaryText: 'View Lip Shades',
    ctaSecondaryUrl: '/category/makeup/lips',
    image: img.campaignMakeup,
    imageAlt: 'High-fashion model featuring luminous radiant makeup and satin lip colour',
    tagline: 'Breathable beauty rituals',
    sinceYear: 'since 2021',
  },
];

const heroProductPreviews = [
  {
    id: 'p01',
    name: 'Gotu Kola Gentle Gel Cleanser',
    category: 'Cleanser',
    slug: 'gotu-kola-gentle-gel-cleanser',
    image: img.cleanser,
  },
  {
    id: 'p11',
    name: 'Vitamin C 15% Brightening Serum',
    category: 'Serum',
    slug: 'vitamin-c-15-brightening-serum',
    image: img.serum,
  },
  {
    id: 'p05',
    name: 'Ceramide Barrier Moisturiser',
    category: 'Moisturiser',
    slug: 'ceramide-barrier-moisturiser',
    image: img.creamJar,
  },
];

export function HeroCampaign() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [marqueeItems, setMarqueeItems] = useState<MarqueeMessage[]>(getActiveMarqueeMessages);
  const sliderRef = useRef<HTMLElement>(null);

  // Touch tracking for mobile swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = editorialSlides.length;
  const currentSlide = editorialSlides[currentIndex % totalSlides];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer every 6 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered || totalSlides <= 1) return;
    const timer = window.setInterval(nextSlide, 6000);
    return () => window.clearInterval(timer);
  }, [isHovered, totalSlides, nextSlide]);

  // Listen for admin changes to marquee
  useEffect(() => {
    const handleStorageChange = () => {
      setMarqueeItems(getActiveMarqueeMessages());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Smooth scroll down to next section
  const scrollToNext = () => {
    const nextSection =
      document.getElementById('trust-strip') ||
      document.getElementById('best-sellers') ||
      document.querySelector('main > section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 650, behavior: 'smooth' });
    }
  };

  const validMarquee = marqueeItems.length > 0 ? marqueeItems : defaultMarqueeMessages;

  return (
    <div className="w-full overflow-hidden">
      {/* ─── 1. FULL-WIDTH EDITORIAL HERO SECTION ───────────────────────── */}
      <section
        ref={sliderRef}
        tabIndex={0}
        role="region"
        aria-label="Editorial beauty campaign hero"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full bg-[#E5E7EB] text-neutral-900 overflow-hidden focus:outline-none"
      >
        {/* Right Architectural Tinted Column (Subtle architectural panel) */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[38%] xl:w-[35%] bg-[#DCDFE3] border-l border-neutral-300/40 pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Section Container */}
        <div className="relative mx-auto w-full max-w-[1720px] px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-14 sm:pb-16 lg:pb-20">
          
          {/* ─── Top Editorial Micro-Navigation Bar ────────────────────────── */}
          <div className="relative z-30 flex items-center justify-between pb-6 sm:pb-8 lg:pb-10 border-b border-neutral-300/40 lg:border-none">
            {/* Minimal Brand Monogram */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="font-sans text-2xl sm:text-3xl font-black tracking-tighter text-neutral-950 hover:opacity-80 transition-opacity"
                aria-label="Nelum Home"
              >
                И.
              </Link>
            </div>

            {/* Clean Navigation Links */}
            <nav
              aria-label="Hero navigation"
              className="hidden md:flex items-center gap-8 lg:gap-12 text-[13px] font-medium tracking-wide text-neutral-700"
            >
              <Link to="/about" className="hover:text-neutral-950 transition-colors">
                About
              </Link>
              <Link to="/shop" className="hover:text-neutral-950 transition-colors">
                Products
              </Link>
              <Link to="/category/skincare" className="hover:text-neutral-950 transition-colors">
                Skincare
              </Link>
              <Link to="/collection/best-sellers" className="hover:text-neutral-950 transition-colors">
                Packages
              </Link>
            </nav>

            {/* Small Brand Intro + 2-Line Menu Icon */}
            <div className="flex items-center gap-6 lg:gap-10">
              <div className="hidden lg:block text-right">
                <p className="text-xs text-neutral-500 tracking-normal">
                  {currentSlide.tagline}{' '}
                  <span className="font-semibold text-neutral-900">{currentSlide.sinceYear}</span>
                </p>
              </div>

              {/* Minimal 2-Line Hamburger Icon */}
              <button
                type="button"
                aria-label="Open menu"
                className="flex flex-col justify-center items-end gap-1.5 w-8 h-8 text-neutral-900 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
                onClick={() => {
                  const headerMenuBtn = document.querySelector<HTMLButtonElement>(
                    'header button[aria-label*="menu" i]'
                  );
                  headerMenuBtn?.click();
                }}
              >
                <span className="w-6 h-[2px] bg-neutral-900 rounded-full" />
                <span className="w-4 h-[2px] bg-neutral-900 rounded-full" />
              </button>
            </div>
          </div>

          {/* ─── Editorial Hero Composition ───────────────────────────────── */}
          <div className="relative pt-4 sm:pt-8 lg:pt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8 items-start"
              >
                {/* ─── Left Editorial Content Column (Span 8) ─────────────── */}
                <div className="lg:col-span-8 xl:col-span-7 z-20">
                  {/* Oversized Editorial Typography */}
                  <h1 className="font-sans font-black tracking-[-0.04em] text-neutral-950 text-[52px] leading-[0.9] sm:text-[76px] sm:leading-[0.88] md:text-[96px] md:leading-[0.86] lg:text-[112px] lg:leading-[0.86] xl:text-[132px] xl:leading-[0.84] 2xl:text-[144px]">
                    <span className="block text-neutral-950">
                      {currentSlide.headlineLine1}
                    </span>
                    <span className="block whitespace-nowrap">
                      <span className="text-neutral-950">{currentSlide.headlineLine2Lead}</span>
                      <span className="text-neutral-950 lg:text-white lg:drop-shadow-[0_2px_14px_rgba(0,0,0,0.22)]">
                        {currentSlide.headlineLine2Overlap}
                      </span>
                    </span>
                  </h1>

                  {/* Two Pill CTA Buttons */}
                  <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4">
                    <Link
                      to={currentSlide.ctaPrimaryUrl}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-neutral-950 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                      <span>{currentSlide.ctaPrimaryText}</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>

                    <Link
                      to={currentSlide.ctaSecondaryUrl}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-neutral-400 bg-white/30 backdrop-blur-xs px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-neutral-900 transition-all duration-300 hover:border-neutral-950 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                      <span>{currentSlide.ctaSecondaryText}</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>

                  {/* Supporting Description */}
                  <p className="mt-6 sm:mt-7 max-w-lg font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed text-neutral-600">
                    {currentSlide.description}
                  </p>

                  {/* Three Small Square Product Previews (Bottom-Left) */}
                  <div className="mt-8 sm:mt-10 pt-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {heroProductPreviews.map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/product/${prod.slug}`}
                          title={`${prod.name} (${prod.category})`}
                          className="group relative aspect-square w-16 sm:w-20 md:w-22 overflow-hidden rounded-md bg-white border border-neutral-300/80 shadow-xs transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-neutral-900"
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ─── Right Column: Large Rectangular Campaign Photography ── */}
                <div className="lg:col-span-4 xl:col-span-5 relative mt-4 lg:mt-0">
                  <div className="relative lg:-ml-12 xl:-ml-20 z-10 w-full max-w-[500px] mx-auto lg:max-w-none">
                    {/* Rectangular Image with clean edges */}
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden bg-stone-200 shadow-xl border border-neutral-300/60">
                      <img
                        src={currentSlide.image}
                        alt={currentSlide.imageAlt}
                        className="h-full w-full object-cover object-[55%_center] transition-transform duration-700 ease-out hover:scale-[1.02]"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Floating Controls: Vertical Scroll Indicator & Slide Dots ──── */}
          <div className="absolute right-6 sm:right-10 lg:right-16 bottom-8 sm:bottom-10 lg:bottom-12 z-30 flex flex-col items-center gap-4">
            {/* Subtle Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex items-center gap-1.5 mb-1 bg-white/70 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-neutral-300/60 shadow-xs">
                {editorialSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full focus-visible:outline-none ${
                      idx === currentIndex
                        ? 'h-1.5 w-4 bg-neutral-950'
                        : 'h-1.5 w-1.5 bg-neutral-400 hover:bg-neutral-600'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Vertical Scroll Indicator (Coral / Terracotta Capsule) */}
            <button
              type="button"
              onClick={scrollToNext}
              aria-label="Scroll to next section"
              className="group flex h-14 w-8 items-center justify-center rounded-full bg-[#E85D45] text-white shadow-md transition-all duration-300 hover:bg-[#D44D36] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D45] focus-visible:ring-offset-2"
            >
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ─── 2. CONTINUOUS PROMOTIONAL ANNOUNCEMENT MARQUEE ─────────────── */}
      <div
        role="region"
        aria-label="Promotional announcements marquee"
        className="relative z-10 w-full overflow-hidden border-t border-b border-line/70 bg-[#FAF1F0] py-2.5 sm:py-3 text-ink transition-colors group"
      >
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center justify-around gap-8 sm:gap-12 pr-8 sm:pr-12">
            {validMarquee.map((item) => (
              <span key={`t1-${item.id}`} className="inline-flex items-center gap-8 sm:gap-12">
                <span className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-ink/90">
                  {item.text}
                </span>
                <span className="text-xs text-brand/70" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Track 2 */}
          <div className="flex shrink-0 items-center justify-around gap-8 sm:gap-12 pr-8 sm:pr-12">
            {validMarquee.map((item) => (
              <span key={`t2-${item.id}`} className="inline-flex items-center gap-8 sm:gap-12">
                <span className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-ink/90">
                  {item.text}
                </span>
                <span className="text-xs text-brand/70" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Track 3 */}
          <div className="flex shrink-0 items-center justify-around gap-8 sm:gap-12 pr-8 sm:pr-12">
            {validMarquee.map((item) => (
              <span key={`t3-${item.id}`} className="inline-flex items-center gap-8 sm:gap-12">
                <span className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-ink/90">
                  {item.text}
                </span>
                <span className="text-xs text-brand/70" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
