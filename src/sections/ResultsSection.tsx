import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/Slider";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/components/MaterialIcon";

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
    afterPosition: "50% center", // Тянем фото "После" сильнее влево для совмещения
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
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(RESULTS.length / 3);

  // --- НАСТРОЙКИ ЭТОГО РАЗДЕЛА ---
  const sectionSettings = {
    // --- ГЛОБАЛЬНЫЕ НАСТРОЙКИ РАЗДЕЛА ---
    paddingY: "py-16 md:py-24",      // Вертикальные отступы раздела
    contentOffsetTop: "-20px",       // Общее смещение всего контента

    // --- ЗАГОЛОВОК ---
    header: {
      offsetTop: "0px",              // Смещение заголовка
      marginBottom: "mb-8",         // Отступ под заголовком
    },

    // --- СЕТКА С КАРТОЧКАМИ ---
    grid: {
      offsetTop: "0px",              // Смещение сетки с работами
      gap: "gap-8 md:gap-14",        // Расстояние между карточками
      cardRounding: "rounded-[2.5rem]", // Скругление углов окон
    },

    // --- ПОЛОСЫ И ЦИФРЫ (01, 02...) ---
    indicators: {
      lineLength: "300px",           // Длина полосы
      lineWidth: "1px",             // Толщина полосы
      lineColor: "bg-white/100",     // Цвет и прозрачность полосы
      marginBottom: "mb-4",          // Отступ под полосой и цифрой
    },

    // --- СТРЕЛКИ НАВИГАЦИИ ---
    navigation: {
      offsetSides: "-left-4 -right-4 lg:-left-20 lg:-right-20", // Вылет стрелок в бока
      offsetVertical: "top-1/2 -translate-y-1/2",               // Позиция по вертикали
    },

    // --- ТОЧКИ (ПАГИНАЦИЯ) ---
    pagination: {
      marginTop: "mt-11",             // Отступ сверху от сетки
      marginBottom: "mb-8",          // Отступ снизу до края раздела
      dotGap: "gap-3",               // Расстояние между точками
    },
  };
  // ------------------------------

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentResults = RESULTS.slice(currentPage * 3, (currentPage + 1) * 3);

  return (
    <section id="results" className={cn("relative flex flex-col items-center min-h-screen bg-[#0145f2] overflow-hidden justify-center px-4 md:px-8", sectionSettings.paddingY)}>

      <div className="w-full max-w-7xl z-10 relative" style={{ marginTop: sectionSettings.contentOffsetTop }}>
        {/* Editorial Header */}
        <div
          className={cn("relative flex flex-col items-start lg:items-center text-left lg:text-center", sectionSettings.header.marginBottom)}
          style={{ transform: `translateY(${sectionSettings.header.offsetTop})` }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none mb-4">
            ПРЕОБРАЖЕНИЕ АВТО
          </h2>
          <p className="font-sans text-sm md:text-lg text-white max-w-xl font-medium tracking-wide uppercase">
            Результат нашей работы
          </p>
        </div>

        {/* Results Grid with Navigation */}
        <div
          className="relative group/nav"
          style={{ transform: `translateY(${sectionSettings.grid.offsetTop})` }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={cn("grid grid-cols-1 lg:grid-cols-3 w-full", sectionSettings.grid.gap)}
            >
              {currentResults.map((result, index) => (
                <div key={result.id} className="flex flex-col">
                  {/* Number Indicator */}
                  <div className={cn("flex items-center gap-4", sectionSettings.indicators.marginBottom)}>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{result.number}</h2>
                    <div
                      className={cn(sectionSettings.indicators.lineColor)}
                      style={{ height: sectionSettings.indicators.lineWidth, width: sectionSettings.indicators.lineLength }}
                    />
                  </div>

                  {/* Main Slider Container */}
                  <div
                    className={cn(
                      "relative aspect-[3/2] w-full overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:-translate-y-1.5 z-10",
                      sectionSettings.grid.cardRounding
                    )}
                  >
                    <Slider
                      beforeImage={result.beforeImage}
                      afterImage={result.afterImage}
                      beforePosition={(result as any).beforePosition || "center"}
                      afterPosition={(result as any).afterPosition || "center"}
                      className="z-10"
                    />
                  </div>

                  {/* Info Label */}
                  <div className="mt-6 px-4">
                    <h3 className="font-display text-xl md:text-2xl font-black text-white !opacity-100 mb-2 tracking-tight whitespace-nowrap">
                      {result.title}
                    </h3>
                    <p className="font-sans text-white !opacity-100 leading-relaxed text-xs md:text-sm font-medium">
                      {result.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className={cn("absolute -left-4 -right-4 lg:-left-20 lg:-right-20 flex justify-between pointer-events-none z-30", sectionSettings.navigation.offsetVertical)}>
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-[#0145f2] transition-colors"
            >
              <MaterialIcon name="chevron_left" className="text-3xl md:text-4xl" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-white hover:text-[#0145f2] transition-colors"
            >
              <MaterialIcon name="chevron_right" className="text-3xl md:text-4xl" />
            </motion.button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className={cn("flex justify-center", sectionSettings.pagination.marginTop, sectionSettings.pagination.marginBottom, sectionSettings.pagination.dotGap)}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentPage === i ? "bg-white w-8" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
