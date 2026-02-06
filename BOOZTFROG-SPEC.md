# BooztFrog — Technical Specification

**Version:** 1.0
**Date:** 2026-02-06
**Author:** Thomas Alling

---

## 1. Project Overview

BooztFrog is a global SaaS platform that helps businesses collect more customer reviews through NFC and QR-based physical products. Customers tap or scan a BooztFrog product and are redirected to leave a review on Google, TripAdvisor, Trustpilot, Facebook, or other platforms.

The platform combines an e-commerce storefront (selling physical NFC/QR products) with a SaaS dashboard (analytics, landing pages, review management) — creating both one-time product revenue and recurring subscription income.

**Reference competitor:** https://tapitag.co (Shopify-based, physical products + basic profile pages)

**Key differentiator:** BooztFrog adds a full SaaS layer with analytics, customizable landing pages, review widgets, and multi-location support — something competitors like Blenix (blenix.co) and TapItag lack.

---

## 2. Architecture

### 2.1 Infrastructure

```
┌─────────────────────────────────────────────────────┐
│                     VERCEL                           │
│                                                     │
│  booztfrog.com          (Next.js App)                │
│  ├── /                  (Storefront - public)        │
│  ├── /products          (Product catalog)            │
│  ├── /pricing           (Pricing page)               │
│  ├── /checkout          (Checkout flow)              │
│  ├── /auth              (Login/Register)             │
│  └── /dashboard/*       (Authenticated SaaS area)    │
│                                                     │
└──────────────────────┬──────────────────────────────┘
                       │ API calls (REST)
                       ▼
┌─────────────────────────────────────────────────────┐
│                 VPS (Hetzner / DO)                   │
│              Managed via Laravel Forge               │
│                                                     │
│  api.booztfrog.com      (Laravel 12 API)             │
│  ├── Authentication (Sanctum)                        │
│  ├── Product management                              │
│  ├── Order processing                                │
│  ├── Subscription billing (Stripe via Cashier)       │
│  ├── Business dashboard data                         │
│  ├── Analytics engine                                │
│  ├── Landing page configuration                      │
│  ├── NFC manufacturer API integration                │
│  └── Admin panel API                                 │
│                                                     │
│  go.booztfrog.com       (Laravel lightweight route)  │
│  ├── NFC/QR redirect handler                         │
│  ├── Scan logging (IP, device, timestamp, location)  │
│  └── Smart routing to review platform                │
│                                                     │
│  PostgreSQL database                                 │
│  Redis (queues, caching, rate limiting)               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2.2 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 16 (App Router, TypeScript) | SSR/SSG for SEO, route groups for storefront/dashboard split |
| Styling | Tailwind CSS | Rapid UI development, consistent design system |
| Frontend hosting | Vercel | Optimized for Next.js, global CDN, automatic deployments |
| Backend | Laravel 12 (PHP 8.5, API-only) | Robust API framework, Cashier for billing, excellent queue system |
| Database | PostgreSQL 16 | Better for analytics queries, JSON support, scalability |
| Cache/Queue | Redis | Session management, job queues, rate limiting, caching |
| Payments | Stripe (via Laravel Cashier) | Global payments, subscriptions, one-time purchases |
| Backend hosting | VPS via Laravel Forge | Automated server management, deployments, SSL |
| File storage | S3-compatible (AWS S3 or Cloudflare R2) | Product images, business logos, assets |
| Email | Postmark or Resend | Transactional emails (order confirmations, welcome, etc.) |
| i18n | next-intl (frontend), Laravel localization (backend) | Multi-language support |

### 2.3 Domain Routing

| Domain | Target | Purpose |
|--------|--------|---------|
| `booztfrog.com` | Vercel | Storefront + Dashboard (single Next.js app) |
| `api.booztfrog.com` | VPS | Laravel API backend |
| `go.booztfrog.com` | VPS | NFC/QR redirect service (ultrafast) |

---

## 3. Multi-Language (i18n)

### 3.1 Strategy

- **Default language:** English (en)
- **Initial languages:** English, Norwegian (nb), Swedish (sv), Danish (da), German (de), Spanish (es), French (fr)
- **URL structure:** Path-based — `booztfrog.com/nb/products`, `booztfrog.com/es/pricing`
- **Detection:** Browser language → URL path → default (en)

### 3.2 Frontend (next-intl)

```
app/
├── [locale]/
│   ├── (storefront)/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── pricing/
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── analytics/
│   │   │   ├── locations/
│   │   │   ├── settings/
│   │   │   └── orders/
│   │   └── layout.tsx
│   └── layout.tsx
├── middleware.ts          # Locale detection + auth
messages/
├── en.json
├── nb.json
├── sv.json
├── da.json
├── de.json
├── es.json
└── fr.json
```

### 3.3 Backend (Laravel)

- All API responses include translated strings where applicable (product descriptions, email templates, error messages)
- `Accept-Language` header determines response locale
- Translations stored in `lang/` directory per Laravel convention
- Database content (product names, descriptions) uses a `translations` JSON column or a separate `translatable` table

### 3.4 NFC Redirect Pages

- `go.booztfrog.com/{code}` landing pages are rendered in the customer's browser language
- Business owner can set a preferred language for their landing page
- Review platform labels ("Leave us a review on Google") are translated

---

## 4. Database Schema

### 4.1 Core Tables

```sql
-- Users: Both business owners and admin users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin', 'super_admin') DEFAULT 'customer',
    language VARCHAR(5) DEFAULT 'en',
    email_verified_at TIMESTAMP NULL,
    stripe_customer_id VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Businesses: A user can own multiple businesses
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url VARCHAR(500) NULL,
    website VARCHAR(500) NULL,
    phone VARCHAR(50) NULL,
    address TEXT NULL,
    city VARCHAR(255) NULL,
    country VARCHAR(2) NULL,
    timezone VARCHAR(100) DEFAULT 'UTC',
    language VARCHAR(5) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Locations: Multi-location support (e.g., restaurant chain)
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT NULL,
    city VARCHAR(255) NULL,
    country VARCHAR(2) NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Review platforms configured per business/location
