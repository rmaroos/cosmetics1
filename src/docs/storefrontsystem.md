# STOREFRONT SYSTEM SPECIFICATION

**Project:** Multi-Brand Beauty & Cosmetics E-Commerce Storefront  
**Document:** Complete Storefront System Definition (`storefrontsystem.md`)  
**Version:** 1.0  
**Status:** Consolidated baseline — pending stakeholder review and sign-off  
**Market:** Sri Lanka  
**Currency:** LKR (Sri Lankan Rupee)  
**Initial language:** English  
**Application boundary:** Customer-facing Storefront only  
**Related specifications:** Storefront PRD v1.0, Storefront FRD v1.0, Storefront Sitemap & User Flows v1.0

> This file consolidates the storefront product requirements, functional requirements, sitemap, customer journeys, business rules, non-functional expectations, and implementation/acceptance guidance into one working system specification. It is intended as a shared reference for product, UX/UI, frontend, backend, QA, and project management teams. It does not define the separate Admin Panel UI or its staff workflows.

---

## 1. Document Purpose and How to Use It

This document defines what the customer-facing storefront must do, how customers move through it, which pages and features exist, and what conditions must be satisfied for the storefront to be accepted.

- Treat the requirements and boundaries below as the current baseline, not as proof of stakeholder sign-off.
- Use the **Product Requirements** section for business intent and scope.
- Use the **Functional Requirements** section for detailed feature behaviour and validation.
- Use the **Sitemap and User Journeys** section for information architecture and end-to-end customer journeys.
- Use the **Business Rules and Non-Functional Requirements** sections for shared constraints.
- Treat open decisions as items requiring confirmation before production implementation.
- Keep this storefront specification separate from the Admin Panel specification. The two applications may share backend services and data, but their interfaces and functional specifications remain separate.

## 2. Product and Business Context

The product is a premium multi-brand beauty and cosmetics online retail storefront serving customers in Sri Lanka. The business purchases and physically stocks products sourced from multiple brands and suppliers. It is the retailer and seller of record for the storefront experience; this is not an open marketplace where third-party sellers independently list and fulfil products.

### 2.1 Business model

- The business owns or controls the saleable stock presented to customers.
- Products are sourced from multiple brands and suppliers and sold through one branded retail storefront.
- The business is responsible for product information, pricing, inventory accuracy, order acceptance, fulfilment coordination, customer support, and applicable policies.
- Product authenticity, stock accuracy, batch/expiry awareness and reliable product information are important operational considerations.
- Supplier/brand relationships do not create separate seller accounts or seller storefronts in this customer-facing scope.

### 2.2 Target users

- Women and men shopping for beauty, skincare, cosmetics, haircare, body care and fragrance.
- First-time visitors discovering products through search, social media, campaigns or direct visits.
- Returning customers who want to log in, manage their account, reuse delivery addresses and review order history.
- Customers who know a product/brand and want to search directly.
- Customers who need to browse by skin type or skin concern.

### 2.3 Initial product categories

The initial proposed categories are:

- Skincare
- Face Creams & Serums
- Body Care
- Makeup
- Hair Care
- Fragrance
- Beauty Tools & Accessories

The final category and subcategory tree is configurable and must not be hardcoded into the storefront. The Admin Panel will manage taxonomy separately; the storefront renders published taxonomy data dynamically.

## 3. Product Vision, Goals and Success Measures

### 3.1 Vision

Deliver a premium, trustworthy and easy-to-use online beauty retail experience that helps customers discover authentic products, understand product suitability and complete purchases conveniently.

### 3.2 Business goals

1. Establish a premium digital storefront for a multi-brand beauty retailer.
2. Make product discovery straightforward through categories, brands, collections, search, skin types and skin concerns.
3. Present accurate product information, pricing and availability.
4. Support guest and registered-customer purchase journeys.
5. Build trust through clear policies, customer reviews and reliable order communication.
6. Provide a scalable frontend structure that can accommodate new brands, products, categories and content without redesigning the application.
7. Support future localisation and advanced personalisation without making them launch dependencies.

### 3.3 Suggested success indicators

- Product listing-to-product-detail click-through rate.
- Add-to-cart rate.
- Cart-to-checkout progression.
- Checkout completion rate.
- Search success / zero-result rate.
- Product page engagement.
- Repeat purchase rate.
- Wishlist usage.
- Review submission rate.
- Order-related support contact rate.
- Mobile usability and page performance.

Targets should be set by the business after baseline traffic and conversion data become available.

## 4. Scope and Release Boundaries

### 4.1 In scope — storefront MVP

- Responsive homepage and global navigation.
- Shop All and dynamically rendered category/subcategory pages.
- Brand directory and brand detail pages.
- Configured collections such as New Arrivals, Best Sellers, Trending and Offers.
- Search, product listings, filtering, sorting and product detail pages.
- Discovery by skin type and skin concern.
- Cart and quantity management.
- Guest checkout and registered-customer checkout.
- Customer registration, login and password recovery.
- Customer profile and saved addresses.
- Customer order history and order detail pages.
- Wishlist.
- Ratings and written reviews, with customer photo upload in the agreed scope.
- About, contact, FAQs, delivery, returns/refunds, privacy and terms pages.
- Beauty Journal / guides content structure.
- Loading, empty, validation, error, unavailable and success states.
- English-first content and Sri Lankan market conventions.

### 4.2 Future / not required for initial MVP

- Beauty quiz or personalised routine builder.
- Advanced AI or rules-based product recommendations.
- Additional storefront languages.
- Advanced customer segmentation and personalisation.
- Product comparison, unless separately approved.
- Advanced loyalty, rewards or membership features, unless separately approved.
- Native mobile application.

### 4.3 Out of scope for this document

- Admin Panel user interface and staff workflows.
- Supplier portal or marketplace seller portal.
- Warehouse management system.
- Accounting/ERP implementation.
- Detailed database schema and infrastructure architecture.
- Final payment gateway integration specification.
- Final courier integration specification.
- Legal advice or final policy wording.

### 4.4 Separate application architecture

The Storefront and Admin Panel are separate applications, for example:

- Storefront: `www.brand.lk`
- Admin Panel: `admin.brand.lk`

They may share backend APIs, authentication services, database and media storage in production. This document only defines the customer-facing Storefront. The Admin Panel requires its own PRD, FRD, sitemap, user flows and UI/UX specification.

## 5. Market, Locale and Commercial Context

- Primary market: Sri Lanka.
- Display currency: LKR.
- Initial interface language: English.
- Capture Sri Lankan contact and address details in a format suitable for local fulfilment.
- Delivery methods, serviceable areas, fees and delivery estimates must be configurable and confirmed by the business.
- Cash on Delivery and online payments are intended options subject to final business policy and provider configuration.
- PayHere is a possible payment gateway candidate, not a confirmed implementation decision.
- Do not display delivery promises, COD availability or payment options unless configured and valid for the customer's order/address.
- Taxes, invoice rules, consumer protection and privacy obligations must be reviewed by the business and relevant advisers before production launch.

## 6. Information Architecture and Sitemap

The following is the proposed storefront sitemap. Category examples are illustrative; published categories and subcategories must be dynamically loaded.

```text
STOREFRONT
├── Home
├── Shop
│   ├── Shop All
│   └── Dynamic Categories
│       ├── Skincare
│       │   ├── Cleansers
│       │   ├── Toners
│       │   ├── Moisturisers
│       │   ├── Sunscreens
│       │   ├── Exfoliators
│       │   └── Masks & Treatments
│       ├── Face Creams & Serums
│       │   ├── Day & Night Creams
│       │   ├── Brightening / Hydrating Creams
│       │   ├── Anti-Ageing Creams
│       │   ├── Face Serums
│       │   └── Eye Creams & Face Oils
│       ├── Body Care
│       ├── Makeup
│       ├── Hair Care
│       ├── Fragrance
│       └── Beauty Tools & Accessories
├── Brands
│   ├── All Brands
│   └── Brand Detail
├── Collections
│   ├── New Arrivals
│   ├── Best Sellers
│   ├── Trending
│   ├── Featured Products
│   ├── Offers
│   └── Gift Sets / Bundles
├── Beauty Discovery
│   ├── Shop by Skin Type
│   ├── Shop by Skin Concern
│   ├── Ingredients Guide
│   ├── Skincare Routine Guides
│   └── Beauty Journal
│       ├── Article Listing
│       └── Article Detail
├── Search Results
├── Product Detail
├── Wishlist
├── Shopping Cart
├── Checkout
│   ├── Customer Information
│   ├── Delivery Address
│   ├── Delivery Method
│   ├── Payment Method
│   ├── Order Review
│   └── Order Confirmation
├── Customer Account
│   ├── Register
│   ├── Login
│   ├── Forgot Password
│   ├── Account Dashboard
│   ├── Profile
│   ├── Saved Addresses
│   ├── My Orders
│   ├── Order Details / Tracking
│   ├── My Wishlist
│   └── My Reviews
└── Information & Support
    ├── About Us
    ├── Contact Us
    ├── FAQs
    ├── Delivery Information
    ├── Returns & Refunds
    ├── Privacy Policy
    └── Terms & Conditions
```

### 6.1 Page inventory and purpose

| Page/template | Purpose | Main actions |
|---|---|---|
| Home | Introduce retailer, campaigns, categories, brands, collections and featured products | Browse, search, open category/product |
| Shop All | Display all published purchasable products | Filter, sort, open PDP |
| Category listing | Display category description, child categories and matching products | Browse subcategories, filter, sort |
| Brand directory | Discover available brands | Search/browse brands |
| Brand detail | Present brand identity and related products | Browse brand products |
| Collection | Present curated product groups | Open products |
| Skin type results | Display products associated with a skin type | Refine and open PDP |
| Skin concern results | Display products associated with a concern | Refine and open PDP |
| Ingredients guide | Educate customers about ingredients | Read and navigate to related products |
| Routine guide | Present editorial routine guidance | Read and open related products |
| Journal listing | Display articles | Open article |
| Article detail | Present full editorial content | Follow internal/product links |
| Search results | Display matching products and/or brands | Refine query, open result |
| Product detail | Present complete product information and purchase controls | Select variant, quantity, add to cart, wishlist, review |
| Wishlist | Display saved products | Remove, view PDP, add to cart |
| Cart | Review selected items and totals | Update quantity, remove, checkout |
| Checkout | Capture customer, delivery and payment information | Submit order |
| Order confirmation | Confirm successful order submission | Review order reference/details |
| Authentication | Register, login and recover password | Authenticate/create account |
| Account dashboard | Provide access to account features | Profile, addresses, orders, wishlist, reviews |
| My Orders / detail | Display customer order history and details | Review order and available tracking |
| Information/support | Provide business and policy information | Contact, read policies and FAQs |

### 6.2 Navigation requirements

- Desktop navigation should provide clear access to Shop, Brands, Collections and Beauty Discovery.
- Shop navigation should support a mega-menu or equivalent category navigation.
- Mobile navigation should use a usable expandable menu or dedicated navigation screen.
- Global search, account, wishlist and cart must remain easy to access.
- The footer should contain company, contact, support and policy links.
- Breadcrumbs should communicate hierarchy on category, brand, collection and product pages.
- Product detail pages must be reachable from all relevant product discovery routes.
- Navigation should not expose unpublished or inactive catalogue content.

### 6.3 URL and SEO-friendly route guidance

Illustrative routes (final routes subject to technical and SEO review):

| Page | Example route |
|---|---|
| Home | `/` |
| Shop All | `/shop` |
| Category | `/category/{category-slug}` |
| Nested category | `/category/{parent-slug}/{child-slug}` |
| Brand directory | `/brands` |
| Brand detail | `/brand/{brand-slug}` |
| Collection | `/collection/{collection-slug}` |
| Skin type | `/skin-type/{skin-type-slug}` |
| Skin concern | `/skin-concern/{concern-slug}` |
| Search | `/search?q={search-term}` |
| Product | `/product/{product-slug}` |
| Wishlist | `/wishlist` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Account | `/account` |
| Journal article | `/journal/{article-slug}` |

Use readable slugs, avoid exposing internal IDs, and preserve redirects when published URLs change where technically supported.

## 7. Customer Types and Permissions

### 7.1 Guest visitor

Can:
- Browse all published public pages.
- Search, filter and sort products.
- View product, brand, category, collection and editorial details.
- Add available products to cart.
- Checkout as guest.
- Use wishlist as configured for guest sessions.

Cannot:
- Access authenticated account pages.
- View account-linked order history.
- Edit saved account profile or addresses.

### 7.2 Registered customer

Can:
- Perform all guest shopping actions.
- Register, log in and recover password.
- Manage profile details.
- Manage saved addresses.
- View account-linked order history and order details.
- Manage account wishlist.
- View submitted reviews and their status where supported.

### 7.3 Returning customer

Can sign in, revisit saved information, review previous orders, reuse eligible saved addresses and continue shopping.

Staff/admin roles are not defined in the Storefront. Staff workflows belong in the separate Admin Panel specification.

## 8. Functional Requirements

The detailed requirements below are organised by customer-facing feature. Requirement IDs should be retained in tickets and QA test cases.

### 8.1 Home and global layout

- **ST-HOME-001:** The storefront shall provide a responsive homepage.
- **ST-HOME-002:** The homepage shall support configurable hero/campaign content.
- **ST-HOME-003:** The homepage shall provide shortcuts to published product categories.
- **ST-HOME-004:** The homepage shall support featured products and configured collections.
- **ST-HOME-005:** The homepage shall support brand highlights and beauty discovery entry points.
- **ST-HOME-006:** Header and footer navigation shall be consistent across storefront pages.
- **ST-HOME-007:** All homepage content blocks shall handle missing or unpublished content gracefully.

