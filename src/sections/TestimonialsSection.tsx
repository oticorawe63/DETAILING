import { MaterialIcon } from "@/components/MaterialIcon";

const TESTIMONIALS = [
  {
    id: 1,
    name: "James Sterling",
    role: "Porsche GT3 Owner",
    quote: "The attention to detail on my GT3 was unparalleled. A truly bespoke experience that restored the factory finish beyond my expectations.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANCnasXKGBxPvRjvWKbzrnLUZQwjy0Jck6GGFVqtHJhS4cVcxgaEe7JAlAzOzVycxoj5RBPbnVMGFMPXoMsoaUUVF4m0dRpRG85fs38rcxlJGnjpg1-wqdViJf7oGT3r-B1hs_Y61QWjnS7IswCmCpwErmUsKq3BYpCi01DNdD-HEksglt1zZKwajfZJ3PKNGVXqLumpgxGfV79UgbGVEOpPozl6yqK-uQ_-aoAdRMgjAtEGQ58qJZ5jxlilHZvzpAF2uOjDeq1fmI",
  },
  {
    id: 2,
    name: "Elena Rossi",
    role: "Ferrari Roma Owner",
    quote: "Absolute perfection. The ceramic coating has maintained a showroom shine for months. Their precision is simply unmatched in the city.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtG_nrtissgf8iJFVINq26HVkqHtPmLIFEH0fg5hgmld2lBD959zjLWwzl0C5o3vy1OHWMzL5usG7N34Zli_ms7HI0_RdJYFu7GjFZmGkvAoEY10ppdUcTsoXu4qqezncj-v2NgklkE0Y_VKTqVtIaRKt705cqsW8rcBusmHarpHU6xQ6VHHATNXxO3pYc4CawCdaOGLFDdpll0JQxl2_P87TGMiq-xV74CnpjF3e1gyKyr-FUEdYYkWD6kJeZ3_PnvrluAdGOkjQj",
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Collector",
    quote: "Professional, punctual, and precise. They treated my vintage restoration with the respect it deserves. Worth every premium dollar.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-7W2KdHVB3jCSV_PCNMecqAGBU7g5h6jibG15e_rZZl069bNpObluVFaMzijmOPvG8UHlIkwhb9d_tZ8F6nxNGGrDwamDA1v1QrWyfmvPTMM5hWbGMof1jxZVpe2KmDYvYMFXo38fzI94IhYoB2G1kx8vlD4igq1H5N4YKHIecykpB7K8EU7pTyDVswKjDrDarxrqxW2r6UU4eeEyE3dgXKWCX57hbhH1X9X8hFFzexHUlM7rxvl-x_itCW7PZelyebuMgDB4V0kF",
  },
];

export function TestimonialsSection() {
  return (
    <section className="h-screen flex flex-col items-center px-8 md:px-20 py-4 pt-20 bg-background-light dark:bg-background-dark justify-center font-display">
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-primary text-xs font-black tracking-[0.3em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
            Client Feedback
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col space-y-6">
              <div className="mb-6 overflow-hidden rounded-xl aspect-square w-full">
                <img
                  alt={testimonial.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src={testimonial.image}
                />
              </div>
              <div className="flex gap-1 text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MaterialIcon key={star} name="star" className="text-sm" />
                ))}
              </div>
              <p className="text-lg leading-relaxed font-light italic text-slate-700 dark:text-slate-300">
                "{testimonial.quote}"
              </p>
              <div className="pt-4">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 dark:text-white">4.9</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Average Rating
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 dark:text-white">124</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Verified Reviews
              </span>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors group"
          >
            Read all stories
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
