import { Globe, Check } from "lucide-react";
import translations from "../translations.js";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी (Hindi)" },
  { code: "mr", label: "मराठी (Marathi)" },
];

export default function LanguageSelector({
  lang,
  setLang,
  wrapperClassName = "mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8",
}) {
  const t = translations[lang] || translations.en;
  return (
    <div className={wrapperClassName}>
      <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63]">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-[#1F2937] block">
              {t.languageLabel || "Interface Language"}
            </span>
            <span className="text-[11px] text-[#64748B] block">
              Choose your preferred language for descriptions and audio assistance
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {languageOptions.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setLang(item.code)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                item.code === lang
                  ? "bg-[#123B63] text-white font-semibold shadow-xs"
                  : "border border-[#E2E8F0] bg-[#F8FAFC] text-[#1F2937] hover:bg-slate-100"
              }`}
            >
              <span>{item.label}</span>
              {item.code === lang && <Check className="h-3.5 w-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
