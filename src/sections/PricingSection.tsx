"use client";

import { MaterialIcon } from "@/components/MaterialIcon";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  {
    id: "ppf",
    title: "ОКЛЕЙКА ПЛЕНКОЙ",
    icon: "shield",
    basePrice: 120000,
    items: [
      {
        title: "КУЗОВ",
        items: ["ОКЛЕЙКА АНТИГРАВИЙНОЙ ПЛЕНКОЙ", "ОКЛЕЙКА ЗОН РИСКА", "ОКЛЕЙКА ПОЛИУРЕТАНОВОЙ ПЛЕНКОЙ", "ОКЛЕЙКА ВИНИЛОВОЙ ПЛЕНКОЙ"]
      },
      {
        title: "САЛОН",
        items: ["ОКЛЕЙКА МУЛТИМЕДИА", "ОКЛЕЙКА ДЕКОРАТИВНЫХ ЭЛЕМЕНТОВ САЛОНА"]
      },
      {
        title: "СТЁКЛА",
        items: ["ОКЛЕЙКА СТЁКОЛ ЗАЩИТНОЙ ПЛЕНКОЙ", "ОКЛЕЙКА ФАР ПЛЕНКОЙ", "ТОНИРОВАНИЕ СТЁКОЛ", "АТЕРМАЛЬНАЯ ТОНИРОВКА"]
      }
    ]
  },
  {
    id: "polish",
    title: "ПОЛИРОВКА",
    icon: "auto_fix_high",
    basePrice: 20000,
    items: [
      {
        title: "КУЗОВ",
        items: ["ВОССТАНОВИТЕЛЬНАЯ ПОЛИРОВКА", "МЯГКАЯ ПОЛИРОВКА", "ЛОКАЛЬНАЯ ПОЛИРОВКА КУЗОВА", "ПОЛИРОВКА ДВЕРИ", "ПОЛИРОВКА БАМПЕРА", "ПОЛИРОВКА ДИСКОВ"]
      },
      {
        title: "САЛОН",
        items: ["ПОЛИРОВКА ГЛЯНЦЕВЫХ ЭЛЕМЕНТОВ САЛОНА"]
      },
      {
        title: "СТЁКЛА",
        items: ["ПОЛИРОВКА СТЁКОЛ", "ПОЛИРОВКА ФАР"]
      }
    ]
  },
  {
    id: "cleaning",
    title: "ХИМЧИСТКА",
    icon: "water_drop",
    basePrice: 15000,
    items: ["КОМПЛЕКСНАЯ", "ХИМЧИСТКА ТЕКСТИЛЬНОГО САЛОНА", "ОЗОНИРОВАНИЕ", "ХИМЧИСТКА СИДЕНИЙ", "ХИМЧИСТКА БАГАЖНИКА", "ХИМЧИСТКА КОЖАНОГО САЛОНА"]
  },
  {
    id: "care",
    title: "УХОД",
    icon: "eco",
    basePrice: 10000,
    items: ["УХОД ЗА ПОДКАПОТНЫМ ПРОСТРАНСТВОМ", "ГЛУБОКАЯ ОЧИСТКА РАДИАТОРА", "УХОД ЗА КРЫШЕЙ КАБРИОЛЕТА"]
  },
  {
    id: "protection",
    title: "ЗАЩИТНЫЕ ПОКРЫТИЯ",
    icon: "verified_user",
    basePrice: 35000,
    items: [
      {
        title: "КУЗОВ",
        items: ["КЕРАМИЧЕСКОЕ ПОКРЫТИЕ", "ТВЕРДЫЙ ВОСК"]
      },
      {
        title: "САЛОН",
        items: ["КЕРАМИЧЕСКОЕ ПОКРЫТИЕ"]
      },
      {
        title: "СТЁКЛА",
        items: ["АНТИДОЖДЬ"]
      },
      {
        title: "ДИСКИ",
        items: ["КЕРАМИЧЕСКОЕ ПОКРЫТИЕ"]
      }
    ]
  },
  {
    id: "paint",
    title: "МАЛЯРНЫЕ И АРМАТУРНЫЕ РАБОТЫ",
    icon: "format_paint",
    basePrice: 25000,
    items: ["ПОКРАСКА", "ЛОКАЛЬНЫЙ ОКРАС", "АРМАТУРНЫЕ РАБОТЫ", "АНТИХРОМ", "ОКРАС ДИСКОВ И СУППОРТОВ", "УДАЛЕНИЕ ВМЯТИЕ", "РЕМОНТ СКОЛОВ НА СТЕКЛЕ"]
  },
  {
    id: "restoration",
    title: "РЕСТАВРАЦИЯ И ДООСНАЩЕНИЕ",
    icon: "engineering",
    basePrice: 45000,
    items: [
      {
        title: "ДООСНАЩЕНИЕ",
        items: [
          "ШУМОИЗОЛЯЦИЯ", 
          "ВЫДВИЖНЫЕ ПОРОГИ", 
          "ЗАЩИТНАЯ СЕТКА НА РЕШЕТКУ РАДИАТОРА", 
          "БЕСКЛЮЧЕВОЙ ДОСТУП", 
          "ЗВЁЗДНОЕ НЕБО", 
          "ЛАМИНАЦИЯ КАРБОН", 
          "МУЛЬТИМЕДИА", 
          "ДОВОДЧИКИ ДВЕРЕЙ"
        ]
      },
      "РЕСТАВРАЦИЯ КОЖАНЫХ ЭЛЕМЕНТОВ САЛОНА",
      "ПЕРЕШИВ РУЛЯ",
      "ПЕРЕШИВ САЛОНА",
      "РЕСТАВРАЦИЯ И ПОКРАСКА КОЖИ РУЛЯ"
    ]
  },
];

