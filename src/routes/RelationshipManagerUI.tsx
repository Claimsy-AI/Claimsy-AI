import { useEffect, useState } from "react";
import StatusPill from "../components/pills/StatusPill";
import { claims, vendors, agencies, referrals } from "../mockData";

const rmStats = [
  { label: "Active claims", value: claims.length },
  { label: "Claims at risk", value: 4 },
  { label: "Avg QA score", value: "91" },
  { label: "Vendor compliance", value: "94%" },
  { label: "Adjuster engagement", value: "88" },
  { label: "Agencies managed", value: agencies.length },
];

const rmAlerts = [
  { title: "Low QA score on Rapid Restore", severity: "warning", time: "1h ago" },
  { title: "Missing moisture logs for CA-10234", severity: "warning", time: "2h ago" },
  { title: "Escalation requested by agency", severity: "critical", time: "Today" },
  { title: "Delayed vendor response detected", severity: "warning", time: "Yesterday" },
];

const vendorPerf = vendors.map((vendor, idx) => ({
  name: vendor.name,
  response: `${35 + idx * 5}m`,
  qa: 88 + idx,
  compliance: `${92 - idx}%`,
  volume: 10 + idx * 3,
  issues: idx,
}));

const adjusters = [
  { name: "Alex Mason", claims: 18, qa: 92, engagement: "High", flags: 1 },
  { name: "Jamie Lee", claims: 14, qa: 88, engagement: "Medium", flags: 2 },
  { name: "Sasha Rivera", claims: 11, qa: 90, engagement: "High", flags: 0 },
];

const outreachQueue = [
  { subject: "Request documentation", target: "Rapid Restore", type: "Vendor", status: "Open" },
  { subject: "Follow-up on delay", target: "Harbor Mutual", type: "Agency", status: "Open" },
  { subject: "Compliance reminder", target: "Northwind Construction", type: "Vendor", status: "Open" },
];

type RMTab = "dashboard" | "vendors" | "agencies" | "referrals" | "compliance" | "outreach";

