import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, FacebookIcon, InstagramIcon, SettingsIcon } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { siteConfig } from '../../data/site';

export function AnnouncementBar() {
  const {
    activeAnnouncements,
    currentAnnouncement,
    currentAnnouncementIndex,
    nextAnnouncement,
    prevAnnouncement,
    setIsPaused,
    openAdminModal,
  } = useNavigation();

  if (!currentAnnouncement || activeAnnouncements.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Promotions and announcements"
      className="bg-brand text-ivory"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto flex h-9 max-w-container items-center justify-between px-4 lg:px-10">
        {/* Left spacer / prev control if multiple messages */}
        <div className="flex w-10 items-center justify-start gap-1 md:w-40 lg:w-56">
          <ul className="mr-2 hidden items-center gap-3 md:flex" aria-label="Social media">
            {siteConfig.social.map((s) => {
              const Icon = s.label === 'Instagram' ? InstagramIcon : s.label === 'Facebook' ? FacebookIcon : null;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center text-white/60 transition-colors hover:text-white"
                  >
                    {Icon ? (
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    ) : (
                      <span className="type-label">{s.label}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          {activeAnnouncements.length > 1 && (
            <button
              type="button"
              onClick={prevAnnouncement}
              className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none"
              aria-label="Previous announcement"
            >
              <ChevronLeftIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Centred Delivery / Promotional Message */}
        <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden px-2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement.id || currentAnnouncementIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex min-w-0 items-center justify-center gap-3 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-white sm:text-xs"
            >
              <span className="truncate font-normal text-white/90">{currentAnnouncement.text}</span>
              {currentAnnouncement.href && (
                <Link
                  to={currentAnnouncement.href}
                  className="hidden shrink-0 font-medium text-sand underline underline-offset-4 decoration-sand/50 transition-colors hover:text-white hover:decoration-white sm:inline-flex"
                >
                  {currentAnnouncement.linkLabel || 'Learn more'}
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right controls: next button & Admin config trigger */}
        <div className="flex w-10 items-center justify-end gap-1 md:w-40 lg:w-56">
          <Link to="/track-order" className="mr-2 hidden whitespace-nowrap type-label text-sand transition-colors hover:text-white lg:inline">
            Track order
          </Link>
          <Link to="/contact" className="mr-2 hidden whitespace-nowrap type-label text-sand transition-colors hover:text-white lg:inline">
            Help
          </Link>
          {activeAnnouncements.length > 1 && (
            <button
              type="button"
              onClick={nextAnnouncement}
              className="flex h-6 w-6 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none"
              aria-label="Next announcement"
            >
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Quick Admin Navigation Trigger */}
          <button
            type="button"
            onClick={openAdminModal}
            className="flex h-5 w-5 items-center justify-center rounded text-white/30 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none"
            title="Admin: Configure Announcements & Menu (Ctrl+Shift+A)"
            aria-label="Admin settings"
          >
            <SettingsIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
