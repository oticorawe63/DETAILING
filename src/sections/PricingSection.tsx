"use client";

import { MaterialIcon } from "@/components/MaterialIcon";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { 
  PRICING_DATA,
  PPF_TITLE,
  POLY_TITLE,
  VINYL_TITLE,
  INTERIOR_TITLE,
  GLASS_PROT_TITLE,
  HEADLIGHTS_TITLE,
  TINTING_TITLE,
  ATERMAL_TITLE,
  RESTORATION_POLISH_TITLE,
  SOFT_POLISH_TITLE,
  LOCAL_POLISH_TITLE,
  POLISH_COMBO_TITLE,
  RISK_ZONES_TITLE,
  INTERIOR_POLISH_TITLE,
  GLASS_HEADLIGHTS_POLISH_TITLE,
  COMBO_CLEANING_TITLE,
  TEXTILE_CLEANING_TITLE,
  LOCAL_CLEANING_TITLE,
  CERAMIC_TITLE,
  INTERIOR_CERAMIC_TITLE,
  ANTIRAIN_TITLE,
  WHEELS_CERAMIC_TITLE,
  PAINTING_TITLE,
  LOCAL_PAINT_TITLE,
  ARMATURE_TITLE,
  ANTICHROME_TITLE,
  WHEELS_PAINT_TITLE,
  DENT_REMOVAL_TITLE,
  STEERING_WHEEL_REWRAP_TITLE,
  INTERIOR_RESTORATION_TITLE,
  SEAT_REPAIR_TITLE,
  ENGINE_CARE_TITLE,
  ROOF_CARE_TITLE,
  SHUM_TITLE,
  SIDE_STEPS_TITLE,
  GRILLE_MESH_TITLE,
  KEYLESS_TITLE,
  STARRY_SKY_TITLE,
  CARBON_LAMINATION_TITLE,
  MULTIMEDIA_TITLE,
  SOFT_CLOSE_TITLE
} from "@/lib/pricingData";

