import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Globe2, 
  FileWarning, 
  ChevronRight, 
  TrendingUp,
  MapPin,
  Sparkles
} from "lucide-react";
import { getAnalytics } from "../utils/storage.js";
import translations from "../translations.js";

function getCounts(entries, key) {
  return entries.reduce((acc, item) => {
    const value = item[key] || "Unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

export default function AdminDashboard({ lang }) {
  const t = translations[lang] || translations.en;
  const analytics = getAnalytics();
  const total = analytics.length || 1; // prevent divide by zero
  
  const occupationCounts = getCounts(analytics, "occupation");
  const schemeCounts = getCounts(analytics, "topScheme");
  const missingCounts = analytics.reduce((acc, item) => {
    (item.missingDocuments || []).forEach((doc) => {
      acc[doc] = (acc[doc] || 0) + 1;
    });
    return acc;
  }, {});
  const languageCounts = getCounts(analytics, "lang");
  const ruralUrbanCounts = getCounts(analytics, "areaType");

  return (
    <section className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* Header */}
      <div className="border-b border-[#E2E8F0] bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#123B63] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1F2937] font-medium">Impact Dashboard</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#123B63]">
                Aggregated Analytics
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1F2937]">
                Community Impact & Scheme Demographics
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
                Anonymous usage insights tracking scheme inquiries, target beneficiary groups, and document bottlenecks.
              </p>
            </div>

            <div className="rounded-lg border border-[#D1E3F1] bg-[#EAF2F8] px-3.5 py-1.5 text-xs font-semibold text-[#123B63] self-start sm:self-auto">
              Privacy-Preserved Data
            </div>
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
        
        {/* Metric Cards Top Row */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Total Checks */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Total Searches</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63]">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-[#1F2937]">
              {analytics.length}
            </p>
            <p className="mt-1 text-xs text-[#13805B] font-medium flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Real-time citizen queries</span>
            </p>
          </div>

          {/* Language Breakdown */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Language Breakdown</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63]">
                <Globe2 className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {Object.entries(languageCounts).map(([k, count]) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={k}>
                    <div className="flex justify-between text-[#1F2937] font-medium mb-1">
                      <span className="uppercase">{k === "en" ? "English" : k === "hi" ? "हिंदी (Hindi)" : "मराठी (Marathi)"}</span>
                      <span>{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#123B63] h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              {Object.keys(languageCounts).length === 0 && (
                <p className="text-slate-400">No session data yet</p>
              )}
            </div>
          </div>

          {/* Rural vs Urban */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Demographics</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63]">
                <MapPin className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {Object.entries(ruralUrbanCounts).map(([area, count]) => {
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={area}>
                    <div className="flex justify-between text-[#1F2937] font-medium mb-1">
                      <span className="capitalize">{area} Users</span>
                      <span>{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#13805B] h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              {Object.keys(ruralUrbanCounts).length === 0 && (
                <p className="text-slate-400">No session data yet</p>
              )}
            </div>
          </div>

        </div>

        {/* Detailed Breakdown Grids */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Top Matched Schemes */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <h3 className="text-sm font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#123B63]" />
              <span>Most Frequently Matched Schemes</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {Object.entries(schemeCounts).map(([name, count]) => (
                <div key={name} className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="font-semibold text-[#1F2937]">{name}</span>
                  <span className="rounded bg-[#EAF2F8] text-[#123B63] px-2 py-0.5 font-bold">{count} matches</span>
                </div>
              ))}
              {Object.keys(schemeCounts).length === 0 && (
                <p className="text-[#64748B] py-4 text-center">No scheme matches recorded yet.</p>
              )}
            </div>
          </div>

          {/* Common Missing Documents */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <h3 className="text-sm font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <FileWarning className="h-4 w-4 text-[#B45309]" />
              <span>Most Common Missing Documents</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {Object.entries(missingCounts).map(([doc, count]) => (
                <div key={doc} className="flex items-center justify-between p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#1F2937]">{doc}</span>
                  <span className="rounded bg-[#FEF3C7] text-[#B45309] px-2 py-0.5 font-bold">{count} pending</span>
                </div>
              ))}
              {Object.keys(missingCounts).length === 0 && (
                <p className="text-[#64748B] py-4 text-center">All documents reported ready by users.</p>
              )}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
