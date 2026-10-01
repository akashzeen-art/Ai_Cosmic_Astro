import React, { createContext, useCallback, useContext, useState } from "react";
import { STORAGE_KEYS } from "@/lib/config";
import { type HutchSession } from "@/lib/hutchApi";

export type { HutchSession };

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: HutchSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isActive: boolean;
  login: (msisdn: string) => Promise<LoginResult>;
  logout: () => void;
  savePendingMsisdn: (msisdn: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

function loadSession(): HutchSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HUTCH_SESSION);
    return raw ? (JSON.parse(raw) as HutchSession) : null;
  } catch {
    return null;
  }
}

function persistSession(session: HutchSession | null): void {
  if (session) {
    localStorage.setItem(STORAGE_KEYS.HUTCH_SESSION, JSON.stringify(session));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `user_${session.msisdn}`);
  } else {
    localStorage.removeItem(STORAGE_KEYS.HUTCH_SESSION);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.SUBSCRIPTION);
  }
}

export function savePendingMsisdn(_msisdn: string): void {}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<HutchSession | null>(() => loadSession());
  const [isLoading] = useState(false);

  const login = useCallback(async (msisdn: string): Promise<LoginResult> => {
    const digits = msisdn.replace(/\D/g, "");
    if (!digits) return { success: false, error: "Enter a valid mobile number." };

    const session: HutchSession = {
      msisdn: digits,
      actDate: new Date().toISOString(),
      renewDate: "",
      pricePoint: "",
      validity: "",
      unsubUrl: "",
    };
    setUser(session);
    persistSession(session);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persistSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isActive: !!user,
        login,
        logout,
        savePendingMsisdn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
