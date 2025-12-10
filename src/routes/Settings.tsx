import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../onboardingStore";

const Settings = () => {
  const { profile, onboarding, logout } = useOnboardingStore();
  const navigate = useNavigate();

  const [agency, setAgency] = useState({
    name: "Summit Insurance Group",
    address: "123 Main St, Denver, CO",
    contact: "contact@summitinsure.com",
    license: "LIC-78234",
  });

  const [notifications, setNotifications] = useState({
    inApp: true,
    email: true,
    sms: false,
    alerts: true,
  });

  const [security, setSecurity] = useState({
    twoFA: false,
    sessionTimeout: "60",
  });


  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityToggle = (key: keyof typeof security) => {
    setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <div className="panel rounded-2xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-main">Settings</h1>
            <p className="text-base text-muted mt-1">Manage your profile, organization, notifications, and security preferences.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="pill text-main bg-[var(--card-muted)] hover:-translate-y-0.5 transition"
              onClick={() => navigate("/onboarding")}
            >
              Open onboarding
            </button>
            <button
              type="button"
              className="pill text-main bg-white/10 hover:-translate-y-0.5 transition"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="panel rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-main">Profile</h2>
            <span className="text-sm text-muted">Profile is set at login and cannot be edited here.</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Full name</span>
              <input
                className="input-surface rounded-lg px-3 py-2 opacity-70"
                value={profile.name}
                readOnly
                disabled
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Title</span>
              <input
                className="input-surface rounded-lg px-3 py-2 opacity-70"
                value={profile.title}
                readOnly
                disabled
              />
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-muted">Email</span>
              <input
                className="input-surface rounded-lg px-3 py-2 opacity-70"
                value={profile.email}
                readOnly
                disabled
              />
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-muted">Phone</span>
              <input
                className="input-surface rounded-lg px-3 py-2 opacity-70"
                value={profile.phone || ""}
                readOnly
                disabled
              />
            </label>
          </div>
        </div>

        <div className="panel rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-main">Agency</h2>
            <button className="pill text-main text-sm">Save</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-muted">Agency name</span>
              <input
                className="input-surface rounded-lg px-3 py-2"
                value={agency.name}
                onChange={(e) => setAgency({ ...agency, name: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-muted">Address</span>
              <input
                className="input-surface rounded-lg px-3 py-2"
                value={agency.address}
                onChange={(e) => setAgency({ ...agency, address: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm sm:col-span-2">
              <span className="text-muted">Primary contact email</span>
              <input
                className="input-surface rounded-lg px-3 py-2"
                value={agency.contact}
                onChange={(e) => setAgency({ ...agency, contact: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">License #</span>
              <input
                className="input-surface rounded-lg px-3 py-2"
                value={agency.license}
                onChange={(e) => setAgency({ ...agency, license: e.target.value })}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-main">Notifications</h2>
            <button className="pill text-main text-sm">Save</button>
          </div>
          <div className="space-y-2 text-sm">
            {([
              ["In-app alerts", "inApp"],
              ["Email alerts", "email"],
              ["SMS alerts", "sms"],
              ["Compliance alerts", "alerts"],
            ] as [string, keyof typeof notifications][]).map(([label, key]) => (
              <label key={key} className="flex items-center justify-between rounded-lg px-3 py-2 bg-[var(--card-muted)] border border-[var(--border)]">
                <span className="text-main">{label}</span>
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={notifications[key]}
                  onChange={() => handleToggle(key)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-main">Security</h2>
            <button className="pill text-main text-sm">Save</button>
          </div>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between rounded-lg px-3 py-2 bg-[var(--card-muted)] border border-[var(--border)]">
              <span className="text-main">Two-factor authentication</span>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={security.twoFA}
                onChange={() => handleSecurityToggle("twoFA")}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-main">Session timeout (minutes)</span>
              <select
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                className="input-surface rounded-lg px-3 py-2 text-sm text-main"
              >
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="120">120</option>
              </select>
            </label>
          </div>
        </div>
        <div className="panel rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-main">Onboarding snapshot</h2>
          </div>
          {Object.keys(onboarding).length === 0 ? (
            <p className="text-base text-muted">No onboarding data yet. Complete the onboarding form to populate this section.</p>
          ) : (
            <div className="grid grid-cols-1 gap-2 text-sm">
              {Object.entries(onboarding).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-[var(--border)] pb-2">
                  <span className="text-muted capitalize">{key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}</span>
                  <span className="text-main text-right">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
