import { carrierLoop, crossCutting, swimlanePhases, workflowStages, claims } from "../mockData";
import StatusPill from "../components/pills/StatusPill";
import { ClaimStatus } from "../types";

const stageColors: Record<WorkflowStatus, string> = {
  incoming: "from-indigo-500/60 to-sky-500/50 border-indigo-500/40",
  active: "from-emerald-500/50 to-cyan-500/40 border-emerald-500/40",
  loop: "from-amber-500/50 to-pink-500/40 border-amber-500/40",
  closing: "from-fuchsia-500/50 to-purple-500/40 border-fuchsia-500/40",
};

type WorkflowStatus = "incoming" | "active" | "loop" | "closing";

const statusLabel: Record<WorkflowStatus, string> = {
  incoming: "Intake",
  active: "Execution",
  loop: "Carrier Loop",
  closing: "Closeout",
};

const Workflow = () => {
  const statusCounts: Record<ClaimStatus, number> = {
    new: 0,
    in_review: 0,
    negotiation: 0,
    settled: 0,
    closed: 0,
  };

  claims.forEach((c) => {
    statusCounts[c.status] += 1;
  });

  return (
    <div className="space-y-6">
      <div className="panel rounded-2xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted">Pipeline blueprint</p>
            <h1 className="text-2xl font-semibold text-main">Claim Lifecycle Workflow</h1>
            <p className="text-sm text-muted mt-2">
              Modeled from intake through settlement and closeout, with the carrier response loop highlighted.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.entries(statusCounts) as [ClaimStatus, number][]).map(([status, count]) => (
              <div
                key={status}
                className="panel-muted rounded-xl px-3 py-2 text-sm border border-[var(--border)]"
              >
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="capitalize">{status.replace("_", " ")}</span>
                  <StatusPill status={status} />
                </div>
                <div className="mt-1 text-xl font-semibold text-main">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {workflowStages.map((stage) => (
          <div
            key={stage.id}
            className={`rounded-2xl border bg-gradient-to-br ${stageColors[stage.status]} p-5 shadow-lg text-main`}
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wide text-main">
                {statusLabel[stage.status]}
              </div>
              <div className="text-xs text-main bg-white/50 rounded-full px-3 py-1 font-semibold">
                {stage.title}
              </div>
            </div>
            <p className="mt-3 text-sm text-main">{stage.summary}</p>
            <div className="mt-4 space-y-2">
              {stage.outputs.map((out) => (
                <div
                  key={out}
                  className="flex items-center gap-2 rounded-lg bg-white/40 text-main px-3 py-2 text-sm border border-white/60"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-900/50" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 panel rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-main">Carrier Response Loop</h2>
            <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              Iterative
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {carrierLoop.map((step, idx) => (
              <div
                key={step.id}
                className="rounded-xl panel-muted border border-[var(--border)] p-4 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-muted">Step {idx + 1}</div>
                  <div className="text-[11px] text-main bg-[var(--card)] px-2 py-1 rounded-full border border-[var(--border)]">
                    {step.tags.join(" • ")}
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-main">{step.title}</h3>
                <p className="text-sm text-muted">{step.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <h3 className="text-lg font-semibold text-main">Cross-cutting engines</h3>
          <p className="text-sm text-muted">
            Capabilities that overlay every stage of the claim lifecycle.
          </p>
          <div className="space-y-3">
            {crossCutting.map((item) => (
              <div key={item.title} className="rounded-xl panel-muted border border-[var(--border)] p-3">
                <p className="text-sm font-semibold text-main">{item.title}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted list-disc list-inside">
                  {item.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-main">Swimlane snapshot</h3>
          <span className="text-xs text-muted">Adjuster • Client • Carrier • Vendor</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left text-main min-w-[900px]">
            <thead className="text-xs uppercase tracking-wide text-main bg-[var(--card-muted)] border-b border-[var(--border)]">
              <tr>
                <th className="px-4 py-3">Phase</th>
                <th className="px-4 py-3">Adjuster</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Carrier</th>
                <th className="px-4 py-3">Vendor</th>
              </tr>
            </thead>
            <tbody>
              {swimlanePhases.map((row) => (
                <tr key={row.id} className="border-b border-slate-800/60 hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-main">{row.title}</td>
                  <td className="px-4 py-3 text-main">{row.adjuster}</td>
                  <td className="px-4 py-3 text-main">{row.client}</td>
                  <td className="px-4 py-3 text-main">{row.carrier}</td>
                  <td className="px-4 py-3 text-main">{row.vendor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Workflow;
