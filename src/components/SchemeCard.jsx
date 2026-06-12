import { useState } from "react";
import translations from "../translations.js";

export default function SchemeCard({ schemeData, lang, onSelect }) {
  const t = translations[lang] || translations.en;
  const [open, setOpen] = useState(false);
  const { scheme, score, reasons, missingDocuments, nextSteps } = schemeData;
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            {scheme.category}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">
            {scheme.name}
          </h3>
          <p className="mt-2 text-slate-600">{scheme.description}</p>
        </div>
        <div className="rounded-3xl bg-brand-light px-4 py-3 text-right text-sm text-brand-dark">
          <p className="font-semibold">{t.eligibilityScore}</p>
          <p>{score}%</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">{t.reasonsTitle}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
            {reasons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">{t.missingDocsText}</p>
          {missingDocuments.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {missingDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-slate-600">
              No missing documents identified.
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {scheme.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500">
            {scheme.officialSourceName} · {t.officialVerify}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-brand"
          >
            {t.learnMore}
          </button>
          <button
            type="button"
            onClick={() => onSelect(scheme)}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            {t.schemeDetail}
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-slate-700">
          <p className="text-sm font-semibold">{t.documentsHeadline}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {scheme.requiredDocuments.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-semibold">{t.optionalHeadline}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {scheme.optionalDocuments.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
