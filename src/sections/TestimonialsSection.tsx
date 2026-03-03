import { MaterialIcon } from "@/components/MaterialIcon";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Джеймс Стерлинг",
    role: "Владелец Porsche GT3",
    quote: "Внимание к деталям на моем GT3 было непревзойденным. Поистине индивидуальный подход, восстановивший заводскую отделку лучше, чем я ожидал.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANCnasXKGBxPvRjvWKbzrnLUZQwjy0Jck6GGFVqtHJhS4cVcxgaEe7JAlAzOzVycxoj5RBPbnVMGFMPXoMsoaUUVF4m0dRpRG85fs38rcxlJGnjpg1-wqdViJf7oGT3r-B1hs_Y61QWjnS7IswCmCpwErmUsKq3BYpCi01DNdD-HEksglt1zZKwajfZJ3PKNGVXqLumpgxGfV79UgbGVEOpPozl6yqK-uQ_-aoAdRMgjAtEGQ58qJZ5jxlilHZvzpAF2uOjDeq1fmI",
  },
  {
    id: 2,
    name: "Елена Росси",
    role: "Владелица Ferrari Roma",
    quote: "Абсолютное совершенство. Керамическое покрытие сохраняет выставочный блеск уже несколько месяцев. Их точность просто не имеет себе равных.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtG_nrtissgf8iJFVINq26HVkqHtPmLIFEH0fg5hgmld2lBD959zjLWwzl0C5o3vy1OHWMzL5usG7N34Zli_ms7HI0_RdJYFu7GjFZmGkvAoEY10ppdUcTsoXu4qqezncj-v2NgklkE0Y_VKTqVtIaRKt705cqsW8rcBusmHarpHU6xQ6VHHATNXxO3pYc4CawCdaOGLFDdpll0JQxl2_P87TGMiq-xV74CnpjF3e1gyKyr-FUEdYYkWD6kJeZ3_PnvrluAdGOkjQj",
  },
  {
    id: 3,
    name: "Маркус Вэнс",
    role: "Коллекционер",
    quote: "Профессионально, пунктуально и точно. Они отнеслись к моей винтажной реставрации с должным уважением. Стоит каждого потраченного рубля.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-7W2KdHVB3jCSV_PCNMecqAGBU7g5h6jibG15e_rZZl069bNpObluVFaMzijmOPvG8UHlIkwhb9d_tZ8F6nxNGGrDwamDA1v1QrWyfmvPTMM5hWbGMof1jxZVpe2KmDYvYMFXo38fzI94IhYoB2G1kx8vlD4igq1H5N4YKHIecykpB7K8EU7pTyDVswKjDrDarxrqxW2r6UU4eeEyE3dgXKWCX57hbhH1X9X8hFFzexHUlM7rxvl-x_itCW7PZelyebuMgDB4V0kF",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="h-full flex flex-col items-center px-8 md:px-20 py-12 md:py-16 bg-background-light justify-center font-display">
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <div className="text-center mb-8">
          <span className="text-primary text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-2 block">
            Отзывы
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none text-slate-900">
            Мнения клиентов
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col space-y-3 liquid-glass p-4">
              <div className="mb-2 overflow-hidden rounded-xl aspect-video md:aspect-square w-full relative">
                <img
                  alt={testimonial.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src={testimonial.image}
                />
              </div>
              <div className="flex gap-1 text-primary justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialIcon key={star} name="star" className="text-sm" />
                ))}
              </div>
              <p className="text-sm md:text-base leading-relaxed font-light italic text-slate-700 text-center md:text-left">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="pt-2 text-center md:text-left mt-auto">
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-900">
                  {testimonial.name}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto px-4">
          <div className="flex gap-8 md:gap-12 w-full md:w-auto justify-center md:justify-start">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-lg font-bold text-slate-900">4.9</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 text-center">
                Средняя оценка
              </span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-lg font-bold text-slate-900">124</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 text-center">
                Проверенных отзыва
              </span>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 hover:text-primary transition-colors group w-full md:w-auto"
          >
            Читать все истории
            <MaterialIcon
              name="arrow_forward"
              className="text-sm group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
