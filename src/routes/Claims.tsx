import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClaimsTable from "../components/tables/ClaimsTable";
import { agencies, claims, users, vendors } from "../mockData";
import { ClaimStatus } from "../types";

const Claims = () => {
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "all">("all");
  const [agencyFilter, setAgencyFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesStatus = statusFilter === "all" ? true : claim.status === statusFilter;
      const matchesAgency = agencyFilter === "all" ? true : claim.agency_id === agencyFilter;
      return matchesStatus && matchesAgency;
    });
  }, [statusFilter, agencyFilter]);

  return (
    <div className="space-y-4">
      <div className="panel rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
        <h2 className="text-xl font-semibold text-main">Filters</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
            <label className="text-base text-muted">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ClaimStatus | "all")}
              className="input-surface rounded-lg px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="in_review">In review</option>
              <option value="negotiation">Negotiation</option>
              <option value="settled">Settled</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
            <label className="text-base text-muted">Agency</label>
            <select
              value={agencyFilter}
              onChange={(e) => setAgencyFilter(e.target.value)}
              className="input-surface rounded-lg px-3 py-2 text-sm text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            >
              <option value="all">All</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ClaimsTable
        claims={filteredClaims}
        agencies={agencies}
        users={users}
        vendors={vendors}
        onRowClick={(id) => navigate(`/claims/${id}`)}
      />
    </div>
  );
};

export default Claims;
