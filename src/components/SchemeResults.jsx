import { useState, useMemo, useEffect, useRef } from "react";
import { 
  Search, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ShieldCheck, 
  ArrowUpDown,
  X,
  Sparkles,
  Info
} from "lucide-react";
import SchemeCard from "./SchemeCard.jsx";
import SchemeDetailModal from "./SchemeDetailModal.jsx";
import translations from "../translations.js";
import { getSavedSchemeIds } from "../utils/storage.js";

const CATEGORY_TABS = [
  { id: "all", label: "All Categories" },
  { id: "health", label: "Health & Medical" },
  { id: "education", label: "Education & Student" },
  { id: "money", label: "Financial Aid" },
  { id: "farmer", label: "Farmers & Agriculture" },
  { id: "skill", label: "Skill & Jobs" },
  { id: "housing", label: "Housing & Amenities" },
];

/**
 * Checks whether a scheme matches the search query.
 * Breaks down the query into individual tokens and tests against all searchable fields.
 */
function matchesSearchQuery(scheme, query) {
  if (!query || !query.trim()) return true;

  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const searchableCorpus = [
    scheme.name,
    scheme.shortName,
    scheme.category,
    scheme.officialSourceName,
    scheme.description,
    scheme.benefit,
    "yojana", "yojna", "scheme", "sarkari", "govt", "card",
    ...(scheme.tags || []),
    ...(scheme.targetUsers || []),
    ...(scheme.requiredDocuments || []),
    ...(scheme.optionalDocuments || []),
    ...(scheme.applySteps || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Every token entered must be found in the scheme's text
  return tokens.every((token) => searchableCorpus.includes(token));
}

export default function SchemeResults({ lang, matchedSchemes = [], profile, initialCategory }) {
  const t = translations[lang] || translations.en;
  const searchInputRef = useRef(null);
  
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(initialCategory || profile?.categoryPreference || "all");
  const [filterState, setFilterState] = useState("all");
  const [filterDocReadiness, setFilterDocReadiness] = useState("all"); // "all" | "ready" | "needs_docs"
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("score"); // "score" | "name_asc" | "category"
  const [savedIds, setSavedIds] = useState([]);

  // Sync saved schemes from localStorage
  useEffect(() => {
    setSavedIds(getSavedSchemeIds());
  }, [showSavedOnly, selectedScheme]);

  // Extract unique states available in the dataset
  const availableStates = useMemo(() => {
    const states = new Set();
    matchedSchemes.forEach((item) => {
      if (item.scheme.state) states.add(item.scheme.state);
    });
    return Array.from(states);
  }, [matchedSchemes]);

  // Count schemes matching search across ALL categories (to detect cross-category results)
  const allCategorySearchMatches = useMemo(() => {
    if (!searchQuery.trim()) return matchedSchemes;
    return matchedSchemes.filter((item) => matchesSearchQuery(item.scheme, searchQuery));
  }, [matchedSchemes, searchQuery]);

  // Calculate dynamic count for each category tab
  const categoryCounts = useMemo(() => {
    const counts = {};
    CATEGORY_TABS.forEach((tab) => {
      if (tab.id === "all") {
        counts[tab.id] = allCategorySearchMatches.length;
      } else {
        counts[tab.id] = allCategorySearchMatches.filter((item) => {
          const cat = item.scheme.category?.toLowerCase();
          const tags = item.scheme.tags?.map((t) => t.toLowerCase()) || [];
          return cat === tab.id || tags.includes(tab.id);
        }).length;
      }
    });
    return counts;
  }, [allCategorySearchMatches]);

  // Primary Filtering & Sorting Pipeline
  const filteredList = useMemo(() => {
    return matchedSchemes
      .filter((item) => {
        const { scheme, missingDocuments } = item;

        // 1. Full-text tokenized search match
        if (!matchesSearchQuery(scheme, searchQuery)) {
          return false;
        }

        // 2. Category filter
        if (filterCategory !== "all") {
          const matchCat = scheme.category?.toLowerCase() === filterCategory.toLowerCase();
          const matchTags = scheme.tags?.some((t) => t.toLowerCase().includes(filterCategory.toLowerCase()));
          if (!matchCat && !matchTags) return false;
        }

        // 3. State/Region filter
        if (filterState !== "all") {
          if (scheme.state && scheme.state !== filterState) return false;
        }

        // 4. Document readiness filter
        if (filterDocReadiness === "ready" && missingDocuments.length > 0) {
          return false;
        }
        if (filterDocReadiness === "needs_docs" && missingDocuments.length === 0) {
          return false;
        }

        // 5. Saved schemes filter
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
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const hasActiveFilters = 
    searchQuery.trim() !== "" || 
    filterCategory !== "all" || 
    filterState !== "all" || 
    filterDocReadiness !== "all" || 
    showSavedOnly;

  // Detect if user has 0 results in current category, but matches exist in other categories
  const hasCrossCategoryResults = 
    searchQuery.trim() !== "" && 
    filterCategory !== "all" && 
    filteredList.length === 0 && 
    allCategorySearchMatches.length > 0;

  const currentCategoryName = CATEGORY_TABS.find((t) => t.id === filterCategory)?.label || filterCategory;

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
          
          {/* Live Search Input with Fixed Spacing */}
          <div className="md:col-span-5 relative flex items-center">
            {/* Search Icon: strictly positioned with pointer-events-none so it never intercepts click or overlaps text */}
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 flex items-center justify-center text-[#64748B]">
              <Search className="h-4 w-4" />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scheme name, keywords, or department..."
              style={{ paddingLeft: "2.65rem", paddingRight: "2.5rem" }}
              className="w-full rounded-lg border border-[#E2E8F0] bg-white py-2.5 text-xs sm:text-sm text-[#1F2937] placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-[#123B63] focus:ring-2 focus:ring-[#123B63]/15"
              aria-label="Search schemes by name, keyword, or department"
            />

            {/* Clear Button (X) */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Region / State Filter */}
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

          {/* Sort By Dropdown - Clearly Labeled */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-clean text-xs sm:text-sm"
              aria-label="Sort schemes"
            >
              <option value="score">Sort: Best Match</option>
              <option value="name_asc">Sort: Name (A-Z)</option>
              <option value="category">Sort: By Category</option>
            </select>
          </div>

          {/* Saved Schemes Toggle Button */}
          <div className="md:col-span-2 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`w-full inline-flex items-center justify-center gap-1.5 rounded-lg border py-2.5 px-3 text-xs font-medium transition-colors ${
                showSavedOnly
                  ? "border-[#123B63] bg-[#EAF2F8] text-[#123B63] font-semibold"
                  : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${showSavedOnly ? "fill-[#123B63] text-[#123B63]" : ""}`} />
              <span>Saved ({savedIds.length})</span>
            </button>
          </div>

        </div>

        {/* Category Filter Chips & Document Readiness */}
        <div className="pt-3 border-t border-[#E2E8F0] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Scrollable Category Chips with Dynamic Match Counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const isSelected = filterCategory === tab.id;
              const count = categoryCounts[tab.id] ?? 0;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterCategory(tab.id)}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#123B63] text-white font-semibold shadow-xs"
                      : "bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:bg-slate-100 hover:text-[#1F2937]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                    isSelected 
                      ? "bg-white/20 text-white" 
                      : "bg-slate-200/80 text-[#64748B]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Document Readiness Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#64748B] hidden sm:inline">Documents:</span>
            <select
              value={filterDocReadiness}
              onChange={(e) => setFilterDocReadiness(e.target.value)}
              className="select-clean text-xs py-1.5 px-2.5 w-auto"
              aria-label="Filter by document readiness"
            >
              <option value="all">All Documents Status</option>
              <option value="ready">Essential Documents Ready</option>
              <option value="needs_docs">Documents Needed</option>
            </select>
          </div>

        </div>

        {/* Helpful Banner: When Search query has 0 results in current category but exists in others */}
        {hasCrossCategoryResults && (
          <div className="rounded-lg border border-[#F59E0B]/40 bg-[#FEF3C7]/40 p-3 text-xs text-[#B45309] flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 shrink-0 text-[#B45309]" />
              <span>
                No schemes found for <strong>"{searchQuery}"</strong> in <em>{currentCategoryName}</em>, but <strong>{allCategorySearchMatches.length} matching scheme(s)</strong> were found in other categories.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFilterCategory("all")}
              className="inline-flex items-center gap-1 font-bold text-[#123B63] bg-white border border-[#D1E3F1] px-2.5 py-1 rounded shadow-xs hover:bg-[#EAF2F8] transition-colors shrink-0"
            >
              <span>View All {allCategorySearchMatches.length} Matches →</span>
            </button>
          </div>
        )}

        {/* Summary Count & Clear Filter Action */}
        <div className="flex flex-wrap items-center justify-between text-xs text-[#64748B] pt-1 gap-2">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-[#1F2937]">{filteredList.length}</strong> of {matchedSchemes.length} schemes
            </span>
            {searchQuery.trim() && (
              <span className="text-[#123B63] font-medium">
                • matching <strong>"{searchQuery}"</strong>
              </span>
            )}
          </div>

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
            {searchQuery.trim() 
              ? `No schemes found matching "${searchQuery}"`
              : "No schemes match your current filters"
            }
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
            {filterCategory !== "all" 
              ? `Try switching to "All Categories" or loosening your search keywords.`
              : "Try searching with broader terms like 'farmer', 'health', 'student', 'loan', or clearing filters."
            }
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {filterCategory !== "all" && (
              <button
                type="button"
                onClick={() => setFilterCategory("all")}
                className="btn-outline text-xs py-2 px-4"
              >
                <span>Search in All Categories</span>
              </button>
            )}
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
