import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrdersContext';
import { OrderDetailView } from '../../components/account/OrderDetailView';
import { EmptyState } from '../../components/ui/States';
import { Button } from '../../components/ui/Button';

export function OrderDetail() {
  const { reference = '' } = useParams();
  const { customer } = useAuth();
  const { findOrder } = useOrders();
  useDocumentMeta(`Order ${reference}`, undefined, { noindex: true });
  const order = findOrder(reference);
  // Order history is restricted to the authenticated owner.
  if (!customer || !order || order.customerId !== customer.id) {
    return <EmptyState title="Order not found" description="We couldn’t find this order in your account." action={<Button to="/account/orders">Back to orders</Button>} />;
  }
  return (
    <div>
      <Link to="/account/orders" className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> All orders
      </Link>
      <h1 className="mb-6 mt-3 text-2xl font-semibold text-ink">Order {order.reference}</h1>
      <OrderDetailView order={order} />
      <p className="mt-10 text-sm text-ink-2">
        Need help with this order? <Link to="/contact" className="font-medium text-ink underline underline-offset-2">Contact us</Link> and quote {order.reference}.
      </p>
    </div>);

}