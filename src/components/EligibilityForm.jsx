import { useState } from "react";
import translations from "../translations.js";

const STATES = [
  "Maharashtra",
  "Uttar Pradesh",
  "Bihar",
  "West Bengal",
  "Karnataka",
  "Tamil Nadu",
  "Rajasthan",
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

export default function EligibilityForm({ lang, onSubmit }) {
  const t = translations[lang] || translations.en;
  const [form, setForm] = useState({
    age: "",
    gender: "",
    state: "",
    areaType: "",
    occupation: "",
    incomeRange: "",
    hasAadhaar: "",
    hasMobileLinked: "",
    hasBankAccount: "",
    hasRationCard: "",
    hasIncomeCert: "",
    hasCasteCert: "",
    hasDisabilityCert: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const parseBooleanField = (value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.age || Number(form.age) < 10 || Number(form.age) > 100) {
      newErrors.age = "Please enter a valid age between 10 and 100.";
    }
    if (!form.gender) {
      newErrors.gender = "Please select your gender.";
    }
    if (!form.state) {
      newErrors.state = "Please select your state.";
    }
    if (!form.areaType) {
      newErrors.areaType = "Please select your area type.";
    }
    if (!form.occupation) {
      newErrors.occupation = "Please select your occupation.";
    }
    if (!form.incomeRange) {
      newErrors.incomeRange = "Please select your income range.";
    }
    [
      "hasAadhaar",
      "hasMobileLinked",
      "hasBankAccount",
      "hasRationCard",
      "hasIncomeCert",
    ].forEach((field) => {
      if (form[field] === "") {
        newErrors[field] = `Please answer ${t[field].toLowerCase()}.`;
      }
    });
    ["hasCasteCert", "hasDisabilityCert"].forEach((field) => {
      if (form[field] === "") {
        newErrors[field] = `Please answer ${t[field].toLowerCase()}.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const normalizedProfile = {
      ...form,
      age: Number(form.age),
      hasAadhaar: parseBooleanField(form.hasAadhaar),
      hasMobileLinked: parseBooleanField(form.hasMobileLinked),
      hasBankAccount: parseBooleanField(form.hasBankAccount),
      hasRationCard: parseBooleanField(form.hasRationCard),
      hasIncomeCert: parseBooleanField(form.hasIncomeCert),
      hasCasteCert:
        form.hasCasteCert === "true"
          ? true
          : form.hasCasteCert === "false"
            ? false
            : null,
      hasDisabilityCert:
        form.hasDisabilityCert === "true"
          ? true
          : form.hasDisabilityCert === "false"
            ? false
            : null,
    };

    onSubmit(normalizedProfile);
  };

  const fieldClass = (field) =>
    `w-full rounded-3xl border px-4 py-3 text-slate-900 outline-none focus:border-brand ${
      errors[field]
        ? "border-danger bg-red-50 focus:border-danger"
        : "border-slate-200 bg-slate-50"
    }`;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <div className="mb-8">
          <p className="text-brand-dark font-semibold uppercase tracking-[0.24em] text-xs">
            {t.startCheck}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            {t.formIntro}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">{t.age}</span>
            <input
              type="number"
              min="10"
              max="100"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder={t.agePlaceholder}
              className={fieldClass("age")}
            />
            {errors.age && <p className="text-sm text-danger">{errors.age}</p>}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              {t.gender}
            </span>
            <select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className={fieldClass("gender")}
            >
              <option value="">{t.gender}</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-danger">{errors.gender}</p>
            )}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              {t.state}
            </span>
            <select
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className={fieldClass("state")}
            >
              <option value="">{t.statePlaceholder}</option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-sm text-danger">{errors.state}</p>
            )}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              {t.areaType}
            </span>
            <select
              value={form.areaType}
              onChange={(e) => handleChange("areaType", e.target.value)}
              className={fieldClass("areaType")}
            >
              <option value="">Select one</option>
              <option value="rural">{t.rural}</option>
              <option value="urban">{t.urban}</option>
            </select>
            {errors.areaType && (
              <p className="text-sm text-danger">{errors.areaType}</p>
            )}
          </label>
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              {t.occupation}
            </span>
            <select
              value={form.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              className={fieldClass("occupation")}
            >
              <option value="">Select one</option>
              {OCCUPATIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.occupation && (
              <p className="text-sm text-danger">{errors.occupation}</p>
            )}
          </label>
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">
              {t.incomeRange}
            </span>
            <select
              value={form.incomeRange}
              onChange={(e) => handleChange("incomeRange", e.target.value)}
              className={fieldClass("incomeRange")}
            >
              <option value="">Select one</option>
              {INCOME_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.incomeRange && (
              <p className="text-sm text-danger">{errors.incomeRange}</p>
            )}
          </label>
          {[
            "hasAadhaar",
            "hasMobileLinked",
            "hasBankAccount",
            "hasRationCard",
            "hasIncomeCert",
          ].map((field) => (
            <label key={field} className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                {t[field]}
              </span>
              <select
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={fieldClass(field)}
              >
                <option value="">Select one</option>
                <option value="true">{t.yes}</option>
                <option value="false">{t.no}</option>
              </select>
              {errors[field] && (
                <p className="text-sm text-danger">{errors[field]}</p>
              )}
            </label>
          ))}
          {["hasCasteCert", "hasDisabilityCert"].map((field) => (
            <label key={field} className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                {t[field]}
              </span>
              <select
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={fieldClass(field)}
              >
                <option value="">Select one</option>
                <option value="true">{t.yes}</option>
                <option value="false">{t.no}</option>
                <option value="na">{t.notApplicable}</option>
              </select>
              {errors[field] && (
                <p className="text-sm text-danger">{errors[field]}</p>
              )}
            </label>
          ))}
        </div>
        <div className="mt-8 text-right">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
          >
            {t.submit}
          </button>
        </div>
      </div>
    </section>
  );
}
