import { Agency, Claim } from "../../types";

interface AgenciesTableProps {
  agencies: Agency[];
  claims: Claim[];
}

const AgenciesTable = ({ agencies, claims }: AgenciesTableProps) => {
  const claimCountByAgency = claims.reduce<Record<string, number>>((acc, claim) => {
    acc[claim.agency_id] = (acc[claim.agency_id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="panel rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left text-main">
          <thead className="text-sm uppercase tracking-wide text-main bg-[var(--card-muted)] border-b border-[var(--border)]">
            <tr>
              <th scope="col" className="px-4 py-3">
                Agency
              </th>
              <th scope="col" className="px-4 py-3">
                Primary contact
              </th>
              <th scope="col" className="px-4 py-3">
                Claims
              </th>
              <th scope="col" className="px-4 py-3">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((agency) => (
              <tr key={agency.id} className="border-b border-slate-800/60 hover:bg-slate-800/50 transition-colors">
                <td className="px-4 py-3 font-medium text-main">{agency.name}</td>
                <td className="px-4 py-3 text-main">{agency.primary_contact_email}</td>
                <td className="px-4 py-3 text-main">{claimCountByAgency[agency.id] ?? 0}</td>
                <td className="px-4 py-3 text-main">{new Date(agency.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgenciesTable;
