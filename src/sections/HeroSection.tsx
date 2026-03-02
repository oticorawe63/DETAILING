import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center pb-32 justify-center">
      <div className="w-full max-w-7xl px-8 flex flex-col items-center z-10 relative text-center justify-start">
        <div>
          <h1 className="font-display text-6xl md:text-8xl tracking-tighter uppercase text-slate-900 dark:text-white leading-none italic font-semibold">
            Premium<br />Detailing
          </h1>
          <p className="font-sans text-lg md:text-2xl text-slate-600 dark:text-slate-300 mt-4 tracking-[0.5em] uppercase">
            БЛЕСК.КАЧЕСТВО.ЗАЩИТА
          </p>
        </div>
      </div>

      {/* Decorative gradient overlay matching design */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/50 to-transparent dark:from-white/5 pointer-events-none -z-10"></div>
    </section>
  );
}
