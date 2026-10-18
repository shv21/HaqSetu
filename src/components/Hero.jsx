import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, ShieldCheck, CheckCircle2, Sparkles, SlidersHorizontal } from "lucide-react";
import translations from "../translations.js";
import { saveProfile } from "../utils/storage.js";

const STATES = [
  "All India (Central)",
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", 
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

const OCCUPATION_OPTIONS = [
  { value: "informal worker", label: "Informal / Daily Wage Worker" },
  { value: "farmer", label: "Farmer / Agriculture" },
  { value: "student", label: "Student / Youth" },
  { value: "street vendor", label: "Street Vendor / Artisan" },
  { value: "homemaker", label: "Homemaker / Mother" },
  { value: "self-employed", label: "Self-Employed / Small Business" },
];

export default function Hero({ lang }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();

  const [quickForm, setQuickForm] = useState({
    fullName: "",
    age: "26",
    state: "Uttar Pradesh",
    occupation: "informal worker",
    categoryPreference: "all",
  });

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const profile = {
      fullName: quickForm.fullName.trim() || "Citizen",
      age: Number(quickForm.age) || 26,
      gender: "male",
      state: quickForm.state === "All India (Central)" ? "Uttar Pradesh" : quickForm.state,
      areaType: "rural",
      qualification: "secondary",
      occupation: quickForm.occupation,
      categoryPreference: quickForm.categoryPreference,
      incomeRange: "< ₹10,000",
      hasAadhaar: true,
      hasMobileLinked: true,
      hasBankAccount: true,
      hasRationCard: true,
      hasIncomeCert: true,
      hasCasteCert: false,
      hasDisabilityCert: false,
    };
    saveProfile(profile);
    navigate("/results");
  };

  return (
    <section className="relative border-b border-[#E2E8F0] bg-white py-14 sm:py-20 lg:py-24">
      {/* Subtle top background highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F6FB]/70 via-transparent to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Indicator Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D1E3F1] bg-[#EAF2F8] px-3.5 py-1 text-xs font-semibold text-[#123B63]">
              <ShieldCheck className="h-4 w-4 text-[#123B63]" />
              <span>Independent Citizen Discovery Platform • 100% Free</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1F2937] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
              Find Government Schemes You’re Eligible For
            </h1>

            {/* Supporting Copy */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#64748B]">
              Discover benefits, scholarships, financial assistance, and welfare schemes based on your profile — all in one place with verified official government links.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/check")}
                className="btn-primary py-3 px-5 text-base shadow-sm"
              >
                <span>Find My Schemes</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/results")}
                className="btn-outline py-3 px-5 text-base"
              >
                <Search className="h-4 w-4 text-[#64748B]" />
                <span>Explore All Schemes</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs text-[#1F2937]">
                <CheckCircle2 className="h-4 w-4 text-[#13805B] shrink-0" />
                <span>Verified .gov.in links</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#1F2937]">
                <CheckCircle2 className="h-4 w-4 text-[#13805B] shrink-0" />
                <span>Rule-based match engine</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#1F2937]">
                <CheckCircle2 className="h-4 w-4 text-[#13805B] shrink-0" />
                <span>English, Hindi & Marathi</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean SaaS Quick Finder Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-7 shadow-card">
              
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-5">
                <div>
                  <h2 className="text-base font-semibold text-[#1F2937] flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-[#123B63]" />
                    <span>Quick Eligibility Check</span>
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Match schemes instantly with your basic details
                  </p>
                </div>
                <span className="rounded-full bg-[#E7F5EE] px-2.5 py-0.5 text-[11px] font-semibold text-[#13805B]">
                  Live Filter
                </span>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="quick-name" className="block text-xs font-medium text-[#1F2937] mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    id="quick-name"
                    type="text"
                    value={quickForm.fullName}
                    onChange={(e) => setQuickForm({ ...quickForm, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="input-clean text-xs"
                  />
                </div>

                {/* Age & State Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="quick-age" className="block text-xs font-medium text-[#1F2937] mb-1">
                      Age
                    </label>
                    <input
                      id="quick-age"
                      type="number"
                      min="10"
                      max="100"
                      value={quickForm.age}
                      onChange={(e) => setQuickForm({ ...quickForm, age: e.target.value })}
                      className="input-clean text-xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="quick-state" className="block text-xs font-medium text-[#1F2937] mb-1">
                      State / Region
                    </label>
                    <select
                      id="quick-state"
                      value={quickForm.state}
                      onChange={(e) => setQuickForm({ ...quickForm, state: e.target.value })}
                      className="select-clean text-xs"
                    >
                      {STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Occupation */}
                <div>
                  <label htmlFor="quick-occ" className="block text-xs font-medium text-[#1F2937] mb-1">
                    Occupation / Beneficiary Group
                  </label>
                  <select
                    id="quick-occ"
                    value={quickForm.occupation}
                    onChange={(e) => setQuickForm({ ...quickForm, occupation: e.target.value })}
                    className="select-clean text-xs"
                  >
                    {OCCUPATION_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>

                {/* Category Preference */}
                <div>
                  <label htmlFor="quick-cat" className="block text-xs font-medium text-[#1F2937] mb-1">
                    Scheme Category
                  </label>
                  <select
                    id="quick-cat"
                    value={quickForm.categoryPreference}
                    onChange={(e) => setQuickForm({ ...quickForm, categoryPreference: e.target.value })}
                    className="select-clean text-xs"
                  >
                    <option value="all">All Categories (Health, Education, Money, etc.)</option>
                    <option value="health">Healthcare & Medical Insurance</option>
                    <option value="education">Scholarships & Education</option>
                    <option value="money">Financial Assistance & Direct Benefit</option>
                    <option value="farmer">Agriculture & Farmers</option>
                    <option value="skill">Skill Training & Self-Employment</option>
                    <option value="housing">Housing & Urban/Rural Amenities</option>
                  </select>
                </div>

                {/* Action Button */}
                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 mt-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Check Matching Schemes</span>
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/check")}
                    className="text-xs text-[#123B63] hover:underline font-medium"
                  >
                    Want guided step-by-step questions? Start Questionnaire →
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
