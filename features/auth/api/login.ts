import { publicEnv } from "@/config/public-env";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const redirectTo = `${publicEnv.FRONTEND_URL}/app/deployments`;

// Sign in with Google
export async function signInWithGoogle(): Promise<{ error: Error | null }> {
  try {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    console.log("data", data);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Google sign in error:", error);
    toast.error("Failed to sign in with Google");
    return { error: error as Error };
  }
}

export async function signInWithGitHub(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        scopes: "repo user:email",
        redirectTo,
      },
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("GitHub sign in error:", error);
    toast.error("Failed to connect GitHub");
    return { error: error as Error };
  }
}