### 8.2 Dynamic category and taxonomy rendering

- **ST-CAT-001:** The storefront shall retrieve published categories and subcategories from catalogue data.
- **ST-CAT-002:** Category navigation shall respect parent-child relationships and configured display order.
- **ST-CAT-003:** Category listing pages shall use reusable templates.
- **ST-CAT-004:** Newly published categories shall appear without requiring a frontend code deployment.
- **ST-CAT-005:** Inactive/unpublished categories shall not appear in customer navigation or search.
- **ST-CAT-006:** Category pages shall display relevant child categories and associated products where available.
- **ST-CAT-007:** Category renaming or removal shall be handled through redirects or a clear not-found experience.
- **ST-CAT-008:** The storefront shall gracefully handle empty categories and deep category nesting within agreed UX limits.

### 8.3 Brand discovery

- **ST-BRAND-001:** Customers shall be able to view a brand directory.
- **ST-BRAND-002:** Customers shall be able to open a brand detail page.
- **ST-BRAND-003:** Brand detail pages shall display published products associated with that brand.
- **ST-BRAND-004:** Brand names shown on product cards and PDPs shall link to the corresponding brand page where available.

### 8.4 Collections and merchandising

- **ST-COLL-001:** The storefront shall support configured collections such as New Arrivals, Best Sellers, Trending, Featured and Offers.
- **ST-COLL-002:** Collection pages shall display only published products that meet configured eligibility.
- **ST-COLL-003:** Empty or inactive collections shall be hidden or handled with an appropriate empty state.
- **ST-COLL-004:** Campaign and collection links shall lead to the intended destination.

### 8.5 Product listing, search, filters and sorting

- **ST-LIST-001:** Product listing pages shall display product cards for eligible published products.
- **ST-LIST-002:** Product cards shall display essential information such as image, product name, brand and price.
- **ST-LIST-003:** Product listings shall support pagination or an equivalent progressive loading pattern.
- **ST-LIST-004:** Customers shall be able to sort by configured options such as relevance, newest, price ascending and price descending.
- **ST-LIST-005:** Customers shall be able to filter by available product attributes.
- **ST-LIST-006:** Filters shall be combinable and clearable.
- **ST-LIST-007:** Active filters shall be visible to the customer.
- **ST-LIST-008:** Listing results shall update to reflect selected filters and sorting.
- **ST-LIST-009:** No-result states shall allow the customer to clear filters or broaden discovery.
- **ST-SEARCH-001:** Global search shall accept product, brand and relevant keyword queries.
- **ST-SEARCH-002:** Search results shall display relevant matching products and/or brands.
- **ST-SEARCH-003:** Search shall handle empty, partial and no-result queries gracefully.
- **ST-SEARCH-004:** Search query should remain editable on the results page.
- **ST-SEARCH-005:** Search suggestions/autocomplete may be included if confirmed for MVP.

### 8.6 Beauty discovery

- **ST-DISC-001:** Customers shall be able to browse products by skin type.
- **ST-DISC-002:** Customers shall be able to browse products by skin concern.
- **ST-DISC-003:** The storefront shall show products associated with the selected skin type or concern based on structured catalogue attributes.
- **ST-DISC-004:** Skin discovery results shall support relevant listing filters.
- **ST-DISC-005:** The storefront shall provide ingredient/routine educational content where published.
- **ST-DISC-006:** Beauty quiz and personalised routine builder are future scope, not initial MVP.
- **ST-DISC-007:** Product suitability information must not be presented as a guaranteed medical outcome or diagnosis.

### 8.7 Product detail page (PDP)

- **ST-PDP-001:** Each published product shall have a product detail page.
- **ST-PDP-002:** PDP shall display product name, brand, images, price and availability.
- **ST-PDP-003:** PDP shall display variants/options where applicable.
- **ST-PDP-004:** Customer shall be able to select an eligible variant and quantity.
- **ST-PDP-005:** Customer shall be able to add an available product to cart.
- **ST-PDP-006:** Customer shall be able to add/remove a product from wishlist.
- **ST-PDP-007:** PDP shall display available descriptions, benefits, ingredients, usage directions and warnings supplied for the product.
- **ST-PDP-008:** PDP shall display ratings and reviews where available.
- **ST-PDP-009:** PDP may display related or complementary products based on configured associations.
- **ST-PDP-010:** Out-of-stock or unavailable variants shall not be purchasable.
- **ST-PDP-011:** Product information must not be fabricated where source data is missing.
- **ST-PDP-012:** Product images should support gallery viewing and responsive display.

### 8.8 Cart

- **ST-CART-001:** Customers shall be able to add eligible products to cart.
- **ST-CART-002:** Customers shall be able to change quantities within allowed stock limits.
- **ST-CART-003:** Customers shall be able to remove cart items.
- **ST-CART-004:** Cart shall display product, selected variant, quantity, unit price and line total.
- **ST-CART-005:** Cart shall display subtotal and any applicable discount/delivery information.
- **ST-CART-006:** Cart totals shall recalculate when items or quantities change.
- **ST-CART-007:** Cart shall revalidate price and availability before checkout/order submission.
- **ST-CART-008:** Cart shall provide a clear empty state and route back to shopping.
- **ST-CART-009:** Promotion code entry may be shown if promotion functionality is enabled.

### 8.9 Checkout and order submission

- **ST-CHK-001:** Storefront shall support guest checkout.
- **ST-CHK-002:** Storefront shall support registered-customer checkout.
- **ST-CHK-003:** Checkout shall capture required customer contact details.
- **ST-CHK-004:** Checkout shall capture a valid delivery address.
- **ST-CHK-005:** Checkout shall display delivery methods available for the address/order.
- **ST-CHK-006:** Checkout shall display only enabled payment methods.
- **ST-CHK-007:** Checkout shall display a clear order review before submission.
- **ST-CHK-008:** Checkout shall calculate/display item subtotal, discounts, delivery charges and grand total as applicable.
- **ST-CHK-009:** Checkout shall validate required fields and order availability.
- **ST-CHK-010:** Order confirmation shall be shown only after successful order submission.
- **ST-CHK-011:** Guest checkout shall not silently create a customer account.
- **ST-CHK-012:** Payment failure or order submission failure shall not be represented as success.
- **ST-CHK-013:** Registered customers shall be able to select eligible saved addresses.
- **ST-CHK-014:** Registered customers shall be able to add a new address during checkout where supported.
- **ST-CHK-015:** The system shall prevent duplicate order submission where technically feasible.

### 8.10 Customer account and authentication

- **ST-AUTH-001:** Customers shall be able to register with required information.
- **ST-AUTH-002:** Customers shall be able to log in.
- **ST-AUTH-003:** Customers shall be able to request password recovery.
- **ST-AUTH-004:** Authentication errors shall be communicated safely without exposing sensitive account information.
- **ST-AUTH-005:** Authenticated customers shall be able to access an account dashboard.
- **ST-ACC-001:** Customers shall be able to view/update permitted profile information.
- **ST-ACC-002:** Customers shall be able to add, edit and remove saved addresses.
- **ST-ACC-003:** Customers shall be able to view their account-linked orders.
- **ST-ACC-004:** Customers shall be able to open order details.
- **ST-ACC-005:** Customers shall be able to view available tracking/status information.
- **ST-ACC-006:** Customers shall be able to view wishlist and review history where supported.
- **ST-ACC-007:** Protected account pages shall require authentication.

### 8.11 Wishlist

- **ST-WISH-001:** Customers shall be able to save products to a wishlist.
- **ST-WISH-002:** Customers shall be able to view saved products.
- **ST-WISH-003:** Customers shall be able to remove saved products.
- **ST-WISH-004:** Customers shall be able to navigate from a wishlist item to its PDP.
- **ST-WISH-005:** Customers shall be able to move an eligible wishlist item to cart.
- **ST-WISH-006:** Guest wishlist persistence and merging into a registered account shall follow a confirmed business rule.

### 8.12 Ratings and reviews

- **ST-REV-001:** PDP shall display ratings and reviews where available.
- **ST-REV-002:** Eligible customers shall be able to submit a star rating.
- **ST-REV-003:** Eligible customers shall be able to submit written review content.
- **ST-REV-004:** Customer photo upload shall be supported within configured file constraints.
- **ST-REV-005:** Review submission shall validate required fields and file type/size.
- **ST-REV-006:** Review moderation/publication rules shall be applied in production.
- **ST-REV-007:** The storefront shall not imply a review is published before approval where moderation is required.
- **ST-REV-008:** Review eligibility (verified purchase or other policy) must be confirmed.

### 8.13 Content, support and policy pages

- **ST-CONT-001:** Storefront shall provide About Us and Contact Us pages.
- **ST-CONT-002:** Storefront shall provide FAQs.
- **ST-CONT-003:** Storefront shall provide delivery information.
- **ST-CONT-004:** Storefront shall provide returns/refunds information.
- **ST-CONT-005:** Storefront shall provide privacy policy and terms and conditions.
- **ST-CONT-006:** Storefront shall support a Beauty Journal/article listing and article detail template.
- **ST-CONT-007:** Editorial pages shall support relevant product/category links.
- **ST-CONT-008:** Content that is unpublished or unavailable shall not be exposed as an active destination.

### 8.14 Promotions and newsletter

- **ST-PROMO-001:** Storefront may display active configured promotions and offer collections.
- **ST-PROMO-002:** Promotion validity and eligibility must be checked before discount application.
- **ST-PROMO-003:** Invalid, expired or ineligible codes shall not reduce the order total.
- **ST-NEWS-001:** Newsletter subscription may be provided subject to provider integration and explicit consent wording.
- **ST-NEWS-002:** Subscription success/failure must be communicated accurately.
- **ST-NEWS-003:** Marketing consent must not be silently bundled with unrelated required checkout consent.

## 9. Core Business Rules

1. Only published products may be presented as purchasable.
2. Products must be associated with valid brands and catalogue attributes as applicable.
3. A product may belong to multiple relevant categories if the business taxonomy permits it.
4. Category navigation is dynamic and driven by published catalogue data.
5. Inactive/unpublished categories and products must not appear in normal customer discovery.
6. Product prices and availability must be revalidated before order submission.
7. Customers cannot purchase quantities exceeding available saleable stock.
8. Out-of-stock products/variants must not be added to cart as purchasable items.
9. Order totals must be calculated consistently from item prices, quantities, discounts and delivery charges.
10. Promotions must respect their validity period, eligibility and configured conditions.
11. Checkout must present available delivery and payment options only.
12. Guest checkout must remain available and must not silently create an account.
13. Registered customer order history must be restricted to the authenticated owner.
14. Customer reviews must follow the configured eligibility and moderation policy.
15. Product suitability content must be factual and must not guarantee outcomes.
16. Product authenticity and batch/expiry information are business-critical operational concerns; exact customer display requirements need business confirmation.
17. Customer personal information must only be used for legitimate storefront/order purposes and handled securely.
18. Policy wording and customer rights must be reviewed before production launch.

## 10. User Flows and End-to-End Customer Journeys

### 10.1 First-time visitor to purchase (guest)

1. Customer lands on homepage, campaign page or category page.
2. Customer explores category shortcuts, brands, collections or search.
3. Customer opens a listing page.
4. Customer filters/sorts products.
5. Customer opens a PDP and reviews product information.
6. Customer selects variant and quantity where applicable.
7. Customer adds product to cart.
8. Customer reviews cart and totals.
9. Customer selects checkout and chooses guest checkout.
10. Customer enters contact and delivery details.
11. Customer selects delivery and payment methods.
12. Customer reviews the order.
13. Customer submits order.
14. Storefront displays confirmation only after successful order submission.

Alternative paths: product unavailable; quantity exceeds stock; invalid delivery data; invalid promotion; payment failure; order submission failure. Each must show a clear message and must not falsely indicate success.

### 10.2 Category browse

1. Open Shop.
2. View published categories/subcategories.
3. Select a category.
4. Open listing page.
5. Select subcategory or apply filters/sorting.
6. Open product PDP.

### 10.3 Search

1. Open global search.
2. Enter product, brand or keyword.
3. Submit query.
4. Review results.
5. Refine query or filters.
6. Open PDP or brand detail.

No results: preserve editable query and offer a route to Shop All.

### 10.4 Browse by skin type

1. Open Beauty Discovery.
2. Select Shop by Skin Type.
3. Choose a skin type.
4. View associated products.
5. Optionally filter by category/brand.
6. Open PDP.

### 10.5 Browse by skin concern

1. Open Beauty Discovery.
2. Select Shop by Skin Concern.
3. Choose a concern.
4. View associated products.
5. Refine results.
6. Open PDP and review details.

### 10.6 Registered customer purchase

1. Open Account and log in.
2. Browse or select wishlist item.
3. Add product to cart.
4. Proceed to checkout.
5. Select saved address or enter a new one.
6. Select available delivery and payment options.
7. Review and submit order.
8. View confirmation.

### 10.7 Registration

1. Open Account and select Register.
2. Enter required information.
3. Validate fields and required consent.
4. Submit registration.
5. Complete required verification if enabled.
6. Open account dashboard or verification step.

### 10.8 Wishlist

