import { useEffect, useMemo, useState } from "react";
import { apiClient, VendorApplication, VendorApplicationStatus } from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const statusLabels: Record<VendorApplicationStatus, string> = {
  NEW: "New",
  UNDER_REVIEW: "Under review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const VendorApplicationsList = ({ role }: { role: "super_admin" | "relationship_manager" }) => {
  const [apps, setApps] = useState<VendorApplication[]>([]);
  const [filter, setFilter] = useState<VendorApplicationStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    apiClient.listVendorApplications(filter).then((data) => {
      if (mounted) {
        setApps(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [filter]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return apps.filter(
      (app) =>
        app.companyName.toLowerCase().includes(term) ||
        app.contactName.toLowerCase().includes(term) ||
        app.contactEmail.toLowerCase().includes(term)
    );
  }, [apps, search]);

  return (
    <div className="space-y-4">
      <div className="panel rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">{role === "super_admin" ? "Admin" : "Relationship Manager"}</p>
            <h1 className="text-2xl font-semibold text-main">Vendor applications</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["ALL", "NEW", "UNDER_REVIEW", "APPROVED", "REJECTED"] as (VendorApplicationStatus | "ALL")[]).map((status) => (
              <button
                key={status}
                className={`pill text-xs ${filter === status ? "bg-white/15 text-main" : "bg-[var(--card-muted)] text-muted"}`}
                onClick={() => setFilter(status)}
              >
                {status === "ALL" ? "All" : statusLabels[status as VendorApplicationStatus]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="input-surface rounded-full px-3 py-2 text-sm flex-1 min-w-[200px]"
            placeholder="Search company/contact/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-xs text-muted">{filtered.length} results</span>
        </div>
      </div>

      <div className="panel rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-main">
            <thead className="text-xs uppercase tracking-wide text-main bg-[var(--card-muted)] border-b border-[var(--border)]">
              <tr>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={6}>Loading…</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-muted" colSpan={6}>No applications.</td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--card-muted)] cursor-pointer"
                    onClick={() => navigate(`./${app.id}`)}
                  >
                    <td className="px-4 py-3 font-semibold text-main">{app.companyName}</td>
                    <td className="px-4 py-3 text-main">{app.contactName}</td>
                    <td className="px-4 py-3 text-muted">{app.contactEmail}</td>
                    <td className="px-4 py-3 text-muted">{app.state || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="tag text-muted">{statusLabels[app.status]}</span>
                    </td>
                    <td className="px-4 py-3 text-muted">{new Date(app.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorApplicationsList;
