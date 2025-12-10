import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface ProfileInfo {
  name: string;
  email: string;
  title?: string;
  phone?: string;
  role?: string;
}

export interface OnboardingData {
  [key: string]: string;
}

interface OnboardingContextValue {
  profile: ProfileInfo;
  onboarding: OnboardingData;
  sessionActive: boolean;
  setProfile: (profile: ProfileInfo) => void;
  setOnboarding: (data: OnboardingData) => void;
  logout: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

const PROFILE_KEY = "claimsy_profile";
const ONBOARDING_KEY = "claimsy_onboarding";
const defaultProfile: ProfileInfo = { name: "New User", email: "" };

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfileState] = useState<ProfileInfo>(() => {
    const stored = localStorage.getItem(PROFILE_KEY);
    return stored ? JSON.parse(stored) : defaultProfile;
  });
  const [onboarding, setOnboardingState] = useState<OnboardingData>(() => {
    const stored = localStorage.getItem(ONBOARDING_KEY);
    return stored ? JSON.parse(stored) : {};
  });
  const [sessionActive, setSessionActive] = useState<boolean>(false);

  const setProfile = (next: ProfileInfo) => {
    setProfileState(next);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    setSessionActive(true);
  };

  const setOnboarding = (next: OnboardingData) => {
    setOnboardingState(next);
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(next));
  };

  const logout = () => {
    setProfileState(defaultProfile);
    setOnboardingState({});
    setSessionActive(false);
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(ONBOARDING_KEY);
  };

  const value = useMemo(
    () => ({
      profile,
      onboarding,
      sessionActive,
      setProfile,
      setOnboarding,
      logout,
    }),
    [profile, onboarding, sessionActive]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};

export const useOnboardingStore = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboardingStore must be used within OnboardingProvider");
  return ctx;
};