1. Select wishlist control on product card/PDP.
2. Store item according to guest/session or account rules.
3. Open wishlist.
4. Review saved products.
5. Remove, open PDP or add item to cart.

### 10.9 Review submission

1. Open PDP reviews.
2. Select Write a Review.
3. Check eligibility/authentication rule.
4. Select rating and enter written review.
5. Optionally upload photo.
6. Validate fields/files.
7. Submit review.
8. Apply moderation/publication process.
9. Show approved review or submission status.

### 10.10 Order history and tracking

1. Open Account.
2. Select My Orders.
3. Review order summaries.
4. Open an order.
5. View items, totals, delivery information and status.
6. Open tracking information if available.

### 10.11 Beauty content to shopping

1. Open Beauty Discovery/Journal.
2. Browse article listing.
3. Open article.
4. Read and follow relevant product/category links.
5. Open PDP and optionally add to cart.

### 10.12 Checkout step model

| Step | Guest | Registered |
|---|---|---|
| Cart review | Review items, quantities and subtotal | Same |
| Customer details | Enter name, email and contact | Use authenticated details, allow permitted updates |
| Delivery address | Enter delivery address | Select saved address or add new |
| Delivery method | Choose available method | Same |
| Payment method | Choose enabled method | Same |
| Order review | Review discounts, delivery and total | Same |
| Submit | Accept required terms and place order | Same |
| Confirmation | Show reference after success | Same and link order to account |

## 11. State Handling and Error Behaviour

| State/scenario | Required behaviour |
|---|---|
| Empty category | Explain no products are available; link to related category/Shop All |
| No search results | Preserve query; suggest editing or broader browsing |
| Out of stock | Show unavailable status; prevent purchase |
| Variant unavailable | Disable selection and explain |
| Quantity exceeds stock | Prevent invalid quantity and show allowed availability |
| Price changes | Revalidate and show updated total before submission |
| Invalid promotion | Do not apply discount; explain while preserving cart |
| Payment failure | Do not mark as paid; provide retry/alternative if supported |
| Order failure | Do not show confirmation; allow safe retry |
| Authentication failure | Show safe error and password recovery route |
| Protected page as guest | Offer login/register and preserve destination where appropriate |
| Removed category URL | Redirect where configured or show not-found state |
| Invalid review image | Reject file with accepted format/size guidance |
| Network failure | Show retry guidance and preserve safe state where possible |
| Empty wishlist | Explain and provide shopping route |
| Empty order history | Explain and provide Shop Now route |

## 12. Non-Functional Requirements

### 12.1 Responsive design

- Support desktop, tablet and mobile layouts.
- Ensure core shopping and checkout journeys are usable on small screens.
- Mobile filters should use a drawer or equivalent pattern.
- Header, menus, product galleries, forms and tables must adapt to viewport size.

### 12.2 Performance

- Optimise product and editorial images.
- Use appropriate responsive image sizes and lazy loading where suitable.
- Avoid unnecessary client-side payload and excessive blocking scripts.
- Use pagination or progressive loading for large product listings.
- Set measurable performance budgets during technical design.

### 12.3 Security and privacy

- Use secure transport (HTTPS) in production.
- Protect account pages and customer-specific order data.
- Validate and sanitise customer inputs.
- Validate uploaded review images and restrict allowed types/sizes.
- Do not expose secrets or payment credentials in frontend code.
- Use secure authentication/session handling.
- Apply appropriate access control and data minimisation.
- Define privacy, retention and consent practices before launch.

### 12.4 Accessibility and usability

- Use semantic page structure and accessible form labels.
- Provide keyboard focus states.
- Use sufficient contrast.
- Do not communicate status through colour alone.
- Provide alternative text for meaningful images.
- Make interactive controls usable by keyboard and assistive technologies.
- Provide understandable validation and error messages.

### 12.5 Reliability and maintainability

- Reuse page templates and UI components.
- Keep catalogue taxonomy data-driven.
- Handle API/network errors gracefully.
- Avoid hardcoding category lists, product inventory, prices or promotional rules.
- Keep configuration and content manageable outside the frontend where possible.
- Maintain clear separation between storefront UI and Admin Panel UI.

### 12.6 SEO and discoverability

- Use meaningful page titles, descriptions and readable URLs.
- Provide canonical URL handling where appropriate.
- Use structured metadata where supported and validated.
- Ensure important category, brand and product pages are crawlable.
- Avoid indexing empty, duplicate or unpublished content.

## 13. Data Concepts Required by the Storefront

This is a conceptual data checklist, not a final database schema.

### 13.1 Product

- Product identifier and slug.
- Product name and brand association.
- Category/subcategory associations.
- Product description and images.
- Price and any promotional price.
- Availability/stock status.
- Variant/options and SKU where applicable.
- Benefits, ingredients, usage directions and warnings where supplied.
- Skin type and concern associations where relevant.
- Related products/collections where configured.
- Publication status.

### 13.2 Brand

- Brand identifier and slug.
- Name, logo/image and description.
- Publication status.
- Associated products.

### 13.3 Category

- Category identifier and slug.
- Name, parent category and child categories.
- Display order.
- Optional description/banner.
- Publication/visibility status.
- Associated products.

### 13.4 Product attributes

Potential structured attributes include:
- Skin type.
- Skin concern.
- Product type.
- Ingredient.
- Benefit.
- Fragrance family.
- Hair type/concern where applicable.
- Gender/target audience where relevant.
- Product size/volume.
- Finish/shade/variant for makeup products.

The business must approve the final attribute model and which attributes are filterable.

### 13.5 Cart and order

- Cart line items, product/variant, quantity and price snapshot.
- Customer/guest association.
- Delivery address and contact details.
- Delivery method and fee.
- Payment method and payment status.
- Order items and price snapshots.
- Discounts and totals.
- Order reference and status.
- Tracking details where available.

### 13.6 Customer and review

- Customer profile and authentication identity.
- Saved addresses.
- Order relationships.
- Wishlist items.
- Review rating, text, photo references, moderation status and product/customer relationship.

## 14. Prototype Versus Production Expectations

| Area | Frontend prototype | Production |
|---|---|---|
| Catalogue | Structured mock data | Live catalogue API/database |
| Dynamic taxonomy | Demonstrated with data-driven mock configuration | Published categories from Admin-managed backend |
| Search | Simulated or local dataset search | Search API/index and analytics |
| Authentication | Simulated UI states if required | Secure authentication service |
| Cart | Client-side prototype state | Server-validated cart and stock/price checks |
| Checkout | Validated demo flow | Real order service and payment integration |
| Delivery | Mock methods/fees | Configured delivery rules and serviceability |
| Payment | Simulated success/failure | Provider integration and verified payment status |
| Reviews | Demo form and sample reviews | Persistent review service, moderation and secure uploads |
| Order history | Sample orders | Authenticated customer order API |
| Content | Static/mock content | CMS or Admin-managed content |
| Newsletter | Demo form | Consent-aware provider integration |

The prototype must not be presented as a live commerce system if payment, order persistence, inventory and fulfilment are simulated.

## 15. QA and Acceptance Criteria

The storefront baseline should not be considered ready until the following are validated:

- Global navigation links work on desktop and mobile.
- Dynamic category navigation renders from structured data.
- Adding a published category does not require frontend code changes.
- Customers can browse category → subcategory → PDP.
- Customers can browse brand → brand detail → PDP.
- Search results and no-result states work.
- Filters combine, clear and update listings correctly.
- Skin type and skin concern discovery work with tagged sample products.
- PDP displays essential product information and availability.
- Add-to-cart, remove and quantity changes work.
- Cart totals recalculate and invalid quantities are blocked.
- Guest checkout can be completed in the prototype with validation.
- Registered checkout and saved-address flow are demonstrated.
- Authentication, profile, address and order pages are represented.
- Wishlist save/remove/move-to-cart actions work.
- Review rating, text and photo-selection interactions are represented.
- Empty, loading, unavailable, validation and failure states are covered.
- Responsive behaviour is checked on desktop, tablet and mobile.
- No storefront page exposes Admin Panel functionality or staff-only data.
- No successful order/payment state is displayed after a simulated failure.

## 16. Dependencies and Open Decisions

The following must be confirmed before production build or final UI lock:

| ID | Open decision | Why it matters |
|---|---|---|
| OQ-01 | Final brand name, logo and identity | Visual design, headers, footers and metadata |
| OQ-02 | Final category/subcategory taxonomy | Navigation and catalogue setup; taxonomy remains dynamic |
| OQ-03 | Product attributes and filter rules | Search/listing and skin discovery |
| OQ-04 | Product data ownership and content standards | Accuracy, ingredients, directions, authenticity |
| OQ-05 | Delivery zones, methods, fees and delivery estimates | Checkout calculations and customer promises |
| OQ-06 | Payment methods and COD policy | Production checkout |
| OQ-07 | Payment gateway selection (PayHere only a candidate) | Integration and payment states |
| OQ-08 | Returns, refunds, cancellations and exchange policy | Policy pages and support |
| OQ-09 | Review eligibility and moderation | Review submission/publishing |
| OQ-10 | Guest wishlist persistence and account merge | Wishlist behaviour |
| OQ-11 | Guest order lookup | Whether unauthenticated tracking exists |
| OQ-12 | Journal launch content volume | Content experience at launch |
| OQ-13 | Product comparison in MVP | Scope and page/UI requirements |
| OQ-14 | Newsletter provider and consent wording | Subscription integration |
| OQ-15 | Batch/expiry customer display requirements | Product transparency and operational rules |
| OQ-16 | Tax/invoice requirements | Order totals and compliance |
| OQ-17 | Final language/localisation roadmap | Content and technical preparation |

## 17. Dependencies on the Admin Panel

The storefront depends on the separate Admin Panel/backend for:
- Category and subcategory management.
- Brand management.
- Product creation and publication.
- Product images and descriptions.
- Product pricing and stock availability.
- Product attributes, skin types and skin concerns.
- Collections and merchandising.
- Promotions.
- Content and policy pages.
- Order status and tracking information.
- Review moderation.
- Delivery and payment configuration.

These are dependencies only. This document does not specify the Admin Panel interface or staff workflows. The Admin Panel must have its own documentation set.

## 18. Traceability and Change Control

- Each functional requirement should be traceable to one or more frontend pages, user journeys and QA test cases.
- Changes to category structure, checkout, payment, delivery, account behaviour or review policy should be reflected in this document and relevant tickets.
- If an approved business decision changes, update the PRD, FRD, sitemap and user journey baseline as applicable.
- Keep a change log for future versions.

### 18.1 Version history

| Version | Description | Status |
|---|---|---|
| 1.0 | Consolidated storefront baseline from PRD, FRD and Sitemap/User Flows | Pending stakeholder review |

---

## Appendix A — Source Specification: Product Requirements Document

The following section preserves the detailed Storefront PRD content as prepared in the source document.

## Document Control

| Field | Description |
| --- | --- |
| Purpose | Define the vision, business objectives, customer requirements, scope and acceptance criteria for the customer-facing storefront. |
| Audience | Business stakeholders, product owner, project manager, UX/UI designer, frontend developers and QA team. |
| Related documents | Storefront Functional Requirements Document (FRD); Storefront Sitemap; Storefront User Flows; Storefront UI/UX Specification. |
| Version | 1.0 – approved requirements baseline subject to formal stakeholder sign-off. |


## 1. Executive Summary

The project involves developing a premium, modern and user-friendly beauty and cosmetics e-commerce storefront for the Sri Lankan market.

The platform will enable customers to discover, explore and purchase products from multiple beauty and cosmetics brands through one centralised online shopping destination.

The business will operate as a multi-brand retailer, purchasing and maintaining physical inventory from different brands and suppliers and selling products directly to customers.

The storefront will offer a comprehensive shopping experience covering skincare, face creams, serums, body care, makeup, hair care, fragrance and beauty accessories.

Customers will be able to browse products by category, brand, skin type and skin concern, search for products, explore product details, manage wishlists, submit reviews and complete purchases through either guest checkout or registered customer accounts.

The initial development phase will focus on creating a responsive and interactive frontend prototype. Backend integration, database connectivity, payment processing and production deployment will follow in subsequent phases.


## 2. Product Vision


### 2.1 Vision Statement

To establish a trusted and premium online beauty destination in Sri Lanka where customers can discover authentic beauty and personal-care products from multiple brands through a convenient, informative and enjoyable shopping experience.


### 2.2 Product Purpose

The storefront will provide customers with the ability to:

- Discover multiple beauty and cosmetics brands.

- Browse products through organised categories.

- Search and filter products.

- Explore products according to skin type and skin concern.

- Access detailed product information.

- Compare products and explore alternatives.

- Save favourite products.

- Purchase products through a convenient checkout experience.

- Shop without registering or through a registered account.

- Track their orders.

- Share product ratings, written reviews and customer photos.

- Access beauty guides and educational content.

- Contact customer support.


## 3. Business Model

The business will operate as a multi-brand, inventory-based beauty and cosmetics retailer. The retailer will own and manage its inventory and fulfil customer orders. The platform will not operate as a third-party marketplace.

The business will control:

- Brand selection and product selection.

- Product pricing and categorisation.

- Product descriptions and availability.

- Promotions and discounts.

- Customer orders and delivery fulfilment.

- Customer service.


## 4. Business Objectives

