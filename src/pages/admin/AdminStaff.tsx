import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Lock,
  UserCheck,
  Clock,
  History,
  KeyRound,
  X,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { adminStore } from '../../services/adminStore';
import type { AdminUser, AdminRole, AuditLogEntry } from '../../types/admin';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

export function AdminStaff() {
  const { user } = useAdminAuth();
  const [staffList, setStaffList] = useState<AdminUser[]>(() => adminStore.getStaff());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => adminStore.getAuditLogs());

  const [activeTab, setActiveTab] = useState<'staff' | 'matrix' | 'audit'>('staff');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<AdminUser | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<AdminRole>('store_manager');
  const [active, setActive] = useState(true);

  const refreshData = () => {
    setStaffList(adminStore.getStaff());
    setAuditLogs(adminStore.getAuditLogs());
  };

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setName('');
    setEmail('');
    setPhone('+94 77 ');
    setRole('store_manager');
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: AdminUser) => {
    setEditingStaff(s);
    setName(s.name);
    setEmail(s.email);
    setPhone(s.phone || '');
    setRole(s.role);
    setActive(s.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (editingStaff) {
      adminStore.updateStaff(
        editingStaff.id,
        {
          name,
          email,
          phone,
          role,
          active,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    } else {
      adminStore.createStaff(
        {
          name,
          email,
          phone,
          role,
          active,
        },
        user ? { name: user.name, email: user.email } : undefined
      );
    }

    refreshData();
    setIsModalOpen(false);
  };

  const handleDelete = (s: AdminUser) => {
    if (staffList.length <= 1) {
      alert('Cannot delete the last remaining admin account.');
      return;
    }
    if (window.confirm(`Remove staff access for ${s.name}?`)) {
      adminStore.deleteStaff(s.id, user ? { name: user.name, email: user.email } : undefined);
      refreshData();
    }
  };

  const roleNameMap: Record<AdminRole, string> = {
    super_admin: 'Super Admin',
    store_manager: 'Store Manager',
    product_manager: 'Product Manager',
    order_manager: 'Order Manager',
    content_manager: 'Content Manager',
    marketing_manager: 'Marketing Manager',
  };

  const permissionsMatrix = [
    { module: 'Dashboard & Financials', super_admin: true, store_manager: true, product_manager: false, order_manager: false, content_manager: false, marketing_manager: false },
    { module: 'Products & Catalogue', super_admin: true, store_manager: true, product_manager: true, order_manager: false, content_manager: false, marketing_manager: false },
    { module: 'Categories & Taxonomy', super_admin: true, store_manager: true, product_manager: true, order_manager: false, content_manager: false, marketing_manager: false },
    { module: 'Brand Authorizations', super_admin: true, store_manager: true, product_manager: true, order_manager: false, content_manager: false, marketing_manager: false },
    { module: 'Inventory & Stock In/Out', super_admin: true, store_manager: true, product_manager: false, order_manager: false, content_manager: false, marketing_manager: false },
    { module: 'Orders & Commercial Invoices', super_admin: true, store_manager: true, product_manager: false, order_manager: true, content_manager: false, marketing_manager: false },
    { module: 'Customer Profiles & History', super_admin: true, store_manager: true, product_manager: false, order_manager: true, content_manager: false, marketing_manager: false },
    { module: 'Reviews Moderation', super_admin: true, store_manager: true, product_manager: false, order_manager: false, content_manager: true, marketing_manager: false },
    { module: 'Promotions & Discounts', super_admin: true, store_manager: false, product_manager: false, order_manager: false, content_manager: false, marketing_manager: true },
    { module: 'Website CMS & Layout', super_admin: true, store_manager: false, product_manager: false, order_manager: false, content_manager: true, marketing_manager: false },
    { module: 'Blog & Journal', super_admin: true, store_manager: false, product_manager: false, order_manager: false, content_manager: true, marketing_manager: false },
    { module: 'Business Intelligence & CSV Exports', super_admin: true, store_manager: true, product_manager: false, order_manager: false, content_manager: false, marketing_manager: false },
    { module: 'Staff & Role Assignment', super_admin: true, store_manager: false, product_manager: false, order_manager: false, content_manager: false, marketing_manager: false },
    { module: 'Store Gateway Settings', super_admin: true, store_manager: false, product_manager: false, order_manager: false, content_manager: false, marketing_manager: false },
  ];

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif">
            Staff Accounts &amp; Permissions (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Enforce role-based access control, assign staff roles, and inspect historical system audit logs.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center rounded-xl bg-white p-1 border border-neutral-200 shadow-2xs self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('staff')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'staff'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Staff Accounts ({staffList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'matrix'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Permissions Matrix
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'audit'
                ? 'bg-[#9F2438] text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            System Audit Log ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* ─── TAB 1: Staff Directory ───────────────────────────────────────── */}
      {activeTab === 'staff' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 font-serif">
              Authorized Staff Members
            </h3>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Invite Staff Member</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px]">
                  <th className="py-3.5 pl-5 pr-3">Staff Member</th>
                  <th className="py-3.5 px-3">Assigned Role</th>
                  <th className="py-3.5 px-3">Phone</th>
                  <th className="py-3.5 px-3">Last Active Login</th>
                  <th className="py-3.5 px-3">Account Status</th>
                  <th className="py-3.5 pr-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {staffList.map((s) => (
                  <tr key={s.id} className="hover:bg-neutral-50">
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#9F2438]/10 text-[#9F2438] font-bold flex items-center justify-center">
                          {s.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{s.name}</p>
                          <p className="text-[11px] text-neutral-400">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#9F2438]/10 text-[#9F2438]">
                        {roleNameMap[s.role]}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-neutral-600">{s.phone || '—'}</td>
                    <td className="py-3.5 px-3 text-neutral-500">
                      {s.lastLogin ? new Date(s.lastLogin).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {s.active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3.5 pr-5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
                          title="Edit Staff Member"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                          title="Remove Staff"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 2: Permissions Matrix ────────────────────────────────────── */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden p-6 space-y-4">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900 font-serif">
              Role-Based Access Control (RBAC) Permissions Matrix
            </h3>
            <p className="text-xs text-neutral-500">
              Granular authority map enforced across administrative modules
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px]">
                  <th className="pb-3">Module Feature</th>
                  <th className="pb-3 text-center">Super Admin</th>
                  <th className="pb-3 text-center">Store Manager</th>
                  <th className="pb-3 text-center">Product Manager</th>
                  <th className="pb-3 text-center">Order Manager</th>
                  <th className="pb-3 text-center">Content Manager</th>
                  <th className="pb-3 text-center">Marketing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {permissionsMatrix.map((row) => (
                  <tr key={row.module} className="hover:bg-neutral-50">
                    <td className="py-2.5 font-medium text-neutral-900">{row.module}</td>
                    <td className="py-2.5 text-center">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />
                    </td>
                    <td className="py-2.5 text-center">
                      {row.store_manager ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="h-4 w-4 text-neutral-300 inline" />
                      )}
                    </td>
                    <td className="py-2.5 text-center">
                      {row.product_manager ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="h-4 w-4 text-neutral-300 inline" />
                      )}
                    </td>
                    <td className="py-2.5 text-center">
                      {row.order_manager ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="h-4 w-4 text-neutral-300 inline" />
                      )}
                    </td>
                    <td className="py-2.5 text-center">
                      {row.content_manager ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="h-4 w-4 text-neutral-300 inline" />
                      )}
                    </td>
                    <td className="py-2.5 text-center">
                      {row.marketing_manager ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="h-4 w-4 text-neutral-300 inline" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 3: System Audit Log ──────────────────────────────────────── */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 font-serif">
              Administrative Action Audit Trail
            </h3>
            <span className="text-xs text-neutral-500">
              Immutable activity records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-200 text-neutral-500 font-semibold uppercase text-[10px]">
                  <th className="py-3.5 pl-5 pr-3">Timestamp</th>
                  <th className="py-3.5 px-3">Action</th>
                  <th className="py-3.5 px-3">Entity</th>
                  <th className="py-3.5 px-3">Details</th>
                  <th className="py-3.5 pr-5">Staff Member</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50">
                    <td className="py-3 pl-5 pr-3 font-mono text-neutral-500 text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#9F2438]">
                      {log.action}
                    </td>
                    <td className="py-3 px-3 font-medium text-neutral-800">
                      {log.entity}
                    </td>
                    <td className="py-3 px-3 text-neutral-600 max-w-sm truncate">
                      {log.details}
                    </td>
                    <td className="py-3 pr-5 font-semibold text-neutral-900">
                      {log.performedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Add / Edit Staff Modal ───────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-md p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-base font-bold font-serif text-neutral-900">
                {editingStaff ? `Edit Staff Member: ${editingStaff.name}` : 'Invite New Staff Member'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="e.g. Priyantha Senanayake"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Staff Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                  placeholder="name@nelum.lk"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Assigned Administrative Role (RBAC) *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none"
                >
                  <option value="super_admin">Super Admin (Full access)</option>
                  <option value="store_manager">Store Manager (Products, orders, inventory)</option>
                  <option value="product_manager">Product Manager (Catalogue &amp; brands)</option>
                  <option value="order_manager">Order Manager (Fulfillment &amp; customers)</option>
                  <option value="content_manager">Content Manager (CMS &amp; journal)</option>
                  <option value="marketing_manager">Marketing Manager (Promotions)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-neutral-200 focus:border-[#9F2438] focus:outline-none font-mono"
                  placeholder="+94 77 123 4567"
                />
              </div>

              <label className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded text-[#9F2438] focus:ring-[#9F2438]"
                />
                <span className="text-xs font-semibold">Account Active &amp; Allowed Login</span>
              </label>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9F2438] hover:bg-[#851C2D] text-white text-xs font-semibold shadow-md"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
