"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  
  // Флаг для игнорирования IntersectionObserver при клике
  const isScrollingLock = useRef(false);

  const isBlueBgSection = ["results", "pricing", "quote"].includes(activeSection);

  useEffect(() => {
    const handleScrollEnd = () => {
      isScrollingLock.current = false;
    };
    window.addEventListener("scrollend", handleScrollEnd);
    return () => window.removeEventListener("scrollend", handleScrollEnd);
  }, []);

  useEffect(() => {
    const sections = ["hero", "results", "configurator", "pricing", "testimonials", "quote"];
    const observer = new IntersectionObserver((entries) => {
      if (isScrollingLock.current) return; // Игнорируем при программном скролле

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    }, { root: null, threshold: 0.5 });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isScrollingLock.current = true;
      setActiveSection(id); // Сразу перемещаем плашку
      el.scrollIntoView({ behavior: "smooth" });
      
      // На случай если браузер не поддерживает scrollend
      setTimeout(() => {
        isScrollingLock.current = false;
      }, 1000);
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

  return (
    <nav
      className={cn(
        "fixed z-[1000] w-full flex justify-between items-stretch transition-all duration-500 border-b backdrop-blur-xl",
        isBlueBgSection ? "bg-white/5 border-white/10" : "bg-white/10 border-black/5"
      )}
      style={{ height: "60px", padding: "0 32px" }}
    >
      <div className="flex items-center h-full">
        <div
          className={cn(
            "font-unbounded tracking-tighter flex items-center font-black cursor-pointer transition-colors duration-300 px-4 text-black italic uppercase text-[24px]"
          )}
          onClick={() => scrollTo("hero")}
        >
          DETAILING<span className="text-black not-italic">99</span>
        </div>
      </div>

      <div className="flex items-center h-full relative" style={{ gap: "8px" }}>
        {navItems.map((item, index) => {
          const isLast = index === navItems.length - 1;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "tracking-wide relative z-10 transition-colors duration-300 whitespace-nowrap",
                isBlueBgSection ? "text-black hover:text-white" : "text-black hover:text-[#0145f2]",
                isActive && (isBlueBgSection ? "!text-white" : "!text-primary"),
                isLast && "ml-2"
              )}
              style={{
                fontSize: "16px",
                fontWeight: "600",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingTop: "12px",
                paddingBottom: "12px",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className={cn(
                    "absolute inset-0 border rounded-full shadow-sm -z-10 transform-gpu",
                    isBlueBgSection ? "bg-white/10 border-white/20" : "bg-white border-primary/10"
                  )}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
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
