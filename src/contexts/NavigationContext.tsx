import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  type AnnouncementMessage,
  type NavigationItemConfig,
  type MegaMenuData,
  defaultAnnouncements,
  defaultNavigationItems,
  getStoredAnnouncements,
  getStoredNavigationItems,
  resetNavigationToDefaults,
  resolveMegaMenu,
  saveStoredAnnouncements,
  saveStoredNavigationItems,
} from '../config/navigationConfig';

interface NavigationContextValue {
  // Announcements
  announcements: AnnouncementMessage[];
  activeAnnouncements: AnnouncementMessage[];
  currentAnnouncementIndex: number;
  currentAnnouncement: AnnouncementMessage | null;
  nextAnnouncement: () => void;
  prevAnnouncement: () => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;

  // Navigation Items
  navigationItems: NavigationItemConfig[];
  activeNavigationItems: NavigationItemConfig[];

  // Mega Menu Resolver
  getMegaMenu: (type: NavigationItemConfig['megaMenuType'], customPromo?: NavigationItemConfig['promoCard']) => MegaMenuData | null;

  // Admin Panel Controls
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;
  updateAnnouncements: (messages: AnnouncementMessage[]) => void;
  updateNavigationItems: (items: NavigationItemConfig[]) => void;
  resetAllToDefaults: () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<AnnouncementMessage[]>(getStoredAnnouncements);
  const [navigationItems, setNavigationItems] = useState<NavigationItemConfig[]>(getStoredNavigationItems);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Filter only active announcements
  const activeAnnouncements = useMemo(
    () => announcements.filter((a) => a.active),
    [announcements]
  );

  // Active navigation items sorted by order
  const activeNavigationItems = useMemo(
    () =>
      navigationItems
        .filter((item) => item.published)
        .sort((a, b) => a.order - b.order),
    [navigationItems]
  );

  const currentAnnouncement = useMemo(() => {
    if (!activeAnnouncements.length) return null;
    return activeAnnouncements[currentAnnouncementIndex % activeAnnouncements.length];
  }, [activeAnnouncements, currentAnnouncementIndex]);

  const nextAnnouncement = useCallback(() => {
    if (activeAnnouncements.length <= 1) return;
    setCurrentAnnouncementIndex((prev) => (prev + 1) % activeAnnouncements.length);
  }, [activeAnnouncements.length]);

  const prevAnnouncement = useCallback(() => {
    if (activeAnnouncements.length <= 1) return;
    setCurrentAnnouncementIndex((prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length);
  }, [activeAnnouncements.length]);

  // Auto-rotate announcement messages every 5 seconds if not paused
  useEffect(() => {
    if (isPaused || activeAnnouncements.length <= 1) return;
    const interval = window.setInterval(nextAnnouncement, 5000);
    return () => window.clearInterval(interval);
  }, [isPaused, activeAnnouncements.length, nextAnnouncement]);

  // Admin update handlers with localStorage persistence
  const updateAnnouncements = useCallback((messages: AnnouncementMessage[]) => {
    setAnnouncements(messages);
    saveStoredAnnouncements(messages);
    setCurrentAnnouncementIndex(0);
  }, []);

  const updateNavigationItems = useCallback((items: NavigationItemConfig[]) => {
    setNavigationItems(items);
    saveStoredNavigationItems(items);
  }, []);

  const resetAllToDefaults = useCallback(() => {
    resetNavigationToDefaults();
    setAnnouncements(defaultAnnouncements);
    setNavigationItems(defaultNavigationItems);
    setCurrentAnnouncementIndex(0);
  }, []);

  const openAdminModal = useCallback(() => setIsAdminModalOpen(true), []);
  const closeAdminModal = useCallback(() => setIsAdminModalOpen(false), []);

  const getMegaMenu = useCallback(
    (type: NavigationItemConfig['megaMenuType'], customPromo?: NavigationItemConfig['promoCard']) => {
      return resolveMegaMenu(type, customPromo);
    },
    []
  );

  // Keyboard shortcut Ctrl+Shift+A to toggle admin navigation modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      announcements,
      activeAnnouncements,
      currentAnnouncementIndex,
      currentAnnouncement,
      nextAnnouncement,
      prevAnnouncement,
      isPaused,
      setIsPaused,
      navigationItems,
      activeNavigationItems,
      getMegaMenu,
      isAdminModalOpen,
      openAdminModal,
      closeAdminModal,
      updateAnnouncements,
      updateNavigationItems,
      resetAllToDefaults,
    }),
    [
      announcements,
      activeAnnouncements,
      currentAnnouncementIndex,
      currentAnnouncement,
      nextAnnouncement,
      prevAnnouncement,
      isPaused,
      navigationItems,
      activeNavigationItems,
      getMegaMenu,
      isAdminModalOpen,
      openAdminModal,
      closeAdminModal,
      updateAnnouncements,
      updateNavigationItems,
      resetAllToDefaults,
    ]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

const fallbackValue: NavigationContextValue = {
  announcements: defaultAnnouncements,
  activeAnnouncements: defaultAnnouncements,
  currentAnnouncementIndex: 0,
  currentAnnouncement: defaultAnnouncements[0] ?? null,
  nextAnnouncement: () => {},
  prevAnnouncement: () => {},
  isPaused: false,
  setIsPaused: () => {},
  navigationItems: defaultNavigationItems,
  activeNavigationItems: defaultNavigationItems.filter((i) => i.published),
  getMegaMenu: (type, promo) => resolveMegaMenu(type, promo),
  isAdminModalOpen: false,
  openAdminModal: () => {},
  closeAdminModal: () => {},
  updateAnnouncements: () => {},
  updateNavigationItems: () => {},
  resetAllToDefaults: () => {},
};

export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  return ctx || fallbackValue;
}

