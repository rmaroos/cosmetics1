import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
  type HeroBannerSlide,
  type MarqueeMessage,
  defaultBannerSlides,
  defaultMarqueeMessages,
  getActiveMarqueeMessages,
  getActiveScheduledBanners,
  getStoredSliderSettings,
} from '../../config/bannerConfig';

export function HeroCampaign() {
  const [slides, setSlides] = useState<HeroBannerSlide[]>(getActiveScheduledBanners);
  const [marqueeItems, setMarqueeItems] = useState<MarqueeMessage[]>(getActiveMarqueeMessages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Touch tracking for mobile swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLElement>(null);

  // Settings from storage - defaults to 3-second transitions
  const settings = getStoredSliderSettings();
  const autoplay = settings.autoplay !== false;
  const slideDuration = settings.slideDuration || 3000;

  // Listen for admin changes
  useEffect(() => {
    const handleStorageChange = () => {
      setSlides(getActiveScheduledBanners());
      setMarqueeItems(getActiveMarqueeMessages());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const totalSlides = slides.length || defaultBannerSlides.length;
  const currentSlide = slides[currentIndex % totalSlides] || slides[0] || defaultBannerSlides[0];

  const goToSlide = useCallback((newIndex: number, newDirection: 1 | -1 = 1) => {
    setDirection(newDirection);
    setCurrentIndex(newIndex);
  }, []);

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer every 3 seconds (pauses on hover)
  useEffect(() => {
    if (!autoplay || isHovered || totalSlides <= 1) return;
    const timer = window.setInterval(nextSlide, slideDuration);
    return () => window.clearInterval(timer);
  }, [autoplay, isHovered, totalSlides, slideDuration, nextSlide]);

  // Touch gesture handlers for mobile swipe
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
    const minSwipeDistance = 40; // px

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
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

  // Tone background colors
  const toneBgMap: Record<HeroBannerSlide['tone'], string> = {
    blush: 'bg-sand',
    sage: 'bg-sage-soft',
    rose: 'bg-surface',
    sand: 'bg-sand',
    ivory: 'bg-ivory',
  };

  const currentBg = currentSlide ? toneBgMap[currentSlide.tone] || 'bg-ivory' : 'bg-ivory';

  // Animation variants (smooth horizontal slide with soft fade)
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.3,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.3,
    }),
  };

  if (!currentSlide) return null;

  const validMarquee = marqueeItems.length > 0 ? marqueeItems : defaultMarqueeMessages;

  return (
    <div className="w-full overflow-hidden">
      {/* ─── 1. FULL-WIDTH EDGE-TO-EDGE HERO BANNER (100% Viewport Width) ──── */}
      <section
        ref={sliderRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Promotional campaign banners"
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full overflow-hidden ${currentBg} transition-colors duration-700 focus:outline-none`}
      >
        <div className="relative w-full min-h-[560px] sm:min-h-[600px] lg:min-h-[680px] xl:min-h-[740px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 240, damping: 28 },
                opacity: { duration: 0.3 },
              }}
              className="w-full h-full"
            >
              {/* Full-bleed campaign photography with centred overlay copy */}
              <div className="relative flex w-full min-h-[560px] items-center justify-center sm:min-h-[600px] lg:min-h-[680px] xl:min-h-[740px]">
                <picture className="absolute inset-0 block h-full w-full">
                  {currentSlide.mobileImage && (
                    <source media="(max-width: 640px)" srcSet={currentSlide.mobileImage} />
                  )}
                  <img
                    src={currentSlide.desktopImage}
                    alt={currentSlide.imageAlt}
                    loading={currentIndex === 0 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover object-[65%_center]"
                  />
                </picture>
                <div className="absolute inset-0 bg-ink/35" aria-hidden="true" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(36,40,32,0.35),transparent_70%)]" aria-hidden="true" />

                <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 py-16 text-center text-white">
                  {/* Main Campaign Headline */}
                  <motion.h1
                    id="hero-banner-title"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.35 }}
                    className="max-w-[16ch] type-hero text-white"
                  >
                    {currentSlide.title}
                  </motion.h1>

                  {/* Campaign Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16, duration: 0.35 }}
                    className="mt-7 max-w-lg text-base leading-relaxed text-white/90"
                  >
                    {currentSlide.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <Link
                      to={currentSlide.ctaUrl}
                      className="inline-flex h-[52px] cursor-pointer items-center justify-center rounded-full bg-white px-9 type-button text-brand transition-colors duration-200 hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
                    >
                      {currentSlide.ctaText}
                    </Link>
                    {currentSlide.secondaryCtaText && currentSlide.secondaryCtaUrl && (
                      <Link
                        to={currentSlide.secondaryCtaUrl}
                        className="inline-flex h-[52px] cursor-pointer items-center justify-center rounded-full border border-white/60 bg-transparent px-9 type-button text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
                      >
                        {currentSlide.secondaryCtaText}
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Side arrows ─────────────────────────────────────────────────── */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white hover:text-ink md:flex lg:left-8"
            >
              <ChevronLeftIcon className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white hover:text-ink md:flex lg:right-8"
            >
              <ChevronRightIcon className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* ─── 2. MINIMAL PAGINATION DOTS (Centered at Bottom) ─────────────── */}
        {totalSlides > 1 && (
          <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              {slides.map((slide, idx) => {
                const isActive = idx === (currentIndex % totalSlides);
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                    aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                    className={`transition-all duration-300 focus-visible:outline-none ${
                      isActive
                        ? 'h-[3px] w-10 rounded-full bg-white'
                        : 'h-[3px] w-5 rounded-full bg-white/40 hover:bg-white/70'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ─── 3. CONTINUOUS PROMOTIONAL ANNOUNCEMENT MARQUEE ───────────────── */}
      <div
        role="region"
        aria-label="Promotional announcements marquee"
        className="relative z-10 w-full overflow-hidden border-y border-line-subtle bg-sand py-3.5 sm:py-4 text-brand transition-colors group"
      >
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center justify-around gap-8 sm:gap-12 pr-8 sm:pr-12">
            {validMarquee.map((item) => (
              <span key={`t1-${item.id}`} className="inline-flex items-center gap-8 sm:gap-12">
                <span className="font-display text-[15px] sm:text-[17px] italic tracking-[0.04em] text-brand">
                  {item.text}
                </span>
                <span className="text-[10px] text-gold" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Track 2 (Duplicates for seamless loop without blank gaps) */}
          <div className="flex shrink-0 items-center justify-around gap-8 sm:gap-12 pr-8 sm:pr-12">
            {validMarquee.map((item) => (
              <span key={`t2-${item.id}`} className="inline-flex items-center gap-8 sm:gap-12">
                <span className="font-display text-[15px] sm:text-[17px] italic tracking-[0.04em] text-brand">
                  {item.text}
                </span>
                <span className="text-[10px] text-gold" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Track 3 */}
          <div className="flex shrink-0 items-center justify-around gap-8 sm:gap-12 pr-8 sm:pr-12">
            {validMarquee.map((item) => (
              <span key={`t3-${item.id}`} className="inline-flex items-center gap-8 sm:gap-12">
                <span className="font-display text-[15px] sm:text-[17px] italic tracking-[0.04em] text-brand">
                  {item.text}
                </span>
                <span className="text-[10px] text-gold" aria-hidden="true">
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