CREATE TABLE review_platforms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    platform ENUM('google', 'tripadvisor', 'trustpilot', 'facebook', 'yelp', 'custom') NOT NULL,
    url VARCHAR(500) NOT NULL,
    display_name VARCHAR(255) NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products (catalog)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL,                  -- {"en": "NFC Review Card", "nb": "NFC Anmeldelseskort"}
    slug VARCHAR(255) UNIQUE NOT NULL,
    description JSONB NULL,               -- Translatable
    short_description JSONB NULL,
    price_cents INT NOT NULL,             -- Price in smallest currency unit
    currency VARCHAR(3) DEFAULT 'USD',
    product_type ENUM('nfc_card', 'qr_sticker', 'poster', 'display_stand', 'wristband', 'table_sign') NOT NULL,
    material ENUM('pvc', 'wood', 'metal') NULL,
    finish ENUM('glossy', 'matte', 'frosted', 'uv_spot') NULL,
    images JSONB NULL,                    -- Array of image URLs
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    meta_title JSONB NULL,
    meta_description JSONB NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Product variants (sizes, quantities, etc.)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,           -- e.g., "Pack of 5", "Large"
    sku VARCHAR(100) UNIQUE NOT NULL,
    price_cents INT NOT NULL,
    compare_at_price_cents INT NULL,      -- For showing discounts
    stock_quantity INT NULL,              -- NULL = unlimited
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,  -- BF-000001
    status ENUM('pending', 'paid', 'processing', 'production', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    subtotal_cents INT NOT NULL,
    tax_cents INT DEFAULT 0,
    shipping_cents INT DEFAULT 0,
    total_cents INT NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    stripe_payment_intent_id VARCHAR(255) NULL,
    shipping_name VARCHAR(255) NULL,
    shipping_address TEXT NULL,
    shipping_city VARCHAR(255) NULL,
    shipping_state VARCHAR(255) NULL,
    shipping_postal_code VARCHAR(20) NULL,
    shipping_country VARCHAR(2) NULL,
    tracking_number VARCHAR(255) NULL,
    tracking_url VARCHAR(500) NULL,
    notes TEXT NULL,
    manufacturer_order_id VARCHAR(255) NULL,   -- From NFC manufacturer API
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price_cents INT NOT NULL,
    total_cents INT NOT NULL,
    customization JSONB NULL,              -- Custom logo, text, etc.
    created_at TIMESTAMP DEFAULT NOW()
);

