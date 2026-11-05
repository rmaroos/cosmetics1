# Storefront Design Specification

**Document:** `storefrontdesign.md`\
**Product:** Multi-brand Beauty & Cosmetics E-commerce Storefront\
**Market:** Sri Lanka\
**Version:** 1.0\
**Status:** Design baseline -- ready for design review and stakeholder
sign-off\
**Related specification:** `storefrontsystem.md`\
**Document scope:** Customer-facing storefront only. The Admin Panel is
a separate application and is not specified here.

------------------------------------------------------------------------

## 1. Document purpose

This document defines the visual design direction, design system, page
layouts, reusable components, responsive behaviour, interaction
patterns, accessibility expectations and implementation guidance for the
customer-facing beauty e-commerce storefront.

It consolidates the patterns observed in four supplied visual
references:

1.  **Barcelona Beauty** -- premium editorial photography, structured
    navigation, full-width hero, product carousels and split collection
    features.
2.  **Glowing Beauty** -- natural skincare aesthetic, split hero,
    circular category discovery, promotional campaign cards and tabbed
    product collections.
3.  **Esthetic Beauty** -- elegant serif typography, botanical details,
    soft neutral backgrounds, asymmetric hero, circular categories and
    restrained product presentation.
4.  **EM BEL Beauty** -- blush-pink campaign styling, compact two-layer
    header, circular category navigation, tabbed product grids, ratings
    and promotional badges.

The purpose is not to copy any one reference. The final storefront
should combine the strongest patterns into one coherent, ownable design
system appropriate for a multi-brand beauty retailer serving Sri Lankan
customers.

This is a design specification, not a final brand identity. The business
name, approved logo, final brand colours, licensed fonts and final
photography remain subject to confirmation.

## 2. Product and business context

The storefront represents a retailer that purchases and physically
stocks products from multiple beauty brands and sells them directly to
customers. It is not a third-party marketplace.

The visual experience must support:

-   Skincare, makeup, hair care, body care, fragrance, beauty tools and
    accessories.
-   Browsing by product category, brand, skin type and skin concern.
-   Product discovery through campaigns, collections, editorial content
    and search.
-   Product detail pages with ingredients, benefits, usage information
    and relevant attributes.
-   Guest checkout and registered-customer checkout.
-   Sri Lankan currency, contact and delivery conventions.
-   Mobile-first shopping and a clear, trustworthy checkout experience.

The storefront and Admin Panel are separate applications. The Admin
Panel controls catalogue data, taxonomy, products, brands, campaigns and
content. The storefront consumes published data and presents it to
customers. The storefront must not hardcode categories, brands, product
types, skin types, skin concerns, collections or campaign content.

## 3. Design vision and experience principles

### 3.1 Design vision

Create a premium, modern, approachable beauty-shopping experience that
feels editorial and trustworthy while remaining simple to browse and
purchase from.

The experience should communicate product quality, product authenticity,
clarity and confidence. It should be visually attractive without slowing
down the customer's path to a product or checkout.

### 3.2 Core principles

1.  **Product-first presentation:** Product imagery, names, prices and
    useful product information must be easy to scan.
2.  **Editorial beauty storytelling:** Use high-quality lifestyle and
    campaign photography to create an aspirational brand atmosphere.
3.  **Simple discovery:** Customers should quickly find products through
    categories, brands, skin types, concerns, search and curated
    collections.
4.  **Consistent visual language:** Colours, typography, spacing, image
    ratios and component behaviour must be consistent across pages.
5.  **Trust and transparency:** Show clear prices, availability,
    delivery information, product details, reviews and relevant
    authenticity assurances.
6.  **Mobile-first usability:** Navigation, filters, product cards, cart
    and checkout must work comfortably on small screens.
7.  **Configurable content:** Campaigns, banners, categories and product
    collections must be driven by published content and catalogue data.
8.  **Accessible interaction:** Controls must be understandable,
    keyboard accessible and visually distinguishable.
9.  **Performance-aware design:** Use appropriately sized images,
    restrained animation and efficient page composition.
10. **Conversion without pressure:** CTAs should be clear and prominent
    without intrusive pop-ups or excessive promotional noise.

## 4. Consolidated visual direction

### 4.1 Recommended direction

Use a **modern editorial beauty aesthetic with warm neutral foundations
and a restrained botanical/rose accent**.

The references collectively suggest the following approach:

-   Use Barcelona's premium photography and strong product
    merchandising.
-   Use Glowing's category shortcuts and clear product-discovery
    sections.
-   Use Esthetic's refined serif display typography and spacious
    layouts.
-   Use EM BEL's blush campaign treatment, product ratings and compact
    product grids.

Do not combine all reference colours equally. The final design should
use one primary brand accent and a limited supporting palette. A muted
rose or dusty blush can be explored as the brand accent, with warm ivory
and charcoal as foundations. Botanical sage may be used sparingly for
secondary states or campaign-specific content, not as a competing
primary brand colour. Deep navy may be used only if confirmed as part of
the final brand identity.

### 4.2 Brand identity is not yet final

The following are not approved and must not be treated as final:

-   Store name or wordmark.
-   Logo symbol.
-   Exact brand colour values.
-   Font family licences.
-   Final photography direction.
-   Brand-specific tone of voice.

Do not use "Barcelona", "Glowing", "Esthetic" or "EM BEL" as the actual
store brand. These are reference names only. Do not use the temporary
concept name ÉLORA BEAUTY as an approved identity.

### 4.3 Visual mood

The intended mood is:

-   Premium, but not intimidating.
-   Feminine-leaning beauty editorial, while remaining inclusive of all
    customers.
-   Clean, calm and contemporary.
-   Natural and authentic rather than overly glossy.
-   Warm and approachable.
-   Product-focused, with selective campaign storytelling.

## 5. Colour system

### 5.1 Provisional semantic palette

