import { useEffect, useState } from "react";
import { apiClient, VendorOnboardingState } from "../services/apiClient";
import { normalizeRole } from "../navigation";
import { useOnboardingStore } from "../onboardingStore";
import { useNavigate } from "react-router-dom";

type Step = "profile" | "services" | "documents" | "notifications" | "review";

const steps: Step[] = ["profile", "services", "documents", "notifications", "review"];

const VendorOnboardingWizard = () => {
  const { profile } = useOnboardingStore();
  const role = normalizeRole(profile.role);
  const navigate = useNavigate();
  const [state, setState] = useState<VendorOnboardingState | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>("profile");

  useEffect(() => {
    if (role !== "vendor") {
      navigate("/");
      return;
    }
    apiClient.getVendorOnboardingState().then((data) => {
      if (data.onboardingCompleted) {
        navigate("/vendor/dashboard");
      } else {
        setState(data);
        setLoading(false);
      }
    });
  }, [role, navigate]);

  const go = (dir: 1 | -1) => {
    const idx = steps.indexOf(step);
    const next = steps[Math.min(steps.length - 1, Math.max(0, idx + dir))];
    setStep(next);
  };

  if (loading || !state) return <p className="text-muted">Loading…</p>;

  return (
    <div className="space-y-4">
      <div className="panel rounded-3xl p-6 shadow-lg space-y-2">
        <p className="text-sm text-muted">Vendor onboarding</p>
        <h1 className="text-2xl font-semibold text-main">{state.profile.companyName}</h1>
        <Stepper current={step} />
      </div>

      {step === "profile" ? <ProfileStep state={state} onSave={setState} /> : null}
      {step === "services" ? <ServicesStep state={state} onSave={setState} /> : null}
      {step === "documents" ? <DocumentsStep state={state} onSave={setState} /> : null}
      {step === "notifications" ? <NotificationsStep state={state} onSave={setState} /> : null}
      {step === "review" ? <ReviewStep state={state} onFinish={() => navigate("/vendor/dashboard")} /> : null}

      <div className="flex items-center justify-between">
        <button className="pill text-main bg-[var(--card-muted)]" onClick={() => go(-1)} disabled={step === "profile"}>
          Back
        </button>
        <button className="pill text-main bg-white/10" onClick={() => (step === "review" ? apiClient.completeVendorOnboarding().then(() => navigate("/vendor/dashboard")) : go(1))}>
          {step === "review" ? "Finish onboarding" : "Next"}
        </button>
      </div>
    </div>
  );
};

const Stepper = ({ current }: { current: Step }) => {
  const idx = steps.indexOf(current);
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className={`px-3 py-1 rounded-full text-xs border ${i <= idx ? "bg-white/15 text-main" : "bg-[var(--card-muted)] text-muted"}`}>
          {i + 1}. {s}
        </div>
      ))}
    </div>
  );
};

const ProfileStep = ({ state, onSave }: { state: VendorOnboardingState; onSave: (s: VendorOnboardingState) => void }) => {
  const [profile, setProfile] = useState(state.profile);
  const handleSave = async () => {
    const updated = await apiClient.updateVendorOnboardingProfile(profile);
    onSave(updated);
  };
  const onChange = (key: keyof typeof profile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile((prev) => ({ ...prev, [key]: e.target.value }));
  return (
    <div className="panel rounded-2xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold text-main">Company profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <Input label="Company name" value={profile.companyName} onChange={onChange("companyName")} />
        <Input label="Phone" value={profile.phone || ""} onChange={onChange("phone")} />
        <Input label="Website" value={profile.website || ""} onChange={onChange("website")} />
        <Input label="Address" value={profile.addressLine1} onChange={onChange("addressLine1")} />
        <Input label="City" value={profile.city} onChange={onChange("city")} />
        <Input label="State" value={profile.state} onChange={onChange("state")} />
        <Input label="Postal code" value={profile.postalCode} onChange={onChange("postalCode")} />
      </div>
      <button className="pill text-main bg-white/10" onClick={handleSave}>Save profile</button>
    </div>
  );
};

const ServicesStep = ({ state, onSave }: { state: VendorOnboardingState; onSave: (s: VendorOnboardingState) => void }) => {
  const [serviceAreas, setServiceAreas] = useState(state.profile.serviceAreas.join(", "));
  const [services, setServices] = useState(state.profile.servicesOffered);
  const toggle = (svc: string) => {
    setServices((prev) => (prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]));
  };
  const save = async () => {
    const updated = await apiClient.updateVendorServicesAndAreas({
      serviceAreas: serviceAreas.split(",").map((s) => s.trim()).filter(Boolean),
      servicesOffered: services,
    });
    onSave(updated);
  };
  const options = ["Water", "Fire", "Mold", "Storm", "Contents", "Boardup"];
  return (
    <div className="panel rounded-2xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold text-main">Service areas & services</h3>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-muted">Service areas (states/ZIPs)</span>
        <input className="input-surface rounded-lg px-3 py-2" value={serviceAreas} onChange={(e) => setServiceAreas(e.target.value)} />
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((svc) => (
          <button
            key={svc}
            type="button"
            className={`pill text-sm ${services.includes(svc) ? "bg-white/15 text-main" : "bg-[var(--card-muted)] text-muted"}`}
            onClick={() => toggle(svc)}
          >
            {svc}
          </button>
        ))}
      </div>
      <button className="pill text-main bg-white/10" onClick={save}>Save services</button>
    </div>
  );
};

