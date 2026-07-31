import { useState } from "react";
import translations from "../translations.js";

const STATES = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const OCCUPATIONS = [
  "student",
  "informal worker",
  "daily wage worker",
  "farmer",
  "self-employed",
  "street vendor",
  "homemaker",
  "unemployed youth",
  "pregnant woman / mother",
];

const INCOME_RANGES = [
  "< ₹10,000",
  "₹10,000 - ₹20,000",
  "₹20,000 - ₹30,000",
  "> ₹30,000",
];

export default function EligibilityForm({ lang, onSubmit, initialValues = {} }) {
  const t = translations[lang] || translations.en;
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: initialValues.fullName || "",
    age: initialValues.age || "",
    gender: initialValues.gender || "",
    address: initialValues.address || "",
    district: initialValues.district || "",
    state: initialValues.state || "",
    areaType: initialValues.areaType || "",
    qualification: initialValues.qualification || "",
    occupation: initialValues.occupation || "",
    categoryPreference: initialValues.categoryPreference || "all",
    incomeRange: initialValues.incomeRange || "",
    hasAadhaar: initialValues.hasAadhaar ?? "",
    hasMobileLinked: initialValues.hasMobileLinked ?? "",
    hasBankAccount: initialValues.hasBankAccount ?? "",
    hasRationCard: initialValues.hasRationCard ?? "",
    hasIncomeCert: initialValues.hasIncomeCert ?? "",
    hasCasteCert: initialValues.hasCasteCert ?? "",
    hasDisabilityCert: initialValues.hasDisabilityCert ?? "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.fullName.trim()) {
      newErrors.fullName = t.fullName + " is required.";
    }
    if (!form.age || Number(form.age) < 10 || Number(form.age) > 100) {
      newErrors.age = "Please enter age between 10 and 100.";
    }
    if (!form.state) {
      newErrors.state = "Please select your state.";
    }
    if (!form.areaType) {
      newErrors.areaType = "Please select rural or urban.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.qualification) {
      newErrors.qualification = "Please select qualification.";
    }
    if (!form.occupation) {
      newErrors.occupation = "Please select occupation.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const parseBooleanField = (value) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    return "";
  };

  const handleSubmit = () => {
    const normalizedProfile = {
      ...form,
      age: Number(form.age) || 25,
      hasAadhaar: parseBooleanField(form.hasAadhaar) !== false,
      hasMobileLinked: parseBooleanField(form.hasMobileLinked) !== false,
      hasBankAccount: parseBooleanField(form.hasBankAccount) !== false,
      hasRationCard: parseBooleanField(form.hasRationCard) === true,
      hasIncomeCert: parseBooleanField(form.hasIncomeCert) === true,
      hasCasteCert: parseBooleanField(form.hasCasteCert) === true,
      hasDisabilityCert: parseBooleanField(form.hasDisabilityCert) === true,
    };
    onSubmit(normalizedProfile);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Wizard Progress Bar */}
      <div className="mb-8 rounded-3xl bg-white p-6 shadow-soft border border-slate-200/80">
        <div className="flex items-center justify-between gap-2">
          {[
            { num: 1, title: t.step1Title, icon: "👤" },
            { num: 2, title: t.step2Title, icon: "🎓" },
            { num: 3, title: t.step3Title, icon: "📄" },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num < step) setStep(s.num);
              }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-3 px-3 transition-all ${
                step === s.num
                  ? "bg-emerald-600 text-white font-bold shadow-md"
                  : step > s.num
                  ? "bg-emerald-50 text-emerald-800 font-semibold cursor-pointer"
                  : "bg-slate-100 text-slate-400 font-medium"
              }`}
            >
              <span className="text-lg">{s.icon}</span>
              <span className="hidden sm:inline text-sm">{s.title}</span>
              <span className="sm:hidden text-xs">Step {s.num}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-card border border-slate-200/80">
        {/* STEP 1: Personal Details (Name, Age, Location) */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Step 1 of 3
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {t.step1Title}
              </h2>
              <p className="text-sm text-slate-500">{t.formIntro}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder={t.fullNamePlaceholder}
                  className="input-friendly"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.age} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  placeholder={t.agePlaceholder}
                  className="input-friendly"
                />
                {errors.age && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.age}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.gender}
                </label>
                <select
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="select-friendly"
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female (महिला)</option>
                  <option value="male">Male (पुरुष)</option>
                  <option value="other">Other (अन्य)</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.state} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="select-friendly"
                >
                  <option value="">{t.statePlaceholder}</option>
                  {STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.state}</p>
                )}
              </div>

              {/* Area Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.areaType} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.areaType}
                  onChange={(e) => handleChange("areaType", e.target.value)}
                  className="select-friendly"
                >
                  <option value="">Select Area Type</option>
                  <option value="rural">🏡 {t.rural}</option>
                  <option value="urban">🏙️ {t.urban}</option>
                </select>
                {errors.areaType && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.areaType}</p>
                )}
              </div>

              {/* Village/City Address */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.address}
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder={t.addressPlaceholder}
                  className="input-friendly"
                />
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.district}
                </label>
                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => handleChange("district", e.target.value)}
                  placeholder={t.districtPlaceholder}
                  className="input-friendly"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary w-full sm:w-auto"
              >
                <span>{t.next}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Qualification, Occupation & Scheme Category Preference */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Step 2 of 3
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {t.step2Title}
              </h2>
              <p className="text-sm text-slate-500">
                Tell us your education, work status, and what kind of schemes you prefer.
              </p>
            </div>

            <div className="space-y-5">
              {/* Category Preference */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  🎯 {t.preferredCategory}
                </label>
                <select
                  value={form.categoryPreference}
                  onChange={(e) => handleChange("categoryPreference", e.target.value)}
                  className="select-friendly border-2 border-emerald-600/40 bg-emerald-50/30 font-semibold"
                >
                  {Object.entries(t.categories || {}).map(([catKey, catLabel]) => (
                    <option key={catKey} value={catKey}>
                      {catLabel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Educational Qualification */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.qualification} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.qualification}
                  onChange={(e) => handleChange("qualification", e.target.value)}
                  className="select-friendly"
                >
                  <option value="">{t.qualificationPlaceholder}</option>
                  {Object.entries(t.eduLevels || {}).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.qualification && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.qualification}</p>
                )}
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.occupation} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  className="select-friendly"
                >
                  <option value="">Select your work status</option>
                  {OCCUPATIONS.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ.charAt(0).toUpperCase() + occ.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.occupation && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.occupation}</p>
                )}
              </div>

              {/* Income Range */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  {t.incomeRange}
                </label>
                <select
                  value={form.incomeRange}
                  onChange={(e) => handleChange("incomeRange", e.target.value)}
                  className="select-friendly"
                >
                  <option value="">Select Monthly Family Income</option>
                  {INCOME_RANGES.map((rng) => (
                    <option key={rng} value={rng}>
                      {rng}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline"
              >
                ← {t.back}
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary"
              >
                <span>{t.next}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Documents Check (Simple Yes/No Cards) */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Step 3 of 3
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {t.step3Title}
              </h2>
              <p className="text-sm text-slate-500">
                Select documents you currently possess. Don't worry if you miss any!
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { field: "hasAadhaar", label: t.hasAadhaar, icon: "🪪" },
                { field: "hasMobileLinked", label: t.hasMobileLinked, icon: "📱" },
                { field: "hasBankAccount", label: t.hasBankAccount, icon: "🏦" },
                { field: "hasRationCard", label: t.hasRationCard, icon: "🌾" },
                { field: "hasIncomeCert", label: t.hasIncomeCert, icon: "📜" },
                { field: "hasCasteCert", label: t.hasCasteCert, icon: "📋" },
              ].map(({ field, label, icon }) => (
                <div
                  key={field}
                  className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-4 transition hover:border-emerald-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-semibold text-slate-800">{label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange(field, "true")}
                      className={`py-2 rounded-xl text-sm font-bold transition ${
                        form[field] === "true" || form[field] === true
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      ✓ {t.yes}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange(field, "false")}
                      className={`py-2 rounded-xl text-sm font-bold transition ${
                        form[field] === "false" || form[field] === false
                          ? "bg-slate-700 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      ✕ {t.no}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-outline"
              >
                ← {t.back}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-lg shadow-lg py-4 px-8"
              >
                🔍 {t.submit}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
