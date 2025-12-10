import { useMemo } from "react";
import ClaimsTable from "../components/tables/ClaimsTable";
import { agencies, claims, users, vendors } from "../mockData";
import MetricCard from "../components/cards/MetricCard";

const AdjusterDashboard = () => {
  const myClaims = useMemo(() => claims.filter((c) => c.status !== "closed"), []);
  const metrics = useMemo(() => {
    const open = myClaims.length;
    const inReview = myClaims.filter((c) => c.status === "in_review").length;
    const negotiation = myClaims.filter((c) => c.status === "negotiation").length;
    const qaScores = myClaims.filter((c) => c.qa_score !== null).map((c) => c.qa_score as number);
    const avgQa = qaScores.length ? (qaScores.reduce((sum, v) => sum + v, 0) / qaScores.length).toFixed(1) : "—";
    return { open, inReview, negotiation, avgQa };
  }, [myClaims]);

  return (
    <div className="space-y-6">
      <section className="panel rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-main">Adjuster</p>
            <h1 className="text-3xl font-semibold text-main">My book of claims</h1>
            <p className="text-sm text-muted">Focus on your assigned work, QA, and vendor coordination.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="pill text-main bg-[var(--card-muted)]">Docs & QA</span>
            <span className="pill text-main bg-white/10">Vendor assignment</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard title="Open claims" value={metrics.open} subtext="Assigned to you" />
          <MetricCard title="In review" value={metrics.inReview} subtext="Awaiting approvals" />
          <MetricCard title="Negotiation" value={metrics.negotiation} subtext="Active discussions" />
          <MetricCard title="Avg QA" value={metrics.avgQa} subtext="Across scored claims" />
        </div>
      </section>

      <section className="panel rounded-3xl p-5 shadow-lg">
        <ClaimsTable
          title="My claims"
          subtitle="Docs, vendors, QA in one place"
          claims={myClaims}
          agencies={agencies}
          users={users}
          vendors={vendors}
          onRowClick={() => undefined}
        />
      </section>
    </div>
  );
};

export default AdjusterDashboard;
