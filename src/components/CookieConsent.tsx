"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialIcon } from "./MaterialIcon";

const COOKIE_NAME = "cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Получаем значение куки
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
      return null;
    };

    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Устанавливаем настоящую куку на 365 дней
    const expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `${COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[1100]"
        >
          <div className="bg-white border-2 border-primary/20 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MaterialIcon name="cookie" className="text-xl text-primary" />
                </div>
                <h3 className="font-unbounded font-black text-black uppercase tracking-tight text-sm md:text-base">
                  Настоящие Cookies
                </h3>
              </div>
              
              <p className="text-black/70 text-xs md:text-sm leading-relaxed mb-6 font-medium italic">
                Мы используем настоящие файлы cookie (document.cookie) для сохранения вашего выбора и улучшения работы сайта.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
                >
                  Принять куки
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-1 border border-black/10 text-black/40 py-3 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all hover:bg-slate-50 active:scale-95"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
