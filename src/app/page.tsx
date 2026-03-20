"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { PricingSection } from "@/sections/PricingSection";
import { ResultsSection } from "@/sections/ResultsSection";
import { ConfiguratorSection } from "@/sections/ConfiguratorSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { QuoteSection } from "@/sections/QuoteSection";
import { Footer } from "@/components/Footer";
import { ReactNode, useState } from "react";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function Home() {
  const [cart, setCart] = useState<{ name: string, price: number | string }[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleCheckout = () => {
    const quoteSection = document.getElementById("quote");
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center w-full overflow-x-hidden hide-scrollbar">
        <div className="w-full h-screen overflow-hidden shrink-0">
          <HeroSection />
        </div>

        <div className="w-full h-screen overflow-hidden shrink-0">
          <ResultsSection />
        </div>

        <div className="w-full h-screen overflow-hidden shrink-0">
          <ConfiguratorSection />
        </div>

        <div className="w-full h-screen overflow-hidden shrink-0">
          <PricingSection 
            cart={cart} 
            setCart={setCart} 
            selectedBrand={selectedBrand} 
            setSelectedBrand={setSelectedBrand}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            onCheckout={handleCheckout}
          />
        </div>

        <div className="w-full h-screen overflow-hidden shrink-0">
          <TestimonialsSection />
        </div>

        <div className="w-full h-screen overflow-hidden shrink-0">
          <QuoteSection 
            cart={cart}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
          />
        </div>

        <div className="w-full shrink-0">
          <Footer />
        </div>
      </main>
      
    </>
  );
}
