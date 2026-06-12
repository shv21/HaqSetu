import translations from "../translations.js";

export default function Footer({ lang }) {
  const t = translations[lang] || translations.en;

  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.siteName} © 2026</p>
          <p className="text-sm">
            Responsible guidance. Verify on official portal.
          </p>
        </div>
      </div>
    </footer>
  );
}
