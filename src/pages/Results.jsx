import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../translations.js";
import { matchSchemes } from "../utils/matchSchemes.js";
import { saveAnalytics } from "../utils/storage.js";
import SchemeResults from "../components/SchemeResults.jsx";

export default function Results({ lang, profile, onUpdateMatched }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (!profile) {
      navigate("/check");
      return;
    }
    const results = matchSchemes(profile);
    setMatched(results);
    if (typeof onUpdateMatched === "function") {
      onUpdateMatched(results);
    }
    const topScheme = results[0]?.scheme?.shortName || "None";
    saveAnalytics({
      date: new Date().toISOString(),
      lang,
      occupation: profile.occupation,
      areaType: profile.areaType,
      topScheme,
      missingDocuments: results[0]?.missingDocuments || [],
    });
  }, [profile, lang, navigate, onUpdateMatched]);

  return (
    <main>
      <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-slate-900">
            {t.resultsHeadline}
          </h1>
          <p className="mt-3 text-slate-600 leading-7">{t.verifyWarning}</p>
        </div>
      </section>
      <SchemeResults lang={lang} matchedSchemes={matched} profile={profile} />
    </main>
  );
}