| ID | Objective |
| --- | --- |
| BO-01 | Establish a premium online beauty store |
| BO-02 | Provide a centralised multi-brand shopping experience |
| BO-03 | Improve product discovery and navigation |
| BO-04 | Provide detailed and transparent product information |
| BO-05 | Increase online purchasing opportunities |
| BO-06 | Build customer confidence and trust |
| BO-07 | Improve customer retention |
| BO-08 | Support future product category expansion |
| BO-09 | Improve customer engagement through reviews and beauty content |
| BO-10 | Establish a scalable online retail platform |


## 5. Target Audience


### 5.1 Skincare Customers

Customers interested in skincare, face creams, serums and skincare routines.

- Browse by skin type and skin concern.

- Discover relevant products.

- Explore ingredients and product benefits.

- Understand directions for use.


### 5.2 Makeup Customers

Customers interested in makeup and cosmetics.

- Browse makeup brands.

- Explore product shades and variants.

- Discover trending products.

- View product images and compare prices and offers.


### 5.3 Personal-Care Customers

Customers interested in body care, hair care, fragrance and everyday personal-care products.

- Discover suitable products.

- Explore multiple brands.

- Purchase multiple products together.

- Access promotional offers.


### 5.4 Premium Beauty Customers

Customers looking for premium and established cosmetic brands.

- Explore premium collections.

- Access product information.

- Identify authentic products.

- Discover exclusive offers.


## 6. Product Catalogue


### 6.1 Skincare

- Cleansers

- Toners

- Moisturisers

- Sunscreens

- Exfoliators

- Face Masks

- Skincare Treatments


### 6.2 Face Creams & Serums

- Day Creams

- Night Creams

- Hydrating Creams

- Brightening Creams

- Anti-Ageing Creams

- Face Serums

- Eye Creams

- Face Oils


### 6.3 Body Care

- Body Lotions

- Body Creams

- Body Washes

- Body Scrubs

- Hand Creams

- Foot Creams

- Body Oils

- Deodorants


### 6.4 Makeup

- Foundation

- Concealer

- Powder

- Blush

- Lipstick

- Lip Gloss

- Mascara

- Eyeliner

- Eyeshadow

- Makeup Brushes


### 6.5 Hair Care

- Shampoo

- Conditioner

- Hair Oils

- Hair Masks

- Hair Serums

- Hair Treatments

- Styling Products


### 6.6 Fragrance

- Perfumes

- Body Mists

- Eau de Parfum

- Eau de Toilette

- Women's Fragrance

- Men's Fragrance

- Unisex Fragrance


### 6.7 Beauty Tools & Accessories

- Facial Rollers

- Gua Sha Tools

- Makeup Brushes

- Makeup Sponges

- Facial Cleansing Tools

- Beauty Accessories


### 6.8 Dynamic Product Classification

The catalogue must support dynamic product classification. The business may introduce new categories such as whitening, brightening, bath products or other beauty ranges in the future.

- The storefront must retrieve and display the published category structure dynamically.

- New categories and subcategories must be reflected when published.

- The storefront must support changing category names and hierarchy.

- New categories must be discoverable through navigation and search.

- Product listing pages must support the latest published category structure.

- Frontend redevelopment must not be required whenever a new category is introduced.

Category creation, editing, reordering and product assignment will be handled through the separate Admin Panel.


## 7. Functional Product Scope


### 7.1 Homepage

- Announcement bar and main navigation.

- Search functionality and hero campaign banners.

- Shopping benefits and Shop by Category.

- Best Sellers, New Arrivals and Featured Brands.

- Shop by Skin Type and Shop by Skin Concern.

- Trending Products, Special Offers and Featured Collections.

- Beauty Journal, newsletter subscription and footer.


### 7.2 Navigation

- Access to Home, Shop All, categories and subcategories, Brands, New Arrivals, Best Sellers, Offers and Beauty Guides.

- Access to Customer Account, Wishlist and Shopping Cart.

- Navigation must adapt to published categories and collections.


### 7.3 Product Listing

- Product images, names, brand names and prices.

- Discounted prices, ratings and product badges.

- Wishlist actions and product-detail navigation.

- Pagination or load-more functionality.


### 7.4 Product Search

- Search by product name, brand, category, product type and relevant keywords.

- Search results should provide relevant products and allow customers to refine results.


### 7.5 Product Filtering and Sorting

- Filters: brand, price range, category, product type, skin type, skin concern, availability, rating, benefits and relevant attributes.

- Sorting: Featured, Newest, Best Selling, Price Low to High, Price High to Low and Highest Rated.

- Filters should be relevant to the selected product category and available attributes.


### 7.6 Product Details

- Product name, brand, images and gallery.

- Description, price, discounted price, size or volume and variants.

- Stock availability, ingredients, benefits and directions for use where available.

- Suitable skin types, skin concerns, warnings and precautions where applicable.

- Ratings, reviews, customer-submitted photos and related products.

- Frequently bought together, Add to Cart and Add to Wishlist.


### 7.7 Brand Discovery

- All Brands page, brand listing, logos and descriptions.

- Individual brand pages and brand-specific product collections.

- Brand search and filtering.


### 7.8 Shopping Cart

- Add and remove products; update quantities.

- Review selected items and prices.

- View subtotal, delivery charges where available and order total.

- Apply promotional codes, continue shopping and proceed to checkout.


### 7.9 Checkout

- Customer information and guest checkout.

- Registered customer checkout.

- Delivery address, contact information and delivery method.

- Payment method, promotional codes and order summary.

- Final order review and order confirmation.


### 7.10 Customer Accounts

- Registration, login and password recovery.

- Personal information and delivery-address management.

- Order history, order details and tracking.

- Wishlist, submitted reviews and password management.


### 7.11 Wishlist

- Add and remove products.

- View saved products and access product details.

- Move saved products to the shopping cart.

- Wishlist persistence for guest customers will be defined in the FRD.


### 7.12 Customer Reviews and Ratings

- Star ratings and written reviews.

- Customer-submitted product photos.

- Review dates, submission and display.

- Review moderation and verified-purchase identification where supported.

- Publication must follow the business's moderation policy.


### 7.13 Shop by Skin Type

- Explore products based on Normal, Dry, Oily, Combination and Sensitive skin types.

- Display relevant products according to configured product attributes.


### 7.14 Shop by Skin Concern

- Explore products for acne and blemishes, dryness, uneven skin tone, dark spots and pigmentation, dullness, fine lines and wrinkles, dehydration and skin texture.

- Product suitability must be based on verified product information and approved classification.


### 7.15 Beauty Content

- Beauty Journal and skincare guides.

- Ingredients Guide and morning/evening routines.

- Product usage guides, beauty tips and product comparisons.


### 7.16 Promotions

- Promotional banners and discounted products.

- Category offers and brand campaigns.

- Seasonal promotions, product bundles, coupon codes and featured collections.


### 7.17 Customer Support

- Contact Us and FAQs.

- Delivery Information and Returns & Refunds.

- Privacy Policy and Terms & Conditions.

- WhatsApp and email support.


## 8. Language and Localisation


### 8.1 Initial Release

English will be the primary storefront language. The platform architecture should remain flexible for future Sinhala and Tamil language support.

- Translated page and product content.

- Navigation and category translations.

- Language selection.

- Localised SEO information.


## 9. Sri Lankan Market Requirements

| Area | Requirement |
| --- | --- |
| Country | Sri Lanka |
| Currency | LKR |
| Phone numbers | Sri Lankan phone number formats |
| Delivery addresses | Sri Lankan address structure |
| Delivery | Configurable islandwide delivery |
| Payments | Cash on Delivery and online payment options, subject to business policy |
| Payment gateway | PayHere proposed |
| Support | WhatsApp and email |
| Language | English initially |
| Time zone | Sri Lanka Standard Time |


## 10. Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Performance | Optimised page loading, image delivery and product grids. |
| Responsive design | Desktop, tablet and mobile layouts with touch-friendly controls. |
| Accessibility | Readable typography, accessible controls and meaningful image descriptions. |
| SEO | Search-engine-friendly structure, metadata and product information. |
| Security | Secure customer information handling and authentication. |
| Scalability | Support additional brands, categories, products, features and traffic. |
| Maintainability | Reusable components and consistent navigation. |


## 11. Development Phases


### Phase 1 – Frontend Prototype

- Complete homepage and navigation.

- Dynamic category rendering with mock data.

- Product listing, details and brand pages.

- Search, filtering and sorting.

- Cart and wishlist interactions.

- Guest and registered checkout interfaces.

- Customer account and order-history screens.

- Reviews and photo-review interface.

- Skin type and skin concern discovery.

- Beauty content pages and responsive layouts.


### Phase 2 – Backend Integration

- Supabase integration.

- Product and category data.

- Customer authentication.

- Guest order management.

- Cart and wishlist persistence.

- Order creation and inventory availability.

- Product review storage.


### Phase 3 – E-Commerce Integration

- Payment gateway and COD workflow.

- Delivery configuration and order tracking.

- Notifications.

- Promotional validation.


### Phase 4 – Production Launch

- Hosting and domain configuration.

- SEO and analytics.

- Security and performance testing.

- User acceptance testing.


## 12. Out of Scope

The following belong to the separate Admin Panel or backend scope:

- Product creation and editing interfaces.

- Category creation and editing.

- Brand management.

- Inventory, batch and expiry management.

- Supplier management.

- Order-processing interfaces.

- Staff management and permissions.

- Admin analytics.

The Storefront consumes and displays the appropriate published information.


## 13. Future Enhancements

- Beauty recommendation quiz.

- Personalised product recommendations.

- Skincare routine builder.

- Loyalty and rewards programme.

- Gift finder and gift cards.

- Product comparison and recently viewed products.

- Subscription purchases.

- Sinhala and Tamil storefront.

- Mobile application.

The beauty quiz is specifically deferred to a future release and is not an MVP requirement.


## 14. Success Metrics

- Website traffic and product views.

- Search and category engagement.

- Add-to-cart and checkout completion rates.

- Conversion rate and average order value.

- Returning customer rate and wishlist usage.

- Review participation and mobile conversion rate.

- Customer satisfaction.


## 15. Final Acceptance Criteria

1. Provide all approved customer-facing pages.

1. Display dynamically structured product categories.

1. Allow product browsing by category and brand.

1. Support product search, filtering and sorting.

1. Support skin-type and skin-concern discovery.

1. Display complete product information.

1. Support cart and wishlist interactions.

1. Demonstrate guest checkout and registered customer checkout.

1. Provide customer account interfaces.

1. Demonstrate star ratings, written reviews and customer photo reviews.

1. Provide order history and tracking interfaces.

1. Support English initially.

1. Be responsive across desktop, tablet and mobile.

1. Follow the approved premium design direction.


## 16. Open Decisions

| ID | Decision | Status |
| --- | --- | --- |
| OD-01 | Brand name and identity | Pending |
| OD-02 | Product and supplier portfolio | Pending |
| OD-03 | Delivery providers and pricing | Pending |
| OD-04 | Payment methods | Pending |
| OD-05 | Returns and refunds policy | Pending |
| OD-06 | Guest wishlist persistence | To be specified in FRD |
| OD-07 | Review moderation policy | To be specified in FRD |
| OD-08 | Verified-purchase review rules | To be specified in FRD |
| OD-09 | Multilingual launch | Future consideration |


## 17. Document Conclusion & Approval

This PRD establishes the product vision, business objectives, customer requirements, storefront functionality, development scope and acceptance criteria for the multi-brand beauty and cosmetics e-commerce storefront.

The Storefront will be developed as a separate customer-facing application, independent of the Admin Panel interface.

The detailed technical and behavioural specifications will be defined in the Storefront FRD. The complete page hierarchy and navigation architecture will be defined in the Storefront Sitemap.

| Approval | Name / Signature | Date |
| --- | --- | --- |
| Business Owner / Product Owner |  |  |
| Project Manager |  |  |
| Stakeholder |  |  |

END OF STOREFRONT PRD – VERSION 1.0

---

## Appendix B — Source Specification: Functional Requirements Document

The following section preserves the detailed Storefront FRD content from the source document. Requirement IDs and detailed behaviours should be maintained when creating implementation tickets and test cases.

## Document Control

| Field | Description |
| --- | --- |
| Purpose | Specify how storefront features, screens, interactions, validations and customer workflows must behave. |
| Audience | Product owner, business stakeholders, project manager, UX/UI designer, frontend and backend developers, QA team. |
| Prerequisite | Approved Storefront PRD v1.0. |
| Companion document | Storefront Sitemap, to be prepared separately. |
| Scope boundary | Customer-facing storefront only. Internal product, taxonomy, inventory and order administration are specified in the separate Admin Panel documentation. |


## 1. Introduction


### 1.1 Purpose

This Functional Requirements Document (FRD) translates the approved Storefront PRD into functional behaviours and testable requirements. It defines the expected response of the storefront when customers browse, search, select, save and purchase products.


### 1.2 Product Context

The storefront is a B2C multi-brand beauty and cosmetics retail website for Sri Lanka. The retailer owns and manages the physical inventory. Customers buy from the retailer, not from third-party marketplace sellers.


### 1.3 Release Interpretation

| Release | Functional implementation |
| --- | --- |
| Phase 1 – Prototype | Interactive UI using realistic mock data and client-side state. No real authentication, payment, stock reservation, order submission or notification delivery. |
| Phase 2 – Backend | Connect product, category, brand, customer, cart, wishlist, review and order data to backend services. |
| Phase 3 – Commerce integrations | Enable payment processing, delivery configuration, notifications and production order workflows. |
| Phase 4 – Launch | Production security, SEO, analytics, performance and acceptance testing. |


