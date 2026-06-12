import translations from "../translations.js";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
];

export default function LanguageSelector({ lang, setLang }) {
  const t = translations[lang] || translations.en;
  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              {t.languageLabel}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {t.languageLabel}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {languageOptions.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  item.code === lang
                    ? "bg-primary text-white shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-primary hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500 sm:text-right">
            {t.statusReady}
          </p>
        </div>
      </div>
    </section>
  );
}
