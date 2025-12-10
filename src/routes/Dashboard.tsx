import { useMemo } from "react";
import ClaimsTable from "../components/tables/ClaimsTable";
import MetricCard from "../components/cards/MetricCard";
import StatusPill from "../components/pills/StatusPill";
import { agencies, claims, users, vendors } from "../mockData";
import { ClaimStatus } from "../types";
import { useNavigate } from "react-router-dom";
import SimpleBarChart from "../components/charts/SimpleBarChart";
import Sparkline from "../components/charts/Sparkline";

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = useMemo(() => {
    const openClaims = claims.filter((c) => c.status !== "closed");
    const negotiation = claims.filter((c) => c.status === "negotiation");
    const qaScores = claims.filter((c) => c.qa_score !== null).map((c) => c.qa_score as number);
    const avgQa = qaScores.length ? (qaScores.reduce((sum, score) => sum + score, 0) / qaScores.length).toFixed(1) : "—";

    return {
      open: openClaims.length,
      negotiation: negotiation.length,
      avgQa,
      orgs: agencies.length + vendors.length,
    };
  }, []);

  const statusBreakdown = useMemo(() => {
    const statuses: Record<ClaimStatus, number> = {
      new: 0,
      in_review: 0,
      negotiation: 0,
      settled: 0,
      closed: 0,
    };
    claims.forEach((claim) => {
      statuses[claim.status] += 1;
    });
    return statuses;
  }, []);

  const activeAgencies = useMemo(() => {
    const openCounts: Record<string, number> = {};
    claims
      .filter((c) => c.status !== "closed")
      .forEach((claim) => {
        openCounts[claim.agency_id] = (openCounts[claim.agency_id] || 0) + 1;
      });

    return agencies
      .map((agency) => ({
        id: agency.id,
        name: agency.name,
        count: openCounts[agency.id] || 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, []);

  const recentClaims = useMemo(
    () => [...claims].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5),
    []
  );

  const qaTrend = useMemo(() => {
    const scored = claims
      .filter((c) => c.qa_score !== null)
      .sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
    return {
      points: scored.map((c) => c.qa_score as number),
      labels: scored.map((c) => c.case_number),
    };
  }, []);

  const totalClaims = claims.length;
  const referralSummary = [
    { title: "My Assigned Relationships", owner: "Alex Mason", count: 24, status: "Active" },
    { title: "Vendor I Manage", owner: "Taylor Brooks", count: 18, status: "Stable" },
    { title: "Active Referrals", owner: "Network Partners", count: 12, status: "Growing" },
  ];

  const activeReferrals = [
    { name: "Under-roof restoration on specialty", value: "$10,000", status: "New reply" },
    { name: "Average sewer loss per locale", value: "$22,000", status: "New reply" },
  ];

  return (
    <div className="space-y-6">
      <section className="panel rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-main">Metatended Reasoning</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-main">My Assigned Manager Portal</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="pill text-main text-xs font-semibold">Settings</button>
            <button className="pill text-main text-xs font-semibold">Ratings</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard title="Open claims" value={metrics.open} subtext="Status not closed" />
          <MetricCard title="In negotiation" value={metrics.negotiation} subtext="Active negotiations" />
          <MetricCard title="Avg QA score" value={metrics.avgQa} subtext="Claims with QA reviews" />
          <MetricCard title="Partners" value={metrics.orgs} subtext="Agencies + Vendors" />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="panel rounded-3xl p-5 shadow-lg space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Referrals & Managers</h3>
            <span className="text-xs text-muted">Pipeline sources</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {referralSummary.map((card) => (
              <div key={card.title} className="panel-muted rounded-2xl px-4 py-4 space-y-2">
                <p className="text-sm font-semibold text-main">{card.title}</p>
                <p className="text-xs text-muted">Owner: {card.owner}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-main font-semibold">{card.count} accounts</span>
                  <span className="tag">{card.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-main mb-2">Active referral pairs</h4>
            <div className="panel-muted rounded-2xl overflow-hidden">
              <table className="w-full text-sm text-left text-main">
                <thead className="text-xs uppercase tracking-wide text-muted border-b border-[var(--border)]">
                  <tr>
                    <th className="px-4 py-3">Referral</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReferrals.map((item) => (
                    <tr key={item.name} className="border-b border-[var(--border)]/60">
                      <td className="px-4 py-3 font-semibold text-main">{item.name}</td>
                      <td className="px-4 py-3 text-main">{item.value}</td>
                      <td className="px-4 py-3 text-muted">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="panel rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">QA score trend</h3>
            <span className="text-xs text-muted">By recent updates</span>
          </div>
          <div className="mt-4">
            <Sparkline points={qaTrend.points} labels={qaTrend.labels} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <div className="panel rounded-3xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Notifications</h3>
            <span className="text-xs text-muted">Recent activity</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(Object.entries(statusBreakdown) as [ClaimStatus, number][]).map(([status, count]) => {
              const ratio = totalClaims ? Math.round((count / totalClaims) * 100) : 0;
              return (
                <div key={status} className="panel-muted rounded-2xl px-3 py-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <StatusPill status={status} />
                    <span className="text-xs text-main">{count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted">{ratio}% of pipeline</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 panel rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Pipeline by status</h3>
            <span className="text-xs text-muted">Counts by lifecycle</span>
          </div>
          <div className="mt-4">
            <SimpleBarChart
              data={(Object.entries(statusBreakdown) as [ClaimStatus, number][]).map(([status, count]) => ({
                label: status.replace("_", " "),
                value: count,
              }))}
            />
          </div>
        </div>
        <div className="panel rounded-3xl p-5 shadow-lg space-y-4">
          <h3 className="text-lg font-semibold text-main">Top active agencies</h3>
          <div className="space-y-3">
            {activeAgencies.map((agency) => (
              <div
                key={agency.id}
                className="flex items-center justify-between rounded-xl panel-muted px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-main">{agency.name}</p>
                  <p className="text-xs text-muted">Open claims</p>
                </div>
                <div className="text-2xl font-semibold text-main">{agency.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <ClaimsTable
          title="Recently updated claims"
          subtitle="Latest activity across the book"
          claims={recentClaims}
          agencies={agencies}
          users={users}
          vendors={vendors}
          onRowClick={(id) => navigate(`/claims/${id}`)}
          dense
        />
      </section>
    </div>
  );
};

export default Dashboard;