Exact hex values are provisional design tokens and must be validated
against the approved logo and brand identity before production.

  --------------------------------------------------------------------------------
  Token                                      Suggested value Purpose
  ----------------------------- ---------------------------- ---------------------
  `color-brand-primary`                            `#B9787D` Primary brand accent;
                                                             buttons and selected
                                                             controls

  `color-brand-primary-hover`                      `#A8666C` Hover/pressed state

  `color-brand-soft`                               `#F6E9E8` Soft promotional
                                                             panels and selected
                                                             backgrounds

  `color-brand-pale`                               `#FBF5F4` Very light
                                                             brand-tinted
                                                             background

  `color-sage`                                     `#879486` Optional secondary
                                                             botanical accent

  `color-ink`                                      `#242326` Main text and
                                                             headings

  `color-text-secondary`                           `#68666A` Supporting text

  `color-text-muted`                               `#8B888B` Metadata and helper
                                                             text

  `color-background`                               `#FFFFFF` Main page background

  `color-surface`                                  `#FAF9F8` Cards and subtle
                                                             section backgrounds

  `color-border`                                   `#EAE6E4` Dividers and borders

  `color-success`                                  `#397653` Success and available
                                                             status

  `color-warning`                                  `#A96A19` Warning status

  `color-error`                                    `#B43D42` Validation and error
                                                             status

  `color-info`                                     `#356C91` Informational status
  --------------------------------------------------------------------------------

These values establish a starting point, not a final colour approval.
The design team may adjust hue, saturation and contrast after logo and
photography selection.

### 5.2 Colour usage rules

-   White or warm white should remain the dominant page background.
-   Use the primary accent for primary CTAs, selected tabs, links where
    appropriate and small brand highlights.
-   Use pale blush for selected campaign panels, promotional strips and
    occasional product-image backdrops.
-   Use charcoal for primary text; do not use pale pink or light grey
    for essential text.
-   Use sage only as a secondary accent, not as a second primary brand
    colour.
-   Sale, error, success and warning colours must be semantically
    consistent.
-   Never communicate status using colour alone; pair it with text or an
    icon.
-   Maintain WCAG AA contrast for normal text and interactive controls.

### 5.3 Colour themes

The initial storefront should launch with one approved light theme. Dark
mode is not an MVP requirement. If dark mode is introduced later, it
must be designed as a complete semantic theme rather than simply
inverting colours.

## 6. Typography system

### 6.1 Typography direction

Use a two-family typography system:

-   **Display typeface:** refined serif for campaign headlines and
    selected section headings.
-   **Interface typeface:** highly legible sans-serif for navigation,
    body copy, product names, prices, forms and controls.

The serif/sans-serif pairing is inspired by Esthetic and EM BEL, while
retaining the clarity and modern feel of Barcelona and Glowing.

Possible font families for evaluation include a licensed or
appropriately hosted editorial serif such as Cormorant Garamond or DM
Serif Display, paired with a sans-serif such as Inter, Manrope or DM
Sans. These are candidates only; final selection requires visual
testing, language coverage and licence review.

### 6.2 Type scale

Use a responsive type scale. Values below are starting points in CSS
pixels.

  Token          Desktop   Mobile Weight / use
  ------------ --------- -------- -------------------------
  Display XL      56--64   36--42 Hero campaign headline
  Display L       44--52   32--36 Major campaign heading
  H1              40--48   30--36 Page title
  H2              30--36   26--30 Main section title
  H3              24--28   22--24 Subsection title
  H4              20--22   18--20 Card or content heading
  Body L              18   16--18 Introductory copy
  Body                16   15--16 Standard body text
  Body S              14   13--14 Supporting content
  Caption         12--13       12 Metadata and labels
  Micro           11--12   11--12 Small badges only

### 6.3 Typography rules

-   Use display serif selectively; do not use it for long descriptions,
    forms or dense product data.
-   Use sans-serif for product names, prices, filters, navigation and
    checkout.
-   Keep body line-height around 1.45--1.65.
-   Keep headings compact but readable, usually around 1.1--1.25
    line-height.
-   Avoid excessive all-caps. Use uppercase only for short eyebrow
    labels or selected product metadata.
-   Avoid very small text for prices, delivery notes and important
    product information.
-   Use consistent font weights; do not introduce many unrelated
    weights.
-   Support Unicode and the characters needed for Sri Lankan names and
    addresses.

## 7. Layout, grid and spacing

### 7.1 Global layout

-   Use a centred content container.
-   Recommended maximum content width: approximately 1,280--1,360 px on
    large desktop screens.
-   Use fluid side padding.
-   Avoid content touching the viewport edges except for intentional
    full-bleed hero and campaign imagery.
-   Use consistent section spacing and alignment.
-   Product grids should align with the same container as section
    headings.

### 7.2 Responsive container guidance

  ------------------------------------------------------------------------
  Viewport                    Suggested side padding Layout
  --------------------- ---------------------------- ---------------------
  Small mobile:                                16 px Single column or
  320--374 px                                        horizontal carousel

  Mobile: 375--767 px                      16--20 px 2-column product grid
                                                     where viable

  Tablet: 768--1023 px                     24--32 px 2--3 columns

  Desktop: 1024--1439                      32--48 px 3--4 columns
  px                                                 

  Large desktop: 1440     48 px or centred max-width 4--5 columns where
  px+                                                product imagery
                                                     remains legible
  ------------------------------------------------------------------------

These are layout targets, not rigid breakpoints. The implementation
should use content-driven breakpoints and test intermediate widths.

### 7.3 Spacing scale

Use a consistent 4 px base spacing system.

  Token          Value
  ------------ -------
  `space-1`       4 px
  `space-2`       8 px
  `space-3`      12 px
  `space-4`      16 px
  `space-5`      20 px
  `space-6`      24 px
  `space-8`      32 px
  `space-10`     40 px
  `space-12`     48 px
  `space-16`     64 px
  `space-20`     80 px
  `space-24`     96 px

Typical desktop section spacing: 64--88 px. Typical mobile section
spacing: 40--56 px. Adjust based on content density.

### 7.4 Grid rules

-   Product grids should use equal-width columns and consistent gaps.
-   Category cards should align evenly.
-   Campaign banners should maintain a consistent ratio within a row.
-   Use CSS Grid for product and category layouts, and Flexbox for
    component-level alignment.
-   Avoid fixed widths that cause horizontal overflow.
-   Maintain consistent image frames across cards in the same
    collection.

## 8. Photography and image direction

### 8.1 Overall photography style

Photography is a major part of the storefront identity. The supplied
references use close-up beauty portraits, skincare application, product
still-life and botanical ingredients.

Use a balanced image library containing:

1.  **Lifestyle photography:** people using beauty products, natural
    expressions and authentic skin texture.
2.  **Product photography:** clear, high-resolution product images,
    ideally with consistent backgrounds and angles.
3.  **Ingredient photography:** botanical ingredients, textures and
    product formulations.
4.  **Campaign photography:** seasonal, collection-led and editorial
    compositions.
5.  **Instructional imagery:** product application and routine steps
    where useful.

### 8.2 Image quality and treatment

