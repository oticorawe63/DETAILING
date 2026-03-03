"use client";

import { MaterialIcon } from "@/components/MaterialIcon";

export function QuoteSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="quote" className="h-full flex flex-col items-center justify-center bg-background-light p-4 md:p-8 lg:p-12 font-display">
      <div className="w-full max-w-6xl">
        <div className="mb-6 md:mb-8 text-center md:text-left mt-8 md:mt-0">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-1 md:mb-2 block">
            Свяжитесь с нами
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight">
            Оставить заявку
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto md:mx-0">
            Ощутите автомобильное совершенство. Расскажите нам о вашем автомобиле, и мы свяжемся с вами в течение часа.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-4 max-w-5xl mx-auto">
          {/* Left Column: Form */}
          <div className="liquid-glass p-6 md:p-8 rounded-2xl w-full max-w-md mx-auto lg:max-w-none shadow-none">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 text-sm font-bold uppercase tracking-wider">
                    Имя
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-base outline-none shadow-sm"
                    />
                    <MaterialIcon
                      name="person"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 text-sm font-bold uppercase tracking-wider">
                    Телефон
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-base outline-none shadow-sm"
                    />
                    <MaterialIcon
                      name="call"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 text-sm font-bold uppercase tracking-wider">
                    Выберите услугу
                  </label>
                  <div className="relative group">
                    <select className="w-full appearance-none rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 pr-12 text-base outline-none shadow-sm">
                      <option value="">Выберите процедуру...</option>
                      <option value="ceramic">Керамическое покрытие</option>
                      <option value="interior">Реставрация интерьера</option>
                      <option value="ppf">Антигравийная пленка</option>
                      <option value="full">Полный детейлинг</option>
                    </select>
                    <MaterialIcon
                      name="expand_more"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm py-4 px-8 transition-all hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>Отправить заявку</span>
                <MaterialIcon name="send" className="text-xl" />
              </button>
            </form>
          </div>

          {/* Right Column: Map & Info */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:max-w-none">
            <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden border border-slate-200 shadow-none relative bg-slate-100 liquid-glass !p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105658.05608249658!2d-118.3618606678224!3d34.037597148816766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1709664551109!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2) opacity(0.8)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

            <div className="space-y-4 px-2">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full shrink-0">
                    <MaterialIcon name="call" className="text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Телефон
                    </p>
                    <p className="text-slate-900 font-bold text-sm">
                      +7 (999) 888-00-00
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-primary bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full shrink-0">
                    <MaterialIcon name="mail" className="text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Email
                    </p>
                    <p className="text-slate-900 font-bold text-sm break-all">
                      concierge@elitedetailing.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Simplified Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <svg className="size-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <svg className="size-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info Area matching screen 7 */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-12 justify-center border-t border-slate-200 pt-6">
          <div className="flex items-center gap-3">
            <MaterialIcon name="schedule" className="text-primary" />
            <div className="text-xs uppercase tracking-tighter">
              <p className="text-slate-400">Пн - Сб</p>
              <p className="text-slate-900 font-bold">8:00 - 18:00</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MaterialIcon name="verified_user" className="text-primary" />
            <div className="text-xs uppercase tracking-tighter">
              <p className="text-slate-400">Сертифицировано</p>
              <p className="text-slate-900 font-bold">Авторизованный центр</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
