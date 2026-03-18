"use client";

import { MaterialIcon } from "@/components/MaterialIcon";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArcMenu } from "@/components/ArcMenu";
import { ModelArcMenu } from "@/components/ModelArcMenu";
import { ConfiguratorCanvas } from "@/components/canvas/ConfiguratorCanvas";
import { CoatingArcMenu } from "@/components/CoatingArcMenu";

const COLORS_PAGES = [
  [
    { id: "white", bg: "bg-slate-100", name: "Белый" },
    { id: "gray", bg: "bg-slate-300", name: "Серый" },
    { id: "black", bg: "bg-slate-950", name: "Черный" },
  ],
  [
    { id: "red", bg: "bg-red-600", name: "Красный" },
    { id: "orange", bg: "bg-orange-500", name: "Оранжевый" },
    { id: "yellow", bg: "bg-yellow-400", name: "Желтый" },
  ],
  [
    { id: "green", bg: "bg-green-600", name: "Зеленый" },
    { id: "lime", bg: "bg-lime-400", name: "Салатовый" },
    { id: "lightblue", bg: "bg-sky-400", name: "Голубой" },
  ],
  [
    { id: "blue", bg: "bg-blue-600", name: "Синий" },
    { id: "pink", bg: "bg-pink-500", name: "Розовый" },
    { id: "purple", bg: "bg-purple-600", name: "Фиолетовый" },
  ],
];

