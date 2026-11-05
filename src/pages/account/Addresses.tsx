import React, { useState } from 'react';
import { MapPinIcon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import type { Address } from '../../types/commerce';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { validateAddress } from '../../utils/checkoutValidation';
import { normalisePhone } from '../../utils/validation';
import { AddressFields, emptyAddress, type AddressDraft } from '../../components/checkout/AddressFields';
import { Checkbox, TextField } from '../../components/ui/Field';
import { Button } from '../../components/ui/Button';
import { Overlay } from '../../components/ui/Overlay';
import { EmptyState } from '../../components/ui/States';

type Editing = {id?: string;label: string;draft: AddressDraft;isDefault: boolean;};

export function Addresses() {
  useDocumentMeta('Saved addresses', undefined, { noindex: true });
  const { customer, saveAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [editing, setEditing] = useState<Editing | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Address | null>(null);
  if (!customer) return null;

  const openNew = () => {
    setErrors({});
    setEditing({ label: 'Home', draft: { ...emptyAddress, fullName: `${customer.firstName} ${customer.lastName}`, phone: customer.phone }, isDefault: customer.addresses.length === 0 });
  };
  const openEdit = (a: Address) => {
    setErrors({});
    setEditing({ id: a.id, label: a.label, isDefault: Boolean(a.isDefault), draft: { fullName: a.fullName, phone: a.phone, line1: a.line1, line2: a.line2 ?? '', city: a.city, district: a.district, postalCode: a.postalCode ?? '', instructions: a.instructions ?? '' } });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const errs = validateAddress(editing.draft) as Record<string, string>;
    if (!editing.label.trim()) errs.label = 'Give this address a name, e.g. Home.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    const d = editing.draft;
    await saveAddress({
      id: editing.id,
      label: editing.label.trim(),
      isDefault: editing.isDefault,
      fullName: d.fullName.trim(),
      phone: normalisePhone(d.phone),
      line1: d.line1.trim(),
      line2: d.line2.trim() || undefined,
      city: d.city.trim(),
      district: d.district,
      postalCode: d.postalCode.trim() || undefined,
      instructions: d.instructions.trim() || undefined
    });
    setSaving(false);
    setEditing(null);
    toast.success(editing.id ? 'Address updated' : 'Address added');
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-ink">Saved addresses</h1>
        {customer.addresses.length > 0 &&
        <Button size="sm" onClick={openNew}><PlusIcon className="h-4 w-4" aria-hidden="true" /> Add address</Button>
        }
      </div>

      {customer.addresses.length === 0 ?
      <EmptyState icon={<MapPinIcon className="h-6 w-6" />} title="No saved addresses" description="Save an address for faster checkout." action={<Button onClick={openNew}>Add an address</Button>} /> :

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {customer.addresses.map((a) =>
        <li key={a.id} className="flex flex-col rounded-xl border border-line p-5">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-ink">{a.label}</p>
                {a.isDefault && <span className="rounded-full bg-sage-soft px-2 py-0.5 text-xs font-medium text-sage-dark">Default</span>}
              </div>
              <address className="mt-2 text-sm not-italic leading-relaxed text-ink-2">
                {a.fullName}<br />
                {a.line1}{a.line2 && <>, {a.line2}</>}<br />
                {a.city}, {a.district}{a.postalCode && ` ${a.postalCode}`}<br />
                {a.phone}
              </address>
              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4 text-sm">
                <button type="button" onClick={() => openEdit(a)} className="font-medium text-ink underline underline-offset-2">Edit</button>
                {!a.isDefault && <button type="button" onClick={() => {setDefaultAddress(a.id);toast.success('Default address updated');}} className="font-medium text-ink underline underline-offset-2">Set as default</button>}
                <button type="button" onClick={() => setConfirmDelete(a)} className="font-medium text-error underline underline-offset-2">Remove</button>
              </div>
            </li>
        )}
        </ul>
      }

      <Overlay open={Boolean(editing)} onClose={() => setEditing(null)} title={editing?.id ? 'Edit address' : 'Add an address'}>
        {editing &&
        <form onSubmit={submit} noValidate className="space-y-4 p-5">
            <TextField label="Address name" required value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} error={errors.label} hint="e.g. Home, Work, Parents" maxLength={30} />
            <AddressFields value={editing.draft} onChange={(draft) => setEditing({ ...editing, draft })} errors={errors} />
            <Checkbox label="Use as my default address" checked={editing.isDefault} onChange={(e) => setEditing({ ...editing, isDefault: e.target.checked })} />
            <Button type="submit" fullWidth size="lg" loading={saving}>Save address</Button>
          </form>
        }
      </Overlay>

      <Overlay open={Boolean(confirmDelete)} onClose={() => setConfirmDelete(null)} title="Remove address?" variant="modal">
        {confirmDelete &&
        <div className="p-5">
            <p className="text-ink-2">“{confirmDelete.label}” at {confirmDelete.line1} will be removed from your account.</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
              <Button variant="destructive" onClick={() => {deleteAddress(confirmDelete.id);setConfirmDelete(null);toast('Address removed');}}>Remove</Button>
            </div>
          </div>
        }
      </Overlay>
    </div>);

}