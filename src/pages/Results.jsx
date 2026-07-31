import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../translations.js";
import { matchSchemes } from "../utils/matchSchemes.js";
import { saveAnalytics, loadProfile } from "../utils/storage.js";
import SchemeResults from "../components/SchemeResults.jsx";

export default function Results({ lang, profile: propsProfile, onUpdateMatched }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  const [profile, setLocalProfile] = useState(propsProfile || loadProfile());
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const activeProfile = propsProfile || loadProfile();
    if (!activeProfile) {
      navigate("/check");
      return;
    }
    setLocalProfile(activeProfile);
    const results = matchSchemes(activeProfile);
    setMatched(results);
    if (typeof onUpdateMatched === "function") {
      onUpdateMatched(results);
    }
    const topScheme = results[0]?.scheme?.shortName || "None";
    saveAnalytics({
      date: new Date().toISOString(),
      lang,
      occupation: activeProfile.occupation,
      areaType: activeProfile.areaType,
      topScheme,
      missingDocuments: results[0]?.missingDocuments || [],
    });
  }, [propsProfile, lang, navigate, onUpdateMatched]);

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Personalized Header Banner */}
      <section className="bg-emerald-900 text-white py-10 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
                ✨ Search Results Ready
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Schemes for {profile.fullName || "User"}
              </h1>
              <p className="text-emerald-200/90 text-sm mt-1 flex flex-wrap gap-x-3 gap-y-1">
                <span>🎂 Age: <strong>{profile.age} yrs</strong></span>
                <span>•</span>
                <span>🎓 Qualification: <strong>{t.eduLevels?.[profile.qualification] || profile.qualification || "Standard"}</strong></span>
                <span>•</span>
                <span>📍 Location: <strong>{profile.address ? `${profile.address}, ` : ""}{profile.state || "India"}</strong></span>
              </p>
            </div>

            <button
              onClick={() => navigate("/check")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 backdrop-blur transition border border-white/20 self-start md:self-auto"
            >
              <span>✏️ Modify Search Details</span>
            </button>
          </div>
        </div>
      </section>

      <SchemeResults lang={lang} matchedSchemes={matched} profile={profile} />
    </main>
  );
}
