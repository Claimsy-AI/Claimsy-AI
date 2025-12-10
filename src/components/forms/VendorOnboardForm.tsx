import { useMemo, useState } from "react";
import { apiClient } from "../../services/apiClient";

export type VendorOnboardPayload = {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  serviceAreas: string[];
  servicesOffered: string[];
  heardAboutUs: string;
  notes: string;
  acceptTerms: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

const services = ["Water", "Fire", "Mold", "Storm", "Contents", "Boardup"];

const VendorOnboardForm = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<VendorOnboardPayload>({
    companyName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    serviceAreas: [],
    servicesOffered: [],
    heardAboutUs: "",
    notes: "",
    acceptTerms: false,
  });

  const disabled = useMemo(
    () => !form.companyName || !form.contactName || !form.contactEmail || !form.acceptTerms,
    [form.companyName, form.contactEmail, form.contactName, form.acceptTerms]
  );

  const handleInput =
    (key: keyof VendorOnboardPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: key === "serviceAreas" ? e.target.value.split(",").map((s) => s.trim()).filter(Boolean) : e.target.value,
      }));
    };

  const toggleService = (svc: string) => {
    setForm((prev) => {
      const has = prev.servicesOffered.includes(svc);
      return { ...prev, servicesOffered: has ? prev.servicesOffered.filter((s) => s !== svc) : [...prev.servicesOffered, svc] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setStatus("submitting");
    setError(null);
    try {
      await apiClient.submitVendorApplication(form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="panel-muted rounded-2xl p-5 border border-[var(--border)] space-y-3">
        <h2 className="text-2xl font-semibold text-main">Application received</h2>
        <p className="text-sm text-muted">We’ll review and reach out with next steps.</p>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>RM/Admin reviews your submission.</li>
          <li>Approved vendors receive an onboarding invite.</li>
          <li>You can respond to the invite email with questions.</li>
        </ul>
        <div className="flex gap-2">
          <a href="/" className="pill text-main bg-[var(--card-muted)]">Back to home</a>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Company name</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.companyName} onChange={handleInput("companyName")} required />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Website</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.website} onChange={handleInput("website")} placeholder="https://…" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Contact name</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.contactName} onChange={handleInput("contactName")} required />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Contact email</span>
          <input type="email" className="input-surface rounded-lg px-3 py-2" value={form.contactEmail} onChange={handleInput("contactEmail")} required />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Contact phone</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.contactPhone} onChange={handleInput("contactPhone")} placeholder="555-123-4567" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Address</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.addressLine1} onChange={handleInput("addressLine1")} placeholder="123 Main St" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">City</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.city} onChange={handleInput("city")} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">State</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.state} onChange={handleInput("state")} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted">Postal code</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.postalCode} onChange={handleInput("postalCode")} />
        </label>
        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          <span className="text-muted">Service areas (comma separated states/ZIPs)</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.serviceAreas.join(", ")} onChange={handleInput("serviceAreas")} placeholder="CO, WY or 80202, 80203" />
        </label>
        <div className="md:col-span-2">
          <p className="text-sm text-main font-semibold mb-2">Services offered</p>
          <div className="flex flex-wrap gap-2">
            {services.map((svc) => {
              const active = form.servicesOffered.includes(svc);
              return (
                <button
                  key={svc}
                  type="button"
                  className={`pill text-sm ${active ? "bg-white/15 text-main" : "bg-[var(--card-muted)] text-muted"}`}
                  onClick={() => toggleService(svc)}
                >
                  {svc}
                </button>
              );
            })}
          </div>
        </div>
        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          <span className="text-muted">How did you hear about us?</span>
          <input className="input-surface rounded-lg px-3 py-2" value={form.heardAboutUs} onChange={handleInput("heardAboutUs")} />
        </label>
        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          <span className="text-muted">Notes</span>
          <textarea className="input-surface rounded-lg px-3 py-2" rows={3} value={form.notes} onChange={handleInput("notes")} placeholder="We specialize in multi-family properties..." />
        </label>
        <label className="flex items-center gap-2 text-sm md:col-span-2">
          <input
            type="checkbox"
            checked={form.acceptTerms}
            onChange={(e) => setForm((prev) => ({ ...prev, acceptTerms: e.target.checked }))}
            className="h-4 w-4"
            required
          />
          <span className="text-muted">I accept terms and confirm the information is accurate.</span>
        </label>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="pill text-main bg-white/10 hover:-translate-y-0.5 transition disabled:opacity-50"
          disabled={disabled || status === "submitting"}
        >
          {status === "submitting" ? "Submitting…" : "Submit application"}
        </button>
        <span className="text-xs text-muted">Public submission • Reviewed by RM/Admin</span>
      </div>
    </form>
  );
};

export default VendorOnboardForm;
