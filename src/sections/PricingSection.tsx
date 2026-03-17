"use client";

import { MaterialIcon } from "@/components/MaterialIcon";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// 1. КОНСТАНТЫ ДЛЯ СТРОК
const PPF_TITLE = "ОКЛЕЙКА АНТИГРАВИЙНОЙ ПЛЕНКОЙ";

// 2. ПУЛЬТ УПРАВЛЕНИЯ РАСПОЛОЖЕНИЕМ (LAYOUT) - Актуальные настройки пользователя
const LAYOUT_SETTINGS = {
  titleY: -35,           // Верхний отступ заголовка "УСЛУГИ И ЦЕНЫ"
  titleSpacing: 5,       // Отступ ПОСЛЕ заголовка (до кнопок)
  selectorsY: 0,         // Дополнительный отступ для ряда кнопок (Марка/Модель/Услуга)
  resultsY: 15           // Положение большого окна с ценами (marginTop)
};

// 3. ВСЕ ДАННЫЕ В ОДНОМ МЕСТЕ
const PRICING_DATA = {
  CAR_DATA: {
    "Audi": ["A5", "A7", "TT", "R8", "Q7"],
    "BMW": ["X5", "X6", "M3", "M4", "M5"],
    "Mercedes-Benz": ["AMG GT", "GLE Coupe", "G-Class", "C-Class", "S-Class"],
    "Porsche": ["911", "Cayenne", "Panamera", "Macan", "Taycan"],
    "Toyota": ["Tundra", "Camry", "Supra", "Mark", "Land Cruiser"],
  } as Record<string, string[]>,

  SERVICES: [
    { id: "ppf", title: "ОКЛЕЙКА ПЛЕНКОЙ", icon: "layers", items: [{ title: "КУЗОВ", items: [PPF_TITLE, "ОКЛЕЙКА ЗОН РИСКА", "ОКЛЕЙКА ПОЛИУРЕТАНОВОЙ ПЛЕНКОЙ", "ОКЛЕЙКА ВИНИЛОВОЙ ПЛЕНКОЙ"] }, { title: "САЛОН", items: ["ОКЛЕЙКА МУЛТИМЕДИА", "ОКЛЕЙКА ДЕКОРАТИВНЫХ ЭЛЕМЕНТОВ САЛОНА"] }, { title: "СТЁКЛА", items: ["ОКЛЕЙКА СТЁКОЛ ЗАЩИТНОЙ ПЛЕНКОЙ", "ОКЛЕЙКА ФАР ПЛЕНКОЙ", "ТОНИРОВАНИЕ СТЁКОЛ", "АТЕРМАЛЬНАЯ ТОНИРОВКА"] }] },
    { id: "polish", title: "ПОЛИРОВКА", icon: "auto_fix_high", items: [{ title: "КУЗОВ", items: ["ВОССТАНОВИТЕЛЬНАЯ ПОЛИРОВКА", "МЯГКАЯ ПОЛИРОВКА", "ЛОКАЛЬНАЯ ПОЛИРОВКА КУЗОВА", "ПОЛИРОВКА ДВЕРИ", "ПОЛИРОВКА БАМПЕРА", "ПОЛИРОВКА ДИСКОВ"] }, { title: "САЛОН", items: ["ПОЛИРОВКА ГЛЯНЦЕВЫХ ЭЛЕМЕНТОВ САЛОНА"] }, { title: "СТЁКЛА", items: ["ПОЛИРОВКА СТЁКОЛ", "ПОЛИРОВКА ФАР"] }] },
    { id: "cleaning", title: "ХИМЧИСТКА", icon: "cleaning_services", items: ["КОМПЛЕКСНАЯ", "ХИМЧИСТКА ТЕКСТИЛЬНОГО САЛОНА", "ОЗОНИРОВАНИЕ", "ХИМЧИСТКА СИДЕНИЙ", "ХИМЧИСТКА БАГАЖНИКА", "ХИМЧИСТКА КОЖАНОГО САЛОНА"] },
    { id: "care", title: "УХОД", icon: "sanitizer", items: ["УХОД ЗА ПОДКАПОТНЫМ ПРОСТРАНСТВОМ", "ГЛУБОКАЯ ОЧИСТКА РАДИАТОРА", "УХОД ЗА КРЫШЕЙ КАБРИОЛЕТА"] },
    { id: "protection", title: "ЗАЩИТНЫЕ ПОКРЫТИЯ", icon: "verified", items: [{ title: "КУЗОВ", items: ["КЕРАМИЧЕСКОЕ ПОКРЫТИЕ", "ТВЕРДЫЙ ВОСК"] }, { title: "САЛОН", items: ["КЕРАМИЧЕСКОЕ ПОКРЫТИЕ САЛОНА"] }, { title: "СТЁКЛА", items: ["АНТИДОЖДЬ"] }, { title: "ДИСКИ", items: ["КЕРАМИЧЕСКОЕ ПОКРЫТИЕ ДИСКОВ"] }] },
    { id: "paint_arm", title: "МАЛЯРНЫЕ И АРМАТУРНЫЕ РАБОТЫ", icon: "format_paint", items: ["ПОКРАСКА", "ЛОКАЛЬНЫЙ ОКРАС", "АРМАТУРНЫЕ РАБОТЫ", "АНТИХРОМ", "ОКРАС ДИСКОВ И СУППОРТОВ", "УДАЛЕНИЕ ВМЯТИН", "РЕМОНТ СКОЛОВ НА СТЕКЛЕ"] },
    { id: "retrofit_rest", title: "РЕСТАВРАЦИЯ И ДООСНАЩЕНИЕ", icon: "handyman", items: [{ title: "ДООСНАЩЕНИЕ", items: ["ШУМОИЗОЛЯЦИЯ", "ВЫДВИЖНЫЕ ПОРОГИ", "ЗАЩИТНАЯ СЕТКА НА РЕШЕТКУ РАДИАТОРА", "БЕСКЛЮЧЕВОЙ ДОСТУП", "ЗВЁЗДНОЕ НЕБО", "ЛАМИНАЦИЯ КАРБОН", "МУЛЬТИМЕДИА", "ДОВОДЧИКИ ДВЕРЕЙ"] }] }
  ],

  // Распределено 4-5-4 (верхний ряд) и 5-4-4 (нижний ряд) в 3 колонки grid-cols-3
  // Итоговая высота колонок в пикселях будет максимально равной (9, 9, 8 элементов соответственно)
  PPF_GROUPS: [
    { title: "ЗАЩИТНЫЕ КОМПЛЕКСЫ", items: ["Полная оклейка", "Полная оклейка без крыши", "Зона риска \"Стандарт\"", "Зоны риска \"Премиум\""] }, // Column 1
    { title: "КУЗОВНЫЕ ЭЛЕМЕНТЫ", items: ["Бампер передний/задний", "Капот", "Крыло переднее", "Крыло заднее", "Крыша"] }, // Column 2
    { title: "ЭЛЕМЕНТЫ ПРОФИЛЯ", items: ["Дверь", "Крышка багажника", "Спойлер", "Расширитель арки"] }, // Column 3
    { title: "ДЕТАЛИ И ОПТИКА", items: ["Фары головной оптики", "Противотуманные фары", "Зеркала заднего вида", "Стойки лобового стекла 2 шт.", "Оклейка кромки двери"] }, // Column 1
    { title: "ФУНКЦИОНАЛЬНЫЕ ЗОНЫ", items: ["Полоса на капот (до 50 см)", "Полоса на крышу", "Полоса погрузочной зоны заднего бампера", "Пространства под ручками (4 шт.)"] }, // Column 2
    { title: "ПОРОГИ И ДЕМОНТАЖ", items: ["Порог наружний", "Порог внутренний", "Демонтаж плёнки \"Зоны Риска\"", "Демонтаж плёнки кузов полностью"] } // Column 3
  ],

  PRICES: {
    "Полная оклейка": [438000, 475000, 490000, 549000, 665000], "Полная оклейка без крыши": [412000, 448000, 460000, 510000, 620000], "Зона риска \"Стандарт\"": [161000, 180000, 194000, 200500, 235000], "Зоны риска \"Премиум\"": [175000, 190000, 206000, 212000, 246000], "Демонтаж плёнки \"Зоны Риска\"": ["от 25 000 ₽", "от 25 000 ₽", "от 30 000 ₽", "от 35 000 ₽", "от 40 000 ₽"], "Демонтаж плёнки кузов полностью": ["от 60 000 ₽", "от 60 000 ₽", "от 65 000 ₽", "от 65 000 ₽", "от 75 000 ₽"], "Стойки лобового стекла 2 шт.": [12000, 12000, 12000, 12000, 12000], "Полоса на капот (до 50 см)": [18000, 18000, 18000, 18000, 18000], "Полоса на крышу": [12000, 12000, 12000, 12000, 12000], "Пространства под ручками (4 шт.)": [10000, 10000, 10000, 10000, 10000], "Полоса погрузочной зоны заднего бампера": [8000, 8000, 8000, 8000, 8000], "Фары головной оптики": [15000, 15000, 15000, 15000, 15000], "Противотуманные фары": [10000, 10000, 10000, 10000, 10000], "Бампер передний/задний": [37000, 38000, 46000, 51000, 59000], "Капот": [39000, 39000, 48000, 52000, 61000], "Крыло переднее": [18000, 22000, 26000, 28000, 32000], "Крыло заднее": [41000, 51000, 54000, 58000, 65000], "Дверь": [22000, 24000, 26500, 29000, 31000], "Крышка багажника": [22000, 24000, 26500, 29000, 31000], "Крыша": [36000, 36000, 49000, 53000, 60000], "Порог наружний": [18000, 19000, 21000, 23000, 26000], "Порог внутренний": [4500, 5000, 5000, 5500, 6000], "Спойлер": [2000, 14000, 16000, 16000, 20000], "Расширитель арки": [10000, 12000, 15000, 15000, 18000], "Зеркала заднего вида": [14000, 14000, 16000, 16000, 16000], "Оклейка кромки двери": [5000, 5000, 5000, 5000, 5000],
    "ШУМОИЗОЛЯЦИЯ": [138000, 144000, 160000, 185000, 210000], "ВЫДВИЖНЫЕ ПОРОГИ": ["от 285 000 ₽", "от 285 000 ₽", "от 285 000 ₽", "от 285 000 ₽", "от 285 000 ₽"], "ЗВЁЗДНОЕ НЕБО": [150000, 150000, 150000, 150000, 150000], "КОМПЛЕКСНАЯ": [25000, 30000, 35000, 40000, 50000], "ПОKРАСКА": [20000, 20000, 20000, 20000, 20000], "АНТИХРОМ": [80000, 90000, 110000, 120000, 140000]
  } as Record<string, (number | string)[]>
};

