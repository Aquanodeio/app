"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { signUp } from "@/hooks/service";
import GoogleSignInButton from "./GoogleSignInButton";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError(null);
    setSuccessMessage(null);

    // Validate inputs
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      const { user, error } = await signUp({ email, password });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccessMessage(
        "Registration successful! Please check your email to confirm your account. After confirming, your account will be automatically synced with our application."
      );
      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h1 className="auth-title">Create an Account</h1>
        <p className="auth-subtitle">Sign up to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="auth-error">
            <p className="body-small">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="auth-success">
            <p className="body-small">{successMessage}</p>
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
          <Label htmlFor="password" className="auth-label">Password</Label>
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

        <div className="auth-field">
          <Label htmlFor="confirmPassword" className="auth-label">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="input-base input-focus"
            required
          />
        </div>

        <Button type="submit" className="btn-primary btn-md w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <div className="auth-divider-text">Or</div>
        </div>

        <GoogleSignInButton />
      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <a href="/signin" className="auth-link">
          Sign in
        </a>
      </div>
    </div>
  );
}
