"use client";

import { MaterialIcon } from "@/components/MaterialIcon";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// 1. КОНСТАНТЫ ДЛЯ СТРОК
const PPF_TITLE = "ОКЛЕЙКА АНТИГРАВИЙНОЙ ПЛЕНКОЙ";
const POLY_TITLE = "ОКЛЕЙКА ПОЛИУРЕТАНОВОЙ ПЛЕНКОЙ";
const VINYL_TITLE = "ОКЛЕЙКА ВИНИЛОВОЙ ПЛЕНКОЙ";
const INTERIOR_TITLE = "ОКЛЕЙКА ДЕКОРАТИВНЫХ ЭЛЕМЕНТОВ САЛОНА";
const GLASS_PROT_TITLE = "ОКЛЕЙКА СТЁКОЛ ЗАЩИТНОЙ ПЛЕНКОЙ";
const HEADLIGHTS_TITLE = "ОКЛЕЙКА ФАР ПЛЕНКОЙ";
const TINTING_TITLE = "ТОНИРОВАНИЕ СТЁКОЛ";
const ATERMAL_TITLE = "АТЕРМАЛЬНАЯ ТОНИРОВКА";
const RESTORATION_POLISH_TITLE = "ВОССТАНОВИТЕЛЬНАЯ ПОЛИРОВКА";
const SOFT_POLISH_TITLE = "МЯГКАЯ ПОЛИРОВКА";
const LOCAL_POLISH_TITLE = "ЛОКАЛЬНАЯ ПОЛИРОВКА КУЗОВА";
const POLISH_COMBO_TITLE = "ПОЛИРОВКА ДВЕРИ, БАМПЕРА, ДИСКОВ";
const RISK_ZONES_TITLE = "ОКЛЕЙКА ЗОН РИСКА";
const INTERIOR_POLISH_TITLE = "ПОЛИРОВКА ГЛЯНЦЕВЫХ ЭЛЕМЕНТОВ САЛОНА";
const GLASS_HEADLIGHTS_POLISH_TITLE = "ПОЛИРОВКА СТЁКОЛ, ФАР";
const COMBO_CLEANING_TITLE = "КОМПЛЕКСНАЯ ХИМЧИСТКА";
const TEXTILE_CLEANING_TITLE = "ХИМЧИСТКА ТЕКСТИЛЬНОГО САЛОНА";
const LOCAL_CLEANING_TITLE = "ОЗОНИРОВАНИЕ И ЛОКАЛЬНАЯ ХИМЧИСТКА";
const CERAMIC_TITLE = "КЕРАМИЧЕСКОЕ ПОКРЫТИЕ";
const INTERIOR_CERAMIC_TITLE = "КЕРАМИЧЕСКОЕ ПОКРЫТИЕ САЛОНА";
const ANTIRAIN_TITLE = "АНТИДОЖДЬ";
const WHEELS_CERAMIC_TITLE = "КЕРАМИЧЕСКОЕ ПОКРЫТИЕ ДИСКОВ";
const PAINTING_TITLE = "ПОКРАСКА";
const LOCAL_PAINT_TITLE = "ЛОКАЛЬНЫЙ ОКРАС";
const ARMATURE_TITLE = "АРМАТУРНЫЕ РАБОТЫ";
const ANTICHROME_TITLE = "АНТИХРОМ";

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
    { id: "ppf", title: "ОКЛЕЙКА ПЛЕНКОЙ", icon: "layers", items: [{ title: "КУЗОВ", items: [PPF_TITLE, "ОКЛЕЙКА ЗОН РИСКА", "ОКЛЕЙКА ПОЛИУРЕТАНОВОЙ ПЛЕНКОЙ", "ОКЛЕЙКА ВИНИЛОВОЙ ПЛЕНКОЙ"] }, { title: "САЛОН", items: ["ОКЛЕЙКА ДЕКОРАТИВНЫХ ЭЛЕМЕНТОВ САЛОНА"] }, { title: "СТЁКЛА", items: ["ОКЛЕЙКА СТЁКОЛ ЗАЩИТНОЙ ПЛЕНКОЙ", "ОКЛЕЙКА ФАР ПЛЕНКОЙ", "ТОНИРОВАНИЕ СТЁКОЛ", "АТЕРМАЛЬНАЯ ТОНИРОВКА"] }] },
    { id: "polish", title: "ПОЛИРОВКА", icon: "auto_fix_high", items: [{ title: "КУЗОВ", items: ["ВОССТАНОВИТЕЛЬНАЯ ПОЛИРОВКА", "МЯГКАЯ ПОЛИРОВКА", "ЛОКАЛЬНАЯ ПОЛИРОВКА КУЗОВА", POLISH_COMBO_TITLE] }, { title: "САЛОН", items: [INTERIOR_POLISH_TITLE] }, { title: "СТЁКЛА", items: [GLASS_HEADLIGHTS_POLISH_TITLE] }] },
    { id: "cleaning", title: "ХИМЧИСТКА", icon: "cleaning_services", items: [COMBO_CLEANING_TITLE, TEXTILE_CLEANING_TITLE, LOCAL_CLEANING_TITLE] },
    { id: "care", title: "УХОД", icon: "sanitizer", items: ["УХОД ЗА ПОДКАПОТНЫМ ПРОСТРАНСТВОМ", "ГЛУБОКАЯ ОЧИСТКА РАДИАТОРА", "УХОД ЗА КРЫШЕЙ КАБРИОЛЕТА"] },
    { id: "protection", title: "ЗАЩИТНЫЕ ПОКРЫТИЯ", icon: "verified", items: [{ title: "КУЗОВ", items: [CERAMIC_TITLE] }, { title: "САЛОН", items: [INTERIOR_CERAMIC_TITLE] }, { title: "СТЁКЛА", items: [ANTIRAIN_TITLE] }, { title: "ДИСКИ", items: [WHEELS_CERAMIC_TITLE] }] },
    { id: "paint_arm", title: "МАЛЯРНЫЕ И АРМАТУРНЫЕ РАБОТЫ", icon: "format_paint", items: [PAINTING_TITLE, LOCAL_PAINT_TITLE, ARMATURE_TITLE, ANTICHROME_TITLE, "ОКРАС ДИСКОВ И СУППОРТОВ", "УДАЛЕНИЕ ВМЯТИН", "РЕМОНТ СКОЛОВ НА СТЕКЛЕ"] },
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

  RISK_ZONES_GROUPS: [
    {
      title: "ЗАЩИТНЫЕ КОМПЛЕКСЫ", items: [
        "Зона риска \"Стандарт\"",
        "Зоны риска \"Премиум\"",
        "Демонтаж плёнки \"Зоны Риска\""
      ]
    },
    {
      title: "ТОНИРОВАНИЕ И РАБОТЫ", items: [
        "Задняя полусфера (доплата за универсалы 10%)",
        "Лобовое стекло",
        "Растонирование два боковых стекла",
        "Растонирование заднее или лобовое стекло"
      ]
    },
    {
      title: "АРМАТУРНЫЕ РАБОТЫ", items: [
        "Демонтаж дополнительных стоп-сигналов",
        "Демонтаж датчика дождя и установка",
        "Снятие дверных карт"
      ]
    }
  ],

  VINYL_GROUPS: [
    { title: "ЗАЩИТНЫЕ КОМПЛЕКСЫ", items: ["Полная оклейка", "Полная оклейка с проемами", "Демонтаж плёнки без проемов", "Демонтаж плёнки с проемов"] },
    { title: "КУЗОВНЫЕ ЭЛЕМЕНТЫ", items: ["Бампер передний/задний", "Капот", "Крыло переднее", "Крыло заднее", "Дверь", "Проем внутренний"] },
    { title: "ДЕТАЛИ И ПОРОГИ", items: ["Крышка багажника", "Крыша", "Порог наружный", "Порог внутренний", "Спойлер", "Расширитель арки", "Зеркало заднего вида"] }
  ],

  INTERIOR_GROUPS: [
    { title: "ТЕКСТУРИРОВАННАЯ ПЛЕНКА", items: ["Оклейка декоративных элементов текстурированной пленкой"] },
    { title: "ЗАЩИТНАЯ ПЛЕНКА", items: ["Оклейка декоративных элементов и мониторов защитной пленкой"] }
  ],

  GLASS_PROT_GROUPS: [
    { title: "ОСНОВНЫЕ УСЛУГИ", items: ["Лобовое стекло (бронирование)"] },
    { title: "ДЕМОНТАЖ", items: ["Демонтаж пленки с лобового стекла"] },
    { title: "ДОПОЛНИТЕЛЬНО", items: ["Арматурные работы"] }
  ],

  HEADLIGHTS_GROUPS: [
    { title: "SPECTROLL PREMIUM", items: ["Фары головной оптики (Spectroll)", "Противотуманные фары (Spectroll)"] },
    { title: "STEK DYNO / PRIME SHIELD", items: ["Фары головной оптики (Stek)", "Противотуманные фары (Stek)"] }
  ],

  TINTING_GROUPS: [
    { title: "ТОНИРОВАНИЕ", items: ["Задняя полусфера (доплата за универсалы 10%)", "Лобовое стекло"] },
    { title: "РАСТОНИРОВАНИЕ", items: ["Растонирование два боковых стекла", "Растонирование заднее или лобовое стекло"] },
    { title: "ДОП. РАБОТЫ", items: ["Демонтаж дополнительных стоп-сигналов", "Демонтаж датчика дождя и установка", "Снятие дверных карт"] }
  ],

  ATERMAL_GROUPS: [
    { title: "ЗАДНЯЯ ПОЛУСФЕРА", items: ["Атермальная пленка X-PEL, задняя полусфера (доплата 10%)"] },
    { title: "БОКОВЫЕ СТЁКЛА", items: ["Атермальная пленка X-PEL, два боковых стекла"] },
    { title: "ЛОБОВОЕ СТЕКЛО", items: ["Атермальная пленка X-PEL, лобовое стекло"] }
  ],

  RESTORATION_POLISH_GROUPS: [
    { title: "ОСНОВНЫЕ РАБОТЫ", items: ["Подготовка кузова к полировке", "Полная абразивная полировка"] },
    { title: "ДОПОЛНИТЕЛЬНО", items: ["Локальная полировка одного элемента", "Арматурные работы под полировку"] }
  ],

  SOFT_POLISH_GROUPS: [
    { title: "ОСНОВНЫЕ РАБОТЫ", items: ["Подготовка кузова к полировке", "Мягкая полировка кузова"] },
    { title: "ДОПОЛНИТЕЛЬНО", items: ["Локальная полировка одного элемента", "Арматурные работы под полировку"] }
  ],

  LOCAL_POLISH_GROUPS: [
    { title: "ЛОКАЛЬНАЯ ПОЛИРОВКА", items: ["Локальная полировка одного элемента"] },
    { title: "ПОРОГИ", items: ["Полировка порогов автомобиля"] },
    { title: "ДОПОЛНИТЕЛЬНО", items: ["Арматурные работы под полировку"] }
  ],
  POLISH_COMBO_GROUPS: [
    { title: "ЛОКАЛЬНАЯ ПОЛИРОВКА", items: ["Локальная полировка одного элемента"] },
    { title: "ДОПОЛНИТЕЛЬНО", items: ["Арматурные работы под полировку"] }
  ],
  INTERIOR_POLISH_GROUPS: [
    { title: "ЛАКИРОВАННЫЕ ВСТАВКИ", items: ["Полировка лакированных вставок в салоне автомобиля (1 деталь)"] },
    { title: "УДАЛЕНИЕ ПОВРЕЖДЕНИЙ", items: ["Полировка повреждений от непрофессионального удаления наклеек, битума и т.п."] }
  ],
  GLASS_HEADLIGHTS_POLISH_GROUPS: [
    { title: "СТЁКЛА", items: ["Полировка лобовое или заднее стекло", "Полировка боковое стекло"] },
    { title: "ФАРЫ", items: ["Полировка фар", "Восстановление оптики автомобиля (1 шт.)"] }
  ],
  COMBO_CLEANING_GROUPS: [
    { title: "КОМПЛЕКСЫ", items: ["Комплексная химчистка салона и багажника", "Комплексная химчистка салона и багажника (с разбором салона)", "Химчистка 1 кресла", "Химчистка 2 ряда кресел"] },
    { title: "ДЕТАЛИ", items: ["Потолок, включая солнцезащитные козырьки, стойки", "Ковровое покрытие салона", "Багажние отделение", "Дверная обшивка", "Подлокотник"] },
    { title: "УХОД И ДОП", items: ["Чистка всех кожаных элементов салона (LeTech)", "Обработка всех кожаных элементов салонов составами (LeTech)", "Химчистка руля (Letech)", "Озонация салона автомобиля", "Арматурные работы под химчистку"] }
  ],
  TEXTILE_CLEANING_GROUPS: [
    { title: "КОМПЛЕКСЫ", items: ["Комплексная химчистка салона и багажника", "Комплексная химчистка салона и багажника (с разбором салона)", "Химчистка 1 кресла", "Химчистка 2 ряда кресел"] },
    { title: "ДЕТАЛИ", items: ["Потолок, включая солнцезащитные козырьки, стойки", "Ковровое покрытие салона", "Багажние отделение", "Дверная обшивка", "Подлокотник"] },
    { title: "УХОД И ДОП", items: ["Чистка элементов салона (LeTech)", "Обработка элементов салонов составами (LeTech)", "Химчистка руля (Letech) ", "Озонация салона автомобиля", "Арматурные работы под химчистку"] }
  ],
  LOCAL_CLEANING_GROUPS: [
    { title: "СИДЕНЬЯ", items: ["Химчистка 1 кресла", "Химчистка 2 ряда кресел", "Арматурные работы под химчистку"] },
    { title: "БАГАЖНИК И ОЗОН", items: ["Химчистка багажного отделения", "Озонация салона автомобиля"] },
    { title: "КОЖА", items: ["Чистка всех кожаных элементов салона (LeTech)", "Обработка всех кожаных элементов салонов составами (LeTech)"] }
  ],
  CERAMIC_GROUPS: [
    {
      title: "КЕРАМИЧЕСКИЕ СОСТАВЫ", items: [
        "QuartzMaster SKY (блеск 12 мес, гидрофоб 8 мес)",
        "QuartzMaster Light (блеск 14 мес, гидрофоб 12 мес)",
        "Керамика Премиум для ПЛЁНОК (блеск 12 мес)",
        "Керамика Премиум (блеск 18 мес, гидрофоб 14 мес) 3 слоя"
      ]
    }
  ],
  INTERIOR_CERAMIC_GROUPS: [
    {
      title: "ЗАЩИТА КОЖИ", items: [
        "Комплекс (все кожаные элементы салона)",
        "2 сидения+подлокотник",
        "Обработка всех кожаных элементов салонов составами (LeTech)"
      ]
    }
  ],
  ANTIRAIN_GROUPS: [
    { title: "ПОКРЫТИЯ СТЁКОЛ", items: ["Передняя Полусфера", "Все стекла", "Панорама"] }
  ],
  WHEELS_CERAMIC_GROUPS: [
    { title: "УХОД ЗА ДИСКАМИ", items: ["Глубокая очистка дисков (4 шт.)", "Керамический защитный состав для дисков (1 слой)", "Керамический защитный состав для дисков (2 слоя)"] }
  ],
  PAINTING_GROUPS: [
    { title: "ОСНОВНОЕ", items: ["Бампер передний окрас", "Бампер задний окрас", "Дверь окрас"] },
    { title: "КУЗОВ", items: ["Переднее крыло окрас", "Заднее крыло окрас", "Капот окрас"] },
    { title: "ДЕТАЛИ И РЕМОНТ", items: ["Крыша окрас", "Порог окрас", "Окрас зеркала заднего вида", "Ремонт деталей (расчет индивидуальный)"] }
  ],
  ARMATURE_GROUPS: [
    {
      title: "ПОД ОКЛЕЙКУ И ПОКРАСКУ", items: [
        "Полный разбор/сборка под оклейку",
        "Полный разбор под оклейку с проемами",
        "Разбор под полную оклейку без бамперов",
        "Разбор под оклейку зоны риска \"Стандарт\"",
        "Полный разбор/сборка под окраску",
        "Разбор/сбор под полировку (ручки, шильдики и т.д.)"
      ]
    },
    {
      title: "ДЕТАЛИ КУЗОВА", items: [
        "Бампер (снятие/установка)",
        "Бампер (разбор/сбор)",
        "Бампер с элементами спортивного обвеса",
        "Решетка радиатора со снятием бампера",
        "Дверь (1 шт.) под оклейку",
        "Дверь багажника под оклейку",
        "Капот (снятие/установка, разбор/сбор)",
        "Крыло переднее (снятие/установка)",
        "Зеркало (разбор)"
      ]
    },
    {
      title: "САЛОН И АГРЕГАТЫ", items: [
        "Снятие/установка торпедо",
        "Снятие/установка сидений (все)",
        "Снятие/установка ремней безопасности (1 шт.)",
        "Разбор/сборка для снятия пола",
        "Снятие/установка потолка и стоек",
        "Снятие/установка руля",
        "Снятие/установка AirBag",
        "Разбор/сбор подвески",
        "Снятие/установка колёс"
      ]
    }
  ],
  LOCAL_PAINT_GROUPS: [
    { title: "ОСНОВНОЕ", items: ["Бампер передний окрас", "Бампер задний окрас", "Дверь окрас"] },
    { title: "КУЗОВ", items: ["Переднее крыло окрас", "Заднее крыло окрас", "Капот окрас"] },
    { title: "ДЕТАЛИ И РЕМОНТ", items: ["Крыша окрас", "Порог окрас", "Окрас зеркала заднего вида", "Ремонт деталей (расчет индивидуальный)"] }
  ],
  ANTICHROME_GROUPS: [
    { title: "КОМПЛЕКС", items: ["Пакет \"Антихром\""] },
    { title: "ЭЛЕМЕНТЫ", items: ["Молдинг оконный", "Дверная ручка", "Решётка радиатора (ноздри)", "Воздухозаборники на крыльях (жабры)", "Накладка крышки багажника", "Накладка на дверь", "Эмблема"] }
  ],

  PRICES: {
    "Полная оклейка": [438000, 475000, 490000, 549000, 665000], "Полная оклейка без крыши": [412000, 448000, 460000, 510000, 620000], "Зона риска \"Стандарт\"": [161000, 180000, 194000, 200500, 235000], "Зоны риска \"Премиум\"": [175000, 190000, 206000, 212000, 246000], "Демонтаж плёнки \"Зоны Риска\"": ["от 25 000 ₽", "от 25 000 ₽", "от 30 000 ₽", "от 35 000 ₽", "от 40 000 ₽"], "Демонтаж плёнки кузов полностью": ["от 60 000 ₽", "от 60 000 ₽", "от 65 000 ₽", "от 65 000 ₽", "от 75 000 ₽"], "Стойки лобового стекла 2 шт.": [12000, 12000, 12000, 12000, 12000], "Полоса на капот (до 50 см)": [18000, 18000, 18000, 18000, 18000], "Полоса на крышу": [12000, 12000, 12000, 12000, 12000], "Пространства под ручками (4 шт.)": [10000, 10000, 10000, 10000, 10000], "Полоса погрузочной зоны заднего бампера": [8000, 8000, 8000, 8000, 8000], "Фары головной оптики": [15000, 15000, 15000, 15000, 15000], "Противотуманные фары": [10000, 10000, 10000, 10000, 10000], "Бампер передний/задний": [37000, 38000, 46000, 51000, 59000], "Капот": [39000, 39000, 48000, 52000, 61000], "Крыло переднее": [18000, 22000, 26000, 28000, 32000], "Крыло заднее": [41000, 51000, 54000, 58000, 65000], "Дверь": [22000, 24000, 26500, 29000, 31000], "Крышка багажника": [22000, 24000, 26500, 29000, 31000], "Крыша": [36000, 36000, 49000, 53000, 60000], "Порог наружний": [18000, 19000, 21000, 23000, 26000], "Порог внутренний": [4500, 5000, 5000, 5500, 6000], "Спойлер": [2000, 14000, 16000, 16000, 20000], "Расширитель арки": [10000, 12000, 15000, 15000, 18000], "Зеркала заднего вида": [14000, 14000, 16000, 16000, 16000], "Оклейка кромки двери": [5000, 5000, 5000, 5000, 5000],
    "ШУМОИЗОЛЯЦИЯ": [138000, 144000, 160000, 185000, 210000], "ВЫДВИЖНЫЕ ПОРОГИ": ["от 285 000 ₽", "от 285 000 ₽", "от 285 000 ₽", "от 285 000 ₽", "от 285 000 ₽"], "ЗВЁЗДНОЕ НЕБО": [150000, 150000, 150000, 150000, 150000], "КОМПЛЕКСНАЯ": [32000, 36000, 43000, 48000, 51000], "ПОKРАСКА": [20000, 20000, 20000, 20000, 20000], "Пакет \"Антихром\"": ["от 80 000 ₽", "от 90 000 ₽", "от 110 000 ₽", "от 120 000 ₽", "от 140 000 ₽"],
    "Задняя полусфера (доплата за универсалы 10%)": [22000, 22000, 24000, 26000, 28000],
    "Лобовое стекло": [14000, 14000, 16000, 16000, 18000],
    "Растонирование два боковых стекла": [6000, 6000, 7000, 7000, 8000],
    "Растонирование заднее или лобовое стекло": [8000, 8000, 10000, 10000, 10000],
    "Демонтаж дополнительных стоп-сигналов": [1000, 1000, 1000, 1000, 1000],
    "Демонтаж датчика дождя и установка": [2000, 2000, 2000, 2000, 2000],
    "Снятие дверных карт": [4000, 4000, 5000, 5000, 5000],
    "Полная оклейка с проемами": [484000, 506000, 528000, 566000, 676000],
    "Демонтаж плёнки без проемов": ["от 60 000 ₽", "от 60 000 ₽", "от 65 000 ₽", "от 65 000 ₽", "от 75 000 ₽"],
    "Демонтаж плёнки с проемов (требуются дополнительные арматурные работы)": ["от 12 000 ₽", "от 14 000 ₽", "от 16 000 ₽", "от 16 000 ₽", "от 18 000 ₽"],
    "Проем внутренний": ["от 42 000 ₽", "от 42 000 ₽", "от 42 000 ₽", "от 42 000 ₽", "от 42 000 ₽"],
    "Порог наружный": [15500, 17000, 18000, 19000, 21000],
    "Оклейка декоративных элементов текстурированной пленкой": ["от 11 000 ₽", "от 11 000 ₽", "от 11 000 ₽", "от 11 000 ₽", "от 11 000 ₽"],
    "Оклейка декоративных элементов и мониторов защитной пленкой": ["от 13 000 ₽", "от 13 000 ₽", "от 13 000 ₽", "от 13 000 ₽", "от 13 000 ₽"],
    "Лобовое стекло (бронирование)": [42000, 42000, 45000, 45000, 48000],
    "Демонтаж пленки с лобового стекла": [5000, 5000, 5000, 5000, 5000],
    "Арматурные работы": [1000, 1000, 1000, 1000, 1000],
    "Фары головной оптики (Spectroll)": [15000, 15000, 15000, 15000, 15000],
    "Противотуманные фары (Spectroll)": [10000, 10000, 10000, 10000, 10000],
    "Фары головной оптики (Stek)": [18000, 18000, 18000, 18000, 18000],
    "Противотуманные фары (Stek)": [12000, 12000, 12000, 12000, 12000],
    "Атермальная пленка X-PEL, задняя полусфера (доплата 10%)": [22000, 22000, 24000, 26000, 28000],
    "Атермальная пленка X-PEL, два боковых стекла": [14000, 14000, 14000, 14000, 16000],
    "Атермальная пленка X-PEL, лобовое стекло": [16000, 18000, 18000, 18000, 22000],
    "Подготовка кузова к полировке": [5500, 6000, 6500, 6500, 7500],
    "Полная абразивная полировка": [38000, 40000, 43500, 46000, 50000],
    "Локальная полировка одного элемента": ["от 3 000 до 7 000 ₽", "от 3 000 до 7 000 ₽", "от 3 000 до 7 000 ₽", "от 3 000 до 7 000 ₽", "от 3 000 до 7 000 ₽"],
    "Арматурные работы под полировку": ["от 9 000 ₽", "от 9 000 ₽", "от 9 000 ₽", "от 9 000 ₽", "от 9 000 ₽"],
    "Мягкая полировка кузова": [28000, 30000, 33000, 38500, 40000],
    "Полировка порогов автомобиля": [6000, 6000, 7000, 7000, 9000],
    "Полировка лакированных вставок в салоне автомобиля (1 деталь)": [2600, 2600, 3800, 3800, 3800],
    "Полировка повреждений от непрофессионального удаления наклеек, битума и т.п.": [1300, 1300, 1300, 1300, 1300],
    "Полировка лобовое или заднее стекло": [18000, 18000, 21000, 24000, 24000],
    "Полировка боковое стекло": [10000, 10000, 12000, 12000, 12000],
    "Восстановление оптики автомобиля (1 шт.)": ["от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽"],
    "Полировка фар": ["от 3 000 ₽", "от 3 000 ₽", "от 3 000 ₽", "от 3 000 ₽", "от 3 000 ₽"],
    "Комплексная химчистка салона и багажника": [32000, 36000, 43000, 48000, 51000],
    "Комплексная химчистка салона и багажника (с разбором салона)": [36000, 40000, 48000, 53000, 57000],
    "Чистка всех кожаных элементов салона (LeTech)": [15000, 17000, 19000, 21000, 24000],
    "Обработка всех кожаных элементов салонов составами (LeTech)": [10000, 12000, 14000, 15000, 18000],
    "Химчистка руля (Letech)": [3000, 3000, 3000, 3000, 3000],
    "Подлокотник": [2500, 2500, 2500, 2500, 2500],
    "Потолок, включая солнцезащитные козырьки, стойки": [12000, 12000, 14000, 16000, 18000],
    "Ковровое покрытие салона": [10000, 11000, 12000, 12000, 13000],
    "Багажние отделение": ["от 3 500 ₽", "от 3 500 ₽", "от 4 500 ₽", "от 5 500 ₽", "от 6 500 ₽"],
    "Химчистка багажного отделения": ["от 3 500 ₽", "от 3 500 ₽", "от 4 500 ₽", "от 5 500 ₽", "от 6 500 ₽"],
    "Дверная обшивка": [2500, 3000, 4000, 5000, 5000],
    "Химчистка 1 кресла": [4000, 4000, 5000, 5000, 6000],
    "Химчистка 2 ряда кресел": ["от 7 000 ₽", "от 7 000 ₽", "от 8 000 ₽", "от 8 000 ₽", "от 8 000 ₽"],
    "Озонация салона автомобиля": [3000, 3000, 3000, 3000, 3000],
    "Арматурные работы под химчистку": [4000, 4000, 5000, 5000, 6000],
    "Чистка элементов салона (LeTech)": [14000, 16000, 18000, 19000, 20000],
    "Обработка элементов салонов составами (LeTech)": [8000, 10000, 11000, 13000, 15000],
    "Химчистка руля (Letech) ": [2500, 2500, 2500, 2500, 2500],
    "QuartzMaster SKY (блеск 12 мес, гидрофоб 8 мес)": [28000, 30000, 33000, 35000, 40000],
    "QuartzMaster Light (блеск 14 мес, гидрофоб 12 мес)": [42000, 44000, 46000, 48000, 52000],
    "Керамика Премиум для ПЛЁНОК (блеск 12 мес)": [28000, 28000, 33000, 33000, 33000],
    "Керамика Премиум (блеск 18 мес, гидрофоб 14 мес) 3 слоя": [59000, 61000, 64000, 66000, 72000],
    "2 сидения+подлокотник": [18000, 18000, 22000, 22000, 24000],
    "Комплекс (все кожаные элементы салона)": [28000, 32000, 36000, 36000, 42000],
    "Передняя Полусфера": [6000, 6000, 6000, 6000, 6000],
    "Все стекла": [12000, 12000, 12000, 12000, 12000],
    "Панорама": [3000, 3000, 3000, 3000, 3000],
    "Глубокая очистка дисков (4 шт.)": [8000, 8000, 8000, 8000, 8000],
    "Керамический защитный состав для дисков (1 слой)": [9900, 9900, 10900, 10900, 11900],
    "Керамический защитный состав для дисков (2 слоя)": [11900, 11900, 12900, 12900, 13900],
    "Бампер передний окрас": ["от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽"],
    "Бампер задний окрас": ["от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽"],
    "Дверь окрас": ["от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽", "от 35 000 ₽"],
    "Переднее крыло окрас": ["от 32 000 ₽", "от 32 000 ₽", "от 32 000 ₽", "от 32 000 ₽", "от 32 000 ₽"],
    "Заднее крыло окрас": ["от 54 000 ₽", "от 54 000 ₽", "от 54 000 ₽", "от 54 000 ₽", "от 54 000 ₽"],
    "Капот окрас": ["от 54 000 ₽", "от 54 000 ₽", "от 54 000 ₽", "от 54 000 ₽", "от 54 000 ₽"],
    "Крыша окрас": ["от 58 000 ₽", "от 58 000 ₽", "от 58 000 ₽", "от 58 000 ₽", "от 58 000 ₽"],
    "Порог окрас": ["от 30 000 ₽", "от 30 000 ₽", "от 30 000 ₽", "от 30 000 ₽", "от 30 000 ₽"],
    "Окрас зеркала заднего вида": ["от 16 000 ₽", "от 16 000 ₽", "от 16 000 ₽", "от 16 000 ₽", "от 16 000 ₽"],
    "Ремонт деталей (расчет индивидуальный)": ["от 8 000 ₽", "от 8 000 ₽", "от 8 000 ₽", "от 8 000 ₽", "от 8 000 ₽"],
    "Полный разбор/сборка под оклейку": [49700, 58800, 63500, 69500, 74800],
    "Полный разбор под оклейку с проемами": [64700, 74400, 84000, 93700, 100100],
    "Разбор под полную оклейку без бамперов": [31000, 39400, 44300, 52100, 55400],
    "Разбор под оклейку зоны риска \"Стандарт\"": [11600, 14000, 17600, 19300, 27500],
    "Полный разбор/сборка под окраску": [61500, 70800, 79900, 89600, 102900],
    "Разбор/сбор под полировку (ручки, шильдики и т.д.)": [8200, 8200, 8600, 8800, 11000],
    "Бампер (снятие/установка)": [5900, 7200, 7500, 8100, 8900],
    "Бампер (разбор/сбор)": [7400, 8300, 9500, 10100, 11200],
    "Бампер с элементами спортивного обвеса": [8300, 9500, 10400, 11500, 12500],
    "Решетка радиатора со снятием бампера": [9400, 10400, 11300, 11300, 12500],
    "Дверь (1 шт.) под оклейку": [4000, 4600, 5000, 5600, 5900],
    "Дверь багажника под оклейку": [5300, 5900, 6300, 6700, 7400],
    "Капот (снятие/установка, разбор/сбор)": [4200, 5300, 6300, 6800, 7400],
    "Крыло переднее (снятие/установка)": [6300, 7300, 8200, 9500, 11100],
    "Зеркало (разбор)": ["3 000 - 5 000 ₽", "3 000 - 5 000 ₽", "3 000 - 5 000 ₽", "3 000 - 5 000 ₽", "3 000 - 5 000 ₽"],
    "Снятие/установка торпедо": [29600, 34900, 40100, 46000, 52800],
    "Снятие/установка сидений (все)": [9800, 9800, 12600, 12600, 15500],
    "Снятие/установка ремней безопасности (1 шт.)": [4300, 4300, 4300, 5100, 5100],
    "Разбор/сборка для снятия пола": [29400, 34000, 39300, 45400, 52900],
    "Снятие/установка потолка и стоек": [14500, 17500, 19600, 21000, 22900],
    "Снятие/установка руля": [2600, 2900, 3000, 3000, 3000],
    "Снятие/установка AirBag": [1300, 1500, 1800, 1800, 1800],
    "Разбор/сбор подвески": [6000, 6700, 6900, 7500, 8000],
    "Снятие/установка колёс": [3000, 3300, 3900, 4100, 4400],
    "Молдинг оконный": ["от 7 500 ₽", "от 7 500 ₽", "от 7 500 ₽", "от 7 500 ₽", "от 7 500 ₽"],
    "Дверная ручка": ["от 6 000 ₽", "от 6 000 ₽", "от 6 000 ₽", "от 6 000 ₽", "от 6 000 ₽"],
    "Решётка радиатора (ноздри)": ["от 18 000 ₽", "от 18 000 ₽", "от 18 000 ₽", "от 18 000 ₽", "от 18 000 ₽"],
    "Воздухозаборники на крыльях (жабры)": ["от 8 500 ₽", "от 8 500 ₽", "от 8 500 ₽", "от 8 500 ₽", "от 8 500 ₽"],
    "Накладка крышки багажника": ["от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽"],
    "Накладка на дверь": ["от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽", "от 12 000 ₽"],
    "Эмблема": ["от 5 000 ₽", "от 5 000 ₽", "от 5 000 ₽", "от 5 000 ₽", "от 5 000 ₽"]
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
  const groupsToDisplay = (serviceName === PPF_TITLE || serviceName === POLY_TITLE) ? PRICING_DATA.PPF_GROUPS : (serviceName === VINYL_TITLE) ? PRICING_DATA.VINYL_GROUPS : (serviceName === INTERIOR_TITLE) ? PRICING_DATA.INTERIOR_GROUPS : (serviceName === GLASS_PROT_TITLE) ? PRICING_DATA.GLASS_PROT_GROUPS : (serviceName === HEADLIGHTS_TITLE) ? PRICING_DATA.HEADLIGHTS_GROUPS : (serviceName === TINTING_TITLE) ? PRICING_DATA.TINTING_GROUPS : (serviceName === ATERMAL_TITLE) ? PRICING_DATA.ATERMAL_GROUPS : (serviceName === RESTORATION_POLISH_TITLE) ? PRICING_DATA.RESTORATION_POLISH_GROUPS : (serviceName === SOFT_POLISH_TITLE) ? PRICING_DATA.SOFT_POLISH_GROUPS : (serviceName === LOCAL_POLISH_TITLE) ? PRICING_DATA.LOCAL_POLISH_GROUPS : (serviceName === POLISH_COMBO_TITLE) ? PRICING_DATA.POLISH_COMBO_GROUPS : (serviceName === RISK_ZONES_TITLE) ? PRICING_DATA.RISK_ZONES_GROUPS : (serviceName === INTERIOR_POLISH_TITLE) ? PRICING_DATA.INTERIOR_POLISH_GROUPS : (serviceName === GLASS_HEADLIGHTS_POLISH_TITLE) ? PRICING_DATA.GLASS_HEADLIGHTS_POLISH_GROUPS : (serviceName === COMBO_CLEANING_TITLE) ? PRICING_DATA.COMBO_CLEANING_GROUPS : (serviceName === TEXTILE_CLEANING_TITLE) ? PRICING_DATA.TEXTILE_CLEANING_GROUPS : (serviceName === LOCAL_CLEANING_TITLE) ? PRICING_DATA.LOCAL_CLEANING_GROUPS : (serviceName === CERAMIC_TITLE) ? PRICING_DATA.CERAMIC_GROUPS : (serviceName === INTERIOR_CERAMIC_TITLE) ? PRICING_DATA.INTERIOR_CERAMIC_GROUPS : (serviceName === ANTIRAIN_TITLE) ? PRICING_DATA.ANTIRAIN_GROUPS : (serviceName === WHEELS_CERAMIC_TITLE) ? PRICING_DATA.WHEELS_CERAMIC_GROUPS : (serviceName === PAINTING_TITLE) ? PRICING_DATA.PAINTING_GROUPS : (serviceName === LOCAL_PAINT_TITLE) ? PRICING_DATA.LOCAL_PAINT_GROUPS : (serviceName === ARMATURE_TITLE) ? PRICING_DATA.ARMATURE_GROUPS : (serviceName === ANTICHROME_TITLE) ? PRICING_DATA.ANTICHROME_GROUPS : [{ title: serviceName, items: [serviceName] }];
  return (
    <div className="relative w-full mx-auto" style={{ marginTop: `${LAYOUT_SETTINGS.resultsY}px`, maxWidth: `${resultsMaxWidth}px` }}>
      <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] blur-[30px] translate-y-4" />
      <div className="relative z-10 bg-white rounded-[2.5rem] p-6 border border-white overflow-hidden shadow-2xl">
        <div className="flex items-center gap-4 mb-4"><div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><MaterialIcon name={sNode.icon} className="text-2xl" /></div><h3 className="font-bold tracking-tight uppercase" style={{ fontSize: `${typography.titleSize}px`, color: typography.titleColor }}>{serviceName}</h3></div>
        <div className={cn("grid grid-cols-1 gap-y-4", groupsToDisplay.length === 2 ? "md:grid-cols-2 gap-x-16" : "md:grid-cols-3 gap-x-12")}>{groupsToDisplay.map((group, gIdx) => (<div key={gIdx} className="flex flex-col space-y-2"><h4 className="font-black uppercase tracking-widest mb-2" style={{ fontSize: `${typography.categorySize}px`, color: typography.categoryColor }}>{group.title}</h4><div className="space-y-1">{group.items.map((it) => { const d = PRICING_DATA.PRICES[it]?.[carClass - 1]; const p = typeof d === 'number' ? `${d.toLocaleString("ru-RU")} ₽` : (typeof d === 'string' ? d.replace(/от\s*(\d[\d\s]*)\s*до\s*\d[\d\s]*/gi, "от $1").replace(/Цена\s*по\s*запросу/gi, "По запросу") : "По запросу"); const displayName = (it.trim().charAt(0).toUpperCase() + it.trim().slice(1).toLowerCase()).replace(/x-pel|xpel/gi, "X-PEL").replace(/spectroll/gi, "SPECTROLL").replace(/stek/gi, "STEK"); return (<div key={it} className="flex justify-between items-center py-1 group/row hover:bg-slate-50 px-2 rounded transition-all italic font-bold"><span className="uppercase leading-tight flex-1 pr-4" style={{ fontSize: `${typography.serviceSize}px`, color: typography.serviceColor }}>{displayName}</span><div className="flex items-center gap-3"><span className="whitespace-nowrap" style={{ fontSize: `${typography.priceSize}px`, color: typography.priceColor }}>{p}</span><button onClick={() => onAddToCart(it, d || "Цена по запросу")} className="group w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center hover:bg-primary transition-all active:scale-95 shrink-0"><MaterialIcon name="add" className="text-[12px] text-primary group-hover:!text-white transition-colors" /></button></div></div>); })}</div></div>))}</div></div></div>
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
