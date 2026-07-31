import { useState } from "react";
import translations from "../translations.js";

export default function SchemeCard({ schemeData, lang, onSelect }) {
  const t = translations[lang] || translations.en;
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scheme, score, reasons, missingDocuments } = schemeData;

  const handleTextToSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert(t.noAudio);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = `${scheme.name}. ${scheme.description}. Benefit: ${scheme.benefit}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    if (lang === "hi") utterance.lang = "hi-IN";
    else if (lang === "mr") utterance.lang = "mr-IN";
    else utterance.lang = "en-IN";

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card transition hover:shadow-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              {scheme.category}
            </span>
            {scheme.state && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                {scheme.state}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            {scheme.name}
          </h3>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            {scheme.description}
          </p>
        </div>

        {/* Eligibility Match Badge */}
        <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center rounded-2xl bg-emerald-50 px-4 py-3 border border-emerald-200 text-center min-w-[120px]">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            {t.eligibilityScore}
          </span>
          <span className="text-2xl font-black text-emerald-700">{score}%</span>
        </div>
      </div>

      {/* Reasons & Document Status */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <span>✅</span> {t.reasonsTitle}
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {reasons.map((item) => (
              <li key={item} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <span>📋</span> {t.missingDocsText}
          </p>
          {missingDocuments.length ? (
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {missingDocuments.map((doc) => (
                <li key={doc} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-emerald-700 font-medium flex items-center gap-1">
              <span>🎉</span> All essential documents are ready!
            </p>
          )}
        </div>
      </div>

      {/* Benefit Highlight Banner */}
      {scheme.benefit && (
        <div className="mt-4 rounded-2xl bg-emerald-50/70 p-3.5 border border-emerald-100 text-sm font-semibold text-emerald-950 flex items-center gap-2">
          <span className="text-lg">🎁</span>
          <span>{scheme.benefit}</span>
        </div>
      )}

      {/* Action Buttons & Voice Read-Aloud */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={handleTextToSpeech}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
            isPlaying
              ? "bg-amber-100 text-amber-900 border border-amber-300 animate-pulse"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <span>{isPlaying ? "⏸️ Pause Audio" : "🔊 Listen Info"}</span>
        </button>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            {t.learnMore}
          </button>
          <button
            type="button"
            onClick={() => onSelect(scheme)}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
          >
            {t.schemeDetail}
          </button>
        </div>
      </div>

      {/* Quick Details Drawer */}
      {open && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-5 border border-slate-200 text-slate-700 space-y-4 animate-fadeIn">
          <div>
            <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              {t.documentsHeadline}
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
              {scheme.requiredDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
          </div>
          {scheme.officialSourceName && (
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Official Portal: {scheme.officialSourceName}</span>
              <a
                href={scheme.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-700 underline hover:text-emerald-800"
              >
                Visit Web Portal ↗
              </a>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
