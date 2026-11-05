import type { Product, Category, Brand } from '../types/catalog';
import type { Order, SubmittedReview, Customer } from '../types/commerce';
import type { Article } from '../types/content';
import type {
  AdminUser,
  InventoryMovement,
  CouponDiscount,
  HomepageSectionConfig,
  StoreSettings,
  AuditLogEntry,
  AdminRole,
} from '../types/admin';

import { products as initialProducts } from '../data/products';
import { categories as initialCategories } from '../data/categories';
import { brands as initialBrands } from '../data/brands';
import { articles as initialArticles } from '../data/articles';
import { reviews as initialReviews } from '../data/reviews';
import { demoOrders, demoCustomer, demoAddresses } from '../data/demoAccount';
import { readStorage, writeStorage, createId } from '../utils/storage';

const KEY_PRODUCTS = 'admin:products';
const KEY_CATEGORIES = 'admin:categories';
const KEY_BRANDS = 'admin:brands';
const KEY_ORDERS = 'admin:orders';
const KEY_INVENTORY_LOGS = 'admin:inventory_logs';
const KEY_CUSTOMERS = 'admin:customers';
const KEY_REVIEWS = 'admin:reviews';
const KEY_COUPONS = 'admin:coupons';
const KEY_CMS_SECTIONS = 'admin:cms_sections';
const KEY_ARTICLES = 'admin:articles';
const KEY_STAFF = 'admin:staff';
const KEY_AUDIT_LOGS = 'admin:audit_logs';
const KEY_SETTINGS = 'admin:settings';

/* Default Initial Staff */
const defaultStaff: AdminUser[] = [
  {
    id: 'staff-01',
    name: 'Dilshan Perera',
    email: 'admin@nelum.lk',
    role: 'super_admin',
    phone: '+94 77 123 4567',
    active: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'staff-02',
    name: 'Kavindi Fernando',
    email: 'kavindi@nelum.lk',
    role: 'store_manager',
    phone: '+94 71 987 6543',
    active: true,
    lastLogin: '2026-11-04T10:15:00.000Z',
    createdAt: '2026-02-15T00:00:00.000Z',
  },
  {
    id: 'staff-03',
    name: 'Sahan Wickramasinghe',
    email: 'sahan@nelum.lk',
    role: 'product_manager',
    phone: '+94 75 456 7890',
    active: true,
    lastLogin: '2026-11-05T08:30:00.000Z',
    createdAt: '2026-03-01T00:00:00.000Z',
  },
  {
    id: 'staff-04',
    name: 'Anuki Jayawardena',
    email: 'anuki@nelum.lk',
    role: 'content_manager',
    phone: '+94 72 334 5566',
    active: true,
    lastLogin: '2026-11-05T14:20:00.000Z',
    createdAt: '2026-04-10T00:00:00.000Z',
  },
];

/* Default Initial Coupons */
const defaultCoupons: CouponDiscount[] = [
  {
    id: 'c-welcome10',
    code: 'WELCOME10',
    title: 'Welcome First Order Discount',
    description: '10% off for new shoppers with minimum Rs. 3,500 spend',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 3500,
    maxDiscount: 1500,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    usageLimit: 500,
    timesUsed: 142,
    active: true,
  },
  {
    id: 'c-summerglow',
    code: 'GLOW500',
    title: 'Daily Glow Flat Off',
    description: 'Rs. 500 off on skincare orders over Rs. 5,000',
    discountType: 'fixed',
    discountValue: 500,
    minSpend: 5000,
    startDate: '2026-06-01',
    endDate: '2026-11-30',
    usageLimit: 200,
    timesUsed: 89,
    active: true,
  },
  {
    id: 'c-freeship',
    code: 'CEYLONFREE',
    title: 'Free Islandwide Delivery Promotion',
    description: 'Free shipping on gift packages and sets',
    discountType: 'fixed',
    discountValue: 400,
    minSpend: 4000,
    startDate: '2026-10-01',
    endDate: '2026-11-20',
    usageLimit: 300,
    timesUsed: 215,
    active: true,
  },
];