-   Use high-resolution source images with responsive derivatives.
-   Avoid stretching or distorting products and people.
-   Use `object-fit: cover` for lifestyle and category imagery where
    cropping is intended.
-   Use `object-fit: contain` for product pack shots where the full
    package must remain visible.
-   Use consistent background treatment for product cards.
-   Avoid excessive overlays, filters or retouching.
-   Keep skin texture and product appearance realistic.
-   Ensure text placed over images has sufficient contrast.
-   Supply meaningful alt text for informative images; decorative
    imagery should have empty alt text.

### 8.3 Image ratios

  Image type                  Recommended ratio   Behaviour
  --------------------------- ------------------- ----------------------------
  Main hero                   16:6 to 16:7        Full-width or split layout
  Category circle             1:1                 Circular crop
  Category rectangular card   4:5 or 3:4          Cover crop
  Product card                1:1                 Contain for pack shot
  Product detail main image   1:1 or 4:5          Contain
  Promotional banner          16:7 or 5:2         Cover
  Editorial card              4:5                 Cover
  Brand logo                  Original ratio      Contain

The final ratio can vary by photography composition and screen size.

### 8.4 Image loading

-   Use responsive `srcset`/sizes or framework image optimisation.
-   Lazy-load below-the-fold images.
-   Prioritise the hero/LCP image.
-   Reserve image dimensions to prevent layout shifts.
-   Provide a neutral placeholder or skeleton while images load.
-   Provide a graceful fallback if an image is missing.
-   Avoid loading desktop-sized campaign assets on small mobile screens
    when a mobile crop exists.

## 9. Global storefront shell

### 9.1 Announcement bar

Optional, configurable strip above the main header.

Content examples: - Delivery promotion. - New collection announcement. -
Seasonal campaign. - Limited-time offer.

Rules: - Keep the message short. - Support a single optional destination
link. - Do not rotate messages too quickly. - If multiple messages
rotate, provide pause/controls and respect reduced-motion preferences. -
On mobile, prevent the message from wrapping into an excessively tall
strip. - Admin-managed content must be published and date-valid before
display.

### 9.2 Utility/header area

Depending on final brand direction, optional utility content may
include: - Country/region. - Language selector. - Customer support
contact. - Account access.

For the initial Sri Lankan storefront, avoid unnecessary country
selectors unless multiple markets are actually supported. English is the
initial language; additional languages may be added later.

### 9.3 Main header

Recommended desktop structure:

-   Logo/wordmark on the left or centred, based on the approved brand
    identity.
-   Main navigation with dynamic category links.
-   Search control.
-   Account shortcut.
-   Wishlist shortcut.
-   Cart/bag shortcut with item count.

The logo must link to the homepage.

Header behaviour: - Remain visually compact. - Use a clear active or
hover state. - Provide accessible labels for icon-only controls. - Cart
count updates when cart contents change. - Search opens or expands an
accessible search interface. - Account links to sign-in/account pages. -
Wishlist links to the saved-products page or sign-in prompt. - Do not
use icons without accessible names.

### 9.4 Navigation

-   Main navigation should expose the most important active published
    categories.
-   Category links must be data-driven.
-   Support nested navigation or mega-menu patterns when category depth
    requires them.
-   A mega menu may include category links, selected collections and a
    campaign image, but should not become a crowded promotional panel.
-   On mobile, use an accessible drawer or full-screen navigation panel.
-   Preserve keyboard navigation and visible focus.
-   Do not display inactive, draft or unpublished categories.
-   Do not hardcode category names or category counts.

### 9.5 Footer

Recommended footer groups:

1.  Customer service -- contact, delivery, returns, FAQs.
2.  Shopping -- categories, brands, new arrivals, best sellers.
3.  About -- company information and brand story.
4.  Policies -- privacy, terms, returns/refunds, delivery policy.
5.  Social -- approved social media links.
6.  Newsletter -- optional email subscription.
7.  Payment/delivery reassurance -- only show methods and claims that
    are actually supported.
8.  Copyright and business details.

Footer content must be responsive and collapsible on smaller screens
where appropriate.

## 10. Homepage design specification

The homepage should combine brand storytelling and efficient product
discovery. It must be modular so sections can be reordered, enabled,
disabled and populated from published content.

### 10.1 Recommended homepage section order

1.  Optional announcement bar.
2.  Main header and navigation.
3.  Hero campaign.
4.  Quick category discovery.
5.  Featured campaign banners or collections.
6.  Best Sellers / New Arrivals / Featured products.
7.  Brand discovery.
8.  Skin type and skin concern discovery.
9.  Editorial or beauty education content.
10. Trust and service information.
11. Newsletter (optional).
12. Footer.

The order may be adjusted after usability testing and commercial
priorities are confirmed.

### 10.2 Hero campaign

Recommended default: a responsive editorial hero with a split
composition on desktop.

Desktop: - Large lifestyle or product campaign image. - Text block
positioned on the left or right according to the image composition. -
Small eyebrow label. - One clear headline. - Optional short
description. - Primary CTA. - Optional secondary CTA. - Optional
carousel indicators if multiple slides are enabled.

Mobile: - Use a dedicated mobile image/crop when available. - Stack
image and text or place text in a legible overlay panel. - Keep headline
and CTA visible without requiring excessive scrolling. - Do not crop the
subject or product awkwardly.

Hero content fields should be configurable: image, mobile image,
eyebrow, title, description, primary CTA label/link, secondary CTA
label/link, background treatment, focal point, schedule and publication
status.

### 10.3 Quick category discovery

Support two visual variants:

-   Circular image shortcuts for product types or popular categories.
-   Rectangular image cards for major shopping departments.

Use one variant or a deliberate combination; do not place several
repetitive category sections back-to-back.

Each category item includes image, label and destination. Category list
and order must come from active published taxonomy or a configurable
curated selection.

### 10.4 Promotional campaign cards

Use one of the following patterns based on content:

-   Two wide side-by-side campaign banners.
-   Three campaign cards in a row.
-   One large image-and-copy feature.
-   Split image and collection/product feature.

Rules: - Maintain consistent card ratios. - Use short campaign copy. -
Provide a clear CTA. - Make the entire card clickable only when its
destination is unambiguous; otherwise make the CTA the link. - Do not
put long text over busy imagery. - Support mobile stacking or horizontal
carousel.

### 10.5 Product collection sections

Supported collection modules: - Best Sellers. - New Arrivals. - Featured
Products. - Trending Products. - On Sale. - Recently Viewed
(optional). - Curated collection. - Related to a skin type or concern.

