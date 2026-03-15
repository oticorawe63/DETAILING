import { cn } from "@/lib/utils";

export function HeroSection() {
  // --- НАСТРОЙКИ ИЗОБРАЖЕНИЯ ---
  const imageSettings = {
    src: "/Gelenwagen Hero.jpg",
    width: "100%",          // Ширина картинки
    top: "-5%",            // Отступ сверху
    right: "-13%",          // Отступ справа
    opacity: 1.0,          // Прозрачность
  };
  // -----------------------------

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col items-center pt-32 justify-start bg-background-light overflow-hidden">
      <div className="w-full max-w-7xl px-8 flex flex-col items-start z-10 relative text-left justify-start mt-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-6xl md:text-8xl tracking-tighter text-primary leading-none font-bold">
            Детейлинг<br />В Москве
          </h1>
          <p className="font-sans text-base md:text-xl text-black mt-6 tracking-normal font-medium">
            Премиальный уход<br />и защита вашего автомобиля
          </p>
        </div>
      </div>

      {/* Hero Image with custom controls */}
      <div
        className="absolute pointer-events-none -z-0 transition-all duration-500"
        style={{
          width: imageSettings.width,
          top: imageSettings.top,
          right: imageSettings.right,
          opacity: imageSettings.opacity,
        }}
      >
        <img
          src={imageSettings.src}
          alt="Mercedes G-Class Detailing"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-background-light via-transparent to-transparent pointer-events-none -z-10"></div>
    </section>
  );
}
