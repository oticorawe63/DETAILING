import { MaterialIcon } from "./MaterialIcon";

export function Footer() {
  return (
    <footer className="bg-primary text-white w-full">
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
            <p className="text-sm md:text-base">123 Detail St, Auto City, AC 90210</p>
          </div>
          <div className="flex items-center gap-2">
            <MaterialIcon name="call" className="text-sm" />
            <p className="text-sm md:text-base font-bold">+1 (555) 0123-4567</p>
          </div>
          <div className="flex items-center gap-2">
            <MaterialIcon name="mail" className="text-sm" />
            <p className="text-sm md:text-base">info@detailing23.com</p>
          </div>
        </div>

        {/* Map Placeholder / Bottom Bar */}
        <div className="mt-12 flex flex-col items-center gap-4 justify-center">
          <div className="text-xs uppercase tracking-widest opacity-60 text-center">
            © {new Date().getFullYear()} DETAILING23. Precision in every detail.
          </div>
        </div>
      </div>
    </footer>
  );
}