Collection presentation variants: - Product grid. - Horizontal
carousel. - Tabbed product collections.

Use tabs only when the collections are closely related and switching
content is clear. Do not hide essential products behind tabs
unnecessarily.

Each collection module should support a title, optional description,
optional CTA, collection source, product limit, layout variant and
display order.

### 10.6 Brand discovery

A brand strip or brand grid may show selected brands. Use consistent
logo sizing and neutral backgrounds. If brand logos are unavailable, use
typographic brand names rather than unrelated substitute images.

### 10.7 Skin type and skin concern discovery

Provide clear entry points for: - Skin types. - Skin concerns. -
Relevant curated products or collections.

The design should distinguish a skin type from a skin concern. For
example, "dry skin" is a skin type while "uneven tone" is a concern.
Exact options are controlled by the catalogue and Admin Panel.

A guided beauty quiz is not part of the initial MVP. Do not design the
homepage around a quiz dependency.

### 10.8 Editorial content

Editorial cards can feature routines, ingredient education, beauty tips
and product guides.

Each card should include: - Image. - Category/eyebrow label where
useful. - Article title. - Short excerpt or reading indicator. -
Destination.

Keep editorial content visually distinct from product cards.

### 10.9 Trust and service information

Use a concise service strip or content module for verified benefits such
as: - Islandwide delivery, if confirmed. - Secure payment, if
confirmed. - Customer support. - Authentic product sourcing, if
supported by the business's operational process. - Returns policy, where
applicable.

Do not make unsupported claims such as "100% authentic", "free delivery"
or "same-day delivery" unless the business has approved and can fulfil
them.

## 11. Category and listing pages

### 11.1 Page structure

1.  Breadcrumbs.
2.  Category title and optional description.
3.  Optional category banner.
4.  Optional subcategory shortcuts.
5.  Filter and sort controls.
6.  Result count.
7.  Product grid.
8.  Pagination or load-more pattern.
9.  SEO/editorial content where relevant.

### 11.2 Category visual treatment

-   Keep category title prominent but not oversized.
-   Use a banner only when it adds value.
-   Avoid allowing a large campaign banner to push products too far
    below the fold.
-   Display subcategories as chips, cards or compact links depending on
    count.
-   Maintain a clear distinction between category navigation and
    filters.

### 11.3 Filters

Potential filters include: - Brand. - Price range. - Product type. -
Skin type. - Skin concern. - Benefits. - Ingredients. - Fragrance
family. - Availability. - Rating. - Other relevant product attributes.

Only show filters that are applicable to the current product results.
Filter values must come from available published catalogue data; do not
show empty options.

Desktop: - Sidebar or compact horizontal filter controls depending on
page density.

Mobile: - Filter button opens a drawer or full-screen panel. - Show
applied filter count. - Provide clear "Apply" and "Clear all" actions. -
Keep selected filters visible after the panel closes.

### 11.4 Sorting

Provide relevant sorting options such as: - Recommended. - Newest. -
Price: low to high. - Price: high to low. - Best selling. - Highest
rated.

Only offer sort modes supported by the backend.

### 11.5 Empty and error states

If no products match: - Explain that no products match the selected
filters. - Offer "Clear filters". - Offer relevant alternative category
or search suggestions where possible.

If products fail to load: - Show a retry action and a clear,
non-technical message. - Do not display a blank grid.

## 12. Product cards

### 12.1 Standard product card

Recommended content hierarchy:

1.  Product image.
2.  Optional status badge: Sale, New, Best Seller, Sold Out.
3.  Optional wishlist control.
4.  Product brand.
5.  Product name.
6.  Rating and review count, if available.
7.  Current price.
8.  Original price and discount, if applicable.
9.  Optional short variant/size information.

### 12.2 Product card visual rules

-   Use a consistent square or near-square image frame.
-   Product pack shots should use `contain`.
-   Use neutral or softly tinted backgrounds consistently.
-   Keep card details aligned even when product names wrap.
-   Avoid heavy shadows; use subtle borders or background separation if
    needed.
-   Make the product title and image link to the product detail page.
-   Ensure the wishlist control does not accidentally trigger product
    navigation.
-   Show a clear out-of-stock state; do not imply an unavailable product
    can be purchased.
-   Quick add is optional and should only be used when the product has
    no required variant selection or when variant selection can be
    handled clearly.

### 12.3 Badges

Use a small, consistent badge system: - New. - Best Seller. - Sale. -
Sold Out. - Limited availability, only if accurate.

Do not display multiple competing badges on a single card. Discount
badges should be calculated from valid price data, not manually typed
into design content.

### 12.4 Hover and focus

Desktop hover may: - Slightly reveal a secondary product image, if
available. - Reveal quick actions. - Apply a subtle image transition.

Hover must not be the only way to access a function. Touch and keyboard
users must have equivalent access.

## 13. Product detail page

### 13.1 Desktop layout

Recommended two-column structure:

**Left column** - Main product image. - Thumbnail gallery. - Optional
product video, if available. - Zoom or expanded image viewer.

**Right column** - Breadcrumb. - Brand. - Product name. - Rating and
review count. - Price and discount. - Availability. - Variant/size
selection. - Quantity control. - Add to Cart CTA. - Wishlist action. -
Delivery information. - Short key benefits.

Below the main product area: - Product description. - Key benefits. -
How to use. - Ingredients. - Skin type/concern suitability. - Product
attributes and warnings where relevant. - Reviews and customer photos. -
Related products. - Frequently bought together, if supported.

### 13.2 Mobile layout

-   Product gallery first.
-   Product information directly below.
-   Keep price, availability and Add to Cart easy to find.
-   A sticky Add to Cart bar may be used after the primary CTA scrolls
    out of view.
-   Sticky controls must not cover content or accessibility focus.
-   Avoid a desktop two-column layout compressed into a narrow viewport.

### 13.3 Product information hierarchy

Customers should be able to quickly understand: - What the product is. -
Which brand makes it. - What it does. - Who it is suitable for. - How to
use it. - What ingredients it contains. - Its size/variant. - Whether it
is available. - Its price and delivery implications.

Do not invent product claims, ingredient details, suitability or
results. Display information from approved product data.

### 13.4 Product gallery

-   Use consistent thumbnails.
-   Highlight the active image clearly.
-   Support keyboard operation.
-   Use an accessible modal/lightbox if zoom is supported.
-   Provide meaningful alternative text.
-   Preserve image proportions.

### 13.5 Product variants

