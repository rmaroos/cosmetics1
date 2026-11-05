import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheckIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail } from '../../utils/validation';
import { AuthShell } from '../../components/account/AuthShell';
import { TextField } from '../../components/ui/Field';
import { Button } from '../../components/ui/Button';

export function ForgotPassword() {
  useDocumentMeta('Reset your password', undefined, { noindex: true });
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return setError('Enter a valid email address.');
    setError(undefined);
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthShell title="Reset your password" description="Enter the email you use for your account and we’ll send a link to reset your password.">
      {sent ?
      <div className="rounded-2xl bg-surface p-6" role="status">
          <MailCheckIcon className="h-8 w-8 text-success" aria-hidden="true" />
          <p className="mt-3 font-semibold text-ink">Check your inbox</p>
          {/* Same response regardless of whether the account exists. */}
          <p className="mt-1 text-sm text-ink-2">If an account exists for {email}, you’ll receive a reset link within a few minutes. The link expires after 1 hour.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button to="/login">Back to sign in</Button>
            <Button variant="secondary" onClick={() => setSent(false)}>Try another email</Button>
          </div>
        </div> :

      <form onSubmit={submit} noValidate className="space-y-4">
          <TextField label="Email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
          <Button type="submit" size="lg" fullWidth loading={loading}>Send reset link</Button>
          <p className="text-center text-sm text-ink-2">
            Remembered it? <Link to="/login" className="font-medium text-ink underline underline-offset-2">Sign in</Link>
          </p>
        </form>
      }
    </AuthShell>);

}