const WHEELS_DATA: Record<string, { id: string, src: string, name: string }[][]> = {
  "BMW": [
    [
      { id: "bw1", src: "/wheels/bmw/wheel1.png", name: "BMW M-Performance 1" },
      { id: "bw2", src: "/wheels/bmw/wheel2.png", name: "BMW M-Performance 2" },
      { id: "bw3", src: "/wheels/bmw/wheel3.png", name: "BMW M-Performance 3" },
    ],
    [
      { id: "bw4", src: "/wheels/bmw/wheel4.png", name: "BMW M-Performance 4" },
      { id: "bw5", src: "/wheels/bmw/wheel5.png", name: "BMW M-Performance 5" },
      { id: "bw6", src: "/wheels/bmw/wheel6.png", name: "BMW M-Performance 6" },
    ]
  ],
  "AUDI": [
    [
      { id: "aw1", src: "/wheels/audi/wheel1.png", name: "Audi Sport V-Spoke" },
      { id: "aw2", src: "/wheels/audi/wheel2.png", name: "Audi Sport Blade" },
      { id: "aw3", src: "/wheels/audi/wheel3.png", name: "Audi Sport 5-Arm" },
    ],
    [
      { id: "aw4", src: "/wheels/audi/wheel4.png", name: "Audi Sport Multi-Spoke" },
      { id: "aw5", src: "/wheels/audi/wheel5.png", name: "Audi Sport Gloss Black" },
      { id: "aw6", src: "/wheels/audi/wheel6.png", name: "Audi Sport Rotor" },
    ]
  ],
  "MERCEDES": [
    [
      { id: "mw1", src: "/wheels/mercedes/wheel1.png", name: "Mercedes AMG 1" },
      { id: "mw2", src: "/wheels/mercedes/wheel2.png", name: "Mercedes AMG 2" },
      { id: "mw3", src: "/wheels/mercedes/wheel3.png", name: "Mercedes AMG 3" },
    ],
    [
      { id: "mw4", src: "/wheels/mercedes/wheel4.png", name: "Mercedes AMG 4" },
      { id: "mw5", src: "/wheels/mercedes/wheel5.png", name: "Mercedes AMG 5" },
      { id: "mw6", src: "/wheels/mercedes/wheel6.png", name: "Mercedes AMG 6" },
    ]
  ],
  "PORSCHE": [
    [
      { id: "pw1", src: "/wheels/porsche/wheel1.png", name: "Porsche RS Spyder" },
      { id: "pw2", src: "/wheels/porsche/wheel2.png", name: "Porsche Sport Design" },
      { id: "pw3", src: "/wheels/porsche/wheel3.png", name: "Porsche Carrera Classic" },
    ],
    [
      { id: "pw4", src: "/wheels/porsche/wheel4.png", name: "Porsche Taycan Turbo" },
      { id: "pw5", src: "/wheels/porsche/wheel5.png", name: "Porsche Exclusive Design" },
      { id: "pw6", src: "/wheels/porsche/wheel6.png", name: "Porsche GT Design Gloss" },
    ]
  ],
  "TOYOTA": [
    [
      { id: "tw1", src: "/wheels/toyota/wheel1.png", name: "Toyota Forged Silver" },
      { id: "tw2", src: "/wheels/toyota/wheel2.png", name: "Toyota TRD Off-Road" },
      { id: "tw3", src: "/wheels/toyota/wheel3.png", name: "Toyota Gunmetal Mesh" },
    ],
    [
      { id: "tw4", src: "/wheels/toyota/wheel4.png", name: "Toyota Chrome Y-Spoke" },
      { id: "tw5", src: "/wheels/toyota/wheel5.png", name: "Toyota Sport 5-Spoke" },
    ]
  ],
  "DEFAULT": [
    [
      { id: "w1", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6JA2N1HdqM1hrYElXxzHL9G3wE0B5-BZJkrepj9jsreVzfoHvqluqtHUNXbhh2lJcxBel9NPtAu7dtqrSqRZkfsZVrbY7L47sFQpDcZLWMq-zY17DB2zJkV-mA8KuRrbCaPpsK7Lee74KyE0tGDaeD7tqTMgL8WmdnBuz5fHjdjrO5FvhLXDzcoLioFBrgNheHNCby4O4P8lgf81_1IaFUzTGwls_IP7O8TBtYicKNcrlzIM6Zk2l_GCBRjfcKGnLd_BR20qIt7gz", name: "Стандартные диски" },
      { id: "w2", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS8qLzZcuGq6deBonfSGR5BrhSJWUrYXPbH9IWgBwOCho28vi7JBlrKldiV8MXi4aL_hZ5FMjD6qa-Ifl6YJBlBEFJdeiD3V_jk03znp2Ztjz83Ol1--M3TBZWonJfOZu3JA4kQX_DzVE2croEvPxuZPC0SxenVcis0f6YLbI7Pfl8zyk0hdPhbhJ8QZzw98YBmrbT-A_r1YTSCV1_qmaqtOYk866tjT-QRC4k-rP7wuqXmtyaIqxurJuE2bpyMYhU41bTRxguWFsT", name: "Спортивные диски" },
      { id: "w3", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1kDbNWQKrtxgPbudRC6eGvVLBt7vDqtMn9X2U72moSess0ny94T4a6UAZEPvqN-Ia4yccE2w_5C1VWAAOpXHN9yxSq3pcTFO2flcNsvNxoWYHOqIdSDIabLrphujSVfsMEZbgndYUSlw5X7xFp_MjYpKyCcCUBAREDGtDkOn0sta46FChadqSuNKhNYrNX6EV6o3RAsAUjO4xpFyXLAAhIRXZ_n5_OJqXdJ1ZCehmppskKohG5JN1gYN1SnW9U20z79loemfhxlKL", name: "Трековые диски" },
    ],
    [
      { id: "w4", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6JA2N1HdqM1hrYElXxzHL9G3wE0B5-BZJkrepj9jsreVzfoHvqluqtHUNXbhh2lJcxBel9NPtAu7dtqrSqRZkfsZVrbY7L47sFQpDcZLWMq-zY17DB2zJkV-mA8KuRrbCaPpsK7Lee74KyE0tGDaeD7tqTMgL8WmdnBuz5fHjdjrO5FvhLXDzcoLioFBrgNheHNCby4O4P8lgf81_1IaFUzTGwls_IP7O8TBtYicKNcrlzIM6Zk2l_GCBRjfcKGnLd_BR20qIt7gz", name: "Стандартные диски 2" },
      { id: "w5", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS8qLzZcuGq6deBonfSGR5BrhSJWUrYXPbH9IWgBwOCho28vi7JBlrKldiV8MXi4aL_hZ5FMjD6qa-Ifl6YJBlBEFJdeiD3V_jk03znp2Ztjz83Ol1--M3TBZWonJfOZu3JA4kQX_DzVE2croEvPxuZPC0SxenVcis0f6YLbI7Pfl8zyk0hdPhbhJ8QZzw98YBmrbT-A_r1YTSCV1_qmaqtOYk866tjT-QRC4k-rP7wuqXmtyaIqxurJuE2bpyMYhU41bTRxguWFsT", name: "Спортивные диски 2" },
      { id: "w6", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1kDbNWQKrtxgPbudRC6eGvVLBt7vDqtMn9X2U72moSess0ny94T4a6UAZEPvqN-Ia4yccE2w_5C1VWAAOpXHN9yxSq3pcTFO2flcNsvNxoWYHOqIdSDIabLrphujSVfsMEZbgndYUSlw5X7xFp_MjYpKyCcCUBAREDGtDkOn0sta46FChadqSuNKhNYrNX6EV6o3RAsAUjO4xpFyXLAAhIRXZ_n5_OJqXdJ1ZCehmppskKohG5JN1gYN1SnW9U20z79loemfhxlKL", name: "Трековые диски 2" },
    ]
  ]
};

const DETAILS_DATA: Record<string, { id: string, src: string, name: string }[][]> = {
  "BMW": [
    [
      { id: "bs3", src: "/interior/bmw/seat3.png", name: "Белая кожа M-Sport" },
      { id: "bs2", src: "/interior/bmw/seat2.png", name: "Серая кожа M-Sport" },
      { id: "bs1", src: "/interior/bmw/seat1.png", name: "Черная кожа M-Sport" },
    ],
    [
      { id: "bs5", src: "/interior/bmw/seat5.png", name: "Красная кожа M-Sport" },
      { id: "bs4", src: "/interior/bmw/seat4.png", name: "Оранжевая кожа M-Sport" },
      { id: "bs6", src: "/interior/bmw/seat6.png", name: "Желтая кожа M-Sport" },
    ],
    [
      { id: "bs7", src: "/interior/bmw/seat7.png", name: "Зеленая кожа M-Sport" },
      { id: "bs8", src: "/interior/bmw/seat8.png", name: "Салатовая кожа M-Sport" },
      { id: "bs9", src: "/interior/bmw/seat9.png", name: "Голубая кожа M-Sport" },
    ],
    [
      { id: "bs10", src: "/interior/bmw/seat10.png", name: "Синяя кожа M-Sport" },
      { id: "bs11", src: "/interior/bmw/seat11.jpg", name: "Розовая кожа M-Sport" },
      { id: "bs12", src: "/interior/bmw/seat12.jpg", name: "Фиолетовая кожа M-Sport" },
    ]
  ],
  "DEFAULT": [
    [
      { id: "d1", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY7Que1CPCym3TYNBbSrYzcFrjkASzygGqLTBYSLmTsOuou4ZHf2Zj03Q4NLNUuo4ki6FIzi-o_1jBGj2S8EPkWIB4RcRL5745Q2xedd4_TeSCrjyxJ6ee-tXbDBpTpXUP0AmVrG4Q-KW2wcpocnTpVqkeguBKsddopjaWqocykoDVPZtpf71MdZ-zyKwLDzN54GhHoujTzAD9jjEHhBJpXQvglkPyNN3105Xr1ZZGxof1a4rJWi1dO00PPl4XbgznwXVAqXCW4-Uy", name: "Фары затемненные" },
      { id: "d2", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXonsYLkYulwi-5jO5gAoLPX3A9LggEwM7GiylK1MTkOlfkDGvMQVnPyIXn3u7vlCajN7Y2UXnsInFNDseqVnXy0jfVmb_ZFqhp_Y-HbL8lKoGK0TF6Tw-JrlzVp3VS3B8SgUGX4VrB14PC65kEcLu56Ap2fD9ym6LHFcfv-m7AWWL2mq2rmU3UpOKnzi2bHvwgYk4SZz-TGoRnS_xYE2UVSPGhpR_2031OMXhSvECXDd-WLnnDl1Fhscv9YRBOJiXrFqc37nK1bj6", name: "Красная кожа" },
      { id: "d3", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAoZ5fhEvyhLO8JHI4X1Rs7DPwqPLxK8NfTMIfym9j999OSTyD3KCQz_l8Tqb_e2Pk5KKM5VWzCtzsoLJtkLgVuOzA-37R4tETI6b7w5g2k0c1vH8xjr8XX4-HDsFNGDEH4gzkWRVSFb-lV7_8kyZ4DxJuQ-ZwNkzSUIrAEDf59WHjVs405AkpNx-0oNJc8hptAuhWtOPbxZ0JHBe-OGFGT0rdoddTHL-ZxsjcdQKBinWm-bgQJrDhcPz4CrO2bV5bYCYUV4f4RXYP", name: "Карбон" },
    ],
    [
      { id: "d4", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAY7Que1CPCym3TYNBbSrYzcFrjkASzygGqLTBYSLmTsOuou4ZHf2Zj03Q4NLNUuo4ki6FIzi-o_1jBGj2S8EPkWIB4RcRL5745Q2xedd4_TeSCrjyxJ6ee-tXbDBpTpXUP0AmVrG4Q-KW2wcpocnTpVqkeguBKsddopjaWqocykoDVPZtpf71MdZ-zyKwLDzN54GhHoujTzAD9jjEHhBJpXQvglkPyNN3105Xr1ZZGxof1a4rJWi1dO00PPl4XbgznwXVAqXCW4-Uy", name: "Фары светлые" },
      { id: "d5", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXonsYLkYulwi-5jO5gAoLPX3A9LggEwM7GiylK1MTkOlfkDGvMQVnPyIXn3u7vlCajN7Y2UXnsInFNDseqVnXy0jfVmb_ZFqhp_Y-HbL8lKoGK0TF6Tw-JrlzVp3VS3B8SgUGX4VrB14PC65kEcLu56Ap2fD9ym6LHFcfv-m7AWWL2mq2rmU3UpOKnzi2bHvwgYk4SZz-TGoRnS_xYE2UVSPGhpR_2031OMXhSvECXDd-WLnnDl1Fhscv9YRBOJiXrFqc37nK1bj6", name: "Черная кожа" },
      { id: "d6", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAoZ5fhEvyhLO8JHI4X1Rs7DPwqPLxK8NfTMIfym9j999OSTyD3KCQz_l8Tqb_e2Pk5KKM5VWzCtzsoLJtkLgVuOzA-37R4tETI6b7w5g2k0c1vH8xjr8XX4-HDsFNGDEH4gzkWRVSFb-lV7_8kyZ4DxJuQ-ZwNkzSUIrAEDf59WHjVs405AkpNx-0oNJc8hptAuhWtOPbxZ0JHBe-OGFGT0rdoddTHL-ZxsjcdQKBinWm-bgQJrDhcPz4CrO2bV5bYCYUV4f4RXYP", name: "Алькантара" },
    ]
  ]
};


const sectionSettings = {
  header: {
    offsetTop: "5rem", // Adjust vertical position
    color: "#0145f2",   // Brand blue
    fontSize: "text-3xl md:text-5xl"
  },
  price: {
    value: "25 250 780 ₽",
    offsetTop: "6rem",
    offsetRight: "-0.5rem",
    color: "#1a1a1a",
    fontSize: "text-2xl md:text-3xl"
  }
};

export function ConfiguratorSection() {
  const [colorPage, setColorPage] = useState(0);
  const [colorDirection, setColorDirection] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const [wheelPage, setWheelPage] = useState(0);
  const [wheelDirection, setWheelDirection] = useState(1);
  const [selectedWheel, setSelectedWheel] = useState<string | null>(null);

  const [detailPage, setDetailPage] = useState(0);
  const [detailDirection, setDetailDirection] = useState(1);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  const [selectedBrand, setSelectedBrand] = useState<string>("BMW");
  const [selectedModel, setSelectedModel] = useState<string>("M5");

  const [isInteriorView, setIsInteriorView] = useState<boolean>(false);
  const [selectedCoating, setSelectedCoating] = useState<string>("GLOSSY");

  useEffect(() => {
    setWheelPage(0);
    setSelectedWheel(null);
    setDetailPage(0);
    setSelectedDetail(null);
    setIsInteriorView(false);
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedDetail && selectedDetail.startsWith("bs")) {
      setIsInteriorView(true);
    }
  }, [selectedDetail]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const currentWheelsPages = WHEELS_DATA[selectedBrand] || WHEELS_DATA["DEFAULT"];

  const currentDetailsPages = DETAILS_DATA[selectedBrand] || DETAILS_DATA["DEFAULT"];

  const activeColorName = selectedColor
    ? COLORS_PAGES.flat().find(c => c.id === selectedColor)?.name
    : "Не выбрано";

  const activeWheelName = selectedWheel
    ? currentWheelsPages.flat().find(w => w.id === selectedWheel)?.name
    : "Не выбрано";

  const activeDetailName = selectedDetail
    ? currentDetailsPages.flat().find(d => d.id === selectedDetail)?.name
    : "Не выбрано";

  return (
    <section id="configurator" className="relative flex flex-col w-full h-full min-h-screen mx-auto px-4 sm:px-6 lg:px-8 justify-between pt-12 pb-2 overflow-hidden">
      {/* 3D Car Model Canvas */}
      <ConfiguratorCanvas
        brand={selectedBrand}
        model={selectedModel}
        color={selectedColor}
        wheel={selectedWheel}
        detail={selectedDetail}
        isInteriorView={isInteriorView}
        coating={selectedCoating}
      />

      {/* Close Interior View Button */}
      <AnimatePresence>
        {isInteriorView && (
          <button
            onClick={() => setIsInteriorView(false)}
            className="absolute top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#ffffff] px-6 py-3 rounded-full border border-black/5 shadow-2xl hover:bg-slate-50 transition-colors group"
          >
            <MaterialIcon name="close" className="text-xl text-slate-800" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-800">
              Выйти из салона
            </span>
          </button>
        )}
      </AnimatePresence>

      {/* Background Arc for Models (Larger) */}
      <ModelArcMenu
        brand={selectedBrand}
        onSelect={(model) => setSelectedModel(model)}
      />

      {/* Foreground Arc for Brands (Smaller) */}
      <ArcMenu onSelect={(brand) => setSelectedBrand(brand)} />

      {/* NEW: Right Arc Menu for Coating */}
      <CoatingArcMenu onSelect={(coating) => setSelectedCoating(coating)} />

      {/* Top right price */}
      <div
        className="absolute z-10 pointer-events-none pr-4 md:pr-10"
        style={{
          top: sectionSettings.price.offsetTop,
          right: sectionSettings.price.offsetRight
        }}
      >
        <div className="text-right pointer-events-auto">
          <h2 className={cn("font-bold", sectionSettings.price.fontSize)}
            style={{ color: sectionSettings.price.color }}>
            {sectionSettings.price.value}
          </h2>
        </div>
      </div>

      <div className="flex-grow"></div>

      {/* Section Title */}
      <div
        className="absolute left-0 w-full flex justify-center z-10 pointer-events-none px-4"
        style={{ top: sectionSettings.header.offsetTop }}
      >
        <h2 className={cn(
          "font-black font-unbounded tracking-tighter uppercase text-center opacity-100",
          sectionSettings.header.fontSize
        )}
          style={{ color: sectionSettings.header.color }}
        >
          СОБЕРИТЕ СВОЁ АВТО
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-7xl mx-auto px-0 md:px-12 mt-auto mb-1">
        {/* Colors Panel */}
        <div className="liquid-glass flex flex-col items-center p-6">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-black uppercase mb-6 relative z-10">
            ЦВЕТ
          </h3>
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => {
                setColorDirection(-1);
                setColorPage(p => Math.max(0, p - 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", colorPage === 0 && "opacity-0 cursor-default")}
            >
              <MaterialIcon name="chevron_left" className="text-lg" />
            </button>
            <div className="relative w-64 h-14 flex justify-center !overflow-visible">
              <AnimatePresence initial={false} custom={colorDirection} mode="wait">
                <motion.div
                  key={colorPage}
                  custom={colorDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.1 } }}
                  className="absolute flex gap-8 items-center justify-center w-full"
                >
                  {COLORS_PAGES[colorPage].map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={cn(
                        "group relative w-14 h-14 rounded-full shadow-sm transition-transform hover:scale-110 focus:outline-none flex-shrink-0",
                        color.bg,
                        selectedColor === color.id && "ring-2 ring-primary ring-offset-2 ring-offset-white"
                      )}
                    >
                      <span className="absolute inset-0 rounded-full border border-black/10"></span>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={() => {
                setColorDirection(1);
                setColorPage(p => Math.min(COLORS_PAGES.length - 1, p + 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", colorPage === COLORS_PAGES.length - 1 && "opacity-0 cursor-default")}
            >
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </div>
          <p className="text-sm font-medium text-slate-900 mt-4 h-5">
            {activeColorName}
          </p>
        </div>

        {/* Wheels Panel */}
        <div className="liquid-glass flex flex-col items-center p-6">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-black uppercase mb-6 relative z-10">
            ДИСКИ
          </h3>
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => {
                setWheelDirection(-1);
                setWheelPage(p => Math.max(0, p - 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", wheelPage === 0 && "opacity-0 cursor-default")}
            >
              <MaterialIcon name="chevron_left" className="text-lg" />
            </button>
            <div className="relative w-64 h-14 flex justify-center !overflow-visible">
              <AnimatePresence initial={false} custom={wheelDirection} mode="wait">
                <motion.div
                  key={`${selectedBrand}-${wheelPage}`}
                  custom={wheelDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.1 } }}
                  className="absolute flex gap-8 items-center justify-center w-full h-full"
                >
                  {currentWheelsPages[wheelPage].map((wheel) => (
                    <div
                      key={wheel.id}
                      onClick={() => setSelectedWheel(wheel.id)}
                      className={cn(
                        "relative w-14 h-14 rounded-full cursor-pointer transition-transform hover:scale-110 flex-shrink-0 flex items-center justify-center transform-gpu will-change-transform",
                        selectedWheel === wheel.id ? "ring-2 ring-primary ring-offset-2 ring-offset-white bg-white shadow-sm" : "hover:bg-black/5"
                      )}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center pointer-events-none">
                        <img
                          src={wheel.src}
                          alt={wheel.name}
                          className={cn("w-full h-full object-cover transition-opacity opacity-100 transform-gpu")}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={() => {
                setWheelDirection(1);
                setWheelPage(p => Math.min(currentWheelsPages.length - 1, p + 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", wheelPage === currentWheelsPages.length - 1 && "opacity-0 cursor-default")}
            >
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </div>
          <p className="text-sm font-medium text-slate-900 mt-4 h-5">
            {activeWheelName}
          </p>
        </div>

        {/* Details Panel */}
        <div className="liquid-glass flex flex-col items-center p-6">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-black uppercase mb-6 relative z-10">
            САЛОН
          </h3>
          <div className="w-full flex items-center justify-between">
            <button
              onClick={() => {
                setDetailDirection(-1);
                setDetailPage(p => Math.max(0, p - 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", detailPage === 0 && "opacity-0 cursor-default")}
            >
              <MaterialIcon name="chevron_left" className="text-lg" />
            </button>
            <div className="relative w-64 h-14 flex justify-center !overflow-visible">
              <AnimatePresence initial={false} custom={detailDirection} mode="wait">
                <motion.div
                  key={detailPage}
                  custom={detailDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.1 } }}
                  className="absolute flex gap-8 items-center justify-center w-full h-full"
                >
                  {currentDetailsPages[detailPage].map((detail) => (
                    <div
                      key={detail.id}
                      onClick={() => setSelectedDetail(detail.id)}
                      className={cn(
                        "relative w-14 h-14 rounded-full cursor-pointer transition-transform hover:scale-110 flex-shrink-0 flex items-center justify-center overflow-hidden",
                        selectedDetail === detail.id ? "ring-2 ring-primary ring-offset-2 ring-offset-white bg-white shadow-xl" : "bg-white/10 hover:bg-white/20"
                      )}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={detail.src}
                          alt={detail.name}
                          className={cn("w-full h-full object-cover transition-opacity opacity-100 transform-gpu")}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={() => {
                setDetailDirection(1);
                setDetailPage(p => Math.min(currentDetailsPages.length - 1, p + 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", detailPage === currentDetailsPages.length - 1 && "opacity-0 cursor-default")}
            >
              <MaterialIcon name="chevron_right" className="text-lg" />
            </button>
          </div>
          <p className="text-sm font-medium text-slate-900 mt-4 h-5">
            {activeDetailName}
          </p>
        </div>
      </div>
    </section>
  );
}