Variant controls may include size, shade, colour, fragrance or pack
type, depending on product data.

-   Use buttons, swatches or a select control appropriate to the
    variant.
-   Clearly show the selected option.
-   Show price/availability changes when applicable.
-   Disable unavailable options where appropriate and explain why.
-   Require selection before adding to cart when a choice is mandatory.

### 13.6 Delivery information

Display delivery information in a clear, concise area. Exact delivery
charges, delivery estimates and service availability must be supplied by
the business rules and checkout calculation. Do not hardcode unapproved
delivery promises.

## 14. Search experience

### 14.1 Search entry point

-   Search icon or visible search field in the header.
-   On activation, show an accessible search panel or dedicated search
    page.
-   Focus the search input when opened.
-   Provide a clear close action.

### 14.2 Search suggestions

Where supported, suggestions may include: - Product names. - Brands. -
Categories. - Popular search terms. - Recent searches for the current
customer.

### 14.3 Search results

-   Show query text and result count.
-   Reuse product listing grid and filter patterns.
-   Provide sorting.
-   Provide a useful no-results state.
-   Preserve the search query when navigating back.

Search should tolerate common spelling variations where backend search
capability supports them. Do not promise autocomplete or typo tolerance
until implemented.

## 15. Cart design

### 15.1 Cart entry points

-   Header cart icon with live item count.
-   Cart page.
-   Optional mini-cart drawer after adding an item.

### 15.2 Cart item presentation

Each line item should show: - Product image. - Brand and product name. -
Selected variant. - Unit price. - Quantity control. - Line total. -
Remove action.

Also show: - Subtotal. - Applicable discount. - Delivery estimate or
charge when available. - Total. - Checkout CTA. - Continue shopping
link.

### 15.3 Cart behaviour and states

-   Quantity changes recalculate totals.
-   Out-of-stock or changed-price conditions must be explained.
-   Removing an item should provide clear feedback.
-   Empty cart should include a shopping CTA.
-   Preserve cart state according to the approved persistence strategy.
-   Do not show delivery as free unless the delivery rules confirm it.

## 16. Checkout design

Checkout is a high-priority usability area. Keep it focused and reduce
unnecessary distractions.

### 16.1 Checkout layout

Use a clear step-based or single-page layout, subject to usability
validation.

Suggested information groups: 1. Contact information. 2. Delivery
address. 3. Delivery method. 4. Payment method. 5. Order summary. 6.
Final confirmation.

### 16.2 Guest and registered checkout

Both guest checkout and registered checkout are required.

-   Do not force account creation before purchase.
-   Allow an existing customer to sign in without losing cart data.
-   Offer optional account creation after or during checkout without
    obstructing purchase.
-   Clearly identify required fields.
-   Preserve entered data when validation errors occur.

### 16.3 Sri Lankan address and contact design

-   Support Sri Lankan phone number formats and validation rules
    approved by the business.
-   Use address fields appropriate for local delivery operations.
-   Include district/province or other structured address fields only
    where required by fulfilment.
-   Allow a useful address line for house number, street and locality.
-   Make delivery instructions optional.
-   Do not assume all addresses follow one rigid format.

### 16.4 Payment presentation

The design may support Cash on Delivery and online payment, subject to
business policy and payment provider integration.

PayHere has been considered as a possible provider but is not yet
confirmed as final.

-   Clearly label each available payment option.
-   Do not show unsupported methods.
-   Explain any payment failure and provide a safe retry path.
-   Never collect or display sensitive payment credentials directly in
    storefront UI unless the approved payment integration explicitly
    requires it.
-   Display order total and currency clearly before confirmation.

### 16.5 Order confirmation

Show: - Order confirmation message. - Order reference. - Order
summary. - Delivery/contact details summary. - Payment status or
selected method. - Next steps. - Link to order details for registered
customers, where applicable.

Avoid exposing unnecessary customer data.

## 17. Customer account pages

### 17.1 Account dashboard

Provide clear access to: - Profile details. - Address book. - Orders. -
Wishlist. - Reviews, where supported. - Sign-out.

### 17.2 Sign-in and registration

-   Use simple, focused forms.
-   Provide visible field labels.
-   Provide password visibility control.
-   Provide clear validation and error feedback.
-   Support password recovery.
-   Do not use placeholder text as the only label.
-   Preserve form state where safe and appropriate.

### 17.3 Order history

Order cards/details should show: - Order reference. - Date. - Total. -
Status. - Product summary. - View details action. - Tracking information
when available.

Status labels must match actual order lifecycle data. Do not use
decorative progress states that imply fulfilment events that have not
occurred.

## 18. Wishlist

-   Wishlist icon on product cards and product detail pages.
-   Clear saved/unsaved state.
-   Wishlist page with product cards.
-   Remove action.
-   Add to cart action where available.
-   Empty wishlist state with shopping CTA.

For guests, behaviour must follow the product requirements: either
temporary guest wishlist or sign-in prompt. Do not unexpectedly discard
saved items.

## 19. Ratings and customer reviews

The approved review direction includes star ratings, written reviews and
customer photos.

### 19.1 Review summary

Show: - Average rating. - Total review count. - Rating distribution, if
enough data exists. - Review list.

### 19.2 Review cards

Each review may include: - Star rating. - Review title, if supplied. -
Written content. - Date. - Customer display name or approved anonymised
label. - Customer-uploaded photo thumbnails. - Verified-purchase label
only when verification is reliable.

### 19.3 Review submission

-   Provide clear rating selection.
-   Provide written review field.
-   Support customer photo upload subject to file restrictions.
-   Explain moderation/publishing expectations.
-   Show submission confirmation.
-   Provide validation and upload error states.

Do not imply reviews are verified purchases unless the order
relationship confirms it.

## 20. Editorial, guides and content pages

Content templates may include: - Article listing. - Article detail. -
Beauty routine guide. - Ingredient guide. - Brand story. - About page. -
Contact page. - FAQs. - Delivery, returns and privacy policy pages.

Editorial pages should use readable line lengths, meaningful headings,
clear image captions and a logical content hierarchy.

Where an article recommends products, use clearly labelled product links
or product cards. Editorial content must not make unsupported medical or
treatment claims.

## 21. Promotions and discount presentation

-   Use a consistent sale badge and price treatment.
-   Show original price only when a valid comparison price exists.
-   Show the current price clearly.
-   Ensure discount calculations are accurate.
-   Avoid stacking multiple promotional messages in a small space.
-   Show coupon input only where coupons are supported.
-   Explain invalid, expired or ineligible coupon conditions.
-   Campaign start/end dates and publication state are controlled by the
    content system.