### 1.4 Requirement Priority

| Priority | Meaning |
| --- | --- |
| Must | Required for the agreed initial prototype or essential storefront operation. |
| Should | Important capability; may be scheduled after core MVP functions. |
| Could | Optional enhancement or future release. |


## 2. User Roles and Access

| User type | Capabilities |
| --- | --- |
| Guest visitor | Browse, search, filter, view products, manage a temporary cart, use guest checkout and access public content. |
| Registered customer | All guest capabilities plus account profile, saved addresses, persistent wishlist, order history and eligible review submission. |
| Storefront content consumer | Receives published categories, products, brands, promotions and content managed through the separate Admin Panel. This is not an additional user role. |

The Storefront does not provide administrative login or management functions. Admin authentication, permissions and catalogue maintenance are outside this FRD.


## 3. Global Storefront Behaviour


### 3.1 Shared interface and navigation

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-FUN-001 | Display the global header and navigation | Show the approved logo, primary navigation, search entry point, account access, wishlist and cart on applicable pages. |
| ST-FUN-002 | Dynamic category navigation | Render active and published categories and subcategories received from the catalogue data source. Do not hardcode the live taxonomy. |
| ST-FUN-003 | Navigation state | Indicate the current section where appropriate and allow customers to navigate back to parent categories. |
| ST-FUN-004 | Global footer | Provide configured links to customer support, policies, contact information, social channels and newsletter entry point. |
| ST-FUN-005 | Responsive navigation | Use a suitable desktop navigation and a mobile navigation pattern. All menu items must remain accessible on supported screen sizes. |
| ST-FUN-006 | Unavailable destination | If a linked page or content item is unavailable, show a helpful not-found or unavailable state rather than a blank page. |


### 3.2 Currency, language and presentation

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-FUN-007 | Display prices in LKR | Display product prices and order totals in Sri Lankan Rupees using a consistent currency format. |
| ST-FUN-008 | Initial language | Display the initial storefront interface in English. |
| ST-FUN-009 | Future localisation readiness | Keep text and content structures suitable for later Sinhala and Tamil localisation; language switching is not required in the initial release. |
| ST-FUN-010 | Price consistency | Use the same price and discount values across product cards, product details, cart and checkout summary. |


## 4. Homepage


### 4.1 Homepage sections

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-HOM-001 | Announcement bar | Display an active announcement or promotional message supplied by the content source. Hide the section when no active message is configured. |
| ST-HOM-002 | Hero campaign | Display campaign image, headline, supporting copy and optional CTA. CTA must navigate to its configured destination. |
| ST-HOM-003 | Shop by Category | Display active featured categories with image, name and destination. |
| ST-HOM-004 | Best Sellers | Display products assigned to the best-seller collection or supplied by the catalogue service. |
| ST-HOM-005 | New Arrivals | Display products marked as new or assigned to the new-arrivals collection. |
| ST-HOM-006 | Featured Brands | Display selected brand logos or cards linking to brand pages. |
| ST-HOM-007 | Skin Type discovery | Display supported skin-type entry points and navigate to the corresponding product discovery results. |
| ST-HOM-008 | Skin Concern discovery | Display supported skin-concern entry points and navigate to relevant product results. |
| ST-HOM-009 | Promotional collections | Display active promotional collections and their configured destinations. |
| ST-HOM-010 | Beauty Journal preview | Display selected articles and link to article detail pages. |
| ST-HOM-011 | Newsletter entry | Collect an email address and show success, validation or failure feedback. Actual subscription storage requires backend integration. |
| ST-HOM-012 | Optional section handling | If a section has no active content, omit it or show the approved empty state; do not render broken images or empty cards. |


## 5. Catalogue, Categories and Brands


### 5.1 Category and subcategory browsing

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-CAT-001 | Category landing page | Display the selected category name, optional description/banner and products belonging to that category. |
| ST-CAT-002 | Subcategory navigation | Display available child categories and allow navigation to their listing pages. |
| ST-CAT-003 | Dynamic taxonomy | Reflect category names, hierarchy, order and visibility from the published catalogue data. |
| ST-CAT-004 | Category breadcrumbs | Show a navigable path from Home through parent categories to the current category. |
| ST-CAT-005 | Category with no products | Show an informative empty state and links to related categories or Shop All. |
| ST-CAT-006 | Moved or renamed category | Resolve the current category destination from the latest published catalogue data; use redirects where configured. |
| ST-CAT-007 | Unavailable category | Show a not-found or unavailable page if a category is unpublished or no longer accessible. |


### 5.2 Brand browsing

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-BRD-001 | All Brands page | Display published brands in a browsable listing. |
| ST-BRD-002 | Brand search | Allow customers to locate a brand by its name. |
| ST-BRD-003 | Brand detail page | Display brand name, logo, description and products associated with that brand. |
| ST-BRD-004 | Brand product filtering | Allow customers to browse products belonging to the selected brand. |
| ST-BRD-005 | Unavailable brand | Show a helpful unavailable state if the brand is unpublished or has no accessible products. |


## 6. Product Listing, Search, Filtering and Sorting


### 6.1 Product listing

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-PLP-001 | Product card | Display product image, product name, brand, current price and applicable discount or rating information. |
| ST-PLP-002 | Product destination | Selecting a product card opens its product detail page. |
| ST-PLP-003 | Wishlist shortcut | Allow customers to add or remove a product from the wishlist where the feature is available. |
| ST-PLP-004 | Stock indicator | Display an appropriate availability state based on current product availability data. |
| ST-PLP-005 | Pagination or load more | Allow customers to access additional results without losing the selected category or filters. |
| ST-PLP-006 | No results | Show a no-products state with a way to clear filters or return to broader browsing. |
| ST-PLP-007 | Product card consistency | Use consistent pricing, discount and availability information across all listing contexts. |


### 6.2 Search

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-SRC-001 | Search entry | Allow customers to enter a product, brand, category or relevant keyword. |
| ST-SRC-002 | Search submission | Submit the query and display matching products or brands. |
| ST-SRC-003 | Search suggestions | Where supported, show relevant suggestions while the customer types. |
| ST-SRC-004 | Search result context | Display the search term and the number of matching results where available. |
| ST-SRC-005 | No search results | Explain that no matching results were found and suggest checking spelling or browsing categories. |
| ST-SRC-006 | Clear search | Allow customers to clear the search term and return to normal browsing. |


### 6.3 Filters and sorting

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-FLT-001 | Brand filter | Filter results by one or more available brands. |
| ST-FLT-002 | Price filter | Allow a minimum and maximum price to be selected within valid bounds. |
| ST-FLT-003 | Category and product-type filters | Filter results using applicable category and product-type attributes. |
| ST-FLT-004 | Skin-type filter | Show applicable skin types for products where the attribute is available. |
| ST-FLT-005 | Skin-concern filter | Show applicable skin concerns for products where the attribute is available. |
| ST-FLT-006 | Availability filter | Allow customers to narrow results to products available for purchase where supported. |
| ST-FLT-007 | Rating filter | Allow filtering by available customer rating thresholds where ratings exist. |
| ST-FLT-008 | Dynamic filter options | Only show filter values relevant to the current category and available product data. |
| ST-FLT-009 | Combined filters | Apply multiple selected filters together and show the resulting product set. |
| ST-FLT-010 | Remove individual filter | Allow an applied filter to be removed without clearing all other selections. |
| ST-FLT-011 | Clear all filters | Reset all selected filters and restore the unfiltered result set. |
| ST-FLT-012 | Sorting | Support Featured, Newest, Best Selling, Price Low to High, Price High to Low and Highest Rated where data is available. |
| ST-FLT-013 | Preserve browsing state | Where practical, preserve search, filter and sort state when a customer opens a product and returns to the listing. |


## 7. Product Details


### 7.1 Product information and actions

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-PDP-001 | Product identity | Display product name, brand and category context. |
| ST-PDP-002 | Product gallery | Display available product images and allow customers to view alternate images. |
| ST-PDP-003 | Product description | Display the published product description and relevant details. |
| ST-PDP-004 | Price presentation | Display current price, previous price and discount information where applicable. |
| ST-PDP-005 | Product variants | Allow customers to select an available size, volume, shade, scent or other configured variant. |
| ST-PDP-006 | Variant availability | Update price, SKU or availability information when a variant is selected if those values differ. |
| ST-PDP-007 | Quantity selection | Allow selection of a valid purchase quantity, subject to available stock and purchase limits. |
| ST-PDP-008 | Ingredients and benefits | Display ingredients, benefits and directions for use when supplied. |
| ST-PDP-009 | Suitability information | Display skin type, skin concern and other relevant suitability attributes where configured. |
| ST-PDP-010 | Warnings and precautions | Display supplied warnings, usage precautions and relevant product notices. |
| ST-PDP-011 | Add to Cart | Add the selected variant and quantity to the cart after validating availability. |
| ST-PDP-012 | Add to Wishlist | Save the product or selected variant according to wishlist rules. |
| ST-PDP-013 | Related products | Display related or recommended products when configured. |
| ST-PDP-014 | Frequently bought together | Display associated products when configured; each item must link to its own product detail page. |
| ST-PDP-015 | Unavailable product | Disable purchase actions and clearly indicate when a product or selected variant cannot be purchased. |
| ST-PDP-016 | Missing product data | Hide unavailable optional fields rather than displaying empty labels or placeholder content. |


## 8. Skin Type and Skin Concern Discovery


### 8.1 Discovery pages and product matching

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-SKIN-001 | Skin type landing | Provide a page or section listing supported skin types. |
| ST-SKIN-002 | Skin type result | Selecting a skin type displays products tagged with that skin type. |
| ST-SKIN-003 | Skin concern landing | Provide a page or section listing supported skin concerns. |
| ST-SKIN-004 | Skin concern result | Selecting a concern displays products tagged with that concern. |
| ST-SKIN-005 | Combined discovery | Allow skin-type and skin-concern selections to be combined where the interface supports it. |
| ST-SKIN-006 | Attribute transparency | Only show products with the relevant published attributes; do not infer suitability from product names. |
| ST-SKIN-007 | No matching products | Show an empty state and allow the customer to broaden or reset the selection. |
| ST-SKIN-008 | Educational disclaimer | Where appropriate, clarify that product discovery is informational and is not medical advice. |


## 9. Shopping Cart


### 9.1 Cart behaviour

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-CART-001 | Add item | Add a selected product variant and quantity to the cart. |
| ST-CART-002 | Cart confirmation | Provide visible confirmation when an item is added successfully. |
| ST-CART-003 | Cart contents | Display product image, name, selected variant, unit price, quantity and line total. |
| ST-CART-004 | Update quantity | Allow quantity changes within valid limits and recalculate totals. |
| ST-CART-005 | Remove item | Allow a customer to remove an item from the cart. |
| ST-CART-006 | Subtotal | Calculate the subtotal from current item prices and quantities. |
| ST-CART-007 | Discount code | Accept a discount code and display the validation result. Live validation requires backend integration. |
| ST-CART-008 | Delivery estimate | Display delivery charges or estimates when the required address and shipping rules are available. |
| ST-CART-009 | Order total | Display subtotal, applicable discounts, delivery charges and final total. |
| ST-CART-010 | Stock change | If availability changes, notify the customer and prevent checkout with invalid quantities. |
| ST-CART-011 | Empty cart | Display an empty-cart state with a link to continue shopping. |
| ST-CART-012 | Cart persistence | Prototype cart state may persist during the prototype session; production persistence rules will be specified during backend design. |


## 10. Checkout and Order Confirmation


### 10.1 Checkout entry and customer details

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-CHK-001 | Checkout entry | Allow customers to proceed from a non-empty cart to checkout. |
| ST-CHK-002 | Guest checkout | Allow checkout without creating or logging into an account. |
| ST-CHK-003 | Registered checkout | Allow an authenticated customer to use checkout. |
| ST-CHK-004 | Customer information | Collect required name, contact number and email information according to the checkout policy. |
| ST-CHK-005 | Delivery address | Collect address lines, city/town, district, province and postal code where applicable. |
| ST-CHK-006 | Saved address selection | Allow registered customers to select an existing saved address or enter a new one. |
| ST-CHK-007 | Delivery instructions | Allow optional delivery notes where supported. |
| ST-CHK-008 | Field validation | Identify missing or invalid required fields and show clear inline messages. |


### 10.2 Delivery, payment and order review

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-CHK-009 | Delivery method | Display available delivery methods based on the destination and business configuration. |
| ST-CHK-010 | Delivery charge | Display the applicable delivery charge before order placement when shipping rules are available. |
| ST-CHK-011 | Payment method | Display configured payment methods, which may include Cash on Delivery and online payment. |
| ST-CHK-012 | Payment instructions | Show relevant instructions for the selected payment method. |
| ST-CHK-013 | Order review | Show products, variants, quantities, subtotal, discounts, delivery charges and final total. |
| ST-CHK-014 | Terms acknowledgement | Collect required acceptance of applicable terms and policies before order submission. |
| ST-CHK-015 | Order placement | In production, submit the order only after required details and validations are complete. |
| ST-CHK-016 | Duplicate submission prevention | Prevent accidental duplicate order submissions caused by repeated clicks or refreshes. |
| ST-CHK-017 | Order confirmation | After successful production order creation, display an order reference and confirmation details. |
| ST-CHK-018 | Failed submission | If order creation fails, preserve entered information where safe and explain how to retry. |

