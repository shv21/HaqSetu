import { useEffect, useState } from "react";
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Building, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  Calendar, 
  Flag,
  Sparkles,
  ArrowRight
} from "lucide-react";
import translations from "../translations.js";
import { getSchemeExplanation } from "../utils/aiExplain.js";
import { 
  toggleSaveScheme, 
  isSchemeSaved, 
  addRecentlyViewed, 
  saveOutdatedReport 
} from "../utils/storage.js";

export default function SchemeDetailModal({ scheme, lang, profile, onClose }) {
  const t = translations[lang] || translations.en;
  
  const [explanation, setExplanation] = useState("Analyzing eligibility details...");
  const [loadingExplanation, setLoadingExplanation] = useState(true);
  const [saved, setSaved] = useState(() => isSchemeSaved(scheme.id));
  const [copied, setCopied] = useState(false);
  
  // Outdated report modal state
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  useEffect(() => {
    // Record recently viewed
    addRecentlyViewed(scheme);

    // Escape key listener
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scheme, onClose]);

  useEffect(() => {
    let active = true;
    setLoadingExplanation(true);
    getSchemeExplanation(scheme, profile, lang).then((text) => {
      if (active) {
        setExplanation(text);
        setLoadingExplanation(false);
      }
    });
    return () => {
      active = false;
    };
  }, [scheme, lang, profile]);

  const handleBookmarkToggle = () => {
    const next = toggleSaveScheme(scheme.id);
    setSaved(next);
  };

  const handleCopy = async () => {
    const text = `${scheme.name}\nDepartment: ${scheme.officialSourceName}\nBenefit: ${scheme.benefit}\nOfficial URL: ${scheme.sourceUrl}\nRequired Documents: ${scheme.requiredDocuments.join(', ')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    saveOutdatedReport({
      schemeId: scheme.id,
      schemeName: scheme.name,
      feedback: reportText.trim(),
    });
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportForm(false);
      setReportSubmitted(false);
      setReportText("");
    }, 2000);
  };

  // Helper to check if a document is owned by the user
  const doesUserHaveDoc = (docName) => {
    if (!profile) return null;
    const lower = docName.toLowerCase();
    if (lower.includes("aadhaar")) return profile.hasAadhaar;
    if (lower.includes("mobile")) return profile.hasMobileLinked;
    if (lower.includes("bank")) return profile.hasBankAccount;
    if (lower.includes("ration")) return profile.hasRationCard;
    if (lower.includes("income")) return profile.hasIncomeCert;
    if (lower.includes("caste")) return profile.hasCasteCert;
    if (lower.includes("disability")) return profile.hasDisabilityCert;
    return null;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-scheme-title"
    >
      <div 
        className="relative w-full max-w-3xl rounded-xl border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:px-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-md border border-[#D1E3F1] bg-[#EAF2F8] px-2.5 py-0.5 text-xs font-semibold text-[#123B63] capitalize">
                {scheme.category}
              </span>
              {scheme.officialSourceName && (
                <span className="flex items-center gap-1 text-xs text-[#64748B]">
                  <Building className="h-3 w-3" />
                  <span>{scheme.officialSourceName}</span>
                </span>
              )}
            </div>

            <h2 id="modal-scheme-title" className="text-xl sm:text-2xl font-extrabold text-[#1F2937]">
              {scheme.name}
            </h2>
            {scheme.shortName && scheme.shortName !== scheme.name && (
              <p className="text-xs text-[#64748B] mt-0.5">Commonly known as: {scheme.shortName}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark button */}
            <button
              type="button"
              onClick={handleBookmarkToggle}
              title={saved ? "Saved" : "Save Scheme"}
              className={`rounded-lg p-2 border transition-colors ${
                saved
                  ? "border-[#123B63] bg-[#EAF2F8] text-[#123B63]"
                  : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
              }`}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopy}
              title="Copy scheme summary"
              className="rounded-lg p-2 border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-[#13805B]" /> : <Copy className="h-4 w-4" />}
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-100 hover:text-[#1F2937] transition-colors"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Key Benefit Banner */}
          <div className="rounded-lg border border-[#D1E3F1] bg-[#F0F6FB] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#123B63] block">
              Verified Benefit Package
            </span>
            <p className="mt-1 text-sm font-semibold text-[#123B63] leading-relaxed">
              {scheme.benefit}
            </p>
          </div>

          {/* Scheme Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Overview
            </h3>
            <p className="text-sm text-[#1F2937] leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* AI / Rule Match Explanation */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-4 w-4 text-[#123B63]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B63]">
                Why This Matches Your Profile
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed">
              {loadingExplanation ? "Evaluating profile rules..." : explanation}
            </p>
          </div>

          {/* Required Documents Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Required Documents Checklist
              </h3>
              <span className="text-[11px] text-[#64748B]">Verified from official guidelines</span>
            </div>

            <div className="rounded-lg border border-[#E2E8F0] divide-y divide-[#E2E8F0]">
              {scheme.requiredDocuments.map((doc) => {
                const userStatus = doesUserHaveDoc(doc);
                return (
                  <div key={doc} className="p-3 flex items-center justify-between text-xs">
                    <span className="font-medium text-[#1F2937]">{doc}</span>
                    {userStatus === true && (
                      <span className="inline-flex items-center gap-1 rounded bg-[#E7F5EE] px-2 py-0.5 text-[11px] font-semibold text-[#13805B]">
                        <CheckCircle2 className="h-3 w-3" /> Ready
                      </span>
                    )}
                    {userStatus === false && (
                      <span className="inline-flex items-center gap-1 rounded bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-semibold text-[#B45309]">
                        <AlertCircle className="h-3 w-3" /> Need to prepare
                      </span>
                    )}
                    {userStatus === null && (
                      <span className="text-[11px] text-[#64748B]">Standard requirement</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Steps */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Official Application Process
            </h3>
            <ol className="rounded-lg border border-[#E2E8F0] bg-white divide-y divide-[#E2E8F0]">
              {scheme.applySteps.map((step, idx) => (
                <li key={step} className="p-3.5 flex items-start gap-3 text-xs sm:text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#123B63] text-white text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-[#1F2937] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Fraud Advisory & Verification Notice */}
          <div className="rounded-lg border border-[#F59E0B]/30 bg-[#FEF3C7]/40 p-4 text-xs text-[#B45309] flex items-start gap-3">
            <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-[#B45309]" />
            <div className="leading-relaxed">
              <span className="font-bold block">Important Notice:</span>
              <span>
                {scheme.fraudWarnings?.[0] || "All official government applications are free of intermediary charges. Never share bank passwords, UPI PINs, or Aadhaar OTPs with unverified third parties."}
              </span>
            </div>
          </div>

          {/* Report Outdated Information Toggle */}
          <div className="pt-2">
            {!showReportForm ? (
              <button
                type="button"
                onClick={() => setShowReportForm(true)}
                className="text-xs text-[#64748B] hover:text-[#123B63] inline-flex items-center gap-1 font-medium transition-colors"
              >
                <Flag className="h-3.5 w-3.5" />
                <span>Notice an error? Report outdated scheme information</span>
              </button>
            ) : (
              <form onSubmit={handleReportSubmit} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-3">
                <span className="font-bold text-[#1F2937] block">
                  Report Information Update for {scheme.name}
                </span>
                <textarea
                  rows="2"
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Describe what has changed (e.g. updated website URL, new benefit amount, or changed document rule)..."
                  className="input-clean text-xs"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportForm(false)}
                    className="btn-outline text-xs py-1.5 px-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-1.5 px-3"
                  >
                    {reportSubmitted ? "Report Sent ✓" : "Submit Feedback"}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Modal Footer with Primary Apply Action */}
        <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#64748B]">
            Official Source: <span className="font-semibold text-[#1F2937]">{scheme.officialSourceName}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline w-full sm:w-auto text-xs py-2 px-4"
            >
              Close
            </button>

            {scheme.sourceUrl && (
              <a
                href={scheme.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary w-full sm:w-auto text-xs py-2 px-4 shadow-sm"
              >
                <span>Apply on Official Website</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
