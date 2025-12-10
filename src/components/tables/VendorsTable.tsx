import { Claim, Vendor } from "../../types";

interface VendorsTableProps {
  vendors: Vendor[];
  claims: Claim[];
}

const VendorsTable = ({ vendors, claims }: VendorsTableProps) => {
  const claimCountByVendor = claims.reduce<Record<string, number>>((acc, claim) => {
    if (claim.assigned_vendor_id) {
      acc[claim.assigned_vendor_id] = (acc[claim.assigned_vendor_id] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="panel rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left text-main">
          <thead className="text-sm uppercase tracking-wide text-main bg-[var(--card-muted)] border-b border-[var(--border)]">
            <tr>
              <th scope="col" className="px-4 py-3">
                Vendor
              </th>
              <th scope="col" className="px-4 py-3">
                Contact
              </th>
              <th scope="col" className="px-4 py-3">
                Phone
              </th>
              <th scope="col" className="px-4 py-3">
                Active claims
              </th>
              <th scope="col" className="px-4 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="border-b border-slate-800/60 hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3 font-medium text-main">{vendor.name}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-main">{vendor.contact_email}</div>
                </td>
                <td className="px-4 py-3 text-main">{vendor.phone ?? "—"}</td>
                <td className="px-4 py-3 text-main">{claimCountByVendor[vendor.id] ?? 0}</td>
                <td className="px-4 py-3 text-main">{new Date(vendor.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorsTable;