Prototype limitation: checkout must simulate the journey and validation using mock data. It must not claim to create a real order, charge a payment method or reserve inventory.


## 11. Customer Accounts


### 11.1 Registration and authentication

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-ACT-001 | Registration form | Collect the required customer name, email and password details. |
| ST-ACT-002 | Input validation | Validate required fields, email format and password rules. |
| ST-ACT-003 | Duplicate account feedback | If an email is already registered, show a clear message and provide a login route. |
| ST-ACT-004 | Login | Allow registered customers to authenticate using the configured credentials. |
| ST-ACT-005 | Invalid login | Show a generic authentication error without exposing sensitive account information. |
| ST-ACT-006 | Forgot password | Provide a password recovery request flow. |
| ST-ACT-007 | Logout | Allow customers to securely end their authenticated session. |
| ST-ACT-008 | Protected account pages | Require authentication to access private account information. |


### 11.2 Account management

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-ACT-009 | Account dashboard | Display useful account shortcuts and a summary of recent activity. |
| ST-ACT-010 | Profile management | Allow customers to view and update permitted personal information. |
| ST-ACT-011 | Address management | Allow customers to add, edit and delete saved delivery addresses. |
| ST-ACT-012 | Order history | Display orders associated with the authenticated customer account. |
| ST-ACT-013 | Order details | Display order reference, date, items, totals, payment and delivery status. |
| ST-ACT-014 | Order tracking | Display available order status and tracking information supplied by the order system. |
| ST-ACT-015 | Password change | Allow authenticated customers to change their password using the required verification process. |


## 12. Wishlist


### 12.1 Wishlist behaviour

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-WISH-001 | Add to wishlist | Allow a customer to save an eligible product. |
| ST-WISH-002 | Remove from wishlist | Allow a customer to remove a saved product. |
| ST-WISH-003 | Wishlist listing | Display saved products with current availability and pricing where available. |
| ST-WISH-004 | Move to cart | Allow a customer to add a saved product to the cart, subject to current availability. |
| ST-WISH-005 | Guest wishlist | For the prototype, support temporary wishlist state. Production guest persistence or account merging is a decision to be confirmed. |
| ST-WISH-006 | Unavailable saved product | Retain or clearly mark unavailable items according to the final wishlist policy; do not allow invalid purchase. |


## 13. Reviews and Ratings


### 13.1 Review submission and display

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-REV-001 | Rating selection | Allow an eligible customer to select a star rating using the configured scale. |
| ST-REV-002 | Written review | Allow an eligible customer to submit written feedback within configured length limits. |
| ST-REV-003 | Photo upload | Allow customer-submitted product photos where enabled and subject to file validation. |
| ST-REV-004 | Review eligibility | Apply the business-defined review eligibility policy; verified-purchase rules remain to be confirmed. |
| ST-REV-005 | Review moderation | Support pending, approved and rejected review states in the production workflow. Moderation is performed through the separate Admin Panel. |
| ST-REV-006 | Review display | Display approved reviews with rating, text, date and approved photos. |
| ST-REV-007 | Rating summary | Calculate and display an aggregate rating from eligible published reviews. |
| ST-REV-008 | Upload validation | Validate allowed image types, file size and upload outcome. |
| ST-REV-009 | Review error handling | Show clear feedback if submission or image upload fails. |


## 14. Beauty Journal and Static Content


### 14.1 Content pages

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-CONT-001 | Beauty Journal listing | Display published articles with title, image, excerpt and publication information. |
| ST-CONT-002 | Article detail | Display the full published article and related content where available. |
| ST-CONT-003 | Ingredient guide | Display ingredient information supplied and approved by the business. |
| ST-CONT-004 | Routine guides | Display published skincare or beauty routine guides. |
| ST-CONT-005 | Static information pages | Provide About Us, Contact Us, FAQs, Delivery Information, Returns & Refunds, Privacy Policy and Terms & Conditions. |
| ST-CONT-006 | Content availability | Do not display unpublished or unavailable content as live content. |
| ST-CONT-007 | Content navigation | Allow customers to navigate between articles, guides and relevant products. |


## 15. Promotions and Newsletter


### 15.1 Promotions

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-PROM-001 | Promotion display | Display active promotions and campaigns supplied by the content or commerce service. |
| ST-PROM-002 | Promotion destination | Ensure campaign CTAs lead to the configured category, collection or product destination. |
| ST-PROM-003 | Discount presentation | Display discount values and eligible pricing consistently. |
| ST-PROM-004 | Promotion eligibility | Only apply discounts to eligible products and within configured validity periods. |
| ST-PROM-005 | Expired promotion | Do not display expired promotions as active offers. |


### 15.2 Newsletter

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-NEWS-001 | Email capture | Accept an email address for newsletter subscription. |
| ST-NEWS-002 | Email validation | Reject empty or invalid email formats with a clear message. |
| ST-NEWS-003 | Consent | Display any required subscription consent notice. |
| ST-NEWS-004 | Subscription feedback | Show success, already-subscribed or failure feedback based on the service response. |


## 16. Customer Support


### 16.1 Support access

| ID | Functional requirement | Expected system behaviour / acceptance condition |
| --- | --- | --- |
| ST-SUP-001 | Contact details | Display configured customer support contact information. |
| ST-SUP-002 | Contact form | Collect the configured customer name, contact details, enquiry subject and message. |
| ST-SUP-003 | Form validation | Validate required fields and email or phone formats as applicable. |
| ST-SUP-004 | WhatsApp link | Open the configured WhatsApp contact destination. |
| ST-SUP-005 | Email link | Open the configured email contact destination. |
| ST-SUP-006 | FAQ navigation | Allow customers to browse and access frequently asked questions. |
| ST-SUP-007 | Form submission feedback | Show confirmation when an enquiry is successfully submitted; prototype submissions must be clearly simulated. |


## 17. Cross-Functional Business Rules

| Rule ID | Business rule |
| --- | --- |
| ST-BR-001 | The storefront sells products on behalf of one retailer; it is not a multi-vendor marketplace. |
| ST-BR-002 | Only published and active products, categories, brands and content should be visible to customers. |
| ST-BR-003 | The storefront consumes catalogue and taxonomy data maintained by the separate Admin Panel. |
| ST-BR-004 | A product may be associated with relevant categories, brands, skin types, skin concerns and attributes as supported by the catalogue model. |
| ST-BR-005 | A product must not be represented as suitable for a skin type or concern unless that attribute has been assigned through approved product data. |
| ST-BR-006 | The displayed price must remain consistent across listing, detail, cart and checkout views. |
| ST-BR-007 | A product or variant that is unavailable must not be accepted for purchase in the production system. |
| ST-BR-008 | Discounts must be applied only according to configured eligibility and validity rules. |
| ST-BR-009 | Guest and registered orders must be handled by the same central order system in production. |
| ST-BR-010 | Guest checkout must not silently create a customer account. |
| ST-BR-011 | Customer-submitted reviews and photos must follow configured moderation and content policies. |
| ST-BR-012 | The frontend prototype must clearly distinguish simulated actions from real production transactions. |


## 18. Validation and Error Handling

| Scenario | Expected behaviour |
| --- | --- |
| Required field missing | Highlight the field and explain what is required. |
| Invalid email or phone | Show a clear format error without clearing other valid inputs. |
| No search matches | Show a no-results message and recovery suggestions. |
| No products in category | Show an empty state and links to broader shopping destinations. |
| Invalid quantity | Prevent values below the minimum or above permitted availability. |
| Product becomes unavailable | Notify the customer and prevent checkout with the unavailable item. |
| Discount code invalid or expired | Explain that the code cannot be applied; retain cart contents. |
| Payment failure | Show failure status and safe retry guidance; do not show an order as paid. |
| Order submission failure | Do not show a success confirmation; prevent duplicate submissions. |
| Image upload failure | Explain the issue and allow the customer to retry. |
| Session expires | Request re-authentication for protected actions and preserve safe, non-sensitive state where possible. |
| Page not found | Show a branded not-found page with navigation back to shopping. |


## 19. Non-Functional and Interface Requirements

| ID | Requirement |
| --- | --- |
| ST-NFR-001 | Responsive behaviour across desktop, tablet and mobile. |
| ST-NFR-002 | Optimised product and campaign image loading. |
| ST-NFR-003 | Accessible form labels, keyboard interactions and sufficient colour contrast. |
| ST-NFR-004 | Consistent premium design system and reusable interface components. |
| ST-NFR-005 | SEO-friendly page titles, descriptions and URL structure. |
| ST-NFR-006 | Secure handling of customer data and authentication in production. |
| ST-NFR-007 | Modern browser compatibility. |
| ST-NFR-008 | Scalable rendering of new categories and product attributes. |
| ST-NFR-009 | Clear loading, empty, success and error states. |
| ST-NFR-010 | Avoid exposing internal or sensitive system errors to customers. |


## 20. Frontend Prototype Requirements

| Area | Prototype expectation |
| --- | --- |
| Data | Use realistic mock products, brands, categories, customer accounts, reviews and orders. |
| Navigation | All visible navigation links must lead to a relevant prototype page or state. |
| Search and filters | Operate against mock catalogue data. |
| Cart and wishlist | Update client-side state and recalculate displayed totals. |
| Checkout | Demonstrate guest and registered flows with client-side validation; do not submit real orders. |
| Authentication | Use simulated states only; do not collect real passwords for a non-production prototype. |
| Reviews | Demonstrate rating, text and photo-upload UI; do not publish to a live review system. |
| Admin-managed data | Represent categories, products and promotions as mock data; do not build admin editing screens here. |
| Responsive layouts | Demonstrate the agreed layouts at mobile, tablet and desktop widths. |
| Status messaging | Clearly label simulated success and failure outcomes where users could mistake them for live transactions. |


## 21. Acceptance Criteria and QA Checklist

1. Customer can navigate all approved storefront sections.

1. Published category and subcategory data is rendered dynamically.

1. Customer can browse products by category and brand.

1. Customer can search products and brands.

1. Customer can apply, remove and clear filters.

1. Customer can change product sorting.

1. Product detail page displays available product information and variants.

1. Customer can add, update and remove cart items.

1. Cart totals update correctly when quantities or items change.

1. Customer can save and remove wishlist items.

1. Guest checkout flow can be completed in the prototype.

1. Registered checkout flow can be demonstrated in the prototype.

1. Required checkout fields show validation errors.

1. Skin type and skin concern discovery return matching mock products.

1. Review interface supports star rating, written review and photo selection.

1. Customer account pages and order history are accessible in the prototype.

1. Promotional and content links navigate to the correct destinations.

1. Mobile, tablet and desktop layouts are usable.

1. Loading, empty, error and success states are represented.

1. No prototype action falsely indicates a real payment or live order.


## 22. Dependencies and Open Decisions

| ID | Dependency / decision | Status / owner |
| --- | --- | --- |
| DEP-01 | Approved product catalogue, brands and product data | Business owner – pending |
| DEP-02 | Final category and attribute taxonomy | Admin Panel requirements – pending |
| DEP-03 | Final brand name, logo and visual identity | Business owner – pending |
| DEP-04 | Delivery providers, zones and rates | Business owner – pending |
| DEP-05 | Payment methods and gateway configuration | Business owner – pending |
| DEP-06 | Returns, refunds and cancellation policy | Business owner – pending |
| DEP-07 | Guest wishlist persistence and account merging | Product owner – to confirm |
| DEP-08 | Review eligibility and verified-purchase policy | Product owner – to confirm |
| DEP-09 | Review image file limits and moderation policy | Business owner – to confirm |
| DEP-10 | Newsletter provider and consent wording | Business owner – to confirm |
| DEP-11 | Guest order lookup and tracking method | Product owner – to define |
| DEP-12 | Final multilingual rollout plan | Future release |


## 23. Traceability to PRD

This FRD elaborates the Storefront PRD v1.0. The PRD remains the source for product vision, business objectives and release scope. This FRD specifies functional behaviour and testable conditions. The Storefront Sitemap will separately define the complete page hierarchy and navigation structure.

| PRD area | FRD coverage |
| --- | --- |
| Homepage and navigation | Sections 3–4 |
| Catalogue, categories and brands | Section 5 |
| Product listings, search and filters | Section 6 |
| Product details | Section 7 |
| Skin type and concern discovery | Section 8 |
| Cart and checkout | Sections 9–10 |
| Customer accounts and wishlist | Sections 11–12 |
| Reviews and ratings | Section 13 |
| Beauty content, promotions and support | Sections 14–16 |
| Business rules and validations | Sections 17–18 |
| Non-functional requirements and prototype scope | Sections 19–20 |
| Acceptance criteria and dependencies | Sections 21–22 |


## 24. Document Approval

This document defines the functional requirements for the customer-facing Storefront application. Requirements that depend on unresolved business policies are identified as open decisions and must be confirmed before production implementation.

| Approval role | Name / signature | Date |
| --- | --- | --- |
| Business Owner / Product Owner |  |  |
| Project Manager |  |  |
| Stakeholder |  |  |

END OF STOREFRONT FRD – VERSION 1.0

---

## Appendix C — Source Specification: Sitemap and User Flows

The following section preserves the detailed sitemap, page inventory, customer journeys, transition guidance, validation checklist and open decisions from the source document.

## Document Control and Scope

