import translations from "../translations.js";
import { Link } from "react-router-dom";

export default function Footer({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-slate-600 text-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-8 border-b border-slate-100">
          <div>
            <span className="text-lg font-black text-slate-900">{t.siteName}</span>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              AI-assisted multilingual scheme guidance platform for rural and low-income citizens across India.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Quick Links</p>
            <ul className="mt-2 space-y-1.5 text-xs">
              <li><Link to="/check" className="hover:text-emerald-600">{t.startCheck}</Link></li>
              <li><Link to="/safety" className="hover:text-emerald-600">{t.safetyTitle}</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-600">{t.dashboardTitle}</Link></li>
              <li><Link to="/about" className="hover:text-emerald-600">{t.aboutTitle}</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Supported Languages</p>
            <p className="mt-2 text-xs text-slate-600">English, हिंदी (Hindi), मराठी (Marathi)</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-800">Safety Notice</p>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Never share OTP or pay unauthorized agents. Always verify scheme details at official government portals (.gov.in).
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>{t.siteName} © 2026 • Made with ❤️ for India</p>
          <p>Rule-Based Eligibility Engine</p>
        </div>
      </div>
    </footer>
  );
}
