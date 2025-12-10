import { NavLink } from "react-router-dom";
import { useTheme } from "../theme";
import { useOnboardingStore } from "../onboardingStore";
import { navItems } from "../navigation";

interface TopBarProps {
  title: string;
}

const TopBar = ({ title }: TopBarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useOnboardingStore();
  const role = profile.role || "manager";
  const mobileNav = navItems.filter((item) => item.roles.includes(role));
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
    <header className="sticky top-0 z-10 backdrop-blur topbar-surface">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <div className="md:hidden">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center font-bold text-slate-950">
            CA
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted">ClaimsyAI</p>
          <h1 className="text-xl sm:text-2xl font-semibold text-main flex items-center gap-2">
            {title}
            <span className="text-[11px] px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--card-muted)] text-muted">
              {roleLabel}
            </span>
          </h1>
        </div>
        <div className="hidden sm:flex flex-1 max-w-md items-center">
          <div className="flex-1">
            <input
              type="search"
              placeholder="Search claims, people, documents..."
              className="w-full input-surface rounded-full px-4 py-2 text-sm text-main placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-full border text-xs font-semibold transition-colors flex items-center gap-2"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
            aria-label="Toggle color mode"
          >
            <span role="img" aria-hidden="true">
              {theme === "dark" ? "☀️" : "🌙"}
            </span>
            <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
          </button>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-main">{profile.name || "New User"}</span>
            <span className="text-xs text-muted">{roleLabel}</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-slate-950 font-semibold">
            {initials}
          </div>
        </div>
      </div>
      <div className="px-4 pb-3 sm:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {mobileNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
                  isActive
                    ? "bg-[var(--card)] text-main border-[var(--border)]"
                    : "bg-[var(--card-muted)] text-muted border-[var(--border)]/70 hover:text-main",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
