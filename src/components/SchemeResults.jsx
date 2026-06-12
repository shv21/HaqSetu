import { useState } from 'react';
import SchemeCard from './SchemeCard.jsx';
import SchemeDetailModal from './SchemeDetailModal.jsx';
import translations from '../translations.js';

export default function SchemeResults({ lang, matchedSchemes, profile }) {
  const t = translations[lang] || translations.en;
  const [selectedScheme, setSelectedScheme] = useState(null);

  if (!matchedSchemes?.length) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">{t.resultsHeadline}</h2>
          <p className="mt-4 text-slate-600">{t.noResults}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 rounded-[2rem] bg-white p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{t.resultsHeadline}</p>
          <p className="mt-2 text-slate-600">{t.verifyWarning}</p>
        </div>
      </div>
      <div className="grid gap-6">
        {matchedSchemes.map((item) => (
          <SchemeCard key={item.scheme.id} schemeData={item} lang={lang} onSelect={setSelectedScheme} />
        ))}
      </div>
      {selectedScheme && (
        <SchemeDetailModal scheme={selectedScheme} lang={lang} profile={profile} onClose={() => setSelectedScheme(null)} />
      )}
    </section>
  );
}
