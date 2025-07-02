import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { paths } from "@/config/paths";
import Image from "next/image";
import AquanodeLogo from "@/assets/aquanode-logo.png";

export default async function WaitlistPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If not authenticated, redirect to login
  if (!user) {
    redirect(paths.auth.login.path);
  }

  // Check if user is now on waitlist (in case they were just added)
  const { data: waitlistEntry } = await supabase
    .from("whitelisted")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  // If user is now on waitlist, redirect to app
  if (waitlistEntry) {
    redirect("/app");
  }

  async function handleSignOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect(paths.auth.login.path);
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      {/* Better background with grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Single floating accent */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg mx-auto space-y-12">
        {/* Logo with subtle glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-accent/10 rounded-full blur-xl scale-125"></div>
          <Image
            className="relative mx-auto"
            src={AquanodeLogo}
            alt="Aquanode"
            width={72}
            height={72}
          />
        </div>

        {/* Main message */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight">
              You're in line
            </h1>
            <p className="text-lg text-muted-foreground">
              We're preparing something amazing for you
            </p>
          </div>

          {/* Status section */}
          <div className="space-y-4">
            {/* User indicator with better design */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-card/60 border border-border/40 rounded-full backdrop-blur-sm">
              <div className="relative flex items-center">
                <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse"></div>
                <div className="absolute w-2.5 h-2.5 bg-accent rounded-full animate-ping opacity-20"></div>
              </div>
              <span className="text-sm font-medium text-foreground/90">
                {user.email}
              </span>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="bg-card/30 border border-border/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 bg-accent/10 rounded-full">
            <svg
              className="w-5 h-5 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-2">
            What's next?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our team is reviewing applications and will notify you via email
            once you're approved. Keep an eye on your inbox!
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4 pt-4">
          <form action={handleSignOut}>
            <button
              type="submit"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Sign out and try different account
            </button>
          </form>

          <div className="text-xs text-muted-foreground/60">
            Questions? Contact us at contact@aquanode.io
          </div>
        </div>
      </div>
    </div>
  );
}
