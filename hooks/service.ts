import {
  GetDeploymentsRequest,
  GetDeploymentsResponse,
  Deployment,
  ServiceType,
  ProviderType,
  ChatRequest,
  ChatResponse,
  ChatMessage,
  SupportedCryptoCurrency,
} from "../lib/types";
import { CreateDeploymentSchemaType } from "@/lib/schemas/deployment";
import { DeploymentResult } from "../lib/types";
import { supabase } from "@/lib/supabase/client";
import {
  SignInCredentials,
  SignUpCredentials,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  AuthResponse,
} from "./auth/types";

const VERSION = "/api/v1";
const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3080") + VERSION;

// User response interface
interface UserResponse {
  message: string;
  user: number;
}

// Paginated response interface
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Token management
class AuthService {
  private static instance: AuthService;
  private _accessToken: string | null = null;

  private constructor() {
    // Initialize token from Supabase session if it exists
    this.initializeFromSession();
  }

  private async initializeFromSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
      this._accessToken = session.access_token;
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  getAccessToken(): string | null {
    return this._accessToken;
  }

  setAccessToken(token: string | null): void {
    this._accessToken = token;
  }
}

export const authService = AuthService.getInstance();

export function setAccessToken(token: string | null) {
  authService.setAccessToken(token);
}

// Basic request function
export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = authService.getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(error.message || "An error occurred");
  }

  return response.json();
}

// User Management
export async function createUser(address: string): Promise<UserResponse> {
  return request<UserResponse>("/user/register", {
    method: "POST",
    body: JSON.stringify({ address }),
  });
}

export async function createDeploymentNew(
  data: CreateDeploymentSchemaType
): Promise<DeploymentResult> {
  return request<DeploymentResult>("/deployments/deploy", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Deployment Services
export async function getUserDeployments(
  user: string,
  type?: ServiceType,
  provider?: ProviderType
): Promise<Deployment[]> {
  const query = new URLSearchParams();
  if (type) query.set("type", type);

  return request<Deployment[]>(
    "/deployments" + (query.toString() ? `?${query.toString()}` : ""),
    {
      method: "GET",
    }
  );
}

// Get deployment by ID
export async function getDeploymentById(
  deploymentId: number
): Promise<Deployment> {
  return request<Deployment>(`/deployments/${deploymentId}`);
}

// Close a deployment
export async function closeDeployment(deploymentId: number): Promise<void> {
  return request<void>("/deployments/close", {
    method: "POST",
    body: JSON.stringify({ deploymentId }),
  });
}

// Get user deployments by type
export async function getUserDeploymentsByType(
  userId: string,
  type: string,
  provider?: ProviderType
): Promise<Deployment[]> {
  return request<Deployment[]>("/deployments/user", {
    method: "POST",
    body: JSON.stringify({
      userId,
      type,
      provider: provider || null,
    }),
  });
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  // Since the backend doesn't have a history endpoint yet,
  // we'll return an empty array for now
  return [];
}

export async function clearChatHistory(): Promise<void> {
  // Since the backend doesn't have a clear history endpoint yet,
  // we'll do nothing for now
  return;
}

export async function getAquaCredits(): Promise<{ credits: number }> {
  return request<{ credits: number }>("/credits");
}

// Purchase Aqua Credits with cryptocurrency
export async function purchaseCredits(
  amount: number,
  creditAmount: number,
  currency: string = "BTC"
): Promise<any> {
  return request<any>("/credits/purchase", {
    method: "POST",
    body: JSON.stringify({ amount, creditAmount, currency }),
  });
}

// Get supported cryptocurrencies for payment
export async function getSupportedCryptocurrencies(): Promise<
  SupportedCryptoCurrency[]
> {
  return request<SupportedCryptoCurrency[]>("/payment/currencies");
}

// Get paginated deployments
export async function getPaginatedDeployments(
  userId: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<Deployment>> {
  return request<PaginatedResponse<Deployment>>(
    `/deployments/paginated?userId=${userId}&page=${page}&limit=${limit}`
  );
}

export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  preferences?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export async function getProfile(): Promise<UserProfile> {
  return request<UserProfile>("/user/profile");
}

// Update user profile
export async function updateProfile(
  profileData: Partial<UserProfile>
): Promise<UserProfile> {
  return request<UserProfile>("/user/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}

// Sync Supabase user with backend (called after authentication)
export async function syncUser(
  supabaseUserId: string,
  email: string
): Promise<UserProfile> {
  return request<UserProfile>("/user/sync", {
    method: "POST",
    body: JSON.stringify({ supabaseUserId, email }),
  });
}

export async function signUp({
  email,
  password,
}: SignUpCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    return {
      user: data.user,
      error: null,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      user: null,
      error: error as Error,
    };
  }
}

// Sign in an existing user with email and password
export async function signIn({
  email,
  password,
}: SignInCredentials): Promise<AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Set the access token after successful sign in
    if (data.session?.access_token) {
      authService.setAccessToken(data.session.access_token);
    }

    return {
      user: data.user,
      error: null,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      user: null,
      error: error as Error,
    };
  }
}

// Sign out the current user
export async function signOut(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear the access token after sign out
    authService.setAccessToken(null);

    return { error: null };
  } catch (error) {
    console.error("Sign out error:", error);
    return { error: error as Error };
  }
}

// Reset password by sending a password reset email
export async function resetPassword({
  email,
}: ResetPasswordRequest): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: error as Error };
  }
}

// Update user's password (after reset)
export async function updatePassword({
  password,
}: UpdatePasswordRequest): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Update password error:", error);
    return { error: error as Error };
  }
}

// Get the current user
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error("Get current user error:", error);
    return { user: null, error: error as Error };
  }
}

// Get the current session
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    // Update the access token if session exists
    if (data.session?.access_token) {
      authService.setAccessToken(data.session.access_token);
    }

    return { session: data.session, error: null };
  } catch (error) {
    console.error("Get session error:", error);
    return { session: null, error: error as Error };
  }
}

// Sign in with Google
export async function signInWithGoogle(): Promise<{ error: Error | null }> {
  console.log(
    "Signing in with Google",
    `${window.location.origin}/app/deployments`
  );
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/app/deployments`,
      },
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Google sign in error:", error);
    return { error: error as Error };
  }
}
