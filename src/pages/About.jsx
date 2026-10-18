import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, HeartHandshake, Sparkles, Scale, Building2, CheckCircle2 } from "lucide-react";
import translations from "../translations.js";

export default function About({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-16">
      
      {/* Editorial Header */}
      <section className="border-b border-[#E2E8F0] bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#123B63] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#1F2937] font-medium">About HaqSetu</span>
          </nav>

          <span className="text-xs font-bold uppercase tracking-wider text-[#123B63]">
            Our Mission & Principles
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1F2937]">
            Empowering Every Citizen to Claim What is Rightfully Theirs
          </h1>
          <p className="mt-3 text-base text-[#64748B] leading-relaxed">
            HaqSetu is a modern, transparent civic tech initiative that simplifies discovery of central and state welfare programs for citizens across India.
          </p>

        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        
        {/* Core Pillars */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63] mb-4">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#1F2937]">Rule-Based Matching</h3>
            <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
              Every score is computed using published eligibility criteria from official government gazettes and notifications.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63] mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#1F2937]">Zero Middlemen</h3>
            <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
              We never charge fees, collect OTPs, or process application payments. All links route directly to official .gov.in portals.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2F8] text-[#123B63] mb-4">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#1F2937]">Accessible to All</h3>
            <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
              Available in multiple regional languages (English, Hindi, Marathi) with text-to-speech support for low-literacy citizens.
            </p>
          </div>
        </div>

        {/* Narrative Section: The Problem & The Solution */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white p-8 shadow-card space-y-8">
          
          <div>
            <h2 className="text-xl font-bold text-[#1F2937]">
              The Challenge We Address
            </h2>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              The Government of India and state administrations run hundreds of transformative welfare schemes — ranging from free healthcare under Ayushman Bharat to direct income support under PM-Kisan. However, millions of eligible informal workers, smallholder farmers, students, and rural families remain unaware of their entitlements due to fragmented departmental websites, dense legal terminology, and rampant misinformation by fraudulent touts.
            </p>
          </div>

          <div className="pt-6 border-t border-[#E2E8F0]">
            <h2 className="text-xl font-bold text-[#1F2937]">
              How HaqSetu Bridges the Gap
            </h2>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              HaqSetu translates complex bureaucratic criteria into a guided, 2-minute questionnaire. In return, citizens receive a clear list of matched schemes, exact benefit amounts, personalized document readiness checklists, and direct verification links to legitimate government endpoints.
            </p>
          </div>

          {/* Responsible AI Disclaimer */}
          <div className="pt-6 border-t border-[#E2E8F0] rounded-lg bg-[#F8FAFC] p-5 border">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-[#123B63] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#1F2937]">
                  Responsible AI & Deterministic Rules
                </h3>
                <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                  Eligibility calculations on HaqSetu are strictly deterministic — driven by programmed logical rules rather than probabilistic models. Artificial intelligence is employed solely to simplify legal text and generate clear, localized explanations.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Trust Notice */}
          <div className="pt-6 border-t border-[#E2E8F0] text-xs text-[#64748B] space-y-2">
            <h4 className="font-bold text-[#1F2937] uppercase tracking-wider text-[11px]">
              Independent Platform Disclaimer
            </h4>
            <p className="leading-relaxed">
              HaqSetu is an independent civic discovery platform. We are not an official government entity, agency, or department. While we continually verify data against official portals, final eligibility and sanctioning remain at the sole discretion of the respective government authorities upon physical verification.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}
