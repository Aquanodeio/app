"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AppHeader } from "@/components/app/AppHeader";
import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          {/* <Sidebar /> */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
