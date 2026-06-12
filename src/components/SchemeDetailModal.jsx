import { useEffect, useState } from "react";
import translations from "../translations.js";
import { getSchemeExplanation } from "../utils/aiExplain.js";

export default function SchemeDetailModal({ scheme, lang, profile, onClose }) {
  const t = translations[lang] || translations.en;
  const [explanation, setExplanation] = useState("Loading explanation...");
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {scheme.name}
            </h2>
            <p className="mt-2 text-slate-600">{scheme.shortName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>
        <div className="mt-6 space-y-5">
          <div className="space-y-3 rounded-3xl bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              {t.officialSource}
            </p>
            <a
              href={scheme.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-brand font-semibold underline"
            >
              {scheme.officialSourceName}
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                {t.documentsHeadline}
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                {scheme.requiredDocuments.map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                {t.nextStepsTitle}
              </h3>
              <ul className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
                {scheme.applySteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">
              {t.schemeDetail}
            </h3>
            <p className="mt-3 text-slate-700">{scheme.description}</p>
            <p className="mt-2 text-slate-600">{scheme.benefit}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <h3 className="text-lg font-semibold text-slate-900">AI Summary</h3>
            <p className="mt-3 min-h-[80px] text-slate-700">
              {loading ? "Loading explanation..." : explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
