import type { Address, Order } from '../types/commerce';
import { img } from './images';

/** Demo credentials for exploring the account area. */
export const demoCredentials = { email: 'demo@nelumbeauty.lk', password: 'Demo1234' };

export const demoCustomer = {
  id: 'cust_demo',
  firstName: 'Nadeesha',
  lastName: 'Perera',
  email: demoCredentials.email,
  phone: '0771234567',
  marketingOptIn: false,
  createdAt: '2026-03-02T10:00:00.000Z'
};

export const demoAddresses: Address[] = [
{ id: 'addr_home', label: 'Home', fullName: 'Nadeesha Perera', phone: '0771234567', line1: '18/2 Temple Road', line2: 'Nugegoda', city: 'Nugegoda', district: 'Colombo', postalCode: '10250', isDefault: true },
{ id: 'addr_work', label: 'Work', fullName: 'Nadeesha Perera', phone: '0771234567', line1: 'Level 5, Trace Tower', line2: 'Maradana', city: 'Colombo 10', district: 'Colombo', postalCode: '01000', instructions: 'Leave with reception' }];


export const demoOrders: Order[] = [
{
  reference: 'NB-260918-4821', customerId: 'cust_demo', createdAt: '2026-09-18T09:12:00.000Z',
  contact: { firstName: 'Nadeesha', lastName: 'Perera', email: demoCredentials.email, phone: '0771234567' },
  address: { fullName: 'Nadeesha Perera', phone: '0771234567', line1: '18/2 Temple Road', line2: 'Nugegoda', city: 'Nugegoda', district: 'Colombo', postalCode: '10250' },
  items: [
  { productId: 'p05', variantId: 'p05-50', name: 'Ceramide Barrier Moisturiser', brandName: 'Sera Lab', variantLabel: '50 ml', image: img.creamJar, unitPrice: 5600, quantity: 1 },
  { productId: 'p07', variantId: 'p07-50', name: 'Daily Mineral Sunscreen SPF 50', brandName: 'Lumen Botanics', variantLabel: '50 ml', image: img.sunscreen, unitPrice: 4200, quantity: 1 }],

  deliveryMethod: { id: 'standard', name: 'Standard delivery', description: 'Estimated 3–5 working days' },
  paymentMethod: { id: 'cod', name: 'Cash on delivery' }, paymentStatus: 'paid', status: 'delivered',
  statusHistory: [
  { status: 'placed', at: '2026-09-18T09:12:00.000Z' }, { status: 'confirmed', at: '2026-09-18T11:40:00.000Z' },
  { status: 'processing', at: '2026-09-19T08:00:00.000Z' }, { status: 'shipped', at: '2026-09-19T15:30:00.000Z' },
  { status: 'delivered', at: '2026-09-22T13:05:00.000Z' }],

  subtotal: 9800, discount: 0, deliveryFee: 450, total: 10250, tracking: { courier: 'Island Express Couriers', number: 'IEC88214093' }
},
{
  reference: 'NB-261102-7390', customerId: 'cust_demo', createdAt: '2026-11-02T16:45:00.000Z',
  contact: { firstName: 'Nadeesha', lastName: 'Perera', email: demoCredentials.email, phone: '0771234567' },
  address: { fullName: 'Nadeesha Perera', phone: '0771234567', line1: 'Level 5, Trace Tower', line2: 'Maradana', city: 'Colombo 10', district: 'Colombo', postalCode: '01000', instructions: 'Leave with reception' },
  items: [
  { productId: 'p20', variantId: 'p20-rose', name: 'Satin Matte Lipstick', brandName: 'Velvet Hue', variantLabel: 'Rose Nude', image: img.lipstick, unitPrice: 3200, quantity: 2 },
  { productId: 'p11', variantId: 'p11-30', name: 'Vitamin C 15% Brightening Serum', brandName: 'Sera Lab', variantLabel: '30 ml', image: img.serum, unitPrice: 7400, quantity: 1 }],

  deliveryMethod: { id: 'express', name: 'Express delivery', description: 'Estimated 1–2 working days' },
  paymentMethod: { id: 'bank', name: 'Bank transfer' }, paymentStatus: 'paid', status: 'shipped',
  statusHistory: [
  { status: 'placed', at: '2026-11-02T16:45:00.000Z' }, { status: 'confirmed', at: '2026-11-03T09:10:00.000Z' },
  { status: 'processing', at: '2026-11-03T10:30:00.000Z' }, { status: 'shipped', at: '2026-11-04T14:20:00.000Z' }],

  promoCode: 'GLOW10', subtotal: 13800, discount: 1380, deliveryFee: 850, total: 13270, tracking: { courier: 'Island Express Couriers', number: 'IEC88302177' }
}];