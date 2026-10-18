import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  CheckSquare, 
  Copy, 
  Download, 
  Check, 
  ChevronRight, 
  ArrowRight, 
  FileText, 
  Printer,
  ShieldCheck 
} from "lucide-react";
import { loadChecklist, saveChecklist, loadProfile } from "../utils/storage.js";
import { matchSchemes } from "../utils/matchSchemes.js";
import translations from "../translations.js";

export default function Checklist({ lang, matchedSchemes = [] }) {
  const t = translations[lang] || translations.en;
  const [checked, setChecked] = useState({});
  const [copied, setCopied] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  // If matchedSchemes is empty, fall back to matching from saved profile
  const activeSchemes = useMemo(() => {
    if (matchedSchemes && matchedSchemes.length > 0) return matchedSchemes;
    const profile = loadProfile();
    if (profile) return matchSchemes(profile);
    return [];
  }, [matchedSchemes]);

  useEffect(() => {
    const stored = loadChecklist();
    if (stored && typeof stored === "object" && !Array.isArray(stored)) {
      setChecked(stored);
    }
  }, []);

  const documents = useMemo(() => {
    const docs = activeSchemes.flatMap((item) => item.scheme.requiredDocuments || []);
    return Array.from(new Set(docs));
  }, [activeSchemes]);

  const toggleDocument = (doc) => {
    const next = { ...checked, [doc]: !checked[doc] };
    setChecked(next);
    saveChecklist(next);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const completedCount = documents.filter((doc) => !!checked[doc]).length;
  const progressPercent = documents.length ? Math.round((completedCount / documents.length) * 100) : 0;

  const copyChecklist = async () => {
    const output = documents
      .map((doc) => `[${checked[doc] ? "X" : " "}] ${doc}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(
        `HaqSetu Document Checklist\nProgress: ${completedCount}/${documents.length} (${progressPercent}%)\n\n${output}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadChecklist = () => {
    const output = documents
      .map((doc) => `[${checked[doc] ? "X" : " "}] ${doc}`)
      .join("\n");
    const content = `HaqSetu — Citizen Document Preparation Checklist\nGenerated for: Government Scheme Applications\nProgress: ${completedCount}/${documents.length} (${progressPercent}%)\n\n${output}\n\nNotice: Verify required originals before visiting CSC or department office.`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "haqsetu-documents-checklist.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-4" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-[#123B63] transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/results" className="hover:text-[#123B63] transition-colors">Results</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[#1F2937] font-medium">Application Checklist</span>
      </nav>

      <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#123B63]">
                Consolidated Requirements
              </span>
              <h1 className="text-2xl font-bold text-[#1F2937] mt-0.5">
                My Scheme Document Checklist
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
                Track all certificates and identification proofs required across your matching schemes in one place.
              </p>
            </div>

            {/* Preparation Stats Pill */}
            {documents.length > 0 && (
              <div className="rounded-lg border border-[#D1E3F1] bg-[#EAF2F8] p-3 text-center sm:text-right shrink-0">
                <p className="text-[11px] font-semibold text-[#123B63] uppercase">Preparation Status</p>
                <p className="text-xl font-extrabold text-[#123B63]">
                  {completedCount} of {documents.length}
                </p>
                <p className="text-[11px] text-[#64748B]">({progressPercent}% prepared)</p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {documents.length > 0 && (
            <div className="mt-4 w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#13805B] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {documents.length > 0 ? (
            <div className="space-y-6">
              
              <div className="grid gap-3 sm:grid-cols-2">
                {documents.map((doc) => {
                  const isChecked = !!checked[doc];
                  return (
                    <label
                      key={doc}
                      className={`flex items-start gap-3 rounded-lg border p-3.5 cursor-pointer transition-colors ${
                        isChecked
                          ? "border-[#13805B] bg-[#E7F5EE]/40"
                          : "border-[#E2E8F0] bg-white hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleDocument(doc)}
                        className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] text-[#123B63] focus:ring-[#123B63]"
                      />
                      <div className="flex-1 text-xs">
                        <span className={`font-semibold block ${isChecked ? "text-[#13805B] line-through" : "text-[#1F2937]"}`}>
                          {doc}
                        </span>
                        <span className="text-[11px] text-[#64748B] block mt-0.5">
                          {isChecked ? "Document verified & ready" : "Required for application verification"}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Status / Saved Alert */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0] text-xs">
                <span className="text-[#64748B]">
                  {savedMessage ? (
                    <span className="text-[#13805B] font-medium flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Progress saved locally in browser
                    </span>
                  ) : (
                    "Changes automatically persist on this device."
                  )}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={copyChecklist}
                    className="btn-outline text-xs py-2 px-3"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-[#13805B]" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? "Copied" : "Copy Checklist"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadChecklist}
                    className="btn-outline text-xs py-2 px-3"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download (.txt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="btn-outline text-xs py-2 px-3 hidden sm:inline-flex"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-10 w-10 text-slate-400 mb-3" />
              <h3 className="text-base font-bold text-[#1F2937]">No documents checklist generated yet</h3>
              <p className="mt-1 text-xs text-[#64748B] max-w-sm mx-auto">
                Complete the eligibility questionnaire to discover matching schemes and build your personalized checklist.
              </p>
              <Link to="/check" className="btn-primary mt-4 inline-flex items-center gap-2 text-xs py-2 px-4">
                <span>Start Eligibility Check</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
