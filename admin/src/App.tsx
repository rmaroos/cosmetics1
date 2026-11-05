import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { AdminLayout } from './components/layout/AdminLayout';

import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProducts } from './pages/AdminProducts';
import { AdminCategories } from './pages/AdminCategories';
import { AdminBrands } from './pages/AdminBrands';
import { AdminInventory } from './pages/AdminInventory';
import { AdminOrders } from './pages/AdminOrders';
import { AdminCustomers } from './pages/AdminCustomers';
import { AdminReviews } from './pages/AdminReviews';
import { AdminPromotions } from './pages/AdminPromotions';
import { AdminCms } from './pages/AdminCms';
import { AdminJournal } from './pages/AdminJournal';
import { AdminReports } from './pages/AdminReports';
import { AdminStaff } from './pages/AdminStaff';
import { AdminSettings } from './pages/AdminSettings';

export function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          {/* ─── 1. STANDALONE ROOT ROUTES (e.g. admin.nelummbeauty.lk) ─── */}
          <Route path="/login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="brands" element={<AdminBrands />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="cms" element={<AdminCms />} />
            <Route path="journal" element={<AdminJournal />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* ─── 2. COMPATIBILITY /ADMIN ROUTES (e.g. preview-url.vercel.app/admin) ─── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="brands" element={<AdminBrands />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="cms" element={<AdminCms />} />
            <Route path="journal" element={<AdminJournal />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              fontFamily: 'Inter, system-ui, sans-serif',
              borderRadius: '12px',
            },
          }}
        />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
export default App;
