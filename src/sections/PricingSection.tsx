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

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [activeSelect, setActiveSelect] = useState<'brand' | 'model' | null>(null);

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setActiveSelect(null);
  };

  const getPrice = () => {
    let mult = 1.0;
    if (selectedBrand === "Porsche") mult = 1.8;
    else if (selectedBrand === "Mercedes-Benz" || selectedBrand === "BMW" || selectedBrand === "Audi") mult = 1.4;
    else if (selectedBrand === "Lexus") mult = 1.3;

    return Math.round(service.basePrice * mult).toLocaleString("ru-RU");
  };

  return (
    <div className="bg-card-dark rounded-3xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group flex flex-col h-full min-h-[340px]">
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors mb-4">
            <MaterialIcon name={service.icon} outline className="text-2xl" />
          </div>
          <h3 className="font-bold text-xl tracking-wide uppercase text-center">
            {service.title}
          </h3>
        </div>

        <div className="flex flex-col gap-3 mt-auto h-[124px] justify-end relative">
          {selectedBrand && selectedModel && activeSelect === null ? (
            <div className="flex items-center justify-between bg-primary/10 border border-primary/20 p-4 rounded-xl h-full">
              <div className="flex flex-col justify-center">
                <span className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Итоговая стоимость</span>
                <span className="text-2xl font-black text-white">{getPrice()} ₽</span>
              </div>
              <button
                onClick={handleReset}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white"
                title="Сбросить выбор"
              >
                <MaterialIcon name="refresh" />
              </button>
            </div>
          ) : activeSelect === 'brand' ? (
            <div className="flex flex-col h-full bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
               <div className="flex items-center justify-between p-2 border-b border-slate-700 bg-slate-800">
                  <span className="text-xs font-bold text-slate-400 ml-2 uppercase">Выберите марку</span>
                  <button onClick={() => setActiveSelect(null)} className="text-slate-400 hover:text-white p-1">
                     <MaterialIcon name="close" className="text-sm" />
                  </button>
               </div>
               <div className="flex-col overflow-y-auto p-2 space-y-1" style={{ maxHeight: "100px" }}>
                  {BRANDS.map(b => (
                     <button key={b} onClick={() => { setSelectedBrand(b); setSelectedModel(null); setActiveSelect(null); }} className="w-full text-left px-3 py-2 text-sm bg-slate-800 hover:bg-primary hover:text-white rounded-lg transition-colors">
                        {b}
                     </button>
                  ))}
               </div>
            </div>
          ) : activeSelect === 'model' ? (
            <div className="flex flex-col h-full bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
               <div className="flex items-center justify-between p-2 border-b border-slate-700 bg-slate-800">
                  <span className="text-xs font-bold text-slate-400 ml-2 uppercase">Выберите модель</span>
                  <button onClick={() => setActiveSelect(null)} className="text-slate-400 hover:text-white p-1">
                     <MaterialIcon name="close" className="text-sm" />
                  </button>
               </div>
               <div className="flex-col overflow-y-auto p-2 space-y-1" style={{ maxHeight: "100px" }}>
                  {selectedBrand ? CAR_DATA[selectedBrand].map(m => (
                     <button key={m} onClick={() => { setSelectedModel(m); setActiveSelect(null); }} className="w-full text-left px-3 py-2 text-sm bg-slate-800 hover:bg-primary hover:text-white rounded-lg transition-colors">
                        {m}
                     </button>
                  )) : (
                     <p className="text-xs text-slate-500 text-center py-4">Сначала выберите марку</p>
                  )}
               </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => setActiveSelect('brand')}
                className={cn(
                  "w-full py-3 md:py-4 rounded-xl border border-slate-700 hover:bg-white hover:text-black font-bold text-xs md:text-sm transition-colors uppercase truncate px-4 flex justify-between items-center",
                  selectedBrand && "border-primary/50 text-white bg-slate-800"
                )}
              >
                <span>{selectedBrand ? selectedBrand : "ВЫБРАТЬ марку авто"}</span>
                <MaterialIcon name="expand_more" className={cn("text-lg", selectedBrand ? "text-primary" : "text-slate-500")} />
              </button>
              <button
                onClick={() => setActiveSelect('model')}
                className={cn(
                  "w-full py-3 md:py-4 rounded-xl border border-slate-700 hover:bg-white hover:text-black font-bold text-xs md:text-sm transition-colors uppercase truncate px-4 flex justify-between items-center",
                  selectedModel && "border-primary/50 text-white bg-slate-800"
                )}
              >
                <span>{selectedModel ? selectedModel : "ВЫБРАТЬ модель авто"}</span>
                <MaterialIcon name="expand_more" className={cn("text-lg", selectedModel ? "text-primary" : "text-slate-500")} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="h-full flex flex-col px-4 md:px-12 py-16 max-w-7xl mx-auto w-full justify-center font-display">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 mt-4 md:mt-0">
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
            УСЛУГИ И ЦЕНЫ
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
