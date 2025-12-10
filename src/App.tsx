import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./routes/Dashboard";
import Claims from "./routes/Claims";
import ClaimDetail from "./routes/ClaimDetail";
import Vendors from "./routes/Vendors";
import Agencies from "./routes/Agencies";
import Users from "./routes/Users";
import Workflow from "./routes/Workflow";
import Referrals from "./routes/Referrals";
import Settings from "./routes/Settings";
import Login from "./routes/Login";
import Onboarding from "./routes/Onboarding";
import Blueprint from "./routes/Blueprint";
import AgencyUI from "./routes/AgencyUI";
import VendorUI from "./routes/VendorUI";
import RelationshipManagerUI from "./routes/RelationshipManagerUI";
import AdjusterDashboard from "./routes/AdjusterDashboard";
import SuperAdminDashboard from "./routes/SuperAdminDashboard";
import PublicStatus from "./routes/PublicStatus";
import MarketingPlaceholder from "./routes/MarketingPlaceholder";
import VendorOnboardPublic from "./routes/VendorOnboardPublic";
import VendorOnboardingWizard from "./routes/VendorOnboardingWizard";
import VendorApplicationsList from "./routes/VendorApplicationsList";
import VendorApplicationDetail from "./routes/VendorApplicationDetail";
import { useOnboardingStore } from "./onboardingStore";
import { useMemo } from "react";
import { allowedRoutesByRole, homeByRole, normalizePath, normalizeRole, routeTitles } from "./navigation";

const App = () => {
  const location = useLocation();
  const { profile, sessionActive } = useOnboardingStore();
  const authed = sessionActive;
  const path = normalizePath(location.pathname);
  const pageTitle = routeTitles[path] ?? "ClaimsyAI";
  const noChrome = useMemo(() => ["/login", "/onboarding", "/onboard/vendor"].includes(path), [path]);
  const role = normalizeRole(profile.role);
  const allowedRoutes = allowedRoutesByRole[role] || allowedRoutesByRole.manager;
  const homePath = homeByRole[role] || "/";

  const ProtectedRoute = ({ children, pathKey }: { children: React.ReactNode; pathKey: string }) => {
    if (!authed && !pathKey.startsWith("/c/")) return <Navigate to="/login" replace />;
    if (!allowedRoutes.includes(pathKey)) return <Navigate to={homePath} replace />;
    return <>{children}</>;
  };

  const chromeLayout = (
    <div className="min-h-screen flex app-shell">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar title={pageTitle} />
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute pathKey="/">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adjuster/dashboard"
              element={
                <ProtectedRoute pathKey="/adjuster/dashboard">
                  <AdjusterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/claims"
              element={
                <ProtectedRoute pathKey="/claims">
                  <Claims />
                </ProtectedRoute>
              }
            />
            <Route
              path="/claims/:id"
              element={
                <ProtectedRoute pathKey="/claims">
                  <ClaimDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow"
              element={
                <ProtectedRoute pathKey="/workflow">
                  <Workflow />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendors"
              element={
                <ProtectedRoute pathKey="/vendors">
                  <Vendors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agencies"
              element={
                <ProtectedRoute pathKey="/agencies">
                  <Agencies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute pathKey="/users">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/referrals"
              element={
                <ProtectedRoute pathKey="/referrals">
                  <Referrals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute pathKey="/settings">
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blueprint"
              element={
                <ProtectedRoute pathKey="/blueprint">
                  <Blueprint />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agency/dashboard"
              element={
                <ProtectedRoute pathKey="/agency/dashboard">
                  <AgencyUI />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/dashboard"
              element={
                <ProtectedRoute pathKey="/vendor/dashboard">
                  <VendorUI />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/onboarding"
              element={
                <ProtectedRoute pathKey="/vendor/dashboard">
                  <VendorOnboardingWizard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/dashboard"
              element={
                <ProtectedRoute pathKey="/rm/dashboard">
                  <RelationshipManagerUI />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/vendor-applications"
              element={
                <ProtectedRoute pathKey="/rm/vendor-applications">
                  <VendorApplicationsList role="relationship_manager" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/vendor-applications/:id"
              element={
                <ProtectedRoute pathKey="/rm/vendor-applications">
                  <VendorApplicationDetail role="relationship_manager" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/vendors"
              element={
                <ProtectedRoute pathKey="/rm/vendors">
                  <RelationshipManagerUI initialTab="vendors" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/agencies"
              element={
                <ProtectedRoute pathKey="/rm/agencies">
                  <RelationshipManagerUI initialTab="agencies" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/referrals"
              element={
                <ProtectedRoute pathKey="/rm/referrals">
                  <RelationshipManagerUI initialTab="referrals" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/compliance"
              element={
                <ProtectedRoute pathKey="/rm/compliance">
                  <RelationshipManagerUI initialTab="compliance" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rm/outreach"
              element={
                <ProtectedRoute pathKey="/rm/outreach">
                  <RelationshipManagerUI initialTab="outreach" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute pathKey="/admin/dashboard">
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vendor-applications"
              element={
                <ProtectedRoute pathKey="/admin/vendor-applications">
                  <VendorApplicationsList role="super_admin" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/vendor-applications/:id"
              element={
                <ProtectedRoute pathKey="/admin/vendor-applications">
                  <VendorApplicationDetail role="super_admin" />
                </ProtectedRoute>
              }
            />
            <Route path="/c/:id" element={<PublicStatus />} />
            <Route path="/for-insurance-agencies" element={<MarketingPlaceholder title="For Insurance Agencies" />} />
            <Route path="/for-restoration-vendors" element={<MarketingPlaceholder title="For Restoration Vendors" />} />
            <Route path="/for-adjusters" element={<MarketingPlaceholder title="For Adjusters" />} />
            <Route path="/how-it-works" element={<MarketingPlaceholder title="How Claimsy Works" />} />
            <Route path="/contact" element={<MarketingPlaceholder title="Contact" />} />
            <Route path="/legal/privacy" element={<MarketingPlaceholder title="Privacy" />} />
            <Route path="/legal/terms" element={<MarketingPlaceholder title="Terms" />} />
            <Route path="*" element={<Navigate to={homePath} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );

  const simpleLayout = (
    <div className="min-h-screen app-shell flex items-center justify-center p-6">
      <Routes>
        <Route path="/login" element={authed ? <Navigate to={homePath} replace /> : <Login />} />
        <Route
          path="/onboarding"
          element={
            authed ? (
              <Onboarding />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/onboard/vendor" element={<VendorOnboardPublic />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );

  if (!authed && path !== "/login") {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const normalized = normalizePath(path);
  if (!allowedRoutes.includes(normalized) && !noChrome) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to={homePath} replace />} />
      </Routes>
    );
  }

  return noChrome ? simpleLayout : chromeLayout;
};

export default App;
