import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { AdminUser, AdminRole } from '../types/admin';
import { adminStore } from '../services/adminStore';
import { readStorage, writeStorage } from '../utils/storage';

interface AdminAuthContextType {
  user: AdminUser | null;
  role: AdminRole;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: AdminRole) => void;
  hasPermission: (allowedRoles: AdminRole[]) => boolean;
}

const SESSION_KEY = 'admin:session_user';

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = readStorage<AdminUser | null>(SESSION_KEY, null);
    if (saved) return saved;
    // Default to the first staff member (Super Admin) for immediate access
    const staffList = adminStore.getStaff();
    return staffList[0] || null;
  });

  useEffect(() => {
    if (user) {
      writeStorage(SESSION_KEY, user);
    } else {
      writeStorage(SESSION_KEY, null);
    }
  }, [user]);

  const login = useCallback(async (email: string): Promise<boolean> => {
    const staff = adminStore.getStaff().find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (staff && staff.active) {
      const updated = adminStore.updateStaff(staff.id, { lastLogin: new Date().toISOString() });
      setUser(updated);
      return true;
    }
    // Fallback demo login
    const defaultSuper = adminStore.getStaff()[0];
    if (defaultSuper) {
      setUser(defaultSuper);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((newRole: AdminRole) => {
    if (!user) return;
    const updated = adminStore.updateStaff(user.id, { role: newRole });
    setUser(updated);
  }, [user]);

  const role = user?.role || 'super_admin';
  const isAuthenticated = !!user && user.active;

  const hasPermission = useCallback(
    (allowedRoles: AdminRole[]) => {
      if (!user) return false;
      if (user.role === 'super_admin') return true;
      return allowedRoles.includes(user.role);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      role,
      isAuthenticated,
      login,
      logout,
      switchRole,
      hasPermission,
    }),
    [user, role, isAuthenticated, login, logout, switchRole, hasPermission]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
