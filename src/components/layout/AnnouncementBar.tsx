import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, SettingsIcon } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';

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
      className="relative z-40 border-b border-line/50 bg-[#FAF3F2] text-ink transition-colors duration-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto flex h-8 max-w-container items-center justify-between px-4 sm:h-9">
        {/* Left spacer / prev control if multiple messages */}
        <div className="flex w-10 items-center justify-start">
          {activeAnnouncements.length > 1 && (
            <button
              type="button"
              onClick={prevAnnouncement}
              className="flex h-6 w-6 items-center justify-center rounded-full text-ink-muted/80 transition-colors hover:bg-brand-soft hover:text-ink focus-visible:outline-none"
              aria-label="Previous announcement"
            >
              <ChevronLeftIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Centred Delivery / Promotional Message */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnnouncement.id || currentAnnouncementIndex}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center gap-2 text-center text-xs tracking-wide text-ink sm:text-[13px]"
            >
              <span className="font-normal text-ink/90">{currentAnnouncement.text}</span>
              {currentAnnouncement.href && (
                <Link
                  to={currentAnnouncement.href}
                  className="hidden shrink-0 font-medium text-brand underline underline-offset-4 decoration-brand/40 transition-colors hover:text-brand-hover hover:decoration-brand sm:inline-flex"
                >
                  {currentAnnouncement.linkLabel || 'Learn more'}
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right controls: next button & Admin config trigger */}
        <div className="flex w-10 items-center justify-end gap-1">
          {activeAnnouncements.length > 1 && (
            <button
              type="button"
              onClick={nextAnnouncement}
              className="flex h-6 w-6 items-center justify-center rounded-full text-ink-muted/80 transition-colors hover:bg-brand-soft hover:text-ink focus-visible:outline-none"
              aria-label="Next announcement"
            >
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Quick Admin Navigation Trigger */}
          <button
            type="button"
            onClick={openAdminModal}
            className="flex h-5 w-5 items-center justify-center rounded text-ink-muted/40 transition-colors hover:bg-brand-soft hover:text-ink focus-visible:outline-none"
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
