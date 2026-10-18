import { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  SlidersHorizontal, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ShieldCheck, 
  Filter, 
  ArrowUpDown,
  X
} from "lucide-react";
import SchemeCard from "./SchemeCard.jsx";
import SchemeDetailModal from "./SchemeDetailModal.jsx";
import translations from "../translations.js";
import { getSavedSchemeIds } from "../utils/storage.js";

export default function SchemeResults({ lang, matchedSchemes = [], profile, initialCategory }) {
  const t = translations[lang] || translations.en;
  
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(initialCategory || profile?.categoryPreference || "all");
  const [filterState, setFilterState] = useState("all");
  const [filterDocReadiness, setFilterDocReadiness] = useState("all"); // "all" | "ready" | "needs_docs"
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("score"); // "score" | "name_asc" | "category"
  const [savedIds, setSavedIds] = useState([]);

  // Check saved schemes from localStorage
  useEffect(() => {
    setSavedIds(getSavedSchemeIds());
  }, [showSavedOnly, selectedScheme]);

  const categoryTabs = [
    { id: "all", label: "All Categories" },
    { id: "health", label: "Health & Medical" },
    { id: "education", label: "Education & Student" },
    { id: "money", label: "Financial Aid" },
    { id: "farmer", label: "Farmers & Agriculture" },
    { id: "skill", label: "Skill & Jobs" },
    { id: "housing", label: "Housing & Amenities" },
  ];

  // Extract unique states available
  const availableStates = useMemo(() => {
    const states = new Set();
    matchedSchemes.forEach((item) => {
      if (item.scheme.state) states.add(item.scheme.state);
    });
    return Array.from(states);
  }, [matchedSchemes]);

  // Filtering & Sorting Pipeline
  const filteredList = useMemo(() => {
    return matchedSchemes
      .filter((item) => {
        const { scheme, missingDocuments } = item;

        // Search text query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = scheme.name?.toLowerCase().includes(q);
          const matchShort = scheme.shortName?.toLowerCase().includes(q);
          const matchDept = scheme.officialSourceName?.toLowerCase().includes(q);
          const matchDesc = scheme.description?.toLowerCase().includes(q);
          const matchTags = scheme.tags?.some((tag) => tag.toLowerCase().includes(q));
          if (!matchName && !matchShort && !matchDept && !matchDesc && !matchTags) {
            return false;
          }
        }

        // Category filter
        if (filterCategory !== "all") {
          const matchCat = scheme.category?.toLowerCase() === filterCategory.toLowerCase();
          const matchTags = scheme.tags?.some((t) => t.toLowerCase().includes(filterCategory.toLowerCase()));
          if (!matchCat && !matchTags) return false;
        }

        // State filter
        if (filterState !== "all") {
          if (scheme.state && scheme.state !== filterState) return false;
        }

        // Document readiness filter
        if (filterDocReadiness === "ready" && missingDocuments.length > 0) {
          return false;
        }
        if (filterDocReadiness === "needs_docs" && missingDocuments.length === 0) {
          return false;
        }

        // Saved schemes filter
        if (showSavedOnly && !savedIds.includes(scheme.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "score") {
          return b.score - a.score;
        }
        if (sortBy === "name_asc") {
          return a.scheme.name.localeCompare(b.scheme.name);
        }
        if (sortBy === "category") {
          return (a.scheme.category || "").localeCompare(b.scheme.category || "");
        }
        return 0;
      });
  }, [
    matchedSchemes,
    searchQuery,
    filterCategory,
    filterState,
    filterDocReadiness,
    showSavedOnly,
    sortBy,
    savedIds,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterState("all");
    setFilterDocReadiness("all");
    setShowSavedOnly(false);
    setSortBy("score");
  };

  const hasActiveFilters = 
    searchQuery !== "" || 
    filterCategory !== "all" || 
    filterState !== "all" || 
    filterDocReadiness !== "all" || 
    showSavedOnly;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Estimated Eligibility Match Disclaimer Note */}
      <div className="mb-6 rounded-lg border border-[#D1E3F1] bg-[#F0F6FB] p-3.5 text-xs text-[#123B63] flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#123B63]" />
          <span>
            <strong>Estimated Eligibility Match:</strong> Scores are calculated based on official criteria. Final application approval is determined by the responsible government authority upon document verification.
          </span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="mb-6 rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-card space-y-4">
        
        {/* Search Bar & Primary Filter Controls */}
        <div className="grid gap-3 md:grid-cols-12 md:items-center">
          
          {/* Live Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name, keywords, or department..."
              className="input-clean pl-9 pr-8 text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* State Filter */}
          <div className="md:col-span-3">
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="select-clean text-xs sm:text-sm"
              aria-label="Filter by region"
            >
              <option value="all">All Regions & Central</option>
              {availableStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-clean text-xs sm:text-sm"
              aria-label="Sort schemes"
            >
              <option value="score">Highest Match</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="category">Category</option>
            </select>
          </div>

          {/* Saved Schemes Toggle Button */}
          <div className="md:col-span-2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`w-full inline-flex items-center justify-center gap-1.5 rounded-lg border py-2 px-3 text-xs font-medium transition-colors ${
                showSavedOnly
                  ? "border-[#123B63] bg-[#EAF2F8] text-[#123B63] font-semibold"
                  : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${showSavedOnly ? "fill-[#123B63]" : ""}`} />
              <span>Saved ({savedIds.length})</span>
            </button>
          </div>

        </div>

        {/* Category Filter Chips & Document Readiness */}
        <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Scrollable Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categoryTabs.map((tab) => {
              const isSelected = filterCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterCategory(tab.id)}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-[#123B63] text-white font-semibold shadow-xs"
                      : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:bg-slate-100 hover:text-[#1F2937]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Document Readiness Pill Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-[#64748B] hidden lg:inline">Documents:</span>
            <select
              value={filterDocReadiness}
              onChange={(e) => setFilterDocReadiness(e.target.value)}
              className="select-clean text-xs py-1.5 px-2.5 w-auto"
            >
              <option value="all">All Documents Status</option>
              <option value="ready">Essential Documents Ready</option>
              <option value="needs_docs">Documents Needed</option>
            </select>
          </div>

        </div>

        {/* Summary Count & Clear Filter Action */}
        <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
          <span>
            Showing <strong className="text-[#1F2937]">{filteredList.length}</strong> of {matchedSchemes.length} matching schemes
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#123B63] hover:underline inline-flex items-center gap-1 font-medium"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Scheme Cards Grid */}
      {filteredList.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredList.map((item) => (
            <SchemeCard
              key={item.scheme.id}
              schemeData={item}
              lang={lang}
              onSelect={setSelectedScheme}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-12 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2F8] text-[#123B63] mb-4">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1F2937]">
            No schemes matched your current filters
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
            Try loosening your search keywords, switching the category tab, or clearing the document readiness filter to see more results.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-primary text-xs py-2 px-4"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          lang={lang}
          profile={profile}
          onClose={() => setSelectedScheme(null)}
        />
      )}

    </section>
  );
}
