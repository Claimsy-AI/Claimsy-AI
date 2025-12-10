import { useEffect } from "react";
import { normalizeRole } from "../navigation";
import { useOnboardingStore } from "../onboardingStore";
import VendorOnboardForm from "../components/forms/VendorOnboardForm";

const VendorOnboardPublic = () => {
  const { profile } = useOnboardingStore();
  const role = normalizeRole(profile.role);
  const isVendor = role === "vendor";

  useEffect(() => {
    if (isVendor) {
      window.location.replace("/vendor/dashboard");
    }
  }, [isVendor]);

  if (isVendor) return null;

  return (
    <div className="w-full max-w-5xl panel rounded-3xl p-6 sm:p-8 shadow-lg space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Claimsy AI • Vendor Intake</p>
          <h1 className="text-3xl font-semibold text-main">Join the restoration network</h1>
          <p className="text-sm text-muted max-w-2xl">Tell us about your company so we can verify and onboard you.</p>
        </div>
        <span className="pill text-main bg-[var(--card-muted)]">Public form</span>
      </div>

      <VendorOnboardForm />
    </div>
  );
};

export default VendorOnboardPublic;
