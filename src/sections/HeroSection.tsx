import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col items-center pt-32 justify-start">
      <div className="w-full max-w-7xl px-8 flex flex-col items-center z-10 relative text-center justify-start mt-20">
        <div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tighter uppercase text-white leading-none italic font-semibold">
            Premium<br />Detailing
          </h1>
          <p className="font-sans text-base md:text-xl text-slate-300 mt-4 tracking-[0.5em] uppercase">
            БЛЕСК.КАЧЕСТВО.ЗАЩИТА
          </p>
        </div>
      </div>

      {/* Decorative gradient overlay matching design */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/50 to-transparent from-white/5 pointer-events-none -z-10"></div>
    </section>
  );
}
