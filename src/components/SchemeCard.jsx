import { useState } from "react";
import { 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ArrowRight,
  Building,
  Info
} from "lucide-react";
import translations from "../translations.js";
import { toggleSaveScheme, isSchemeSaved } from "../utils/storage.js";

export default function SchemeCard({ schemeData, lang, onSelect }) {
  const t = translations[lang] || translations.en;
  const { scheme, score, reasons = [], missingDocuments = [] } = schemeData;

  const [saved, setSaved] = useState(() => isSchemeSaved(scheme.id));
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAllReasons, setShowAllReasons] = useState(false);

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    const nextState = toggleSaveScheme(scheme.id);
    setSaved(nextState);
  };

  const handleCopySummary = async (e) => {
    e.stopPropagation();
    const summaryText = `${scheme.name}\nDepartment: ${scheme.officialSourceName || 'Government of India'}\nBenefit: ${scheme.benefit}\nOfficial Link: ${scheme.sourceUrl}\nRequired Documents: ${scheme.requiredDocuments.join(', ')}`;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleTextToSpeech = (e) => {
    e.stopPropagation();
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech audio playback is not supported on this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = `${scheme.name}. ${scheme.description}. Key benefit: ${scheme.benefit}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    if (lang === "hi") utterance.lang = "hi-IN";
    else if (lang === "mr") utterance.lang = "mr-IN";
    else utterance.lang = "en-IN";

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  // Eligibility Status classification
  const isHighMatch = score >= 80;
  const isModerateMatch = score >= 50 && score < 80;

  return (
    <article className="group rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card transition-all duration-150 hover:border-[#123B63] hover:shadow-cardHover flex flex-col justify-between">
      
      <div>
        {/* Top Header: Department, Category, Match Score & Bookmark */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Badge */}
            <span className="rounded-md border border-[#D1E3F1] bg-[#EAF2F8] px-2.5 py-1 text-xs font-semibold text-[#123B63] capitalize">
              {scheme.category}
            </span>

            {/* State Badge if applicable */}
            {scheme.state && (
              <span className="rounded-md border border-slate-200 bg-[#F8FAFC] px-2 py-0.5 text-xs font-medium text-[#64748B]">
                {scheme.state}
              </span>
            )}

            {/* Responsible Authority / Department */}
            {scheme.officialSourceName && (
              <span className="flex items-center gap-1 text-xs text-[#64748B]">
                <Building className="h-3 w-3 text-[#64748B]" />
                <span className="truncate max-w-[220px]">{scheme.officialSourceName}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Match Status Badge */}
            <div 
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold ${
                isHighMatch
                  ? "bg-[#E7F5EE] text-[#13805B] border border-[#13805B]/20"
                  : isModerateMatch
                  ? "bg-[#EAF2F8] text-[#123B63] border border-[#123B63]/20"
                  : "bg-slate-100 text-[#64748B] border border-slate-200"
              }`}
            >
              <span>{score}% Match</span>
            </div>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={handleBookmarkToggle}
              title={saved ? "Remove from saved schemes" : "Save scheme for later"}
              className={`rounded-lg p-1.5 transition-colors ${
                saved
                  ? "text-[#123B63] bg-[#EAF2F8]"
                  : "text-[#64748B] hover:text-[#123B63] hover:bg-slate-100"
              }`}
              aria-label={saved ? "Saved" : "Save Scheme"}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>
          </div>

        </div>

        {/* Scheme Title & Description */}
        <div className="mt-4">
          <h3 
            onClick={() => onSelect(scheme)}
            className="text-lg font-bold text-[#1F2937] hover:text-[#123B63] cursor-pointer transition-colors"
          >
            {scheme.name}
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
            {scheme.description}
          </p>
        </div>

        {/* Benefit Highlight Callout */}
        {scheme.benefit && (
          <div className="mt-4 rounded-lg border border-[#D1E3F1] bg-[#F0F6FB] p-3 text-xs text-[#123B63] flex items-start gap-2.5">
            <span className="font-bold text-sm shrink-0">₹</span>
            <div className="leading-relaxed">
              <span className="font-semibold block text-[#123B63]">Key Benefit:</span>
              <span>{scheme.benefit}</span>
            </div>
          </div>
        )}

        {/* Matching Criteria & Document Readiness */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
          
          {/* Reasons / Why matched */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
            <span className="font-semibold text-[#1F2937] block mb-1.5">
              Why this matched your profile:
            </span>
            {reasons.length > 0 ? (
              <ul className="space-y-1 text-[#64748B]">
                {(showAllReasons ? reasons : reasons.slice(0, 2)).map((r) => (
                  <li key={r} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#13805B] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#64748B]">Eligible under general beneficiary criteria.</p>
            )}
            {reasons.length > 2 && (
              <button
                type="button"
                onClick={() => setShowAllReasons(!showAllReasons)}
                className="mt-1.5 text-[11px] font-semibold text-[#123B63] hover:underline"
              >
                {showAllReasons ? "Show fewer reasons" : `+${reasons.length - 2} more reasons`}
              </button>
            )}
          </div>

          {/* Document Readiness */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
            <span className="font-semibold text-[#1F2937] block mb-1.5">
              Document Readiness:
            </span>
            {missingDocuments.length === 0 ? (
              <p className="text-[#13805B] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>All essential documents ready</span>
              </p>
            ) : (
              <div className="space-y-1">
                <p className="text-[#B45309] font-medium flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>{missingDocuments.length} document(s) need attention</span>
                </p>
                <p className="text-[11px] text-[#64748B] truncate">
                  Missing: {missingDocuments.join(", ")}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Utilities: Listen Audio & Copy Summary */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTextToSpeech}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isPlaying
                ? "bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B]"
                : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
            }`}
            title="Listen to scheme description"
          >
            {isPlaying ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            <span>{isPlaying ? "Stop Audio" : "Listen"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-medium text-[#64748B] hover:bg-slate-50 transition-colors"
            title="Copy scheme details to clipboard"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#13805B]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelect(scheme)}
            className="btn-outline text-xs py-1.5 px-3"
          >
            <span>View Details</span>
          </button>

          {scheme.sourceUrl && (
            <a
              href={scheme.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary text-xs py-1.5 px-3"
              title="Opens official government portal in a new tab"
            >
              <span>Apply on Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>

      </div>

    </article>
  );
}
