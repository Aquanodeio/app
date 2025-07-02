"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import AppNavbar from "@/features/navigation/components/AppNavbar";
import Providers from "@/components/providers/providers";
import { AppSidebar } from "@/features/navigation/components/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { paths } from "@/config/paths";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hideSidebarRoutes = [
    paths.auth.login.path,
    paths.auth.callback.path,
    paths.waitlist.path,
  ];
  const pathname = usePathname();
  const isSidebarHidden = hideSidebarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-background coal-texture`}
      >
        <Providers>
          {!isSidebarHidden && <AppSidebar />}
          <SidebarInset>
            {!isSidebarHidden && <AppNavbar />}
            <div>{children}</div>
          </SidebarInset>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
