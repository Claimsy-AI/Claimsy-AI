import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../onboardingStore";

type FormState = {
  revenue: string;
  headcount: string;
  serviceAreas: string;
  monthlyVolume: string;
  mitigationVsRecon: string;
  responseTime: string;
  emergencyServices: string;
  intakeProcess: string;
  dispatchSpeed: string;
  equipment: string;
  maxConcurrent: string;
  scalePlan: string;
  jobSoftware: string;
  docProcess: string;
  performanceMeasure: string;
  sops: string;
  certifications: string;
  certifiedStaff: string;
  insuranceCoverage: string;
  disputes: string;
  googleRating: string;
  reviews12mo: string;
  surveySystem: string;
  complaintsProcess: string;
  roles: string;
  qualityOwner: string;
  teamMeetings: string;
  scalingHistory: string;
  accountant: string;
  billingCycle: string;
  jobCosts: string;
  reinvest: string;
  partnerships: string;
  standards: string;
  fitReason: string;
};

type FieldDefinition = {
  type: "input" | "textarea";
  field: keyof FormState;
  label: string;
  placeholder?: string;
  fullWidth?: boolean;
};

type SectionDefinition = {
  id: string;
  title: string;
  description: string;
  fields: FieldDefinition[];
};

const initialForm: FormState = {
  revenue: "",
  headcount: "",
  serviceAreas: "",
  monthlyVolume: "",
  mitigationVsRecon: "",
  responseTime: "",
  emergencyServices: "",
  intakeProcess: "",
  dispatchSpeed: "",
  equipment: "",
  maxConcurrent: "",
  scalePlan: "",
  jobSoftware: "",
  docProcess: "",
  performanceMeasure: "",
  sops: "",
  certifications: "",
  certifiedStaff: "",
  insuranceCoverage: "",
  disputes: "",
  googleRating: "",
  reviews12mo: "",
  surveySystem: "",
  complaintsProcess: "",
  roles: "",
  qualityOwner: "",
  teamMeetings: "",
  scalingHistory: "",
  accountant: "",
  billingCycle: "",
  jobCosts: "",
  reinvest: "",
  partnerships: "",
  standards: "",
  fitReason: "",
};