| Item | Definition |
| --- | --- |
| Purpose | Define the storefront information architecture, page hierarchy, navigation, user flows and end-to-end customer journeys. |
| In scope | Customer-facing pages and journeys from discovery through checkout, account use, reviews and support. |
| Out of scope | Admin Panel pages, staff workflows, catalogue management interfaces, backend architecture and payment-provider configuration. |
| Separate application | The Admin Panel will have its own PRD, FRD, Sitemap and User Journey documentation. |
| Taxonomy principle | The storefront must render published categories and subcategories dynamically from catalogue data. The examples in this document are an initial proposed structure, not a hardcoded permanent list. |
| Prototype principle | Prototype interactions may use mock data and simulated outcomes. Production integrations must be separately implemented and tested. |


## 1. Product and Navigation Principles

- The storefront is a premium, responsive multi-brand beauty and cosmetics shopping experience for customers in Sri Lanka.

- The primary navigation should make product categories, brands, curated collections and beauty discovery easy to reach.

- Customers must be able to discover products by category, brand, keyword, skin type and skin concern.

- A product detail page is a central destination and should be reachable from all relevant discovery routes.

- Both guest checkout and registered-customer checkout must be supported.

- The storefront should provide clear feedback for loading, empty, unavailable, validation, success and failure states.

- The initial interface language is English. The structure should not prevent additional languages being introduced later.

- The design must support desktop, tablet and mobile screen sizes.


## 2. Sitemap – High-Level Hierarchy

This hierarchy is the proposed customer-facing structure. Labels, category depth and page availability can be refined during UX design.

STOREFRONT │ ├── 1. Home │ ├── 2. Shop │ ├── Shop All │ └── Dynamic Product Categories │ ├── Skincare │ │ ├── Cleansers │ │ ├── Toners │ │ ├── Moisturisers │ │ ├── Sunscreens │ │ ├── Exfoliators │ │ └── Masks & Treatments │ ├── Face Creams & Serums │ │ ├── Day & Night Creams │ │ ├── Brightening / Hydrating Creams │ │ ├── Anti-Ageing Creams │ │ ├── Face Serums │ │ └── Eye Creams & Face Oils │ ├── Body Care │ │ ├── Body Lotions & Creams │ │ ├── Body Washes │ │ ├── Body Scrubs │ │ └── Hand & Foot Care │ ├── Makeup │ │ ├── Face │ │ ├── Eyes │ │ ├── Lips │ │ └── Makeup Tools │ ├── Hair Care │ │ ├── Shampoo & Conditioner │ │ ├── Hair Oils & Serums │ │ └── Hair Masks & Treatments │ ├── Fragrance │ │ ├── Women's │ │ ├── Men's │ │ ├── Unisex │ │ └── Body Mists │ └── Beauty Tools & Accessories │ ├── 3. Brands │ ├── All Brands │ └── Brand Detail │ ├── 4. Collections │ ├── New Arrivals │ ├── Best Sellers │ ├── Trending │ ├── Featured Products │ ├── Offers │ └── Gift Sets / Bundles │ ├── 5. Beauty Discovery │ ├── Shop by Skin Type │ │ ├── Normal / Dry / Oily / Combination / Sensitive │ ├── Shop by Skin Concern │ │ ├── Acne / Dryness / Uneven Tone / Dark Spots │ │ ├── Dullness / Fine Lines / Dehydration / Texture │ ├── Ingredients Guide │ ├── Skincare Routine Guides │ └── Beauty Journal │ ├── Article Listing │ └── Article Detail │ ├── 6. Search Results │ ├── 7. Product Detail │ ├── 8. Wishlist │ ├── 9. Shopping Cart │ ├── 10. Checkout │ ├── Customer Information (guest or signed-in) │ ├── Delivery Address │ ├── Delivery Method │ ├── Payment Method │ ├── Order Review │ └── Order Confirmation │ ├── 11. Customer Account │ ├── Register / Login / Forgot Password │ ├── Account Dashboard │ ├── Profile │ ├── Saved Addresses │ ├── My Orders │ ├── Order Details / Tracking │ ├── My Wishlist │ └── My Reviews │ └── 12. Information & Support ├── About Us ├── Contact Us ├── FAQs ├── Delivery Information ├── Returns & Refunds ├── Privacy Policy └── Terms & Conditions


## 3. Sitemap – Page Inventory

| Page / template | Purpose and key content | Main entry points / actions |
| --- | --- | --- |
| Home | Brand introduction, campaign hero, category shortcuts, featured products, brands, collections and beauty discovery. | Logo, direct visit; browse, search, open category/product. |
| Shop All | All published and purchasable products with filtering and sorting. | Shop menu; filter, sort, open PDP. |
| Category landing/listing | Category title, optional description/banner, child categories and matching products. | Navigation, homepage tiles, breadcrumbs; browse products. |
| Brand directory | Searchable or browsable list of published brands. | Brands navigation; open brand. |
| Brand detail | Brand identity, description and products associated with the brand. | Brand directory, product brand link; browse products. |
| Collection listing | Curated group such as New Arrivals, Best Sellers, Trending or Offers. | Homepage, navigation, campaign links; open products. |
| Skin type results | Products tagged for the selected skin type, with explanatory content where supplied. | Beauty Discovery; refine and open product. |
| Skin concern results | Products tagged for the selected concern, with explanatory content where supplied. | Beauty Discovery; refine and open product. |
| Ingredients guide | Educational information about ingredients and related products. | Beauty Discovery, article links. |
| Routine guide | Editorial routine or educational content with relevant product links. | Beauty Discovery, journal and PDP links. |
| Beauty Journal listing | Published articles and editorial cards. | Navigation/footer; open article. |
| Article detail | Full article content, images and related content/products. | Journal listing and internal links. |
| Search results | Search query, matching products/brands and filters. | Global search; refine or open result. |
| Product detail (PDP) | Gallery, title, brand, price, variants, availability, description, benefits, ingredients, directions, reviews and related products. | Product cards, search, brand/category/collection pages. |
| Wishlist | Saved products and actions to remove or move to cart. | Header icon, account. |
| Cart | Cart lines, quantities, item totals, discount entry and order subtotal. | Header icon, add-to-cart action. |
| Checkout | Customer details, delivery, payment and order review. | Cart checkout action. |
| Order confirmation | Order reference and confirmation summary after successful submission. | Successful checkout. |
| Register / Login | Customer registration, authentication and password recovery. | Header account, checkout prompt, protected page. |
| Account dashboard | Overview and links to account functions. | Authenticated account menu. |
| Profile | Customer profile details. | Account dashboard/menu. |
| Saved addresses | Create, edit, select and remove delivery addresses. | Account dashboard and checkout. |
| My Orders | Order history and order status summaries. | Account dashboard. |
| Order detail / tracking | Order items, totals, address summary and available delivery status/tracking. | My Orders; guest lookup only if separately approved. |
| My Reviews | Customer's submitted reviews and their publication status where supported. | Account dashboard. |
| Information / policy pages | About, contact, FAQs, delivery, returns, privacy and terms. | Footer and contextual links. |


## 4. Global Navigation Structure

| Element | Desktop behaviour | Mobile behaviour |
| --- | --- | --- |
| Logo | Returns customer to Home. | Returns customer to Home. |
| Shop | Opens mega-menu or category navigation populated from published taxonomy. | Opens expandable category navigation. |
| Brands | Links to All Brands. | Links to brand directory. |
| Collections | Links to configured collection destinations. | Expandable list or collection landing page. |
| Beauty Discovery | Links to skin type, skin concern and educational destinations. | Expandable list or discovery landing page. |
| Search | Search input with submit and optional suggestions. | Search overlay or dedicated search screen. |
| Account | Opens account dashboard or authentication options. | Opens account screen/menu. |
| Wishlist | Opens saved products. | Opens saved products. |
| Cart | Opens cart and displays item count where available. | Opens cart and displays item count where available. |
| Footer | Company, support, policies, contact and social links. | Stacked footer sections. |


## 5. Breadcrumb and URL Guidance

- Use readable, stable slugs for published category, brand, collection, article and product pages.

- Product pages should remain accessible from multiple discovery routes without creating duplicate product records.

- Category breadcrumbs should reflect the published category hierarchy.

- When a category is renamed or its slug changes, preserve an appropriate redirect from the previous URL where technically supported.

- Unpublished or archived categories should not appear in customer navigation or search results.

- Avoid exposing internal database IDs in customer-facing URLs.

- Final URL patterns are subject to technical design and SEO review.

| Page type | Illustrative URL pattern |
| --- | --- |
| Home | / |
| Shop All | /shop |
| Category | /category/{category-slug} |
| Nested category | /category/{parent-slug}/{child-slug} |
| Brand directory | /brands |
| Brand detail | /brand/{brand-slug} |
| Collection | /collection/{collection-slug} |
| Skin type | /skin-type/{skin-type-slug} |
| Skin concern | /skin-concern/{concern-slug} |
| Search | /search?q={search-term} |
| Product | /product/{product-slug} |
| Wishlist | /wishlist |
| Cart | /cart |
| Checkout | /checkout |
| Account | /account |
| Journal article | /journal/{article-slug} |


## 6. User Roles and Journey Context

| User type | Capabilities in storefront |
| --- | --- |
| Guest visitor | Browse, search, filter, view products, use cart, checkout as guest, and use guest wishlist behaviour if enabled. |
| Registered customer | All guest shopping capabilities plus account profile, saved addresses, order history, order details, account wishlist and review history. |
| Returning customer | Log in, revisit saved account information, review previous orders and continue shopping. |
| Customer with an order | Access order confirmation and, when signed in, order history and available tracking details. |

Staff and administrators are not storefront user roles. Their management workflows belong in the separate Admin Panel documentation.


## 7. End-to-End User Journeys and Flows


### 7.1 Journey A – First-time visitor discovers and purchases a product

Goal: Find a suitable product and complete a first purchase without needing an account.

Primary actor: First-time guest customer

Preconditions: Customer arrives from a campaign, search engine, social link or direct visit.

1. Customer lands on Home or a campaign/category landing page.

1. Customer explores categories, featured products, brands or collections.

1. Customer opens a category, brand, collection or search results page.

1. Customer refines the product listing using filters or sorting.

1. Customer opens a Product Detail page and reviews images, price, availability, ingredients, directions and reviews.

1. Customer selects a variant and quantity where applicable.

1. Customer selects Add to Cart and opens the cart.

1. Customer checks cart items, quantities, discounts and totals.

1. Customer selects Checkout and chooses Guest Checkout.

1. Customer enters contact and delivery details.

1. Customer selects an available delivery method and payment method.

1. Customer reviews the order and submits it.

1. Storefront displays confirmation only after successful order submission.

Successful outcome: A guest customer completes the purchase and receives an order reference without an account being silently created.

Alternative / exception paths: Unavailable products, invalid fields, payment failures and order submission failures must be explained; no failure may be shown as a successful order.


### 7.2 Journey B – Browse by category

Goal: Navigate from a broad category to a relevant product.

Primary actor: Guest or registered customer

Preconditions: Customer is on Home or any page with global navigation.

1. Customer opens Shop.

1. Storefront displays currently published categories and subcategories.

1. Customer selects a category or subcategory.

1. Storefront opens the corresponding listing page.

1. Customer applies filters and/or sorting if needed.

1. Customer opens a product card.

Successful outcome: Customer reaches a Product Detail page through category navigation.

Alternative / exception paths: If no products match, show an empty state with an option to clear filters or return to Shop All.


### 7.3 Journey C – Search for a product or brand

Goal: Locate a product or brand using global search.

Primary actor: Guest or registered customer

Preconditions: Search is available in the global header.

1. Customer opens Search.

1. Customer enters a product name, brand or keyword.

1. Customer submits the query or chooses a suggestion if available.

1. Storefront displays matching products and/or brands.

1. Customer refines results or selects a result.

1. Storefront opens the relevant PDP or brand page.

Successful outcome: Customer reaches the intended product or brand destination.

Alternative / exception paths: For no results, preserve the query for editing and provide a route to browse all products.


### 7.4 Journey D – Discover by skin type

Goal: Find products associated with a selected skin type.

Primary actor: Guest or registered customer

Preconditions: Skin type attributes and product associations exist in catalogue data.

1. Customer opens Beauty Discovery.

1. Customer selects Shop by Skin Type.

1. Customer chooses a type such as dry, oily, combination, normal or sensitive.

1. Storefront displays products tagged with that type.

1. Customer optionally combines category or brand filters.

1. Customer opens a product and reviews suitability information.

Successful outcome: Customer sees relevant products and can continue to PDP or cart.

Alternative / exception paths: If no matches exist, show an empty state and allow the customer to broaden the selection.


### 7.5 Journey E – Discover by skin concern

Goal: Find products associated with a selected concern.

Primary actor: Guest or registered customer

Preconditions: Concern attributes and product associations exist in catalogue data.

1. Customer opens Beauty Discovery.

1. Customer selects Shop by Skin Concern.

1. Customer chooses a concern such as acne, dryness, uneven tone, dark spots, dullness or dehydration.

1. Storefront displays associated products.

1. Customer refines results or opens a PDP.

1. Customer reviews product information and directions or precautions.

Successful outcome: Customer reaches a product associated with the selected concern.

Alternative / exception paths: Avoid unsupported medical claims or guaranteed outcomes; show an empty state when no matches exist.


### 7.6 Journey F – Returning customer purchase

Goal: Complete a purchase using an existing account.

Primary actor: Registered customer

Preconditions: Customer has an active account and can authenticate.

1. Customer opens Account and selects Login.

1. Customer enters credentials and submits.

1. After successful authentication, storefront opens the account destination or returns to the intended page.

