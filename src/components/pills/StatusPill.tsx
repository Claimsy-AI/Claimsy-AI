import { ClaimStatus } from "../../types";

interface StatusPillProps {
  status: ClaimStatus;
}

const statusStyles: Record<ClaimStatus, string> = {
  new: "bg-indigo-600 text-white border border-indigo-700",
  in_review: "bg-slate-600 text-white border border-slate-700",
  negotiation: "bg-amber-400 text-slate-900 border border-amber-500",
  settled: "bg-emerald-500 text-white border border-emerald-600",
  closed: "bg-gray-500 text-white border border-gray-600",
};

const StatusPill = ({ status }: StatusPillProps) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
  >
    {status.replace("_", " ")}
  </span>
);

export default StatusPill;
