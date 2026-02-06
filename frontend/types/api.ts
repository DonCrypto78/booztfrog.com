export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'super_admin';
  language: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  website: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  timezone: string;
  language: string;
  devicesCount?: number;
  locationsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  businessId: string;
  name: string;
  address: string | null;
  city: string | null;
  country: string | null;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PlatformType =
  | 'google'
  | 'tripadvisor'
  | 'trustpilot'
  | 'facebook'
  | 'yelp'
  | 'custom';

export interface ReviewPlatform {
  id: string;
  businessId: string;
  locationId: string | null;
  platform: PlatformType;
  url: string;
  displayName: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  priceCents: number;
  currency: string;
  productType: string;
  material: string | null;
  finish: string | null;
  images: string[] | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  priceCents: number;
  compareAtPriceCents: number | null;
  stockQuantity: number | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  currency: string;
  trackingNumber: string | null;
  trackingUrl: string | null;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string | null;
  variantId: string | null;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
  customization: Record<string, unknown> | null;
  createdAt: string;
}

export interface Device {
  id: string;
  businessId: string | null;
  locationId: string | null;
  code: string;
  deviceType: 'nfc' | 'qr' | 'both';
  label: string | null;
  isActive: boolean;
  activatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Scan {
  id: string;
  deviceId: string;
  scannedAt: string;
  deviceType: string | null;
  os: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
  platformSelected: string | null;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  priceCents: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: Record<string, unknown>;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface LandingPage {
  id: string;
  businessId: string;
  locationId: string | null;
  headline: string | null;
  subheadline: string | null;
  logoUrl: string | null;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  showPoweredBy: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsOverview {
  totalScans: number;
  uniqueVisitors: number;
  topPlatform: string | null;
  scansTrend: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  language?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface CreateBusinessPayload {
  name: string;
  slug: string;
  website?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  timezone?: string;
  language?: string;
}

export interface UpdateBusinessPayload {
  name?: string;
  slug?: string;
  website?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  timezone?: string;
  language?: string;
}
