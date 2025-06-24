import { supabase } from "@/lib/supabase";

class AuthService {
  private static instance: AuthService;
  private _accessToken: string | null = null;

  private constructor() {
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
