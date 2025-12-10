import { useMemo, useState } from "react";
import { referrals } from "../mockData";
import { ReferralStatus } from "../types";

const statusLabels: Record<ReferralStatus, string> = {
  pending: "Pending Acceptance",
  in_progress: "In Progress",
  awaiting_approval: "Awaiting Approval",
  completed: "Completed",
  declined: "Declined",
};

const statusColors: Record<ReferralStatus, string> = {
  pending: "bg-slate-500 text-white",
  in_progress: "bg-indigo-600 text-white",
  awaiting_approval: "bg-amber-500 text-slate-900",
  completed: "bg-emerald-500 text-white",
  declined: "bg-rose-500 text-white",
};

const Referrals = () => {
  const [activeStatus, setActiveStatus] = useState<ReferralStatus | "all">("all");

  const counts = useMemo(() => {
    const map: Record<ReferralStatus, number> = {
      pending: 0,
      in_progress: 0,
      awaiting_approval: 0,
      completed: 0,
      declined: 0,
    };
    referrals.forEach((ref) => {
      map[ref.status] += 1;
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    if (activeStatus === "all") return referrals;
    return referrals.filter((r) => r.status === activeStatus);
  }, [activeStatus]);

  return (
    <div className="space-y-4">
      <div className="panel rounded-2xl p-5 shadow-lg">
        <h1 className="text-2xl font-semibold text-main">Referrals</h1>
        <p className="text-base text-muted mt-1">Track referral status and partner progress.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveStatus("all")}
            className={`px-3 py-2 rounded-full border text-sm ${
              activeStatus === "all" ? "bg-[var(--card)] text-main border-[var(--border)]" : "text-muted border-[var(--border)]"
            }`}
          >
            All ({referrals.length})
          </button>
          {(Object.keys(statusLabels) as ReferralStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-3 py-2 rounded-full border text-sm flex items-center gap-2 ${
                activeStatus === status ? "bg-[var(--card)] text-main border-[var(--border)]" : "text-muted border-[var(--border)]"
              }`}
            >
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>{statusLabels[status]}</span>
              <span>{counts[status]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="panel rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-base text-left text-main">
            <thead className="text-sm uppercase tracking-wide text-main bg-[var(--card-muted)] border-b border-[var(--border)]">
              <tr>
                <th className="px-4 py-3">Referral</th>
                <th className="px-4 py-3">Claim</th>
                <th className="px-4 py-3">Policyholder</th>
                <th className="px-4 py-3">Partner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Last update</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ref) => (
                <tr key={ref.id} className="border-b border-[var(--border)] hover:bg-[var(--card-muted)] transition-colors">
                  <td className="px-4 py-3 font-semibold text-main">{ref.id}</td>
                  <td className="px-4 py-3 text-main">{ref.claim_id}</td>
                  <td className="px-4 py-3 text-main">{ref.policyholder}</td>
                  <td className="px-4 py-3 text-main">{ref.referred_partner}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ref.status]}`}>
                      {statusLabels[ref.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-main">{ref.progress}%</td>
                  <td className="px-4 py-3 text-main">{new Date(ref.last_update).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
