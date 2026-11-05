import React, { useState } from 'react';
import {
  Settings,
  Store,
  CreditCard,
  Truck,
  Percent,
  Bell,
  Search,
  Save,
  CheckCircle,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { StoreSettings } from '../../types/admin';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export function AdminSettings() {
  const { user } = useAdminAuth();
  const [settings, setSettings] = useState<StoreSettings>(() => adminStore.getSettings());
  const [activeSection, setActiveSection] = useState<
    'general' | 'payment' | 'shipping' | 'tax' | 'notifications' | 'seo'
  >('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateSettings(
      activeSection,
      settings[activeSection],
      user ? { name: user.name, email: user.email } : undefined
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Storefront &amp; System Configuration
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage global store identity, payment processors, delivery tariffs, and notification thresholds.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold animate-in fade-in">
            <CheckCircle className="h-4 w-4" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── Left Settings Menu ────────────────────────────────────────── */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-neutral-200/80 p-2 shadow-2xs space-y-1">
          {[
            { id: 'general', label: 'General Identity', icon: Store },
            { id: 'payment', label: 'Payment Methods', icon: CreditCard },
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { id: 'tax', label: 'Taxes & Currency', icon: Percent },
            { id: 'notifications', label: 'Email Alerts', icon: Bell },
            { id: 'seo', label: 'SEO & Metadata', icon: Search },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#9F2438] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Right Form Panel ─────────────────────────────────────────── */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-2xs">
          <form onSubmit={handleSave} className="space-y-6">
            {/* 1. GENERAL IDENTITY */}
            {activeSection === 'general' && (
              <div className="space-y-4">
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 font-serif">General Store Identity</h3>
                  <p className="text-xs text-neutral-500">Business details displayed to shoppers and invoices</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      value={settings.general.storeName}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, storeName: e.target.value },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Customer Care Email</label>
                    <input
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, contactEmail: e.target.value },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Customer Support Phone</label>
                    <input
                      type="text"
                      value={settings.general.supportPhone}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, supportPhone: e.target.value },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Official WhatsApp Number</label>
                    <input
                      type="text"
                      value={settings.general.whatsAppNumber}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, whatsAppNumber: e.target.value },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-neutral-700 mb-1">Store Physical Address</label>
                  <input
                    type="text"
                    value={settings.general.address}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, address: e.target.value },
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* 2. PAYMENT METHODS */}
            {activeSection === 'payment' && (
              <div className="space-y-4">
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 font-serif">Payment Methods &amp; Gateways</h3>
                  <p className="text-xs text-neutral-500">Configure enabled payment channels at storefront checkout</p>
                </div>

                <div className="space-y-3 text-xs">
                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.payment.codEnabled}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          payment: { ...settings.payment, codEnabled: e.target.checked },
                        })
                      }
                      className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                    />
                    <div>
                      <p className="font-bold text-neutral-900">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-neutral-500">Allow customers to pay cash upon islandwide courier arrival</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.payment.bankTransferEnabled}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          payment: { ...settings.payment, bankTransferEnabled: e.target.checked },
                        })
                      }
                      className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                    />
                    <div>
                      <p className="font-bold text-neutral-900">Direct Bank Deposit / Transfer</p>
                      <p className="text-[11px] text-neutral-500">Shoppers submit bank slip after completing order</p>
                    </div>
                  </label>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Bank Deposit Account Details
                    </label>
                    <textarea
                      rows={3}
                      value={settings.payment.bankDetails}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          payment: { ...settings.payment, bankDetails: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-neutral-200 focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. SHIPPING & DELIVERY */}
            {activeSection === 'shipping' && (
              <div className="space-y-4">
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 font-serif">Shipping Tariffs &amp; Free Delivery</h3>
                  <p className="text-xs text-neutral-500">Configure islandwide courier rates and free delivery thresholds</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Standard Delivery Rate (LKR)</label>
                    <input
                      type="number"
                      value={settings.shipping.standardRate}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          shipping: { ...settings.shipping, standardRate: Number(e.target.value) },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Express Delivery Rate (LKR)</label>
                    <input
                      type="number"
                      value={settings.shipping.expressRate}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          shipping: { ...settings.shipping, expressRate: Number(e.target.value) },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Free Shipping Order Min (LKR)</label>
                    <input
                      type="number"
                      value={settings.shipping.freeShippingThreshold}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          shipping: {
                            ...settings.shipping,
                            freeShippingThreshold: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. TAX & CURRENCY */}
            {activeSection === 'tax' && (
              <div className="space-y-4">
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 font-serif">Taxation &amp; Currency</h3>
                  <p className="text-xs text-neutral-500">Set national tax percentages and retail display rules</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">VAT / Tax Rate (%)</label>
                    <input
                      type="number"
                      value={settings.tax.taxRatePercent}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          tax: { ...settings.tax, taxRatePercent: Number(e.target.value) },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Currency Code</label>
                    <input
                      type="text"
                      disabled
                      value="LKR (Rs.) - Sri Lankan Rupee"
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. EMAIL NOTIFICATIONS */}
            {activeSection === 'notifications' && (
              <div className="space-y-4">
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 font-serif">Notification Triggers</h3>
                  <p className="text-xs text-neutral-500">Configure administrative alert thresholds and recipient inboxes</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">
                      Low Stock Alert Threshold (Units)
                    </label>
                    <input
                      type="number"
                      value={settings.notifications.lowStockThreshold}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            lowStockThreshold: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Admin Notification Inbox</label>
                    <input
                      type="email"
                      value={settings.notifications.adminNotificationEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            adminNotificationEmail: e.target.value,
                          },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 6. SEO METADATA */}
            {activeSection === 'seo' && (
              <div className="space-y-4">
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="font-bold text-sm text-neutral-900 font-serif">Search Engine Optimization (SEO)</h3>
                  <p className="text-xs text-neutral-500">Default meta tags for search engines and social share previews</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Default Meta Title</label>
                    <input
                      type="text"
                      value={settings.seo.defaultTitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...settings.seo, defaultTitle: e.target.value },
                        })
                      }
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Default Meta Description</label>
                    <textarea
                      rows={3}
                      value={settings.seo.metaDescription}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          seo: { ...settings.seo, metaDescription: e.target.value },
                        })
                      }
                      className="w-full p-2.5 rounded-xl border border-neutral-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-md transition-all active:scale-[0.99]"
              >
                <Save className="h-4 w-4" />
                <span>Save Configuration</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