const DocumentsStep = ({ state, onSave }: { state: VendorOnboardingState; onSave: (s: VendorOnboardingState) => void }) => {
  const upload = async (type: "W9" | "COI" | "LICENSE") => {
    const updated = await apiClient.uploadVendorOnboardingDoc(type);
    onSave(updated);
  };
  const items: { label: string; key: keyof VendorOnboardingState["checklist"]; type: "W9" | "COI" | "LICENSE" }[] = [
    { label: "W9", key: "w9Uploaded", type: "W9" },
    { label: "COI", key: "coiUploaded", type: "COI" },
    { label: "License", key: "licenseUploaded", type: "LICENSE" },
  ];
  return (
    <div className="panel rounded-2xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold text-main">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item) => {
          const done = state.checklist[item.key];
          return (
            <div key={item.label} className="panel-muted rounded-xl p-3 border border-[var(--border)] space-y-2">
              <p className="text-sm font-semibold text-main">{item.label}</p>
              <p className="text-xs text-muted">{done ? "Uploaded" : "Required"}</p>
              <button className="pill text-main text-xs bg-white/10" onClick={() => upload(item.type)}>
                {done ? "Re-upload" : "Upload"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NotificationsStep = ({ state, onSave }: { state: VendorOnboardingState; onSave: (s: VendorOnboardingState) => void }) => {
  const [prefs, setPrefs] = useState(state.notifications);
  const toggle = (key: keyof typeof prefs) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  const save = async () => {
    const updated = await apiClient.updateVendorNotificationPrefs(prefs);
    onSave(updated);
  };
  return (
    <div className="panel rounded-2xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold text-main">Notification preferences</h3>
      <div className="space-y-2 text-sm">
        {[
          ["jobEmails", "Job emails"],
          ["reminders", "Reminders"],
          ["compliance", "Compliance alerts"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center justify-between rounded-lg px-3 py-2 bg-[var(--card-muted)] border border-[var(--border)]">
            <span className="text-main">{label}</span>
            <input type="checkbox" className="h-4 w-4" checked={prefs[key as keyof typeof prefs]} onChange={() => toggle(key as keyof typeof prefs)} />
          </label>
        ))}
      </div>
      <button className="pill text-main bg-white/10" onClick={save}>Save preferences</button>
    </div>
  );
};

const ReviewStep = ({ state, onFinish }: { state: VendorOnboardingState; onFinish: () => void }) => {
  const checklist = state.checklist;
  const complete = checklist.w9Uploaded && checklist.coiUploaded && checklist.licenseUploaded && checklist.profileCompleted && checklist.serviceAreasConfigured;
  return (
    <div className="panel rounded-2xl p-4 shadow space-y-3">
      <h3 className="text-lg font-semibold text-main">Review & finish</h3>
      <p className="text-sm text-muted">Confirm your info and finish onboarding.</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Info label="Company" value={state.profile.companyName} />
        <Info label="Address" value={[state.profile.addressLine1, state.profile.city, state.profile.state, state.profile.postalCode].filter(Boolean).join(", ")} />
        <Info label="Phone" value={state.profile.phone || "—"} />
        <Info label="Website" value={state.profile.website || "—"} />
        <Info label="Service areas" value={state.profile.serviceAreas.join(", ")} />
        <Info label="Services" value={state.profile.servicesOffered.join(", ")} />
      </div>
      <div className="space-y-1">
        <p className="text-sm text-main">Checklist</p>
        <p className="text-xs text-muted">Docs: {checklist.w9Uploaded && checklist.coiUploaded && checklist.licenseUploaded ? "Complete" : "Missing items"}</p>
      </div>
      <button className="pill text-main bg-white/10" onClick={onFinish} disabled={!complete}>
        {complete ? "Complete onboarding" : "Finish after completing required items"}
      </button>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <label className="flex flex-col gap-1">
    <span className="text-xs text-muted uppercase tracking-wide">{label}</span>
    <input className="input-surface rounded-lg px-3 py-2 text-sm" value={value} onChange={onChange} />
  </label>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted uppercase tracking-wide">{label}</p>
    <p className="text-main">{value || "—"}</p>
  </div>
);

export default VendorOnboardingWizard;
