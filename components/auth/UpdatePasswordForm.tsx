"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updatePassword } from "@/hooks/service";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    // Validate inputs
    if (!password || !confirmPassword) {
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
      const { error } = await updatePassword({ password });

      if (error) {
        setError(error.message);
        return;
      }

      // Redirect to sign in page after successful password update
      router.push("/signin?updated=true");
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
        <h1 className="auth-title">Update Your Password</h1>
        <p className="auth-subtitle">Create a new secure password</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="auth-error">
            <p className="body-small">{error}</p>
          </div>
        )}

        <div className="auth-field">
          <Label htmlFor="password" className="auth-label">New Password</Label>
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
          <Label htmlFor="confirmPassword" className="auth-label">Confirm New Password</Label>
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
          {isLoading ? "Updating password..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}
