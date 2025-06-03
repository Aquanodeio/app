"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { resetPassword } from "@/hooks/service";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError(null);
    setSuccessMessage(null);

    // Validate input
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await resetPassword({ email });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccessMessage(
        "Password reset instructions have been sent to your email"
      );
      // Clear form
      setEmail("");
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
        <h1 className="auth-title">Reset Your Password</h1>
        <p className="auth-subtitle">
          Enter your email and we&apos;ll send you instructions to reset your
          password
        </p>
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

        <Button type="submit" className="btn-primary btn-md w-full" disabled={isLoading}>
          {isLoading ? "Sending instructions..." : "Send reset instructions"}
        </Button>
      </form>

      <div className="auth-footer">
        Remember your password?{" "}
        <a href="/signin" className="auth-link">
          Sign in
        </a>
      </div>
    </div>
  );
}
