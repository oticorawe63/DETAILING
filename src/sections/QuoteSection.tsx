"use client";

import React from "react";
import { MaterialIcon } from "@/components/MaterialIcon";

export function QuoteSection({
  cart,
  selectedBrand,
  selectedModel
}: {
  cart: { name: string, price: number | string }[],
  selectedBrand: string | null,
  selectedModel: string | null
}) {
  const [phone, setPhone] = React.useState("");

  const getCarClass = (brand: string | null, model: string | null): number => {
    if (!brand || !model) return 2;
    const b = brand.toLowerCase(); const m = model.toLowerCase();
    if (b === "toyota" && m === "camry") return 1;
    if (b === "mercedes-benz" && m === "c-class") return 2;
    if (b.includes("audi") && m === "tt") return 2;
    if (b === "toyota" && m === "supra") return 3;
    if (b.includes("bmw") && (m === "m3" || m === "m5")) return 3;
    if (b.includes("porsche") && m === "macan") return 3;
    if (b.includes("audi") && m === "q7") return 3;
    if (b === "mercedes-benz" && (m === "s-class" || m === "gle coupe" || m === "g-class")) return 4;
    if (b.includes("porsche") && (m === "panamera" || m === "taycan" || m === "cayenne")) return 4;
    if (b.includes("bmw") && (m === "x5" || m === "x6")) return 4;
    if (b === "toyota" && m === "land cruiser") return 4;
    if (b.includes("porsche") && m === "911") return 5;
    if (b === "mercedes-benz" && m === "amg gt") return 5;
    if (b === "toyota" && m === "tundra") return 5;
    return 2;
  };

  const carClass = getCarClass(selectedBrand, selectedModel);
  const totalPrice = cart.reduce((acc, curr) => typeof curr.price === 'number' ? acc + curr.price : acc, 0);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ phone, cart, selectedBrand, selectedModel });
    alert("Заявка успешно отправлена!");
  };

  return (
    <section id="quote" className="h-full flex flex-col items-center justify-center bg-primary p-4 md:p-8 lg:p-12 font-display">
      <div className="w-full max-w-6xl">
        <div className="mb-6 md:mb-8 text-center md:text-left mt-8 md:mt-0">
          <h2 className="text-3xl md:text-5xl font-black text-white/100 mb-2 md:mb-4 tracking-tight">
            Оставьте заявку
          </h2>
          <p className="text-white/100 text-sm md:text-base max-w-2xl mx-auto md:mx-0 font-medium">
            Заполните данные и мы позвоним вам в течении 10 минут.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-4 max-w-5xl mx-auto">
          {/* Left Column: Form */}
          <div className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-md mx-auto lg:max-w-none shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-black text-sm font-bold uppercase tracking-wider">
                    Имя
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Иван"
                      required
                      className="w-full rounded-lg border border-black bg-slate-50 text-black placeholder:text-black/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-base outline-none shadow-sm font-bold"
                    />
                    <MaterialIcon
                      name="person"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black group-focus-within:text-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-black text-sm font-bold uppercase tracking-wider">
                    Телефон
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      placeholder="8-999-123-45-67"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full rounded-lg border border-black bg-slate-50 text-black placeholder:text-black/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-base outline-none shadow-sm font-bold"
                    />
                    <MaterialIcon
                      name="call"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black group-focus-within:text-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Plain Text Information Area - BETWEEN PHONE and SUBMIT BUTTON */}
                <div className="flex flex-col gap-3 pt-0 pb-4 border-b-2 border-slate-1000 font-bold italic">
                  <div className="space-y-2">
                    {selectedBrand && selectedModel ? (
                      <p className="text-black text-sm uppercase">
                        Автомобиль: <span className="text-primary">{selectedBrand} {selectedModel}</span>
                      </p>
                    ) : (
                      <p className="text-slate-1000 text-sm uppercase">Автомобиль не выбран</p>
                    )}

                    <div className="space-y-1">
                      <p className="text-black text-sm uppercase inline">Услуги: </p>
                      {cart.length > 0 ? (
                        <span className="text-xs uppercase text-primary italic">
                          {cart.map(it => it.name).join(", ")}
                        </span>
                      ) : (
                        <span className="text-slate-1000 text-sm uppercase italic">корзина пуста</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-sm text-black uppercase">Стоимость:</p>
                      <p className="text-2xl text-primary leading-none uppercase">{totalPrice.toLocaleString("ru-RU")} ₽</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-sm py-4 px-8 transition-all hover:bg-primary/100 hover:shadow-2xl shadow-xl transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-100"
              >
                <span>ОТПРАВИТЬ ЗАЯВКУ</span>
                <MaterialIcon name="send" className="text-xl" />
              </button>
            </form>
          </div>

          {/* Right Column: Map & Info (Original Style) */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto lg:max-w-none">
            <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden border border-white/100 shadow-2xl relative bg-[#010a21]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d180295.3400508119!2d38.835848520863375!3d45.04018658883658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f0459b7dfb3615%3A0xf695663675a6111a!2sKrasnodar%2C%20Krasnodar%20Krai%2C%20Russia!5e0!3m2!1sen!2sus!4v1709664551109!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(1) invert(0.92) contrast(1.3) brightness(1.9) saturate(0)",
                  top: "0%",
                  left: "0%"
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-x-0 z-0 opacity-80"
              />
              <div className="absolute inset-0 z-10 bg-primary/5 pointer-events-none mix-blend-overlay" />
              <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(1,10,33,0.4)_100%)] pointer-events-none" />
            </div>

            <div className="space-y-4 px-2">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="text-primary bg-white/100 w-11 h-11 flex items-center justify-center rounded-full shrink-0 border border-white/100">
                    <MaterialIcon name="call" className="text-sm" />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-white/100 uppercase tracking-widest leading-none mb-1">
                      Телефон
                    </p>
                    <p className="text-[15px] text-white font-bold text-sm">
                      +7 (999) 888-00-00
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-primary bg-white/100 w-11 h-11 flex items-center justify-center rounded-full shrink-0 border border-white/100">
                    <MaterialIcon name="mail" className="text-sm" />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-white/100 uppercase tracking-widest leading-none mb-1">
                      Email
                    </p>
                    <p className="text-[15px] text-white font-bold text-sm break-all">
                      concierge@elitedetailing.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-left mx-auto pt-6 border-t border-white/100">
                <div className="flex items-center gap-3">
                  <MaterialIcon name="schedule" className="text-white/100" />
                  <div className="text-[12px] uppercase tracking-tighter">
                    <p className="text-white/100 font-bold leading-none mb-1">ПН - ВС</p>
                    <p className="text-white font-bold">10:00 - 20:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon name="verified_user" className="text-white/100" />
                  <div className="text-[12px] uppercase tracking-tighter">
                    <p className="text-white/100 font-bold leading-none mb-1">СЕРТИФИЦИРОВАНО</p>
                    <p className="text-white font-bold">АВТОРИЗОВАННЫЙ ЦЕНТР</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
