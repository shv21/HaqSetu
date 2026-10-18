import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { 
  ChevronRight, 
  Edit3, 
  Sparkles, 
  CheckSquare, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  User,
  SlidersHorizontal
} from "lucide-react";
import translations from "../translations.js";
import { matchSchemes } from "../utils/matchSchemes.js";
import { saveAnalytics, loadProfile } from "../utils/storage.js";
import SchemeResults from "../components/SchemeResults.jsx";

const DEFAULT_PROFILE = {
  fullName: "Citizen",
  age: 26,
  gender: "male",
  state: "Uttar Pradesh",
  areaType: "rural",
  qualification: "secondary",
  occupation: "informal worker",
  categoryPreference: "all",
  incomeRange: "< ₹10,000",
  hasAadhaar: true,
  hasMobileLinked: true,
  hasBankAccount: true,
  hasRationCard: true,
  hasIncomeCert: true,
  hasCasteCert: false,
  hasDisabilityCert: false,
};

export default function Results({ lang, profile: propsProfile, onUpdateMatched }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [profile, setLocalProfile] = useState(() => propsProfile || loadProfile() || DEFAULT_PROFILE);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const activeProfile = propsProfile || loadProfile() || DEFAULT_PROFILE;
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
  }, [propsProfile, lang, onUpdateMatched]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* Refined Results Header Banner */}
      <section className="border-b border-[#E2E8F0] bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#123B63] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1F2937] font-medium">Scheme Results</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D1E3F1] bg-[#EAF2F8] px-2.5 py-0.5 text-xs font-semibold text-[#123B63]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Rule-Based Matches Ready</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937]">
                Government Schemes for {profile.fullName || "Citizen"}
              </h1>

              {/* Profile summary badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#64748B]">
                <span className="inline-flex items-center gap-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 font-medium text-[#1F2937]">
                  <User className="h-3 w-3 text-[#64748B]" />
                  <span>{profile.age} yrs • {profile.gender || "Citizen"}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 font-medium text-[#1F2937] capitalize">
                  <Briefcase className="h-3 w-3 text-[#64748B]" />
                  <span>{profile.occupation || "Worker"}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 font-medium text-[#1F2937]">
                  <MapPin className="h-3 w-3 text-[#64748B]" />
                  <span>{profile.state || "All India"} ({profile.areaType || "Rural"})</span>
                </span>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/checklist"
                className="btn-outline text-xs py-2 px-3.5"
                title="View consolidated document checklist"
              >
                <CheckSquare className="h-4 w-4 text-[#123B63]" />
                <span className="hidden sm:inline">Application Checklist</span>
                <span className="sm:hidden">Checklist</span>
              </Link>

              <button
                type="button"
                onClick={() => navigate("/check")}
                className="btn-primary text-xs py-2 px-3.5"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Modify Profile</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Scheme Results Component with Filter Engine */}
      <SchemeResults
        lang={lang}
        matchedSchemes={matched}
        profile={profile}
        initialCategory={categoryParam}
      />

    </main>
  );
}
