import { MaterialIcon } from "@/components/MaterialIcon";

const SERVICES = [
  {
    id: "exterior",
    title: "Exterior",
    icon: "water_drop",
  },
  {
    id: "interior",
    title: "Interior",
    icon: "weekend",
  },
  {
    id: "protection",
    title: "Protection",
    icon: "verified_user",
  },
  {
    id: "ceramic",
    title: "Ceramic Coating",
    icon: "layers",
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    icon: "auto_fix_high",
  },
  {
    id: "ppf",
    title: "PPF Protection",
    icon: "shield",
  },
];

export function PricingSection() {
  return (
    <section className="h-screen flex flex-col px-4 md:px-12 py-16 max-w-7xl mx-auto w-full justify-center font-display">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 mt-4 md:mt-0">
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
            УСЛУГИ И ЦЕНЫ
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="bg-card-light dark:bg-card-dark rounded-3xl p-6 shadow-soft hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                  <MaterialIcon name={service.icon} outline className="text-2xl" />
                </div>
                <h3 className="font-bold text-xl tracking-wide uppercase">
                  {service.title}
                </h3>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <button className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-sm transition-colors uppercase">
                  ВЫБРАТЬ марку авто
                </button>
                <button className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold text-sm transition-colors uppercase">
                  ВЫБРАТЬ модель авто
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
