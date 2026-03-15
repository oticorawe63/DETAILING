import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "configurator", "pricing", "testimonials", "quote"];
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // Better precision for active link
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
    { id: "configurator", label: "Конфигуратор" },
    { id: "pricing", label: "Цены" },
    { id: "testimonials", label: "Отзывы" },
    { id: "quote", label: "Оставить заявку" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-transparent">
      <div className="flex items-center">
        <div 
          className="font-display text-2xl tracking-tighter text-slate-900 flex items-center font-semibold cursor-pointer pointer-events-auto"
          onClick={() => scrollTo("hero")}
        >
          DETAILING<span className="text-black not-italic">23</span>
        </div>
      </div>

      <div className="flex gap-2 items-center pointer-events-auto">
        {navItems.map((item, index) => {
          const isLast = index === navItems.length - 1;
          const isActive = activeSection === item.id;
          
          if (isLast) {
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="ml-2 text-sm tracking-wide px-6 py-2.5 rounded-full transition-all duration-300 font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5"
              >
                {item.label}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm tracking-wide px-5 py-2.5 rounded-full relative transition-colors duration-300 font-medium ${
                isActive ? "text-primary" : "text-primary hover:text-primary/70"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white border border-primary/10 rounded-full shadow-sm"
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
