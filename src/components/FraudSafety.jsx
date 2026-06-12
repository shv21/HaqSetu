import translations from "../translations.js";

export default function FraudSafety({ lang }) {
  const t = translations[lang] || translations.en;
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <h2 className="text-3xl font-semibold text-slate-900">
          {t.safetyTitle}
        </h2>
        <p className="mt-4 text-slate-600">{t.safetyIntro}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {t.safetyList.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
