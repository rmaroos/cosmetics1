import type { DeliveryMethod, PaymentMethod, PromoCode } from '../types/commerce';
import { img } from './images';

/** Provisional identity — store name and wordmark are not yet approved. */
export const siteConfig = {
  name: 'Nelum Beauty',
  tagline: 'Skincare, makeup and beauty essentials, delivered across Sri Lanka.',
  email: 'hello@nelumbeauty.lk',
  phone: '+94 11 234 5678',
  whatsapp: '+94 77 123 4567',
  hours: 'Mon–Sat, 9.00am – 6.00pm',
  address: '42 Ward Place, Colombo 07, Sri Lanka',
  social: [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'TikTok', href: 'https://tiktok.com' }]

};

export const announcement = {
  active: true,
  message: 'Free standard delivery on orders over Rs 10,000',
  linkLabel: 'Delivery details',
  href: '/delivery-information'
};

export const heroSlides = [
{
  id: 'hero-glow',
  eyebrow: 'THE DAILY GLOW EDIT',
  title: 'Beauty that feels as good as it looks.',
  description: 'Discover thoughtfully selected skincare, beauty essentials and everyday favourites for your glow.',
  image: img.hero,
  imageAlt: 'Woman with glowing skin holding a frosted serum bottle',
  primary: { label: 'Shop Best Sellers', href: '/collection/best-sellers' },
  secondary: { label: 'Explore Skincare', href: '/category/skincare' }
}];


export const campaigns = [
{ id: 'c1', title: 'Up to 20% off selected favourites', description: 'Limited-time prices on serums, palettes and fragrance.', image: img.campaignMakeup, cta: 'Shop offers', href: '/collection/offers', tone: 'soft' as const },
{ id: 'c2', title: 'Routines, made simple', description: 'Curated gift sets with everything you need to start.', image: img.campaignSkincare, cta: 'Explore gift sets', href: '/collection/gift-sets', tone: 'sage' as const }];


export const trustItems = [
{ id: 't1', icon: 'truck' as const, title: 'Islandwide delivery', text: 'Delivered to all 25 districts' },
{ id: 't2', icon: 'wallet' as const, title: 'Cash on delivery', text: 'Pay when your order arrives' },
{ id: 't3', icon: 'shield' as const, title: 'Sourced from brands', text: 'Purchased from brands and authorised distributors' },
{ id: 't4', icon: 'message' as const, title: 'Real help', text: 'Talk to our team on WhatsApp' }];


export const deliveryMethods: DeliveryMethod[] = [
{ id: 'standard', name: 'Standard delivery', description: 'Estimated 3–5 working days', fee: 450, freeOver: 10000 },
{ id: 'express', name: 'Express delivery', description: 'Estimated 1–2 working days', fee: 850, districts: ['Colombo', 'Gampaha', 'Kalutara'] }];


export const paymentMethods: PaymentMethod[] = [
{ id: 'cod', name: 'Cash on delivery', description: 'Pay in cash when your order is delivered.', enabled: true },
{ id: 'bank', name: 'Bank transfer', description: 'Transfer the total to our account. We dispatch once payment is confirmed.', enabled: true }];


export const bankDetails = {
  bank: 'Commercial Bank of Ceylon',
  accountName: 'Nelum Beauty (Pvt) Ltd',
  accountNumber: '1000 4567 8901',
  branch: 'Colombo 07'
};

export const promoCodes: PromoCode[] = [
{ code: 'GLOW10', description: '10% off orders over Rs 5,000', kind: 'percent', value: 10, minSubtotal: 5000, startsAt: '2026-01-01', endsAt: '2026-12-31', active: true },
{ code: 'WELCOME500', description: 'Rs 500 off orders over Rs 7,500', kind: 'fixed', value: 500, minSubtotal: 7500, startsAt: '2026-01-01', endsAt: '2027-06-30', active: true },
{ code: 'AVURUDU25', description: 'Avurudu offer — ended', kind: 'percent', value: 25, minSubtotal: 0, startsAt: '2026-04-01', endsAt: '2026-04-20', active: true }];


export const MAX_QTY_PER_LINE = 10;

export const districts = [
'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'];


export const popularSearches = ['Sunscreen', 'Vitamin C', 'Niacinamide', 'Lipstick', 'Moisturiser', 'Body lotion'];