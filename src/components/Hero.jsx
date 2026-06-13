import translations from "../translations.js";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Local-language guidance",
    description:
      "Choose English, Hindi, or Marathi with simple local-language support.",
  },
  {
    title: "Rule-based matching",
    description: "Eligibility is assessed by clear rules, not AI guesses.",
  },
  {
    title: "Safe next steps",
    description: "Check documents and verify through official channels.",
  },
];

export default function Hero({ lang, setLang }) {
  const t = translations[lang] || translations.en;
  return (
    <section className="bg-[#F6F8F7]">
      <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              {t.siteName}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              {t.slogan}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {t.subheadline}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/check"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-hover"
              >
                {t.startCheck}
              </Link>
              <Link
                to="/safety"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary hover:text-primary"
              >
                {t.viewSafety}
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  3 Languages
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  English, Hindi, Marathi
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  10 Sample Schemes
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Built for early impact and testing.
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  Trusted guidance
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Clear eligibility advice and next steps.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-900">
                Why HaqSetu
              </h2>
              <div className="mt-6 space-y-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-3xl bg-[#F6F8F7] p-5"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {feature.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <LanguageSelector
              lang={lang}
              setLang={setLang}
              wrapperClassName=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
