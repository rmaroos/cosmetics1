import React, { useState } from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { Button } from '../ui/Button';
import { isValidEmail } from '../../utils/validation';
import { readStorage, wait, writeStorage } from '../../utils/storage';

type Status = 'idle' | 'submitting' | 'success' | 'already' | 'error';

<<<<<<< HEAD
export function NewsletterForm({ tone = 'light' }: { tone?: 'light' | 'dark' } = {}) {
  const dark = tone === 'dark';
=======
export function NewsletterForm() {
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return setError('Enter a valid email address.');
    if (!consent) return setError('Please confirm you’d like to receive marketing emails.');
    setError(null);
    setStatus('submitting');
    await wait(700);
    if (!navigator.onLine) {
      setStatus('error');
      return;
    }
    const list = readStorage<string[]>('newsletter', []);
    const normalised = email.trim().toLowerCase();
    if (list.includes(normalised)) {
      setStatus('already');
      return;
    }
    writeStorage('newsletter', [...list, normalised]);
    setStatus('success');
  };

  if (status === 'success' || status === 'already') {
    return (
<<<<<<< HEAD
      <p className={`flex items-start gap-2 text-sm ${dark ? 'text-white' : 'text-ink'}`} role="status">
=======
      <p className="flex items-start gap-2 text-sm text-ink" role="status">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
        <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
        {status === 'success' ? 'You’re subscribed. Look out for our next edit in your inbox.' : 'This email is already subscribed — no further action needed.'}
      </p>);

  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
<<<<<<< HEAD
          className={`h-12 min-w-0 flex-1 rounded-full border px-5 focus:outline-none focus:ring-2 ${dark ? 'border-white/25 bg-white/5 text-white placeholder:text-white/50 focus:border-ivory focus:ring-ivory/30' : 'border-line bg-white text-ink focus:border-brand focus:ring-brand/25'}`}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'newsletter-error' : undefined} />
        
        <Button type="submit" size="lg" variant={dark ? 'primary' : 'dark'} className={dark ? 'bg-ivory text-brand hover:bg-sand' : undefined} loading={status === 'submitting'}>
          Subscribe
        </Button>
      </div>
      <label className={`flex cursor-pointer items-start gap-2.5 px-1 text-xs leading-snug ${dark ? 'text-white/60' : 'text-ink-2'}`}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand" />
        I’d like to receive emails about new arrivals, offers and beauty tips. I can unsubscribe at any time.
      </label>
      {error &&
      <p id="newsletter-error" className={`text-xs font-medium ${dark ? 'text-[#F2C9C4]' : 'text-error'}`} role="alert">
=======
          className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-white px-3.5 text-[15px] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? 'newsletter-error' : undefined} />
        
        <Button type="submit" loading={status === 'submitting'}>
          Subscribe
        </Button>
      </div>
      <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-snug text-ink-2">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#A2626A]" />
        I’d like to receive emails about new arrivals, offers and beauty tips. I can unsubscribe at any time.
      </label>
      {error &&
      <p id="newsletter-error" className="text-xs font-medium text-error" role="alert">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          {error}
        </p>
      }
      {status === 'error' &&
<<<<<<< HEAD
      <p className={`text-xs font-medium ${dark ? 'text-[#F2C9C4]' : 'text-error'}`} role="alert">
=======
      <p className="text-xs font-medium text-error" role="alert">
>>>>>>> 7d0afddf08a196a4c824dcd8483680f37936dcd9
          We couldn’t subscribe you right now. Please try again.
        </p>
      }
    </form>);

}