const RelationshipManagerUI = ({ initialTab = "dashboard" }: { initialTab?: RMTab }) => {
  const [tab, setTab] = useState<RMTab>(initialTab);

  // Ensure route-driven initialTab updates the active tab when navigating between RM subroutes
  // without unmounting the component.
  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const TabButton = ({ id, label }: { id: RMTab; label: string }) => (
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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-sky-500/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-main font-semibold">Relationship Manager</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-main">Ecosystem Control Tower</h1>
            <p className="text-sm text-muted max-w-3xl">
              Full visibility into vendors, adjusters, agencies, at-risk claims, compliance, outreach, and referrals.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="pill text-main bg-[var(--card-muted)]">Compliance</span>
            <span className="pill text-main bg-white/10">Outreach</span>
            <span className="pill text-main bg-[var(--card-muted)]">Referrals</span>
          </div>
        </div>
        <div className="relative flex flex-wrap gap-2">
          <TabButton id="dashboard" label="Dashboard" />
          <TabButton id="vendors" label="Vendors" />
          <TabButton id="agencies" label="Agencies & adjusters" />
          <TabButton id="referrals" label="Referrals" />
          <TabButton id="compliance" label="Compliance" />
          <TabButton id="outreach" label="Outreach" />
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {rmStats.map((stat) => (
            <div key={stat.label} className="panel-muted rounded-2xl px-4 py-3 space-y-1 border border-[var(--border)]">
              <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
              <p className="text-xl font-semibold text-main">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {tab === "dashboard" && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="panel rounded-2xl p-5 shadow-lg lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Claims (RM view)</h3>
              <span className="text-xs text-muted">Filters: status, vendor, adjuster, agency, at-risk</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">Case #</th>
                    <th className="px-3 py-2">Insured</th>
                    <th className="px-3 py-2">Agency</th>
                    <th className="px-3 py-2">Adjuster</th>
                    <th className="px-3 py-2">Vendor</th>
                    <th className="px-3 py-2">QA</th>
                    <th className="px-3 py-2">Flags</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.slice(0, 6).map((claim) => {
                    const flags = claim.status === "negotiation" ? 2 : claim.status === "in_review" ? 1 : 0;
                    return (
                      <tr key={claim.id} className="border-t border-[var(--border)]/60">
                        <td className="px-3 py-2 font-semibold">{claim.case_number}</td>
                        <td className="px-3 py-2">{claim.insured_name}</td>
                        <td className="px-3 py-2">{agencies.find((a) => a.id === claim.agency_id)?.name || "—"}</td>
                        <td className="px-3 py-2">{claim.assigned_adjuster_id}</td>
                        <td className="px-3 py-2">{vendors.find((v) => v.id === claim.assigned_vendor_id)?.name || "Unassigned"}</td>
                        <td className="px-3 py-2">{claim.qa_score ?? "—"}</td>
                        <td className="px-3 py-2">{flags ? `${flags} issues` : "—"}</td>
                        <td className="px-3 py-2">
                          <StatusPill status={claim.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Alerts</h3>
              <span className="text-xs text-muted">Compliance</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {rmAlerts.map((alert) => (
                <div key={alert.title} className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-main">{alert.title}</p>
                    <span className="tag text-muted">{alert.time}</span>
                  </div>
                  <p className="text-xs text-muted">{alert.severity === "critical" ? "High severity" : "Attention"}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(tab === "vendors" || tab === "compliance") && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Vendor performance</h3>
              <span className="text-xs text-muted">Sort by QA, response, compliance</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">Vendor</th>
                    <th className="px-3 py-2">Resp.</th>
                    <th className="px-3 py-2">QA</th>
                    <th className="px-3 py-2">Compliance</th>
                    <th className="px-3 py-2">Volume</th>
                    <th className="px-3 py-2">Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorPerf.map((vendor) => (
                    <tr key={vendor.name} className="border-t border-[var(--border)]/60">
                      <td className="px-3 py-2 font-semibold">{vendor.name}</td>
                      <td className="px-3 py-2">{vendor.response}</td>
                      <td className="px-3 py-2">{vendor.qa}</td>
                      <td className="px-3 py-2">{vendor.compliance}</td>
                      <td className="px-3 py-2">{vendor.volume}</td>
                      <td className="px-3 py-2">{vendor.issues}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-3 text-sm text-muted">
              Drill-down: licensing, insurance, documentation completeness, response time, CSAT, issue log.
            </div>
          </div>

          <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Compliance & QA center</h3>
              <span className="text-xs text-muted">AI flags</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">Claim</th>
                    <th className="px-3 py-2">Vendor</th>
                    <th className="px-3 py-2">Issue</th>
                    <th className="px-3 py-2">Severity</th>
                    <th className="px-3 py-2">Aging</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { claim: "CA-10234", vendor: "Rapid Restore", issue: "Missing photos", severity: "High", aging: "2d" },
                    { claim: "CA-10235", vendor: "ClearSky Roofing", issue: "Delayed response", severity: "Med", aging: "1d" },
                    { claim: "CA-10237", vendor: "Northwind Construction", issue: "Low QA score", severity: "Med", aging: "3d" },
                  ].map((row) => (
                    <tr key={row.claim} className="border-t border-[var(--border)]/60">
                      <td className="px-3 py-2">{row.claim}</td>
                      <td className="px-3 py-2">{row.vendor}</td>
                      <td className="px-3 py-2">{row.issue}</td>
                      <td className="px-3 py-2">{row.severity}</td>
                      <td className="px-3 py-2">{row.aging}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)] text-sm text-muted">
              AI suggestions: request missing docs, predict delays, auto-reminders for vendors and adjusters.
            </div>
          </div>
        </section>
      )}

      {(tab === "referrals" || tab === "outreach") && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Referrals</h3>
              <span className="text-xs text-muted">Conversion & credits</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)]">
                <p className="text-xs uppercase tracking-wide text-muted">Total referrals</p>
                <p className="text-2xl font-semibold text-main">{referrals.length}</p>
                <p className="text-xs text-muted">Top agencies: Summit, Harbor</p>
              </div>
              <div className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)]">
                <p className="text-xs uppercase tracking-wide text-muted">Conversion rate</p>
                <p className="text-2xl font-semibold text-main">68%</p>
                <p className="text-xs text-muted">Credits allocated quarterly</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">Referral ID</th>
                    <th className="px-3 py-2">Agency</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Vendor</th>
                    <th className="px-3 py-2">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.slice(0, 5).map((ref) => (
                    <tr key={ref.id} className="border-t border-[var(--border)]/60">
                      <td className="px-3 py-2">{ref.id}</td>
                      <td className="px-3 py-2">{agencies.find((a) => a.id === ref.claim_id)?.name || "Agency"}</td>
                      <td className="px-3 py-2 text-muted">{ref.status}</td>
                      <td className="px-3 py-2">{vendors.find((v) => v.id === claims.find((c) => c.id === ref.claim_id)?.assigned_vendor_id)?.name || "—"}</td>
                      <td className="px-3 py-2">+100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-main">Outreach center</h3>
              <span className="text-xs text-muted">Queues + messages</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {outreachQueue.map((item) => (
                <div key={item.subject + item.target} className="panel-muted rounded-xl px-3 py-3 border border-[var(--border)]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-main">{item.subject}</p>
                    <span className="tag text-muted">{item.type}</span>
                  </div>
                  <p className="text-xs text-muted">Target: {item.target} — Status: {item.status}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-[var(--border)] p-3 space-y-2">
              <p className="text-sm font-semibold text-main">Conversation</p>
              <div className="rounded-lg border border-[var(--border)] px-3 py-2 bg-[var(--card)] text-sm text-muted">
                Template: “Hi team, we need the missing documentation to keep the claim on track. Please upload photos and moisture logs by EOD.”
              </div>
              <button className="pill text-main text-xs bg-white/10">Send reminder</button>
            </div>
          </div>
        </section>
      )}

      {tab === "agencies" && (
        <section className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Agencies & Adjusters</h3>
            <span className="text-xs text-muted">Engagement + flags</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">Agency</th>
                    <th className="px-3 py-2">Claims</th>
                    <th className="px-3 py-2">Satisfaction</th>
                    <th className="px-3 py-2">Referrals</th>
                  </tr>
                </thead>
                <tbody>
                  {agencies.map((agency) => (
                    <tr key={agency.id} className="border-t border-[var(--border)]/60">
                      <td className="px-3 py-2 font-semibold">{agency.name}</td>
                      <td className="px-3 py-2">{claims.filter((c) => c.agency_id === agency.id).length}</td>
                      <td className="px-3 py-2">4.6/5</td>
                      <td className="px-3 py-2">12</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="bg-[var(--card)] text-muted uppercase tracking-wide">
                  <tr>
                    <th className="px-3 py-2">Adjuster</th>
                    <th className="px-3 py-2">Claims</th>
                    <th className="px-3 py-2">QA</th>
                    <th className="px-3 py-2">Engagement</th>
                    <th className="px-3 py-2">Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {adjusters.map((adj) => (
                    <tr key={adj.name} className="border-t border-[var(--border)]/60">
                      <td className="px-3 py-2 font-semibold">{adj.name}</td>
                      <td className="px-3 py-2">{adj.claims}</td>
                      <td className="px-3 py-2">{adj.qa}</td>
                      <td className="px-3 py-2">{adj.engagement}</td>
                      <td className="px-3 py-2">{adj.flags || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default RelationshipManagerUI;
