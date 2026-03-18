import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroSection() {
  // --- НАСТРОЙКИ ТЕКСТА (OPTIMIZED FOR SCREEN SIZE) ---
  const textSettings = {
    container: {
      left: "58px",
      top: "-115px",
    },
    // ЗАГОЛОВОК
    title: {
      fontSize: "82px",
      lineHeight: ".92",
      letterSpacing: "-0.06em",
      marginBottom: "28px",
    },
    // ПОДЗАГОЛОВОК
    subtitle: {
      left: "4px",
      top: "25px",
      fontSize: "20px",
      lineHeight: "1.6",
      maxWidth: "480px",
      marginBottom: "40px",
    },
    // КНОПКА
    button: {
      left: "4px",
      top: "52px",
      fontSize: "20px",
      paddingX: "37px",
      paddingY: "17px",
      borderRadius: "0px",
      backgroundColor: "#0145f2",
      textColor: "#ffffff",
    },
    // СТАТИСТИКА (НОВОЕ)
    stats: {
      left: "4px",                // Мгновенное смещение
      top: "133px",                // Смещение под кнопку
      gap: "12px",                // Расстояние между иконкой и текстом
      numberFontSize: "18px",     // Размер 1000+
      textFontSize: "14px",       // Размер "Довольных клиентов"
      count: "1K+",               // Текст в последнем кружке
      label: "Довольных клиентов", // Основной текст
      avatarSize: "40px",         // Размер кружочков (ширина и высота)
    }
  };

  const imageSettings = {
    src: "/Gelenwagen Hero.jpg",
    width: "100%",
    top: "-3%",
    right: "-12.5%",
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col items-center pt-24 justify-center bg-[#f8fafc] overflow-hidden">
      {/* Главный контейнер с МГНОВЕННЫМ позиционированием */}
      <div
        className="w-full flex flex-col items-center z-10"
        style={{
          transform: `translate(${textSettings.container.left}, ${textSettings.container.top})`
        }}
      >
        <div className="w-full px-8 flex flex-col items-start relative text-left">
          <div className="relative w-full">
            {/* Decorative line */}
            <div
              className="absolute -top-8 left-0 h-[2px] bg-[#0145f2] w-[100px]"
            />

            {/* Title */}
            <h1
              className="font-display text-[#000000] relative pointer-events-none"
              style={{
                fontSize: textSettings.title.fontSize,
                lineHeight: textSettings.title.lineHeight,
                letterSpacing: textSettings.title.letterSpacing,
                marginBottom: textSettings.title.marginBottom
              }}
            >
              <div className="flex flex-wrap gap-[0.3em]">
                <span className="font-black">
                  ПРЕМИУМ ДЕТЕЙЛИНГ
                </span>
              </div>
              <div>
                <span className="font-black text-[#0145f2]">
                  В МОСКВЕ
                </span>
              </div>
            </h1>

            {/* Subtitle с МГНОВЕННЫМ позиционированием */}
            <div
              style={{
                transform: `translate(${textSettings.subtitle.left}, ${textSettings.subtitle.top})`
              }}
            >
              <p
                className="font-sans text-[#000000] tracking-normal font-medium mb-12"
                style={{
                  fontSize: textSettings.subtitle.fontSize,
                  lineHeight: textSettings.subtitle.lineHeight,
                  maxWidth: textSettings.subtitle.maxWidth,
                  marginBottom: textSettings.subtitle.marginBottom
                }}
              >
                Профессиональный уход и защита вашего автомобиля.
              </p>
            </div>

            {/* Button с МГНОВЕННЫМ позиционированием */}
            <div
              style={{
                transform: `translate(${textSettings.button.left}, ${textSettings.button.top})`
              }}
            >
              <button
                onClick={() => scrollTo("quote")}
                className="group relative overflow-hidden font-display font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:tracking-[0.25em] active:scale-95 pointer-events-auto shadow-xl shadow-primary/10"
                style={{
                  fontSize: textSettings.button.fontSize,
                  paddingLeft: textSettings.button.paddingX,
                  paddingRight: textSettings.button.paddingX,
                  paddingTop: textSettings.button.paddingY,
                  paddingBottom: textSettings.button.paddingY,
                  borderRadius: textSettings.button.borderRadius,
                  backgroundColor: textSettings.button.backgroundColor,
                  color: textSettings.button.textColor,
                }}
              >
                <span className="relative z-10">Рассчитать стоимость</span>
                <div className="absolute inset-0 bg-[#000000] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>

            {/* Statistics с АБСОЛЮТНЫМ позиционированием (чтобы не сдвигать остальные элементы) */}
            <div
              className="absolute flex items-center"
              style={{
                transform: `translate(${textSettings.stats.left}, ${textSettings.stats.top})`,
                gap: textSettings.stats.gap,
                top: "100%", // Начинаем от нижней границы кнопки/контента
                left: 0
              }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-full border-2 border-white bg-[#edf1f5] flex items-center justify-center overflow-hidden shadow-sm"
                    style={{ width: textSettings.stats.avatarSize, height: textSettings.stats.avatarSize }}
                  >
                    <img
                      src={`/avatars/avatar${i}.png`}
                      alt={`Happy Client ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div
                  className="rounded-full border-2 border-white bg-[#0145f2] text-white flex items-center justify-center shadow-lg z-10"
                  style={{ width: textSettings.stats.avatarSize, height: textSettings.stats.avatarSize }}
                >
                  <span className="font-black text-[10px]">{textSettings.stats.count}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[#000000] uppercase tracking-wider" style={{ fontSize: textSettings.stats.textFontSize }}>
                  {textSettings.stats.label}
                </span>
                <div className="flex gap-0.5 text-[#0145f2]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div
        className="absolute pointer-events-none -z-0"
        style={{
          width: imageSettings.width,
          top: imageSettings.top,
          right: imageSettings.right,
          opacity: 1,
          transform: "scale(1) translateX(0)"
        }}
      >
        <div className="relative">
          <img
            src={imageSettings.src}
            alt="Luxury Detailing Car"
            className="w-full h-auto object-contain brightness-[1.1] contrast-[1.12] saturate-[0.9] drop-shadow-[0_45px_100px_rgba(0,0,0,0.15)]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
          />
        </div>
      </div>


      {/* Depth Watermark */}
      <div className="absolute bottom-6 right-8 font-display font-black text-[12vw] text-black/[0.02] leading-none pointer-events-none select-none uppercase">
        G-Wagon
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent pointer-events-none -z-10" />
    </section>
  );
}
