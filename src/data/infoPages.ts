import type { InfoPage } from '../types/content';

export const infoPages: InfoPage[] = [
{
  slug: 'delivery-information', title: 'Delivery information', updatedAt: '2026-09-01',
  intro: 'We deliver to all 25 districts in Sri Lanka. Delivery charges and estimates are shown at checkout before you place your order.',
  sections: [
  { heading: 'Delivery options', list: ['Standard delivery — Rs 450, estimated 3–5 working days. Free on orders over Rs 10,000.', 'Express delivery — Rs 850, estimated 1–2 working days. Available in Colombo, Gampaha and Kalutara districts.'] },
  { heading: 'Processing times', paragraphs: ['Orders placed before 2.00pm on working days are usually processed the same day. Bank transfer orders are dispatched once payment is confirmed.', 'Delivery estimates are not guaranteed and may be affected by weather, public holidays or courier delays.'] },
  { heading: 'Tracking your order', paragraphs: ['Once dispatched, tracking details appear in your account under My Orders, or you can use Track Order with your order reference and email.'] }]

},
{
  slug: 'returns-refunds', title: 'Returns & refunds', updatedAt: '2026-09-01',
  intro: 'For hygiene reasons, beauty products can only be returned if they are unopened and in their original condition.',
  sections: [
  { heading: 'Eligible returns', list: ['Unopened, unused products in original packaging and seals, within 7 days of delivery.', 'Items that arrived damaged, defective or incorrect — please contact us within 48 hours with photos.'] },
  { heading: 'How to start a return', paragraphs: ['Contact our customer care team with your order reference. We’ll confirm eligibility and arrange collection or drop-off.'] },
  { heading: 'Refunds', paragraphs: ['Approved refunds are made by bank transfer within 7–10 working days after we receive and inspect the item.'] }]

},
{
  slug: 'privacy-policy', title: 'Privacy policy', updatedAt: '2026-08-15',
  intro: 'This policy explains what personal information we collect and how we use it to process orders and support you.',
  sections: [
  { heading: 'What we collect', list: ['Contact details such as your name, email and mobile number.', 'Delivery addresses.', 'Order history and wishlist items if you have an account.', 'Marketing preferences, only if you opt in.'] },
  { heading: 'How we use it', paragraphs: ['We use your information to process and deliver orders, provide customer support and, where you have consented, to send updates about offers. We do not sell your personal information.'] },
  { heading: 'Payments', paragraphs: ['We do not store card details. Cash on delivery and bank transfer payments are reconciled by our team.'] },
  { heading: 'Your choices', paragraphs: ['You can update your profile or unsubscribe from marketing at any time from your account or by contacting us.'] }]

},
{
  slug: 'terms-conditions', title: 'Terms & conditions', updatedAt: '2026-08-15',
  intro: 'These terms apply to purchases made through this storefront.',
  sections: [
  { heading: 'Orders', paragraphs: ['Placing an order is an offer to purchase. We confirm acceptance when your order is confirmed. Prices and availability are checked again when you submit your order.'] },
  { heading: 'Pricing', paragraphs: ['All prices are in Sri Lankan Rupees (LKR). Promotions apply only within their valid dates and conditions.'] },
  { heading: 'Product information', paragraphs: ['Product descriptions are supplied by brands. Results vary between individuals and products are not intended to diagnose or treat medical conditions.'] }]

}];