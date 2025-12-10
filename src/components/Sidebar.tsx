import { NavLink } from "react-router-dom";
import { useOnboardingStore } from "../onboardingStore";
import { navItems, normalizeRole } from "../navigation";

const Sidebar = () => {
  const { profile } = useOnboardingStore();
  const role = normalizeRole(profile.role);
  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "CA";
  const roleLabel =
    role === "relationship_manager"
      ? "Relationship Manager"
      : role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col sidebar-surface text-main">
      <div className="h-20 flex items-center px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center font-bold text-slate-950 shadow-lg">
          {initials}
        </div>
        <div className="ml-3">
          <p className="text-sm text-muted">ClaimsyAI</p>
          <p className="text-lg font-semibold text-main">{roleLabel}</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center px-4 py-3 rounded-full text-sm font-medium transition-colors border",
                  isActive
                    ? "bg-[var(--card)] text-main border-[var(--border)] shadow-lg"
                    : "text-muted hover:bg-[var(--card-muted)] hover:text-main border-transparent",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