/* Default Homepage CMS Section Configs */
const defaultCmsSections: HomepageSectionConfig[] = [
  {
    id: 'sec-hero',
    key: 'hero',
    title: 'Hero Campaign Carousel',
    subtitle: 'Main promotional campaign banners and slider',
    enabled: true,
    order: 1,
  },
  {
    id: 'sec-trust',
    key: 'trust',
    title: 'Shopping Benefits & Trust Strip',
    subtitle: 'Islandwide delivery, dermatologist tested, authentic guarantee',
    enabled: true,
    order: 2,
  },
  {
    id: 'sec-categories',
    key: 'categories',
    title: 'Shop by Category',
    subtitle: 'Cleansers, Moisturisers, Sun Care, Serums, Lipsticks & Fragrances',
    enabled: true,
    order: 3,
  },
  {
    id: 'sec-bestsellers',
    key: 'bestsellers',
    title: 'Best Sellers',
    eyebrow: 'Customer Favourites',
    subtitle: 'Discover the products our customers love most across the island',
    enabled: true,
    order: 4,
    collectionSlug: 'best-sellers',
    productSelectionMode: 'collection',
  },
  {
    id: 'sec-campaigns',
    key: 'campaigns',
    title: 'Promotional Banners',
    subtitle: 'Seasonal offers, barrier health guides & botanical spotlights',
    enabled: true,
    order: 5,
  },
  {
    id: 'sec-newarrivals',
    key: 'newarrivals',
    title: 'New Arrivals',
    eyebrow: 'Just Arrived',
    subtitle: 'The latest additions to our botanical and luxury beauty shelves',
    enabled: true,
    order: 6,
    collectionSlug: 'new-arrivals',
    productSelectionMode: 'collection',
  },
  {
    id: 'sec-brands',
    key: 'brands',
    title: 'Shop by Brand',
    subtitle: 'Authorized global and Ceylon partners with official warranty',
    enabled: true,
    order: 7,
  },
  {
    id: 'sec-skintype',
    key: 'skintype',
    title: 'Shop by Skin Type',
    subtitle: 'Formulations for Dry, Oily, Combination, Normal & Sensitive skin',
    enabled: true,
    order: 8,
  },
  {
    id: 'sec-trending',
    key: 'trending',
    title: 'Trending Now',
    eyebrow: 'Popular Picks',
    subtitle: "The beauty and skincare formulations everyone's talking about",
    enabled: true,
    order: 9,
    collectionSlug: 'trending',
    productSelectionMode: 'collection',
  },
  {
    id: 'sec-skinconcern',
    key: 'skinconcern',
    title: 'Shop by Skin Concern',
    subtitle: 'Targeted solutions for Acne, Redness, Hyperpigmentation, Pores & Barrier',
    enabled: true,
    order: 10,
  },
  {
    id: 'sec-offers',
    key: 'offers',
    title: 'Special Offers',
    eyebrow: 'Limited Time',
    subtitle: 'Seasonal savings, curated value sets and complimentary gifts',
    enabled: true,
    order: 11,
    collectionSlug: 'offers',
    productSelectionMode: 'collection',
  },
  {
    id: 'sec-editorial',
    key: 'editorial',
    title: 'Beauty Journal & Routines',
    subtitle: 'Expert skincare advice, tropical barrier routines and ingredient guides',
    enabled: true,
    order: 12,
  },
  {
    id: 'sec-instagram',
    key: 'instagram',
    title: 'Instagram Social Media Showcase',
    subtitle: 'Community beauty rituals, reviews and visual inspirations',
    enabled: true,
    order: 13,
  },
  {
    id: 'sec-newsletter',
    key: 'newsletter',
    title: 'Newsletter Subscription',
    subtitle: 'Exclusive discounts, launches and personalized skin advice',
    enabled: true,
    order: 14,
  },
];