## 22. Forms, controls and component library

### 22.1 Buttons

Variants: - Primary: filled brand accent. - Secondary: neutral outline
or subtle surface. - Tertiary: text link. - Destructive: reserved for
remove/cancel actions.

Rules: - Clear action label. - Visible hover, focus, pressed and
disabled states. - Minimum touch target around 44 × 44 CSS px where
practical. - Loading state for asynchronous actions. - Prevent duplicate
submission while a request is processing.

### 22.2 Inputs

-   Persistent visible label.
-   Optional helper text.
-   Required indicator where needed.
-   Error message near the relevant field.
-   Correct input type and autocomplete attributes.
-   Focus ring with adequate contrast.
-   Do not rely on colour alone for errors.

### 22.3 Selects, chips and tabs

-   Use native or accessible custom controls.
-   Selected state must be clear.
-   Tabs must support keyboard navigation and announce selected state.
-   Filter chips must expose a removal action.
-   Do not use tabs as a substitute for unrelated navigation.

### 22.4 Badges and labels

Keep badges small and consistent. Use them only for meaningful product
or state information. Avoid excessive decorative labels.

### 22.5 Icons

-   Use one consistent line-icon family.
-   Keep stroke weight and size consistent.
-   Pair icon-only controls with accessible names.
-   Avoid mixing filled and outline styles without a clear system.

### 22.6 Cards

Card types: - Product card. - Category card. - Campaign card. -
Editorial card. - Brand card. - Order card. - Review card.

Each type must have documented spacing, image ratio, hover/focus
behaviour and responsive rules.

### 22.7 Dividers and borders

-   Prefer subtle neutral dividers.
-   Avoid heavy borders around every section.
-   Use borders to clarify grouping, not decorate unnecessarily.
-   Maintain consistent radius and border treatment.

### 22.8 Radius and elevation

Suggested starting tokens: - Small controls: 6--8 px radius. - Standard
cards: 8--12 px radius. - Large campaign panels: 12--16 px radius. -
Pills: fully rounded where appropriate.

Use minimal elevation. Prefer clean surfaces and subtle separation over
large shadows.

## 23. Responsive behaviour

### 23.1 Mobile-first requirements

The mobile experience must be designed intentionally, not treated as a
compressed desktop layout.

-   Compact header with accessible menu, search and cart.
-   Navigation drawer or full-screen menu.
-   Hero with mobile-specific crop or stacked content.
-   Horizontal scrolling category shortcuts where appropriate.
-   Campaign cards stacked or carousel-based.
-   Two-column product grid where product information remains readable.
-   Filter drawer.
-   Product gallery adapted to narrow screens.
-   Clear Add to Cart control.
-   Checkout fields arranged in a single column.
-   Footer groups collapsible where useful.

### 23.2 Tablet

-   Use intermediate grid column counts.
-   Prevent overly wide product cards.
-   Maintain usable navigation and filter access.
-   Reflow split banners before text or image becomes cramped.

### 23.3 Desktop

-   Use full navigation and multi-column grids.
-   Keep line lengths readable.
-   Avoid excessive whitespace that pushes key shopping content too far
    down.
-   Use hover interactions only as enhancements.

### 23.4 Orientation and zoom

-   Support portrait and landscape layouts.
-   Avoid horizontal page overflow at 200% zoom.
-   Ensure dialogs, drawers and menus remain usable at small viewport
    heights.

## 24. Interaction and motion design

### 24.1 Motion principles

Motion should be subtle, purposeful and fast.

Suggested ranges: - Hover/focus transition: 120--200 ms. - Drawer/modal
transition: 180--260 ms. - Small feedback animation: 150--250 ms.

These are guidelines, not fixed requirements.

### 24.2 Appropriate interactions

-   Button hover and pressed states.
-   Subtle product image transitions.
-   Accessible navigation dropdowns.
-   Filter drawer open/close.
-   Cart confirmation feedback.
-   Wishlist state feedback.
-   Product gallery selection.
-   Accordion expansion for product details and FAQs.
-   Tabs for product collection switching.

### 24.3 Motion restrictions

-   Avoid autoplay video with sound.
-   Avoid aggressive parallax.
-   Avoid constant animated elements.
-   Respect `prefers-reduced-motion`.
-   Do not hide important information inside hover-only interactions.
-   Do not use motion that delays checkout or blocks interaction.

## 25. Accessibility and usability

Target WCAG 2.2 AA as the accessibility baseline.

Requirements: - Semantic HTML landmarks and headings. - Logical heading
order. - Keyboard access to all interactive controls. - Visible focus
indicators. - Accessible names for icon buttons. - Appropriate alt
text. - Sufficient text and control contrast. - Labels associated with
form fields. - Clear error identification and correction guidance. -
Accessible modal and drawer focus management. - No colour-only status
communication. - Touch targets large enough for comfortable use. -
Reduced-motion support. - Avoid flashing content. - Screen-reader
announcements for cart updates and asynchronous feedback.

Conduct accessibility checks on homepage, listing, product detail, cart,
checkout, account and review flows.

## 26. Trust, authenticity and product information design

The storefront must support trust in a multi-brand retailer.

Design should provide space for: - Brand identity and product
manufacturer information. - Product size and variant. - Ingredients and
usage instructions where supplied. - Batch/expiry-related information
where the business chooses to expose it. - Availability. - Clear
delivery and returns information. - Customer reviews. - Contact and
support information.

Do not make product authenticity, expiry, ingredient, dermatological or
efficacy claims unless they are supported by approved business/product
data.

## 27. Sri Lankan market presentation

-   Initial storefront language: English.
-   Currency: Sri Lankan Rupee (LKR).
-   Display prices consistently, e.g. `LKR 5,500` or `Rs. 5,500`, with
    one format selected and used throughout.
-   Use Sri Lankan phone number validation appropriate to the selected
    input format.
-   Address forms must accommodate local address conventions.
-   Delivery information must reflect the business's actual service
    areas and rates.
-   Payment options must reflect configured and available payment
    methods.
-   Avoid hardcoding delivery prices or promises into visual components.
-   Plan the layout so Sinhala and Tamil can be supported later without
    redesigning the entire interface.

## 28. Content and catalogue-driven design

The storefront is connected to a dynamic catalogue and content model.