function ServiceCard({ service, selectedBrand, selectedModel, selectedServiceId }: { service: typeof SERVICES[0], selectedBrand: string | null, selectedModel: string | null, selectedServiceId: string | null }) {
  const getPrice = () => {
    let mult = 1.0;
    if (selectedBrand === "Porsche") mult = 1.8;
    else if (selectedBrand === "Mercedes-Benz" || selectedBrand === "BMW" || selectedBrand === "Audi") mult = 1.4;
    else if (selectedBrand === "Lexus") mult = 1.3;

    return Math.round(service.basePrice * mult).toLocaleString("ru-RU");
  };

  const isSelected = selectedServiceId === service.id;
  const canShowInfo = selectedBrand && selectedModel && isSelected;

  return (
    <div className="group relative h-full min-h-[160px]">
      <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] blur-[30px] opacity-100 group-hover:opacity-100 transition-opacity translate-y-4 z-0" />
      <div className={cn(
        "relative z-10 bg-white rounded-[2.5rem] p-3 md:p-6 transition-all duration-300 transform flex flex-col h-full border",
        isSelected ? "border-primary ring-1 ring-primary/20 scale-[1.02] shadow-xl" : "border-white group-hover:-translate-y-1.5"
      )}>
        <div className="relative z-10 flex flex-col flex-grow text-left">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-sm md:text-base tracking-wide uppercase text-slate-900 leading-none pt-1">
              {service.title}
            </h3>
            <div className="text-primary flex items-center justify-center">
              <MaterialIcon name={service.icon} outline className="text-sm md:text-base" style={{ fontSize: '1em' }} />
            </div>
          </div>

          <div className="mt-auto w-full pt-4 border-t border-slate-200/30">
            {canShowInfo ? (
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-700">
                  <span>Стоимость работ</span>
                  <span className="font-bold text-slate-900">{getPrice()} ₽</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 italic">
                  <span>* финальная цена зависит от состояния ЛКП</span>
                </div>
              </div>
            ) : (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center cursor-default pt-2">
                {!selectedBrand || !selectedModel ? "ВЫБЕРИТЕ МАРКУ И МОДЕЛЬ" : "ВЫБЕРИТЕ ЭТУ УСЛУГУ"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedLeafService, setSelectedLeafService] = useState<string | null>(null);
  const [activeSelect, setActiveSelect] = useState<'brand' | 'model' | 'service' | null>(null);

  const [hoveredL1, setHoveredL1] = useState<string | null>(null);
  const [hoveredL2, setHoveredL2] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(300);

  useEffect(() => {
    if (!containerRef.current || !buttonRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setMenuWidth(containerRef.current.offsetWidth);
      }
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(buttonRef.current);

    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [selectedBrand, selectedModel, selectedServiceId, selectedLeafService]);

  const handleResetAll = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedServiceId(null);
    setSelectedLeafService(null);
    setActiveSelect(null);
  };

  const handleResetService = () => {
    setSelectedServiceId(null);
    setSelectedLeafService(null);
    setHoveredL1(null);
    setHoveredL2(null);
  };

  // ===========================================================================
  // НАСТРОЙКИ РАЗДЕЛА И ОКНА (Вы можете менять эти значения вручную)
  // ===========================================================================
  const PRICING_SETTINGS = {
    // Настройки общего расположения раздела
    sectionPaddingTop: 95,    // Отступ сверху всего раздела в пикселях (pt-28 = 112px). Уменьшите, чтобы поднять всё выше.
    sectionHeight: 1050,       // Общая высота всего раздела в пикселях.

    // Настройки выпадающего окна услуг
    maxWidth: 895,            // Максимальная ширина открытого окна в пикселях (на десктопе)
    totalHeight: 528,          // Общая высота открытого окна (кнопка + список услуг)
    buttonHeight: 48,          // Высота верхней части (кнопки/островка)
    neckLength: 16,            // На сколько окно уходит ВНИЗ перед тем как расшириться ВЛЕВО
    cornerRadius: 16,          // Радиус скругления всех углов (внешних и внутренних)
  };

  const [menuWidth, setMenuWidth] = useState(PRICING_SETTINGS.maxWidth);

  // Вспомогательные переменные для построения пути (SVG Path)
  const x1 = menuWidth - buttonWidth;             // Левая граница кнопки
  const y_btn = PRICING_SETTINGS.buttonHeight;       // Нижняя граница кнопки
  const y_neck = y_btn + PRICING_SETTINGS.neckLength; // Точка поворота "шеи"
  const r = PRICING_SETTINGS.cornerRadius;           // Радиус

  // Функция создания SVG-пути (D-атрибут) для плавной анимации
  const getPath = (isOpen: boolean) => {
    if (!isOpen) {
      // Состояние: кнопка закрыта (схлопываем все сегменты в прямоугольник кнопки)
      return `
        M ${x1 + r},0 
        H ${menuWidth - r} 
        A ${r},${r} 0 0 1 ${menuWidth},${r} 
        V ${y_btn - r} 
        A ${r},${r} 0 0 1 ${menuWidth - r},${y_btn} 
        H ${x1 + r} 
        A ${r},${r} 0 0 1 ${x1},${y_btn - r} 
        V ${y_btn - r} 
        A 0,0 0 0 1 ${x1},${y_btn - r} 
        H ${x1} 
        A 0,0 0 0 0 ${x1},${y_btn - r} 
        V ${r} 
        A ${r},${r} 0 0 1 ${x1 + r},0 
        Z
      `;
    } else {
      // Состояние: окно открыто (полный L-образный шестиугольник)
      return `
        M ${x1 + r},0 
        H ${menuWidth - r} 
        A ${r},${r} 0 0 1 ${menuWidth},${r} 
        V ${PRICING_SETTINGS.totalHeight - r} 
        A ${r},${r} 0 0 1 ${menuWidth - r},${PRICING_SETTINGS.totalHeight} 
        H ${r} 
        A ${r},${r} 0 0 1 0,${PRICING_SETTINGS.totalHeight - r} 
        V ${y_neck + r} 
        A ${r},${r} 0 0 1 ${r},${y_neck} 
        H ${x1 - r} 
        A ${r},${r} 0 0 0 ${x1},${y_neck - r} 
        V ${r} 
        A ${r},${r} 0 0 1 ${x1 + r},0 
        Z
      `;
    }
  };

  return (
    <section
      id="pricing"
      className="flex flex-col px-4 md:px-12 pb-16 w-full items-center font-display bg-[#0145f2] text-white overflow-visible"
      style={{
        paddingTop: `${PRICING_SETTINGS.sectionPaddingTop}px`,
        height: `${PRICING_SETTINGS.sectionHeight}px`
      }}
    >
      {/* SVG Clip Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="menu-clip" clipPathUnits="userSpaceOnUse">
            <motion.path
              initial={false}
              animate={{ d: getPath(activeSelect === 'service') }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </clipPath>
        </defs>
      </svg>

      <div className="w-full text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white mb-6">
          УСЛУГИ И ЦЕНЫ
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto relative z-30"
          style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
        >
          {/* Brand Selector */}
          <div className="relative w-full min-w-0">
            <button
              onClick={() => setActiveSelect(activeSelect === 'brand' ? null : 'brand')}
              className={cn(
                "relative overflow-hidden w-full py-3 h-12 rounded-2xl font-bold text-xs transition-colors duration-100 uppercase px-6 flex justify-between items-center bg-white text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              )}
            >
              <span className="truncate flex-1 text-left mr-2">{selectedBrand ? selectedBrand : "МАРКА"}</span>
              <MaterialIcon name="expand_more" className={cn("text-lg text-primary transition-transform flex-shrink-0", activeSelect === 'brand' && "rotate-180")} />
            </button>

            <AnimatePresence>
              {activeSelect === 'brand' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-100"
                >
                  <div className="p-2 grid grid-cols-2 gap-1 max-h-[300px] overflow-y-auto font-bold text-slate-800">
                    {BRANDS.map(b => (
                      <button
                        key={b} onClick={() => { setSelectedBrand(b); setSelectedModel(null); setActiveSelect(null); }}
                        className={cn("w-full text-left px-3 py-2 text-xs rounded-xl transition-all duration-0 transform-gpu", selectedBrand === b ? "bg-primary text-white" : "hover:bg-primary hover:text-white")}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Model Selector */}
          <div className="relative w-full min-w-0">
            <button
              onClick={() => setActiveSelect(activeSelect === 'model' ? null : 'model')}
              className={cn(
                "relative overflow-hidden w-full py-3 h-12 rounded-2xl font-bold text-xs transition-colors duration-100 uppercase px-6 flex justify-between items-center bg-white text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              )}
            >
              <span className="truncate flex-1 text-left mr-2">{selectedModel ? selectedModel : "МОДЕЛЬ"}</span>
              <MaterialIcon name="expand_more" className={cn("text-lg text-primary transition-transform flex-shrink-0", activeSelect === 'model' && "rotate-180")} />
            </button>

            <AnimatePresence>
              {activeSelect === 'model' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-100"
                >
                  <div className="p-2 grid grid-cols-2 gap-1 max-h-[300px] overflow-y-auto font-bold text-slate-800">
                    {selectedBrand ? CAR_DATA[selectedBrand].map(m => (
                      <button
                        key={m} onClick={() => { setSelectedModel(m); setActiveSelect(null); }}
                        className={cn("w-full text-left px-3 py-2 text-xs rounded-xl transition-all duration-75 transform-gpu", selectedModel === m ? "bg-primary text-white" : "hover:bg-primary hover:text-white")}
                      >
                        {m}
                      </button>
                    )) : <p className="text-[10px] text-slate-400 p-4 col-span-2 uppercase text-center py-10 italic">Сначала выберите марку</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Service Selector with Morphing Hexagon Menu */}
          <div className="relative w-full min-w-0" ref={buttonRef}>
            <button
              id="service-selector-btn"
              onClick={() => {
                setActiveSelect(activeSelect === 'service' ? null : 'service');
                if (selectedServiceId) setHoveredL1(selectedServiceId);
              }}
              className={cn(
                "relative overflow-hidden w-full h-12 px-6 font-bold text-xs transition-colors duration-100 uppercase flex justify-between items-center bg-white text-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative z-20",
                activeSelect === 'service' && "opacity-0 invisible"
              )}
            >
              <span className="truncate flex-1 text-left mr-2">{selectedLeafService ? selectedLeafService : "ВЫБЕРИТЕ УСЛУГУ"}</span>
              <MaterialIcon name="expand_more" className="text-lg text-primary flex-shrink-0" />
            </button>

            {/* Global Reset Button - Absolutely positioned to maintain column stability */}
            {(selectedBrand || selectedModel || selectedServiceId) && (
              <button
                onClick={handleResetAll}
                className="absolute -right-14 top-0 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-primary transition-all duration-300 flex items-center justify-center shrink-0 shadow-lg border border-white/20 hover:border-white group z-10"
                title="Сбросить всё"
              >
                <MaterialIcon name="refresh" className="text-xl group-hover:rotate-180 transition-transform duration-500" />
              </button>
            )}

            <AnimatePresence>
              {activeSelect === 'service' && (
                <div className="absolute top-0 right-0 z-[100] pointer-events-none w-full md:w-auto">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.6 }}
                    className="bg-white pointer-events-auto overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)] border border-slate-100"
                    style={{
                      clipPath: 'url(#menu-clip)',
                      width: `${menuWidth}px`
                    }}
                  >
                    {/* Integrated Header (Island Replica) */}
                    <div className="h-12 flex justify-end items-center">
                      <div
                        className="h-full relative overflow-hidden flex gap-2 items-center px-6 bg-white"
                        style={{ width: buttonWidth }}
                      >
                        <button
                          onClick={() => setActiveSelect(null)}
                          className="flex-grow h-full font-bold text-xs uppercase truncate flex justify-between items-center text-slate-800"
                        >
                          <span className="truncate flex-1 text-left mr-2">{selectedLeafService ? selectedLeafService : "ВЫБЕРИТЕ УСЛУГУ"}</span>
                          <MaterialIcon name="expand_more" className="text-lg text-primary rotate-180 flex-shrink-0" />
                        </button>
                        {selectedServiceId && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleResetService(); }}
                            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-primary text-primary hover:text-white transition-all duration-100 border border-primary/10 hover:border-primary group"
                            title="Сбросить услугу"
                          >
                            <MaterialIcon name="refresh" className="text-sm group-hover:rotate-180 transition-transform duration-500" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Menu Body - Columns or Message */}
                    {(!selectedBrand || !selectedModel) ? (
                      <div className="h-[480px] flex items-center justify-center p-8 bg-slate-50">
                        <div className="text-center">
                          <MaterialIcon name="info" className="text-5xl text-primary/20 mb-4" />
                          <p className="text-xl font-bold text-black uppercase tracking-widest">
                            {!selectedBrand && !selectedModel ? "ВЫБЕРИТЕ МАРКУ И МОДЕЛЬ АВТО" : "ВЫБЕРИТЕ МОДЕЛЬ АВТО"}
                          </p>
                          <p className="text-xs text-slate-400 mt-2 uppercase">Чтобы увидеть список доступных услуг</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-[480px] flex flex-col md:flex-row divide-x divide-slate-100">
                        {/* Column 1: Categories */}
                        <div className="w-full md:w-1/3 overflow-y-auto p-8 bg-slate-50">
                          <p className="text-xs font-bold text-black uppercase tracking-tight mb-6">Категория</p>
                          <div className="space-y-1">
                            {SERVICES.map(s => (
                              <button key={s.id} onMouseEnter={() => { setHoveredL1(s.id); setHoveredL2(null); }}
                                className={cn("w-full text-left px-5 py-4 rounded-2xl transition-all duration-75 flex items-center gap-4 transform-gpu", hoveredL1 === s.id ? "bg-primary text-white shadow-lg" : "text-black hover:bg-white")}
                              >
                                <MaterialIcon name={s.icon} className={cn("text-2xl transition-all duration-75", hoveredL1 === s.id ? "text-white" : "text-black")} />
                                <span className="font-bold text-xs uppercase tracking-tight">{s.title}</span>
                                <MaterialIcon name="chevron_right" className={cn("ml-auto transition-all duration-75", hoveredL1 === s.id ? "text-white" : "text-black")} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Sections */}
                        <div className="w-full md:w-1/3 overflow-y-auto p-8 bg-white">
                          <p className="text-xs font-bold text-black uppercase tracking-tight mb-6">Раздел</p>
                          <div className="space-y-1">
                            {hoveredL1 ? SERVICES.find(s => s.id === hoveredL1)?.items.map((item, idx) => {
                              const title = typeof item === 'string' ? item : item.title;
                              const hasChildren = typeof item !== 'string';
                              return (
                                <button key={idx} onMouseEnter={() => setHoveredL2(title)}
                                  onClick={() => { if (!hasChildren) { setSelectedServiceId(hoveredL1); setSelectedLeafService(title); setActiveSelect(null); } }}
                                  className={cn("w-full text-left px-5 py-4 rounded-2xl transition-all duration-75 flex items-center gap-4 transform-gpu", hoveredL2 === title ? "bg-primary text-white shadow-lg" : "text-black hover:bg-slate-50")}
                                >
                                  <span className="font-bold text-xs uppercase tracking-tight">{title}</span>
                                  {hasChildren && <MaterialIcon name="chevron_right" className={cn("ml-auto transition-all duration-75", hoveredL2 === title ? "text-white" : "text-black")} />}
                                </button>
                              );
                            }) : <p className="text-xs font-bold text-black pt-10 text-center uppercase tracking-tight">Выберите категорию</p>}
                          </div>
                        </div>

                        {/* Column 3: Leaf Services */}
                        <div className="w-full md:w-1/3 overflow-y-auto p-8 bg-slate-50">
                          <p className="text-xs font-bold text-black uppercase tracking-tight mb-6">Услуга</p>
                          <div className="space-y-1">
                            {hoveredL1 && hoveredL2 ? (() => {
                              const found = SERVICES.find(s => s.id === hoveredL1)?.items.find(i => (typeof i === 'string' ? i : i.title) === hoveredL2);
                              if (found && typeof found !== 'string') {
                                return found.items.map((leaf, idx) => (
                                  <button key={idx} onClick={() => { setSelectedServiceId(hoveredL1); setSelectedLeafService(leaf); setActiveSelect(null); }}
                                    className={cn(
                                      "w-full text-left px-5 py-4 rounded-2xl transition-all duration-75 flex items-center gap-4 transform-gpu",
                                      selectedLeafService === leaf
                                        ? "bg-primary text-white shadow-lg"
                                        : "text-black hover:bg-primary hover:text-white hover:shadow-lg"
                                    )}
                                  >
                                    <span className="font-bold text-xs uppercase tracking-tight block leading-tight">{leaf}</span>
                                  </button>
                                ));
                              }
                              return null;
                            })() : <p className="text-xs font-bold text-black pt-10 text-center uppercase tracking-tight">Выберите раздел</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedBrand && selectedModel && selectedLeafService ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full mb-4 relative z-10 max-w-5xl mx-auto mt-10"
          >
            {SERVICES.filter(s => s.id !== 'restoration').map((service) => (
              <ServiceCard key={service.id} service={service} selectedBrand={selectedBrand} selectedModel={selectedModel} selectedServiceId={selectedServiceId} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex items-center justify-center mt-32 relative z-10"
          >
            <p className="text-sm md:text-xl font-bold tracking-[0.4em] uppercase text-white/90 text-center">
              ВЫБЕРИТЕ МАРКУ, МОДЕЛЬ И УСЛУГУ
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
