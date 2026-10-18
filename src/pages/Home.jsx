import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Sprout, 
  Heart, 
  Activity, 
  Briefcase, 
  Coins, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Shield, 
  Clock,
  Sparkles
} from "lucide-react";
import Hero from "../components/Hero.jsx";
import translations from "../translations.js";
import { saveProfile, getRecentlyViewed } from "../utils/storage.js";

const CATEGORY_ITEMS = [
  {
    id: "education",
    catPref: "education",
    title: "Scholarships & Students",
    subtitle: "National Scholarship Portal (NSP), fee waivers & higher education grants",
    icon: GraduationCap,
  },
  {
    id: "farmer",
    catPref: "farmer",
    title: "Farmers & Agriculture",
    subtitle: "PM-Kisan income support, crop insurance & agricultural subsidies",
    icon: Sprout,
  },
  {
    id: "women",
    catPref: "women",
    title: "Women & Child Welfare",
    subtitle: "Sukanya Samriddhi, PMMVY maternity benefits & self-help schemes",
    icon: Heart,
  },
  {
    id: "health",
    catPref: "health",
    title: "Healthcare & Insurance",
    subtitle: "Ayushman Bharat (PM-JAY) cashless hospital cover up to ₹5 Lakh",
    icon: Activity,
  },
  {
    id: "skill",
    catPref: "skill",
    title: "Artisans, Skill & Jobs",
    subtitle: "PM Vishwakarma toolkits, PMKVY training & e-Shram worker benefits",
    icon: Briefcase,
  },
  {
    id: "money",
    catPref: "money",
    title: "Financial Assistance",
    subtitle: "PM Jan Dhan, PM SVANidhi micro-loans & direct cash transfers",
    icon: Coins,
  },
];

export default function Home({ lang, setLang }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed());
  }, []);

  const handleCategoryClick = (catPref) => {
    const profile = {
      fullName: "Citizen",
      age: 26,
      gender: "male",
      state: "Uttar Pradesh",
      areaType: "rural",
      qualification: "secondary",
      occupation: catPref === "farmer" ? "farmer" : catPref === "education" ? "student" : "informal worker",
      categoryPreference: catPref,
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
    navigate(`/results?category=${catPref}`);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <Hero lang={lang} setLang={setLang} />

      {/* Recently Viewed Schemes Strip (if any exist) */}
      {recentlyViewed.length > 0 && (
        <section className="border-b border-[#E2E8F0] bg-white py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
                <Clock className="h-4 w-4 text-[#123B63]" />
                <span>Recently Viewed:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {recentlyViewed.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(`/results?scheme=${encodeURIComponent(item.id)}`)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-medium text-[#1F2937] hover:border-[#123B63] hover:text-[#123B63] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="h-3 w-3 text-[#64748B]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Shortcuts Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#123B63]">
              Curated Discovery
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937]">
              Explore Schemes by Category
            </h2>
            <p className="mt-2 text-sm text-[#64748B]">
              Jump straight into verified central and state welfare programs categorized for your specific needs.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_ITEMS.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.catPref)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleCategoryClick(cat.catPref);
                  }}
                  className="group relative rounded-xl border border-[#E2E8F0] bg-white p-6 transition-all duration-150 hover:border-[#123B63] hover:shadow-cardHover cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#123B63]/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63] group-hover:bg-[#123B63] group-hover:text-white transition-colors duration-150">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-[#64748B] group-hover:text-[#123B63] flex items-center gap-1 transition-colors">
                      View schemes <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-[#1F2937] group-hover:text-[#123B63] transition-colors">
                    {cat.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#64748B] leading-relaxed">
                    {cat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => navigate("/results")}
              className="text-xs font-semibold text-[#123B63] hover:underline inline-flex items-center gap-1"
            >
              <span>Browse complete catalog of all schemes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-t border-[#E2E8F0] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#123B63]">
                Simple & Transparent
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937]">
                How HaqSetu Works
              </h2>
              <p className="mt-2 text-sm text-[#64748B] max-w-xl">
                A non-governmental discovery engine designed to bridge information gaps for Indian citizens.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/check")}
              className="btn-primary self-start md:self-auto"
            >
              <span>Start Eligibility Check</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enter Basic Profile",
                description:
                  "Share simple demographic details like age, location, occupation, and available documents in a confidential 3-step questionnaire.",
                badge: "Takes < 2 mins",
              },
              {
                step: "02",
                title: "Evaluate Rule Matches",
                description:
                  "Our rule engine analyzes your profile against official government eligibility criteria and calculates transparent match scores.",
                badge: "Rule-Based Engine",
              },
              {
                step: "03",
                title: "Apply on Official Portals",
                description:
                  "Review ready-to-use document checklists and follow direct links to apply securely on verified .gov.in portals.",
                badge: "Direct Official Links",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all duration-150 hover:bg-white hover:border-[#123B63] hover:shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#123B63]/30 tracking-tight font-mono">
                    {item.step}
                  </span>
                  <span className="rounded bg-white border border-[#E2E8F0] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1F2937]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust & Fraud Advisory Banner */}
      <section className="border-t border-[#E2E8F0] bg-[#EAF2F8] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#123B63] text-white">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#123B63]">
                  100% Free Information • Zero Intermediary Fees
                </h3>
                <p className="mt-1 text-xs text-[#1F2937]/80 max-w-2xl leading-relaxed">
                  HaqSetu never requests OTPs, passwords, or fees. Government scheme applications are strictly processed through official departments and verified Common Service Centres (CSC).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigate("/safety")}
                className="btn-outline text-xs py-2 px-3.5"
              >
                Read Safety Guide
              </button>
              <button
                type="button"
                onClick={() => navigate("/check")}
                className="btn-primary text-xs py-2 px-3.5"
              >
                Check Eligibility
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
