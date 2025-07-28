"use client";

import { create } from "zustand";
import jwt from "jsonwebtoken";
interface UserData {
  is_approved: boolean;
  ref_number?: string;
  [key: string]: any;
}

interface DecodedToken {
  userId: string;
  bprofileId: string;
  exp: number;
}

interface AuthState {
  userId: string | null;
  bprofileId: string | null;
  user: UserData | null;
  exp: number | null;
  isAuthenticated: boolean;
  login: (token: string, user: UserData, rememberMe?: boolean) => void;
  logout: () => void;
  checkAuth: () => void;
  switchAccount: (token: string, user?: UserData) => void;
}

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
  bprofileId: null,
  user: null,
  exp: null,
  isAuthenticated: false,

  login: (token: string, user: UserData, rememberMe: boolean = true) => {
    if (!token) {
      console.error("No token received");
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken | null;

      if (decoded?.userId && decoded?.bprofileId) {
        const tabId = getTabId();

        const userData: UserData = {
          is_approved: user.is_approved,
          ref_number: user.ref_number || "",
        };

        set({
          userId: decoded.userId,
          bprofileId: decoded.bprofileId,
          exp: decoded.exp,
          user: userData,
          isAuthenticated: true,
        });

        const userInfo = {
          userId: decoded.userId,
          bprofileId: decoded.bprofileId,
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

  switchAccount: (token: string, user?: UserData) => {
    const tabId = getTabId();
    sessionStorage.removeItem("currentAuth");
    removeActiveAccount(tabId);

    // If user data is not provided, try to retrieve it from activeAccounts
    let userData: UserData = user || { is_approved: false, ref_number: "" };
    if (!user) {
      const accounts = getActiveAccounts();
      const account = Object.values(accounts).find(
        (acc: any) => acc.token === token
      );
      if (account && account.user) {
        userData = {
          is_approved: account.user.is_approved,
          ref_number: account.user.ref_number || "",
        };
      }
    }

    get().login(token, userData, true);
  },

  logout: () => {
    const tabId = getTabId();
    set({
      userId: null,
      bprofileId: null,
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
        const { token, userId, bprofileId, exp, user } = parsed;

        if (exp && exp * 1000 < Date.now()) {
          console.log("Token expired, logging out");
          get().logout();
          return;
        }

        const decoded = jwt.decode(token) as DecodedToken | null;

        if (decoded && decoded.userId === userId && decoded.bprofileId === bprofileId) {
          set({
            userId,
            bprofileId,
            exp,
            user,
            isAuthenticated: true,
          });

          setActiveAccount(tabId, parsed);
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
    bprofileId: info.bprofileId,
    lastActive: info.lastActive,
  }));
};

export const switchToAccount = (targetUserId: string) => {
  const accounts = getActiveAccounts();

  const targetAccount = Object.values(accounts).find(
    (acc: any) => acc.userId === targetUserId
  );

  if (targetAccount) {
    useStore.getState().switchAccount((targetAccount as any).token, (targetAccount as any).user);
  }
};


 
// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import jwt from "jsonwebtoken";

// // 🎨 Theme type
// interface ThemeColors {
//   topBarColor: string;
//   sidebarColor: string;
//   sidebarBackground: string;
//   primary: string;
//   primaryForeground: string;
//   secondary: string;
//   secondaryForeground: string;
// }

// // 🔐 User data type
// interface UserData {
//   is_approved: boolean;
//   ref_number?: string;
//   [key: string]: any;
// }

// // 🔐 Decoded token type
// interface DecodedToken {
//   userId: string;
//   bprofileId: string;
//   rid?: string; // Role ID, optional to align with both codes
//   exp: number;
// }

// // 🔐 Auth state
// interface AuthState {
//   userId: string | null;
//   bprofileId: string | null;
//   role: string | null;
//   exp: number | null;
//   user: UserData | null;
//   isAuthenticated: boolean;

//   login: (accessToken: string, refreshToken: string,  user: UserData, rememberMe?: boolean) => void;
//   logout: () => void;
//   checkAuth: () => Promise<void>;
//   refreshTokenIfNeeded: () => Promise<boolean>;
//   switchAccount: (accessToken: string, refreshToken: string,  user?: UserData) => void;
// }

// // 🔁 Combined store
// interface StoreState extends AuthState {
//   themeColors: ThemeColors;
//   updateThemeColor: (key: keyof ThemeColors, value: string) => void;
//   resetTheme: () => void;
// }

// // 🛠 Utility functions
// const getTabId = (): string => {
//   if (typeof window === "undefined") return "";
//   let tabId = sessionStorage.getItem("tabId");
//   if (!tabId) {
//     tabId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     sessionStorage.setItem("tabId", tabId);
//   }
//   return tabId;
// };

// const getActiveAccounts = (): Record<string, any> => {
//   if (typeof window === "undefined") return {};
//   const accounts = localStorage.getItem("activeAccounts");
//   return accounts ? JSON.parse(accounts) : {};
// };

// const setActiveAccount = (tabId: string, userInfo: any) => {
//   if (typeof window === "undefined") return;
//   const accounts = getActiveAccounts();
//   accounts[tabId] = { ...userInfo, lastActive: Date.now() };
//   localStorage.setItem("activeAccounts", JSON.stringify(accounts));
// };

// const removeActiveAccount = (tabId: string) => {
//   if (typeof window === "undefined") return;
//   const accounts = getActiveAccounts();
//   delete accounts[tabId];
//   localStorage.setItem("activeAccounts", JSON.stringify(accounts));
// };

// const useStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       // ➤ Auth state
//       userId: null,
//       bprofileId: null,
//       role: null,
//       exp: null,
//       user: null,
//       isAuthenticated: false,


//       login: (accessToken, refreshToken,  user, rememberMe = true) => {
//         try {
//           const decoded = jwt.decode(accessToken) as DecodedToken | null;
//           if (!decoded?.userId || !decoded?.bprofileId) {
//             console.error("Invalid token format:", decoded);
//             return;
//           }

//           const tabId = getTabId();
//           const userData: UserData = {
//             is_approved: user.is_approved,
//             ref_number: user.ref_number || "",
//           };

//           set({
//             userId: decoded.userId,
//             bprofileId: decoded.bprofileId,
//             role: decoded.rid || null,
//             exp: decoded.exp,
//             user: userData,
//             isAuthenticated: true,
 
//           });

//           const userInfo = {
//             userId: decoded.userId,
//             bprofileId: decoded.bprofileId,
//             role: decoded.rid || null,
//             exp: decoded.exp,
//             accessToken,
//             refreshToken,
  
//             user: userData,
//           };

//           sessionStorage.setItem("currentAuth", JSON.stringify(userInfo));
//           sessionStorage.setItem("token", accessToken);
//           sessionStorage.setItem("refreshToken", refreshToken);

//           if (rememberMe) {
//             localStorage.setItem(`auth_${tabId}`, JSON.stringify(userInfo));
//           }
//           setActiveAccount(tabId, userInfo);
//         } catch (error) {
//           console.error("Token decoding error:", error);
//         }
//       },

//       logout: () => {
//         const tabId = getTabId();
//         set({
//           userId: null,
//           bprofileId: null,
//           role: null,
//           exp: null,
//           user: null,
//           isAuthenticated: false,

//         });
//         sessionStorage.removeItem("currentAuth");
//         sessionStorage.removeItem("token");
//         sessionStorage.removeItem("refreshToken");

//         localStorage.removeItem(`auth_${tabId}`);
//         removeActiveAccount(tabId);
//       },

//       checkAuth: async () => {
//         if (typeof window === "undefined") return;

//         console.log("🔍 Checking authentication...");
//         const tabId = getTabId();
//         let authData = sessionStorage.getItem("currentAuth");

//         if (!authData) {
//           authData = localStorage.getItem(`auth_${tabId}`);
//           if (authData) {
//             sessionStorage.setItem("currentAuth", authData);
//           }
//         }

//         if (authData) {
//           try {
//             const parsed = JSON.parse(authData);
//             const { accessToken, userId, bprofileId, role, exp, user, refreshToken, sessionId } = parsed;

//             if (exp && exp * 1000 < Date.now()) {
//               console.log("⏰ Token expired, attempting to refresh...");
//               const refreshSuccess = await get().refreshTokenIfNeeded();
//               if (!refreshSuccess) {
//                 console.log("❌ Refresh failed, logging out...");
//                 get().logout();
//                 return;
//               }
//               return; // Refresh updates the state
//             }

//             const decoded = jwt.decode(accessToken) as DecodedToken | null;
//             if (decoded && decoded.userId === userId && decoded.bprofileId === bprofileId) {
//               console.log("✅ Token is valid, setting auth state");
//               set({
//                 userId,
//                 bprofileId,
//                 role,
//                 exp,
//                 user,
//                 isAuthenticated: true,
            
//               });
//               setActiveAccount(tabId, parsed);
//             } else {
//               console.error("❌ Token validation failed");
//               get().logout();
//             }
//           } catch (error) {
//             console.error("❌ Error parsing auth data:", error);
//             get().logout();
//           }
//         } else {
//           console.log("❌ No auth data found, checking refresh token...");
//           const refreshSuccess = await get().refreshTokenIfNeeded();
//           if (!refreshSuccess) {
//             console.log("❌ No valid tokens, clearing session...");
//             get().logout();
//           }
//         }
//       },

//       refreshTokenIfNeeded: async () => {
//         if (typeof window === "undefined") return false;

//         const refreshToken = sessionStorage.getItem("refreshToken");
//         if (!refreshToken) {
//           console.log("❌ No refresh token found");
//           return false;
//         }

//         const accessToken = sessionStorage.getItem("token");
//         if (accessToken) {
//           const decoded = jwt.decode(accessToken) as DecodedToken | null;
//           if (decoded?.exp) {
//             const currentTime = Date.now() / 1000;
//             if (decoded.exp - currentTime >= 300) {
//               console.log("✅ Token is still valid, no refresh needed");
//               return true;
//             }
//           }
//         }

//         try {
//           console.log("🔄 Attempting to refresh access token...");
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/token/refresh`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "api-key": process.env.NEXT_PUBLIC_API_GATEWAY_KEY || "",
//             },
//             body: JSON.stringify({ refresh_token: refreshToken }),
//           });

//           if (response.ok) {
//             const data = await response.json();
//             if (data.data) {
//               console.log("✅ Access token refreshed successfully");
//               const { access_token, refresh_token: newRefreshToken, session_id } = data.data;
//               const decoded = jwt.decode(access_token) as DecodedToken | null;

//               if (decoded?.userId && decoded?.bprofileId) {
//                 const tabId = getTabId();
//                 const userData: UserData = {
//                   is_approved: false, // Default, as user data may not be provided
//                   ref_number: "",
//                 };

//                 const userInfo = {
//                   userId: decoded.userId,
//                   bprofileId: decoded.bprofileId,
//                   role: decoded.rid || null,
//                   exp: decoded.exp,
//                   accessToken: access_token,
//                   refreshToken: newRefreshToken,

//                   user: userData,
//                 };

//                 set({
//                   userId: decoded.userId,
//                   bprofileId: decoded.bprofileId,
//                   role: decoded.rid || null,
//                   exp: decoded.exp,
//                   user: userData,
//                   isAuthenticated: true,

//                 });

//                 sessionStorage.setItem("currentAuth", JSON.stringify(userInfo));
//                 sessionStorage.setItem("token", access_token);
//                 sessionStorage.setItem("refreshToken", newRefreshToken);

//                 localStorage.setItem(`auth_${tabId}`, JSON.stringify(userInfo)); // Persist for rememberMe
//                 setActiveAccount(tabId, userInfo);
//                 return true;
//               }
//             }
//             console.log("❌ Refresh token response not successful:", data);
//             return false;
//           }
//           console.log("❌ Refresh token request failed:", response.status);
//           return false;
//         } catch (error) {
//           console.error("❌ Error refreshing token:", error);
//           return false;
//         }
//       },

//       switchAccount: (accessToken, refreshToken,  user) => {
//         const tabId = getTabId();
//         sessionStorage.removeItem("currentAuth");
//         sessionStorage.removeItem("token");
//         sessionStorage.removeItem("refreshToken");

//         removeActiveAccount(tabId);

//         let userData: UserData = user || { is_approved: false, ref_number: "" };
//         if (!user) {
//           const accounts = getActiveAccounts();
//           const account = Object.values(accounts).find((acc: any) => acc.accessToken === accessToken);
//           if (account && account.user) {
//             userData = {
//               is_approved: account.user.is_approved,
//               ref_number: account.user.ref_number || "",
//             };
//           }
//         }

//         get().login(accessToken, refreshToken, userData, true);
//       },

//       // 🎨 Theme state
//       themeColors: {
//         topBarColor: "",
//         sidebarColor: "",
//         sidebarBackground: "",
//         primary: "240 5.9% 10%",
//         primaryForeground: "0 0% 98%",
//         secondary: "240 4.8% 95.9%",
//         secondaryForeground: "240 5.9% 10%",
//       },

//       updateThemeColor: (key, value) =>
//         set((state) => ({
//           themeColors: { ...state.themeColors, [key]: value },
//         })),

//       resetTheme: () =>
//         set(() => ({
//           themeColors: {
//             topBarColor: "",
//             sidebarColor: "",
//             sidebarBackground: "",
//             primary: "240 5.9% 10%",
//             primaryForeground: "0 0% 98%",
//             secondary: "240 4.8% 95.9%",
//             secondaryForeground: "240 5.9% 10%",
//           },
//         })),
//     }),
//     {
//       name: "theme-store",
//       partialize: (state) => ({ themeColors: state.themeColors }),
//     }
//   )
// );

// // 🧹 Cleanup inactive tabs
// if (typeof window !== "undefined") {
//   const cleanupInactiveTabs = () => {
//     const accounts = getActiveAccounts();
//     const cutoffTime = Date.now() - 24 * 60 * 60 * 1000;

//     Object.keys(accounts).forEach((tabId) => {
//       if (accounts[tabId].lastActive < cutoffTime) {
//         localStorage.removeItem(`auth_${tabId}`);
//         delete accounts[tabId];
//       }
//     });

//     localStorage.setItem("activeAccounts", JSON.stringify(accounts));
//   };

//   cleanupInactiveTabs();

//   window.addEventListener("beforeunload", () => {
//     const tabId = getTabId();
//     removeActiveAccount(tabId);
//   });

//   useStore.getState().checkAuth();
// }

// // 📋 Export utility functions
// export const getActiveAccountsList = () => {
//   const accounts = getActiveAccounts();
//   return Object.entries(accounts).map(([tabId, info]: [string, any]) => ({
//     tabId,
//     userId: info.userId,
//     bprofileId: info.bprofileId,
//     role: info.role,
//     lastActive: info.lastActive,
//   }));
// };

// export const switchToAccount = (targetUserId: string) => {
//   const accounts = getActiveAccounts();
//   const targetAccount = Object.values(accounts).find((acc: any) => acc.userId === targetUserId);
//   if (targetAccount) {
//     useStore.getState().switchAccount(
//       targetAccount.accessToken,
//       targetAccount.refreshToken,
//       targetAccount.sessionId,
     
//     );
//   }
// };

// export default useStore;