const sections: SectionDefinition[] = [
  {
    id: "snapshot",
    title: "Company Snapshot",
    description: "Size, structure, and operational maturity.",
    fields: [
      { type: "input", field: "revenue", label: "Current annual revenue", placeholder: "$1.2M" },
      { type: "input", field: "headcount", label: "Full-time technicians + project managers", placeholder: "e.g., 12 techs, 3 PMs" },
      { type: "input", field: "serviceAreas", label: "Service areas (zip codes)", placeholder: "80014, 80015, 80202" },
      { type: "input", field: "monthlyVolume", label: "Average monthly job volume", placeholder: "e.g., 35 jobs/mo" },
      { type: "input", field: "mitigationVsRecon", label: "% of work: mitigation vs. reconstruction", placeholder: "70% mitigation / 30% recon" },
    ],
  },
  {
    id: "response",
    title: "Response Time & Availability",
    description: "Speed expectations for insurance + referral partners.",
    fields: [
      { type: "input", field: "responseTime", label: "Average response time for emergency calls", placeholder: "e.g., 60 minutes" },
      {
        type: "textarea",
        field: "emergencyServices",
        label: "24/7 emergency services + staffing model",
        placeholder: "Yes; after-hours on-call rotation with 2 techs",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "intakeProcess",
        label: "Intake/call handling process (after-hours handler)",
        placeholder: "Calls answered by on-call coordinator; escalation tree...",
        fullWidth: true,
      },
      {
        type: "input",
        field: "dispatchSpeed",
        label: "Dispatch speed after receiving a lead",
        placeholder: "e.g., tech dispatched within 45 min",
      },
    ],
  },
  {
    id: "equipment",
    title: "Equipment & Capacity",
    description: "Ensure they can absorb increased volume.",
    fields: [
      {
        type: "textarea",
        field: "equipment",
        label: "Drying equipment owned",
        placeholder: "20 dehus, 80 air movers, injectidry, HEPA scrubbers",
        fullWidth: true,
      },
      { type: "input", field: "maxConcurrent", label: "Max concurrent mitigation jobs", placeholder: "e.g., 18 jobs" },
      {
        type: "textarea",
        field: "scalePlan",
        label: "Scale plan (30–90 days) if volume increases",
        placeholder: "Leasing plan + supplier partnerships to add 10 dehus",
        fullWidth: true,
      },
    ],
  },
  {
    id: "quality",
    title: "Quality Assurance & Field Documentation",
    description: "Consistency and documentation rigor.",
    fields: [
      { type: "input", field: "jobSoftware", label: "Job management software", placeholder: "Encircle / MICA / Dash / other" },
      {
        type: "textarea",
        field: "docProcess",
        label: "Standardized documentation process",
        placeholder: "Photos per room, moisture logs daily, daily updates...",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "performanceMeasure",
        label: "How technician performance is measured",
        placeholder: "QA scorecards, callbacks, documentation completeness",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "sops",
        label: "Formal SOPs for mitigation, reconstruction, communication",
        placeholder: "Links or description of SOPs and training cadence",
        fullWidth: true,
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Certifications",
    description: "Professional standards and insurance legitimacy.",
    fields: [
      {
        type: "textarea",
        field: "certifications",
        label: "Current IICRC certifications",
        placeholder: "WRT, ASD, AMRT; include counts per technician",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "certifiedStaff",
        label: "Certification coverage across staff",
        placeholder: "All crews supervised by certified lead; 8/10 techs certified",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "insuranceCoverage",
        label: "Insurance coverage",
        placeholder: "GL, WC, Pollution—include limits if possible",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "disputes",
        label: "Insurance claims or legal disputes (last 3 years)",
        placeholder: "Summaries and outcomes",
        fullWidth: true,
      },
    ],
  },
  {
    id: "branding",
    title: "Branding, Reputation & Customer Experience",
    description: "Customer satisfaction predictors.",
    fields: [
      { type: "input", field: "googleRating", label: "Current Google rating (link)", placeholder: "4.7 (link)" },
      { type: "input", field: "reviews12mo", label: "Reviews collected in past 12 months", placeholder: "e.g., 55 reviews" },
      {
        type: "textarea",
        field: "surveySystem",
        label: "Customer satisfaction survey or review-request system",
        placeholder: "Automated post-job surveys, SMS review requests",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "complaintsProcess",
        label: "Process for handling customer complaints",
        placeholder: "Escalation steps, response SLAs, remediation offers",
        fullWidth: true,
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Internal Structure",
    description: "Identify operator vs. owner gaps.",
    fields: [
      {
        type: "textarea",
        field: "roles",
        label: "Roles currently filled",
        placeholder: "PM, estimator, office admin, ops manager, lead techs",
        fullWidth: true,
      },
      { type: "input", field: "qualityOwner", label: "Who ensures job quality", placeholder: "e.g., Ops manager + QA lead" },
      { type: "input", field: "teamMeetings", label: "Weekly team meetings and KPI reviews?", placeholder: "Yes; Mondays with KPI deck" },
      {
        type: "textarea",
        field: "scalingHistory",
        label: "Scaling history and outcomes",
        placeholder: "Scaled from 5 to 12 techs; lessons learned...",
        fullWidth: true,
      },
    ],
  },
  {
    id: "finance",
    title: "Financial Discipline & Scalability",
    description: "Cash flow, billing, and reinvestment.",
    fields: [
      { type: "input", field: "accountant", label: "Accounting/bookkeeping system", placeholder: "In-house accountant + QuickBooks" },
      { type: "input", field: "billingCycle", label: "Time to bill/close out jobs", placeholder: "e.g., within 7 days of completion" },
      { type: "input", field: "jobCosts", label: "Job cost & gross profit tracking", placeholder: "Tracked per job in QB + dashboards" },
      {
        type: "input",
        field: "reinvest",
        label: "Willingness to reinvest 10–20% of new revenue",
        placeholder: "Yes/No + planned uses",
      },
    ],
  },
  {
    id: "fit",
    title: "Partnership Fit",
    description: "Alignment with ecosystem values.",
    fields: [
      {
        type: "textarea",
        field: "partnerships",
        label: "Prior partnerships with restoration networks",
        placeholder: "Names and nature of partnerships",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "standards",
        label: "Willingness to follow strict quality/response standards",
        placeholder: "Affirmation and any concerns",
        fullWidth: true,
      },
      {
        type: "textarea",
        field: "fitReason",
        label: "Why join and what makes you a good fit",
        placeholder: "Motivation, strengths, differentiators",
        fullWidth: true,
      },
    ],
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { setOnboarding } = useOnboardingStore();
  const [form, setForm] = useState<FormState>(initialForm);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboarding(form);
    alert("Onboarding saved. Redirecting to profile.");
    navigate("/settings");
  };

  const goToStep = (next: number) => {
    const clamped = Math.min(sections.length - 1, Math.max(0, next));
    setCurrentStep(clamped);
  };

  const progress = Math.round(((currentStep + 1) / sections.length) * 100);
  const currentSection = sections[currentStep];

  const renderField = (field: FieldDefinition) => {
    if (field.type === "textarea") {
      return (
        <label key={field.field} className={`flex flex-col gap-2 text-sm ${field.fullWidth ? "md:col-span-2" : ""}`}>
          <span className="text-main font-semibold">{field.label}</span>
          <textarea
            className="input-surface rounded-xl px-3 py-2 text-base text-main focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            rows={3}
            value={form[field.field]}
            onChange={handleChange(field.field)}
            placeholder={field.placeholder}
          />
        </label>
      );
    }

    return (
      <label key={field.field} className={`flex flex-col gap-2 text-sm ${field.fullWidth ? "md:col-span-2" : ""}`}>
        <span className="text-main font-semibold">{field.label}</span>
        <input
          className="input-surface rounded-xl px-3 py-2 text-base text-main focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          value={form[field.field]}
          onChange={handleChange(field.field)}
          placeholder={field.placeholder}
        />
      </label>
    );
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="panel relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-purple-500/15 to-emerald-500/20 blur-3xl" aria-hidden />
        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill bg-[var(--card-muted)] text-main">Guided intake</span>
            <span className="pill bg-[var(--card-muted)] text-main">9 modules · ~8 mins</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-main">Vendor onboarding</h1>
            <p className="text-sm sm:text-base text-muted max-w-3xl">
              Move through focused modules instead of one scroll. We keep the same questions—just paced so you can answer quickly.
            </p>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-[var(--border)]/70 overflow-hidden">
              <div className="h-full bg-white/60" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted">
              <span>Step {currentStep + 1} of {sections.length}</span>
              <span>{progress}% complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <aside className="panel rounded-2xl p-4 shadow-lg space-y-3 h-fit sticky top-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Navigator</p>
              <p className="text-sm text-main font-semibold">Jump to any module</p>
            </div>
            <div className="pill bg-[var(--card-muted)] text-main">Progress</div>
          </div>
          <div className="space-y-2">
            {sections.map((section, index) => {
              const isActive = index === currentStep;
              const isDone = index < currentStep;
              return (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => goToStep(index)}
                  className={`w-full rounded-xl border border-[var(--border)] px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                    isActive ? "bg-[var(--card-muted)] shadow-lg" : "bg-[var(--card)]/70 hover:bg-[var(--card)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted">
                    <span>Step {index + 1}</span>
                    {isDone ? <span className="text-emerald-400 font-semibold">Saved</span> : null}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-main">{section.title}</div>
                  <p className="text-xs text-muted">{section.description}</p>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-5">
          <div className="panel rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted">
                  Section {currentStep + 1} of {sections.length}
                </p>
                <h2 className="text-2xl font-semibold text-main">{currentSection.title}</h2>
                <p className="text-sm text-muted max-w-3xl">{currentSection.description}</p>
              </div>
              <div className="pill bg-[var(--card-muted)] text-main">Focused questions</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSection.fields.map((field) => renderField(field))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                className="pill text-main bg-[var(--card-muted)] disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => goToStep(currentStep - 1)}
                disabled={currentStep === 0}
              >
                Back
              </button>

              {currentStep < sections.length - 1 ? (
                <button
                  type="button"
                  className="pill text-main bg-[var(--card-muted)] hover:-translate-y-0.5 transition"
                  onClick={() => goToStep(currentStep + 1)}
                >
                  Next section
                </button>
              ) : (
                <button type="submit" className="pill text-main bg-white/10 hover:-translate-y-0.5 transition">
                  Submit onboarding
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Onboarding;
