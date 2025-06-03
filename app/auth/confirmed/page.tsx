import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmailConfirmedPage() {
  return (
    <div className="auth-container">
      <div className="auth-card text-center">
        <div className="space-element">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center space-tight">
            <svg
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="auth-title">Email Confirmed!</h1>
        <p className="auth-subtitle space-element">
          Your email address has been successfully verified. You can now sign in
          to your account.
        </p>

        <div className="mt-6">
          <Link href="/signin">
            <Button className="btn-primary btn-md w-full">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
