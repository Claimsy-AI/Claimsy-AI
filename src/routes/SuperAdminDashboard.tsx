const SuperAdminDashboard = () => (
  <div className="panel rounded-3xl p-6 shadow-lg space-y-3">
    <h1 className="text-2xl font-semibold text-main">Super Admin</h1>
    <p className="text-sm text-muted">Configure QA rules, rewards, co-op allocations, and oversee all orgs.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[
        "Global settings",
        "QA scoring",
        "Reward catalog",
        "Co-op rules",
        "User & org management",
        "Audit logs",
      ].map((item) => (
        <div key={item} className="panel-muted rounded-xl px-4 py-3 border border-[var(--border)] text-main">
          {item}
        </div>
      ))}
    </div>
  </div>
);

export default SuperAdminDashboard;
