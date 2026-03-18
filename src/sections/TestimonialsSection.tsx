"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Внимание к деталям на моем GT3 было непревзойденным. Поистине индивидуальный подход, восстановивший заводскую отделку лучше, чем я ожидал.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Джеймс Стерлинг",
    role: "Владелец Porsche GT3",
  },
  {
    text: "Абсолютное совершенство. Керамическое покрытие сохраняет выставочный блеск уже несколько месяцев. Их точность просто не имеет себе равных.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    name: "Елена Росси",
    role: "Владелица Ferrari Roma",
  },
  {
    text: "Профессионально, пунктуально и точно. Они отнеслись к моей винтажной реставрации с должным уважением. Стоит каждого потраченного рубля.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    name: "Маркус Вэнс",
    role: "Коллекционер",
  },
  {
    text: "Лучший детейлинг в городе. Перетяжка руля выполнена идеально, шов к шву. Машина теперь ощущается как новая.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    name: "Алексей С.",
    role: "Владелец BMW M5",
  },
  {
    text: "Оклейка зон риска выполнена безупречно. Пленку совершенно не видно, края заведены идеально. Настоящие мастера своего дела.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    name: "Мария К.",
    role: "Владелица Range Rover",
  },
  {
    text: "Делал химчистку салона с разбором. Такого результата я не видел даже при покупке авто. Исчезли все запахи и застарелые пятна.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    name: "Дмитрий В.",
    role: "Владелец Audi Q7",
  },
];

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        <React.Fragment>
          {[...new Array(2)].map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div key={`${index}-${i}`} className="p-8 rounded-3xl border border-white/10 bg-primary shadow-xl shadow-primary/20 max-w-xs w-full transition-all hover:bg-primary/90 hover:border-white/20 group">
                  <div className="text-sm leading-relaxed text-white/90 italic font-medium">"{text}"</div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 object-cover border border-white/20"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight text-xs uppercase text-white leading-tight">{name}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/60 leading-tight mt-1">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </React.Fragment>
      </motion.div>
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative h-full flex flex-col items-center px-4 md:px-20 pt-16 pb-24 bg-background-light overflow-hidden font-display">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(1,69,242,0.03)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-primary">
            Мнения клиентов
          </h2>
        </div>

        {/* Animated Grid */}
        <div className="flex justify-center gap-6 h-[500px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_80%,transparent)] overflow-hidden mt-14">
          <TestimonialsColumn
            testimonials={testimonials.slice(0, 3)}
            duration={15}
          />
          <TestimonialsColumn
            testimonials={testimonials.slice(3, 6)}
            className="hidden md:block"
            duration={20}
          />
          <TestimonialsColumn
            testimonials={testimonials.slice(0, 3)}
            className="hidden lg:block"
            duration={17}
          />
        </div>

      </div>
    </section>
  );
}

