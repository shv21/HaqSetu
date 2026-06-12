import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EligibilityForm from "../components/EligibilityForm.jsx";
import { saveProfile } from "../utils/storage.js";
import translations from "../translations.js";

export default function Check({ lang, setProfile }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const handleSubmit = (form) => {
    saveProfile(form);
    setProfile(form);
    navigate("/results");
  };

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-semibold text-slate-900">
            {t.startCheck}
          </h1>
          <p className="mt-3 text-slate-600">{t.formIntro}</p>
        </div>
      </section>
      {ready && <EligibilityForm lang={lang} onSubmit={handleSubmit} />}
    </main>
  );
}