The following must be data-driven: - Categories and subcategories. -
Category order and visibility. - Brands and brand logos. - Product
types. - Skin types and concerns. - Product benefits and ingredients. -
Fragrance families. - Product attributes and variants. - Collections. -
Campaign banners. - Promotional messages. - Editorial content. - Product
badges derived from product state or campaign rules.

### 28.1 Dynamic category design rules

-   Never hardcode the initial category examples as the permanent
    taxonomy.
-   Render only active and published categories.
-   Support categories with or without subcategories.
-   Support category images and optional descriptions.
-   Support changing order without a code deployment.
-   Gracefully handle categories with no image.
-   Preserve sensible layout when category count changes.
-   Avoid a fixed six-item circular category assumption.
-   Use responsive wrapping, scrolling or carousel patterns based on
    item count and viewport.

### 28.2 Dynamic homepage modules

Homepage sections should be configurable modules with: - Module type. -
Heading and description. - Data source or collection reference. - Image
assets. - CTA label and destination. - Display order. -
Visibility/publication state. - Optional schedule. - Layout variant.

The frontend should gracefully omit unpublished or incomplete optional
modules.

## 29. Loading, empty, error and success states

Every major page and interactive component needs defined states.

### 29.1 Loading

-   Use skeletons for product grids and content areas where helpful.
-   Avoid flashing blank pages.
-   Preserve layout dimensions while loading.
-   Provide progress feedback for longer actions.

### 29.2 Empty

Examples: - Empty cart. - Empty wishlist. - No search results. - No
products in category. - No reviews. - No orders.

Each empty state should explain the situation and provide a relevant
next action.

### 29.3 Error

-   Use plain language.
-   Identify what failed.
-   Preserve user input when safe.
-   Offer retry or recovery action.
-   Avoid exposing technical stack traces or internal system details.

### 29.4 Success

Examples: - Added to cart. - Wishlist updated. - Review submitted. -
Account created. - Order placed.

Use concise confirmation, accessible announcements and a useful next
step.

## 30. Performance and technical design expectations

-   Optimise images and use modern formats where supported.
-   Lazy-load below-the-fold media.
-   Prioritise hero and above-the-fold assets.
-   Minimise layout shift by reserving image and component dimensions.
-   Avoid excessive third-party scripts.
-   Keep animation lightweight.
-   Use reusable components and design tokens.
-   Avoid duplicate requests caused by repeated UI interactions.
-   Ensure loading states reflect real application state.
-   Use server-rendered or statically generated content where
    appropriate to the chosen framework and SEO strategy.
-   Ensure product and category pages have crawlable content and
    metadata.
-   Use canonical URLs and structured metadata according to the SEO
    implementation plan.

Performance should be measured using real-device testing and Core Web
Vitals. Do not treat a visual design score as a substitute for real
performance measurement.

## 31. SEO and social sharing presentation

The design must allow: - Page title and meta description. - Canonical
URL. - Product and category metadata. - Open Graph/social preview
image. - Descriptive URL slugs. - Breadcrumb navigation. - Structured
data where supported and accurate. - Descriptive image alt text.

Do not expose draft, inactive or unpublished content in public
navigation or search indexing.

## 32. Security and privacy-related interface design

-   Use secure, clear sign-in and checkout states.
-   Do not expose private customer information in public pages.
-   Provide visible privacy and policy links.
-   Explain newsletter subscription and consent clearly.
-   Avoid preselected marketing consent unless legally approved.
-   Show payment status accurately.
-   Provide safe error messaging without revealing sensitive
    implementation details.
-   Provide clear account sign-out and session-expiry handling.

## 33. Design tokens and component architecture

Implement the design system through reusable tokens rather than one-off
values.

Recommended token groups:

-   Colour: brand, surface, text, border, status.
-   Typography: family, size, weight, line height, letter spacing.
-   Spacing: 4 px base scale.
-   Layout: container widths, breakpoints, grid gaps.
-   Radius: control, card, panel, pill.
-   Elevation: subtle surface levels.
-   Motion: duration and easing.
-   Layering: header, dropdown, drawer, modal, toast.
-   Image: aspect ratios and fit behaviour.

Recommended component groups:

**Global** - AnnouncementBar - SiteHeader - DesktopNavigation -
MobileNavigation - SearchPanel - AccountMenu - WishlistIndicator -
CartIndicator - SiteFooter

**Discovery** - HeroCampaign - CategoryShortcut - CategoryGrid -
BrandStrip - CampaignBanner - EditorialCard - SkinTypeShortcut -
SkinConcernShortcut

**Commerce** - ProductCard - ProductGrid - ProductCarousel -
ProductTabs - PriceDisplay - RatingSummary - SaleBadge -
AvailabilityLabel - VariantSelector - QuantitySelector -
AddToCartButton - WishlistButton - FilterPanel - SortControl -
CartLineItem - OrderSummary

**Forms and feedback** - TextField - SelectField - Checkbox -
RadioGroup - FormError - EmptyState - LoadingSkeleton -
Toast/StatusMessage - ConfirmationDialog

Components must have consistent APIs and documented states. Avoid
duplicating slightly different versions of the same component across
pages.

## 34. Page-by-page design checklist

### Homepage

-   [ ] Announcement bar, if enabled.
-   [ ] Responsive header and navigation.
-   [ ] Campaign hero with clear CTA.
-   [ ] Category discovery.
-   [ ] Featured campaign/collection banners.
-   [ ] Product collection section.
-   [ ] Brand discovery, if enabled.
-   [ ] Skin type/concern discovery.
-   [ ] Editorial content, if enabled.
-   [ ] Trust/service information.
-   [ ] Footer.

### Category/listing page

-   [ ] Breadcrumb.
-   [ ] Category title and description.
-   [ ] Optional category banner.
-   [ ] Subcategory links.
-   [ ] Filter and sort.
-   [ ] Product count.
-   [ ] Responsive product grid.
-   [ ] Pagination/load more.
-   [ ] Empty/error states.

### Product detail page

-   [ ] Product gallery.
-   [ ] Brand and product name.
-   [ ] Rating/review count.
-   [ ] Price and discount.
-   [ ] Availability.
-   [ ] Variant selection.
-   [ ] Quantity.
-   [ ] Add to Cart.
-   [ ] Wishlist.
-   [ ] Delivery information.
-   [ ] Description, benefits and usage.
-   [ ] Ingredients and attributes.
-   [ ] Reviews and customer photos.
-   [ ] Related products.

### Search

-   [ ] Search entry point.
-   [ ] Suggestions where supported.
-   [ ] Results count.
-   [ ] Filters and sorting.
-   [ ] No-results state.
-   [ ] Error state.