-- NFC/QR Devices (each physical product sold)
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    order_item_id UUID REFERENCES order_items(id) ON DELETE SET NULL,
    code VARCHAR(20) UNIQUE NOT NULL,      -- Short code for go.booztfrog.com/{code}
    device_type ENUM('nfc', 'qr', 'both') DEFAULT 'both',
    label VARCHAR(255) NULL,               -- "Front desk card", "Table 5"
    is_active BOOLEAN DEFAULT true,
    activated_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Scans (every tap/scan event)
CREATE TABLE scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
    scanned_at TIMESTAMP DEFAULT NOW(),
    ip_address INET NULL,
    user_agent TEXT NULL,
    device_type VARCHAR(50) NULL,          -- mobile, tablet, desktop
    os VARCHAR(50) NULL,
    browser VARCHAR(50) NULL,
    country VARCHAR(2) NULL,
    city VARCHAR(255) NULL,
    referrer VARCHAR(500) NULL,
    platform_selected VARCHAR(50) NULL,    -- Which review platform they chose
    review_completed BOOLEAN DEFAULT false
);
CREATE INDEX idx_scans_device_id ON scans(device_id);
CREATE INDEX idx_scans_scanned_at ON scans(scanned_at);
CREATE INDEX idx_scans_device_date ON scans(device_id, scanned_at);

-- Subscriptions (managed via Stripe/Cashier, this tracks plan details)
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name JSONB NOT NULL,                   -- {"en": "Starter", "nb": "Starter"}
    slug VARCHAR(50) UNIQUE NOT NULL,
    stripe_price_id VARCHAR(255) NOT NULL,
    price_cents INT NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    interval ENUM('monthly', 'yearly') NOT NULL,
    features JSONB NOT NULL,               -- {"max_locations": 1, "max_devices": 5, ...}
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Landing page customization
CREATE TABLE landing_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    headline JSONB NULL,                   -- Translatable
    subheadline JSONB NULL,
    logo_url VARCHAR(500) NULL,
    background_color VARCHAR(7) DEFAULT '#FFFFFF',
    text_color VARCHAR(7) DEFAULT '#000000',
    button_color VARCHAR(7) DEFAULT '#4CAF50',
    button_text_color VARCHAR(7) DEFAULT '#FFFFFF',
    custom_css TEXT NULL,
    show_powered_by BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin activity log
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    subject_type VARCHAR(100) NULL,
    subject_id UUID NULL,
    metadata JSONB NULL,
    ip_address INET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_activity_user ON activity_logs(user_id);
CREATE INDEX idx_activity_created ON activity_logs(created_at);
```

---

## 5. API Endpoints

### 5.1 Authentication

```
POST   /api/auth/register           # Create account
POST   /api/auth/login              # Login, returns Sanctum token
POST   /api/auth/logout             # Revoke token
POST   /api/auth/forgot-password    # Send reset link
POST   /api/auth/reset-password     # Reset password
GET    /api/auth/user               # Get current user
PUT    /api/auth/user               # Update profile
```

### 5.2 Storefront (Public)

```
GET    /api/products                 # List products (filterable, translatable)
GET    /api/products/{slug}          # Single product
GET    /api/pricing                  # Subscription plans
POST   /api/checkout                 # Create Stripe checkout session
POST   /api/webhooks/stripe          # Stripe webhook handler
```

### 5.3 Dashboard (Authenticated)

```
# Businesses
GET    /api/businesses               # List user's businesses
POST   /api/businesses               # Create business
GET    /api/businesses/{id}          # Get business details
PUT    /api/businesses/{id}          # Update business
DELETE /api/businesses/{id}          # Delete business

# Locations
GET    /api/businesses/{id}/locations
POST   /api/businesses/{id}/locations
PUT    /api/locations/{id}
DELETE /api/locations/{id}

