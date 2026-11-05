import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail } from '../../utils/validation';
import { demoCredentials } from '../../data/demoAccount';
import { AuthShell } from '../../components/account/AuthShell';
import { TextField } from '../../components/ui/Field';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/States';

/** Only allow same-site relative redirects. */
export function safeRedirect(value: string | null, fallback = '/account'): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return fallback;
  return value;
}

export function Login() {
  useDocumentMeta('Sign in', undefined, { noindex: true });
  const { login, customer } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirect = safeRedirect(params.get('redirect'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) navigate(redirect, { replace: true });
  }, [customer, navigate, redirect]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!isValidEmail(email)) errs.email = 'Enter a valid email address.';
    if (!password) errs.password = 'Enter your password.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setFormError(null);
    const r = await login(email, password);
    setLoading(false);
    if (!r.ok) setFormError(r.error);
  };

  return (
    <AuthShell title="Welcome back" description="Sign in to track orders, manage addresses and keep your wishlist across devices.">
      <form onSubmit={submit} noValidate className="space-y-4">
        {formError && <Alert tone="error">{formError}</Alert>}
        <TextField label="Email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <TextField label="Password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-ink-2 underline underline-offset-2 hover:text-ink">Forgot your password?</Link>
        </div>
        <Button type="submit" size="lg" fullWidth loading={loading}>Sign in</Button>
      </form>
      <p className="mt-6 text-center text-sm text-ink-2">
        New here? <Link to={`/register${params.get('redirect') ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} className="font-medium text-ink underline underline-offset-2">Create an account</Link>
      </p>
      <div className="mt-8 rounded-xl border border-dashed border-line p-4 text-sm text-ink-2">
        <p className="font-medium text-ink">Exploring the demo?</p>
        <p className="mt-1">Use <span className="font-medium text-ink">{demoCredentials.email}</span> / <span className="font-medium text-ink">{demoCredentials.password}</span> to see an account with past orders.</p>
        <button type="button" onClick={() => {setEmail(demoCredentials.email);setPassword(demoCredentials.password);}} className="mt-2 font-medium text-brand underline underline-offset-2">Fill demo details</button>
      </div>
    </AuthShell>);

}