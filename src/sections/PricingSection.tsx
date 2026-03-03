"use client";

import { MaterialIcon } from "@/components/MaterialIcon";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CAR_DATA: Record<string, string[]> = {
  "Porsche": ["911", "Cayenne", "Panamera", "Macan", "Taycan"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "G-Class", "GLE", "GLS"],
  "BMW": ["3 Series", "5 Series", "7 Series", "X5", "X6", "X7", "M4"],
  "Audi": ["A4", "A6", "Q7", "Q8", "RS6", "e-tron"],
  "Toyota": ["Camry", "Land Cruiser", "RAV4"],
  "Lexus": ["RX", "LX", "NX", "ES"],
};
const BRANDS = Object.keys(CAR_DATA);

const SERVICES = [
  { id: "exterior", title: "Экстерьер", icon: "water_drop", basePrice: 25000 },
  { id: "interior", title: "Интерьер", icon: "weekend", basePrice: 15000 },
  { id: "protection", title: "Защита", icon: "verified_user", basePrice: 35000 },
  { id: "ceramic", title: "Керамика", icon: "layers", basePrice: 50000 },
  { id: "paint-correction", title: "Полировка", icon: "auto_fix_high", basePrice: 20000 },
  { id: "ppf", title: "Антигравийная пленка", icon: "shield", basePrice: 120000 },
];

function ServiceCard({ service, selectedBrand, selectedModel }: { service: typeof SERVICES[0], selectedBrand: string | null, selectedModel: string | null }) {
  const getPrice = () => {
    let mult = 1.0;
    if (selectedBrand === "Porsche") mult = 1.8;
    else if (selectedBrand === "Mercedes-Benz" || selectedBrand === "BMW" || selectedBrand === "Audi") mult = 1.4;
    else if (selectedBrand === "Lexus") mult = 1.3;

    return Math.round(service.basePrice * mult).toLocaleString("ru-RU");
  };

  return (
    <div className="liquid-glass p-3 md:p-4 transition-all duration-300 transform group hover:-translate-y-1 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] flex flex-col h-full min-h-[160px]">
      <div className="relative z-10 flex flex-col flex-grow items-center text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors mb-2 md:mb-3">
          <MaterialIcon name={service.icon} outline className="text-lg md:text-xl" />
        </div>
        <h3 className="font-bold text-sm md:text-base tracking-wide uppercase text-slate-900 mb-4">
          {service.title}
        </h3>

        <div className="mt-auto w-full">
          {selectedBrand && selectedModel ? (
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Стоимость</span>
              <span className="text-xl md:text-2xl font-black text-slate-900">{getPrice()} ₽</span>
            </div>
          ) : (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center cursor-default">
              ВЫБЕРИТЕ МАРКУ И МОДЕЛЬ АВТО
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeSelect, setActiveSelect] = useState<'brand' | 'model' | null>(null);

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setActiveSelect(null);
  };

  return (
    <section id="pricing" className="h-full flex flex-col px-4 md:px-12 py-8 max-w-7xl mx-auto w-full justify-center font-display bg-background-light text-slate-900">
      <div className="w-full text-center mb-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900 mb-6">
          УСЛУГИ И ЦЕНЫ
        </h2>

        {/* Global Selectors */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto relative z-20 h-[60px]">
          {activeSelect === 'brand' ? (
            <div className="flex flex-col w-full md:w-1/2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xl absolute top-0 left-0 md:relative z-30">
               <div className="flex items-center justify-between p-2 border-b border-slate-200 bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 ml-2 uppercase">Выберите марку</span>
                  <button onClick={() => setActiveSelect(null)} className="text-slate-500 hover:text-slate-800 p-1">
                     <MaterialIcon name="close" className="text-sm" />
                  </button>
               </div>
               <div className="flex-col overflow-y-auto p-2 space-y-1" style={{ maxHeight: "150px" }}>
                  {BRANDS.map(b => (
                     <button key={b} onClick={() => { setSelectedBrand(b); setSelectedModel(null); setActiveSelect(null); }} className="w-full text-left px-3 py-2 text-sm bg-white hover:bg-primary hover:text-white rounded-lg transition-colors text-slate-800">
                        {b}
                     </button>
                  ))}
               </div>
            </div>
          ) : (
            <button
              onClick={() => setActiveSelect('brand')}
              className={cn(
                "w-full md:w-1/2 py-3 rounded-xl border border-white/20 hover:bg-white/30 font-bold text-xs transition-all uppercase truncate px-4 flex justify-between items-center text-slate-800 liquid-glass shadow-none",
                selectedBrand && "border-primary/50 text-slate-900 bg-white/40"
              )}
            >
              <span>{selectedBrand ? selectedBrand : "ВЫБРАТЬ МАРКУ АВТО"}</span>
              <MaterialIcon name="expand_more" className={cn("text-lg", selectedBrand ? "text-primary" : "text-slate-600")} />
            </button>
          )}

          {activeSelect === 'model' ? (
            <div className="flex flex-col w-full md:w-1/2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xl absolute top-0 right-0 md:relative z-30">
               <div className="flex items-center justify-between p-2 border-b border-slate-200 bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 ml-2 uppercase">Выберите модель</span>
                  <button onClick={() => setActiveSelect(null)} className="text-slate-500 hover:text-slate-800 p-1">
                     <MaterialIcon name="close" className="text-sm" />
                  </button>
               </div>
               <div className="flex-col overflow-y-auto p-2 space-y-1" style={{ maxHeight: "150px" }}>
                  {selectedBrand ? CAR_DATA[selectedBrand].map(m => (
                     <button key={m} onClick={() => { setSelectedModel(m); setActiveSelect(null); }} className="w-full text-left px-3 py-2 text-sm bg-white hover:bg-primary hover:text-white rounded-lg transition-colors text-slate-800">
                        {m}
                     </button>
                  )) : (
                     <p className="text-xs text-slate-500 text-center py-4">Сначала выберите марку</p>
                  )}
               </div>
            </div>
          ) : (
            <div className="flex w-full md:w-1/2 gap-2">
              <button
                onClick={() => setActiveSelect('model')}
                className={cn(
                  "flex-grow py-3 rounded-xl border border-white/20 hover:bg-white/30 font-bold text-xs transition-all uppercase truncate px-4 flex justify-between items-center text-slate-800 liquid-glass shadow-none",
                  selectedModel && "border-primary/50 text-slate-900 bg-white/40"
                )}
              >
                <span>{selectedModel ? selectedModel : "ВЫБРАТЬ МОДЕЛЬ АВТО"}</span>
                <MaterialIcon name="expand_more" className={cn("text-lg", selectedModel ? "text-primary" : "text-slate-600")} />
              </button>
              {selectedBrand && selectedModel && (
                <button
                  onClick={handleReset}
                  className="w-12 flex-shrink-0 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors text-slate-600 hover:text-slate-900"
                  title="Сбросить выбор"
                >
                  <MaterialIcon name="refresh" className="text-lg" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full mb-4 relative z-10 max-w-4xl mx-auto">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} selectedBrand={selectedBrand} selectedModel={selectedModel} />
        ))}
      </div>
    </section>
  );
}
