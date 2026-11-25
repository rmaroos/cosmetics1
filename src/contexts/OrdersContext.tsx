import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Order } from '../types/commerce';
import { readStorage, wait, writeStorage } from '../utils/storage';
import { getProductById, getVariant } from '../utils/catalog';
import { demoOrders } from '../data/demoAccount';

type PlaceOrderResult = {ok: true;order: Order;} | {ok: false;error: string;};

type OrdersValue = {
  orders: Order[];
  placeOrder: (order: Order) => Promise<PlaceOrderResult>;
  ordersFor: (customerId: string) => Order[];
  findOrder: (reference: string) => Order | undefined;
  lookupOrder: (reference: string, email: string) => Promise<Order | null>;
  hasPurchased: (customerId: string, productId: string) => boolean;
};

const OrdersContext = createContext<OrdersValue | null>(null);

export function OrdersProvider({ children }: {children: React.ReactNode;}) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = readStorage<Order[]>('orders', []);
    const missingDemo = demoOrders.filter((d) => !stored.some((o) => o.reference === d.reference));
    return [...stored, ...missingDemo];
  });

  useEffect(() => writeStorage('orders', orders), [orders]);

  const placeOrder = useCallback<OrdersValue['placeOrder']>(async (order) => {
    await wait(900);
    if (!navigator.onLine) return { ok: false, error: 'We couldn’t reach our servers. Your order has not been placed — please try again.' };
    // Final revalidation of availability and price before accepting the order.
    for (const item of order.items) {
      const product = getProductById(item.productId);
      const variant = product ? getVariant(product, item.variantId) : undefined;
      if (!product || !variant || variant.stock <= 0) {
        return { ok: false, error: `${item.name} (${item.variantLabel}) is no longer available. Please review your bag.` };
      }
      if (variant.stock < item.quantity) {
        return { ok: false, error: `Only ${variant.stock} of ${item.name} (${item.variantLabel}) are available. Please update your bag.` };
      }
      if (variant.price !== item.unitPrice) {
        return { ok: false, error: `The price of ${item.name} has changed. Please review your bag before ordering.` };
      }
    }
    setOrders((prev) => prev.some((o) => o.reference === order.reference) ? prev : [order, ...prev]);
    return { ok: true, order };
  }, []);

  const ordersFor = useCallback(
    (customerId: string) =>
    orders.filter((o) => o.customerId === customerId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [orders]
  );

  const findOrder = useCallback((reference: string) => orders.find((o) => o.reference === reference), [orders]);

  const lookupOrder = useCallback(
    async (reference: string, email: string) => {
      await wait(500);
      const ref = reference.trim().toUpperCase();
      return orders.find((o) => o.reference === ref && o.contact.email.toLowerCase() === email.trim().toLowerCase()) ?? null;
    },
    [orders]
  );

  const hasPurchased = useCallback(
    (customerId: string, productId: string) =>
    orders.some((o) => o.customerId === customerId && o.status !== 'cancelled' && o.items.some((i) => i.productId === productId)),
    [orders]
  );

  const value = useMemo(
    () => ({ orders, placeOrder, ordersFor, findOrder, lookupOrder, hasPurchased }),
    [orders, placeOrder, ordersFor, findOrder, lookupOrder, hasPurchased]
  );
  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders(): OrdersValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}