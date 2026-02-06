import axios, { AxiosError } from 'axios';
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  Business,
  Location,
  ReviewPlatform,
  Product,
  Order,
  Device,
  SubscriptionPlan,
  LandingPage,
  AnalyticsOverview,
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  CreateBusinessPayload,
  UpdateBusinessPayload,
  ApiError,
} from '@/types/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('auth_token='))
      ?.split('=')[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const locale =
      window.location.pathname.match(/^\/(en|nb)/)?.[1] ?? 'en';
    config.headers['Accept-Language'] = locale;
  }
  return config;
});

function handleApiError(error: unknown): never {
  if (error instanceof AxiosError && error.response) {
    const apiError: ApiError = {
      message: error.response.data?.message ?? 'An error occurred',
      errors: error.response.data?.errors,
    };
    throw apiError;
  }
  throw { message: 'Network error. Please try again.' } satisfies ApiError;
}

// Auth
export async function login(
  payload: LoginPayload
): Promise<{ user: User; token: string }> {
  try {
    const { data } = await api.post<
      ApiResponse<{ user: User; token: string }>
    >('/auth/login', payload);
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function register(
  payload: RegisterPayload
): Promise<{ user: User; token: string }> {
  try {
    const { data } = await api.post<
      ApiResponse<{ user: User; token: string }>
    >('/auth/register', payload);
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    return handleApiError(error);
  }
}

export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<{ message: string }> {
  try {
    const { data } = await api.post<ApiResponse<{ message: string }>>(
      '/auth/forgot-password',
      payload
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchCurrentUser(): Promise<User> {
  try {
    const { data } = await api.get<ApiResponse<User>>('/auth/user');
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Products (public)
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } =
      await api.get<PaginatedResponse<Product>>('/products');
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchProduct(slug: string): Promise<Product> {
  try {
    const { data } = await api.get<ApiResponse<Product>>(
      `/products/${slug}`
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Pricing (public)
export async function fetchPricingPlans(): Promise<SubscriptionPlan[]> {
  try {
    const { data } =
      await api.get<ApiResponse<SubscriptionPlan[]>>('/pricing');
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Businesses
export async function fetchBusinesses(): Promise<Business[]> {
  try {
    const { data } =
      await api.get<PaginatedResponse<Business>>('/businesses');
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchBusiness(id: string): Promise<Business> {
  try {
    const { data } = await api.get<ApiResponse<Business>>(
      `/businesses/${id}`
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createBusiness(
  payload: CreateBusinessPayload
): Promise<Business> {
  try {
    const { data } = await api.post<ApiResponse<Business>>(
      '/businesses',
      payload
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateBusiness(
  id: string,
  payload: UpdateBusinessPayload
): Promise<Business> {
  try {
    const { data } = await api.put<ApiResponse<Business>>(
      `/businesses/${id}`,
      payload
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteBusiness(id: string): Promise<void> {
  try {
    await api.delete(`/businesses/${id}`);
  } catch (error) {
    return handleApiError(error);
  }
}

// Locations
export async function fetchLocations(
  businessId: string
): Promise<Location[]> {
  try {
    const { data } = await api.get<PaginatedResponse<Location>>(
      `/businesses/${businessId}/locations`
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Review Platforms
export async function fetchPlatforms(
  businessId: string
): Promise<ReviewPlatform[]> {
  try {
    const { data } = await api.get<PaginatedResponse<ReviewPlatform>>(
      `/businesses/${businessId}/platforms`
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Devices
export async function fetchDevices(
  businessId: string
): Promise<Device[]> {
  try {
    const { data } = await api.get<PaginatedResponse<Device>>(
      `/businesses/${businessId}/devices`
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Analytics
export async function fetchAnalyticsOverview(
  businessId: string
): Promise<AnalyticsOverview> {
  try {
    const { data } = await api.get<ApiResponse<AnalyticsOverview>>(
      `/businesses/${businessId}/analytics/overview`
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Landing Page
export async function fetchLandingPage(
  businessId: string
): Promise<LandingPage> {
  try {
    const { data } = await api.get<ApiResponse<LandingPage>>(
      `/businesses/${businessId}/landing-page`
    );
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

// Orders
export async function fetchOrders(): Promise<Order[]> {
  try {
    const { data } =
      await api.get<PaginatedResponse<Order>>('/orders');
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchOrder(id: string): Promise<Order> {
  try {
    const { data } = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
}
