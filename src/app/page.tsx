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

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen flex-col items-center snap-y snap-mandatory overflow-y-auto h-screen w-full overflow-x-hidden hide-scrollbar">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="w-full h-screen snap-start snap-always shrink-0"
        >
          <HeroSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="w-full h-screen snap-start snap-always shrink-0"
        >
          <ResultsSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="w-full h-screen snap-start snap-always shrink-0"
        >
          <ConfiguratorSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="w-full h-screen snap-start snap-always shrink-0"
        >
          <PricingSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="w-full h-screen snap-start snap-always shrink-0"
        >
          <TestimonialsSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="w-full h-screen snap-start snap-always shrink-0 flex flex-col justify-between"
        >
          <QuoteSection />
          <Footer />
        </motion.div>
      </main>
    </>
  );
}