# Review Platforms
GET    /api/businesses/{id}/platforms
POST   /api/businesses/{id}/platforms
PUT    /api/platforms/{id}
DELETE /api/platforms/{id}

# Devices
GET    /api/businesses/{id}/devices
GET    /api/devices/{id}
PUT    /api/devices/{id}             # Assign to location, update label
POST   /api/devices/{id}/activate    # Activate device

# Analytics
GET    /api/businesses/{id}/analytics/overview      # Summary stats
GET    /api/businesses/{id}/analytics/scans          # Scan history (filterable by date range)
GET    /api/businesses/{id}/analytics/platforms       # Platform breakdown
GET    /api/businesses/{id}/analytics/devices         # Per-device stats
GET    /api/businesses/{id}/analytics/locations       # Per-location stats

# Landing Page
GET    /api/businesses/{id}/landing-page
PUT    /api/businesses/{id}/landing-page

# Orders
GET    /api/orders                   # User's order history
GET    /api/orders/{id}              # Order detail

# Subscription
GET    /api/subscription             # Current plan
POST   /api/subscription             # Subscribe
PUT    /api/subscription             # Change plan
DELETE /api/subscription             # Cancel
GET    /api/subscription/portal      # Stripe billing portal URL
```

### 5.4 Admin (Super Admin)

```
GET    /api/admin/dashboard          # Admin overview stats
GET    /api/admin/users              # List all users
GET    /api/admin/orders             # List all orders
PUT    /api/admin/orders/{id}        # Update order status
GET    /api/admin/businesses         # List all businesses
GET    /api/admin/products           # Manage products
POST   /api/admin/products           # Create product
PUT    /api/admin/products/{id}      # Update product
DELETE /api/admin/products/{id}      # Delete product
```

### 5.5 NFC Redirect Service

```
GET    go.booztfrog.com/{code}       # Redirect handler (separate domain, ultrafast)
```

**Redirect flow:**
1. Log scan data (async via queue — never block the redirect)
2. Look up device → business → review platforms
3. If single platform configured → direct redirect
4. If multiple platforms → show landing page (choose platform)
5. Landing page rendered server-side for speed

---

## 6. NFC Redirect Service (`go.booztfrog.com`)

This is the most performance-critical component. Every customer interaction starts here.

### 6.1 Requirements

- Response time: < 100ms
- Availability: 99.9%+
- No middleware except rate limiting
- Scan logging is async (dispatched to queue)

### 6.2 Flow

```
Customer taps NFC card
        │
        ▼
  go.booztfrog.com/{code}
        │
        ▼
  ┌─ Lookup device (Redis cached) ──┐
  │                                  │
  │  Device not found → 404 page     │
  │  Device inactive → disabled page │
  │                                  │
  ├─ Single platform? ──────────────── → 302 redirect to review URL
  │                                  │
  └─ Multiple platforms? ───────────── → Render landing page
        │                                 (choose Google, TripAdvisor, etc.)
        │
        ▼
  Dispatch ScanLogged job (async)
  - IP, User Agent, device fingerprint
  - GeoIP lookup (country, city)
  - Device type detection
