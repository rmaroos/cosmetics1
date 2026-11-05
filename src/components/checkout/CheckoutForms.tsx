import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useCheckout } from '../../hooks/useCheckout';
import { Checkbox, TextField } from '../ui/Field';
import { Button } from '../ui/Button';
import { AddressFields } from './AddressFields';
import { formatPrice } from '../../utils/format';
import { bankDetails } from '../../data/site';

type Checkout = ReturnType<typeof useCheckout>;

function RadioCard({ checked, onChange, name, title, description, aside }: {checked: boolean;onChange: () => void;name: string;title: string;description?: React.ReactNode;aside?: React.ReactNode;}) {
  return (
    <label className={twMerge('flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-[border-color,background-color] duration-150', checked ? 'border-ink bg-surface' : 'border-line hover:border-ink-muted')}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 shrink-0 accent-[#242326]" />
      <span className="flex-1">
        <span className="block text-[15px] font-medium text-ink">{title}</span>
        {description && <span className="mt-0.5 block text-sm text-ink-2">{description}</span>}
      </span>
      {aside && <span className="text-sm font-medium tabular-nums text-ink">{aside}</span>}
    </label>);

}

export function ContactForm({ c }: {c: Checkout;}) {
  const set = (k: keyof Checkout['contact']) => (e: React.ChangeEvent<HTMLInputElement>) => c.setContact({ ...c.contact, [k]: e.target.value });
  return (
    <form onSubmit={(e) => {e.preventDefault();c.completeContact();}} noValidate className="space-y-4">
      {!c.customer &&
      <p className="rounded-lg bg-surface px-4 py-3 text-sm text-ink-2">
          Have an account?{' '}
          <Link to="/login?redirect=/checkout" className="font-medium text-ink underline underline-offset-2">Sign in</Link> for faster checkout — your bag will be kept.
        </p>
      }
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="First name" required autoComplete="given-name" value={c.contact.firstName} onChange={set('firstName')} error={c.errors.firstName} maxLength={50} />
        <TextField label="Last name" required autoComplete="family-name" value={c.contact.lastName} onChange={set('lastName')} error={c.errors.lastName} maxLength={50} />
        <TextField label="Email" required type="email" autoComplete="email" value={c.contact.email} onChange={set('email')} error={c.errors.email} disabled={Boolean(c.customer)} hint="We’ll send your order confirmation here." maxLength={100} />
        <TextField label="Mobile number" required type="tel" inputMode="tel" autoComplete="tel" value={c.contact.phone} onChange={set('phone')} error={c.errors.phone} hint="e.g. 077 123 4567" maxLength={16} />
      </div>
      {!c.customer &&
      <div className="rounded-xl border border-line p-4">
          <Checkbox label="Create an account for faster checkout next time" description="Optional. Track orders and save addresses." checked={c.createAccount} onChange={(e) => c.setCreateAccount(e.target.checked)} />
          {c.createAccount &&
        <TextField label="Create a password" required type="password" autoComplete="new-password" value={c.password} onChange={(e) => c.setPassword(e.target.value)} error={c.errors.password} hint="At least 8 characters, with upper and lowercase letters and a number." containerClassName="mt-4" />
        }
        </div>
      }
      <Button type="submit" size="lg">Continue to delivery address</Button>
    </form>);

}

export function AddressForm({ c }: {c: Checkout;}) {
  return (
    <form onSubmit={(e) => {e.preventDefault();c.completeAddress();}} noValidate className="space-y-5">
      {c.savedAddresses.length > 0 &&
      <fieldset className="space-y-3">
          <legend className="mb-1 text-sm font-medium text-ink">Saved addresses</legend>
          {c.savedAddresses.map((a) =>
        <RadioCard key={a.id} name="address" checked={c.addressId === a.id} onChange={() => c.setAddressId(a.id)} title={`${a.label}${a.isDefault ? ' · Default' : ''}`} description={`${a.fullName}, ${a.line1}${a.line2 ? `, ${a.line2}` : ''}, ${a.city}, ${a.district}`} />
        )}
          <RadioCard name="address" checked={c.addressId === 'new'} onChange={() => c.setAddressId('new')} title="Use a new address" />
        </fieldset>
      }
      {c.addressId === 'new' &&
      <>
          <AddressFields value={c.address} onChange={c.setAddress} errors={c.errors} />
          {c.customer && <Checkbox label="Save this address to my account" checked={c.saveToBook} onChange={(e) => c.setSaveToBook(e.target.checked)} />}
        </>
      }
      {c.addressId !== 'new' && Object.keys(c.errors).length > 0 &&
      <p className="text-sm font-medium text-error" role="alert">This saved address is incomplete. Edit it in your account or use a new address.</p>
      }
      <Button type="submit" size="lg">Continue to delivery method</Button>
    </form>);

}

export function DeliveryForm({ c }: {c: Checkout;}) {
  return (
    <div className="space-y-4">
      <fieldset className="space-y-3">
        <legend className="mb-1 text-sm text-ink-2">Options available for {c.activeAddress.district}</legend>
        {c.methods.map((m) => {
          const free = m.freeOver !== undefined && c.subtotalAfterDiscount >= m.freeOver;
          return (
            <RadioCard
              key={m.id}
              name="delivery"
              checked={c.deliveryId === m.id}
              onChange={() => {c.setDeliveryId(m.id);c.setErrors({});}}
              title={m.name}
              description={<>{m.description}{m.freeOver !== undefined && !free && ` · Free over ${formatPrice(m.freeOver)}`}</>}
              aside={free ? 'Free' : formatPrice(m.fee)} />);


        })}
      </fieldset>
      {c.errors.delivery && <p className="text-sm font-medium text-error" role="alert">{c.errors.delivery}</p>}
      <p className="text-xs text-ink-muted">Delivery times are estimates and may vary with weather, holidays or courier delays.</p>
      <Button size="lg" onClick={c.completeDelivery}>Continue to payment</Button>
    </div>);

}

export function PaymentForm({ c }: {c: Checkout;}) {
  return (
    <div className="space-y-5">
      <fieldset className="space-y-3">
        <legend className="sr-only">Payment method</legend>
        {c.enabledPayments.map((p) =>
        <RadioCard key={p.id} name="payment" checked={c.paymentId === p.id} onChange={() => c.setPaymentId(p.id)} title={p.name} description={p.description} />
        )}
      </fieldset>
      {c.paymentId === 'bank' &&
      <div className="rounded-xl bg-info-soft p-4 text-sm text-ink-2">
          <p className="font-medium text-ink">How bank transfer works</p>
          <p className="mt-1">After placing your order, transfer the total to {bankDetails.bank} ({bankDetails.accountName}) using your order reference. Full details are shown on the confirmation page and sent by email.</p>
        </div>
      }
      {c.errors.payment && <p className="text-sm font-medium text-error" role="alert">{c.errors.payment}</p>}
      <div className="space-y-3 border-t border-line pt-5">
        <Checkbox
          label={<>I agree to the <Link to="/terms-conditions" target="_blank" className="underline underline-offset-2">terms & conditions</Link> and <Link to="/privacy-policy" target="_blank" className="underline underline-offset-2">privacy policy</Link>.</>}
          checked={c.acceptTerms}
          onChange={(e) => c.setAcceptTerms(e.target.checked)}
          error={c.errors.terms} />
        
        <Checkbox label="Email me about new arrivals and offers (optional)" checked={c.marketing} onChange={(e) => c.setMarketing(e.target.checked)} />
      </div>
    </div>);

}