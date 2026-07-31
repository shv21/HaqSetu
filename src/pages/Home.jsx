import Hero from "../components/Hero.jsx";
import translations from "../translations.js";
import { useNavigate } from "react-router-dom";
import { saveProfile } from "../utils/storage.js";

const categories = [
  {
    id: "health",
    title: "Health & Medical (स्वास्थ्य)",
    icon: "🏥",
    desc: "Ayushman Bharat (PM-JAY), PMMVY Maternity Cash, Free Checkups",
    bg: "bg-red-50 text-red-900 border-red-200 hover:border-red-400",
    catPref: "health",
  },
  {
    id: "education",
    title: "Education & Scholarships (शिक्षा)",
    icon: "🎓",
    desc: "National Scholarship Portal (NSP), Fee Waivers, Student Aid",
    bg: "bg-blue-50 text-blue-900 border-blue-200 hover:border-blue-400",
    catPref: "education",
  },
  {
    id: "money",
    title: "Financial & Cash Benefits (पैसा/धन)",
    icon: "💰",
    desc: "PM-Kisan ₹6000, PM Vishwakarma ₹3Lakh, PM Jan Dhan Account",
    bg: "bg-emerald-50 text-emerald-900 border-emerald-200 hover:border-emerald-400",
    catPref: "money",
  },
  {
    id: "farmer",
    title: "Farmers & Agriculture (किसान)",
    icon: "🌾",
    desc: "PM Kisan Samman Nidhi, Agriculture Subsidies, Soil Health",
    bg: "bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400",
    catPref: "farmer",
  },
  {
    id: "skill",
    title: "Skill & Jobs (कौशल व रोजगार)",
    icon: "🛠️",
    desc: "PMKVY 4.0 Free Courses, e-Shram Card, PM Vishwakarma",
    bg: "bg-indigo-50 text-indigo-900 border-indigo-200 hover:border-indigo-400",
    catPref: "skill",
  },
  {
    id: "women",
    title: "Women & Child Welfare (महिला)",
    icon: "👩‍👧",
    desc: "Sukanya Samriddhi Yojana, Maternity Cash, Lakhpati Didi",
    bg: "bg-purple-50 text-purple-900 border-purple-200 hover:border-purple-400",
    catPref: "women",
  },
  {
    id: "housing",
    title: "Housing & Amenities (आवास)",
    icon: "🏠",
    desc: "PM Awas Yojana (Gramin & Urban), MGNREGA Job Card",
    bg: "bg-orange-50 text-orange-900 border-orange-200 hover:border-orange-400",
    catPref: "housing",
  },
];

export default function Home({ lang, setLang }) {
  const t = translations[lang] || translations.en;
  const navigate = useNavigate();

  const handleCategoryClick = (catPref) => {
    const profile = {
      fullName: "User",
      age: 25,
      gender: "female",
      state: "Uttar Pradesh",
      areaType: "rural",
      qualification: "secondary",
      occupation: "informal worker",
      categoryPreference: catPref,
      incomeRange: "< ₹10,000",
      hasAadhaar: true,
      hasMobileLinked: true,
      hasBankAccount: true,
      hasRationCard: true,
      hasIncomeCert: true,
    };
    saveProfile(profile);
    navigate("/results");
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Hero lang={lang} setLang={setLang} />

      {/* Explore Schemes by Category Section */}
      <section className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
            Browse By Category
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            What Kind of Government Scheme Are You Looking For?
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Select a scheme category below (Health, Education, Money, Farmers, etc.) to view verified government schemes instantly
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.catPref)}
              className={`rounded-3xl border p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${cat.bg}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl p-2 rounded-2xl bg-white/70 shadow-xs">{cat.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-3 text-xs font-bold">
                <span>View {cat.title.split(' ')[0]} Schemes →</span>
                <span className="text-emerald-700 bg-white/90 px-2.5 py-1 rounded-full shadow-xs">
                  Official Portals ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Visual Section */}
      <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-8 shadow-card border border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Simple & Transparent
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {t.howItWorks}
              </h2>
            </div>
            <button
              onClick={() => navigate("/check")}
              className="mt-4 md:mt-0 btn-primary"
            >
              <span>{t.startCheck}</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                num: "1",
                icon: "✍️",
                title: "Enter Details & Category",
                desc: "Choose Health, Education, Money, or Farmers and enter basic age & location.",
              },
              {
                num: "2",
                icon: "📊",
                title: "Get Verified Schemes",
                desc: "Our engine checks official rulebooks and shows match scores.",
              },
              {
                num: "3",
                icon: "🛡️",
                title: "Apply at Official Portals",
                desc: "Follow document checklists and click direct links to .gov.in portals.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl bg-slate-50 p-6 border border-slate-100 relative group transition hover:border-emerald-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Bottom Bar for Mobile Users */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <button
          onClick={() => navigate("/check")}
          className="w-full rounded-2xl bg-emerald-600 py-4 px-6 text-center text-base font-bold text-white shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <span>🔍</span>
          <span>{t.startCheck}</span>
        </button>
      </div>
    </main>
  );
}
