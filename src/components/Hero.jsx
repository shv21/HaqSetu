import { useState } from "react";
import translations from "../translations.js";
import LanguageSelector from "./LanguageSelector.jsx";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../utils/storage.js";

const STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", 
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

export default function Hero({ lang, setLang }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();

  const [quickForm, setQuickForm] = useState({
    fullName: "",
    age: "",
    state: "Uttar Pradesh",
    qualification: "secondary",
    occupation: "informal worker",
    categoryPreference: "all",
  });

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const profile = {
      fullName: quickForm.fullName || "User",
      age: Number(quickForm.age) || 25,
      gender: "male",
      state: quickForm.state,
      areaType: "rural",
      qualification: quickForm.qualification,
      occupation: quickForm.occupation,
      categoryPreference: quickForm.categoryPreference,
      incomeRange: "< ₹10,000",
      hasAadhaar: true,
      hasMobileLinked: true,
      hasBankAccount: true,
      hasRationCard: true,
      hasIncomeCert: true,
      hasCasteCert: false,
      hasDisabilityCert: false,
    };
    saveProfile(profile);
    navigate("/results");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white py-12 lg:py-16">
      {/* Background Decorative Circles */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-md border border-emerald-400/30">
              <span>🇮🇳</span>
              <span>{t.siteName} • Multilingual Scheme Assistant</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
              {t.slogan}
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
              {t.subheadline}
            </p>

            {/* Language Switcher Bar */}
            <div className="pt-2">
              <LanguageSelector lang={lang} setLang={setLang} />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-700/50">
              <div className="bg-emerald-950/40 backdrop-blur rounded-2xl p-3.5 border border-emerald-600/20 text-center sm:text-left">
                <span className="text-xl">🗣️</span>
                <p className="text-xs font-semibold text-emerald-200 mt-1">3 Languages</p>
                <p className="text-[11px] text-emerald-300/70 hidden sm:block">EN, हिंदी, मराठी</p>
              </div>
              <div className="bg-emerald-950/40 backdrop-blur rounded-2xl p-3.5 border border-emerald-600/20 text-center sm:text-left">
                <span className="text-xl">⚡</span>
                <p className="text-xs font-semibold text-emerald-200 mt-1">Instant Match</p>
                <p className="text-[11px] text-emerald-300/70 hidden sm:block">In under 60 seconds</p>
              </div>
              <div className="bg-emerald-950/40 backdrop-blur rounded-2xl p-3.5 border border-emerald-600/20 text-center sm:text-left">
                <span className="text-xl">🛡️</span>
                <p className="text-xs font-semibold text-emerald-200 mt-1">100% Safe</p>
                <p className="text-[11px] text-emerald-300/70 hidden sm:block">Verified Gov Links</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Search Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-slate-900 border border-emerald-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>🔍</span> {t.quickSearch}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Find eligible welfare schemes right away</p>
                </div>
                <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={quickForm.fullName}
                    onChange={(e) => setQuickForm({ ...quickForm, fullName: e.target.value })}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* Age & State Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      {t.age}
                    </label>
                    <input
                      type="number"
                      required
                      min="10"
                      max="100"
                      value={quickForm.age}
                      onChange={(e) => setQuickForm({ ...quickForm, age: e.target.value })}
                      placeholder="e.g. 24"
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      {t.state}
                    </label>
                    <select
                      value={quickForm.state}
                      onChange={(e) => setQuickForm({ ...quickForm, state: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    >
                      {STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Scheme Category Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    🎯 {t.preferredCategory}
                  </label>
                  <select
                    value={quickForm.categoryPreference}
                    onChange={(e) => setQuickForm({ ...quickForm, categoryPreference: e.target.value })}
                    className="w-full rounded-xl border-2 border-emerald-600/30 bg-emerald-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                  >
                    {Object.entries(t.categories || {}).map(([catKey, catLabel]) => (
                      <option key={catKey} value={catKey}>{catLabel}</option>
                    ))}
                  </select>
                </div>

                {/* Qualification & Occupation Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      {t.qualification}
                    </label>
                    <select
                      value={quickForm.qualification}
                      onChange={(e) => setQuickForm({ ...quickForm, qualification: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    >
                      {Object.entries(t.eduLevels || {}).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      {t.occupation}
                    </label>
                    <select
                      value={quickForm.occupation}
                      onChange={(e) => setQuickForm({ ...quickForm, occupation: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:bg-white focus:outline-none"
                    >
                      <option value="informal worker">Informal Worker</option>
                      <option value="student">Student / Youth</option>
                      <option value="farmer">Farmer (किसान)</option>
                      <option value="street vendor">Street Vendor</option>
                      <option value="homemaker">Homemaker</option>
                      <option value="pregnant woman / mother">Mother</option>
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                >
                  <span>🚀 {t.submit}</span>
                </button>

                <p className="text-center text-[11px] text-slate-400 mt-2">
                  Or use the <a href="#/check" onClick={(e) => { e.preventDefault(); navigate("/check"); }} className="underline text-emerald-600 font-semibold">Full Step-by-Step Wizard</a>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