/* Default Settings */
const defaultSettings: StoreSettings = {
  general: {
    storeName: 'Nelum Beauty Sri Lanka',
    logoUrl: '/images/nelum-logo.svg',
    contactEmail: 'care@nelum.lk',
    supportPhone: '+94 11 234 5678',
    whatsAppNumber: '94771234567',
    address: '42 Galle Road, Kollupitiya',
    city: 'Colombo 03',
    country: 'Sri Lanka',
    currency: 'LKR',
    currencySymbol: 'Rs.',
  },
  payment: {
    codEnabled: true,
    bankTransferEnabled: true,
    cardGatewayEnabled: false,
    bankDetails: 'Commercial Bank of Ceylon\nAccount Name: Nelum Beauty Pvt Ltd\nAccount Number: 8009214451\nBranch: Kollupitiya',
    testMode: true,
  },
  shipping: {
    standardRate: 350,
    expressRate: 650,
    freeShippingThreshold: 5000,
    islandwideDelivery: true,
  },
  tax: {
    taxRatePercent: 0,
    pricesIncludeTax: true,
  },
  notifications: {
    orderConfirmationEmail: true,
    lowStockAlerts: true,
    lowStockThreshold: 5,
    adminNotificationEmail: 'orders@nelum.lk',
  },
  seo: {
    defaultTitle: 'Nelum Beauty | Pure Botanical Science & Luxury Cosmetics',
    metaDescription: 'Shop dermatologist-tested skincare, makeup, and hair care crafted for tropical climates with fast islandwide delivery across Sri Lanka.',
    keywords: 'cosmetics, skincare, beauty, makeup, Sri Lanka, botanical, dermatologist tested',
  },
};

/* Unified In-Memory + Persistent Store */
class AdminStore {
  private products: Product[];
  private categories: Category[];
  private brands: Brand[];
  private orders: Order[];
  private inventoryLogs: InventoryMovement[];
  private customers: Customer[];
  private reviews: SubmittedReview[];
  private coupons: CouponDiscount[];
  private cmsSections: HomepageSectionConfig[];
  private articles: Article[];
  private staff: AdminUser[];
  private auditLogs: AuditLogEntry[];
  private settings: StoreSettings;

