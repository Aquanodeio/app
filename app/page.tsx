import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { AquaServices } from "@/components/landing/AquaServices";
import NewsletterSection from "@/components/landing/NewsletterSection";
import UnifiedComputeSection from "@/components/landing/UnifiedComputeSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#0A0118] overflow-x-hidden overflow-y-auto flex flex-col items-center">
      <Hero />
      <Features />
      <AquaServices />
      <UnifiedComputeSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
