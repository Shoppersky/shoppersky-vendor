// 'use client';
 
// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import useStore from '@/lib/Zustand';
// import { refreshTokenIfNeeded } from '@/lib/auth';
// import { LoadingSpinner } from '@/components/LoadingSpinner';


 
// interface AuthGuardProps {
//   children: React.ReactNode;
// }
 
// const AuthGuard = ({ children }: AuthGuardProps) => {
//   const { isAuthenticated, checkAuth } = useStore();
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isLoading, setIsLoading] = useState(true);
//   const [isInitialized, setIsInitialized] = useState(false);
 
//   // Define public routes that don't require authentication
//   const publicRoutes = [
//     '/',
//     '/forgotpassword',
//     '/resetpassword',
//     '/changepassword',
//     '/signup'
  
//   ];
 
//   const isPublicRoute = publicRoutes.includes(pathname) ||
//                        pathname.startsWith('/resetpassword') ||
//                        pathname.startsWith('/changepassword') ||
//                        pathname.startsWith('/signup') ||
//                        pathname.startsWith('/forgotpassword');
 
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         // Check authentication status
//         checkAuth();
       
//         // Try to refresh token if needed
//         if (isAuthenticated) {
//           await refreshTokenIfNeeded();
//         }
       
//         setIsInitialized(true);
//       } catch (error) {
//         console.error('Auth initialization error:', error);
//         setIsInitialized(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };
 
//     initializeAuth();
//   }, [checkAuth, isAuthenticated]);
 
//   useEffect(() => {
//     if (!isInitialized || isLoading) return;
 
//     if (!isAuthenticated && !isPublicRoute) {
//       // User is not authenticated and trying to access protected route
//       console.log('Redirecting to login - not authenticated');
//       router.push('/');
//     } else if (isAuthenticated && (pathname === '/')) {
//       // User is authenticated and on public route, redirect to dashboard
//       console.log('Redirecting to dashboard - already authenticated');
//       router.push('/home');
//     }
//   }, [isAuthenticated, isPublicRoute, pathname, router, isInitialized, isLoading]);
 
//   // Show loading spinner while checking authentication
//   if (isLoading || !isInitialized) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
//         <div className="text-center">
//           <LoadingSpinner />
//           <p className="mt-4 text-white text-lg">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }
 
//   // For public routes, always render children
//   if (isPublicRoute) {
//     return <>{children}</>;
//   }
 
//   // For protected routes, only render if authenticated
//   if (isAuthenticated) {
//     return <>{children}</>;
//   }
 
//   // This should not be reached due to the redirect effect above,
//   // but just in case, show loading
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
//       <div className="text-center">
//         <LoadingSpinner />
//         <p className="mt-4 text-white text-lg">Redirecting to login...</p>
//       </div>
//     </div>
//   );
// };
 
// export default AuthGuard;



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
