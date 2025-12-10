import { Claim, Agency, User, Vendor } from "../../types";
import StatusPill from "../pills/StatusPill";

interface ClaimsTableProps {
  claims: Claim[];
  agencies: Agency[];
  users: User[];
  vendors: Vendor[];
  onRowClick?: (id: string) => void;
  dense?: boolean;
  title?: string;
  subtitle?: string;
}

const ClaimsTable = ({ claims, agencies, users, vendors, onRowClick, dense, title, subtitle }: ClaimsTableProps) => {
  const agencyMap = Object.fromEntries(agencies.map((a) => [a.id, a.name]));
  const userMap = Object.fromEntries(users.map((u) => [u.id, u.full_name]));
  const vendorMap = Object.fromEntries(vendors.map((v) => [v.id, v.name]));

  return (
    <div className="panel rounded-2xl shadow-lg overflow-hidden">
      {(title || subtitle) && (
        <div className="px-4 py-3 bg-[var(--card)] text-main border-b border-[var(--border)]">
          {title && <h3 className="text-lg font-semibold text-main">{title}</h3>}
          {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left text-main">
          <thead className="text-sm uppercase tracking-wide text-main bg-[var(--card-muted)] border-b border-[var(--border)]">
            <tr>
              <th scope="col" className="px-4 py-3">
                Case #
              </th>
              <th scope="col" className="px-4 py-3">
                Insured
              </th>
              <th scope="col" className="px-4 py-3">
                Agency
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                Adjuster
              </th>
              <th scope="col" className="px-4 py-3">
                Vendor
              </th>
              <th scope="col" className="px-4 py-3">
                Loss date
              </th>
              <th scope="col" className="px-4 py-3">
                QA score
              </th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr
                key={claim.id}
                className={`border-b border-[var(--border)] hover:bg-[var(--card-muted)] transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() => onRowClick?.(claim.id)}
              >
                <td className={`px-4 ${dense ? "py-2" : "py-3"} font-semibold text-main`}>{claim.case_number}</td>
                <td className={`px-4 ${dense ? "py-2" : "py-3"}`}>
                  <div className="font-semibold text-main">{claim.insured_name}</div>
                  <div className="text-xs text-muted">{claim.insured_contact}</div>
                </td>
                <td className={`px-4 ${dense ? "py-2" : "py-3"} text-main`}>{agencyMap[claim.agency_id]}</td>
                <td className={`px-4 ${dense ? "py-2" : "py-3"}`}>
                  <StatusPill status={claim.status} />
                </td>
                <td className={`px-4 ${dense ? "py-2" : "py-3"} text-main`}>{userMap[claim.assigned_adjuster_id]}</td>
                <td className={`px-4 ${dense ? "py-2" : "py-3"} text-main`}>
                  {claim.assigned_vendor_id ? vendorMap[claim.assigned_vendor_id] : "—"}
                </td>
                <td className={`px-4 ${dense ? "py-2" : "py-3"} text-main`}>
                  {new Date(claim.loss_date).toLocaleDateString()}
                </td>
                <td className={`px-4 ${dense ? "py-2" : "py-3"} text-main`}>{claim.qa_score ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimsTable;
