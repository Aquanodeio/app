// components/Layout.tsx
"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/hooks/auth/useAuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar container */}
        <Sidebar isMobileOpen={mobileMenuOpen} />

        {/* Main content - with left margin to accommodate fixed sidebar */}
        <main className="flex-1 ml-0 md:ml-72 overflow-auto">
          <div className="h-full p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
