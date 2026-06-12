import { useEffect, useState } from "react";
import { loadChecklist, saveChecklist } from "../utils/storage.js";
import translations from "../translations.js";

export default function Checklist({ lang, matchedSchemes }) {
  const t = translations[lang] || translations.en;
  const [checked, setChecked] = useState({});
  const [saved, setSaved] = useState(false);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const stored = loadChecklist();
    if (stored) setChecked(stored);
  }, []);

  useEffect(() => {
    const documents = matchedSchemes.flatMap(
      (item) => item.scheme.requiredDocuments,
    );
    const unique = Array.from(new Set(documents));
    setOutput(
      unique.map((doc) => `- [${checked[doc] ? "x" : " "}] ${doc}`).join("\n"),
    );
  }, [checked, matchedSchemes]);

  const documents = Array.from(
    new Set(matchedSchemes.flatMap((item) => item.scheme.requiredDocuments)),
  );

  const toggleDocument = (doc) => {
    const next = { ...checked, [doc]: !checked[doc] };
    setChecked(next);
    saveChecklist(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  const copyChecklist = async () => {
    try {
      await navigator.clipboard.writeText(output || "");
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadChecklist = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "haqsetu-checklist.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!matchedSchemes.length) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t.checklistHeadline}
          </h2>
          <p className="mt-4 text-slate-600">
            No matched schemes yet to generate checklist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-slate-900">
          {t.checklistHeadline}
        </h2>
        <p className="mt-3 text-slate-600">{t.actionSteps}</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {documents.map((doc) => (
            <label
              key={doc}
              className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4"
            >
              <input
                type="checkbox"
                checked={!!checked[doc]}
                onChange={() => toggleDocument(doc)}
                className="h-5 w-5 rounded border-slate-300 text-brand focus:ring-brand"
              />
              <span className="text-slate-700">{doc}</span>
            </label>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-slate-600">
            {saved
              ? "Checklist saved locally."
              : "Use the buttons to copy or download."}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyChecklist}
              className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {t.copyChecklist}
            </button>
            <button
              type="button"
              onClick={downloadChecklist}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-brand"
            >
              {t.downloadChecklist}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