// 2. ПУЛЬТ УПРАВЛЕНИЯ РАСПОЛОЖЕНИЕМ (LAYOUT) - Актуальные настройки пользователя
const LAYOUT_SETTINGS = {
  titleY: -35,           // Верхний отступ заголовка "УСЛУГИ И ЦЕНЫ"
  titleSpacing: 5,       // Отступ ПОСЛЕ заголовка (до кнопок)
  selectorsY: 0,         // Дополнительный отступ для ряда кнопок (Марка/Модель/Услуга)
  resultsY: 15           // Положение большого окна с ценами (marginTop)
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
  const groupsToDisplay = (serviceName === PPF_TITLE || serviceName === POLY_TITLE) ? PRICING_DATA.PPF_GROUPS : (serviceName === VINYL_TITLE) ? PRICING_DATA.VINYL_GROUPS : (serviceName === INTERIOR_TITLE) ? PRICING_DATA.INTERIOR_GROUPS : (serviceName === GLASS_PROT_TITLE) ? PRICING_DATA.GLASS_PROT_GROUPS : (serviceName === HEADLIGHTS_TITLE) ? PRICING_DATA.HEADLIGHTS_GROUPS : (serviceName === TINTING_TITLE) ? PRICING_DATA.TINTING_GROUPS : (serviceName === ATERMAL_TITLE) ? PRICING_DATA.ATERMAL_GROUPS : (serviceName === RESTORATION_POLISH_TITLE) ? PRICING_DATA.RESTORATION_POLISH_GROUPS : (serviceName === SOFT_POLISH_TITLE) ? PRICING_DATA.SOFT_POLISH_GROUPS : (serviceName === LOCAL_POLISH_TITLE) ? PRICING_DATA.LOCAL_POLISH_GROUPS : (serviceName === POLISH_COMBO_TITLE) ? PRICING_DATA.POLISH_COMBO_GROUPS : (serviceName === RISK_ZONES_TITLE) ? PRICING_DATA.RISK_ZONES_GROUPS : (serviceName === INTERIOR_POLISH_TITLE) ? PRICING_DATA.INTERIOR_POLISH_GROUPS : (serviceName === GLASS_HEADLIGHTS_POLISH_TITLE) ? PRICING_DATA.GLASS_HEADLIGHTS_POLISH_GROUPS : (serviceName === COMBO_CLEANING_TITLE) ? PRICING_DATA.COMBO_CLEANING_GROUPS : (serviceName === TEXTILE_CLEANING_TITLE) ? PRICING_DATA.TEXTILE_CLEANING_GROUPS : (serviceName === LOCAL_CLEANING_TITLE) ? PRICING_DATA.LOCAL_CLEANING_GROUPS : (serviceName === CERAMIC_TITLE) ? PRICING_DATA.CERAMIC_GROUPS : (serviceName === INTERIOR_CERAMIC_TITLE) ? PRICING_DATA.INTERIOR_CERAMIC_GROUPS : (serviceName === ANTIRAIN_TITLE) ? PRICING_DATA.ANTIRAIN_GROUPS : (serviceName === WHEELS_CERAMIC_TITLE) ? PRICING_DATA.WHEELS_CERAMIC_GROUPS : (serviceName === PAINTING_TITLE) ? PRICING_DATA.PAINTING_GROUPS : (serviceName === LOCAL_PAINT_TITLE) ? PRICING_DATA.LOCAL_PAINT_GROUPS : (serviceName === ARMATURE_TITLE) ? PRICING_DATA.ARMATURE_GROUPS : (serviceName === ANTICHROME_TITLE) ? PRICING_DATA.ANTICHROME_GROUPS : (serviceName === WHEELS_PAINT_TITLE) ? PRICING_DATA.WHEELS_PAINT_GROUPS : (serviceName === DENT_REMOVAL_TITLE) ? PRICING_DATA.DENT_REMOVAL_GROUPS : (serviceName === STEERING_WHEEL_REWRAP_TITLE) ? PRICING_DATA.STEERING_WHEEL_REWRAP_GROUPS : (serviceName === INTERIOR_RESTORATION_TITLE) ? PRICING_DATA.INTERIOR_RESTORATION_GROUPS : (serviceName === SEAT_REPAIR_TITLE) ? PRICING_DATA.SEAT_REPAIR_GROUPS : (serviceName === ENGINE_CARE_TITLE) ? PRICING_DATA.ENGINE_CARE_GROUPS : (serviceName === ROOF_CARE_TITLE) ? PRICING_DATA.ROOF_CARE_GROUPS : (serviceName === SHUM_TITLE) ? PRICING_DATA.SHUM_GROUPS : (serviceName === SIDE_STEPS_TITLE) ? PRICING_DATA.SIDE_STEPS_GROUPS : (serviceName === GRILLE_MESH_TITLE) ? PRICING_DATA.GRILLE_MESH_GROUPS : (serviceName === KEYLESS_TITLE) ? PRICING_DATA.KEYLESS_GROUPS : (serviceName === STARRY_SKY_TITLE) ? PRICING_DATA.STARRY_SKY_GROUPS : (serviceName === CARBON_LAMINATION_TITLE) ? PRICING_DATA.CARBON_LAMINATION_GROUPS : (serviceName === MULTIMEDIA_TITLE) ? PRICING_DATA.MULTIMEDIA_GROUPS : (serviceName === SOFT_CLOSE_TITLE) ? PRICING_DATA.SOFT_CLOSE_GROUPS : [{ title: serviceName, items: [serviceName] }];
  return (
    <div className="relative w-full mx-auto" style={{ marginTop: `${LAYOUT_SETTINGS.resultsY}px`, maxWidth: `${resultsMaxWidth}px` }}>
      <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] blur-[30px] translate-y-4" />
      <div className="relative z-10 bg-white rounded-[2.5rem] p-6 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-4 mb-4"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><MaterialIcon name={sNode.icon} className="text-2xl" /></div><h3 className="font-bold tracking-tight uppercase" style={{ fontSize: `${typography.titleSize}px`, color: typography.titleColor }}>{serviceName}</h3></div>
        <div className={cn("grid grid-cols-1 gap-y-4", groupsToDisplay.length === 2 ? "md:grid-cols-2 gap-x-16" : "md:grid-cols-3 gap-x-12")}>{groupsToDisplay.map((group, gIdx) => (<div key={gIdx} className="flex flex-col space-y-2"><h4 className="font-black uppercase tracking-widest mb-2" style={{ fontSize: `${typography.categorySize}px`, color: typography.categoryColor }}>{group.title}</h4><div className="space-y-1">{group.items.map((it) => { const d = PRICING_DATA.PRICES[it]?.[carClass - 1]; const p = typeof d === 'number' ? `${d.toLocaleString("ru-RU")} ₽` : (typeof d === 'string' ? d.replace(/от\s*(\d[\d\s]*)\s*до\s*\d[\d\s]*/gi, "от $1").replace(/Цена\s*по\s*запросу/gi, "По запросу") : "По запросу"); const displayName = (it.trim().charAt(0).toUpperCase() + it.trim().slice(1).toLowerCase()).replace(/x-pel|xpel/gi, "X-PEL").replace(/spectroll/gi, "SPECTROLL").replace(/stek/gi, "STEK"); return (<div key={it} className="flex justify-between items-center py-1 group/row hover:bg-slate-50 px-2 rounded transition-all italic font-bold"><span className="uppercase leading-tight flex-1 pr-4" style={{ fontSize: `${typography.serviceSize}px`, color: typography.serviceColor }}>{displayName}</span><div className="flex items-center gap-3"><span className="whitespace-nowrap" style={{ fontSize: `${typography.priceSize}px`, color: typography.priceColor }}>{p}</span><button onClick={() => onAddToCart(it, d || "Цена по запросу")} className="group w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center hover:bg-primary transition-all active:scale-95 shrink-0"><MaterialIcon name="add" className="text-[12px] text-primary group-hover:!text-white transition-colors" /></button></div></div>); })}</div></div>))}</div></div></div>
  );
}

