"use client";

import { MaterialIcon } from "./MaterialIcon";
import { useEffect, useState } from "react";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "configurator", "pricing", "testimonials", "quote"];
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-center items-center pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-1 absolute left-6">
        <div className="font-display text-2xl tracking-tighter text-slate-900 flex items-center font-semibold italic">
          DETAILING<span className="text-primary not-italic">23</span>
        </div>
      </div>
      <div className="pointer-events-auto liquid-glass !rounded-full px-2 py-2 flex gap-2 items-center">
        <button
          onClick={() => scrollTo("hero")}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            activeSection === "hero"
              ? "bg-slate-200 text-slate-800"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <MaterialIcon
            name="home"
            className={`text-xl transition-colors ${
              activeSection === "hero" ? "text-primary" : "hover:text-primary"
            }`}
          />
        </button>
        <button
          onClick={() => scrollTo("configurator")}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            activeSection === "configurator"
              ? "bg-slate-200 text-slate-800"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <MaterialIcon
            name="tune"
            className={`text-xl transition-colors ${
              activeSection === "configurator" ? "text-primary" : "hover:text-primary"
            }`}
          />
        </button>
        <button
          onClick={() => scrollTo("pricing")}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            activeSection === "pricing"
              ? "bg-slate-200 text-slate-800"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <MaterialIcon
            name="payments"
            className={`text-xl transition-colors ${
              activeSection === "pricing" ? "text-primary" : "hover:text-primary"
            }`}
          />
        </button>
        <button
          onClick={() => scrollTo("testimonials")}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            activeSection === "testimonials"
              ? "bg-slate-200 text-slate-800"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <MaterialIcon
            name="star"
            className={`text-xl transition-colors ${
              activeSection === "testimonials" ? "text-primary" : "hover:text-primary"
            }`}
          />
        </button>
        <button
          onClick={() => scrollTo("quote")}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            activeSection === "quote"
              ? "bg-slate-200 text-slate-800"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <MaterialIcon
            name="info"
            className={`text-xl transition-colors ${
              activeSection === "quote" ? "text-primary" : "hover:text-primary"
            }`}
          />
        </button>
      </div>
    </nav>
  );
}
