import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Brand, Product, ProductVariant } from '../types/catalog';
import type { CartLine } from '../types/commerce';
import { readStorage, writeStorage } from '../utils/storage';
import { getBrandById, getProductById, getVariant } from '../utils/catalog';
import { validatePromo } from '../utils/pricing';
import { MAX_QTY_PER_LINE } from '../data/site';

export type LineIssue = 'unavailable' | 'price-changed' | 'quantity-reduced';

export type DetailedLine = CartLine & {
  key: string;
  product: Product;
  variant: ProductVariant;
  brand?: Brand;
  unitPrice: number;
  lineTotal: number;
  maxQty: number;
  issue?: LineIssue;
};

type AddResult = {ok: true;quantity: number;} | {ok: false;error: string;};

type CartValue = {
  lines: DetailedLine[];
  itemCount: number;
  subtotal: number;
  promoCode: string | null;
  discount: number;
  promoError: string | null;
  hasIssues: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, variantId: string, quantity?: number) => AddResult;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => CartLine | undefined;
  restoreItem: (line: CartLine) => void;
  applyPromo: (code: string) => {ok: boolean;message: string;};
  removePromo: () => void;
  acknowledgeChanges: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const lineKey = (l: Pick<CartLine, 'productId' | 'variantId'>) => `${l.productId}:${l.variantId}`;

export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [rawLines, setRawLines] = useState<CartLine[]>(() => readStorage<CartLine[]>('cart', []));
  const [promoCode, setPromoCode] = useState<string | null>(() => readStorage<string | null>('promo', null));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => writeStorage('cart', rawLines), [rawLines]);
  useEffect(() => writeStorage('promo', promoCode), [promoCode]);

  // Revalidate each line against the current catalogue (price, availability, stock).
  const lines = useMemo<DetailedLine[]>(() => {
    const out: DetailedLine[] = [];
    for (const l of rawLines) {
      const product = getProductById(l.productId);
      const variant = product ? getVariant(product, l.variantId) : undefined;
      if (!product || !variant) continue;
      const maxQty = Math.min(variant.stock, MAX_QTY_PER_LINE);
      let issue: LineIssue | undefined;
      if (variant.stock <= 0) issue = 'unavailable';else
      if (l.quantity > maxQty) issue = 'quantity-reduced';else
      if (variant.price !== l.priceSnapshot) issue = 'price-changed';
      const quantity = issue === 'quantity-reduced' ? maxQty : l.quantity;
      out.push({
        ...l,
        quantity,
        key: lineKey(l),
        product,
        variant,
        brand: getBrandById(product.brandId),
        unitPrice: variant.price,
        lineTotal: issue === 'unavailable' ? 0 : variant.price * quantity,
        maxQty,
        issue
      });
    }
    return out;
  }, [rawLines]);

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const itemCount = lines.reduce((s, l) => s + (l.issue === 'unavailable' ? 0 : l.quantity), 0);

  const promoCheck = promoCode ? validatePromo(promoCode, subtotal) : null;
  const discount = promoCheck && promoCheck.ok ? promoCheck.discount : 0;
  const promoError = promoCheck && !promoCheck.ok ? promoCheck.reason : null;

  const addItem = useCallback<CartValue['addItem']>(
    (productId, variantId, quantity = 1) => {
      const product = getProductById(productId);
      const variant = product ? getVariant(product, variantId) : undefined;
      if (!product || !variant) return { ok: false, error: 'This product is no longer available.' };
      if (variant.stock <= 0) return { ok: false, error: 'This option is out of stock.' };
      const max = Math.min(variant.stock, MAX_QTY_PER_LINE);
      const existing = rawLines.find((l) => l.productId === productId && l.variantId === variantId);
      const current = existing?.quantity ?? 0;
      if (current >= max) {
        return { ok: false, error: `You already have the maximum available quantity (${max}) in your bag.` };
      }
      const next = Math.min(current + quantity, max);
      setRawLines((prev) =>
      existing ?
      prev.map((l) => l === existing ? { ...l, quantity: next, priceSnapshot: variant.price } : l) :
      [...prev, { productId, variantId, quantity: next, priceSnapshot: variant.price }]
      );
      return { ok: true, quantity: next - current };
    },
    [rawLines]
  );

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setRawLines((prev) =>
    prev.map((l) => {
      if (lineKey(l) !== key) return l;
      const product = getProductById(l.productId);
      const variant = product ? getVariant(product, l.variantId) : undefined;
      const max = variant ? Math.min(variant.stock, MAX_QTY_PER_LINE) : 1;
      return { ...l, quantity: Math.max(1, Math.min(quantity, max)) };
    })
    );
  }, []);

  const removeItem = useCallback(
    (key: string) => {
      const removed = rawLines.find((l) => lineKey(l) === key);
      setRawLines((prev) => prev.filter((l) => lineKey(l) !== key));
      return removed;
    },
    [rawLines]
  );

  const restoreItem = useCallback((line: CartLine) => {
    setRawLines((prev) => prev.some((l) => lineKey(l) === lineKey(line)) ? prev : [...prev, line]);
  }, []);

  const applyPromo = useCallback(
    (code: string) => {
      const result = validatePromo(code, subtotal);
      if (!result.ok) return { ok: false, message: result.reason };
      setPromoCode(result.promo.code);
      return { ok: true, message: `${result.promo.code} applied — ${result.promo.description}.` };
    },
    [subtotal]
  );

  const acknowledgeChanges = useCallback(() => {
    setRawLines((prev) =>
    prev.
    map((l) => {
      const product = getProductById(l.productId);
      const variant = product ? getVariant(product, l.variantId) : undefined;
      if (!variant || variant.stock <= 0) return null;
      return { ...l, priceSnapshot: variant.price, quantity: Math.min(l.quantity, variant.stock, MAX_QTY_PER_LINE) };
    }).
    filter((l): l is CartLine => l !== null)
    );
  }, []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      promoCode,
      discount,
      promoError,
      hasIssues: lines.some((l) => l.issue),
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      restoreItem,
      applyPromo,
      removePromo: () => setPromoCode(null),
      acknowledgeChanges,
      clearCart: () => {
        setRawLines([]);
        setPromoCode(null);
      }
    }),
    [lines, itemCount, subtotal, promoCode, discount, promoError, drawerOpen, addItem, updateQuantity, removeItem, restoreItem, applyPromo, acknowledgeChanges]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}