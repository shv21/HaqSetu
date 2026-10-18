import { useState } from "react";
import { 
  User, 
  GraduationCap, 
  FileCheck2, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Check, 
  Sparkles, 
  HelpCircle,
  MapPin,
  Building2,
  Briefcase
} from "lucide-react";
import translations from "../translations.js";
import { loadProfile } from "../utils/storage.js";

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
  { value: "informal worker", label: "Informal Worker / Labourer" },
  { value: "daily wage worker", label: "Daily Wage Worker / Mazdoor" },
  { value: "farmer", label: "Farmer / Agricultural Worker" },
  { value: "student", label: "Student / Pursuing Education" },
  { value: "street vendor", label: "Street Vendor / Hawker" },
  { value: "self-employed", label: "Self-Employed / Traditional Artisan" },
  { value: "homemaker", label: "Homemaker / Family Caregiver" },
  { value: "pregnant woman / mother", label: "Pregnant Woman / New Mother" },
  { value: "unemployed youth", label: "Unemployed Youth" },
];

const INCOME_RANGES = [
  "< ₹10,000",
  "₹10,000 - ₹20,000",
  "₹20,000 - ₹30,000",
  "> ₹30,000",
];

export default function EligibilityForm({ lang, onSubmit, initialValues }) {
  const t = translations[lang] || translations.en;
  const storedProfile = loadProfile() || {};
  const defaults = { ...storedProfile, ...initialValues };

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: defaults.fullName || "",
    age: defaults.age ? String(defaults.age) : "",
    gender: defaults.gender || "male",
    address: defaults.address || "",
    district: defaults.district || "",
    state: defaults.state || "Uttar Pradesh",
    areaType: defaults.areaType || "rural",
    qualification: defaults.qualification || "secondary",
    occupation: defaults.occupation || "informal worker",
    categoryPreference: defaults.categoryPreference || "all",
    incomeRange: defaults.incomeRange || "< ₹10,000",
    hasAadhaar: defaults.hasAadhaar ?? true,
    hasMobileLinked: defaults.hasMobileLinked ?? true,
    hasBankAccount: defaults.hasBankAccount ?? true,
    hasRationCard: defaults.hasRationCard ?? true,
    hasIncomeCert: defaults.hasIncomeCert ?? true,
    hasCasteCert: defaults.hasCasteCert ?? false,
    hasDisabilityCert: defaults.hasDisabilityCert ?? false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = () => {
    const errs = {};
    if (!form.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    const ageNum = Number(form.age);
    if (!form.age || isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
      errs.age = "Please enter a valid age between 10 and 100.";
    }
    if (!form.state) {
      errs.state = "Please select your state.";
    }
    if (!form.areaType) {
      errs.areaType = "Please select rural or urban.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!form.qualification) {
      errs.qualification = "Please select your educational qualification.";
    }
    if (!form.occupation) {
      errs.occupation = "Please select your occupation.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 3) {
      setStep(4); // Review step
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const parseBooleanField = (value) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    return false;
  };

  const handleFinalSubmit = () => {
    const normalizedProfile = {
      ...form,
      fullName: form.fullName.trim() || "Citizen",
      age: Number(form.age) || 25,
      hasAadhaar: parseBooleanField(form.hasAadhaar),
      hasMobileLinked: parseBooleanField(form.hasMobileLinked),
      hasBankAccount: parseBooleanField(form.hasBankAccount),
      hasRationCard: parseBooleanField(form.hasRationCard),
      hasIncomeCert: parseBooleanField(form.hasIncomeCert),
      hasCasteCert: parseBooleanField(form.hasCasteCert),
      hasDisabilityCert: parseBooleanField(form.hasDisabilityCert),
    };
    onSubmit(normalizedProfile);
  };

  const stepsList = [
    { num: 1, label: "Personal", icon: User },
    { num: 2, label: "Work & Education", icon: GraduationCap },
    { num: 3, label: "Documents", icon: FileCheck2 },
    { num: 4, label: "Review", icon: Sparkles },
  ];

  const progressPercentage = Math.round(((step - 1) / (stepsList.length - 1)) * 100);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      
      {/* Questionnaire Card */}
      <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
        
        {/* Progress Bar & Header */}
        <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#123B63]">
                Eligibility Questionnaire
              </span>
              <h2 className="text-xl font-bold text-[#1F2937] mt-0.5">
                {step === 1 && "Step 1: Personal Details"}
                {step === 2 && "Step 2: Education & Work Profile"}
                {step === 3 && "Step 3: Document Readiness"}
                {step === 4 && "Step 4: Review Your Details"}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
              <span>Step {step} of 4</span>
              <span className="font-semibold text-[#123B63]">({progressPercentage}% completed)</span>
            </div>
          </div>

          {/* Linear Progress Indicator */}
          <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#123B63] h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${Math.max(10, progressPercentage)}%` }}
            />
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {stepsList.map((s) => {
              const Icon = s.icon;
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  disabled={!isPassed && !isCurrent}
                  onClick={() => {
                    if (isPassed) setStep(s.num);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded transition-colors ${
                    isCurrent 
                      ? "text-[#123B63] font-semibold"
                      : isPassed
                      ? "text-[#13805B] cursor-pointer hover:underline"
                      : "text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                  {isPassed && <Check className="h-3 w-3 text-[#13805B]" />}
                </button>
              );
            })}
          </div>

        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">

          {/* ================= STEP 1: PERSONAL DETAILS ================= */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="bg-[#EAF2F8] border border-[#D1E3F1] rounded-lg p-3 text-xs text-[#123B63] flex items-start gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>We only use these details locally to determine scheme eligibility rules. No personal data is stored without permission.</span>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="form-fullName" className="block text-xs font-semibold text-[#1F2937] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="form-fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className={`input-clean ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Age & Gender Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-age" className="block text-xs font-semibold text-[#1F2937] mb-1">
                    Age (in years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="form-age"
                    type="number"
                    min="10"
                    max="100"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    placeholder="e.g. 28"
                    className={`input-clean ${errors.age ? "border-red-500" : ""}`}
                  />
                  {errors.age && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="h-3.5 w-3.5" /> {errors.age}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ].map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => handleChange("gender", g.value)}
                        className={`rounded-lg border py-2 text-xs font-medium transition-colors ${
                          form.gender === g.value
                            ? "border-[#123B63] bg-[#EAF2F8] text-[#123B63] font-semibold"
                            : "border-[#E2E8F0] bg-white text-[#1F2937] hover:bg-slate-50"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* State & Area Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-state" className="block text-xs font-semibold text-[#1F2937] mb-1">
                    State / Union Territory <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="form-state"
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="select-clean"
                  >
                    {STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F2937] mb-1">
                    Area Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "rural", label: "Rural (गाँव)" },
                      { value: "urban", label: "Urban (शहर)" },
                    ].map((area) => (
                      <button
                        key={area.value}
                        type="button"
                        onClick={() => handleChange("areaType", area.value)}
                        className={`rounded-lg border py-2 text-xs font-medium transition-colors ${
                          form.areaType === area.value
                            ? "border-[#123B63] bg-[#EAF2F8] text-[#123B63] font-semibold"
                            : "border-[#E2E8F0] bg-white text-[#1F2937] hover:bg-slate-50"
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optional District & Town */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-district" className="block text-xs font-semibold text-[#1F2937] mb-1">
                    District (Optional)
                  </label>
                  <input
                    id="form-district"
                    type="text"
                    value={form.district}
                    onChange={(e) => handleChange("district", e.target.value)}
                    placeholder="e.g. Varanasi"
                    className="input-clean"
                  />
                </div>

                <div>
                  <label htmlFor="form-address" className="block text-xs font-semibold text-[#1F2937] mb-1">
                    Village / Town / Ward (Optional)
                  </label>
                  <input
                    id="form-address"
                    type="text"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="e.g. Rampur"
                    className="input-clean"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E2E8F0] flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary"
                >
                  <span>Continue to Work & Education</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 2: QUALIFICATION & WORK ================= */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              
              <p className="text-xs text-[#64748B]">
                Specify your education level and work sector so the engine can check targeted schemes.
              </p>

              {/* Scheme Category Interest */}
              <div>
                <label htmlFor="form-catPref" className="block text-xs font-semibold text-[#1F2937] mb-1">
                  Primary Scheme Category of Interest
                </label>
                <select
                  id="form-catPref"
                  value={form.categoryPreference}
                  onChange={(e) => handleChange("categoryPreference", e.target.value)}
                  className="select-clean"
                >
                  <option value="all">All Categories (Comprehensive Search)</option>
                  <option value="health">Healthcare & Hospital Cashless Coverage</option>
                  <option value="education">Scholarships, Student Aid & Education</option>
                  <option value="money">Financial Assistance & Cash Benefits</option>
                  <option value="farmer">Agriculture, Farming & Livestock</option>
                  <option value="skill">Skill Training, Artisans & Self-Employment</option>
                  <option value="housing">Housing & Permanent Pucca House</option>
                </select>
              </div>

              {/* Education Level */}
              <div>
                <label htmlFor="form-qual" className="block text-xs font-semibold text-[#1F2937] mb-1">
                  Educational Qualification <span className="text-red-500">*</span>
                </label>
                <select
                  id="form-qual"
                  value={form.qualification}
                  onChange={(e) => handleChange("qualification", e.target.value)}
                  className="select-clean"
                >
                  <option value="noFormal">No Formal Schooling / Literate</option>
                  <option value="primary">Primary School (Up to 5th)</option>
                  <option value="middle">Middle School (Up to 8th)</option>
                  <option value="secondary">Secondary (10th Pass)</option>
                  <option value="higherSecondary">Higher Secondary (12th Pass)</option>
                  <option value="diploma">ITI / Vocational Diploma</option>
                  <option value="graduate">Graduate (BA, BSc, BCom, BTech, etc.)</option>
                  <option value="postGraduate">Post Graduate / Higher</option>
                </select>
              </div>

              {/* Occupation */}
              <div>
                <label htmlFor="form-occ" className="block text-xs font-semibold text-[#1F2937] mb-1">
                  Occupation / Beneficiary Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="form-occ"
                  value={form.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  className="select-clean"
                >
                  {OCCUPATIONS.map((occ) => (
                    <option key={occ.value} value={occ.value}>{occ.label}</option>
                  ))}
                </select>
              </div>

              {/* Monthly Family Income */}
              <div>
                <label htmlFor="form-income" className="block text-xs font-semibold text-[#1F2937] mb-1">
                  Estimated Monthly Household Income
                </label>
                <select
                  id="form-income"
                  value={form.incomeRange}
                  onChange={(e) => handleChange("incomeRange", e.target.value)}
                  className="select-clean"
                >
                  {INCOME_RANGES.map((rng) => (
                    <option key={rng} value={rng}>{rng}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary"
                >
                  <span>Continue to Documents</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 3: DOCUMENT READINESS ================= */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs text-[#64748B]">
                Indicate which documents you currently hold. If you don't have some documents yet, the system will highlight the exact steps to acquire them.
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { field: "hasAadhaar", title: "Aadhaar Card", desc: "Required for identity authentication" },
                  { field: "hasMobileLinked", title: "Aadhaar-Linked Mobile", desc: "Needed for OTP-based e-KYC verification" },
                  { field: "hasBankAccount", title: "Active Bank Account", desc: "For direct DBT subsidy transfers" },
                  { field: "hasRationCard", title: "Ration Card (BPL/APL/AAY)", desc: "Proof of household food & welfare status" },
                  { field: "hasIncomeCert", title: "Income Certificate", desc: "Certifies family income eligibility" },
                  { field: "hasCasteCert", title: "Caste Certificate", desc: "For SC/ST/OBC category reservations" },
                  { field: "hasDisabilityCert", title: "Disability Certificate", desc: "For Divyangjan assistance programs" },
                ].map(({ field, title, desc }) => {
                  const isYes = form[field] === true || form[field] === "true";
                  return (
                    <div
                      key={field}
                      className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-semibold text-[#1F2937] block">
                          {title}
                        </span>
                        <span className="text-[11px] text-[#64748B] block mt-0.5">
                          {desc}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleChange(field, true)}
                          className={`rounded py-1.5 text-xs font-medium transition-colors ${
                            isYes
                              ? "bg-[#13805B] text-white font-semibold"
                              : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
                          }`}
                        >
                          ✓ Yes, I have it
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChange(field, false)}
                          className={`rounded py-1.5 text-xs font-medium transition-colors ${
                            !isYes
                              ? "bg-slate-700 text-white font-semibold"
                              : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
                          }`}
                        >
                          ✕ Not yet
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary"
                >
                  <span>Review Answers</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 4: REVIEW & SUBMIT ================= */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="border border-[#D1E3F1] bg-[#EAF2F8] rounded-lg p-4 text-xs text-[#123B63]">
                <p className="font-semibold text-sm mb-1">Ready to discover your schemes!</p>
                <p>Please review your details below before generating your matched schemes list.</p>
              </div>

              <div className="rounded-lg border border-[#E2E8F0] bg-white divide-y divide-[#E2E8F0] text-xs">
                
                {/* Personal Section Review */}
                <div className="p-4 flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-[#1F2937] text-sm">Personal Profile</p>
                    <p className="text-[#64748B]">Name: <span className="font-medium text-[#1F2937]">{form.fullName || "Citizen"}</span></p>
                    <p className="text-[#64748B]">Age: <span className="font-medium text-[#1F2937]">{form.age} yrs</span> • Gender: <span className="font-medium text-[#1F2937] capitalize">{form.gender}</span></p>
                    <p className="text-[#64748B]">Location: <span className="font-medium text-[#1F2937]">{form.state} ({form.areaType})</span></p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#123B63] font-medium hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Work & Category Section Review */}
                <div className="p-4 flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-[#1F2937] text-sm">Work & Education</p>
                    <p className="text-[#64748B]">Occupation: <span className="font-medium text-[#1F2937] capitalize">{form.occupation}</span></p>
                    <p className="text-[#64748B]">Qualification: <span className="font-medium text-[#1F2937] capitalize">{form.qualification}</span></p>
                    <p className="text-[#64748B]">Income: <span className="font-medium text-[#1F2937]">{form.incomeRange}</span></p>
                    <p className="text-[#64748B]">Category Interest: <span className="font-medium text-[#1F2937] capitalize">{form.categoryPreference}</span></p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-[#123B63] font-medium hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Documents Summary */}
                <div className="p-4 flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-[#1F2937] text-sm">Key Documents Available</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {form.hasAadhaar && <span className="rounded bg-[#E7F5EE] text-[#13805B] px-2 py-0.5 text-[11px] font-medium">Aadhaar</span>}
                      {form.hasMobileLinked && <span className="rounded bg-[#E7F5EE] text-[#13805B] px-2 py-0.5 text-[11px] font-medium">Mobile Linked</span>}
                      {form.hasBankAccount && <span className="rounded bg-[#E7F5EE] text-[#13805B] px-2 py-0.5 text-[11px] font-medium">Bank Account</span>}
                      {form.hasRationCard && <span className="rounded bg-[#E7F5EE] text-[#13805B] px-2 py-0.5 text-[11px] font-medium">Ration Card</span>}
                      {form.hasIncomeCert && <span className="rounded bg-[#E7F5EE] text-[#13805B] px-2 py-0.5 text-[11px] font-medium">Income Cert</span>}
                      {form.hasCasteCert && <span className="rounded bg-[#E7F5EE] text-[#13805B] px-2 py-0.5 text-[11px] font-medium">Caste Cert</span>}
                      {form.hasDisabilityCert && <span className="rounded bg-[#E7F5EE] text-[#13805B] px-2 py-0.5 text-[11px] font-medium">Disability Cert</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-[#123B63] font-medium hover:underline"
                  >
                    Edit
                  </button>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Documents</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="btn-primary py-3 px-6 text-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Discover Matching Schemes</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
