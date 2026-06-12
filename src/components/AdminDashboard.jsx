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
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <h2 className="text-3xl font-semibold text-slate-900">
          {t.dashboardTitle}
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">{t.totalChecks}</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900">
              {analytics.length}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">{t.languageUsage}</p>
            <div className="mt-3 space-y-2">
              {Object.entries(languageCounts).map(([langKey, count]) => (
                <div
                  key={langKey}
                  className="flex items-center justify-between"
                >
                  <span className="text-slate-700">{langKey}</span>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">{t.commonOccupations}</p>
            <div className="mt-3 space-y-2">
              {Object.entries(occupationCounts).map(([name, count]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-slate-700">{name}</span>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm text-slate-500">{t.ruralUrban}</p>
            <div className="mt-3 space-y-2">
              {Object.entries(ruralUrbanCounts).map(([name, count]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-slate-700">{name}</span>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:col-span-2">
            <p className="text-sm text-slate-500">{t.topSchemes}</p>
            <div className="mt-3 space-y-2">
              {Object.entries(schemeCounts).map(([name, count]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="text-slate-700">{name}</span>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:col-span-2">
            <p className="text-sm text-slate-500">{t.commonMissing}</p>
            <div className="mt-3 space-y-2">
              {Object.entries(missingCounts).map(([doc, count]) => (
                <div key={doc} className="flex items-center justify-between">
                  <span className="text-slate-700">{doc}</span>
                  <span className="font-semibold text-slate-900">{count}</span>
                </div>
              ))}
              {!Object.keys(missingCounts).length && (
                <p className="text-slate-600">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
