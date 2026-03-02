"use client";

import { MaterialIcon } from "@/components/MaterialIcon";

export function QuoteSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-6 md:p-12 lg:p-20 font-display">
      <div className="w-full max-w-6xl">
        <div className="mb-12 mt-12 md:mt-0">
          <span className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-2 block">
            Connect With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Request a Quote
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
            Experience automotive perfection. Tell us about your vehicle and we'll reach out within the hour.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Form */}
          <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-base outline-none"
                    />
                    <MaterialIcon
                      name="person"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 text-base outline-none"
                    />
                    <MaterialIcon
                      name="call"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wider">
                    Select Service
                  </label>
                  <div className="relative group">
                    <select className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 pr-12 text-base outline-none">
                      <option value="">Choose a treatment...</option>
                      <option value="ceramic">Ceramic Coating Pro</option>
                      <option value="interior">Interior Restoration</option>
                      <option value="ppf">Paint Protection Film</option>
                      <option value="full">Full Signature Detail</option>
                    </select>
                    <MaterialIcon
                      name="expand_more"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm py-5 px-8 transition-all hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>Send Inquiry</span>
                <MaterialIcon name="send" className="text-xl" />
              </button>
            </form>
          </div>

          {/* Right Column: Map & Info */}
          <div className="flex flex-col gap-8">
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <div
                className="w-full h-full grayscale opacity-80"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNALEe57Nt-C9En2jp1UG8H-4bx2J0iVeY3_7o10bAHwxU6O-PQIIFAistInTcvw7MsiAcF8NCHDQl4hLgnatXQnrGCMVXT4kg8rPSRmVfkt4mRht-_oGFuzV-6weSkCbeZrAa1UO6rBVkFgNaApGnMEJZ5PY3X9hJ89CnGIlvjue-L_2kKqBSpJV6eIQsLsoTmqMC_EpQ7ksVbB2GHPhvAT6FTIaUfd0hRGi09LnQuhWm0UxfxZMt_DNET-WFf1Bu-51iC3Y1kXQN")',
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  filter: "grayscale(1) invert(1) contrast(1.2)",
                }}
              />
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-primary bg-primary/10 p-3 rounded-full flex items-center justify-center">
                    <MaterialIcon name="call" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Phone
                    </p>
                    <p className="text-slate-900 dark:text-white font-semibold">
                      +1 (555) 888-0000
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-primary bg-primary/10 p-3 rounded-full flex items-center justify-center">
                    <MaterialIcon name="mail" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Email
                    </p>
                    <p className="text-slate-900 dark:text-white font-semibold">
                      concierge@elitedetailing.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Simplified Social Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <svg className="size-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <svg className="size-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info Area matching screen 7 */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-12 justify-center border-t border-slate-200 dark:border-slate-800 pt-10">
          <div className="flex items-center gap-3">
            <MaterialIcon name="schedule" className="text-primary" />
            <div className="text-xs uppercase tracking-tighter">
              <p className="text-slate-400">Mon - Sat</p>
              <p className="text-slate-900 dark:text-white font-bold">8:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MaterialIcon name="verified_user" className="text-primary" />
            <div className="text-xs uppercase tracking-tighter">
              <p className="text-slate-400">Certified</p>
              <p className="text-slate-900 dark:text-white font-bold">Authorized Center</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