```

### 6.3 Implementation Notes

- Cache device → business → platforms mapping in Redis (invalidate on update)
- Use a dedicated Laravel route group with minimal middleware
- The landing page should be a simple server-rendered blade template (not Next.js) for speed
- GeoIP: Use MaxMind GeoLite2 database locally (no external API call)

---

## 7. Subscription Plans (MVP)

| Feature | Free | Starter ($9/mo) | Pro ($29/mo) | Business ($79/mo) |
|---------|------|-----------------|-------------|-------------------|
| Devices | 1 | 5 | 20 | Unlimited |
| Locations | 1 | 1 | 5 | Unlimited |
| Scan analytics | 30 days | 90 days | 1 year | Unlimited |
| Custom landing page | No | Basic | Full | Full + CSS |
| Review platforms | 2 | 5 | Unlimited | Unlimited |
| Review widget embed | No | No | Yes | Yes |
| Remove "Powered by" | No | No | Yes | Yes |
| API access | No | No | No | Yes |
| Priority support | No | No | Yes | Yes |

---

## 8. Frontend Structure (Next.js)

### 8.1 App Structure

```
booztfrog-frontend/
├── app/
│   ├── [locale]/
│   │   ├── (storefront)/
│   │   │   ├── page.tsx                    # Homepage
│   │   │   ├── products/
│   │   │   │   ├── page.tsx                # Product listing
│   │   │   │   └── [slug]/page.tsx         # Product detail
│   │   │   ├── pricing/page.tsx            # Pricing page
│   │   │   ├── checkout/page.tsx           # Checkout
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── blog/
│   │   │   └── layout.tsx                  # Storefront layout
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── layout.tsx                  # Auth layout (centered card)
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx                # Dashboard overview
│   │   │   │   ├── analytics/page.tsx
│   │   │   │   ├── devices/
│   │   │   │   │   ├── page.tsx            # List devices
│   │   │   │   │   └── [id]/page.tsx       # Device detail
│   │   │   │   ├── locations/page.tsx
│   │   │   │   ├── landing-page/page.tsx   # Landing page editor
│   │   │   │   ├── platforms/page.tsx      # Review platform config
│   │   │   │   ├── orders/page.tsx
│   │   │   │   ├── subscription/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   └── layout.tsx                  # Dashboard layout (sidebar)
│   │   │
│   │   └── layout.tsx                      # Root locale layout
│   │
│   ├── middleware.ts                        # i18n + auth middleware
│   └── globals.css
│
├── components/
│   ├── storefront/                          # Hero, ProductCard, PricingTable, etc.
│   ├── dashboard/                           # Sidebar, StatCard, Chart, DataTable, etc.
│   ├── shared/                              # Button, Input, Modal, etc.
│   └── ui/                                  # shadcn/ui components
│
├── lib/
│   ├── api.ts                               # API client (axios/fetch wrapper)
│   ├── auth.ts                              # Auth helpers
│   ├── stripe.ts                            # Stripe client-side helpers
│   └── utils.ts                             # General utilities
│
├── hooks/
│   ├── useAuth.ts
│   ├── useBusiness.ts
│   └── useAnalytics.ts
│
├── messages/
│   ├── en.json
│   ├── nb.json
│   └── ...
│
├── public/
│   ├── images/
│   └── fonts/
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 8.2 Key UI Pages

**Storefront:**
- Homepage: Hero with frog mascot, product showcase, social proof, CTA
- Products: Grid of NFC cards/stickers/posters with filters
- Pricing: Plan comparison table with toggle (monthly/yearly)
- Checkout: Stripe Elements integration

**Dashboard:**
- Overview: Scan count, review count, trend charts, recent activity
- Analytics: Date range picker, line/bar charts (scans over time, platform breakdown, device heatmap)
- Devices: List of NFC devices with status, last scan, assignment
- Landing Page Editor: Live preview, color pickers, logo upload, platform ordering
- Settings: Business profile, team members (future), billing

### 8.3 Component Library

Use **shadcn/ui** as the base component system. It's not a dependency — components are copied into the project and customized. This gives full control over styling while maintaining consistency.

---

## 9. Backend Structure (Laravel)

