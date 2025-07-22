// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Step5VerificationConfirmation from "@/components/vendor/onboarding/confirmation";
// import VerificationRejected from "@/components/vendor/onboarding/rejected";
// import axiosInstance from "../../../lib/axiosInstance";
// import useStore from "../../../lib/Zustand";

// export default function Verification() {
//   const { bprofileId } = useStore();
//   const router = useRouter();
//   const [status, setStatus] = useState<"pending" | "approved" | "rejected" | "not_started" | "loading">("loading");
//   const [referenceNumber, setReferenceNumber] = useState("");

//   useEffect(() => {
//     const fetchVerificationStatus = async () => {
//       try {
//         const response = await axiosInstance.get(`/vendor/verification-status?id=${bprofileId}`);
//         setStatus(response.data.status || "not_started");
//         setReferenceNumber(response.data.reference_number || "");
//       } catch (error) {
//         console.error("Error fetching verification status:", error);
//         setStatus("not_started");
//       }
//     };
//     fetchVerificationStatus();
//   }, [bprofileId]);

//   const handleGoHome = () => {
//     router.push("/");
//   };

//   const handleRetry = () => {
//     router.push("/vendor/onboarding");
//   };

//   if (status === "loading") {
//     return (
//       <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
//         <p className="text-lg text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   if (status === "approved") {
//     router.push("/vendor/dashboard");
//     return null;
//   }

//   if (status === "pending") {
//     return <Step5VerificationConfirmation referenceNumber={referenceNumber} onGoHome={handleGoHome} />;
//   }

//   if (status === "rejected") {
//     return <VerificationRejected referenceNumber={referenceNumber} onGoHome={handleGoHome} onRetry={handleRetry} />;
//   }

//   // If status is "not_started", redirect to onboarding
//   router.push("/vendor/onboarding");
//   return null;
// }



"use client";
import { useRouter } from "next/navigation";
import Step5VerificationConfirmation from "@/components/vendor/onboarding/confirmation";
import VerificationRejected from "@/components/vendor/onboarding/rejected";
import useStore from "../../../lib/Zustand";
import { useEffect } from "react";

export default function Verification() {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    console.log("Verification page - User data:", user);
  }, [user]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleRetry = () => {
    router.push("/onboarding");
  };

  // If no user data, redirect to login
  if (!user) {
    console.log("No user data, redirecting to /login");
    router.push("/login");
    return null;
  }

  // If approved, redirect to dashboard
  if (user.is_approved) {
    console.log("User is approved, redirecting to /dashboard");
    router.push("/dashboard");
    return null;
  }

  // If user has no reference number, redirect to onboarding
  if (!user.ref_number) {
    console.log("No ref_number, redirecting to /onboarding");
    router.push("/onboarding");
    return null;
  }

  // If not approved but has reference number, show pending status
  console.log("Showing Step5VerificationConfirmation with ref_number:", user.ref_number);
  return (
    <Step5VerificationConfirmation
      referenceNumber={user.ref_number}
      onGoHome={handleGoHome}
    />
  );
}