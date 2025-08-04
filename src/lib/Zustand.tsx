"use client";

import { create } from "zustand";
import jwt from "jsonwebtoken";

interface UserData {
  is_approved: boolean;
  ref_number?: string;
  industry?: string;
  onboarding_status?: string;
  vendor_store_slug?:string;
  [key: string]: any;
}

interface DecodedToken {
  userId: string;
  exp: number;
}

interface AuthState {
  userId: string | null;
  user: UserData | null;
  exp: number | null;
  isAuthenticated: boolean;
  login: (
    authResponse: { access_token: string; user: any },
    rememberMe?: boolean
  ) => void;
  logout: () => void;
  checkAuth: () => void;
  switchAccount: (token: string, user?: any) => void;
}

// Utility: Normalize user object with defaults
const normalizeUser = (user: any): UserData => ({
  is_approved: Boolean(user?.is_approved),
  ref_number: user?.ref_number || "",
  industry: user?.industry || "",
  onboarding_status: user?.onboarding_status || "",
  vendor_store_slug: user?.vendor_store_slug || "",
  ...user,
});

const getTabId = (): string => {
  if (typeof window === "undefined") return "";
  let tabId = sessionStorage.getItem("tabId");

  if (!tabId) {
    tabId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("tabId", tabId);
  }

  return tabId;
};

const getActiveAccounts = (): Record<string, any> => {
  if (typeof window === "undefined") return {};
  const accounts = localStorage.getItem("activeAccounts");
  return accounts ? JSON.parse(accounts) : {};
};

const setActiveAccount = (tabId: string, userInfo: any) => {
  if (typeof window === "undefined") return;
  const accounts = getActiveAccounts();

  accounts[tabId] = {
    ...userInfo,
    lastActive: Date.now(),
  };

  localStorage.setItem("activeAccounts", JSON.stringify(accounts));
};

const removeActiveAccount = (tabId: string) => {
  if (typeof window === "undefined") return;
  const accounts = getActiveAccounts();
  delete accounts[tabId];
  localStorage.setItem("activeAccounts", JSON.stringify(accounts));
};

const useStore = create<AuthState>((set, get) => ({
  userId: null,
  user: null,
  exp: null,
  isAuthenticated: false,

  login: (
    authResponse: { access_token: string; user: any },
    rememberMe: boolean = true
  ) => {
    const { access_token: token, user } = authResponse;

    if (!token) {
      console.error("No token received");
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken | null;

      if (decoded?.userId) {
        const tabId = getTabId();
        const userData: UserData = normalizeUser(user);

        set({
          userId: decoded.userId,
          exp: decoded.exp,
          user: userData,
          isAuthenticated: true,
        });

        const userInfo = {
          userId: decoded.userId,
          exp: decoded.exp,
          token,
          user: userData,
        };

        if (rememberMe) {
          localStorage.setItem(`auth_${tabId}`, JSON.stringify(userInfo));
        }

        sessionStorage.setItem("currentAuth", JSON.stringify(userInfo));
        setActiveAccount(tabId, userInfo);
      } else {
        console.error("Invalid token format", decoded);
      }
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  },

  switchAccount: (token: string, user?: any) => {
    const tabId = getTabId();
    sessionStorage.removeItem("currentAuth");
    removeActiveAccount(tabId);

    let userData: UserData;

    if (user) {
      userData = normalizeUser(user);
    } else {
      const accounts = getActiveAccounts();
      const account = Object.values(accounts).find(
        (acc: any) => acc.token === token
      );

      userData = account?.user ? normalizeUser(account.user) : {
        is_approved: false,
        ref_number: "",
        industry: "",
        onboarding_status: "",
        vendor_store_slug: "",
      };
    }

    get().login({ access_token: token, user: userData }, true);
  },

  logout: () => {
    const tabId = getTabId();
    set({
      userId: null,
      exp: null,
      user: null,
      isAuthenticated: false,
    });

    localStorage.removeItem(`auth_${tabId}`);
    sessionStorage.removeItem("currentAuth");
    removeActiveAccount(tabId);
  },

  checkAuth: () => {
    if (typeof window === "undefined") return;

    const tabId = getTabId();
    let authData = sessionStorage.getItem("currentAuth");

    if (!authData) {
      authData = localStorage.getItem(`auth_${tabId}`);
      if (authData) {
        sessionStorage.setItem("currentAuth", authData);
      }
    }

    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        const { token, userId, exp, user } = parsed;

        if (exp && exp * 1000 < Date.now()) {
          console.log("Token expired, logging out");
          get().logout();
          return;
        }

        const decoded = jwt.decode(token) as DecodedToken | null;

        if (decoded && decoded.userId === userId) {
          const userData: UserData = normalizeUser(user);

          set({
            userId,
            exp,
            user: userData,
            isAuthenticated: true,
          });

          setActiveAccount(tabId, { ...parsed, user: userData });
        } else {
          console.error("Token validation failed");
          get().logout();
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        get().logout();
      }
    }
  },
}));

if (typeof window !== "undefined") {
  const cleanupInactiveTabs = () => {
    const accounts = getActiveAccounts();
    const cutoffTime = Date.now() - 24 * 60 * 60 * 1000;

    Object.keys(accounts).forEach((tabId) => {
      if (accounts[tabId].lastActive < cutoffTime) {
        localStorage.removeItem(`auth_${tabId}`);
        delete accounts[tabId];
      }
    });

    localStorage.setItem("activeAccounts", JSON.stringify(accounts));
  };

  cleanupInactiveTabs();

  window.addEventListener("beforeunload", () => {
    const tabId = getTabId();
    removeActiveAccount(tabId);
  });
}

useStore.getState().checkAuth();

export default useStore;

export const getActiveAccountsList = () => {
  const accounts = getActiveAccounts();

  return Object.entries(accounts).map(([tabId, info]: [string, any]) => ({
    tabId,
    userId: info.userId,
    lastActive: info.lastActive,
  }));
};

export const switchToAccount = (targetUserId: string) => {
  const accounts = getActiveAccounts();

  const targetAccount = Object.values(accounts).find(
    (acc: any) => acc.userId === targetUserId
  );

  if (targetAccount) {
    useStore.getState().switchAccount(targetAccount.token, targetAccount.user);
  }
};
