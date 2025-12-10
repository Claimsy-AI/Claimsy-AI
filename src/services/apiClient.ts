type Role = "SUPER_ADMIN" | "RELATIONSHIP_MANAGER" | "AGENCY_USER" | "ADJUSTER" | "VENDOR_USER" | "MANAGER";

export type VendorApplicationStatus = "NEW" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export interface VendorApplication {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  serviceAreas?: string[];
  servicesOffered?: string[];
  heardAboutUs?: string;
  notes?: string;
  status: VendorApplicationStatus;
  reviewerId?: string | null;
  rejectionReason?: string;
  createdAt: string;
}

export interface VendorOnboardingState {
  orgId: string;
  onboardingCompleted: boolean;
  profile: {
    companyName: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    phone?: string;
    website?: string;
    serviceAreas: string[];
    servicesOffered: string[];
  };
  checklist: {
    w9Uploaded: boolean;
    coiUploaded: boolean;
    licenseUploaded: boolean;
    profileCompleted: boolean;
    serviceAreasConfigured: boolean;
    notificationPreferencesSet: boolean;
  };
  notifications: {
    jobEmails: boolean;
    reminders: boolean;
    compliance: boolean;
  };
}

const vendorApplications: VendorApplication[] = [
  {
    id: "va_001",
    companyName: "Rapid Restore LLC",
    contactName: "John Doe",
    contactEmail: "john@rapidrestore.com",
    contactPhone: "555-123-4567",
    website: "https://rapidrestore.com",
    addressLine1: "123 Main St",
    city: "Denver",
    state: "CO",
    postalCode: "80202",
    serviceAreas: ["CO"],
    servicesOffered: ["Water", "Fire"],
    heardAboutUs: "Referral",
    notes: "We specialize in multi-family properties.",
    status: "NEW",
    createdAt: "2024-01-10T12:00:00.000Z",
  },
  {
    id: "va_002",
    companyName: "ClearSky Roofing",
    contactName: "Taylor Brooks",
    contactEmail: "taylor@clearskyroofing.com",
    contactPhone: "555-987-6543",
    website: "https://clearskyroofing.com",
    addressLine1: "44 Elm Ave",
    city: "Boulder",
    state: "CO",
    postalCode: "80301",
    serviceAreas: ["CO", "WY"],
    servicesOffered: ["Roof"],
    heardAboutUs: "Web search",
    status: "UNDER_REVIEW",
    createdAt: "2024-01-05T10:00:00.000Z",
  },
];

let onboardingState: VendorOnboardingState = {
  orgId: "org_vendor_1",
  onboardingCompleted: false,
  profile: {
    companyName: "Rapid Restore LLC",
    addressLine1: "123 Main St",
    city: "Denver",
    state: "CO",
    postalCode: "80202",
    phone: "555-123-4567",
    website: "https://rapidrestore.com",
    serviceAreas: ["CO"],
    servicesOffered: ["Water", "Fire"],
  },
  checklist: {
    w9Uploaded: false,
    coiUploaded: false,
    licenseUploaded: false,
    profileCompleted: false,
    serviceAreasConfigured: false,
    notificationPreferencesSet: false,
  },
  notifications: {
    jobEmails: true,
    reminders: true,
    compliance: true,
  },
};

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiClient = {
  // Vendor applications (public + admin/RM)
  async submitVendorApplication(payload: Partial<VendorApplication>) {
    await delay();
    const app: VendorApplication = {
      id: `va_${Math.random().toString(36).slice(2, 8)}`,
      companyName: payload.companyName || "Unknown",
      contactName: payload.contactName || "Unknown",
      contactEmail: payload.contactEmail || "",
      contactPhone: payload.contactPhone,
      website: payload.website,
      addressLine1: payload.addressLine1,
      city: payload.city,
      state: payload.state,
      postalCode: payload.postalCode,
      serviceAreas: payload.serviceAreas || [],
      servicesOffered: payload.servicesOffered || [],
      heardAboutUs: payload.heardAboutUs,
      notes: payload.notes,
      status: "NEW",
      reviewerId: null,
      createdAt: new Date().toISOString(),
    };
    vendorApplications.unshift(app);
    return { success: true, applicationId: app.id };
  },

  async listVendorApplications(status?: VendorApplicationStatus | "ALL") {
    await delay();
    if (!status || status === "ALL") return vendorApplications;
    return vendorApplications.filter((app) => app.status === status);
  },

  async getVendorApplication(id: string) {
    await delay();
    const app = vendorApplications.find((a) => a.id === id);
    if (!app) throw new Error("Not found");
    return app;
  },

  async approveVendorApplication(id: string, payload: { primaryEmail: string; primaryName: string; reviewerId?: string }) {
    await delay();
    const app = vendorApplications.find((a) => a.id === id);
    if (app) {
      app.status = "APPROVED";
      app.reviewerId = payload.reviewerId || "admin";
    }
    return { success: true };
  },

  async rejectVendorApplication(id: string, payload: { reason: string; reviewerId?: string }) {
    await delay();
    const app = vendorApplications.find((a) => a.id === id);
    if (app) {
      app.status = "REJECTED";
      app.rejectionReason = payload.reason;
      app.reviewerId = payload.reviewerId || "admin";
    }
    return { success: true };
  },

  // Vendor onboarding wizard state (vendor user)
  async getVendorOnboardingState() {
    await delay();
    return onboardingState;
  },

  async updateVendorOnboardingProfile(profile: Partial<VendorOnboardingState["profile"]>) {
    await delay();
    onboardingState = {
      ...onboardingState,
      profile: { ...onboardingState.profile, ...profile },
      checklist: { ...onboardingState.checklist, profileCompleted: true },
    };
    return onboardingState;
  },

  async updateVendorServicesAndAreas(data: { serviceAreas: string[]; servicesOffered: string[] }) {
    await delay();
    onboardingState = {
      ...onboardingState,
      profile: { ...onboardingState.profile, ...data },
      checklist: { ...onboardingState.checklist, serviceAreasConfigured: true },
    };
    return onboardingState;
  },

  async uploadVendorOnboardingDoc(type: "W9" | "COI" | "LICENSE") {
    await delay();
    onboardingState = {
      ...onboardingState,
      checklist: {
        ...onboardingState.checklist,
        w9Uploaded: onboardingState.checklist.w9Uploaded || type === "W9",
        coiUploaded: onboardingState.checklist.coiUploaded || type === "COI",
        licenseUploaded: onboardingState.checklist.licenseUploaded || type === "LICENSE",
      },
    };
    return onboardingState;
  },

  async updateVendorNotificationPrefs(prefs: Partial<VendorOnboardingState["notifications"]>) {
    await delay();
    onboardingState = {
      ...onboardingState,
      notifications: { ...onboardingState.notifications, ...prefs },
      checklist: { ...onboardingState.checklist, notificationPreferencesSet: true },
    };
    return onboardingState;
  },

  async completeVendorOnboarding() {
    await delay();
    onboardingState = {
      ...onboardingState,
      onboardingCompleted: true,
      checklist: { ...onboardingState.checklist, profileCompleted: true, serviceAreasConfigured: true },
    };
    return onboardingState;
  },
};
