import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    PROVIDER_TO_USE: z.string().optional().default("auto"),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_URL: z.string(),
    SPHERON_PROXY: z.string(),
    ALCHEMY_API_KEY: z.string(),
    API_URL: z.string(),
    FRONTEND_URL: z.string(),
  });

  const envVars = {
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SPHERON_PROXY: process.env.NEXT_PUBLIC_SPHERON_PROXY,
    ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    PROVIDER_TO_USE: process.env.NEXT_PUBLIC_PROVIDER_TO_USE,
    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n")}
  `
    );
  }

  return parsedEnv.data ?? {};
};

export const publicEnv = createEnv();
