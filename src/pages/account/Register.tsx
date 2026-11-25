import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail, isValidSriLankanMobile, passwordIssues } from '../../utils/validation';
import { AuthShell } from '../../components/account/AuthShell';
import { Checkbox, TextField } from '../../components/ui/Field';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/States';
import { safeRedirect } from './Login';

export function Register() {
  useDocumentMeta('Create an account', undefined, { noindex: true });
  const { register, customer } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirect = safeRedirect(params.get('redirect'));
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' });
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (customer && !submitted) navigate(redirect, { replace: true });
  }, [customer, navigate, redirect, submitted]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  const issues = passwordIssues(form.password);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'Enter your first name.';
    if (!form.lastName.trim()) errs.lastName = 'Enter your last name.';
    if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address.';
    if (!isValidSriLankanMobile(form.phone)) errs.phone = 'Enter a valid Sri Lankan mobile number, e.g. 077 123 4567.';
    if (issues.length) errs.password = `Password needs: ${issues.join(', ').toLowerCase()}.`;
    if (form.confirm !== form.password) errs.confirm = 'Passwords don’t match.';
    if (!terms) errs.terms = 'Please accept the terms to create an account.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      window.setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 30);
      return;
    }
    setLoading(true);
    setFormError(null);
    setSubmitted(true);
    const r = await register({ ...form, marketingOptIn: marketing });
    setLoading(false);
    if (!r.ok) {
      setSubmitted(false);
      setFormError(r.error);
      return;
    }
    toast.success(`Welcome, ${form.firstName.trim()}! Your account is ready.`);
    navigate(redirect, { replace: true });
  };

  return (
    <AuthShell title="Create an account" description="Save addresses, track orders and keep your wishlist in one place.">
      <form onSubmit={submit} noValidate className="space-y-4">
        {formError &&
        <Alert tone="error">
            {formError} <Link to="/login" className="font-medium underline">Sign in</Link>
          </Alert>
        }
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="First name" required autoComplete="given-name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} maxLength={50} />
          <TextField label="Last name" required autoComplete="family-name" value={form.lastName} onChange={set('lastName')} error={errors.lastName} maxLength={50} />
        </div>
        <TextField label="Email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} maxLength={100} />
        <TextField label="Mobile number" type="tel" required autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} error={errors.phone} hint="e.g. 077 123 4567" maxLength={16} />
        <TextField label="Password" type="password" required autoComplete="new-password" value={form.password} onChange={set('password')} error={errors.password} hint="At least 8 characters, with upper and lowercase letters and a number." />
        <TextField label="Confirm password" type="password" required autoComplete="new-password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} />
        <Checkbox
          label={<>I agree to the <Link to="/terms-conditions" className="underline underline-offset-2">terms & conditions</Link> and <Link to="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>.</>}
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          error={errors.terms} />
        
        <Checkbox label="Email me about new arrivals and offers (optional)" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
        <Button type="submit" size="lg" fullWidth loading={loading}>Create account</Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-2">
        Already have an account? <Link to="/login" className="font-medium text-ink underline underline-offset-2">Sign in</Link>
      </p>
    </AuthShell>);

}