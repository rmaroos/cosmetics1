import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Address, Customer } from '../types/commerce';
import { createId, hashPassword, readStorage, removeStorage, wait, writeStorage } from '../utils/storage';
import { demoAddresses, demoCredentials, demoCustomer } from '../data/demoAccount';

export type PublicCustomer = Omit<Customer, 'passwordHash'>;

type Result = {ok: true;} | {ok: false;error: string;};

type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  marketingOptIn: boolean;
};

type AuthValue = {
  customer: PublicCustomer | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<Result>;
  register: (input: RegisterInput) => Promise<{ok: true;customerId: string;} | {ok: false;error: string;}>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  updateProfile: (patch: Pick<Customer, 'firstName' | 'lastName' | 'phone' | 'marketingOptIn'>) => Promise<Result>;
  changePassword: (current: string, next: string) => Promise<Result>;
  saveAddress: (address: Omit<Address, 'id'> & {id?: string;}) => Promise<Address>;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
};

const AuthContext = createContext<AuthValue | null>(null);

const USERS_KEY = 'customers';
const SESSION_KEY = 'session';

function strip(c: Customer): PublicCustomer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = c;
  return rest;
}

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [users, setUsers] = useState<Customer[]>(() => readStorage<Customer[]>(USERS_KEY, []));
  const [sessionId, setSessionId] = useState<string | null>(() => readStorage<string | null>(SESSION_KEY, null));
  const [ready, setReady] = useState(false);

  // Seed the demo account once so the account area can be explored.
  useEffect(() => {
    let active = true;
    (async () => {
      if (!users.some((u) => u.id === demoCustomer.id)) {
        const passwordHash = await hashPassword(demoCredentials.password);
        if (!active) return;
        setUsers((prev) => [...prev, { ...demoCustomer, passwordHash, addresses: demoAddresses }]);
      }
      setReady(true);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => writeStorage(USERS_KEY, users), [users]);
  useEffect(() => {
    if (sessionId) writeStorage(SESSION_KEY, sessionId);else
    removeStorage(SESSION_KEY);
  }, [sessionId]);

  const current = users.find((u) => u.id === sessionId) ?? null;

  const updateCurrent = useCallback(
    (fn: (c: Customer) => Customer) => {
      setUsers((prev) => prev.map((u) => u.id === sessionId ? fn(u) : u));
    },
    [sessionId]
  );

  const login = useCallback<AuthValue['login']>(
    async (email, password) => {
      await wait(500);
      const hash = await hashPassword(password);
      const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      // Same message for unknown email and wrong password — avoids revealing which accounts exist.
      if (!user || user.passwordHash !== hash) return { ok: false, error: 'The email or password you entered is incorrect.' };
      setSessionId(user.id);
      return { ok: true };
    },
    [users]
  );

  const register = useCallback<AuthValue['register']>(
    async (input) => {
      await wait(600);
      const email = input.email.trim().toLowerCase();
      if (users.some((u) => u.email.toLowerCase() === email)) {
        return { ok: false, error: 'An account with this email already exists. Try signing in or resetting your password.' };
      }
      const user: Customer = {
        id: createId('cust'),
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        email,
        phone: input.phone.trim(),
        marketingOptIn: input.marketingOptIn,
        passwordHash: await hashPassword(input.password),
        addresses: [],
        createdAt: new Date().toISOString()
      };
      setUsers((prev) => [...prev, user]);
      setSessionId(user.id);
      return { ok: true, customerId: user.id };
    },
    [users]
  );

  const logout = useCallback(() => setSessionId(null), []);

  const requestPasswordReset = useCallback(async () => {
    // Always resolves with the same response regardless of whether the email exists.
    await wait(700);
  }, []);

  const updateProfile = useCallback<AuthValue['updateProfile']>(
    async (patch) => {
      await wait(400);
      updateCurrent((c) => ({ ...c, ...patch }));
      return { ok: true };
    },
    [updateCurrent]
  );

  const changePassword = useCallback<AuthValue['changePassword']>(
    async (currentPw, next) => {
      await wait(400);
      if (!current) return { ok: false, error: 'Please sign in again.' };
      if ((await hashPassword(currentPw)) !== current.passwordHash) return { ok: false, error: 'Your current password is incorrect.' };
      const passwordHash = await hashPassword(next);
      updateCurrent((c) => ({ ...c, passwordHash }));
      return { ok: true };
    },
    [current, updateCurrent]
  );

  const saveAddress = useCallback<AuthValue['saveAddress']>(
    async (input) => {
      await wait(300);
      const address: Address = { ...input, id: input.id ?? createId('addr') };
      updateCurrent((c) => {
        const exists = c.addresses.some((a) => a.id === address.id);
        let list = exists ? c.addresses.map((a) => a.id === address.id ? address : a) : [...c.addresses, address];
        if (address.isDefault || list.length === 1) {
          list = list.map((a) => ({ ...a, isDefault: a.id === address.id }));
        }
        return { ...c, addresses: list };
      });
      return address;
    },
    [updateCurrent]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      updateCurrent((c) => {
        const list = c.addresses.filter((a) => a.id !== id);
        if (list.length && !list.some((a) => a.isDefault)) list[0] = { ...list[0], isDefault: true };
        return { ...c, addresses: list };
      });
    },
    [updateCurrent]
  );

  const setDefaultAddress = useCallback(
    (id: string) => updateCurrent((c) => ({ ...c, addresses: c.addresses.map((a) => ({ ...a, isDefault: a.id === id })) })),
    [updateCurrent]
  );

  const value = useMemo<AuthValue>(
    () => ({
      customer: current ? strip(current) : null,
      ready,
      login,
      register,
      logout,
      requestPasswordReset,
      updateProfile,
      changePassword,
      saveAddress,
      deleteAddress,
      setDefaultAddress
    }),
    [current, ready, login, register, logout, requestPasswordReset, updateProfile, changePassword, saveAddress, deleteAddress, setDefaultAddress]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}