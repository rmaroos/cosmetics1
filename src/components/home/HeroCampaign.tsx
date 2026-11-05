import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
    blush: 'bg-[#FAF3F2]',
    sage: 'bg-[#F4F7F3]',
    rose: 'bg-[#FAF2F4]',
    sand: 'bg-[#FAF7F1]',
    ivory: 'bg-[#FBF9F7]',
  };

  const currentBg = currentSlide ? toneBgMap[currentSlide.tone] || 'bg-[#FAF8F5]' : 'bg-[#FAF8F5]';

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
        <div className="relative w-full min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[560px] xl:min-h-[600px]">
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
              {/* Edge-to-edge grid with NO max-width constraint */}
              <div className="grid w-full min-h-[480px] sm:min-h-[500px] md:min-h-[520px] lg:min-h-[560px] xl:min-h-[600px] lg:grid-cols-12 lg:items-stretch">
                
                {/* ─── Left Editorial Column (Full Height) ────────────────── */}
                <div className="z-10 flex flex-col justify-center px-6 py-10 sm:px-12 md:px-16 lg:col-span-6 lg:py-14 lg:pl-12 lg:pr-8 xl:col-span-6 xl:pl-20 xl:pr-12">
                  {/* Eyebrow */}
                  {currentSlide.eyebrow && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08, duration: 0.3 }}
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-brand"
                    >
                      {currentSlide.eyebrow}
                    </motion.p>
                  )}

                  {/* Main Campaign Headline */}
                  <motion.h1
                    id="hero-banner-title"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.35 }}
                    className="mt-4 font-display text-3xl font-normal leading-[1.14] tracking-tight text-ink sm:mt-5 sm:text-4xl sm:leading-[1.12] md:text-[48px] md:leading-[1.14] lg:text-[52px] lg:leading-[1.12] xl:text-[58px] xl:leading-[1.12]"
                  >
                    {currentSlide.title}
                  </motion.h1>

                  {/* Campaign Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16, duration: 0.35 }}
                    className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-ink-2 sm:mt-6 sm:text-base md:text-lg"
                  >
                    {currentSlide.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
                  >
                    <Link
                      to={currentSlide.ctaUrl}
                      className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-7 text-sm font-medium tracking-wide text-white shadow-2xs transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                      {currentSlide.ctaText}
                    </Link>
                    {currentSlide.secondaryCtaText && currentSlide.secondaryCtaUrl && (
                      <Link
                        to={currentSlide.secondaryCtaUrl}
                        className="inline-flex h-12 items-center justify-center rounded-lg border border-line bg-surface/80 px-7 text-sm font-medium tracking-wide text-ink transition-colors hover:border-ink/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                      >
                        {currentSlide.secondaryCtaText}
                      </Link>
                    )}
                  </motion.div>
                </div>

                {/* ─── Right Edge-to-Edge Campaign Photography (Full Height) ─ */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden lg:col-span-6 lg:h-full lg:min-h-[560px] lg:aspect-auto xl:col-span-6 xl:min-h-[600px]">
                  <picture className="block h-full w-full">
                    {currentSlide.mobileImage && (
                      <source
                        media="(max-width: 640px)"
                        srcSet={currentSlide.mobileImage}
                      />
                    )}
                    <img
                      src={currentSlide.desktopImage}
                      alt={currentSlide.imageAlt}
                      loading={currentIndex === 0 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover object-[70%_center] lg:object-[65%_center] transition-transform duration-700 ease-out"
                    />
                  </picture>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── 2. MINIMAL PAGINATION DOTS (Centered at Bottom) ─────────────── */}
        {totalSlides > 1 && (
          <div className="absolute bottom-4 sm:bottom-5 inset-x-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-1.5 pointer-events-auto">
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
                        ? 'h-1.5 w-4 rounded-full bg-[#8E5258]'
                        : 'h-1.5 w-1.5 rounded-full bg-stone-300 hover:bg-stone-400'
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

          {/* Track 2 (Duplicates for seamless loop without blank gaps) */}
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
