import { useMemo, useState } from "react";
import StatusPill from "../components/pills/StatusPill";

type JobStatus = "in_progress" | "pending" | "completed" | "issue";

const jobs = [
  { case: "CA-10234", address: "123 Pine St", adjuster: "Alex Mason", status: "in_progress" as JobStatus, due: "10/21", amount: "$1,200", payment: "Paid" },
  { case: "CA-10235", address: "44 Elm Ave", adjuster: "Jamie Lee", status: "pending" as JobStatus, due: "10/22", amount: "$800", payment: "Pending" },
  { case: "CA-10236", address: "90 Aspen Dr", adjuster: "Sasha Rivera", status: "completed" as JobStatus, due: "10/15", amount: "$1,050", payment: "Paid" },
  { case: "CA-10237", address: "18 Lakeview", adjuster: "Priya Kapoor", status: "issue" as JobStatus, due: "10/20", amount: "$900", payment: "Pending" },
];

const VendorUI = () => {
  const [activeJob, setActiveJob] = useState(jobs[0]);
  const [photos, setPhotos] = useState<number>(2);
  const [logRows] = useState([
    { room: "Living", reading: "45 RH", humidity: "38%", notes: "Fans placed" },
    { room: "Kitchen", reading: "52 RH", humidity: "40%", notes: "Dehu running" },
  ]);
  const [tab, setTab] = useState<"all" | "dashboard" | "checklist" | "qa">("all");

  const metrics = useMemo(
    () => [
      { label: "Jobs Assigned", value: jobs.length },
      { label: "In Progress", value: jobs.filter((j) => j.status === "in_progress").length },
      { label: "Overdue", value: jobs.filter((j) => j.status === "issue").length },
      { label: "Avg Response", value: "42m" },
      { label: "QA Score", value: "91" },
    ],
    []
  );

  const statusToPill = (status: JobStatus) => {
    if (status === "in_progress") return "in_review";
    if (status === "pending") return "new";
    if (status === "completed") return "settled";
    return "negotiation";
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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-sky-500/10 to-emerald-500/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-main font-semibold">Restoration Vendor</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-main">Job Operations</h1>
            <p className="text-sm text-muted max-w-3xl">Task-first layout for check-in/out, uploads, moisture logs, QA, and payments.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="pill text-main bg-[var(--card-muted)]">Checklist</span>
            <span className="pill text-main bg-white/10">QA Visibility</span>
          </div>
        </div>
        <div className="relative flex flex-wrap gap-2">
          <TabButton id="all" label="All" />
          <TabButton id="dashboard" label="Dashboard" />
          <TabButton id="checklist" label="Job checklist" />
          <TabButton id="qa" label="QA & payments" />
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="panel-muted rounded-2xl px-4 py-3 space-y-1 border border-[var(--border)]">
              <p className="text-xs uppercase tracking-wide text-muted">{metric.label}</p>
              <p className="text-xl font-semibold text-main">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {(tab === "all" || tab === "dashboard") && (
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4">
          <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Active jobs</h3>
              <span className="text-xs text-muted">Tap to open</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {jobs.map((job) => (
                <button
                  key={job.case}
                  type="button"
                  onClick={() => setActiveJob(job)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    activeJob.case === job.case ? "bg-[var(--card-muted)] border-[var(--border)] shadow-lg" : "bg-[var(--card)] border-[var(--border)]/70 hover:bg-[var(--card-muted)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-semibold text-main">{job.case}</p>
                    <StatusPill status={statusToPill(job.status)} />
                  </div>
                  <p className="text-xs text-muted">{job.address}</p>
                  <div className="flex items-center justify-between text-xs text-muted mt-1">
                    <span>Adjuster: {job.adjuster}</span>
                    <span>Due {job.due}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Job details</h3>
              <div className="flex gap-2">
                <button className="pill text-main text-xs bg-[var(--card-muted)]">Check-in</button>
                <button className="pill text-main text-xs bg-white/10">Check-out</button>
              </div>
            </div>
            <div className="panel-muted rounded-2xl p-4 border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-main font-semibold">{activeJob.case}</p>
                <StatusPill status={statusToPill(activeJob.status)} />
              </div>
              <p className="text-sm text-muted">{activeJob.address}</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted">
                <div className="rounded-lg border border-[var(--border)] px-3 py-2">Loss type: Water</div>
                <div className="rounded-lg border border-[var(--border)] px-3 py-2">Scope: Mitigation + drywall</div>
                <div className="rounded-lg border border-[var(--border)] px-3 py-2">Insured: Hart family</div>
                <div className="rounded-lg border border-[var(--border)] px-3 py-2">Adjuster: {activeJob.adjuster}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {(tab === "all" || tab === "checklist") && (
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="panel rounded-2xl p-5 shadow-lg space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Vendor task checklist</h3>
            <span className="text-xs text-muted">Documentation rigor</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-main">Site photos</p>
                <span className="tag text-main">{photos}/10</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg border border-dashed border-[var(--border)] bg-[var(--card)] flex items-center justify-center text-xs text-muted">
                    {i < photos ? "Photo" : "+"}
                  </div>
                ))}
              </div>
              <button className="pill text-main text-xs" onClick={() => setPhotos((p) => Math.min(10, p + 1))}>
                Upload photo
              </button>
            </div>
            <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-main">Moisture logs</p>
                <span className="tag text-main">Inline + PDF</span>
              </div>
              <div className="rounded-lg border border-[var(--border)] overflow-hidden">
                <table className="w-full text-xs text-left text-main">
                  <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                    <tr>
                      <th className="px-2 py-2">Room</th>
                      <th className="px-2 py-2">Device</th>
                      <th className="px-2 py-2">Humidity</th>
                      <th className="px-2 py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logRows.map((row) => (
                      <tr key={row.room} className="border-t border-[var(--border)]/60">
                        <td className="px-2 py-2">{row.room}</td>
                        <td className="px-2 py-2">{row.reading}</td>
                        <td className="px-2 py-2">{row.humidity}</td>
                        <td className="px-2 py-2 text-muted">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="pill text-main text-xs bg-[var(--card)]">Upload moisture log PDF</button>
            </div>
            <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-main">Daily notes</p>
                <span className="tag text-muted">2 entries</span>
              </div>
              <textarea className="input-surface rounded-lg px-3 py-2 text-sm" rows={3} placeholder="Document daily actions, materials, customer touchpoints." />
              <button className="pill text-main text-xs">Add note</button>
            </div>
            <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-main">Final documentation</p>
                <span className="tag text-main">Upload PDF</span>
              </div>
              <p className="text-sm text-muted">Completion report, signatures, photos.</p>
              <button className="pill text-main text-xs">Upload completion PDF</button>
            </div>
          </div>
        </div>
      </section>
      )}

      {(tab === "all" || tab === "qa") && (
        <div className="panel rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Compliance / QA</h3>
            <span className="tag text-main">Score 91</span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Documentation completeness", value: 92 },
              { label: "Response time", value: 88 },
              { label: "Customer satisfaction", value: 94 },
              { label: "Photo quality", value: 90 },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-main">{metric.label}</p>
                  <span className="tag text-main">{metric.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-emerald-400" style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-muted">Auto flags</p>
            <div className="space-y-1 text-sm text-main">
              <div className="rounded-lg border border-[var(--border)] px-3 py-2 flex items-center justify-between">
                <span>Missing final photos</span>
                <span className="tag">Warning</span>
              </div>
              <div className="rounded-lg border border-[var(--border)] px-3 py-2 flex items-center justify-between">
                <span>Delayed check-in</span>
                <span className="tag">Warning</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-main">Payments</p>
              <span className="text-xs text-muted">Transparency</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">Job</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.slice(0, 3).map((job) => (
                    <tr key={job.case} className="border-t border-[var(--border)]/60">
                      <td className="px-3 py-2">{job.case}</td>
                      <td className="px-3 py-2">{job.amount}</td>
                      <td className="px-3 py-2 text-muted">{job.payment}</td>
                      <td className="px-3 py-2">{job.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorUI;
