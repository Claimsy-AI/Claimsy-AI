import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DocumentsList from "../components/DocumentsList";
import Timeline from "../components/Timeline";
import StatusPill from "../components/pills/StatusPill";
import MetricCard from "../components/cards/MetricCard";
import { agencies, claims, documents, timelineEvents, users, vendors } from "../mockData";

const ClaimDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const claim = useMemo(() => claims.find((c) => c.id === id), [id]);

  const agencyMap = useMemo(() => Object.fromEntries(agencies.map((a) => [a.id, a.name])), []);
  const userMap = useMemo(() => Object.fromEntries(users.map((u) => [u.id, u.full_name])), []);
  const vendorMap = useMemo(() => Object.fromEntries(vendors.map((v) => [v.id, v.name])), []);

  const claimDocs = useMemo(() => documents.filter((doc) => doc.claim_id === id), [id]);
  const claimEvents = useMemo(() => timelineEvents.filter((event) => event.claim_id === id), [id]);

  if (!claim) {
    return (
      <div className="panel rounded-2xl p-6 text-main">
        <p>Claim not found.</p>
        <button
          className="mt-3 inline-flex px-4 py-2 rounded-full bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-500"
          onClick={() => navigate("/claims")}
        >
          Back to claims
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted">Case #{claim.case_number}</p>
            <h2 className="text-2xl font-semibold text-main">{claim.insured_name}</h2>
          </div>
          <StatusPill status={claim.status} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-main">
          <div>
            <p className="text-muted text-xs">Agency</p>
            <p className="font-medium text-main">{agencyMap[claim.agency_id]}</p>
          </div>
          <div>
            <p className="text-muted text-xs">Loss date</p>
            <p className="font-medium text-main">{new Date(claim.loss_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted text-xs">Referral source</p>
            <p className="font-medium text-main">{claim.referral_source ?? "—"}</p>
          </div>
          <div>
            <p className="text-muted text-xs">Insured contact</p>
            <p className="font-medium text-main">{claim.insured_contact}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Assigned adjuster" value={userMap[claim.assigned_adjuster_id]} />
        <MetricCard title="Assigned vendor" value={claim.assigned_vendor_id ? vendorMap[claim.assigned_vendor_id] : "Unassigned"} />
        <MetricCard title="QA score" value={claim.qa_score ?? "Not scored"} />
        <MetricCard
          title="Created / Updated"
          value={`${new Date(claim.created_at).toLocaleDateString()} • ${new Date(claim.updated_at).toLocaleDateString()}`}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <Timeline events={claimEvents} users={users} />
        </div>
        <div>
          <DocumentsList documents={claimDocs} users={users} vendors={vendors} />
        </div>
      </div>
    </div>
  );
};

export default ClaimDetail;
