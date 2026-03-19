import { MaterialIcon } from "./MaterialIcon";

export function Footer() {
  return (
    <footer className="bg-background-light text-primary w-full overflow-hidden border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-12">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-1 font-unbounded font-black text-primary italic uppercase tracking-tighter">
            <span className="text-5xl md:text-7xl">
              DETAILING
            </span>
            <span className="text-5xl md:text-7xl not-italic opacity-100">
              99
            </span>
          </div>
        </div>

        {/* Navigation and Info Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-8">
          <div className="flex items-center gap-2">
            <MaterialIcon name="location_on" className="text-sm text-primary" />
            <p className="text-sm md:text-base text-primary uppercase font-bold tracking-tight">г. Москва, ул. Примерная, 123</p>
          </div>
          <div className="flex items-center gap-2">
            <MaterialIcon name="call" className="text-sm text-primary" />
            <p className="text-sm md:text-base font-bold text-primary uppercase tracking-tight">+7 (999) 012-34-56</p>
          </div>
          <div className="flex items-center gap-2">
            <MaterialIcon name="mail" className="text-sm text-primary" />
            <p className="text-sm md:text-base text-primary uppercase font-bold tracking-tight">info@detailing23.ru</p>
          </div>
        </div>

        {/* Map Placeholder / Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 justify-center">
          <div className="text-sm md:text-base text-primary tracking-widest opacity-100 text-center font-bold uppercase">
            © {new Date().getFullYear()} DETAILING99. Точность в каждой детали.
          </div>
        </div>
      </div>
    </footer>
  );
}
