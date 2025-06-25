import { publicEnv } from "@/config/public-env";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    publicEnv.SUPABASE_URL!,
    publicEnv.SUPABASE_ANON_KEY!
  );
}

export const supabase = createClient();
