"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useStore from "@/lib/Zustand";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, user, checkAuth } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/signin",
    "/signup",
    "/forgotpassword",
    "/resetpassword",
    "/emailconfirmation",
    "/emailresend",
    "/changepassword",
  ];

  // Allowed routes based on onboarding status
  const statusAllowedRoutes: Record<string, string[]> = {
    approved: [
      "/home",
      "/categories",
      "/employees",
      "/customers",
      "/products",
      "/profile",
      "/enquiries",
      "/onboarding",
      "/online-store", 
      "/add-product",
      "/orders",
      
      ...publicRoutes,
    ],
    not_started: ["/onboarding", ...publicRoutes],
    under_review: ["/review", ...publicRoutes],
    submitted: ["/verification", ...publicRoutes],
    rejected: ["/rejected", ...publicRoutes],
  };

  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, [checkAuth]);

  useEffect(() => {
    if (isLoading) return;

    // If not authenticated and not on a public route → go to login
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/");
      return;
    }

    // If authenticated, enforce allowed routes
    if (isAuthenticated && user) {
      const allowedRoutes =
        statusAllowedRoutes[user?.onboarding_status] || publicRoutes;

      const isAllowed = allowedRoutes.some((route) => {
        if (route === pathname) return true;
        if (route === "/online-store" && pathname.startsWith("/online-store/"))
          return true; 
        if (route === "/enquiries" && pathname.startsWith("/enquiries/"))
          return true; 
        if (route === "/products" && pathname.startsWith("/products/"))
          return true;

        if (route === "/customers" && pathname.startsWith("/customers/"))
          return true; 
         if (route === "/orders" && pathname.startsWith("/orders/"))
          return true; 
        return false;
      });

      if (!isAllowed) {
        // Redirect based on onboarding status
        switch (user?.onboarding_status) {
          case "approved":
            router.push("/home");
            break;
          case "not_started":
            router.push("/onboarding");
            break;
          case "under_review":
            router.push(
              `/review?ref=${encodeURIComponent(user?.ref_number || "N/A")}`
            );
            break;
          case "submitted":
            router.push(
              `/verification?ref=${encodeURIComponent(
                user?.ref_number || "N/A"
              )}`
            );
            break;
          case "rejected":
            router.push(
              `/rejected?ref=${encodeURIComponent(
                user?.ref_number || "N/A"
              )}&comment=${encodeURIComponent(
                user?.reviewer_comment || ""
              )}`
            );
            break;
          default:
            router.push("/home");
            break;
        }
      }
    }
  }, [isLoading, isAuthenticated, user, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
