import StatusPill from "../components/pills/StatusPill";

const PublicStatus = () => {
  return (
    <div className="w-full max-w-3xl panel rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
      <div>
        <p className="text-sm text-muted">Claimsy AI • Client Status</p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-main">Your claim status</h1>
        <p className="text-sm text-muted">Read-only view shared via secure link.</p>
      </div>
      <div className="panel-muted rounded-2xl p-4 border border-[var(--border)] space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Policyholder</p>
            <p className="text-main font-semibold">Alex & Jamie Hart</p>
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
        <div className="space-y-1 text-sm text-main">
          <div className="rounded-lg border border-[var(--border)] px-3 py-2 bg-[var(--card)] flex items-center justify-between">
            <span>Vendor arriving on site at 2:00 PM</span>
            <span className="text-xs text-muted">Today</span>
          </div>
          <div className="rounded-lg border border-[var(--border)] px-3 py-2 bg-[var(--card)] flex items-center justify-between">
            <span>Photos uploaded</span>
            <span className="text-xs text-muted">1h ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicStatus;