  constructor() {
    this.products = readStorage<Product[]>(KEY_PRODUCTS, initialProducts);
    this.categories = readStorage<Category[]>(KEY_CATEGORIES, initialCategories);
    this.brands = readStorage<Brand[]>(KEY_BRANDS, initialBrands);
    this.orders = readStorage<Order[]>(KEY_ORDERS, demoOrders);
    this.inventoryLogs = readStorage<InventoryMovement[]>(KEY_INVENTORY_LOGS, []);
    this.customers = readStorage<Customer[]>(KEY_CUSTOMERS, [
      {
        ...demoCustomer,
        addresses: demoAddresses,
      },
      {
        id: 'cust-02',
        firstName: 'Nadeesha',
        lastName: 'Perera',
        email: 'nadeesha.p@gmail.com',
        phone: '+94 77 234 5678',
        addresses: [
          {
            id: 'addr-02',
            label: 'Home',
            fullName: 'Nadeesha Perera',
            phone: '+94 77 234 5678',
            line1: '15/2 Flower Road',
            city: 'Colombo 07',
            district: 'Colombo',
            postalCode: '00700',
            isDefault: true,
          },
        ],
        createdAt: '2026-02-10T12:00:00.000Z',
        marketingOptIn: true,
      },
      {
        id: 'cust-03',
        firstName: 'Dilini',
        lastName: 'Kulasinghe',
        email: 'dilini.k@yahoo.com',
        phone: '+94 71 889 0012',
        addresses: [
          {
            id: 'addr-03',
            label: 'Residence',
            fullName: 'Dilini Kulasinghe',
            phone: '+94 71 889 0012',
            line1: '78 Peradeniya Road',
            city: 'Kandy',
            district: 'Kandy',
            postalCode: '20000',
            isDefault: true,
          },
        ],
        createdAt: '2026-03-24T09:30:00.000Z',
        marketingOptIn: true,
      },
    ]);
    
    // Adapt initial reviews into SubmittedReview format
    const convertedReviews: SubmittedReview[] = initialReviews.map((r) => ({
      id: r.id,
      productId: r.productId,
      customerId: 'cust-demo',
      author: r.author,
      rating: r.rating,
      title: r.title,
      body: r.body,
      createdAt: r.createdAt,
      verified: r.verified ?? false,
      status: 'approved',
    }));

    this.reviews = readStorage<SubmittedReview[]>(KEY_REVIEWS, convertedReviews);
    this.coupons = readStorage<CouponDiscount[]>(KEY_COUPONS, defaultCoupons);
    this.cmsSections = readStorage<HomepageSectionConfig[]>(KEY_CMS_SECTIONS, defaultCmsSections);
    this.articles = readStorage<Article[]>(KEY_ARTICLES, initialArticles);
    this.staff = readStorage<AdminUser[]>(KEY_STAFF, defaultStaff);
    this.auditLogs = readStorage<AuditLogEntry[]>(KEY_AUDIT_LOGS, [
      {
        id: 'audit-01',
        action: 'INITIALIZE',
        entity: 'System',
        entityId: 'admin-core',
        details: 'Admin panel database store initialized with Nelum Beauty catalog',
        performedBy: 'System',
        userEmail: 'admin@nelum.lk',
        timestamp: new Date().toISOString(),
      },
    ]);
    this.settings = readStorage<StoreSettings>(KEY_SETTINGS, defaultSettings);

    // Initial stock-in logs if empty
    if (this.inventoryLogs.length === 0) {
      this.inventoryLogs = this.products.slice(0, 8).map((p, idx) => ({
        id: `inv-${idx + 1}`,
        productId: p.id,
        productName: p.name,
        variantId: p.variants[0]?.id || 'v1',
        variantSku: p.variants[0]?.sku || 'SKU',
        variantLabel: p.variants[0]?.label || 'Standard',
        type: 'stock_in',
        quantityDelta: p.variants[0]?.stock || 20,
        quantityAfter: p.variants[0]?.stock || 20,
        reason: 'Initial warehouse intake',
        createdBy: 'Dilshan Perera',
        createdAt: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
      }));
      writeStorage(KEY_INVENTORY_LOGS, this.inventoryLogs);
    }
  }