const PRICING_SETTINGS = {
  sectionPaddingTop: 95, sectionHeight: 1100, maxWidth: 895, totalHeight: 528, buttonHeight: 48, neckLength: 20, cornerRadius: 16, resultsMaxWidth: 1152,
  typography: { titleSize: 20, titleColor: "#000000", categorySize: 11, categoryColor: "#0145f2", serviceSize: 14, serviceColor: "#000000", priceSize: 14, priceColor: "#000000" },
  overlay: { blur: "8px", brightness: "0.4" } // Настройка размытия и затемнения при открытии окон
};

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

function LargeDetailedServiceWindow({ carClass, settings, serviceName, onAddToCart }: { carClass: number, settings: typeof PRICING_SETTINGS, serviceName: string, onAddToCart: (name: string, price: number | string) => void }) {
  const { typography, resultsMaxWidth } = settings;
  const sNode = PRICING_DATA.SERVICES.find(s => s.items.some(i => (typeof i === 'string' ? i === serviceName : (i.title === serviceName || i.items.includes(serviceName)))));
  if (!sNode) return null;
  const groupsToDisplay = (serviceName === PPF_TITLE) ? PRICING_DATA.PPF_GROUPS : [{ title: serviceName, items: [serviceName] }];

  return (
    <div className="relative w-full mx-auto" style={{ marginTop: `${LAYOUT_SETTINGS.resultsY}px`, maxWidth: `${resultsMaxWidth}px` }}>
      <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] blur-[30px] translate-y-4" />
      <div className="relative z-10 bg-white rounded-[2.5rem] p-6 border border-white overflow-hidden shadow-2xl">
        <div className="flex items-center gap-4 mb-4"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><MaterialIcon name={sNode.icon} className="text-2xl" /></div><h3 className="font-bold tracking-tight uppercase" style={{ fontSize: `${typography.titleSize}px`, color: typography.titleColor }}>{serviceName}</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4">{groupsToDisplay.map((group, gIdx) => (<div key={gIdx} className="flex flex-col space-y-2"><h4 className="font-black uppercase tracking-widest mb-2" style={{ fontSize: `${typography.categorySize}px`, color: typography.categoryColor }}>{group.title}</h4><div className="space-y-1">{group.items.map((it) => { const d = PRICING_DATA.PRICES[it]?.[carClass - 1]; const p = typeof d === 'number' ? `${d.toLocaleString("ru-RU")} ₽` : (d || "Цена по запросу"); return (<div key={it} className="flex justify-between items-center py-1 group/row hover:bg-slate-50 px-2 rounded transition-all italic font-bold"><span className="uppercase leading-tight flex-1 pr-4" style={{ fontSize: `${typography.serviceSize}px`, color: typography.serviceColor }}>{it.charAt(0).toUpperCase() + it.slice(1).toLowerCase()}</span><div className="flex items-center gap-3"><span className="whitespace-nowrap" style={{ fontSize: `${typography.priceSize}px`, color: typography.priceColor }}>{p}</span><button onClick={() => onAddToCart(it, d || "Цена по запросу")} className="group w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center hover:bg-primary transition-all active:scale-95 shrink-0"><MaterialIcon name="add" className="text-[12px] text-primary group-hover:!text-white transition-colors" /></button></div></div>); })}</div></div>))}</div></div></div>
  );
}

