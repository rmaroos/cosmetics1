export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
  priceSnapshot: number;
};

export type PromoCode = {
  code: string;
  description: string;
  kind: 'percent' | 'fixed';
  value: number;
  minSubtotal: number;
  startsAt: string;
  endsAt: string;
  active: boolean;
};

export type DeliveryMethod = {
  id: string;
  name: string;
  description: string;
  fee: number;
  freeOver?: number;
  districts?: string[];
};

export type PaymentMethod = {
  id: 'cod' | 'bank';
  name: string;
  description: string;
  enabled: boolean;
};

export type Address = {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  district: string;
  postalCode?: string;
  instructions?: string;
  isDefault?: boolean;
};

export type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentStatus = 'pending' | 'awaiting_transfer' | 'paid';

export type OrderItem = {
  productId: string;
  variantId: string;
  name: string;
  brandName: string;
  variantLabel: string;
  image: string;
  unitPrice: number;
  quantity: number;
  lineTotal?: number;
};

export type Order = {
  reference: string;
  customerId: string | null;
  createdAt: string;
  contact: ContactDetails;
  address: Omit<Address, 'id' | 'label' | 'isDefault'>;
  shippingAddress?: Address | Omit<Address, 'id' | 'label' | 'isDefault'>;
  items: OrderItem[];
  deliveryMethod: {id: string;name: string;description: string;};
  paymentMethod: {id: PaymentMethod['id'];name: string;};
  paymentMethodId?: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  statusHistory: {status: OrderStatus;at: string;}[];
  promoCode?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  tracking?: {courier: string;number: string;};
  notes?: string;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash?: string;
  marketingOptIn: boolean;
  addresses: Address[];
  createdAt: string;
};

export type SubmittedReview = {
  id: string;
  productId: string;
  customerId: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  photos?: string[];
  createdAt: string;
  status: 'pending' | 'published' | 'approved' | 'rejected';
  verified: boolean;
};