```
booztfrog-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   ├── RegisterController.php
│   │   │   │   ├── LoginController.php
│   │   │   │   └── PasswordResetController.php
│   │   │   ├── Storefront/
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── CheckoutController.php
│   │   │   │   └── PricingController.php
│   │   │   ├── Dashboard/
│   │   │   │   ├── BusinessController.php
│   │   │   │   ├── LocationController.php
│   │   │   │   ├── DeviceController.php
│   │   │   │   ├── PlatformController.php
│   │   │   │   ├── AnalyticsController.php
│   │   │   │   ├── LandingPageController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   └── SubscriptionController.php
│   │   │   ├── Admin/
│   │   │   │   ├── AdminDashboardController.php
│   │   │   │   ├── AdminUserController.php
│   │   │   │   ├── AdminOrderController.php
│   │   │   │   └── AdminProductController.php
│   │   │   └── Redirect/
│   │   │       └── RedirectController.php     # go.booztfrog.com handler
│   │   │
│   │   ├── Middleware/
│   │   │   ├── SetLocale.php
│   │   │   └── CheckSubscription.php
│   │   │
│   │   ├── Requests/                           # Form request validation
│   │   └── Resources/                          # API resources (JSON transformation)
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Business.php
│   │   ├── Location.php
│   │   ├── ReviewPlatform.php
│   │   ├── Product.php
│   │   ├── ProductVariant.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── Device.php
│   │   ├── Scan.php
│   │   ├── SubscriptionPlan.php
│   │   ├── LandingPage.php
│   │   └── ActivityLog.php
│   │
│   ├── Services/
│   │   ├── AnalyticsService.php
│   │   ├── DeviceService.php
│   │   ├── ManufacturerService.php             # NFC manufacturer API
│   │   ├── GeoIpService.php
│   │   └── StripeService.php
│   │
│   ├── Jobs/
│   │   ├── LogScan.php                         # Async scan logging
│   │   ├── ProcessOrder.php
│   │   ├── SendOrderToManufacturer.php
│   │   └── SendTransactionalEmail.php
│   │
│   ├── Events/
│   │   ├── DeviceScanned.php
│   │   ├── OrderPlaced.php
│   │   └── SubscriptionChanged.php
│   │
│   └── Policies/                               # Authorization
│       ├── BusinessPolicy.php
│       ├── DevicePolicy.php
│       └── OrderPolicy.php
│
├── routes/
│   ├── api.php                                  # api.booztfrog.com routes
│   └── redirect.php                             # go.booztfrog.com routes
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
│
├── config/
├── lang/
│   ├── en/
│   ├── nb/
│   └── ...
│
├── resources/
│   └── views/
│       └── redirect/
│           ├── landing.blade.php               # Multi-platform landing page
│           └── disabled.blade.php              # Inactive device page
│
└── tests/
    ├── Feature/
    └── Unit/
```

---

## 10. Key Implementation Details

### 10.1 Device Code Generation

```php
// Generate unique short codes for NFC redirect URLs
// Format: 6-8 alphanumeric characters (lowercase + digits, no ambiguous chars)
// Excluded: 0, O, l, 1, I (to avoid confusion)
// Example: go.booztfrog.com/k7m2nx
```

### 10.2 Stripe Integration

**Two Stripe products:**
1. **One-time payments** for physical products (checkout sessions)
2. **Subscriptions** for SaaS plans (Laravel Cashier)

**Webhook events to handle:**
- `checkout.session.completed` → Create order, provision devices
- `customer.subscription.created` → Activate plan
- `customer.subscription.updated` → Update plan features
- `customer.subscription.deleted` → Downgrade to free
- `invoice.payment_failed` → Notify user

### 10.3 Device Provisioning Flow

```
Customer places order
        │
        ▼
  Stripe payment confirmed (webhook)
        │
        ▼
  Create Order record
        │
        ▼
  Generate device codes (one per product unit)
        │
        ▼
  Create Device records (status: unactivated)
        │
        ▼
  Queue: SendOrderToManufacturer job
        │
        ▼
  Manufacturer produces NFC cards with codes printed/encoded
        │
        ▼
  Customer receives cards, logs in, activates devices
        │
        ▼
  Customer configures review platforms per device
```

### 10.4 Analytics Aggregation

For performance, pre-aggregate scan data:

```sql
-- Daily aggregation table (populated via scheduled job)
CREATE TABLE scan_aggregates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID REFERENCES devices(id),
    business_id UUID REFERENCES businesses(id),
    location_id UUID REFERENCES locations(id) NULL,
    date DATE NOT NULL,
    total_scans INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    mobile_scans INT DEFAULT 0,
    desktop_scans INT DEFAULT 0,
    platform_breakdown JSONB DEFAULT '{}',   -- {"google": 5, "tripadvisor": 3}
    country_breakdown JSONB DEFAULT '{}',    -- {"NO": 10, "US": 3}
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(device_id, date)
);
CREATE INDEX idx_aggregates_business_date ON scan_aggregates(business_id, date);
```

### 10.5 Security

