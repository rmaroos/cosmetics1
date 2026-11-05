import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2Icon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useOrders } from '../../contexts/OrdersContext';
import { useAuth } from '../../contexts/AuthContext';
import { readStorage } from '../../utils/storage';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { BankTransferDetails, OrderDetailView } from '../../components/account/OrderDetailView';
import { NotFound } from '../NotFound';

export function OrderConfirmation() {
  const { reference = '' } = useParams();
  const { findOrder } = useOrders();
  const { customer } = useAuth();
  useDocumentMeta('Order confirmed', undefined, { noindex: true });
  const order = findOrder(reference);
  // Only show to the customer who placed it in this browser, or the account owner.
  const allowed = order && (readStorage<string[]>('confirmed-orders', []).includes(order.reference) || customer && order.customerId === customer.id);
  if (!order || !allowed) return <NotFound title="We can’t show this order" description="If you placed an order, check your confirmation email or use Track Order with your reference and email." />;

  const isBank = order.paymentMethod.id === 'bank';
  return (
    <Container className="max-w-3xl py-12 md:py-16">
      <div className="text-center">
        <CheckCircle2Icon className="mx-auto h-12 w-12 text-success" aria-hidden="true" />
        <h1 className="mt-4 font-display text-4xl text-ink md:text-5xl">Thank you, {order.contact.firstName}</h1>
        <p className="mt-3 text-ink-2">
          Your order <span className="font-semibold text-ink">{order.reference}</span> has been placed. A confirmation has been sent to {order.contact.email}.
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-surface p-5 text-sm text-ink-2 sm:p-6">
        <p className="font-semibold text-ink">What happens next</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {isBank ? <li>Transfer the total using the details below.</li> : <li>We’ll call or message you to confirm your order.</li>}
          <li>We’ll prepare and dispatch your order{isBank ? ' once payment is confirmed' : ''}.</li>
          <li>Track progress {order.customerId ? 'in My Orders' : 'with Track Order, using your reference and email'}.</li>
        </ol>
      </div>

      {isBank && <div className="mt-6"><BankTransferDetails order={order} /></div>}

      <div className="mt-10 border-t border-line pt-8">
        <OrderDetailView order={order} hideBankDetails />
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {order.customerId && customer ? <Button to={`/account/orders/${order.reference}`}>View order in my account</Button> : <Button to="/track-order">Track this order</Button>}
        <Button to="/shop" variant="secondary">Continue shopping</Button>
      </div>
    </Container>);

}