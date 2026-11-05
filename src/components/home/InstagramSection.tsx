import { useEffect, useState } from 'react';
import { Instagram, Video, ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/Container';
import { ScrollReveal, ScrollItem } from '../ui/ScrollReveal';
import {
  type InstagramPost,
  type InstagramProfileConfig,
  type InstagramSectionSettings,
  getActiveInstagramPosts,
  getStoredInstagramProfile,
  getStoredInstagramSettings,
} from '../../config/instagramConfig';

export function InstagramSection() {
  const [profile, setProfile] = useState<InstagramProfileConfig>(getStoredInstagramProfile);
  const [settings, setSettings] = useState<InstagramSectionSettings>(getStoredInstagramSettings);
  const [posts, setPosts] = useState<InstagramPost[]>(getActiveInstagramPosts);

  useEffect(() => {
    const handleSync = () => {
      setProfile(getStoredInstagramProfile());
      setSettings(getStoredInstagramSettings());
      setPosts(getActiveInstagramPosts());
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('nelum:instagram-updated', handleSync);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('nelum:instagram-updated', handleSync);
    };
  }, []);

  // If section is disabled in admin settings, do not render
  if (!settings.enabled || posts.length === 0) {
    return null;
  }

  // Background styling
  const bgClass =
    settings.background === 'ivory'
      ? 'bg-[#FAF8F5]'
      : settings.background === 'blush'
      ? 'bg-[#FAF1F0]'
      : 'bg-white';

  // Responsive column classes: strictly 5 cols on desktop, 3 on tablet, 2 on mobile
  const getGridColsClass = () => {
    const desktopCols =
      settings.columnsDesktop === 4
        ? 'lg:grid-cols-4'
        : settings.columnsDesktop === 6
        ? 'lg:grid-cols-6'
        : 'lg:grid-cols-5';

    const tabletCols = settings.columnsTablet === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
    const mobileCols = settings.columnsMobile === 3 ? 'grid-cols-3' : 'grid-cols-2';

    return `${mobileCols} ${tabletCols} ${desktopCols}`;
  };

  const displayPosts = posts.slice(0, settings.postsCount || 10);

  return (
    <section
      id="instagram-showcase"
      aria-labelledby="instagram-section-heading"
      className={`relative border-t border-line/60 py-16 sm:py-20 md:py-24 transition-colors duration-300 ${bgClass}`}
    >
      <Container>
        {/* ─── 1. CENTRED INSTAGRAM PROFILE HEADER ───────────────────────── */}
        <ScrollReveal yOffset={24} duration={0.7}>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            {/* Profile Avatar & Story Ring */}
            <div className="relative mb-4">
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-full"
                aria-label={`Open Nelum Beauty Instagram profile (${profile.username}) in new tab`}
              >
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#E0A899] via-brand to-[#8E5258] transition-transform duration-300 group-hover:scale-105 shadow-2xs">
                  <div className="h-full w-full rounded-full bg-white p-[2px]">
                    <img
                      src={profile.profileImage}
                      alt={profile.username}
                      loading="lazy"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Instagram Badge Overlay */}
                <div
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white shadow-2xs transition-colors group-hover:bg-brand-hover"
                  aria-hidden="true"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </div>
              </a>
            </div>

            {/* Section Heading & Tagline */}
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              {profile.sectionHeading || 'Stay Connected'}
            </p>

            <h2
              id="instagram-section-heading"
              className="mt-2 font-display text-3xl font-normal tracking-tight text-ink sm:text-4xl md:text-[42px] leading-[1.15]"
            >
              {profile.supportingHeading || 'Follow Us on Instagram'}
            </h2>

            {/* Username & Optional Verified Follower Count */}
            <div className="mt-2.5 flex items-center justify-center gap-2">
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wide text-ink transition-colors hover:text-brand"
              >
                {profile.username}
              </a>

              {profile.showFollowerCount && profile.followerCount && (
                <>
                  <span className="text-line text-xs font-bold" aria-hidden="true">
                    •
                  </span>
                  <span className="text-xs font-medium text-ink-muted">
                    {profile.followerCount} followers
                  </span>
                </>
              )}
            </div>

            {/* Editorial Description */}
            {profile.description && (
              <p className="mt-3.5 max-w-lg text-sm sm:text-base leading-relaxed text-ink-2">
                {profile.description}
              </p>
            )}

            {/* Follow Us CTA Button */}
            <div className="mt-6 sm:mt-7">
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-medium tracking-wide text-white shadow-2xs transition-all duration-200 hover:bg-brand-hover hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>{profile.ctaText || 'Follow Us on Instagram'}</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── 2. INSTAGRAM POSTS GALLERY (5 COLUMNS × 2 ROWS = 10 POSTS) ─── */}
        <div className="mt-10 sm:mt-14">
          <div className={`grid gap-3 sm:gap-4 md:gap-4.5 lg:gap-4 ${getGridColsClass()}`}>
            {displayPosts.map((post, idx) => {
              const isVideo = post.mediaType === 'video';
              const targetUrl = post.postUrl || profile.profileUrl;

              return (
                <ScrollItem
                  key={post.id}
                  index={idx}
                  yOffset={24}
                  duration={0.65}
                >
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-product transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 shadow-2xs hover:shadow-md"
                    aria-label={`View Nelum Beauty ${isVideo ? 'Reel' : 'post'} on Instagram: ${
                      post.caption || post.altText
                    }`}
                  >
                    {/* High-Resolution Source Image with object-cover preserving aspect ratio */}
                    <img
                      src={post.imageUrl}
                      alt={post.altText || 'Nelum Beauty Instagram post'}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Media Type Badge (Top Right Corner) */}
                    <div className="absolute top-2.5 right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white shadow-2xs backdrop-blur-xs transition-transform duration-300 group-hover:scale-110">
                      {isVideo ? (
                        <Video className="h-3.5 w-3.5" aria-label="Video reel" />
                      ) : (
                        <Instagram className="h-3.5 w-3.5" aria-label="Photo post" />
                      )}
                    </div>

                    {/* Clean, Subtle Hover Indicator — Unobstructed, no text covering the photo */}
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <Instagram className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                  </a>
                </ScrollItem>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

