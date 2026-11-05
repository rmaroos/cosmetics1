import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../../types/commerce';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useOrders } from '../../contexts/OrdersContext';
import { useAuth } from '../../contexts/AuthContext';
import { isValidEmail } from '../../utils/validation';
import { Container } from '../../components/layout/Container';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { TextField } from '../../components/ui/Field';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/States';
import { OrderDetailView } from '../../components/account/OrderDetailView';

export function TrackOrder() {
  useDocumentMeta('Track your order', 'Check the status of your order using your order reference and email address.');
  const { lookupOrder } = useOrders();
  const { customer } = useAuth();
  const [reference, setReference] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^NB-\d{6}-\d{4}$/i.test(reference.trim())) errs.reference = 'Enter your order reference, e.g. NB-261102-7390.';
    if (!isValidEmail(email)) errs.email = 'Enter the email address used for the order.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setNotFound(false);
    const found = await lookupOrder(reference, email);
    setLoading(false);
    setOrder(found);
    setNotFound(!found);
  };

  return (
    <Container className="max-w-3xl pb-20">
      <Breadcrumbs items={[{ label: 'Track an order' }]} />
      <h1 className="font-display text-4xl text-ink md:text-5xl">Track your order</h1>
      <p className="mt-3 text-ink-2">
        Enter the reference from your confirmation email.{' '}
        {customer ? <Link to="/account/orders" className="text-ink underline underline-offset-2">View all your orders</Link> : <>Have an account? <Link to="/login?redirect=/account/orders" className="text-ink underline underline-offset-2">Sign in</Link> to see all orders.</>}
      </p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
        <TextField label="Order reference" required value={reference} onChange={(e) => setReference(e.target.value.toUpperCase())} error={errors.reference} maxLength={14} autoComplete="off" />
        <TextField label="Email address" required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Button type="submit" size="lg" loading={loading} className="sm:mt-[26px]">Find order</Button>
      </form>

      <div className="mt-10" aria-live="polite">
        {notFound &&
        <Alert tone="warning" title="We couldn’t find a matching order">
            Check the reference and email match your confirmation. Still stuck? <Link to="/contact" className="font-medium underline">Contact us</Link>.
          </Alert>
        }
        {order &&
        <div className="border-t border-line pt-8">
            <h2 className="mb-6 text-xl font-semibold text-ink">Order {order.reference}</h2>
            <OrderDetailView order={order} />
          </div>
        }
      </div>
    </Container>);

}