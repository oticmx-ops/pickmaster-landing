import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import SocialProof from "@/sections/SocialProof";
import ProblemSolution from "@/sections/ProblemSolution";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import ProductShowcase from "@/sections/ProductShowcase";
import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <ProductShowcase />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
