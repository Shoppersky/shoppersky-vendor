
"use client";
import { useState } from "react";
import Step1StoreSetup from "@/components/vendor/onboarding/storesetup";
import Step2Goals from "@/components/vendor/onboarding/goals";
import Step3AbnVerification from "@/components/vendor/onboarding/verification";
import Step4PaymentPreferences from "@/components/vendor/onboarding/payment";
import Step5VerificationConfirmation from "@/components/vendor/onboarding/confirmation";
import axiosInstance from "@/lib/axiosInstance";
import useStore from "../../../lib/Zustand";

export default function VendorOnboarding() {
  const { bprofileId } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [storeDetails, setStoreDetails] = useState({
    storeName: "",
    storeUrl: "",
    industry:"",
    location: "",
  });
  const [generalQuestions, setGeneralQuestions] = useState({
    mainGoals: [] as string[],
  });
  type VerificationStatus = "idle" | "loading" | "success" | "error";
  type AbnDetails = {
    abn: string;
    verifiedBusinessName: string;
    verifiedAddress: string;
    verifiedStatus: string;
    verifiedType: string;
    verificationStatus: VerificationStatus;
    verificationMessage: string;
  };
  const [abnDetails, setAbnDetails] = useState<AbnDetails>({
    abn: "",
    verifiedBusinessName: "",
    verifiedAddress: "",
    verificationStatus: "idle",
    verifiedStatus: "",
    verifiedType: "",
    verificationMessage: "",
  });
  const [paymentPreferences, setPaymentPreferences] = useState({
    paymentType: [] as string[],
  });
  const [referenceNumber, setReferenceNumber] = useState("");

  // Function to submit onboarding data to the backend
  const submitOnboarding = async () => {
    try {
      const paymentPreferenceMap: { [key: string]: string } = {
        listing: "Payments for Product Listing",
        orders: "Payments for Orders",
      };
      const payload = {
        profile_ref_id: bprofileId,
        purpose: generalQuestions.mainGoals,
        abn_id: abnDetails.abn,
        payment_preference: paymentPreferences.paymentType.map(
          (key) => paymentPreferenceMap[key]
        ),
        store_name: storeDetails.storeName,
        store_url: `https://shoppersky.com.au/${storeDetails.storeUrl}`,
        industry: storeDetails.industry,
      };

      const response = await axiosInstance.post(
        `/vendor/onboarding?id=${abnDetails.abn}`,
        payload
      );
      return {
        success: true,
        data: {
          ...response.data,
          reference_number: response.data.reference_number || `ONB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred during onboarding.",
      };
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1StoreSetup
            storeDetails={storeDetails}
            setStoreDetails={setStoreDetails}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Step2Goals
            generalQuestions={generalQuestions}
            setGeneralQuestions={setGeneralQuestions}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <Step3AbnVerification
            abnDetails={abnDetails}
            setAbnDetails={setAbnDetails}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <Step4PaymentPreferences
            paymentPreferences={paymentPreferences}
            setPaymentPreferences={setPaymentPreferences}
            onNext={(refNum: string) => {
              setReferenceNumber(refNum);
              setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
            submitOnboarding={submitOnboarding}
          />
        );
      case 5:
        return (
          <Step5VerificationConfirmation
            referenceNumber={referenceNumber}
            onGoHome={() => alert("Redirecting to homepage or login...")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-5 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 bg-purple-200 rounded-full opacity-5 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-emerald-200 rounded-full opacity-5 animate-pulse delay-500"></div>
      <div className="relative z-10 w-full h-full">{renderStep()}</div>
    </div>
  );
}