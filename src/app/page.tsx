import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import ActiveQuinielas from "@/sections/ActiveQuinielas";
import HowItWorks from "@/sections/HowItWorks";
import Features from "@/sections/Features";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";
import StickyCTA from "@/components/ui/StickyCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden pb-[72px] md:pb-0">
      <Navbar />
      <Hero />
      <ActiveQuinielas />
      <HowItWorks />
      <Features />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
}
