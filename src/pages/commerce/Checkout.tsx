import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, LockIcon, ShoppingBagIcon } from 'lucide-react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useCheckout } from '../../hooks/useCheckout';
import { useCart } from '../../contexts/CartContext';
import { siteConfig } from '../../data/site';
import { formatPrice } from '../../utils/format';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Alert, EmptyState } from '../../components/ui/States';
import { CheckoutStep } from '../../components/checkout/CheckoutStep';
import { AddressForm, ContactForm, DeliveryForm, PaymentForm } from '../../components/checkout/CheckoutForms';
import { OrderSummary } from '../../components/checkout/OrderSummary';

export function Checkout() {
  useDocumentMeta('Checkout', undefined, { noindex: true });
  const cart = useCart();
  const c = useCheckout();

  const header =
  <header className="border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Back to bag</span>
        </Link>
        <Link to="/" className="font-display text-2xl font-semibold text-ink" aria-label={`${siteConfig.name} home`}>
          {siteConfig.name.split(' ')[0]}<span className="text-brand">.</span>
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-2">
          <LockIcon className="h-3.5 w-3.5" aria-hidden="true" /> Secure checkout
        </span>
      </Container>
    </header>;


  if (!c.purchasable.length) {
    return (
      <>
        {header}
        <Container>
          <EmptyState icon={<ShoppingBagIcon className="h-6 w-6" />} title="Your bag is empty" description="Add some products to your bag before checking out." action={<Button to="/shop">Start shopping</Button>} />
        </Container>
      </>);

  }

  const stateOf = (i: number) => (c.step === i ? 'active' : c.step > i ? 'complete' : 'upcoming') as 'active' | 'complete' | 'upcoming';
  const a = c.activeAddress;
  const summaryLines = cart.lines.map((l) => ({
    key: l.key,
    name: l.product.name,
    brandName: l.brand?.name,
    variantLabel: l.variant.label,
    image: l.product.images[0],
    quantity: l.quantity,
    lineTotal: l.lineTotal,
    unavailable: l.issue === 'unavailable'
  }));

  return (
    <>
      {header}
      <Container className="py-8 md:py-12">
        <h1 className="sr-only">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="space-y-4">
            {c.submitError && <Alert tone="error" title="Your order wasn’t placed">{c.submitError} {cart.hasIssues && <Link to="/cart" className="font-medium underline">Review bag</Link>}</Alert>}

            <CheckoutStep
              number={1}
              title="Contact information"
              state={stateOf(0)}
              onEdit={() => c.setStep(0)}
              summary={<>{c.contact.firstName} {c.contact.lastName} · {c.contact.email} · {c.contact.phone}{c.createAccount && !c.customer && <span className="block text-xs">An account will be created when you place your order.</span>}</>}>
              
              <ContactForm c={c} />
            </CheckoutStep>

            <CheckoutStep
              number={2}
              title="Delivery address"
              state={stateOf(1)}
              onEdit={() => c.setStep(1)}
              summary={<>{a.fullName}, {a.line1}{a.line2 && `, ${a.line2}`}, {a.city}, {a.district}{a.postalCode && ` ${a.postalCode}`} · {a.phone}</>}>
              
              <AddressForm c={c} />
            </CheckoutStep>

            <CheckoutStep
              number={3}
              title="Delivery method"
              state={stateOf(2)}
              onEdit={() => c.setStep(2)}
              summary={c.delivery && <>{c.delivery.name} · {c.delivery.description} · {c.deliveryFee === 0 ? 'Free' : formatPrice(c.deliveryFee ?? 0)}</>}>
              
              <DeliveryForm c={c} />
            </CheckoutStep>

            <CheckoutStep number={4} title="Payment & review" state={stateOf(3)}>
              <PaymentForm c={c} />
              <div className="mt-6 lg:hidden">
                <OrderSummary lines={summaryLines} subtotal={cart.subtotal} discount={cart.discount} promoCode={cart.promoCode} deliveryFee={c.deliveryFee} deliveryLabel={c.delivery?.name} />
              </div>
              <Button size="lg" fullWidth className="mt-6" onClick={c.place} loading={c.submitting} disabled={c.submitting}>
                {c.submitting ? 'Placing your order…' : `Place order · ${formatPrice(c.total)}`}
              </Button>
              <p className="mt-3 text-center text-xs text-ink-muted">You won’t be charged online. {c.paymentId === 'bank' ? 'Transfer details follow on the next page.' : 'Pay when your order arrives.'}</p>
            </CheckoutStep>
          </div>

          <aside aria-labelledby="checkout-summary" className="hidden lg:block lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 id="checkout-summary" className="text-lg font-semibold text-ink">Order summary</h2>
                <Link to="/cart" className="text-sm text-ink-2 underline underline-offset-2 hover:text-ink">Edit bag</Link>
              </div>
              <div className="mt-4">
                <OrderSummary lines={summaryLines} subtotal={cart.subtotal} discount={cart.discount} promoCode={cart.promoCode} deliveryFee={c.deliveryFee} deliveryLabel={c.delivery?.name} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>);

}