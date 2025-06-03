"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { signIn } from "@/hooks/service";
import { useRouter } from "next/navigation";
import { syncUser } from "@/hooks/service";
import GoogleSignInButton from "./GoogleSignInButton";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    // Validate inputs
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);
      const { user, error } = await signIn({ email, password });

      if (error) {
        setError(error.message);
        return;
      }

      // Sync user with backend
      if (user) {
        try {
          await syncUser(user.id, user.email || "");
        } catch (syncError) {
          console.error("Failed to sync user with backend:", syncError);
          // Continue despite sync error - non-blocking
        }
      }

      // Redirect to dashboard on successful login
      router.push("/app/deployments");
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/reset-password");
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="auth-error">
            <p className="body-small">{error}</p>
          </div>
        )}

        <div className="auth-field">
          <Label htmlFor="email" className="auth-label">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="input-base input-focus"
            required
          />
        </div>

        <div className="auth-field">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="auth-label">Password</Label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="auth-link caption"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input-base input-focus"
            required
          />
        </div>

        <Button type="submit" className="btn-primary btn-md w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <div className="auth-divider-text">Or</div>
        </div>

        <GoogleSignInButton />
      </form>

      <div className="auth-footer">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="auth-link">
          Sign up
        </a>
      </div>
    </div>
  );
}
