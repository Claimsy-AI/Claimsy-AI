export const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/claims": "Claims",
  "/workflow": "Workflow",
  "/vendors": "Vendors",
  "/agencies": "Agencies",
  "/users": "Users",
  "/referrals": "Referrals",
  "/settings": "Settings",
  "/login": "Login",
  "/onboarding": "Onboarding",
  "/blueprint": "Blueprint",
  "/agency/dashboard": "Agency",
  "/vendor/dashboard": "Vendor",
  "/rm/dashboard": "Relationship Manager",
  "/adjuster/dashboard": "Adjuster",
  "/admin/dashboard": "Super Admin",
  "/c/:id": "Client Status",
  "/rm/vendors": "RM Vendors",
  "/rm/agencies": "RM Agencies",
  "/rm/referrals": "RM Referrals",
  "/rm/compliance": "RM Compliance",
  "/rm/outreach": "RM Outreach",
  "/rm/vendor-applications": "RM Vendor Applications",
  "/admin/vendor-applications": "Admin Vendor Applications",
};

export const homeByRole: Record<string, string> = {
  manager: "/",
  adjuster: "/adjuster/dashboard",
  agency: "/agency/dashboard",
  vendor: "/vendor/dashboard",
  relationship_manager: "/rm/dashboard",
  super_admin: "/admin/dashboard",
};

export const allowedRoutesByRole: Record<string, string[]> = {
  manager: ["/", "/claims", "/workflow", "/vendors", "/agencies", "/users", "/referrals", "/settings", "/blueprint"],
  adjuster: ["/adjuster/dashboard", "/claims", "/referrals", "/settings"],
  agency: ["/agency/dashboard", "/agency/claims", "/agency/settings", "/agency/rewards", "/agency/credits", "/claims", "/settings"],
  vendor: ["/vendor/dashboard", "/vendor/jobs", "/vendor/settings", "/vendor/payments", "/settings"],
  relationship_manager: ["/rm/dashboard", "/rm/vendors", "/rm/agencies", "/rm/adjusters", "/rm/referrals", "/rm/compliance", "/rm/outreach", "/rm/vendor-applications", "/settings", "/blueprint"],
  super_admin: ["/admin/dashboard", "/rm/dashboard", "/settings", "/blueprint", "/claims", "/vendors", "/agencies", "/users", "/referrals", "/admin/vendor-applications", "/rm/vendor-applications"],
};

export type NavItem = { label: string; to: string; roles: string[] };

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", roles: ["manager"] },
  { label: "Adjuster Home", to: "/adjuster/dashboard", roles: ["adjuster"] },
  { label: "Agency Home", to: "/agency/dashboard", roles: ["agency"] },
  { label: "Vendor Home", to: "/vendor/dashboard", roles: ["vendor"] },
  { label: "RM Home", to: "/rm/dashboard", roles: ["relationship_manager"] },
  { label: "Admin Home", to: "/admin/dashboard", roles: ["super_admin"] },
  { label: "Claims", to: "/claims", roles: ["manager", "adjuster", "agency"] },
  { label: "Referrals", to: "/referrals", roles: ["manager", "adjuster"] },
  { label: "Workflow", to: "/workflow", roles: ["manager"] },
  { label: "Vendors", to: "/vendors", roles: ["manager", "super_admin"] },
  { label: "Agencies", to: "/agencies", roles: ["manager", "super_admin"] },
  { label: "Users", to: "/users", roles: ["manager", "super_admin"] },
  { label: "RM Vendors", to: "/rm/vendors", roles: ["relationship_manager"] },
  { label: "RM Agencies", to: "/rm/agencies", roles: ["relationship_manager"] },
  { label: "RM Referrals", to: "/rm/referrals", roles: ["relationship_manager"] },
  { label: "RM Compliance", to: "/rm/compliance", roles: ["relationship_manager"] },
  { label: "RM Outreach", to: "/rm/outreach", roles: ["relationship_manager"] },
  { label: "RM Vendor Apps", to: "/rm/vendor-applications", roles: ["relationship_manager"] },
  { label: "Admin Vendor Apps", to: "/admin/vendor-applications", roles: ["super_admin"] },
  { label: "Blueprint", to: "/blueprint", roles: ["manager", "relationship_manager", "super_admin"] },
  { label: "Settings", to: "/settings", roles: ["manager", "adjuster", "agency", "vendor", "relationship_manager", "super_admin"] },
];

const roleMap: Record<string, string> = {
  SUPER_ADMIN: "super_admin",
  RELATIONSHIP_MANAGER: "relationship_manager",
  ADJUSTER: "adjuster",
  AGENCY_USER: "agency",
  VENDOR_USER: "vendor",
  MANAGER: "manager",
};

export const normalizeRole = (role?: string) => {
  if (!role) return "manager";
  const key = role.toUpperCase();
  return roleMap[key] || role.toLowerCase();
};

export const normalizePath = (pathname: string) => {
  const trimmed = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (trimmed.startsWith("/claims/")) return "/claims";
  return trimmed;
};
