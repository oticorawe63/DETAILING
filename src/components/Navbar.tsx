import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  // --- НАСТРОЙКИ ШАПКИ ---
  const navbarSettings = {
    // Контейнер всей шапки
    container: {
      left: "0px",                      // Смещение всей шапки вправо/влево
      top: "-15px",                       // Смещение всей шапки вверх/вниз
      paddingX: "32px",                 // Горизонтальные отступы (px)
      paddingY: "24px",                 // Вертикальные отступы (px)
      backgroundColor: "transparent",    // Цвет фона
    },
    // Логотип (DETAILING23)
    logo: {
      left: "0px",                      // Индивидуальное смещение логотипа
      top: "0px",
      fontSize: "24px",                 // Размер шрифта в пикселях
      letterSpacing: "-0.05em",         // Межсимвольный интервал
      color: "#000000",                 // Чистый черный
    },
    // Весь блок разделов (меню справа)
    sectionsContainer: {
      left: "0px",                      // Смещение всего меню вправо/влево
      top: "0px",                       // Смещение всего меню вверх/вниз
      gap: "8px",                       // Расстояние между пунктами
    },
    // Индивидуальные настройки пунктов меню
    menuItem: {
      fontSize: "16px",                 // Размер шрифта
      paddingX: "24px",                 // Внутренний отступ (X)
      paddingY: "12px",                 // Внутренний отступ (Y)
      fontWeight: "600",                // Чуть жирнее для чистого цвета
    },
    // Кнопка действия (Оставить заявку)
    ctaButton: {
      fontSize: "14px",                 // Размер шрифта кнопки
      paddingX: "24px",                 // Внутренний отступ (X)
      paddingY: "12px",                 // Внутренний отступ (Y)
      borderRadius: "9999px",           // Скругление (full)
    }
  };
  // -----------------------------

  useEffect(() => {
    const sections = ["hero", "results", "configurator", "pricing", "testimonials", "quote"];
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "hero", label: "Главная" },
    { id: "results", label: "Услуги" },
    { id: "configurator", label: "Конфигуратор" },
    { id: "pricing", label: "Цены" },
    { id: "testimonials", label: "Отзывы" },
    { id: "quote", label: "Оставить заявку" },
  ];

  const isDarkSection = activeSection === "results" || activeSection === "pricing";

  return (
    <nav
      className="fixed z-[1000] w-full flex justify-between items-center transition-all duration-300"
      style={{
        left: navbarSettings.container.left,
        top: navbarSettings.container.top,
        paddingLeft: navbarSettings.container.paddingX,
        paddingRight: navbarSettings.container.paddingX,
        paddingTop: navbarSettings.container.paddingY,
        paddingBottom: navbarSettings.container.paddingY,
        backgroundColor: navbarSettings.container.backgroundColor,
      }}
    >
      {/* Логотип */}
      <div
        className="flex items-center relative transition-all duration-300"
        style={{
          transform: `translate(${navbarSettings.logo.left}, ${navbarSettings.logo.top})`
        }}
      >
        <div
          className="font-display tracking-tighter flex items-center font-semibold cursor-pointer pointer-events-auto transition-colors duration-300"
          style={{
            fontSize: navbarSettings.logo.fontSize,
            letterSpacing: navbarSettings.logo.letterSpacing,
            color: isDarkSection ? "#ffffff" : "#000000"
          }}
          onClick={() => scrollTo("hero")}
        >
          DETAILING<span className={cn("transition-colors duration-300 not-italic", isDarkSection ? "text-white" : "text-black")}>23</span>
        </div>
      </div>

      {/* Блок разделов */}
      <div
        className="flex items-center pointer-events-auto relative transition-all duration-300"
        style={{
          gap: navbarSettings.sectionsContainer.gap,
          transform: `translate(${navbarSettings.sectionsContainer.left}, ${navbarSettings.sectionsContainer.top})`
        }}
      >
        {navItems.map((item, index) => {
          const isLast = index === navItems.length - 1;
          const isActive = activeSection === item.id;

          if (isLast) {
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "ml-2 tracking-wide transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                  isDarkSection
                    ? "bg-white text-[#0145f2] shadow-white/20"
                    : "bg-primary text-white shadow-primary/20"
                )}
                style={{
                  fontSize: navbarSettings.ctaButton.fontSize,
                  paddingLeft: navbarSettings.ctaButton.paddingX,
                  paddingRight: navbarSettings.ctaButton.paddingX,
                  paddingTop: navbarSettings.ctaButton.paddingY,
                  paddingBottom: navbarSettings.ctaButton.paddingY,
                  borderRadius: navbarSettings.ctaButton.borderRadius,
                }}
              >
                {item.label}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "tracking-wide relative transition-colors duration-300",
                isDarkSection ? "text-white hover:text-white" : "text-black hover:text-black"
              )}
              style={{
                fontSize: navbarSettings.menuItem.fontSize,
                fontWeight: navbarSettings.menuItem.fontWeight,
                paddingLeft: navbarSettings.menuItem.paddingX,
                paddingRight: navbarSettings.menuItem.paddingX,
                paddingTop: navbarSettings.menuItem.paddingY,
                paddingBottom: navbarSettings.menuItem.paddingY,
                color: isActive
                  ? (isDarkSection ? "#ffffff" : "#0145f2")
                  : undefined
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className={cn(
                    "absolute inset-0 border rounded-full shadow-sm",
                    isDarkSection
                      ? "bg-white/10 border-white/30"
                      : "bg-white border-primary/10"
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
