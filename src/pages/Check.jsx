import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, ShieldCheck } from "lucide-react";
import EligibilityForm from "../components/EligibilityForm.jsx";
import { saveProfile } from "../utils/storage.js";
import translations from "../translations.js";

export default function Check({ lang, setProfile }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (form) => {
    saveProfile(form);
    if (setProfile) setProfile(form);
    navigate("/results");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* Editorial Header */}
      <section className="border-b border-[#E2E8F0] bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#123B63] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1F2937] font-medium">Eligibility Check</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937]">
                Check Your Scheme Eligibility
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
                Answer a few quick questions to discover matching welfare schemes, subsidies, and grants.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[#D1E3F1] bg-[#EAF2F8] px-3 py-1.5 text-xs font-medium text-[#123B63] self-start sm:self-auto">
              <ShieldCheck className="h-4 w-4" />
              <span>Independent & Confidential</span>
            </div>
          </div>

        </div>
      </section>

      {/* Questionnaire Form */}
      {ready && <EligibilityForm lang={lang} onSubmit={handleSubmit} />}

    </main>
  );
}
