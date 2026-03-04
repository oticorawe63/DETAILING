"use client";

import { MaterialIcon } from "@/components/MaterialIcon";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArcMenu } from "@/components/ArcMenu";

const COLORS_PAGES = [
  [
    { id: "white", bg: "bg-slate-100", name: "Белый" },
    { id: "gray", bg: "bg-slate-400", name: "Серый" },
    { id: "black", bg: "bg-slate-950", name: "Черный" },
  ],
  [
    { id: "red", bg: "bg-red-600", name: "Красный" },
    { id: "emerald", bg: "bg-emerald-500", name: "Изумрудный" },
    { id: "blue", bg: "bg-blue-600", name: "Синий" },
  ],
  [
    { id: "yellow", bg: "bg-yellow-400", name: "Желтый" },
    { id: "lime", bg: "bg-lime-400", name: "Салатовый" },
    { id: "lightblue", bg: "bg-sky-400", name: "Голубой" },
  ],
  [
    { id: "pink", bg: "bg-pink-500", name: "Розовый" },
    { id: "orange", bg: "bg-orange-500", name: "Оранжевый" },
    { id: "purple", bg: "bg-purple-600", name: "Фиолетовый" },
  ],
];

const WHEELS_PAGES = [
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
];

const DETAILS_PAGES = [
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
];


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

  const activeColorName = selectedColor
    ? COLORS_PAGES.flat().find(c => c.id === selectedColor)?.name
    : "Не выбрано";

  const activeWheelName = selectedWheel
    ? WHEELS_PAGES.flat().find(w => w.id === selectedWheel)?.name
    : "Не выбрано";

  const activeDetailName = selectedDetail
    ? DETAILS_PAGES.flat().find(d => d.id === selectedDetail)?.name
    : "Не выбрано";

  return (
    <section id="configurator" className="relative flex flex-col w-full h-full min-h-screen mx-auto px-4 sm:px-6 lg:px-8 justify-between py-12 overflow-hidden bg-background-light">
      {/* Decorative Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square car-platform rounded-full -z-10" />

      <ArcMenu onSelect={(brand) => console.log("Selected brand:", brand)} />

      {/* Top right price */}
      <div className="w-full flex items-start z-10 justify-end max-w-7xl mx-auto absolute top-16 right-8 md:right-20 pointer-events-none">
        <div className="text-right pointer-events-auto">
          <h2 className="text-2xl md:text-3xl font-light text-slate-900">
            25 250 780 ₽
          </h2>
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-7xl mx-auto px-0 md:px-12 mt-auto mb-4">
        {/* Colors Panel */}
        <div className="liquid-glass flex flex-col items-center p-6">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6 relative z-10">
            Цвета
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
            <div className="relative w-48 h-12 flex justify-center !overflow-visible">
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
                        "group relative w-12 h-12 rounded-full shadow-sm transition-transform hover:scale-110 focus:outline-none flex-shrink-0",
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
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6 relative z-10">
            Диски
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
            <div className="relative w-[264px] h-14 flex justify-center !overflow-visible">
              <AnimatePresence initial={false} custom={wheelDirection} mode="wait">
                <motion.div
                  key={wheelPage}
                  custom={wheelDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.1 } }}
                  className="absolute flex gap-8 items-center justify-center w-full h-full"
                >
                  {WHEELS_PAGES[wheelPage].map((wheel) => (
                    <div
                      key={wheel.id}
                      onClick={() => setSelectedWheel(wheel.id)}
                      className={cn(
                        "w-14 h-14 rounded-full cursor-pointer transition-all flex items-center justify-center overflow-hidden flex-shrink-0",
                        selectedWheel === wheel.id ? "bg-white shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-white" : "p-1 hover:bg-black/5"
                      )}
                    >
                      <img
                        src={wheel.src}
                        alt={wheel.name}
                        className={cn("w-full h-full object-contain transition-opacity", selectedWheel !== wheel.id && "opacity-40 hover:opacity-100")}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={() => {
                setWheelDirection(1);
                setWheelPage(p => Math.min(WHEELS_PAGES.length - 1, p + 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", wheelPage === WHEELS_PAGES.length - 1 && "opacity-0 cursor-default")}
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
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-6 relative z-10">
            Детали
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
            <div className="relative w-[264px] h-14 flex justify-center !overflow-visible">
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
                  {DETAILS_PAGES[detailPage].map((detail) => (
                    <div
                      key={detail.id}
                      onClick={() => setSelectedDetail(detail.id)}
                      className={cn(
                        "w-14 h-14 rounded-full overflow-hidden cursor-pointer transition-all hover:scale-105 flex-shrink-0",
                        selectedDetail === detail.id ? "shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-white" : "opacity-50 hover:opacity-100"
                      )}
                    >
                      <img
                        src={detail.src}
                        alt={detail.name}
                        className={cn("w-full h-full object-cover", selectedDetail !== detail.id && "grayscale")}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={() => {
                setDetailDirection(1);
                setDetailPage(p => Math.min(DETAILS_PAGES.length - 1, p + 1));
              }}
              className={cn("w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors z-10", detailPage === DETAILS_PAGES.length - 1 && "opacity-0 cursor-default")}
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