1. Customer browses or opens a wishlist item.

1. Customer adds a product to Cart and proceeds to Checkout.

1. Storefront offers saved delivery addresses.

1. Customer selects or enters an address.

1. Customer selects delivery and payment options.

1. Customer reviews and submits the order.

1. Storefront displays confirmation after successful order submission.

Successful outcome: Customer completes checkout using their authenticated account.

Alternative / exception paths: Authentication failure shows a safe error and password recovery route; a new address can be entered if none is saved.


### 7.7 Journey G – Registration

Goal: Create a customer account.

Primary actor: New customer

Preconditions: Customer is not authenticated.

1. Customer opens Account and selects Register.

1. Customer enters required registration information.

1. Storefront validates required fields and required consent.

1. Customer submits the form.

1. Production authentication completes registration and any required verification.

1. Storefront opens the account dashboard or shows the next verification step.

Successful outcome: An account is created after successful production registration.

Alternative / exception paths: Show field-level validation and handle duplicate email or verification failure safely.


### 7.8 Journey H – Wishlist

Goal: Save products for later consideration.

Primary actor: Guest or registered customer

Preconditions: Customer is viewing a product card or PDP.

1. Customer selects the wishlist control.

1. Storefront saves the item according to session/account state.

1. Customer opens Wishlist.

1. Customer reviews saved products.

1. Customer removes an item, returns to its PDP or adds it to Cart.

Successful outcome: Customer can revisit and manage saved products.

Alternative / exception paths: Guest persistence and wishlist merge after login are policy decisions; prototype behaviour may be session-based.


### 7.9 Journey I – Submit a product review

Goal: Submit a rating and written review, optionally with a photo.

Primary actor: Eligible customer

Preconditions: Review feature is enabled and customer meets the configured eligibility rules.

1. Customer opens a PDP and navigates to Ratings & Reviews.

1. Customer selects Write a Review.

1. Storefront checks authentication and configured eligibility.

1. Customer selects a star rating and enters review text.

1. Customer optionally uploads product photos.

1. Storefront validates rating, text and files.

1. Customer submits the review.

1. Production workflow stores the review and applies moderation rules.

1. Approved review appears on the PDP; status is shown to the customer where supported.

Successful outcome: Review is submitted and follows the configured moderation/publication process.

Alternative / exception paths: Ineligible customers see a relevant sign-in or eligibility message; invalid files are rejected with guidance.


### 7.10 Journey J – Order history and tracking

Goal: Review an existing order and available delivery status.

Primary actor: Authenticated customer

Preconditions: Customer has an order linked to their account.

1. Customer opens Account.

1. Customer selects My Orders.

1. Storefront displays order summaries.

1. Customer opens an order.

1. Storefront displays items, totals, delivery information and current status.

1. Customer opens tracking information if available.

Successful outcome: Customer can review order details and available tracking updates.

Alternative / exception paths: If no orders exist, show an empty state and Shop Now route. Guest lookup is not assumed until approved.


### 7.11 Journey K – Read beauty content and continue shopping

Goal: Use educational content to discover related products.

Primary actor: Guest or registered customer

Preconditions: Published journal or guide content exists.

1. Customer opens Beauty Discovery or a journal link.

1. Customer browses the article listing.

1. Customer opens an article.

1. Customer reads content and follows related product/category links.

1. Customer opens a PDP and may add a product to Cart.

Successful outcome: Customer moves from educational content to product discovery.

Alternative / exception paths: If content is unavailable, show a not-found state and a route back to Beauty Discovery.


## 8. Checkout Flow – Detailed Step Sequence

| Step | Guest checkout | Registered checkout |
| --- | --- | --- |
| 1. Cart review | Review items, quantities, discounts and subtotal. | Same. |
| 2. Customer details | Enter required name, email and contact details. | Use authenticated customer details; allow permitted updates. |
| 3. Delivery address | Enter delivery address and required locality/contact fields. | Select saved address or add a new one. |
| 4. Delivery method | Choose from available methods for the address. | Same. |
| 5. Payment method | Choose an available method subject to business policy. | Same. |
| 6. Order review | Review items, discounts, delivery fee and grand total. | Same. |
| 7. Submit | Accept required terms and place order. | Same. |
| 8. Confirmation | Show confirmation and order reference after success. | Same; order is also linked to account. |

- Show the current checkout step clearly.

- Identify required fields and validation rules.

- Revalidate order totals before submission.

- Do not show a successful confirmation after payment or order failure.

- Do not silently create an account during guest checkout.

- Payment methods, delivery pricing, COD rules and guest order lookup remain subject to business confirmation.


## 9. Navigation Transitions and Cross-Linking

| From | To | Trigger |
| --- | --- | --- |
| Home | Category / collection / brand / PDP | Navigation, campaign tile or product card. |
| Category listing | Subcategory / PDP | Child category link or product card. |
| Brand directory | Brand detail | Brand card. |
| Brand detail | PDP | Product card. |
| Search results | PDP / brand detail | Search result selection. |
| Skin discovery results | PDP | Product card. |
| Article detail | Category / PDP | Related content or product link. |
| PDP | Cart / Wishlist | Add-to-cart or wishlist action. |
| Cart | Checkout | Checkout action. |
| Checkout | Order confirmation | Successful order submission. |
| Account dashboard | Profile / addresses / orders / wishlist / reviews | Account navigation. |
| My Orders | Order detail | Select an order. |
| Footer | Support / policy pages | Footer link. |


## 10. Important States and Alternative Paths

| Scenario | Expected storefront behaviour |
| --- | --- |
| No products in category | Show a helpful empty state and route to related categories or Shop All. |
| No search results | Show no-results message and allow query editing. |
| Product out of stock | Show unavailable status and prevent purchase. |
| Variant unavailable | Disable unavailable variant and explain availability. |
| Quantity exceeds stock | Prevent invalid quantity and explain allowed availability. |
| Price changes in cart | Revalidate price and show updated total before submission. |
| Invalid / expired promotion | Do not apply discount; preserve cart and explain. |
| Payment failure | Do not mark order as paid; provide safe retry guidance. |
| Order submission failure | Do not show confirmation; preserve safe form state and allow retry. |
| Authentication failure | Show safe error and password recovery route. |
| Protected page as guest | Offer login/register and preserve intended destination where appropriate. |
| Removed category URL | Redirect to replacement where configured or show not-found state. |
| Invalid review upload | Reject file and explain accepted type/size. |
| Network/loading failure | Show retry guidance without implying success. |


## 11. Dynamic Catalogue and Taxonomy Behaviour

The sitemap describes customer-facing destinations, not a fixed catalogue configuration. Category structure is managed separately in the Admin Panel.

- Top-level categories and nested subcategories shown in storefront navigation must be retrieved from published catalogue data.

- A newly created and published category must become available in storefront navigation/listings without a frontend code change.

- The storefront respects publication status, display order, parent-child relationships and configured visibility.

- Category pages use reusable templates rather than separately hardcoded pages for each category.

- Products may be associated with multiple relevant categories, brands, skin types, concerns and supported attributes.

- New taxonomy labels and deeper nesting must render gracefully within agreed UX design limits.

- Category removal or renaming must not create broken journeys; configure redirects or clear not-found handling.


## 12. MVP and Future Classification

| Feature / page | Release | Notes |
| --- | --- | --- |
| Home, Shop All, categories and subcategories | MVP | Taxonomy is dynamically rendered. |
| Brand directory and brand detail | MVP | Subject to initial brand/product data. |
| New Arrivals, Best Sellers and Offers | MVP | Show configured and populated collections. |
| Search, listings, filters and PDP | MVP | Core product discovery and purchase. |
| Skin type and concern discovery | MVP | Requires product tagging. |
| Cart and guest/registered checkout | MVP | Real integrations may follow prototype. |
| Registration, login and account basics | MVP | Prototype may simulate authentication. |
| Wishlist | MVP | Guest persistence policy to be confirmed. |
| Ratings and written/photo reviews | MVP scope | Eligibility, moderation and upload limits require policy. |
| About, Contact, FAQs and policy pages | MVP | Final copy supplied by business. |
| Beauty Journal / guides | MVP structure | Launch content volume to be confirmed. |
| Beauty quiz / routine builder | Future | Explicitly excluded from initial MVP. |
| Advanced personalisation/recommendations | Future | Not required for initial prototype. |
| Additional languages | Future | English initially; allow future extension. |


## 13. UX, Accessibility and Responsive Considerations

- Maintain consistent global header, footer, typography, spacing and interaction patterns.

- Make primary shopping actions easy to identify on desktop and mobile.

- Provide clear focus, hover, selected, disabled and error states.

- Use meaningful labels and alternative text for product and editorial images.

- Do not rely on colour alone to communicate stock, validation or selection.

- Make filters usable on mobile through a filter drawer or dedicated screen.

- Product cards should consistently show image, name, brand, price and availability/offer where relevant.

- Provide loading, empty and error states.


## 14. Prototype Validation Checklist

| ID | Validation item | Expected result |
| --- | --- | --- |
| SJ-AC-01 | Global navigation | All visible links navigate to correct storefront pages. |
| SJ-AC-02 | Dynamic categories | Navigation renders from structured data, not hardcoded page lists. |
| SJ-AC-03 | Category browsing | Customer moves from Shop to category, subcategory and PDP. |
| SJ-AC-04 | Brand discovery | Customer browses brands and brand-specific products. |
| SJ-AC-05 | Search | Search results and no-results state are demonstrated. |
| SJ-AC-06 | Filters | Filters combine, clear and update products correctly. |
| SJ-AC-07 | Skin discovery | Skin type and concern routes show associated products. |
| SJ-AC-08 | PDP | Product details, variants, quantity and availability states are represented. |
| SJ-AC-09 | Cart | Add, remove and quantity update work; totals recalculate. |
| SJ-AC-10 | Guest checkout | Guest journey completes with validation and simulated confirmation. |
| SJ-AC-11 | Registered checkout | Signed-in journey and saved-address selection are demonstrated. |
| SJ-AC-12 | Account | Login/register, profile, addresses and order pages are represented. |
| SJ-AC-13 | Wishlist | Products can be saved, removed and moved to cart. |
| SJ-AC-14 | Reviews | Rating, written review and photo selection are represented. |
| SJ-AC-15 | Responsive layout | Core journeys work on desktop, tablet and mobile. |
| SJ-AC-16 | Exception states | Empty, unavailable, invalid, loading and failure states are demonstrated. |


## 15. Dependencies and Open Decisions

| ID | Decision / dependency | Impact |
| --- | --- | --- |
| SJ-OD-01 | Final brand name, logo and identity | Affects visual design, header, footer and metadata. |
| SJ-OD-02 | Final category and subcategory taxonomy | Affects navigation labels; taxonomy remains dynamic. |
| SJ-OD-03 | Product attributes and filter rules | Determines listing filters and skin discovery. |
| SJ-OD-04 | Delivery zones, methods and fees | Required for checkout and delivery information. |
| SJ-OD-05 | Payment methods and COD policy | Required for production checkout. |
| SJ-OD-06 | Returns, refunds and cancellation policy | Required for policy pages and order support. |
| SJ-OD-07 | Review eligibility and moderation | Determines review submission and publication. |
| SJ-OD-08 | Guest wishlist persistence and login merge | Determines guest save behaviour. |
| SJ-OD-09 | Guest order lookup policy | Determines whether guest tracking is offered. |
| SJ-OD-10 | Journal content and launch volume | Determines launch content availability. |
| SJ-OD-11 | Product comparison | Confirm whether comparison is in MVP. |
| SJ-OD-12 | Newsletter provider and consent wording | Required for production subscriptions. |


## 16. Relationship to PRD and FRD

This document translates the customer-facing scope in Storefront PRD v1.0 and Storefront FRD v1.0 into page hierarchy and customer journey models. It does not replace functional requirements, detailed UI specifications, database design or technical architecture.

| Reference | Relationship |
| --- | --- |
| Storefront PRD v1.0 | Business scope, target audience, Sri Lankan market context, product discovery and release boundaries. |
| Storefront FRD v1.0 | Functional behaviours mapped to pages and journeys: search, filters, PDP, cart, checkout, account, wishlist, reviews and support. |
| Admin Panel documentation | Separate documents will specify staff-facing taxonomy, product, order, customer, promotion and content management workflows. |


## 17. Review and Approval

This is the initial Storefront Sitemap and User Journey baseline. Review the page hierarchy, navigation labels, journey steps and MVP boundaries before UX design and frontend prototyping. Material changes should be reflected in the PRD, FRD and this document.

| Approval role | Name / signature | Date |
| --- | --- | --- |
| Business Owner / Product Owner |  |  |
| Project Manager / Business Analyst |  |  |
| Stakeholder |  |  |

END OF DOCUMENT – STOREFRONT SITEMAP & USER FLOWS v1.0

---

## Appendix D — Implementation Notes

1. Build the Storefront as a separate customer-facing application.
2. Keep all catalogue-driven navigation data-driven. Do not hardcode the category tree into page components.
3. Use reusable templates for category, brand, collection, product, article and account pages.
4. Keep all money values formatted as LKR and ensure totals are calculated consistently.
5. Validate stock, prices, promotions, delivery and payment eligibility on the server in production; frontend validation is supplementary.
6. Treat mock data and simulated payment/order outcomes as prototype-only.
7. Do not implement Admin Panel screens inside the Storefront.
8. Confirm all open decisions with the business before production release.

**End of Storefront System Specification v1.0**