export function PricingSection() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null); const [selectedModel, setSelectedModel] = useState<string | null>(null); const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null); const [selectedLeafService, setSelectedLeafService] = useState<string | null>(null); const [activeSelect, setActiveSelect] = useState<'brand' | 'model' | 'service' | null>(null); const [cart, setCart] = useState<{ name: string, price: number | string }[]>([]); const [isCartOpen, setIsCartOpen] = useState(false); const [hoveredL1, setHoveredL1] = useState<string | null>(null); const [hoveredL2, setHoveredL2] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); const buttonRef = useRef<HTMLDivElement>(null);
  const [menuWidth, setMenuWidth] = useState(895); const [buttonWidth, setButtonWidth] = useState(300);

  useEffect(() => {
    if (!containerRef.current || !buttonRef.current) return;
    const upd = () => { setMenuWidth(containerRef.current!.offsetWidth); setButtonWidth(buttonRef.current!.offsetWidth); };
    upd(); const obs = new ResizeObserver(upd); obs.observe(containerRef.current); obs.observe(buttonRef.current); window.addEventListener('resize', upd); return () => { obs.disconnect(); window.removeEventListener('resize', upd); };
  }, [selectedBrand, selectedModel, selectedServiceId]);

  const getPath = (op: boolean) => {
    const { totalHeight: yH, buttonHeight: bH, neckLength: nL, cornerRadius: r } = PRICING_SETTINGS;
    const x1 = menuWidth; const bx0 = x1 - buttonWidth; const bx1 = x1; const x0 = 0;
    if (!op) return `M ${bx0 + r},0 L ${bx1 - r},0 A ${r},${r} 0 0 1 ${bx1},${r} L ${bx1},${bH - r} A ${r},${r} 0 0 1 ${bx1 - r},${bH} L ${bx0 + r},${bH} A ${r},${r} 0 0 1 ${bx0},${bH - r} L ${bx0},${bH - r} A 0,0 0 0 1 ${bx0},${bH - r} L ${bx0},${bH - r} A 0,0 0 0 0 ${bx0},${bH - r} L ${bx0},${r} A ${r},${r} 0 0 1 ${bx0 + r},0 Z`;
    return `M ${bx0 + r},0 L ${bx1 - r},0 A ${r},${r} 0 0 1 ${bx1},${r} L ${bx1},${yH - r} A ${r},${r} 0 0 1 ${bx1 - r},${yH} L ${x0 + r},${yH} A ${r},${r} 0 0 1 ${x0},${yH - r} L ${x0},${bH + nL + r} A ${r},${r} 0 0 1 ${x0 + r},${bH + nL} L ${bx0 - r},${bH + nL} A ${r},${r} 0 0 0 ${bx0},${bH + nL - r} L ${bx0},${r} A ${r},${r} 0 0 1 ${bx0 + r},0 Z`;
  };

  const BRANDS = Object.keys(PRICING_DATA.CAR_DATA);
  const isOverlayActive = (!!activeSelect && !!selectedBrand && !!selectedModel && !!selectedLeafService) || isCartOpen;

  return (
    <section id="pricing" className="flex flex-col px-4 md:px-12 pb-16 w-full items-center bg-[#0145f2] text-white overflow-visible relative" style={{ paddingTop: PRICING_SETTINGS.sectionPaddingTop, minHeight: PRICING_SETTINGS.sectionHeight }}>
      {/* Фоновая подложка */}
      <div className="absolute inset-0 z-0 bg-[#0145f2]" />

      <svg width="0" height="0" className="absolute"><defs><clipPath id="menu-clip" clipPathUnits="userSpaceOnUse"><motion.path animate={{ d: getPath(activeSelect === 'service') }} transition={{ type: "spring", stiffness: 100, damping: 20 }} /></clipPath></defs></svg>

      {/* Слой с заголовком и кнопками, который НЕ размывается */}
      <div className="w-full relative z-40 flex flex-col items-center">
        <div className="w-full text-center relative" style={{ marginTop: `${LAYOUT_SETTINGS.titleY}px`, marginBottom: `${LAYOUT_SETTINGS.titleSpacing}px` }}>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">УСЛУГИ И ЦЕНЫ</h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto relative z-30 font-bold" style={{ marginTop: `${LAYOUT_SETTINGS.selectorsY}px` }}>
          <div className="absolute -left-13 top-0 flex flex-row gap-2">
            <button onClick={() => { setSelectedBrand(null); setSelectedModel(null); setSelectedServiceId(null); setSelectedLeafService(null); setActiveSelect(null); }} className="group w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-lg border border-white hover:bg-white transition-all">
              <MaterialIcon name="refresh" className="text-xl transition-transform duration-500 group-hover:rotate-180 inline-block transform-gpu antialiased will-change-transform" />
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setActiveSelect(activeSelect === 'brand' ? null : 'brand')} className="w-full h-12 rounded-2xl bg-white text-black px-6 flex justify-between items-center shadow-2xl transition-all"><span>{selectedBrand || "МАРКА"}</span><MaterialIcon name="expand_more" className={cn("text-lg text-primary transition-transform", activeSelect === 'brand' && "rotate-180")} /></button>
            <AnimatePresence>{activeSelect === 'brand' && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-100 p-2 italic">{BRANDS.map(b => <button key={b} onClick={() => { setSelectedBrand(b); setSelectedModel(null); setActiveSelect(null); }} className={cn("w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-primary hover:text-white", selectedBrand === b ? "bg-primary text-white" : "text-black")}>{b}</button>)}</motion.div>)}</AnimatePresence>
          </div>
          <div className="relative">
            <button onClick={() => setActiveSelect(activeSelect === 'model' ? null : 'model')} className="w-full h-12 rounded-2xl bg-white text-black px-6 flex justify-between items-center shadow-2xl transition-all"><span>{selectedModel || "МОДЕЛЬ"}</span><MaterialIcon name="expand_more" className={cn("text-lg text-primary transition-transform", activeSelect === 'model' && "rotate-180")} /></button>
            <AnimatePresence>{activeSelect === 'model' && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-slate-100 p-2 italic">{selectedBrand ? PRICING_DATA.CAR_DATA[selectedBrand].map(m => <button key={m} onClick={() => { setSelectedModel(m); setActiveSelect(null); }} className={cn("w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-primary hover:text-white", selectedModel === m ? "bg-primary text-white" : "text-black")}>{m}</button>) : <div className="p-4 text-xs text-black text-center uppercase font-bold">Выберите марку</div>}</motion.div>)}</AnimatePresence>
          </div>
          <div className="relative" ref={buttonRef}>
            <button onClick={() => { setActiveSelect(activeSelect === 'service' ? null : 'service'); if (selectedServiceId) setHoveredL1(selectedServiceId); }} className={cn("w-full h-12 rounded-2xl bg-white text-black px-6 flex justify-between items-center shadow-2xl z-20 relative", activeSelect === 'service' && "opacity-0 invisible")}>
              <span className="flex-1 text-left truncate px-1 text-base">{selectedLeafService || "УСЛУГА"}</span>
              <MaterialIcon name="expand_more" className="text-lg text-primary shrink-0" />
            </button>
            <div className="absolute -right-13 top-0">
              <div className="relative">
                <button onClick={() => setIsCartOpen(!isCartOpen)} className="group w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-lg border relative z-20 transition-all font-bold">
                  <MaterialIcon name="shopping_cart" className="text-xl transition-transform duration-300 group-hover:scale-110 inline-block transform-gpu antialiased will-change-transform" />
                  {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">{cart.length}</span>}
                </button>
                <AnimatePresence>{isCartOpen && (<motion.div initial={{ opacity: 0, scale: 0.9, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -10 }} className="absolute right-0 top-full mt-4 w-80 bg-white rounded-3xl shadow-2xl border z-50 overflow-hidden text-black origin-top-right italic font-bold"><div className="p-6"><div className="flex justify-between items-center mb-6 pr-2"><h3 className="uppercase tracking-tight text-sm font-bold">Ваш расчет</h3><button onClick={() => setIsCartOpen(false)} className="text-black w-6 h-6 flex items-center justify-end"><MaterialIcon name="close" className="text-lg" /></button></div><div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar text-left">{cart.length === 0 ? <p className="text-xs text-black text-center py-10 uppercase">Корзина пуста</p> : cart.map((it, i) => (<div key={i} className="flex justify-between items-start gap-4"><div className="flex-1"><p className="uppercase leading-tight text-sm">{it.name}</p><p className="text-[10px] text-primary mt-1">{typeof it.price === 'number' ? `${it.price.toLocaleString("ru-RU")} ₽` : it.price}</p></div><button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-black hover:text-red-500 w-6 h-6 flex items-center justify-end shrink-0"><MaterialIcon name="delete" className="text-base" /></button></div>))}</div>{cart.length > 0 && (<div className="mt-8 pt-6 border-t font-bold"><div className="flex justify-between items-center mb-6"><span className="text-xs text-black">Итого:</span><span className="text-primary text-xl font-black">{cart.reduce((acc, curr) => typeof curr.price === 'number' ? acc + curr.price : acc, 0).toLocaleString("ru-RU")} ₽</span></div><button className="w-full py-4 bg-primary text-white rounded-2xl text-xs uppercase shadow-xl hover:shadow-2xl transition-all font-bold">Оформить запись</button></div>)}</div></motion.div>)}</AnimatePresence>
              </div>
            </div>
            <AnimatePresence>{activeSelect === 'service' && (<div className="absolute top-0 right-0 z-[100] pointer-events-none w-full md:w-auto"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white pointer-events-auto overflow-hidden shadow-2xl" style={{ clipPath: 'url(#menu-clip)', width: menuWidth }}><div className="h-12 flex justify-end items-center"><div className="h-full relative overflow-hidden flex items-center bg-white" style={{ width: buttonWidth }}><button onClick={() => setActiveSelect(null)} className="w-full h-full font-bold truncate flex justify-between items-center text-black px-6"><span className="flex-1 text-left truncate px-1 text-base">{selectedLeafService || "УСЛУГА"}</span><MaterialIcon name="expand_more" className="text-lg text-primary rotate-180 shrink-0" /></button></div></div>{(!selectedBrand || !selectedModel) ? (<div className="h-[480px] flex items-center justify-center p-8 bg-slate-50 font-bold uppercase italic"><div className="text-center"><MaterialIcon name="info" className="text-5xl text-primary mb-4" /><p className="text-xl text-black">{!selectedBrand ? "ВЫБЕРИТЕ МАРКУ И МОДЕЛЬ" : "ВЫБЕРИТЕ МОДЕЛЬ"}</p></div></div>) : (<div className="h-[480px] flex flex-col md:flex-row uppercase italic font-bold">
              <div className="w-full md:w-1/3 overflow-y-auto p-8 bg-slate-50 relative border-r border-slate-100"><div className="sticky top-0 z-10 pb-4"><p className="text-[10px] uppercase tracking-widest text-center text-black font-black">Категория</p></div><div className="space-y-1">{PRICING_DATA.SERVICES.map(s => (<button key={s.id} onMouseEnter={() => { setHoveredL1(s.id); setHoveredL2(null); }} className={cn("w-full px-4 py-4 rounded-2xl transition-all flex items-center justify-start relative min-h-[56px]", hoveredL1 === s.id ? "bg-primary text-white" : "text-black hover:bg-white")}><MaterialIcon name={s.icon} className={cn("text-2xl absolute left-4", hoveredL1 === s.id ? "text-white" : "text-black")} /><span className="text-xs pl-10 pr-6 text-left leading-tight uppercase font-bold">{s.title}</span><MaterialIcon name="chevron_right" className="absolute right-4" /></button>))}</div></div>
              <div className="w-full md:w-1/3 overflow-y-auto p-8 bg-white text-black relative"><div className="sticky top-0 z-10 pb-4"><p className="text-[10px] uppercase tracking-widest text-center text-black font-black">Раздел</p></div><div className="space-y-1">{hoveredL1 ? PRICING_DATA.SERVICES.find(s => s.id === hoveredL1)?.items.map((item, idx) => { const t = typeof item === 'string' ? item : item.title; const hasC = typeof item !== 'string'; return (<button key={idx} onMouseEnter={() => setHoveredL2(t)} onClick={() => { if (!hasC) { setSelectedServiceId(hoveredL1); setSelectedLeafService(t); setActiveSelect(null); } }} className={cn("w-full px-4 py-4 rounded-2xl transition-all flex items-center justify-start relative min-h-[56px]", hoveredL2 === t ? "bg-primary text-white" : "hover:bg-slate-50")}><span className="text-xs pr-8 text-left leading-tight uppercase font-bold">{t}</span>{hasC && <MaterialIcon name="chevron_right" className="absolute right-4" />}</button>); }) : <p className="text-xs pt-10 text-center uppercase italic">Выберите категорию</p>}</div></div>
              <div className="w-full md:w-1/3 overflow-y-auto p-8 bg-slate-50 text-black relative"><div className="sticky top-0 z-10 pb-4"><p className="text-[10px] uppercase tracking-widest text-center text-black font-black">Услуга</p></div><div className="space-y-1">{hoveredL1 && hoveredL2 ? (() => { const f = PRICING_DATA.SERVICES.find(s => s.id === hoveredL1)?.items.find(i => (typeof i === 'string' ? i : i.title) === hoveredL2); if (f && typeof f !== 'string') return f.items.map((leaf, idx) => (<button key={idx} onClick={() => { setSelectedServiceId(hoveredL1); setSelectedLeafService(leaf); setActiveSelect(null); }} className={cn("w-full px-6 py-4 rounded-2xl transition-all flex items-center justify-start text-left min-h-[56px]", selectedLeafService === leaf ? "bg-primary text-white" : "hover:bg-primary hover:text-white")}><span className="text-xs uppercase leading-tight font-bold">{leaf}</span></button>)); return null; })() : <p className="text-xs pt-10 text-center uppercase italic">Выберите раздел</p>}</div></div>
            </div>)}</motion.div></div>)}</AnimatePresence>
          </div>
        </div>
      </div>

      {/* Слой для размытия и закрытия окон при клике вне их области (Overlay) */}
      <AnimatePresence>
        {(activeSelect || isCartOpen) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setActiveSelect(null); setIsCartOpen(false); }}
            className="absolute inset-0 z-[25] transition-all duration-300 pointer-events-auto"
            style={{ 
              backdropFilter: isOverlayActive ? `blur(${PRICING_SETTINGS.overlay.blur})` : 'none',
              backgroundColor: isOverlayActive ? `rgba(0,0,0,${1 - parseFloat(PRICING_SETTINGS.overlay.brightness)})` : 'transparent',
              WebkitBackdropFilter: isOverlayActive ? `blur(${PRICING_SETTINGS.overlay.blur})` : 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* Окно результатов и плейсхолдер */}
      <div className={cn("w-full relative z-10 flex flex-col items-center transition-all", isOverlayActive && "pointer-events-none select-none")}>
        <AnimatePresence mode="wait">
          {selectedBrand && selectedModel && selectedLeafService ? (
            <motion.div key={`grid-${selectedLeafService}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-5xl mx-auto relative z-10 font-bold"><LargeDetailedServiceWindow carClass={getCarClass(selectedBrand, selectedModel)} settings={PRICING_SETTINGS} serviceName={selectedLeafService} onAddToCart={(n, p) => { setCart([...cart, { name: n, price: p }]); setIsCartOpen(true); }} /></motion.div>
          ) : (<motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-64 flex items-center justify-center mt-32 relative z-10 italic font-bold"><p className="text-sm md:text-xl tracking-[0.4em] uppercase text-white/90 text-center">ВЫБЕРИТЕ МАРКУ, МОДЕЛЬ И УСЛУГУ</p></motion.div>)}
        </AnimatePresence>
      </div>
    </section>
  );
}
