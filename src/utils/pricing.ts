import type { DeliveryMethod, PromoCode } from '../types/commerce';
import { deliveryMethods, promoCodes } from '../data/site';
import { formatPrice } from './format';

export type PromoResult = {ok: true;promo: PromoCode;discount: number;} | {ok: false;reason: string;};

export function validatePromo(rawCode: string, subtotal: number, now = new Date()): PromoResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, reason: 'Enter a promo code.' };
  const promo = promoCodes.find((p) => p.code === code);
  if (!promo || !promo.active) return { ok: false, reason: 'This code isn’t valid. Check the spelling and try again.' };
  const today = now.toISOString().slice(0, 10);
  if (today < promo.startsAt) return { ok: false, reason: 'This code isn’t active yet.' };
  if (today > promo.endsAt) return { ok: false, reason: 'This code has expired.' };
  if (subtotal < promo.minSubtotal) {
    return { ok: false, reason: `Spend ${formatPrice(promo.minSubtotal)} or more to use this code (${formatPrice(promo.minSubtotal - subtotal)} to go).` };
  }
  return { ok: true, promo, discount: calcDiscount(promo, subtotal) };
}

export function calcDiscount(promo: PromoCode, subtotal: number): number {
  const raw = promo.kind === 'percent' ? subtotal * promo.value / 100 : promo.value;
  return Math.min(Math.round(raw), subtotal);
}

export function availableDeliveryMethods(district: string | undefined): DeliveryMethod[] {
  return deliveryMethods.filter((m) => !m.districts || (district ? m.districts.includes(district) : false));
}

export function deliveryFeeFor(method: DeliveryMethod, subtotalAfterDiscount: number): number {
  if (method.freeOver !== undefined && subtotalAfterDiscount >= method.freeOver) return 0;
  return method.fee;
}

export function freeDeliveryThreshold(): number | undefined {
  return deliveryMethods.find((m) => m.id === 'standard')?.freeOver;
}

export function createOrderReference(now = new Date()): string {
  const y = String(now.getFullYear()).slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `NB-${y}${m}${d}-${rand}`;
}