  private notify(entity: string) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nelum:admin-updated', { detail: { entity } }));
    }
  }

  public logAudit(action: string, entity: string, entityId: string, details: string, user?: { name: string; email: string }) {
    const entry: AuditLogEntry = {
      id: createId('log'),
      action,
      entity,
      entityId,
      details,
      performedBy: user?.name || 'Administrator',
      userEmail: user?.email || 'admin@nelum.lk',
      timestamp: new Date().toISOString(),
    };
    this.auditLogs = [entry, ...this.auditLogs].slice(0, 200); // keep last 200 logs
    writeStorage(KEY_AUDIT_LOGS, this.auditLogs);
    this.notify('audit_logs');
  }

  /* ─── PRODUCTS ──────────────────────────────────────────────────────────── */
  public getProducts(): Product[] {
    return [...this.products];
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public createProduct(data: Omit<Product, 'id' | 'createdAt'>, user?: { name: string; email: string }): Product {
    const newProduct: Product = {
      ...data,
      id: createId('p'),
      createdAt: new Date().toISOString(),
    };
    this.products = [newProduct, ...this.products];
    writeStorage(KEY_PRODUCTS, this.products);
    this.logAudit('CREATE_PRODUCT', 'Product', newProduct.id, `Created product "${newProduct.name}" (${newProduct.variants[0]?.sku || 'SKU'})`, user);
    this.notify('products');
    return newProduct;
  }

  public updateProduct(id: string, patch: Partial<Product>, user?: { name: string; email: string }): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Product not found with id ${id}`);
    
    const updated = { ...this.products[index], ...patch };
    this.products[index] = updated;
    writeStorage(KEY_PRODUCTS, this.products);
    this.logAudit('UPDATE_PRODUCT', 'Product', id, `Updated product details for "${updated.name}"`, user);
    this.notify('products');
    return updated;
  }

  public deleteProduct(id: string, user?: { name: string; email: string }): boolean {
    const prod = this.products.find((p) => p.id === id);
    if (!prod) return false;
    this.products = this.products.filter((p) => p.id !== id);
    writeStorage(KEY_PRODUCTS, this.products);
    this.logAudit('DELETE_PRODUCT', 'Product', id, `Deleted product "${prod.name}"`, user);
    this.notify('products');
    return true;
  }

  public bulkUpdateProducts(ids: string[], patch: Partial<Product>, user?: { name: string; email: string }): void {
    const idSet = new Set(ids);
    this.products = this.products.map((p) => (idSet.has(p.id) ? { ...p, ...patch } : p));
    writeStorage(KEY_PRODUCTS, this.products);
    this.logAudit('BULK_UPDATE_PRODUCTS', 'Product', ids.join(', '), `Bulk updated ${ids.length} products`, user);
    this.notify('products');
  }

  /* ─── CATEGORIES ────────────────────────────────────────────────────────── */
  public getCategories(): Category[] {
    return [...this.categories].sort((a, b) => a.order - b.order);
  }

  public createCategory(data: Omit<Category, 'id'>, user?: { name: string; email: string }): Category {
    const newCategory: Category = {
      ...data,
      id: createId('cat'),
    };
    this.categories = [...this.categories, newCategory];
    writeStorage(KEY_CATEGORIES, this.categories);
    this.logAudit('CREATE_CATEGORY', 'Category', newCategory.id, `Created category "${newCategory.name}"`, user);
    this.notify('categories');
    return newCategory;
  }

  public updateCategory(id: string, patch: Partial<Category>, user?: { name: string; email: string }): Category {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Category not found with id ${id}`);
    const updated = { ...this.categories[index], ...patch };
    this.categories[index] = updated;
    writeStorage(KEY_CATEGORIES, this.categories);
    this.logAudit('UPDATE_CATEGORY', 'Category', id, `Updated category "${updated.name}"`, user);
    this.notify('categories');
    return updated;
  }

  public deleteCategory(id: string, reassignToId?: string, user?: { name: string; email: string }): boolean {
    const cat = this.categories.find((c) => c.id === id);
    if (!cat) return false;

    // If reassignToId is provided, reassign products
    if (reassignToId) {
      this.products = this.products.map((p) => {
        if (p.categoryIds.includes(id)) {
          const newCategoryIds = p.categoryIds.filter((cid) => cid !== id);
          if (!newCategoryIds.includes(reassignToId)) newCategoryIds.push(reassignToId);
          return { ...p, categoryIds: newCategoryIds };
        }
        return p;
      });
      writeStorage(KEY_PRODUCTS, this.products);
    }

    this.categories = this.categories.filter((c) => c.id !== id);
    writeStorage(KEY_CATEGORIES, this.categories);
    this.logAudit('DELETE_CATEGORY', 'Category', id, `Deleted category "${cat.name}" (reassigned to: ${reassignToId || 'none'})`, user);
    this.notify('categories');
    return true;
  }

  /* ─── BRANDS ────────────────────────────────────────────────────────────── */
  public getBrands(): Brand[] {
    return [...this.brands].sort((a, b) => a.name.localeCompare(b.name));
  }

  public createBrand(data: Omit<Brand, 'id'>, user?: { name: string; email: string }): Brand {
    const newBrand: Brand = {
      ...data,
      id: createId('b'),
    };
    this.brands = [...this.brands, newBrand];
    writeStorage(KEY_BRANDS, this.brands);
    this.logAudit('CREATE_BRAND', 'Brand', newBrand.id, `Created brand "${newBrand.name}" (${newBrand.origin})`, user);
    this.notify('brands');
    return newBrand;
  }

  public updateBrand(id: string, patch: Partial<Brand>, user?: { name: string; email: string }): Brand {
    const index = this.brands.findIndex((b) => b.id === id);
    if (index === -1) throw new Error(`Brand not found with id ${id}`);
    const updated = { ...this.brands[index], ...patch };
    this.brands[index] = updated;
    writeStorage(KEY_BRANDS, this.brands);
    this.logAudit('UPDATE_BRAND', 'Brand', id, `Updated brand "${updated.name}"`, user);
    this.notify('brands');
    return updated;
  }

  public deleteBrand(id: string, user?: { name: string; email: string }): boolean {
    const brand = this.brands.find((b) => b.id === id);
    if (!brand) return false;
    this.brands = this.brands.filter((b) => b.id !== id);
    writeStorage(KEY_BRANDS, this.brands);
    this.logAudit('DELETE_BRAND', 'Brand', id, `Deleted brand "${brand.name}"`, user);
    this.notify('brands');
    return true;
  }

  /* ─── INVENTORY & STOCK MOVEMENTS ───────────────────────────────────────── */
  public getInventoryLogs(): InventoryMovement[] {
    return [...this.inventoryLogs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public adjustStock(
    productId: string,
    variantId: string,
    quantityDelta: number,
    type: InventoryMovement['type'],
    reason: string,
    user?: { name: string; email: string }
  ): { product: Product; movement: InventoryMovement } {
    const product = this.products.find((p) => p.id === productId);
    if (!product) throw new Error('Product not found');

    const variantIndex = product.variants.findIndex((v) => v.id === variantId);
    if (variantIndex === -1) throw new Error('Variant not found');

    const variant = product.variants[variantIndex];
    const newStock = Math.max(0, variant.stock + quantityDelta);

    product.variants[variantIndex] = { ...variant, stock: newStock };
    writeStorage(KEY_PRODUCTS, this.products);

    const movement: InventoryMovement = {
      id: createId('inv'),
      productId,
      productName: product.name,
      variantId,
      variantSku: variant.sku,
      variantLabel: variant.label,
      type,
      quantityDelta,
      quantityAfter: newStock,
      reason,
      createdBy: user?.name || 'Administrator',
      createdAt: new Date().toISOString(),
    };

    this.inventoryLogs = [movement, ...this.inventoryLogs];
    writeStorage(KEY_INVENTORY_LOGS, this.inventoryLogs);

    this.logAudit(
      'STOCK_ADJUSTMENT',
      'Inventory',
      `${productId}:${variantId}`,
      `${type === 'stock_in' ? 'Stock In +' : type === 'stock_out' ? 'Stock Out -' : 'Adjustment '}${Math.abs(quantityDelta)} units for ${product.name} (${variant.label}). Reason: ${reason}`,
      user
    );
    this.notify('inventory');
    return { product, movement };
  }

  /* ─── ORDERS ────────────────────────────────────────────────────────────── */
  public getOrders(): Order[] {
    return [...this.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public getOrderByReference(reference: string): Order | undefined {
    return this.orders.find((o) => o.reference === reference);
  }

  public updateOrderStatus(
    reference: string,
    status: Order['status'],
    notes?: string,
    user?: { name: string; email: string }
  ): Order {
    const index = this.orders.findIndex((o) => o.reference === reference);
    if (index === -1) throw new Error(`Order not found: ${reference}`);

    const existing = this.orders[index];
    const updated: Order = {
      ...existing,
      status,
      notes: notes ? (existing.notes ? `${existing.notes}\n[${new Date().toLocaleDateString()}] ${notes}` : notes) : existing.notes,
    };

    this.orders[index] = updated;
    writeStorage(KEY_ORDERS, this.orders);
    this.logAudit('UPDATE_ORDER_STATUS', 'Order', reference, `Status changed from "${existing.status}" to "${status}"`, user);
    this.notify('orders');
    return updated;
  }

  /* ─── CUSTOMERS ─────────────────────────────────────────────────────────── */
  public getCustomers(): Customer[] {
    return [...this.customers];
  }

  public getCustomerById(id: string): Customer | undefined {
    return this.customers.find((c) => c.id === id);
  }

  /* ─── REVIEWS ───────────────────────────────────────────────────────────── */
  public getReviews(): SubmittedReview[] {
    return [...this.reviews].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  public updateReviewStatus(id: string, status: SubmittedReview['status'], user?: { name: string; email: string }): SubmittedReview {
    const index = this.reviews.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Review not found: ${id}`);
    const updated = { ...this.reviews[index], status };
    this.reviews[index] = updated;
    writeStorage(KEY_REVIEWS, this.reviews);
    this.logAudit('UPDATE_REVIEW_STATUS', 'Review', id, `Review status updated to "${status}"`, user);
    this.notify('reviews');
    return updated;
  }

  public deleteReview(id: string, user?: { name: string; email: string }): boolean {
    const rev = this.reviews.find((r) => r.id === id);
    if (!rev) return false;
    this.reviews = this.reviews.filter((r) => r.id !== id);
    writeStorage(KEY_REVIEWS, this.reviews);
    this.logAudit('DELETE_REVIEW', 'Review', id, `Deleted review by ${rev.author}`, user);
    this.notify('reviews');
    return true;
  }

  /* ─── COUPONS & PROMOTIONS ──────────────────────────────────────────────── */
  public getCoupons(): CouponDiscount[] {
    return [...this.coupons];
  }

  public createCoupon(data: Omit<CouponDiscount, 'id' | 'timesUsed'>, user?: { name: string; email: string }): CouponDiscount {
    const newCoupon: CouponDiscount = {
      ...data,
      id: createId('cpn'),
      code: data.code.toUpperCase().trim(),
      timesUsed: 0,
    };
    this.coupons = [newCoupon, ...this.coupons];
    writeStorage(KEY_COUPONS, this.coupons);
    this.logAudit('CREATE_COUPON', 'Promotions', newCoupon.id, `Created promo coupon "${newCoupon.code}"`, user);
    this.notify('coupons');
    return newCoupon;
  }

  public updateCoupon(id: string, patch: Partial<CouponDiscount>, user?: { name: string; email: string }): CouponDiscount {
    const index = this.coupons.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Coupon not found: ${id}`);
    const updated = { ...this.coupons[index], ...patch };
    if (patch.code) updated.code = patch.code.toUpperCase().trim();
    this.coupons[index] = updated;
    writeStorage(KEY_COUPONS, this.coupons);
    this.logAudit('UPDATE_COUPON', 'Promotions', id, `Updated promo coupon "${updated.code}"`, user);
    this.notify('coupons');
    return updated;
  }

  public deleteCoupon(id: string, user?: { name: string; email: string }): boolean {
    const cpn = this.coupons.find((c) => c.id === id);
    if (!cpn) return false;
    this.coupons = this.coupons.filter((c) => c.id !== id);
    writeStorage(KEY_COUPONS, this.coupons);
    this.logAudit('DELETE_COUPON', 'Promotions', id, `Deleted coupon "${cpn.code}"`, user);
    this.notify('coupons');
    return true;
  }

  /* ─── HOMEPAGE CMS SECTIONS ─────────────────────────────────────────────── */
  public getCmsSections(): HomepageSectionConfig[] {
    return [...this.cmsSections].sort((a, b) => a.order - b.order);
  }

  public updateCmsSection(id: string, patch: Partial<HomepageSectionConfig>, user?: { name: string; email: string }): HomepageSectionConfig {
    const index = this.cmsSections.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Section not found: ${id}`);
    const updated = { ...this.cmsSections[index], ...patch };
    this.cmsSections[index] = updated;
    writeStorage(KEY_CMS_SECTIONS, this.cmsSections);
    this.logAudit('UPDATE_CMS_SECTION', 'CMS', id, `Updated homepage section "${updated.title}"`, user);
    this.notify('cms_sections');
    return updated;
  }

  public reorderCmsSections(orderedIds: string[], user?: { name: string; email: string }): void {
    const idMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
    this.cmsSections = this.cmsSections.map((sec) => ({
      ...sec,
      order: idMap.get(sec.id) ?? sec.order,
    }));
    writeStorage(KEY_CMS_SECTIONS, this.cmsSections);
    this.logAudit('REORDER_CMS_SECTIONS', 'CMS', 'homepage', 'Reordered homepage sections sequence', user);
    this.notify('cms_sections');
  }

  /* ─── ARTICLES / JOURNAL ────────────────────────────────────────────────── */
  public getArticles(): Article[] {
    return [...this.articles];
  }

  public createArticle(article: Article, user?: { name: string; email: string }): Article {
    this.articles = [article, ...this.articles];
    writeStorage(KEY_ARTICLES, this.articles);
    this.logAudit('CREATE_ARTICLE', 'Journal', article.slug, `Created article "${article.title}"`, user);
    this.notify('articles');
    return article;
  }

  public updateArticle(slug: string, patch: Partial<Article>, user?: { name: string; email: string }): Article {
    const index = this.articles.findIndex((a) => a.slug === slug);
    if (index === -1) throw new Error(`Article not found: ${slug}`);
    const updated = { ...this.articles[index], ...patch };
    this.articles[index] = updated;
    writeStorage(KEY_ARTICLES, this.articles);
    this.logAudit('UPDATE_ARTICLE', 'Journal', slug, `Updated article "${updated.title}"`, user);
    this.notify('articles');
    return updated;
  }

  public deleteArticle(slug: string, user?: { name: string; email: string }): boolean {
    const article = this.articles.find((a) => a.slug === slug);
    if (!article) return false;
    this.articles = this.articles.filter((a) => a.slug !== slug);
    writeStorage(KEY_ARTICLES, this.articles);
    this.logAudit('DELETE_ARTICLE', 'Journal', slug, `Deleted article "${article.title}"`, user);
    this.notify('articles');
    return true;
  }

  /* ─── STAFF & PERMISSIONS ───────────────────────────────────────────────── */
  public getStaff(): AdminUser[] {
    return [...this.staff];
  }

  public createStaff(data: Omit<AdminUser, 'id' | 'createdAt'>, user?: { name: string; email: string }): AdminUser {
    const newStaff: AdminUser = {
      ...data,
      id: createId('staff'),
      createdAt: new Date().toISOString(),
    };
    this.staff = [...this.staff, newStaff];
    writeStorage(KEY_STAFF, this.staff);
    this.logAudit('CREATE_STAFF', 'Staff', newStaff.id, `Created staff member ${newStaff.name} (${newStaff.role})`, user);
    this.notify('staff');
    return newStaff;
  }

  public updateStaff(id: string, patch: Partial<AdminUser>, user?: { name: string; email: string }): AdminUser {
    const index = this.staff.findIndex((s) => s.id === id);
    if (index === -1) throw new Error(`Staff member not found: ${id}`);
    const updated = { ...this.staff[index], ...patch };
    this.staff[index] = updated;
    writeStorage(KEY_STAFF, this.staff);
    this.logAudit('UPDATE_STAFF', 'Staff', id, `Updated staff profile for ${updated.name}`, user);
    this.notify('staff');
    return updated;
  }

  public deleteStaff(id: string, user?: { name: string; email: string }): boolean {
    const s = this.staff.find((st) => st.id === id);
    if (!s) return false;
    this.staff = this.staff.filter((st) => st.id !== id);
    writeStorage(KEY_STAFF, this.staff);
    this.logAudit('DELETE_STAFF', 'Staff', id, `Removed staff member ${s.name}`, user);
    this.notify('staff');
    return true;
  }

  public getAuditLogs(): AuditLogEntry[] {
    return [...this.auditLogs];
  }

  /* ─── SETTINGS ──────────────────────────────────────────────────────────── */
  public getSettings(): StoreSettings {
    return { ...this.settings };
  }

  public updateSettings<K extends keyof StoreSettings>(section: K, patch: Partial<StoreSettings[K]>, user?: { name: string; email: string }): StoreSettings {
    this.settings = {
      ...this.settings,
      [section]: {
        ...this.settings[section],
        ...patch,
      },
    };
    writeStorage(KEY_SETTINGS, this.settings);
    this.logAudit('UPDATE_SETTINGS', 'Settings', String(section), `Updated store settings in category "${String(section)}"`, user);
    this.notify('settings');
    return this.settings;
  }
}

export const adminStore = new AdminStore();
