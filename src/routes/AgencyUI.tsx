import { useMemo, useState } from "react";
import StatusPill from "../components/pills/StatusPill";
import ClaimsTable from "../components/tables/ClaimsTable";
import { agencies, claims, users, vendors } from "../mockData";

const agencyNotifications = [
  { title: "Vendor accepted assignment", claim: "CA-10234", time: "1h ago", severity: "info" },
  { title: "Documentation uploaded", claim: "CA-10235", time: "2h ago", severity: "success" },
  { title: "Job completed — summary ready", claim: "CA-10233", time: "Yesterday", severity: "success" },
  { title: "Missing photos", claim: "CA-10240", time: "2d ago", severity: "warning" },
];

const rewards = [
  { name: "100-Lead Pack", cost: 400, category: "Lead Packs" },
  { name: "250-Lead Pack", cost: 800, category: "Lead Packs" },
  { name: "Local SEO Boost", cost: 250, category: "Marketing" },
  { name: "Social Ad Campaign", cost: 300, category: "Marketing" },
  { name: "Software Toolkit", cost: 180, category: "Tools" },
  { name: "Documentation Mastery Course", cost: 120, category: "Training" },
];

const AgencyUI = () => {
  const [filter, setFilter] = useState("All");
  const [lossType, setLossType] = useState("Water");
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState<"all" | "overview" | "submit" | "clients" | "credits">("all");

  const activeClaims = useMemo(() => claims.filter((c) => c.status !== "closed"), []);
  const filteredRewards = useMemo(
    () => rewards.filter((reward) => filter === "All" || reward.category === filter),
    [filter]
  );

  const renewals = useMemo(() => {
    const completedThisMonth = claims.filter((c) => c.status === "settled").length;
    return {
      protectionScore: "92%",
      active: activeClaims.length,
      completedThisMonth,
      avgResolution: "14d",
      credits: 1280,
    };
  }, [activeClaims]);

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Claim submitted (demo).");
  };

  const TabButton = ({ id, label }: { id: typeof tab; label: string }) => (
    <button
      type="button"
      className={`pill text-sm ${tab === id ? "bg-white/15 text-main" : "bg-[var(--card-muted)] text-muted"}`}
      onClick={() => setTab(id)}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <section className="panel rounded-3xl p-6 sm:p-8 shadow-lg space-y-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-emerald-500/10 blur-3xl" aria-hidden />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm text-main font-semibold">Insurance Agency</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-main">Client Command</h1>
            <p className="text-sm text-muted max-w-3xl">
              Submit claims in 45 seconds, track status, see client-facing progress, and redeem co-op credits.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="pill text-main bg-[var(--card-muted)]">Dark mode</span>
            <span className="pill text-main bg-white/10">Glass panels</span>
            <span className="pill text-main bg-[var(--card-muted)]">Agency persona</span>
          </div>
        </div>
        <div className="relative flex flex-wrap gap-2">
          <TabButton id="all" label="All" />
          <TabButton id="overview" label="Overview" />
          <TabButton id="submit" label="Submit claim" />
          <TabButton id="clients" label="Client status" />
          <TabButton id="credits" label="Credits & rewards" />
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Active claims", value: renewals.active },
            { label: "Completed this month", value: renewals.completedThisMonth },
            { label: "Avg resolution", value: renewals.avgResolution },
            { label: "Renewal protection", value: renewals.protectionScore },
            { label: "Co-op credits", value: renewals.credits },
          ].map((metric) => (
            <div key={metric.label} className="panel-muted rounded-2xl px-4 py-3 space-y-1 border border-[var(--border)]">
              <p className="text-xs uppercase tracking-wide text-muted">{metric.label}</p>
              <p className="text-xl font-semibold text-main">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {(tab === "all" || tab === "submit" || tab === "clients") && (
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4">
        <div className="panel rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">45-second intake</p>
              <h3 className="text-lg font-semibold text-main">Submit new claim</h3>
            </div>
            <span className="pill text-main bg-[var(--card-muted)]">Fast form</span>
          </div>
          <form onSubmit={handleSubmitClaim} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Policyholder</span>
              <input className="input-surface rounded-lg px-3 py-2" placeholder="Name" required />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Contact</span>
              <input className="input-surface rounded-lg px-3 py-2" placeholder="Email or phone" required />
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-muted">Property address</span>
              <input className="input-surface rounded-lg px-3 py-2" placeholder="123 Main St, City, ST" required />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Loss type</span>
              <select className="input-surface rounded-lg px-3 py-2" value={lossType} onChange={(e) => setLossType(e.target.value)}>
                {["Water", "Fire", "Mold", "Storm", "Other"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Loss date</span>
              <input className="input-surface rounded-lg px-3 py-2" type="date" required />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Referral source</span>
              <select className="input-surface rounded-lg px-3 py-2">
                {["Agent referral", "Inbound web", "Lead partner", "Other"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-muted">Notes</span>
              <textarea className="input-surface rounded-lg px-3 py-2" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Scope, access instructions, client expectations" />
            </label>
            <div className="sm:col-span-2 flex items-center justify-between">
              <div className="rounded-lg border border-dashed border-[var(--border)] px-3 py-2 text-sm text-muted">
                Optional: drag & drop supporting photos/documents
              </div>
              <button type="submit" className="pill text-main bg-white/10 hover:-translate-y-0.5 transition">Submit claim</button>
            </div>
          </form>
        </div>

        <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Client-facing</p>
              <h3 className="text-lg font-semibold text-main">Client status view</h3>
            </div>
            <span className="pill text-main bg-[var(--card-muted)]">Shareable</span>
          </div>
          <div className="panel-muted rounded-2xl p-4 border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Policyholder</p>
                <p className="text-main font-semibold">Michael Hart</p>
                <p className="text-xs text-muted">123 Pine St</p>
              </div>
              <StatusPill status="in_review" />
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted">Progress</p>
              <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: "68%" }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted">
                {["Submitted", "Assigned", "In Progress", "Docs Review", "Complete"].map((step, i) => (
                  <span key={step} className={i <= 2 ? "text-main" : ""}>{step}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted">Latest updates</p>
              <div className="space-y-2 text-sm text-main">
                <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-[var(--card)] border border-[var(--border)]">
                  <span>Vendor arriving on site at 2:00 PM</span>
                  <span className="text-xs text-muted">Today</span>
                </div>
                <div className="flex items-center justify-between rounded-lg px-3 py-2 bg-[var(--card)] border border-[var(--border)]">
                  <span>Photos uploaded</span>
                  <span className="text-xs text-muted">1h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {(tab === "all" || tab === "overview" || tab === "clients") && (
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 panel rounded-2xl p-5 shadow-lg">
          <ClaimsTable
            title="Active client claims"
            subtitle="Matches manager styling with agency view"
            claims={activeClaims}
            agencies={agencies}
            users={users}
            vendors={vendors}
            dense
            onRowClick={() => undefined}
          />
        </div>
        <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Notifications</h3>
            <span className="text-xs text-muted">Claim updates</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {agencyNotifications.map((note) => (
              <div key={note.title + note.claim} className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-main font-semibold">{note.title}</p>
                  <span className="tag text-muted">{note.time}</span>
                </div>
                <p className="text-xs text-muted">Claim {note.claim}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {(tab === "all" || tab === "credits") && (
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">Credits</p>
              <h3 className="text-lg font-semibold text-main">Co-op credits</h3>
            </div>
            <span className="pill text-main bg-[var(--card-muted)]">Balance {renewals.credits}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)]">
              <p className="text-xs uppercase tracking-wide text-muted">Points earned this quarter</p>
              <p className="text-2xl font-semibold text-main">420</p>
              <p className="text-xs text-muted">Next distribution: Dec 30</p>
            </div>
            <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)]">
              <p className="text-xs uppercase tracking-wide text-muted">Recent activity</p>
              <ul className="text-sm text-main space-y-1">
                <li className="flex items-center justify-between"><span>Referral submitted</span><span className="tag">+100</span></li>
                <li className="flex items-center justify-between"><span>Claim submitted</span><span className="tag">+40</span></li>
                <li className="flex items-center justify-between"><span>Training completed</span><span className="tag">+10</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Rewards marketplace</h3>
            <div className="flex gap-2">
              {["All", "Lead Packs", "Marketing", "Tools", "Training"].map((tab) => (
                <button
                  key={tab}
                  className={`pill text-xs ${filter === tab ? "bg-white/15 text-main" : "bg-[var(--card-muted)] text-muted"}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredRewards.map((reward) => (
              <div key={reward.name} className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-main font-semibold">{reward.name}</p>
                  <span className="tag text-main">{reward.cost} credits</span>
                </div>
                <p className="text-xs text-muted">{reward.category}</p>
                <button className="pill text-main text-xs">Redeem</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
};

export default AgencyUI;
