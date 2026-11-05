import React, { useState } from 'react';
import { CheckCircle2Icon, ClockIcon, MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { siteConfig } from '../../data/site';
import { isValidEmail, isValidSriLankanMobile, sanitiseText } from '../../utils/validation';
import { createId, readStorage, wait, writeStorage } from '../../utils/storage';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { SelectField, TextArea, TextField } from '../../components/ui/Field';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/States';

const topics = ['Order enquiry', 'Product advice', 'Returns & refunds', 'Delivery', 'Other'];

export function Contact() {
  useDocumentMeta('Contact us', 'Get in touch with our customer care team by phone, WhatsApp, email or our contact form.');
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', orderRef: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [ticket, setTicket] = useState('');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Enter your name.';
    if (!isValidEmail(form.email)) errs.email = 'Enter a valid email address.';
    if (form.phone && !isValidSriLankanMobile(form.phone)) errs.phone = 'Enter a valid Sri Lankan mobile number.';
    if (!form.topic) errs.topic = 'Choose a topic.';
    if (form.message.trim().length < 10) errs.message = 'Please tell us a little more (at least 10 characters).';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    await wait(700);
    if (!navigator.onLine) return setStatus('error');
    const id = createId('msg').toUpperCase().slice(4, 12);
    const list = readStorage<unknown[]>('contact-messages', []);
    writeStorage('contact-messages', [...list, { id, ...form, message: sanitiseText(form.message), at: new Date().toISOString() }]);
    setTicket(id);
    setStatus('sent');
  };

  const channels = [
  { icon: PhoneIcon, label: 'Call us', value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, '')}` },
  { icon: MessageCircleIcon, label: 'WhatsApp', value: siteConfig.whatsapp, href: `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}` },
  { icon: MailIcon, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPinIcon, label: 'Visit', value: siteConfig.address },
  { icon: ClockIcon, label: 'Hours', value: siteConfig.hours }];


  return (
    <Container className="pb-20">
      <Breadcrumbs items={[{ label: 'Contact us' }]} />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <h1 className="font-display text-4xl text-ink md:text-5xl">How can we help?</h1>
          <p className="mt-3 text-ink-2">Our customer care team usually replies within one working day.</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {channels.map((c) =>
            <li key={c.label} className="flex items-start gap-4 py-4">
                <c.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="text-sm text-ink-2">{c.label}</p>
                  {c.href ?
                <a href={c.href} className="text-[15px] font-medium text-ink hover:text-brand" {...c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}}>{c.value}</a> :

                <p className="text-[15px] text-ink">{c.value}</p>
                }
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl bg-surface p-6 md:p-8">
          {status === 'sent' ?
          <div className="py-8 text-center" role="status">
              <CheckCircle2Icon className="mx-auto h-10 w-10 text-success" aria-hidden="true" />
              <h2 className="mt-4 font-display text-3xl text-ink">Message sent</h2>
              <p className="mt-2 text-ink-2">Thanks, {form.name.split(' ')[0]}. We’ll reply to {form.email}. Your reference is <span className="font-medium text-ink">{ticket}</span>.</p>
              <Button variant="secondary" className="mt-6" onClick={() => {setForm({ name: '', email: '', phone: '', topic: '', orderRef: '', message: '' });setStatus('idle');}}>Send another message</Button>
            </div> :

          <form onSubmit={submit} noValidate className="space-y-4">
              <h2 className="text-lg font-semibold text-ink">Send us a message</h2>
              {status === 'error' && <Alert tone="error">We couldn’t send your message. Please check your connection and try again.</Alert>}
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" required autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} maxLength={80} />
                <TextField label="Email" required type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} maxLength={100} />
                <TextField label="Mobile number" optional type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} error={errors.phone} maxLength={16} />
                <SelectField label="Topic" required value={form.topic} onChange={set('topic')} error={errors.topic} placeholder="Choose a topic" options={topics.map((t) => ({ value: t, label: t }))} />
              </div>
              {(form.topic === 'Order enquiry' || form.topic === 'Returns & refunds' || form.topic === 'Delivery') &&
            <TextField label="Order reference" optional value={form.orderRef} onChange={(e) => setForm({ ...form, orderRef: e.target.value.toUpperCase() })} placeholder="NB-000000-0000" maxLength={14} />
            }
              <TextArea label="Message" required value={form.message} onChange={set('message')} error={errors.message} maxLength={2000} />
              <p className="text-xs text-ink-muted">We’ll only use your details to respond to this enquiry.</p>
              <Button type="submit" size="lg" loading={status === 'sending'}>Send message</Button>
            </form>
          }
        </div>
      </div>
    </Container>);

}