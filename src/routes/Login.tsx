import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOnboardingStore } from "../onboardingStore";

const Login = () => {
  const navigate = useNavigate();
  const { setProfile } = useOnboardingStore();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({
    email: "alex.mason@claimsy.ai",
    password: "",
    name: "",
    role: "ADJUSTER",
  });

  const quickRoles = [
    { label: "Adjuster", email: "adjuster@claimsy.ai", name: "Adjuster Pro", role: "ADJUSTER" },
    { label: "Agency", email: "agency@claimsy.ai", name: "Agency Lead", role: "AGENCY_USER" },
    { label: "Vendor", email: "vendor@claimsy.ai", name: "Vendor Ops", role: "VENDOR_USER" },
    { label: "Relationship Manager", email: "rm@claimsy.ai", name: "Success Lead", role: "RELATIONSHIP_MANAGER" },
    { label: "Super Admin", email: "admin@claimsy.ai", name: "Admin", role: "SUPER_ADMIN" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameGuess = (form.name || "").trim() || form.email.split("@")[0].replace(".", " ");
    setProfile({
      name: nameGuess || "New User",
      email: form.email,
      title: mode === "signup" ? "New user" : "Manager",
      phone: "",
      role: form.role,
    });

    const roleRoute: Record<string, string> = {
      AGENCY_USER: "/agency/dashboard",
      VENDOR_USER: "/vendor/dashboard",
      RELATIONSHIP_MANAGER: "/rm/dashboard",
      ADJUSTER: "/adjuster/dashboard",
      SUPER_ADMIN: "/admin/dashboard",
      MANAGER: "/",
    };

    navigate(roleRoute[form.role] || "/");
  };

  return (
    <div className="w-full max-w-3xl panel rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold text-main">Claimsy Access</h1>
          <p className="text-base text-muted mt-1">Log in or create access for each viewer type.</p>
        </div>
        <div className="flex gap-2">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              className={`pill text-sm ${mode === m ? "bg-white/15 text-main" : "bg-[var(--card-muted)] text-muted"}`}
              onClick={() => setMode(m)}
            >
              {m === "login" ? "Login" : "Sign up"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3">
            {mode === "signup" ? (
              <>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-muted">Name</span>
                  <input
                    className="input-surface rounded-lg px-3 py-2 text-main"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-muted">Role</span>
                  <select
                    className="input-surface rounded-lg px-3 py-2 text-main"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="RELATIONSHIP_MANAGER">Relationship Manager</option>
                    <option value="ADJUSTER">Adjuster</option>
                    <option value="AGENCY_USER">Insurance Agency</option>
                    <option value="VENDOR_USER">Restoration Vendor</option>
                  </select>
                </label>
              </>
            ) : null}
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Email</span>
              <input
                type="email"
                required
                className="input-surface rounded-lg px-3 py-2 text-main"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@claimsy.ai"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">{mode === "login" ? "Password" : "Create password"}</span>
              <input
                type="password"
                required
                className="input-surface rounded-lg px-3 py-2 text-main"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••"
              />
            </label>
            {mode === "login" ? (
              <div className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm text-muted bg-[var(--card-muted)]">
                Persona: {form.role.replace("_", " ")} (use quick buttons to switch roles)
              </div>
            ) : null}
          </div>
          <button type="submit" className="w-full pill text-main justify-center text-sm bg-white/10 hover:-translate-y-0.5 transition">
            {mode === "login" ? "Log in" : "Create account"}
          </button>
          <p className="text-xs text-muted">
            Routing: Adjuster → /adjuster/dashboard · Agency → /agency/dashboard · Vendor → /vendor/dashboard · RM → /rm/dashboard · Admin → /admin/dashboard.
          </p>
        </form>

        <div className="panel-muted rounded-xl p-4 space-y-3 border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-main">One-click role login</p>
            <span className="tag text-muted">Personas</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickRoles.map((role) => (
              <button
                key={role.label}
                type="button"
                className="rounded-xl border border-[var(--border)] px-3 py-3 text-left hover:bg-[var(--card)] transition"
                onClick={() => {
                  setForm({
                    email: role.email,
                    password: "demo123!",
                    role: role.role,
                    name: role.name,
                  });
                  setProfile({
                    name: role.name,
                    email: role.email,
                    title: role.label,
                    phone: "",
                    role: role.role,
                  });
                  const roleRoute: Record<string, string> = {
                    AGENCY_USER: "/agency/dashboard",
                    VENDOR_USER: "/vendor/dashboard",
                    RELATIONSHIP_MANAGER: "/rm/dashboard",
                    ADJUSTER: "/adjuster/dashboard",
                    SUPER_ADMIN: "/admin/dashboard",
                    MANAGER: "/",
                  };
                  navigate(roleRoute[role.role] || "/");
                }}
              >
                <p className="text-sm font-semibold text-main">{role.label}</p>
                <p className="text-xs text-muted">{role.email}</p>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-dashed border-[var(--border)] p-3 text-sm text-muted">
            After login, you can still open the manager onboarding at any time from Settings → Open onboarding.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
