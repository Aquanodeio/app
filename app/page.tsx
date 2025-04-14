"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import AquaLayer from "@/components/AquaLayer";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Solutions />
      <AquaLayer />
      <Services />
      <CTA />
      <Footer />
    </div>
  );
}
