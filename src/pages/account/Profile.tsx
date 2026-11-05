import React, { useState } from 'react';
import { toast } from 'sonner';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { isValidSriLankanMobile, passwordIssues } from '../../utils/validation';
import { Checkbox, TextField } from '../../components/ui/Field';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/States';

export function Profile() {
  useDocumentMeta('Profile', undefined, { noindex: true });
  const { customer, updateProfile, changePassword } = useAuth();
  const [form, setForm] = useState({ firstName: customer?.firstName ?? '', lastName: customer?.lastName ?? '', phone: customer?.phone ?? '', marketingOptIn: customer?.marketingOptIn ?? false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [pw, setPw] = useState({ current: '', next: '' });
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({});
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaving, setPwSaving] = useState(false);
  if (!customer) return null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'Enter your first name.';
    if (!form.lastName.trim()) errs.lastName = 'Enter your last name.';
    if (!isValidSriLankanMobile(form.phone)) errs.phone = 'Enter a valid Sri Lankan mobile number.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    await updateProfile({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim() });
    setSaving(false);
    toast.success('Profile updated');
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!pw.current) errs.current = 'Enter your current password.';
    const issues = passwordIssues(pw.next);
    if (issues.length) errs.next = `Password needs: ${issues.join(', ').toLowerCase()}.`;
    setPwErrors(errs);
    if (Object.keys(errs).length) return;
    setPwSaving(true);
    setPwError(null);
    const r = await changePassword(pw.current, pw.next);
    setPwSaving(false);
    if (!r.ok) return setPwError(r.error);
    setPw({ current: '', next: '' });
    toast.success('Password changed');
  };

  return (
    <div className="max-w-xl space-y-12">
      <section aria-labelledby="profile-h">
        <h1 id="profile-h" className="text-xl font-semibold text-ink">Profile details</h1>
        <form onSubmit={save} noValidate className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="First name" required autoComplete="given-name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} error={errors.firstName} />
            <TextField label="Last name" required autoComplete="family-name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} error={errors.lastName} />
          </div>
          <TextField label="Email" value={customer.email} disabled hint="Contact us to change the email on your account." />
          <TextField label="Mobile number" required type="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} />
          <Checkbox label="Email me about new arrivals and offers" checked={form.marketingOptIn} onChange={(e) => setForm({ ...form, marketingOptIn: e.target.checked })} />
          <Button type="submit" loading={saving}>Save changes</Button>
        </form>
      </section>

      <section aria-labelledby="password-h" className="border-t border-line pt-10">
        <h2 id="password-h" className="text-xl font-semibold text-ink">Change password</h2>
        <form onSubmit={savePassword} noValidate className="mt-5 space-y-4">
          {pwError && <Alert tone="error">{pwError}</Alert>}
          <TextField label="Current password" type="password" required autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} error={pwErrors.current} />
          <TextField label="New password" type="password" required autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} error={pwErrors.next} hint="At least 8 characters, with upper and lowercase letters and a number." />
          <Button type="submit" variant="secondary" loading={pwSaving}>Update password</Button>
        </form>
      </section>
    </div>);

}