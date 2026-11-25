import React from 'react';
import { SelectField, TextField } from '../ui/Field';
import { districts } from '../../data/site';

export type AddressDraft = {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  district: string;
  postalCode: string;
  instructions: string;
};

export const emptyAddress: AddressDraft = { fullName: '', phone: '', line1: '', line2: '', city: '', district: '', postalCode: '', instructions: '' };

type Props = {
  value: AddressDraft;
  onChange: (next: AddressDraft) => void;
  errors: Partial<Record<keyof AddressDraft, string>>;
};

export function AddressFields({ value, onChange, errors }: Props) {
  const set = (key: keyof AddressDraft) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange({ ...value, [key]: e.target.value });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField label="Recipient’s full name" required autoComplete="name" value={value.fullName} onChange={set('fullName')} error={errors.fullName} maxLength={80} />
      <TextField label="Recipient’s mobile number" required type="tel" inputMode="tel" autoComplete="tel" value={value.phone} onChange={set('phone')} error={errors.phone} hint="For the courier, e.g. 077 123 4567" maxLength={16} />
      <TextField label="House number and street" required autoComplete="address-line1" value={value.line1} onChange={set('line1')} error={errors.line1} containerClassName="sm:col-span-2" maxLength={120} />
      <TextField label="Area / locality" optional autoComplete="address-line2" value={value.line2} onChange={set('line2')} containerClassName="sm:col-span-2" maxLength={120} hint="e.g. village, landmark or apartment name" />
      <TextField label="Town / city" required autoComplete="address-level2" value={value.city} onChange={set('city')} error={errors.city} maxLength={60} />
      <SelectField label="District" required value={value.district} onChange={set('district')} error={errors.district} placeholder="Select district" options={districts.map((d) => ({ value: d, label: d }))} />
      <TextField label="Postal code" optional inputMode="numeric" autoComplete="postal-code" value={value.postalCode} onChange={set('postalCode')} error={errors.postalCode} maxLength={5} />
      <TextField label="Delivery instructions" optional value={value.instructions} onChange={set('instructions')} maxLength={160} hint="e.g. call on arrival" />
    </div>);

}