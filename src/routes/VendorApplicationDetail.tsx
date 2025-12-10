import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient, VendorApplication } from "../services/apiClient";

const statusColor: Record<string, string> = {
  NEW: "tag",
  UNDER_REVIEW: "tag",
  APPROVED: "tag",
  REJECTED: "tag",
};

const VendorApplicationDetail = ({ role }: { role: "super_admin" | "relationship_manager" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState<VendorApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [primaryName, setPrimaryName] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!id) return;
    apiClient
      .getVendorApplication(id)
      .then((data) => setApp(data))
      .catch(() => setError("Not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApprove = async () => {
    if (!id) return;
    await apiClient.approveVendorApplication(id, { primaryEmail, primaryName });
    const updated = await apiClient.getVendorApplication(id);
    setApp(updated);
    setShowApprove(false);
  };

  const handleReject = async () => {
    if (!id) return;
    await apiClient.rejectVendorApplication(id, { reason });
    const updated = await apiClient.getVendorApplication(id);
    setApp(updated);
    setShowReject(false);
  };

  if (loading) return <p className="text-muted">Loading…</p>;
  if (error || !app) return <p className="text-muted">Application not found.</p>;

  return (
    <div className="space-y-4">
      <div className="panel rounded-3xl p-6 shadow-lg space-y-2">
        <button className="pill text-xs text-main bg-[var(--card-muted)]" onClick={() => navigate(-1)}>Back</button>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">{role === "super_admin" ? "Admin" : "RM"} • Vendor application</p>
            <h1 className="text-2xl font-semibold text-main">{app.companyName}</h1>
          </div>
          <span className="tag text-muted">{app.status}</span>
        </div>
        <p className="text-sm text-muted">Submitted: {new Date(app.createdAt).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="panel rounded-2xl p-4 shadow space-y-2 lg:col-span-2">
          <h3 className="text-lg font-semibold text-main">Company & Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <Info label="Company" value={app.companyName} />
            <Info label="Contact" value={app.contactName} />
            <Info label="Email" value={app.contactEmail} />
            <Info label="Phone" value={app.contactPhone || "—"} />
            <Info label="Website" value={app.website || "—"} />
            <Info label="Address" value={[app.addressLine1, app.city, app.state, app.postalCode].filter(Boolean).join(", ") || "—"} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <Info label="Service areas" value={app.serviceAreas?.join(", ") || "—"} />
            <Info label="Services" value={app.servicesOffered?.join(", ") || "—"} />
          </div>
          <div className="text-sm space-y-1">
            <p className="text-muted">Heard about us</p>
            <p className="text-main">{app.heardAboutUs || "—"}</p>
          </div>
          <div className="text-sm space-y-1">
            <p className="text-muted">Notes</p>
            <p className="text-main">{app.notes || "—"}</p>
          </div>
        </div>

        <div className="panel rounded-2xl p-4 shadow space-y-3">
          <h3 className="text-lg font-semibold text-main">Actions</h3>
          <p className="text-xs text-muted">Status: {app.status}</p>
          <div className="flex flex-col gap-2">
            {role === "relationship_manager" ? (
              <button className="pill text-main bg-[var(--card-muted)]" onClick={() => setShowApprove(true)}>Recommend approval</button>
            ) : null}
            {role === "super_admin" ? (
              <>
                <button className="pill text-main bg-white/10" onClick={() => setShowApprove(true)}>Approve vendor</button>
                <button className="pill text-main bg-[var(--card-muted)]" onClick={() => setShowReject(true)}>Reject vendor</button>
              </>
            ) : null}
          </div>
          {app.rejectionReason ? <p className="text-xs text-muted">Rejection reason: {app.rejectionReason}</p> : null}
        </div>
      </div>

      {showApprove ? (
        <div className="panel rounded-2xl p-4 border border-[var(--border)] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-main">Approve vendor</h4>
            <button className="text-xs text-muted" onClick={() => setShowApprove(false)}>Close</button>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <label className="flex flex-col gap-1">
              <span className="text-muted">Primary vendor admin email</span>
              <input className="input-surface rounded-lg px-3 py-2" value={primaryEmail} onChange={(e) => setPrimaryEmail(e.target.value)} />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-muted">Primary vendor admin name</span>
              <input className="input-surface rounded-lg px-3 py-2" value={primaryName} onChange={(e) => setPrimaryName(e.target.value)} />
            </label>
          </div>
          <button className="pill text-main bg-white/10" onClick={handleApprove}>Confirm approval</button>
        </div>
      ) : null}

      {showReject ? (
        <div className="panel rounded-2xl p-4 border border-[var(--border)] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-main">Reject vendor</h4>
            <button className="text-xs text-muted" onClick={() => setShowReject(false)}>Close</button>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Reason</span>
            <textarea className="input-surface rounded-lg px-3 py-2" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
          </label>
          <button className="pill text-main bg-[var(--card-muted)]" onClick={handleReject}>Confirm rejection</button>
        </div>
      ) : null}
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-muted text-xs uppercase tracking-wide">{label}</p>
    <p className="text-main">{value || "—"}</p>
  </div>
);

export default VendorApplicationDetail;
