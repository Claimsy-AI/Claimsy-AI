import { useMemo, useState } from "react";

type KeyPoint = { label: string; detail: string };
type Workflow = { title: string; steps: string[] };
type BusinessPlanSection =
  | { title: string; eyebrow: string; points: KeyPoint[] }
  | { title: string; eyebrow: string; workflows: Workflow[] };

const SectionCard = ({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) => (
  <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
    <div className="flex items-start justify-between gap-3">
      <div>
        {eyebrow ? <p className="text-xs uppercase tracking-wide text-muted">{eyebrow}</p> : null}
        <h3 className="text-xl font-semibold text-main">{title}</h3>
      </div>
      <span className="pill text-main bg-[var(--card-muted)] text-[11px]">Spec</span>
    </div>
    {children}
  </div>
);

const KeyPointList = ({ points }: { points: KeyPoint[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {points.map((point) => (
      <div key={point.label} className="panel-muted rounded-xl px-3 py-3 space-y-1 border border-[var(--border)]">
        <p className="text-sm font-semibold text-main">{point.label}</p>
        <p className="text-sm text-muted leading-relaxed">{point.detail}</p>
      </div>
    ))}
  </div>
);

const PillTabs = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="flex flex-wrap items-center gap-2">
    {options.map((option) => {
      const active = option === value;
      return (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`pill text-sm ${active ? "bg-white/15 text-main shadow-lg" : "bg-[var(--card-muted)] text-muted"}`}
        >
          {option}
        </button>
      );
    })}
  </div>
);

const businessPlanSections: BusinessPlanSection[] = [
  {
    title: "Executive Summary",
    eyebrow: "Section A",
    points: [
      { label: "Mission", detail: "Unify adjusters, agencies, and vendors into a transparent AI-assisted ecosystem that accelerates claims and rewards participation." },
      { label: "Vision", detail: "Preferred national platform for claims management, referral automation, vendor compliance, and restoration documentation." },
      { label: "Market Problem", detail: "Current process is disconnected, slow, stressful, and risky with no single platform coordinating parties or compliance." },
      { label: "Solution", detail: "Single platform with live vendor tracking, AI-organized documentation, referral tracking, and co-op rewards." },
    ],
  },
  {
    title: "Platform Architecture",
    eyebrow: "Section B",
    points: [
      { label: "Single Claims Database", detail: "Case IDs, insured info, loss details, assignments, photos, docs, timeline events, QA scores, and history live in one record." },
      { label: "Role Dashboards", detail: "Adjuster (control, documentation), Agency (submission, status, credits), Vendor (execution), Relationship Manager (ecosystem health)." },
      { label: "Back-End Systems", detail: "AI compliance engine, referral tracking engine, notification engine, QA scoring, co-op points tracker, and role permissions." },
    ],
  },
  {
    title: "Workflows (Development-ready)",
    eyebrow: "Section C",
    workflows: [
      { title: "Adjuster", steps: ["Login", "Review queue", "Assign vendor", "Docs auto-organize", "AI flags gaps", "Approve/close", "Credits awarded"] },
      { title: "Insurance Agency", steps: ["Submit claim (45 sec)", "Auto-assign vendor", "Status notifications", "Download summary", "Quarterly credits", "Redeem rewards"] },
      { title: "Vendor", steps: ["Receive assignment", "Accept/decline", "Check-in/out", "Upload photos/logs", "Complete checklist", "QA update", "Payment trigger"] },
      { title: "Success Manager", steps: ["See compliance flags", "Reach out", "Monitor escalations", "Document resolutions"] },
      { title: "Lifecycle", steps: ["Submission", "Assignment", "Work", "Documentation", "QA", "Completion", "Archive & Credits"] },
      { title: "Referral", steps: ["Submit referral", "Log referral", "Assign vendor", "Complete job", "Add referral credits"] },
      { title: "Documentation & Compliance", steps: ["Upload docs", "AI checks moisture/photos/notes/signatures", "Flag missing", "Notify", "Adjuster approves"] },
      { title: "Notification", steps: ["New claim", "Vendor assigned", "Docs uploaded", "Job completion", "Missing items via email/SMS/in-app"] },
      { title: "Co-Op Credit", steps: ["Log activity", "Assign points", "Calculate pool", "Distribute credits", "Redeem"] },
    ],
  },
  {
    title: "Revenue Model",
    eyebrow: "Section D",
    points: [
      { label: "Platform Fee", detail: "Restoration companies pay platform fee (example 10%) without affecting referral neutrality." },
      { label: "Co-Op Revenue", detail: "Portion of revenue funds credit distributions, training, and growth." },
      { label: "Add-Ons", detail: "Premium vendor placement (performance-gated), advanced reporting, AI audit packages, CRM upgrades." },
      { label: "Long-Term", detail: "Carrier partnerships, white-label, and API integrations." },
    ],
  },
  {
    title: "Legal Governance",
    eyebrow: "Section E",
    points: [
      { label: "No Kickbacks", detail: "No cash or claim-value incentives; credits are non-cash." },
      { label: "Vendor Neutrality", detail: "Scores cannot be influenced by payments; adjusters remain independent." },
      { label: "Documentation Standards", detail: "Moisture logs, photos, notes, signatures stored with timestamps and immutability." },
      { label: "Data Privacy", detail: "Align with HIPAA (where applicable), CCPA, GDPR." },
    ],
  },
  {
    title: "Incentive Structure",
    eyebrow: "Section F",
    points: [
      { label: "Points", detail: "Referral 100 (highest); Claim entered 40; Vendor compliance 20; Training 10; Engagement 5." },
      { label: "Distribution", detail: "Allocate % of platform revenue to pool, convert points to proportional shares, distribute as credits only." },
      { label: "Redemption", detail: "Credits valid within year, non-cash, used for approved rewards." },
    ],
  },
  {
    title: "Rewards Catalog",
    eyebrow: "Section G",
    points: [
      { label: "Lead Packs", detail: "100, 250, 500 lead packs for agents." },
      { label: "Marketing", detail: "Social ads, direct mail, local SEO boosts." },
      { label: "Adjuster Incentives", detail: "Software tools, CE credits, travel, gift-card equivalents." },
      { label: "Vendor Training", detail: "Documentation mastery, moisture mapping, customer service." },
      { label: "Platform Credits", detail: "Account upgrades, extra seats, enhanced analytics." },
    ],
  },
  {
    title: "Operations Plan",
    eyebrow: "Section H",
    points: [
      { label: "Support Team", detail: "Own onboarding, troubleshooting, vendor training, agency success tracking." },
      { label: "Playbooks", detail: "Tailored for adjusters, agents, vendors." },
      { label: "Vendor Vetting", detail: "Licensing, insurance, training, documentation quality, satisfaction." },
    ],
  },
  {
    title: "Roadmap & Milestones",
    eyebrow: "Section I",
    points: [
      { label: "Phase 1", detail: "MVP web app: claims intake, vendor uploads, agency dashboard." },
      { label: "Phase 2", detail: "Adjuster mobile app: offline, push, on-site documentation." },
      { label: "Phase 3", detail: "AI automation: auto-audit, missing document detection, performance scoring." },
      { label: "Phase 4", detail: "National rollout: carrier partnerships, multi-state marketplace, co-op expansion." },
    ],
  },
];

const screenColumns = (items: { title: string; bullets: string[] }[]) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {items.map((item) => (
      <div key={item.title} className="panel-muted rounded-xl px-4 py-4 space-y-2 border border-[var(--border)]">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-main">{item.title}</p>
          <span className="tag text-muted">Screen</span>
        </div>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const InsuranceAgencySpec = () => {
  const screens = useMemo(
    () => [
      {
        title: "Dashboard (Home)",
        bullets: [
          "Top bar with search and profile; sidebar navigation with core destinations.",
          "Hero overview cards: active claims, completions, resolution time, renewal protection, co-op credits.",
          "Active client claims table mirroring manager styling plus updates feed.",
        ],
      },
      {
        title: "Quick Claim Submission",
        bullets: [
          "Two-column 45-second form with policyholder, loss info, agency autofill.",
          "Optional drag-and-drop uploads for photos/documents.",
          "Submit routes to confirmation and optional vendor selection.",
        ],
      },
      {
        title: "Claim List",
        bullets: [
          "Filters: status, vendor, date range; matches manager claim table.",
          "Status pills for New, In Progress, Negotiation, Settled, Closed.",
          "Rows link to claim details.",
        ],
      },
      {
        title: "Claim Details",
        bullets: [
          "Header with case number, status pill, timestamps, download summary.",
          "Information grid: policyholder, agency, loss info, vendor, QA score.",
          "Timeline and documents panels with restricted agency view.",
        ],
      },
      {
        title: "Client Status",
        bullets: [
          "Shareable hero card with policyholder and address.",
          "Progress bar: Submitted -> Assigned -> Work -> Documentation -> Complete.",
          "Latest updates feed plus vendor/agent contacts.",
        ],
      },
      {
        title: "Notifications Center",
        bullets: [
          "Cards with title, timestamp, severity pill, related claim.",
          "Tabs for claim updates, vendor actions, documentation, system alerts.",
        ],
      },
      {
        title: "Co-Op Credits & Rewards",
        bullets: [
          "Credits dashboard with balance, next distribution, earn history, mini chart.",
          "Rewards marketplace grid with filters for lead packs, marketing, tools, training.",
          "Redeem flow via modal showing balance and confirmation.",
        ],
      },
      {
        title: "Settings",
        bullets: [
          "Agency profile, notification preferences, billing, and team users.",
          "Matches existing panel style and form components.",
        ],
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <SectionCard title="Insurance Agency UI" eyebrow="Wireframes">
        <p className="text-sm text-muted leading-relaxed">
          Operational surfaces stay simple: submit claim, monitor progress, redeem credits, and protect retention. Layout keeps the dark, glassy panels and rounded tables you use today.
        </p>
        {screenColumns(screens)}
      </SectionCard>
    </div>
  );
};

const VendorSpec = () => {
  const screens = useMemo(
    () => [
      {
        title: "Vendor Dashboard",
        bullets: [
          "Metrics: assigned, in-progress, overdue, response time, QA trend.",
          "Active jobs list with status pills (Blue=In Progress, Yellow=Pending, Green=Completed, Red=Issue).",
        ],
      },
      {
        title: "Job Details",
        bullets: [
          "Case header with status and check-in/out actions.",
          "Job info panel plus task checklist: photos, moisture logs, notes, final documentation.",
          "Timeline showing check-ins, documentation, corrections.",
        ],
      },
      {
        title: "Photo Upload",
        bullets: [
          "3x3 grid placeholders, drag/drop, and bulk upload option.",
          "Thumbnail previews on upload.",
        ],
      },
      {
        title: "Moisture Log Entry",
        bullets: [
          "Inline-editable table: room, device reading, humidity, notes.",
          "Optional PDF upload for full logs.",
        ],
      },
      {
        title: "Compliance / QA",
        bullets: [
          "Score breakdown cards for documentation, response time, CSAT, photo quality.",
          "Trend line over last 10 jobs and auto-flags for missing assets or delays.",
        ],
      },
      {
        title: "Payment Status",
        bullets: [
          "Job/amount/status/date table for transparency.",
          "Status pills for paid vs pending.",
        ],
      },
      {
        title: "Vendor Settings",
        bullets: [
          "Business profile, W9/COI/license uploads, notification preferences, team users.",
        ],
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <SectionCard title="Restoration Vendor UI" eyebrow="Wireframes">
        <p className="text-sm text-muted leading-relaxed">
          Task-first UI optimized for fast execution: clear checklist, quick uploads, and QA visibility without distracting from field work.
        </p>
        {screenColumns(screens)}
      </SectionCard>
    </div>
  );
};

const RelationshipManagerSpec = () => {
  const screens = useMemo(
    () => [
      {
        title: "Dashboard",
        bullets: [
          "Hero stats: active claims, at-risk claims, QA average, vendor compliance, adjuster engagement, agencies managed.",
          "Referrals and managers overview, QA trend graph, alerts grid for compliance issues.",
        ],
      },
      {
        title: "Claims List",
        bullets: [
          "Filters for status, vendor, adjuster, agency, at-risk toggle, date range.",
          "Flags column for compliance gaps, missing docs, delays.",
        ],
      },
      {
        title: "Claim Details",
        bullets: [
          "Standard info grid plus RM-only compliance card with missing docs, response time, pending approvals, AI flags.",
          "Actions to send reminders or flag for review.",
        ],
      },
      {
        title: "Vendor Performance",
        bullets: [
          "Sortable table by QA score, response time, compliance rate, volume, trend.",
          "Drill into vendor detail pages.",
        ],
      },
      {
        title: "Vendor Detail",
        bullets: [
          "Top card with contact and licensing artifacts.",
          "Performance metrics row, compliance checklist, issue log.",
        ],
      },
      {
        title: "Agencies & Adjusters",
        bullets: [
          "Tables for agencies and adjusters with claims, engagement, QA, and flags.",
          "Detail pages with charts for volume, referrals, engagement trends, credit activity.",
        ],
      },
      {
        title: "Referrals",
        bullets: [
          "KPIs for total referrals, conversion rate, top sources, spikes.",
          "Table with referral ID, agency, status, vendor, outcome, credits earned; optional path map.",
        ],
      },
      {
        title: "Compliance & QA Center",
        bullets: [
          "Alerts table for missing photos, delayed logs, low QA, severity, days outstanding.",
          "AI suggestions for remediation and predictive delays.",
        ],
      },
      {
        title: "Outreach Center",
        bullets: [
          "Messaging queue for claims/vendors/agencies needing action.",
          "Right-hand conversation pane with templates and attachments.",
        ],
      },
      {
        title: "Settings",
        bullets: [
          "Profile, notification preferences, regional settings, escalation thresholds, QA scoring rules (view-only).",
        ],
      },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <SectionCard title="Relationship Manager UI" eyebrow="Wireframes">
        <p className="text-sm text-muted leading-relaxed">
          Control-tower layout that mirrors your current manager visuals but layers in compliance, outreach, and referral intelligence for the ecosystem.
        </p>
        {screenColumns(screens)}
      </SectionCard>
    </div>
  );
};

const Blueprint = () => {
  const [tab, setTab] = useState<string>("Business Plan");
  const tabs = ["Business Plan", "Insurance Agency UI", "Restoration Vendor UI", "Relationship Manager UI"];

  return (
    <div className="space-y-6">
      <div className="panel relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-emerald-400/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-main font-semibold">Claimsy AI</p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-main">Investor-Ready Blueprint</h1>
              <p className="text-sm text-muted max-w-3xl mt-2">
                All nine business plan sections, platform mapping, compliant workflows, and Figma-ready wireframes for Insurance Agency, Restoration Vendor, and Relationship Manager roles.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="pill text-main bg-[var(--card-muted)]">Frontend spec</span>
              <span className="pill text-main bg-white/10">Dark mode ready</span>
            </div>
          </div>
          <PillTabs options={tabs} value={tab} onChange={setTab} />
        </div>
      </div>

      {tab === "Business Plan" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {businessPlanSections.map((section) => (
            <SectionCard key={section.title} title={section.title} eyebrow={section.eyebrow}>
              {"workflows" in section ? (
                <div className="space-y-3">
                  {section.workflows.map((flow) => (
                    <div key={flow.title} className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-main">{flow.title}</p>
                        <span className="tag text-muted">Workflow</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[13px] text-muted">
                        {flow.steps.map((step) => (
                          <span key={step} className="pill bg-[var(--card)] text-muted border-[var(--border)]">
                            {step}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <KeyPointList points={section.points} />
              )}
            </SectionCard>
          ))}
        </div>
      ) : null}

      {tab === "Insurance Agency UI" ? <InsuranceAgencySpec /> : null}
      {tab === "Restoration Vendor UI" ? <VendorSpec /> : null}
      {tab === "Relationship Manager UI" ? <RelationshipManagerSpec /> : null}
    </div>
  );
};

export default Blueprint;
