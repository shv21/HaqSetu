import { useState } from "react";
import { NavLink } from "react-router-dom";
import translations from "../translations.js";

const navLinks = [
  { label: "startCheck", href: "/check" },
  { label: "viewSafety", href: "/safety" },
  { label: "dashboardTitle", href: "/dashboard" },
  { label: "aboutTitle", href: "/about" },
];

export default function Navbar({ lang }) {
  const [open, setOpen] = useState(false);
  const t = translations[lang] || translations.en;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white font-black text-xl shadow-md transition group-hover:scale-105">
            H
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 tracking-tight block leading-none">
              {t.siteName}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block mt-0.5">
              Gov Welfare Portal
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `rounded-xl px-3.5 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {t[item.label]}
            </NavLink>
          ))}

          <NavLink
            to="/check"
            className="ml-2 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700 active:scale-95"
          >
            <span>🔍</span>
            <span>{t.startCheck}</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle Navigation"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-xl md:hidden animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {t[item.label]}
              </NavLink>
            ))}
            <NavLink
              to="/check"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-emerald-600 py-3.5 text-center text-base font-bold text-white shadow-md"
            >
              🔍 {t.startCheck}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
