import translations from "../translations.js";

export default function About({ lang }) {
  const t = translations[lang] || translations.en;
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-slate-900">
            {t.aboutTitle}
          </h1>
          <div className="mt-6 space-y-6 text-slate-600">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {t.problemTitle}
              </h2>
              <p>{t.problemText}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {t.solutionTitle}
              </h2>
              <p>{t.appSolution}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Responsible AI
              </h2>
              <p>
                The platform uses rule-based matching for eligibility. AI only
                simplifies the explanation and translates content. Final
                verification is always recommended on the official portal or
                nearest CSC.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {t.disclaimerTitle}
              </h2>
              <p>
                This app provides guidance only. It does not replace official
                government verification or certified advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
