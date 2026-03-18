import { useState, useEffect } from "react";
import { Slider } from "@/components/Slider";
import { cn } from "@/lib/utils";
import { CardStack } from "@/components/ui/card-stack";

const RESULTS = [
  {
    id: "paint-1",
    number: "01",
    title: "ПОЛИРОВКА КУЗОВА",
    description: "Многоступенчатая восстановительная полировка, удаляющая 99% царапин.",
    beforeImage: "/BMW Before.webp",
    afterImage: "/BMW After.webp",
  },
  {
    id: "wheel-1",
    number: "02",
    title: "ПОКРАСКА",
    description: "Мощное преображение вашего автомобиля привлекая взгляды и вызывая восхищение.",
    beforeImage: "/GELENWAGEN Before.webp",
    afterImage: "/GELENWAGEN After.webp",
  },
  {
    id: "interior-1",
    number: "03",
    title: "ХИМЧИСТКА САЛОНА",
    description: "Удаление сложных загрязнений, запахов и восстановление внешнего вида сидений салона.",
    beforeImage: "/SALON Before.webp",
    afterImage: "/SALON After.webp",
  },
  {
    id: "protection-1",
    number: "04",
    title: "ПЛЕНКА",
    description: "Оклейка кузова виниловой пленкой для защиты и смены внешнего вида.",
    beforeImage: "/PORSCHE Before.webp",
    afterImage: "/PORSCHE After.webp",
  },
  {
    id: "dent-repair",
    number: "05",
    title: "УДАЛЕНИЕ ВМЯТИН",
    description: "Без покраски и лишних вмешательств.",
    beforeImage: "/REMONT Before.webp",
    afterImage: "/REMONT After.webp",
    beforePosition: "center",
    afterPosition: "50% center",
  },
  {
    id: "engine-1",
    number: "06",
    title: "ЧИСТКА ПОД КАПОТОМ",
    description: "Глубокая чистка и дезинфекция — удаляем пыль, грязь и нагар.",
    beforeImage: "/KAPOT Before.webp",
    afterImage: "/KAPOT After.webp",
  },
];

export function ResultsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardSize, setCardSize] = useState({ width: 450, height: 280 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardSize({ width: width - 40, height: (width - 40) * 0.7 });
      } else if (width < 1024) {
        setCardSize({ width: 380, height: 240 });
      } else {
        setCardSize({ width: 450, height: 280 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionSettings = {
    paddingY: "py-12 md:py-20",
    header: {
      marginBottom: "mb-8",
    },
  };

  return (
    <section id="results" className={cn("relative flex flex-col items-center min-h-screen bg-[#0145f2] overflow-hidden justify-center px-4 md:px-8", sectionSettings.paddingY)}>
      <div className="w-full max-w-7xl z-10 relative">
        {/* Editorial Header */}
        <div className={cn("relative flex flex-col items-center text-center", sectionSettings.header.marginBottom)}>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none mb-3">
            ПРЕОБРАЖЕНИЕ АВТО
          </h2>
          <p className="font-sans text-[10px] md:text-sm text-white/70 max-w-xl font-bold tracking-[0.2em] uppercase">
            Результат нашей работы
          </p>
        </div>

        {/* CardStack Container - relying on CardStack defaults */}
        <div className="relative w-full flex flex-col items-center min-h-[420px]">
          <CardStack
            items={RESULTS}
            onChangeIndex={(index) => setActiveIndex(index)}
            cardWidth={cardSize.width}
            cardHeight={cardSize.height}
            maxVisible={5}
            overlap={0.5}
            spreadDeg={16}
            perspectivePx={1400}
            depthPx={120}
            tiltXDeg={8}
            autoAdvance
            intervalMs={3000}
            className="max-w-6xl"
            renderCard={(item, { active }) => (
              <div className="relative w-full h-full bg-black group overflow-hidden rounded-xl shadow-2xl">
                <Slider
                  beforeImage={item.beforeImage!}
                  afterImage={item.afterImage!}
                  beforePosition={item.beforePosition}
                  afterPosition={item.afterPosition}
                  className={cn("transition-opacity duration-300", !active && "opacity-60 pointer-events-none")}
                />
                
                {/* Info Overlay - Visible on active card */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/100 via-black/40 to-transparent z-[100] pointer-events-none",
                  "transition-all duration-300 transform",
                  active ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                )}>
                  <div className="flex justify-between items-end gap-3 w-full">
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tight leading-none truncate">
                        {item.title}
                      </h3>
                      <p className="text-white text-[9px] md:text-xs font-black uppercase tracking-[0.12em] opacity-100">
                        {item.description}
                      </p>
                    </div>
                    {/* Number badge */}
                    <div className="bg-white/10 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center border border-white/20 shrink-0">
                      <span className="text-white font-bold text-xs">{item.number}</span>
                    </div>
                  </div>
                </div>

                {/* Back number badge */}
                {!active && (
                  <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center border border-white/20 z-10 transition-opacity duration-300">
                    <span className="text-white font-bold text-xs">{item.number}</span>
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
      </div>
    </section>
  );
}