export function PricingSection({ 
  cart, 
  setCart, 
  selectedBrand, 
  setSelectedBrand, 
  selectedModel, 
  setSelectedModel, 
  onCheckout 
}: { 
  cart: { name: string, price: number | string }[], 
  setCart: (cart: { name: string, price: number | string }[]) => void, 
  selectedBrand: string | null, 
  setSelectedBrand: (brand: string | null) => void, 
  selectedModel: string | null, 
  setSelectedModel: (model: string | null) => void, 
  onCheckout: () => void 
}) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null); const [selectedLeafService, setSelectedLeafService] = useState<string | null>(null); const [activeSelect, setActiveSelect] = useState<'brand' | 'model' | 'service' | null>(null); const [isCartOpen, setIsCartOpen] = useState(false); const [hoveredL1, setHoveredL1] = useState<string | null>(null); const [hoveredL2, setHoveredL2] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); const buttonRef = useRef<HTMLDivElement>(null);
  const [menuWidth, setMenuWidth] = useState(895); const [buttonWidth, setButtonWidth] = useState(300);

  useEffect(() => {
    if (!containerRef.current || !buttonRef.current) return;
    const upd = () => { if (containerRef.current) setMenuWidth(containerRef.current.offsetWidth); if (buttonRef.current) setButtonWidth(buttonRef.current.offsetWidth); };
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
          <div className="absolute -left-16 top-0 flex flex-row gap-2">
            <button onClick={() => { setSelectedBrand(null); setSelectedModel(null); setSelectedServiceId(null); setSelectedLeafService(null); setActiveSelect(null); }} className="group w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-lg border border-white hover:bg-white transition-all">
              <MaterialIcon name="refresh" className="text-xl transition-transform duration-500 group-hover:rotate-180 inline-block transform-gpu antialiased will-change-transform" />
            </button>
          </div>
          <div className="relative">
            <button onClick={() => setActiveSelect(activeSelect === 'brand' ? null : 'brand')} className="w-full h-12 rounded-2xl bg-white text-black px-6 flex justify-between items-center shadow-2xl transition-all"><span>{selectedBrand || "МАРКА"}</span><MaterialIcon name="expand_more" className={cn("text-lg text-primary transition-transform", activeSelect === 'brand' && "rotate-180")} /></button>
            <AnimatePresence>{activeSelect === 'brand' && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden p-2 italic">{BRANDS.map(b => <button key={b} onClick={() => { setSelectedBrand(b); setSelectedModel(null); setActiveSelect(null); }} className={cn("w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-primary hover:text-white", selectedBrand === b ? "bg-primary text-white" : "text-black")}>{b}</button>)}</motion.div>)}</AnimatePresence>
          </div>
          <div className="relative">
            <button onClick={() => setActiveSelect(activeSelect === 'model' ? null : 'model')} className="w-full h-12 rounded-2xl bg-white text-black px-6 flex justify-between items-center shadow-2xl transition-all"><span>{selectedModel || "МОДЕЛЬ"}</span><MaterialIcon name="expand_more" className={cn("text-lg text-primary transition-transform", activeSelect === 'model' && "rotate-180")} /></button>
            <AnimatePresence>{activeSelect === 'model' && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden p-2 italic">{selectedBrand ? PRICING_DATA.CAR_DATA[selectedBrand].map(m => <button key={m} onClick={() => { setSelectedModel(m); setActiveSelect(null); }} className={cn("w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-primary hover:text-white", selectedModel === m ? "bg-primary text-white" : "text-black")}>{m}</button>) : <div className="p-4 text-xs text-black text-center uppercase font-bold">Выберите марку</div>}</motion.div>)}</AnimatePresence>
          </div>
          <div className="relative" ref={buttonRef}>
            <button onClick={() => { setActiveSelect(activeSelect === 'service' ? null : 'service'); if (selectedServiceId) setHoveredL1(selectedServiceId); }} className={cn("w-full h-12 rounded-2xl bg-white text-black px-6 flex justify-between items-center shadow-2xl z-20 relative", activeSelect === 'service' && "opacity-0 invisible")}>
              <span className="flex-1 text-left truncate px-1 text-base">{selectedLeafService || "УСЛУГА"}</span>
              <MaterialIcon name="expand_more" className="text-lg text-primary shrink-0" />
            </button>
            <div className="absolute -right-16 top-0">
              <div className="relative">
                <button onClick={() => setIsCartOpen(!isCartOpen)} className="group w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-lg border relative z-20 transition-all font-bold">
                  <MaterialIcon name="shopping_cart" className="text-xl transition-transform duration-300 group-hover:scale-110 inline-block transform-gpu antialiased will-change-transform" />
                  {cart.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">{cart.length}</span>}
                </button>
                <AnimatePresence>{isCartOpen && (<motion.div initial={{ opacity: 0, scale: 0.9, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -10 }} className="absolute right-0 top-full mt-4 w-80 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden text-black origin-top-right italic font-bold"><div className="p-6"><div className="flex justify-between items-center mb-6 pr-2"><h3 className="uppercase tracking-tight text-sm font-bold">Ваш расчет</h3><button onClick={() => setIsCartOpen(false)} className="text-black w-6 h-6 flex items-center justify-end"><MaterialIcon name="close" className="text-lg" /></button></div><div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar text-left">{cart.length === 0 ? <p className="text-xs text-black text-center py-10 uppercase">Корзина пуста</p> : cart.map((it, i) => { const pDisplay = typeof it.price === 'number' ? `${it.price.toLocaleString("ru-RU")} ₽` : it.price.toString().replace(/от\s*/gi, ""); return (<div key={i} className="flex justify-between items-start gap-4"><div className="flex-1"><p className="uppercase leading-tight text-sm">{it.name}</p><p className="text-[10px] text-primary mt-1">{pDisplay}</p></div><button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-black hover:text-red-500 w-6 h-6 flex items-center justify-end shrink-0"><MaterialIcon name="delete" className="text-base" /></button></div>); })}</div>{cart.length > 0 && (<div className="mt-8 pt-6 border-t font-bold"><div className="flex justify-between items-center mb-6"><span className="text-xs text-black">Итого:</span><span className="text-primary text-xl font-black">{cart.reduce((acc, curr) => { const parse = (p: number | string) => { if (typeof p === 'number') return p; const m = p.toString().replace(/\s/g, "").match(/\d+/); return m ? parseInt(m[0]) : 0; }; return acc + parse(curr.price); }, 0).toLocaleString("ru-RU")} ₽</span></div><button onClick={() => { setIsCartOpen(false); onCheckout(); }} className="w-full py-4 bg-primary text-white rounded-2xl text-xs uppercase shadow-xl hover:shadow-2xl transition-all font-bold">ОФОРМИТЬ</button></div>)}</div></motion.div>)}</AnimatePresence>
              </div>
            </div>
            <AnimatePresence>{activeSelect === 'service' && (<div className="absolute top-0 right-0 z-[100] pointer-events-none w-full md:w-auto">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white pointer-events-auto overflow-hidden shadow-2xl" style={{ clipPath: 'url(#menu-clip)', width: menuWidth }}>
                <div className="h-12 flex justify-end items-center"><div className="h-full relative overflow-hidden flex items-center bg-white" style={{ width: buttonWidth }}><button onClick={() => setActiveSelect(null)} className="w-full h-full font-bold truncate flex justify-between items-center text-black px-6"><span className="flex-1 text-left truncate px-1 text-base">{selectedLeafService || "УСЛУГА"}</span><MaterialIcon name="expand_more" className="text-lg text-primary rotate-180 shrink-0" /></button></div></div>{(!selectedBrand || !selectedModel) ? (<div className="h-[480px] flex items-center justify-center p-8 bg-slate-50 font-bold uppercase italic"><div className="text-center"><MaterialIcon name="info" className="text-5xl text-primary mb-4" /><p className="text-xl text-black">{!selectedBrand ? "ВЫБЕРИТЕ МАРКУ И МОДЕЛЬ" : "ВЫБЕРИТЕ МОДЕЛЬ"}</p></div></div>) : (<div className="h-[480px] flex flex-col md:flex-row uppercase italic font-bold">
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
