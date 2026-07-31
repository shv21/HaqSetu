import { useState } from 'react';
import SchemeCard from './SchemeCard.jsx';
import SchemeDetailModal from './SchemeDetailModal.jsx';
import translations from '../translations.js';

export default function SchemeResults({ lang, matchedSchemes, profile }) {
  const t = translations[lang] || translations.en;
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [filterCategory, setFilterCategory] = useState(profile?.categoryPreference || "all");

  if (!matchedSchemes?.length) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-10 text-center shadow-card border border-slate-200">
          <span className="text-4xl">🔍</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-3">{t.resultsHeadline}</h2>
          <p className="mt-2 text-slate-600 max-w-md mx-auto">{t.noResults}</p>
        </div>
      </section>
    );
  }

  const categoryTabs = [
    { id: "all", label: t.categories?.all || "All Categories", icon: "🌐" },
    { id: "health", label: t.categories?.health || "Health 🏥", icon: "🏥" },
    { id: "education", label: t.categories?.education || "Education 🎓", icon: "🎓" },
    { id: "money", label: t.categories?.money || "Money & Cash 💰", icon: "💰" },
    { id: "farmer", label: t.categories?.farmer || "Farmers 🌾", icon: "🌾" },
    { id: "skill", label: t.categories?.skill || "Skill & Jobs 🛠️", icon: "🛠️" },
    { id: "housing", label: t.categories?.housing || "Housing 🏠", icon: "🏠" },
  ];

  const filteredList = filterCategory === "all"
    ? matchedSchemes
    : matchedSchemes.filter(item => 
        item.scheme.category?.toLowerCase() === filterCategory ||
        item.scheme.tags?.some(tag => tag.toLowerCase().includes(filterCategory)) ||
        item.scheme.name?.toLowerCase().includes(filterCategory)
      );

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Safety Notice */}
      <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-900 text-xs sm:text-sm font-medium flex items-center gap-3">
        <span className="text-lg">🛡️</span>
        <span>{t.verifyWarning} {t.fraudWarning}</span>
      </div>

      {/* Interactive Category Tabs Header */}
      <div className="mb-6 rounded-3xl bg-white p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span>🎯</span> Filter Schemes by Category
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Showing {filteredList.length} of {matchedSchemes.length} Matched Schemes
          </span>
        </div>

        {/* Scrollable Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map(tab => {
            const count = tab.id === "all" 
              ? matchedSchemes.length
              : matchedSchemes.filter(item => 
                  item.scheme.category?.toLowerCase() === tab.id ||
                  item.scheme.tags?.some(tag => tag.toLowerCase().includes(tab.id))
                ).length;

            return (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  filterCategory === tab.id
                    ? "bg-emerald-600 text-white shadow-md scale-[1.02]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  filterCategory === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scheme Cards List */}
      {filteredList.length > 0 ? (
        <div className="grid gap-6">
          {filteredList.map((item) => (
            <SchemeCard key={item.scheme.id} schemeData={item} lang={lang} onSelect={setSelectedScheme} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-8 text-center border border-slate-200 my-4">
          <p className="text-base font-semibold text-slate-700">No schemes found specifically under this category tab.</p>
          <button
            onClick={() => setFilterCategory("all")}
            className="mt-3 btn-secondary text-xs py-2 px-4"
          >
            Show All {matchedSchemes.length} Schemes
          </button>
        </div>
      )}

      {selectedScheme && (
        <SchemeDetailModal scheme={selectedScheme} lang={lang} profile={profile} onClose={() => setSelectedScheme(null)} />
      )}
    </section>
  );
}
