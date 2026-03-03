import { MaterialIcon } from "./MaterialIcon";

export function Footer() {
  return (
    <footer className="bg-primary text-white w-full font-display">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-12">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-1">
            <span className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase italic">
              Detailing
            </span>
            <span className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic opacity-90">
              23
            </span>
          </div>
        </div>

        {/* Navigation and Info Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-8">
          <div className="flex items-center gap-2">
            <MaterialIcon name="location_on" className="text-sm" />
            <p className="text-sm md:text-base">г. Москва, ул. Примерная, 123</p>
          </div>
          <div className="flex items-center gap-2">
            <MaterialIcon name="call" className="text-sm" />
            <p className="text-sm md:text-base font-bold">+7 (999) 012-34-56</p>
          </div>
          <div className="flex items-center gap-2">
            <MaterialIcon name="mail" className="text-sm" />
            <p className="text-sm md:text-base">info@detailing23.ru</p>
          </div>
        </div>

        {/* Map Placeholder / Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 justify-center">
          <div className="text-xs uppercase tracking-widest opacity-60 text-center">
            © {new Date().getFullYear()} DETAILING23. Точность в каждой детали.
          </div>
        </div>
      </div>
    </footer>
  );
}
