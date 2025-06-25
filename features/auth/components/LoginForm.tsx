"use client";

import { signInWithGitHub, signInWithGoogle } from "@/features/auth/api/login";
import Image from "next/image";
import GoogleIcon from "@/assets/icons/google.png";
import SocialLoginButton from "@/features/auth/components/SocialLoginButton";
import GithubIcon from "@/assets/icons/github.png";
import AquanodeLogo from "@/assets/aquanode-logo.png";

import { cn } from "@/lib/utils";

export default function LoginForm() {
  return (
    <div className="auth-container">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>

      <div className="auth-card p-8">
        <div className="auth-header space-element">
          <Image
            className="mx-auto mb-4"
            src={AquanodeLogo}
            alt="Aquanode"
            width={64}
            height={64}
          />
          <h1 className="auth-title">Login to Aquanode</h1>
          <p className="auth-subtitle">Please sign in to continue</p>
        </div>

        <div className="auth-form">
          <SocialLoginButton
            Icon={
              <Image src={GoogleIcon} alt="Google" width={20} height={20} />
            }
            label="Continue with Google"
            onClick={() => signInWithGoogle()}
          />

          <SocialLoginButton
            Icon={
              <Image src={GithubIcon} alt="Github" width={20} height={20} />
            }
            label="Continue with Github"
            onClick={() => signInWithGitHub()}
          />
        </div>
      </div>
    </div>
  );
}
