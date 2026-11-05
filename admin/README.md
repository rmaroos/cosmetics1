# Nelum Beauty — Administration Portal

Standalone administration application for Nelum Beauty online cosmetics and beauty products e-commerce platform.

## Vercel Deployment Instructions

To deploy this Admin Panel as a dedicated application (e.g. `admin.nelummbeauty.lk` or `nelum-admin.vercel.app`) on Vercel:

1. In the Vercel Dashboard, click **Add New...** > **Project**.
2. Select your repository: `cosmetics1`.
3. In **Project Settings**, configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `admin` *(Click Edit and choose `admin`)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**.

The `vercel.json` file inside this directory ensures all client-side routes (`/products`, `/orders`, `/dashboard`, etc.) automatically redirect to `index.html` without 404 errors.

---

## Local Development

From this `admin` directory:
```bash
npm install
npm run dev
```

Or from the workspace root:
```bash
npm run admin:dev
```

The portal runs on `http://localhost:5175`.

---

## Admin Modules Included

1. **Dashboard Overview**: Revenue, orders, average order value, conversion rate, quick metrics, pending actions, sales trends, top products, live activity feed.
2. **Products Catalogue**: Full CRUD, variants, prices, inventory status, SKU, stock count, search, filter, bulk status toggles.
3. **Categories Management**: Parent & subcategory tree, display order, active status, image URLs, product counts.
4. **Brands Management**: Brand logos, website links, descriptions, featured toggles.
5. **Inventory Control**: Stock level alerts (In Stock, Low Stock, Out of Stock), manual adjustments, restock logs with audit history.
6. **Order Management**: Order listing, status workflows (Placed, Confirmed, Shipped, Delivered, Cancelled), customer details, payment & shipping info, printable invoice generator.
7. **Customer Management**: Customer CRM, contact details, total orders, lifetime spend, order history, VIP status.
8. **Reviews & Ratings**: Customer reviews moderation (Approve, Reject, Pending), ratings, verification badges.
9. **Promotions & Discounts**: Coupon code generator (Percentage or Fixed discount, minimum order, expiry dates, active toggle).
10. **Website CMS Management**: Homepage banner configuration, announcement bar message, promotional hero editor, navigation builder.
11. **Blog & Journal Management**: Articles creation, publishing status, cover images, reading time, excerpt & body.
12. **Reports & Analytics**: Sales revenue charts, order volume, average order value, top performing categories, export reports to CSV/JSON.
13. **Staff & Permissions**: Multi-role access control (Super Admin, Store Manager, Product Manager, Order Manager, Content Manager, Marketing Manager), active status, audit log tracking.
14. **Store Settings**: Store profile, currency (LKR), shipping rules, WhatsApp business number, social links, tax configuration.

---

## Default Admin Credentials

- **Email**: `admin@nelum.lk`
- **Password**: `admin123`
