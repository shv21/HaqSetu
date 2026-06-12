import Hero from "../components/Hero.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import translations from "../translations.js";

const processSteps = [
  {
    title: "Answer simple questions",
    description: "Provide your profile details in a clear and friendly form.",
  },
  {
    title: "Review top scheme matches",
    description:
      "See schemes tailored to your profile and key eligibility notes.",
  },
  {
    title: "Follow checklist and apply",
    description:
      "Use the document checklist, verify eligibility, and submit safely.",
  },
];

const stats = [
  { label: "Multilingual", value: "English, हिंदी, मराठी" },
  { label: "Pilot-ready", value: "10 sample welfare schemes" },
  { label: "Trusted", value: "Clear eligibility guidance" },
  { label: "Secure", value: "Safety guidance included" },
];

export default function Home({ lang, setLang }) {
  const t = translations[lang] || translations.en;

  return (
    <main>
      <Hero lang={lang} />
      <LanguageSelector lang={lang} setLang={setLang} />

      <section className="mx-auto max-w-screen-xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">
              {t.problemTitle}
            </h3>
            <p className="mt-4 text-slate-600 leading-7">{t.problemText}</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">
              {t.solutionTitle}
            </h3>
            <p className="mt-4 text-slate-600 leading-7">{t.appSolution}</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">
              {t.howItWorks}
            </h3>
            <p className="mt-4 text-slate-600 leading-7">
              {t.howItems.join(" ")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t.howItWorks}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white font-semibold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-slate-600 leading-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-4 text-base font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