- All API routes behind Sanctum authentication (except public storefront endpoints)
- Business data scoped by `user_id` — users can only access their own businesses
- Rate limiting: 60 req/min for authenticated, 30 req/min for public
- `go.booztfrog.com` rate limited: 10 req/min per IP per device (prevent abuse)
- CORS configured for `booztfrog.com` only
- All device codes are non-sequential (prevent enumeration)
- Webhook signature verification for Stripe

---

## 11. MVP Milestones

### Month 1: Foundation + Storefront

**Week 1-2: Setup & Core**
- [ ] Laravel project setup with PostgreSQL, Redis, Sanctum
- [ ] Next.js project setup with next-intl, Tailwind, shadcn/ui
- [ ] Database migrations
- [ ] User authentication (register, login, forgot password)
- [ ] Basic API structure and middleware

**Week 2-3: Storefront**
- [ ] Homepage with product showcase
- [ ] Product listing and detail pages
- [ ] Stripe checkout integration
- [ ] Order creation and confirmation
- [ ] Transactional emails (order confirmation, welcome)
- [ ] i18n for all storefront pages (EN + NB minimum)

**Week 3-4: Admin & Products**
- [ ] Admin product management (CRUD)
- [ ] Order management (view, update status)
- [ ] Product seeding with initial NFC card products

### Month 2: Dashboard + NFC Service

**Week 5-6: Dashboard Core**
- [ ] Dashboard layout with sidebar navigation
- [ ] Business creation and management
- [ ] Location management
- [ ] Review platform configuration
- [ ] Device management (list, activate, assign)
- [ ] Subscription billing (Stripe Cashier)

**Week 7-8: Analytics + Redirect**
- [ ] `go.booztfrog.com` redirect service
- [ ] Landing page for multi-platform selection
- [ ] Scan logging (async)
- [ ] Analytics dashboard (scans over time, platform breakdown)
- [ ] Landing page customization (colors, logo)
- [ ] Daily aggregation job
- [ ] i18n for dashboard

---

## 12. Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.booztfrog.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
NEXT_PUBLIC_SITE_URL=https://booztfrog.com
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

### Backend (.env)

```env
APP_NAME=BooztFrog
APP_URL=https://api.booztfrog.com
FRONTEND_URL=https://booztfrog.com
REDIRECT_DOMAIN=https://go.booztfrog.com

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=booztfrog
DB_USERNAME=booztfrog
DB_PASSWORD=

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

STRIPE_KEY=pk_live_xxx
STRIPE_SECRET=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

MAIL_MAILER=postmark
POSTMARK_TOKEN=xxx

AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_DEFAULT_REGION=eu-west-1
AWS_BUCKET=booztfrog-assets

GEOIP_DB_PATH=/path/to/GeoLite2-City.mmdb
```

---

## 13. Design Guidelines

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#4CAF50` | CTAs, buttons, highlights |
| Dark Green | `#2E7D32` | Headers, accents |
| Lime Green | `#8BC34A` | Backgrounds, cards |
| Dark Navy | `#072337` | Text, "Frog" in logo |
| White | `#FFFFFF` | Backgrounds |
| Light Gray | `#F5F5F5` | Card backgrounds |
| Dark Gray | `#333333` | Body text |

### Typography

- **Headings:** Inter or Poppins (bold, clean)
- **Body:** Inter (regular)
- **Monospace:** JetBrains Mono (code, device codes)

### Brand Voice

- Fun but professional
- Frog mascot is friendly and approachable
- Tagline: "Tap. Scan. Boozt."
- Tone: Confident, clear, helpful

---

## 14. Future Considerations (Post-MVP)

These are NOT part of the MVP but should be considered in architecture decisions:

- **Review widget embed** — JavaScript snippet businesses embed on their website to display reviews
- **White-label** — Allow resellers to rebrand the platform
- **Team members** — Multiple users per business
- **BooztFrog POS** — Point of sale integration
- **BooztFrog Pay** — Payment collection
- **BooztFrog Booking** — Appointment booking
- **BooztFrog Loyalty** — Customer loyalty program
- **BooztFrog Menus** — Digital menus via NFC
- **Mobile app** — React Native dashboard app
- **API for enterprise** — Public API for large customers
- **AI review response** — Auto-generate review replies
