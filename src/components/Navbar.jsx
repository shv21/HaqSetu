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
    <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="text-xl font-semibold tracking-tight text-slate-900"
        >
          {t.siteName}
        </NavLink>
        <div className="hidden items-center gap-4 md:flex">
          {navLinks.slice(0, 3).map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-soft text-primary"
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {t[item.label]}
            </NavLink>
          ))}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-full px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-soft text-primary"
                  : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            {t.aboutTitle}
          </NavLink>
          <NavLink
            to="/check"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover"
          >
            {t.startCheck}
          </NavLink>
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-primary hover:text-primary md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-lg">☰</span>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-md md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-soft hover:text-primary"
              >
                {t[item.label]}
              </NavLink>
            ))}
            <NavLink
              to="/check"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              {t.startCheck}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