### Cart

-   [ ] Line items.
-   [ ] Variant and quantity.
-   [ ] Remove action.
-   [ ] Subtotal and total.
-   [ ] Delivery/discount details where available.
-   [ ] Checkout CTA.
-   [ ] Empty and error states.

### Checkout

-   [ ] Guest checkout.
-   [ ] Registered checkout.
-   [ ] Contact details.
-   [ ] Sri Lankan address fields.
-   [ ] Delivery selection.
-   [ ] Supported payment options.
-   [ ] Order summary.
-   [ ] Validation and payment error states.
-   [ ] Order confirmation.

### Account and wishlist

-   [ ] Sign-in and registration.
-   [ ] Password recovery.
-   [ ] Profile.
-   [ ] Address book.
-   [ ] Order history.
-   [ ] Wishlist.
-   [ ] Empty and error states.

### Reviews

-   [ ] Rating summary.
-   [ ] Written reviews.
-   [ ] Customer photos.
-   [ ] Submission form.
-   [ ] Moderation/confirmation messaging.

## 35. MVP design priorities

### Required for initial storefront prototype

-   Global header, navigation and footer.
-   Homepage with hero, category discovery, campaigns and product
    collections.
-   Category/listing page.
-   Product detail page.
-   Search interface and results layout.
-   Cart.
-   Guest and registered checkout screens.
-   Sign-in and registration screens.
-   Wishlist presentation.
-   Responsive product cards and filters.
-   Basic editorial/content page template.
-   Loading, empty, error and success states.

### Important production-ready design considerations

-   Dynamic taxonomy and homepage modules.
-   Real product availability and price states.
-   Payment and delivery integration states.
-   Customer reviews and image uploads.
-   Order tracking and account history.
-   SEO metadata and social sharing.
-   Analytics/consent interface where required.
-   Accessibility and performance testing.

### Future enhancements

-   Beauty quiz or guided product finder.
-   Personalised recommendations.
-   Advanced routine builder.
-   Loyalty programme.
-   More languages.
-   Dark mode, if justified by customer research.
-   Advanced comparison tools.

These future items should not complicate the initial MVP design.

## 36. Design QA and acceptance criteria

The design is ready for implementation review when:

1.  All core storefront pages have approved desktop and mobile layouts.
2.  A coherent colour and typography system is documented and applied.
3.  Components use consistent spacing, image ratios, borders and states.
4.  Header and navigation work at all supported viewport sizes.
5.  Category and product content can vary without breaking the layout.
6.  Product cards support normal, sale, unavailable and loading states.
7.  Filters, sorting, tabs and drawers have clear interaction states.
8.  Product detail pages present key purchase information clearly.
9.  Cart and checkout are visually focused and usable on mobile.
10. Guest checkout is supported in the design.
11. Forms include labels, validation, errors and success feedback.
12. Empty, loading and failure states are designed.
13. Keyboard focus and screen-reader semantics are considered.
14. Contrast and touch targets meet accessibility expectations.
15. No category, brand or collection names are permanently hardcoded.
16. No unapproved brand identity, product claims or delivery promises
    are presented.
17. Images are appropriately cropped, optimised and responsive.
18. Design has been reviewed at common mobile, tablet and desktop
    widths.

## 37. Open decisions requiring stakeholder confirmation

The following should be resolved before final production design
sign-off:

  -----------------------------------------------------------------------
  Decision                            Current position
  ----------------------------------- -----------------------------------
  Store name and logo                 Not finalised

  Final brand palette                 Provisional blush/neutral direction
                                      for exploration

  Final display and interface fonts   Candidates only

  Hero campaign photography           To be selected/licensed

  Header logo placement               Left or centred; validate with
                                      final logo

  Announcement bar                    Optional, configurable

  Product card quick add              Optional; depends on variant
                                      complexity

  Product grid columns                Responsive; validate with catalogue
                                      density

  Product reviews                     Star, written and customer photo
                                      reviews required

  Guest wishlist behaviour            Confirm persistence/sign-in
                                      behaviour

  Delivery messaging                  Confirm actual service areas, rates
                                      and estimates

  Payment methods                     Cash on Delivery and online payment
                                      considered; final policy pending

  PayHere                             Proposed option, not confirmed

  Returns/refund policy               Business policy required

  Product authenticity messaging      Claims must be supported by
                                      business process

  Product expiry/batch display        Business decision on
                                      customer-facing presentation

  Multi-language support              English initially; Sinhala/Tamil
                                      future consideration

  Dark mode                           Not required for MVP

  Beauty quiz                         Future enhancement, not MVP
  -----------------------------------------------------------------------

## 38. Relationship with other project documentation

This document is the visual and interaction design companion to
`storefrontsystem.md`.

Use the documents as follows:

-   **Storefront PRD:** Why the storefront is being built, business
    goals, audience and scope.
-   **Storefront FRD:** What the storefront must do and the functional
    rules it must follow.
-   **Storefront Sitemap & User Flows:** Which pages exist and how
    customers move between them.
-   **`storefrontsystem.md`:** Consolidated system-level requirements
    and implementation context.
-   **`storefrontdesign.md`:** How the customer-facing storefront should
    look, feel and behave visually.

If a visual reference conflicts with a functional requirement, the
functional requirement and approved business rule take precedence. If a
design decision conflicts with dynamic catalogue requirements, the
design must adapt to the catalogue rather than hardcode the reference
content.

Admin Panel screens, workflows and component designs are outside this
document. The storefront must, however, be designed to consume the
dynamic data managed by the separate Admin Panel.

## 39. Final design direction summary

The recommended storefront is a clean, premium, editorial beauty
e-commerce experience built on warm neutral surfaces, refined serif
display typography, clear sans-serif interface typography and one
restrained brand accent.

It combines: - Editorial lifestyle hero photography. - Circular category
discovery. - Configurable campaign banners. - Tabbed and grid-based
product discovery. - Consistent product cards with prices, ratings and
meaningful badges. - Clear product detail and checkout layouts. -
Responsive navigation and mobile-first interactions. - Dynamic content
and catalogue integration. - Accessible, performant and trustworthy
shopping patterns.

The four supplied references are inspiration sources, not templates to
reproduce literally. The final interface must have its own approved
brand identity and a consistent design language across every
customer-facing page.

------------------------------------------------------------------------

**End of document**\
**Version:** 1.0\
**Status:** Design baseline -- pending stakeholder review and
brand-identity confirmation
