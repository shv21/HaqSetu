import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import translations from "../translations.js";

const languageOptions = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिंदी", short: "HI" },
  { code: "mr", label: "मराठी", short: "MR" },
];

export default function Navbar({ lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef(null);
  const navigate = useNavigate();
  const t = translations[lang] || translations.en;

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Find Schemes", href: "/check" },
    { label: "Explore Schemes", href: "/results" },
    { label: "How It Works", href: "/#how-it-works", isAnchor: true },
    { label: "Safety", href: "/safety" },
    { label: "About", href: "/about" },
  ];

  const handleAnchorClick = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      navigate("/");
      setTimeout(() => {
        const id = href.replace("/#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const currentLang = languageOptions.find((l) => l.code === lang) || languageOptions[0];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand mark & Website Name */}
        <Link to="/" className="flex items-center gap-2.5 focus:outline-none" aria-label="HaqSetu Home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#123B63] text-white shadow-sm font-bold text-lg tracking-tight">
            H
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#1F2937]">
                HaqSetu
              </span>
              <span className="hidden sm:inline-block rounded border border-[#E2E8F0] bg-[#F8FAFC] px-1.5 py-0.5 text-[10px] font-medium text-[#64748B]">
                Beta
              </span>
            </div>
            <span className="text-[11px] font-normal text-[#64748B] leading-none">
              Scheme Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
          {navItems.map((item) => (
            item.isAnchor ? (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-[#64748B] transition-colors hover:bg-slate-50 hover:text-[#1F2937]"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#EAF2F8] text-[#123B63] font-semibold"
                      : "text-[#64748B] hover:bg-slate-50 hover:text-[#1F2937]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          ))}
        </nav>

        {/* Right Actions: Language Selector & CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Subtle Language Selector Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#1F2937] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#123B63]/20"
              aria-label="Select Language"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="h-3.5 w-3.5 text-[#64748B]" />
              <span>{currentLang.label}</span>
              <ChevronDown className="h-3 w-3 text-[#64748B]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-lg border border-[#E2E8F0] bg-white p-1 shadow-dropdown z-50">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      if (setLang) setLang(opt.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-left transition-colors ${
                      opt.code === lang
                        ? "bg-[#EAF2F8] font-semibold text-[#123B63]"
                        : "text-[#1F2937] hover:bg-slate-50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.code === lang && <Check className="h-3 w-3 text-[#123B63]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <Link
            to="/check"
            className="btn-primary"
            aria-label="Check Eligibility"
          >
            <Search className="h-4 w-4" />
            <span>Check Eligibility</span>
          </Link>
        </div>

        {/* Mobile Hamburger & Language */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Quick Language Toggle on Mobile */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-2 py-1.5 text-xs font-medium text-[#1F2937]"
              aria-label="Select Language"
            >
              <Globe className="h-3 w-3 text-[#64748B]" />
              <span>{currentLang.short}</span>
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 rounded-lg border border-[#E2E8F0] bg-white p-1 shadow-dropdown z-50">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      if (setLang) setLang(opt.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-left ${
                      opt.code === lang ? "bg-[#EAF2F8] font-semibold text-[#123B63]" : "text-[#1F2937]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {opt.code === lang && <Check className="h-3 w-3 text-[#123B63]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#1F2937] hover:bg-slate-50 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E2E8F0] bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              item.isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#64748B] hover:bg-slate-50 hover:text-[#1F2937]"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  end={item.href === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-[#EAF2F8] text-[#123B63] font-semibold"
                        : "text-[#64748B] hover:bg-slate-50 hover:text-[#1F2937]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            ))}
            <div className="pt-2">
              <Link
                to="/check"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                <Search className="h-4 w-4" />
                <span>Check Eligibility</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
