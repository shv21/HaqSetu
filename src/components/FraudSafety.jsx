import { Link } from "react-router-dom";
import { 
  ShieldAlert, 
  ShieldCheck, 
  KeyRound, 
  CreditCard, 
  Globe, 
  Receipt, 
  FolderLock, 
  PhoneCall, 
  ChevronRight,
  ArrowRight
} from "lucide-react";
import translations from "../translations.js";

const SAFETY_ICONS = [KeyRound, CreditCard, Globe, Receipt, FolderLock];

export default function FraudSafety({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <section className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* Editorial Header */}
      <div className="border-b border-[#E2E8F0] bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#123B63] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1F2937] font-medium">Citizen Safety Guide</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
            Anti-Fraud Advisory
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1F2937]">
            {t.safetyTitle}
          </h1>
          <p className="mt-2 text-base text-[#64748B] leading-relaxed">
            {t.safetyIntro} Learn how to identify verified government portals and avoid online scams.
          </p>

        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        
        {/* Core Safety Directives */}
        <div className="grid gap-4 sm:grid-cols-2">
          {t.safetyList.map((item, idx) => {
            const Icon = SAFETY_ICONS[idx % SAFETY_ICONS.length];
            return (
              <div
                key={item}
                className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-card flex items-start gap-3.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#B45309]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-xs sm:text-sm text-[#1F2937] font-medium leading-relaxed">
                  {item}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Checklist Box */}
        <div className="rounded-xl border border-[#D1E3F1] bg-[#F0F6FB] p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#123B63] flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            <span>How to Spot a Real Government Portal (.gov.in / .nic.in)</span>
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs text-[#1F2937]">
            <div className="space-y-2">
              <span className="font-semibold block text-[#13805B]">✓ Genuine Indicators:</span>
              <ul className="space-y-1 text-[#64748B] list-disc pl-4">
                <li>Domain ending strictly in <strong>.gov.in</strong> or <strong>.nic.in</strong></li>
                <li>Secure HTTPS padlock in browser address bar</li>
                <li>Zero charges for standard central portal registrations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <span className="font-semibold block text-[#DC2626]">✕ Red Flags & Scams:</span>
              <ul className="space-y-1 text-[#64748B] list-disc pl-4">
                <li>Domains using .org, .com, or random letter combinations</li>
                <li>Callers demanding OTP or advance processing fee</li>
                <li>Unverified WhatsApp links promising cash transfers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cyber Crime Helpline */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#123B63] text-white">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1F2937]">National Cyber Crime Helpline</h3>
              <p className="text-xs text-[#64748B]">Report fraudulent calls or phishing links immediately.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:1930"
              className="btn-primary text-xs py-2 px-4"
            >
              Dial 1930 (Toll Free)
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline text-xs py-2 px-3"
            >
              cybercrime.gov.in ↗
            </a>
          </div>
        </div>

      </div>

    </section>
  );
}
