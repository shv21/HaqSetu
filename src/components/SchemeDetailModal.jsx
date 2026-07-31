import { useEffect, useState } from "react";
import translations from "../translations.js";
import { getSchemeExplanation } from "../utils/aiExplain.js";

export default function SchemeDetailModal({ scheme, lang, profile, onClose }) {
  const t = translations[lang] || translations.en;
  const [explanation, setExplanation] = useState("Analyzing eligibility details...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getSchemeExplanation(scheme, profile, lang).then((text) => {
      if (active) {
        setExplanation(text);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [scheme, lang, profile]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm px-4 py-8 flex items-center justify-center animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              {scheme.category}
            </span>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              {scheme.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium">{scheme.shortName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-5">
          {/* Benefit Banner */}
          <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
            <h3 className="text-xs font-bold uppercase text-emerald-800 tracking-wider">
              🎁 Key Scheme Benefit
            </h3>
            <p className="mt-1 text-sm font-semibold text-emerald-950">
              {scheme.benefit}
            </p>
          </div>

          {/* Scheme Description */}
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              {t.schemeDetail}
            </h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* AI / Simple Breakdown */}
          <div className="rounded-2xl bg-blue-50/60 p-4 border border-blue-100">
            <h3 className="text-xs font-bold uppercase text-blue-800 tracking-wider flex items-center gap-1.5">
              <span>💡</span> Simplified Eligibility Note
            </h3>
            <p className="mt-2 text-sm text-blue-950 leading-relaxed">
              {loading ? "Preparing guidance..." : explanation}
            </p>
          </div>

          {/* Required Documents & Application Steps Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <h3 className="text-xs font-bold uppercase text-slate-600 tracking-wider">
                📄 {t.documentsHeadline}
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                {scheme.requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <h3 className="text-xs font-bold uppercase text-slate-600 tracking-wider">
                🚀 {t.nextStepsTitle}
              </h3>
              <ol className="mt-3 space-y-1.5 text-xs text-slate-700 list-decimal pl-4">
                {scheme.applySteps.map((step) => (
                  <li key={step} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Official Source Link Banner */}
          <div className="rounded-2xl bg-slate-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">Official Portal Link</p>
              <p className="text-sm font-bold text-white">{scheme.officialSourceName}</p>
            </div>
            <a
              href={scheme.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto text-center rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md"
            >
              Apply at Official Portal ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
