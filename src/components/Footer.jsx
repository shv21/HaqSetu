import { Link } from "react-router-dom";
import { ShieldCheck, Globe, ExternalLink } from "lucide-react";
import translations from "../translations.js";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
];

export default function Footer({ lang, setLang }) {
  const t = translations[lang] || translations.en;

  return (
    <footer className="border-t border-[#E2E8F0] bg-white text-xs text-[#64748B]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-[#E2E8F0]">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#123B63] text-white font-bold text-sm">
                H
              </div>
              <span className="text-base font-bold text-[#1F2937]">HaqSetu</span>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              A modern, citizen-first scheme discovery engine designed to make welfare benefits understandable, transparent, and accessible to everyone.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[#13805B] font-medium">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Free • Direct .gov.in links</span>
            </div>
          </div>

          {/* Scheme Discovery Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-3">
              Scheme Discovery
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/check" className="hover:text-[#123B63] transition-colors">
                  Eligibility Questionnaire
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-[#123B63] transition-colors">
                  Explore All Schemes
                </Link>
              </li>
              <li>
                <Link to="/checklist" className="hover:text-[#123B63] transition-colors">
                  Application Documents Checklist
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-[#123B63] transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Trust Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-3">
              Safety & Governance
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="hover:text-[#123B63] transition-colors">
                  Anti-Fraud Safety Guide
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#123B63] transition-colors">
                  About the Platform & Ethics
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#123B63] transition-colors">
                  Impact Dashboard
                </Link>
              </li>
              <li>
                <a 
                  href="https://india.gov.in" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="hover:text-[#123B63] inline-flex items-center gap-1 transition-colors"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Language Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F2937] mb-3 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#123B63]" />
              <span>Language Selection</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLang && setLang(opt.code)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    opt.code === lang
                      ? "border-[#123B63] bg-[#EAF2F8] text-[#123B63] font-semibold"
                      : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Available in English, Hindi, and Marathi with localized descriptions and voice read-aloud support.
            </p>
          </div>

        </div>

        {/* Legal & Trust Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B]">
          <p className="max-w-3xl leading-relaxed text-center md:text-left">
            <strong>Disclaimer:</strong> HaqSetu is an independent, non-governmental civic assistance tool. We do not claim official government affiliation or charge any fees. Scheme eligibility match scores are advisory estimates. Always verify complete terms on official government portals (.gov.in) or your nearest authorized Common Service Centre (CSC).
          </p>
          <p className="shrink-0 text-center md:text-right">
            HaqSetu © {new Date().getFullYear()} • Built with dedication for Indian citizens
          </p>
        </div>

      </div>
    </footer>
  );
}
