import type { Product, Category, Brand } from './catalog';
import type { Order, SubmittedReview, Customer } from './commerce';

export type AdminRole =
  | 'super_admin'
  | 'store_manager'
  | 'product_manager'
  | 'order_manager'
  | 'content_manager'
  | 'marketing_manager';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  phone?: string;
  active: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantSku: string;
  variantLabel: string;
  type: 'stock_in' | 'stock_out' | 'adjustment' | 'order' | 'return';
  quantityDelta: number;
  quantityAfter: number;
  reason: string;
  reference?: string;
  createdBy: string;
  createdAt: string;
}

export interface CouponDiscount {
  id: string;
  code: string;
  title: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  timesUsed: number;
  active: boolean;
  applicableCategoryIds?: string[];
  applicableProductIds?: string[];
}

export interface HomepageSectionConfig {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
  enabled: boolean;
  order: number;
  productSelectionMode?: 'manual' | 'collection' | 'category' | 'auto';
  selectedProductIds?: string[];
  collectionSlug?: string;
  categorySlug?: string;
  ctaText?: string;
  ctaUrl?: string;
  bannerImage?: string;
}

export interface StoreSettings {
  general: {
    storeName: string;
    logoUrl?: string;
    contactEmail: string;
    supportPhone: string;
    whatsAppNumber: string;
    address: string;
    city: string;
    country: string;
    currency: string;
    currencySymbol: string;
  };
  payment: {
    codEnabled: boolean;
    bankTransferEnabled: boolean;
    cardGatewayEnabled: boolean;
    bankDetails: string;
    testMode: boolean;
  };
  shipping: {
    standardRate: number;
    expressRate: number;
    freeShippingThreshold: number;
    islandwideDelivery: boolean;
  };
  tax: {
    taxRatePercent: number;
    pricesIncludeTax: boolean;
  };
  notifications: {
    orderConfirmationEmail: boolean;
    lowStockAlerts: boolean;
    lowStockThreshold: number;
    adminNotificationEmail: string;
  };
  seo: {
    defaultTitle: string;
    metaDescription: string;
    keywords: string;
    ogImageUrl?: string;
  };
}

export interface AuditLogEntry {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  performedBy: string;
  userEmail: string;
  timestamp: string;
}
