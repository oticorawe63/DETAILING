"use client";

import { MaterialIcon } from "./MaterialIcon";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-center items-center pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-1 absolute left-6">
        <div className="font-display text-2xl tracking-tighter text-slate-900 dark:text-white flex items-center font-semibold italic">
          DETAILING<span className="text-primary not-italic">23</span>
        </div>
      </div>
      <div className="pointer-events-auto bg-card-light dark:bg-card-dark rounded-full px-2 py-2 flex gap-2 items-center shadow-lg border border-slate-100 dark:border-slate-800">
        <button className="w-10 h-10 rounded-full flex items-center justify-center dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200">
          <MaterialIcon name="home" className="text-xl text-primary" />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
          <MaterialIcon name="tune" className="text-xl hover:text-primary transition-colors" />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
          <MaterialIcon name="star" className="text-xl hover:text-primary transition-colors" />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">
          <MaterialIcon name="info" className="text-xl hover:text-primary transition-colors" />
        </button>
      </div>
    </nav>
  );
}
