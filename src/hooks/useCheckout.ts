import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ContactDetails, Order, PaymentMethod } from '../types/commerce';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import { emptyAddress, type AddressDraft } from '../components/checkout/AddressFields';
import { availableDeliveryMethods, createOrderReference, deliveryFeeFor } from '../utils/pricing';
import { validateAddress, validateContact, type Errors } from '../utils/checkoutValidation';
import { normalisePhone } from '../utils/validation';
import { paymentMethods } from '../data/site';
import { readStorage, writeStorage } from '../utils/storage';

export type StepIndex = 0 | 1 | 2 | 3;

export function useCheckout() {
  const { customer, register, saveAddress } = useAuth();
  const cart = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState<StepIndex>(0);
  const [contact, setContact] = useState<ContactDetails>({ firstName: '', lastName: '', email: '', phone: '' });
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState('');
  const [addressId, setAddressId] = useState<string>('new');
  const [address, setAddress] = useState<AddressDraft>(emptyAddress);
  const [saveToBook, setSaveToBook] = useState(true);
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<PaymentMethod['id'] | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const reference = useRef(createOrderReference());

  // Prefill from the signed-in account (sign-in mid-checkout keeps the bag).
  useEffect(() => {
    if (!customer) return;
    setContact((c) => ({
      firstName: c.firstName || customer.firstName,
      lastName: c.lastName || customer.lastName,
      email: customer.email,
      phone: c.phone || customer.phone
    }));
    const def = customer.addresses.find((a) => a.isDefault) ?? customer.addresses[0];
    if (def) setAddressId(def.id);
    setCreateAccount(false);
  }, [customer]);

  const savedAddresses = customer?.addresses ?? [];
  const activeAddress: AddressDraft = useMemo(() => {
    const saved = savedAddresses.find((a) => a.id === addressId);
    if (!saved) return address;
    return { fullName: saved.fullName, phone: saved.phone, line1: saved.line1, line2: saved.line2 ?? '', city: saved.city, district: saved.district, postalCode: saved.postalCode ?? '', instructions: saved.instructions ?? '' };
  }, [addressId, address, savedAddresses]);

  const purchasable = cart.lines.filter((l) => l.issue !== 'unavailable');
  const methods = availableDeliveryMethods(activeAddress.district || undefined);
  const delivery = methods.find((m) => m.id === deliveryId) ?? null;
  const subtotalAfterDiscount = cart.subtotal - cart.discount;
  const deliveryFee = delivery ? deliveryFeeFor(delivery, subtotalAfterDiscount) : null;
  const total = subtotalAfterDiscount + (deliveryFee ?? 0);
  const enabledPayments = paymentMethods.filter((p) => p.enabled);

  // Drop a delivery method that is no longer valid for the chosen district.
  useEffect(() => {
    if (deliveryId && !methods.some((m) => m.id === deliveryId)) setDeliveryId(null);
  }, [methods, deliveryId]);

  const focusFirstError = () => window.setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 30);

  const completeContact = () => {
    const e = validateContact(contact, createAccount && !customer, password);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError();
    if (!address.fullName && !address.phone) setAddress((a) => ({ ...a, fullName: `${contact.firstName} ${contact.lastName}`.trim(), phone: contact.phone }));
    setStep(1);
  };

  const completeAddress = () => {
    const e = validateAddress(activeAddress) as Errors;
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError();
    setStep(2);
  };

  const completeDelivery = () => {
    if (!delivery) {
      setErrors({ delivery: 'Choose a delivery method.' });
      return;
    }
    setErrors({});
    setStep(3);
  };

  const place = async () => {
    if (submitting) return;
    const e: Errors = {};
    if (!paymentId) e.payment = 'Choose a payment method.';
    if (!acceptTerms) e.terms = 'Please accept the terms and conditions to place your order.';
    setErrors(e);
    if (Object.keys(e).length || !delivery || !paymentId) return;
    if (cart.hasIssues) {
      setSubmitError('Some items in your bag have changed. Please review your bag before placing your order.');
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    let customerId = customer?.id ?? null;
    if (!customer && createAccount) {
      const r = await register({ ...contact, password, marketingOptIn: marketing });
      if (!r.ok) {
        setSubmitting(false);
        setSubmitError(r.error);
        setStep(0);
        return;
      }
      customerId = r.customerId;
    }
    const now = new Date().toISOString();
    const payment = enabledPayments.find((p) => p.id === paymentId)!;
    const order: Order = {
      reference: reference.current,
      customerId,
      createdAt: now,
      contact: { ...contact, email: contact.email.trim().toLowerCase(), phone: normalisePhone(contact.phone) },
      address: {
        fullName: activeAddress.fullName.trim(),
        phone: normalisePhone(activeAddress.phone),
        line1: activeAddress.line1.trim(),
        line2: activeAddress.line2.trim() || undefined,
        city: activeAddress.city.trim(),
        district: activeAddress.district,
        postalCode: activeAddress.postalCode.trim() || undefined,
        instructions: activeAddress.instructions.trim() || undefined
      },
      items: purchasable.map((l) => ({
        productId: l.productId,
        variantId: l.variantId,
        name: l.product.name,
        brandName: l.brand?.name ?? '',
        variantLabel: l.variant.label,
        image: l.product.images[0],
        unitPrice: l.unitPrice,
        quantity: l.quantity
      })),
      deliveryMethod: { id: delivery.id, name: delivery.name, description: delivery.description },
      paymentMethod: { id: payment.id, name: payment.name },
      paymentStatus: payment.id === 'bank' ? 'awaiting_transfer' : 'pending',
      status: 'placed',
      statusHistory: [{ status: 'placed', at: now }],
      promoCode: cart.discount > 0 ? cart.promoCode ?? undefined : undefined,
      subtotal: cart.subtotal,
      discount: cart.discount,
      deliveryFee: deliveryFee ?? 0,
      total
    };
    const result = await placeOrder(order);
    if (!result.ok) {
      setSubmitting(false);
      setSubmitError(result.error);
      return;
    }
    if (customer && addressId === 'new' && saveToBook) {
      await saveAddress({ ...order.address, label: 'Saved address', isDefault: savedAddresses.length === 0 });
    }
    if (marketing) {
      const list = readStorage<string[]>('newsletter', []);
      if (!list.includes(order.contact.email)) writeStorage('newsletter', [...list, order.contact.email]);
    }
    const confirmed = readStorage<string[]>('confirmed-orders', []);
    writeStorage('confirmed-orders', [...confirmed, order.reference]);
    cart.clearCart();
    navigate(`/order-confirmation/${order.reference}`, { replace: true });
  };

  return {
    customer,
    step,
    setStep,
    contact,
    setContact,
    createAccount,
    setCreateAccount,
    password,
    setPassword,
    savedAddresses,
    addressId,
    setAddressId,
    address,
    setAddress,
    activeAddress,
    saveToBook,
    setSaveToBook,
    methods,
    deliveryId,
    setDeliveryId,
    delivery,
    deliveryFee,
    subtotalAfterDiscount,
    enabledPayments,
    paymentId,
    setPaymentId,
    acceptTerms,
    setAcceptTerms,
    marketing,
    setMarketing,
    errors,
    setErrors,
    submitting,
    submitError,
    total,
    purchasable,
    completeContact,
    completeAddress,
    completeDelivery,
    place
  };
}