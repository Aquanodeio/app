import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { publicEnv } from "@/config/public-env";
import { paths } from "@/config/paths";

// Helper function to check if user is on waitlist
async function checkWaitlistStatus(
  supabase: any,
  userId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("whitelisted")
      .select("user_id")
      .eq("user_id", userId)
      .single();

    // If no error and data exists, user is on waitlist (approved)
    return !error && data;
  } catch (error) {
    console.error("Waitlist check failed:", error);
    return false;
  }
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = [paths.auth.login.path, paths.auth.callback.path];

  // Define routes that bypass waitlist (like a waitlist landing page)
  const waitlistBypassRoutes = [
    paths.waitlist.path,
    paths.auth.login.path,
    paths.auth.callback.path,
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  // Check if the current path bypasses waitlist
  const bypassesWaitlist = waitlistBypassRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  // Skip auth check for static files, API routes, and Next.js internal files

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    publicEnv.SUPABASE_URL,
    publicEnv.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the user session
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If it's a public route, allow access regardless of auth status
  if (isPublicRoute) {
    return supabaseResponse;
  }

  // If user is not authenticated and trying to access a protected route
  if (!user && !isPublicRoute) {
    const redirectUrl = new URL("/login", request.url);
    // Preserve the original URL as a return parameter
    redirectUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and trying to access auth pages, redirect to app
  if (
    user &&
    (pathname === "/login" || pathname === "/signin" || pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  // WAITLIST GATING: Check if authenticated user is on waitlist
  if (user && !bypassesWaitlist) {
    const isOnWaitlist = await checkWaitlistStatus(supabase, user.id);

    if (!isOnWaitlist) {
      // User is not on waitlist, redirect to waitlist page
      return NextResponse.redirect(new URL("/waitlist", request.url));
    }
  }

  return supabaseResponse;
}
