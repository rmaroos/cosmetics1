import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { readStorage, removeStorage, writeStorage } from '../utils/storage';
import { getProductById } from '../utils/catalog';

type WishlistValue = {
  ids: string[];
  count: number;
  has: (productId: string) => boolean;
  toggle: (productId: string) => boolean;
  remove: (productId: string) => void;
  isGuestList: boolean;
};

const WishlistContext = createContext<WishlistValue | null>(null);
const GUEST_KEY = 'wishlist:guest';

/**
 * Business rule: guests keep a wishlist on this device. When they sign in,
 * guest items are merged into their account wishlist so nothing is lost.
 */
export function WishlistProvider({ children }: {children: React.ReactNode;}) {
  const { customer } = useAuth();
  const customerId = customer?.id ?? null;
  const storageKey = customerId ? `wishlist:${customerId}` : GUEST_KEY;
  // Track which storage key the in-memory list belongs to, so lists never leak between guest and account.
  const [state, setState] = useState<{key: string | null;ids: string[];}>({ key: null, ids: [] });
  const ids = state.key === storageKey ? state.ids : [];
  const setIds = useCallback(
    (fn: (prev: string[]) => string[]) => setState((s) => ({ key: s.key, ids: fn(s.ids) })),
    []
  );

  useEffect(() => {
    let list = readStorage<string[]>(storageKey, []);
    if (customerId) {
      const guest = readStorage<string[]>(GUEST_KEY, []);
      if (guest.length) {
        list = Array.from(new Set([...list, ...guest]));
        removeStorage(GUEST_KEY);
        writeStorage(storageKey, list);
      }
    }
    setState({ key: storageKey, ids: list.filter((id) => Boolean(getProductById(id))) });
  }, [storageKey, customerId]);

  useEffect(() => {
    if (state.key === storageKey) writeStorage(storageKey, state.ids);
  }, [state, storageKey]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      const adding = !ids.includes(id);
      setIds((prev) => adding ? [id, ...prev] : prev.filter((x) => x !== id));
      return adding;
    },
    [ids, setIds]
  );

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [setIds]);

  const value = useMemo(
    () => ({ ids, count: ids.length, has, toggle, remove, isGuestList: !customerId }),
    [ids, has, toggle, remove, customerId]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}