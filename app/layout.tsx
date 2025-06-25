"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Layout from "@/components/Layout";
import { useState } from "react";
import { Toaster } from "sonner";
import AppNavbar from "@/components/AppNavbar";
import Providers from "@/components/providers/TanstackQueryProvider";
import { paths } from "@/config/paths";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if current route is auth-related
  //    const isAuthRoute = pathname.startsWith("/login");

  // Check if current route is landing page
  const isLandingPage = pathname === "/";

  // Determine which navbar to show based on route

  const hideNavbarRoutes: string[] = [paths.login.path];
  const showNavbar = !hideNavbarRoutes.includes(pathname);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-background coal-texture text-[97%]`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            {showNavbar && (
              <>
                {isLandingPage ? (
                  <></>
                ) : (
                  (pathname.startsWith("/app") ||
                    pathname.startsWith("/pricing")) && (
                    <AppNavbar onMobileMenuToggle={toggleMobileMenu} />
                  )
                )}
              </>
            )}
            <main className="flex-1">
              {pathname.startsWith("/app") ? (
                <Layout
                  mobileMenuOpen={mobileMenuOpen}
                  onMobileMenuToggle={toggleMobileMenu}
                >
                  {children}
                </Layout>
              ) : (
                <div className="mx-auto">{children}</div>
              )}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
