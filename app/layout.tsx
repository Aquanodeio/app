"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import DesktopOnly from "@/components/DesktopOnly";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/hooks/auth/useAuthContext";
import { Toaster } from "sonner";
import AppNavbar from "@/components/AppNavbar";
const inter = Inter({ subsets: ["latin"] });


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (

      <QueryClientProvider client={queryClient}>
        <AuthProvider>{mounted && children}</AuthProvider>
      </QueryClientProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if current route is auth-related
  const isAuthRoute =
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/reset-password");

  // Check if current route is landing page
  const isLandingPage = pathname === "/";

  // Determine which navbar to show based on route
  const showNavbar = !isAuthRoute;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-background coal-texture text-[97%]`}
      >
        <Providers>
          <DesktopOnly>
            <div className="flex flex-col min-h-screen">
              {showNavbar && (
                <>
                  {isLandingPage ? (
                    <></>
                  ) : (
                    (pathname.startsWith("/app") || pathname.startsWith("/pricing")) && <AppNavbar onMobileMenuToggle={toggleMobileMenu} />
                  )}
                </>
              )}
              <main className="flex-1">
                {pathname.startsWith("/app") ? (
                  <Layout mobileMenuOpen={mobileMenuOpen} onMobileMenuToggle={toggleMobileMenu}>{children}</Layout>
                ) : (
                  <div className="mx-auto">{children}</div>
                )}
              </main>
            </div>
          </DesktopOnly>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
