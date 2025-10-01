"use client";
import Image from "next/image";
import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Step4Props {
  paymentPreferences: {
    paymentType: string[];
  };
  setPaymentPreferences: React.Dispatch<
    React.SetStateAction<{
      paymentType: string[];
    }>
  >;
  onNext: (referenceNumber: string) => void;
  onBack: () => void;
  submitOnboarding: () => Promise<{
    success: boolean;
    data?: {
      message: string;
      reference_number: string;
      profile_ref_id: string;
      store_url: string;
    };
    message?: string;
  }>;
}

export default function Step4PaymentPreferences({
  paymentPreferences,
  setPaymentPreferences,
  onNext,
  onBack,
  submitOnboarding,
}: Step4Props) {
  const options = [
    {
      value: "listing",
      title: "Payments for Product Listing",
      description: "Customers pay directly for each product listed.",
    },
    {
      value: "orders",
      title: "Payments for Orders",
      description: "Customers pay for completed orders, including shipping.",
    },
  ];

  const handleSelect = (value: string) => {
    setPaymentPreferences((prev) => {
      const isSelected = prev.paymentType.includes(value);
      return {
        paymentType: isSelected
          ? prev.paymentType.filter((v) => v !== value) // remove if already selected
          : [...prev.paymentType, value], // add if not
      };
    });
  };

  const handleSubmit = async () => {
    if (paymentPreferences.paymentType.length > 0) {
      try {
        const result = await submitOnboarding();
        if (result.success && result.data) {
          onNext(result.data.reference_number);
        } else {
          alert(result.message || "An error occurred during submission.");
        }
      } catch (error) {
        alert("Something went wrong. Please try again.");
      }
    } else {
      alert("Please select at least one payment preference.");
    }
  };

    const router = useRouter();
  
    const handleLogout = () => {
      localStorage.clear();
      console.log("User logged out!");
  
      router.push("/signin");
    };
    
  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2">
      {/* Image Side */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-cyan-50 to-cyan-50 h-full">
        <div className="text-center space-y-6 max-w-md">
          <Image
            src="/images/4.jpg"
            alt="Payment preferences illustration"
            width={420}
            height={420}
            className="mx-auto rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Streamline Your Transactions
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the payment model that best suits your business operations
            and customer interactions.
          </p>
        </div>
      </div>
      {/* Form Side */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative h-full">
         <Button
                  onClick={handleLogout}
                  className="absolute top-4 right-4 text-sm bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1.5 rounded-full shadow transition-all duration-200"
                >
                  Logout
                </Button>
        <div className="w-full max-w-2xl bg-white/80 p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4 shadow-lg mx-auto">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Payment Preferences
            </h1>
            <p className="text-lg text-gray-600 max-w-sm mx-auto">
              How would you like to handle payments on our platform?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((option) => (
              <Button
                key={option.value}
                variant={
                  paymentPreferences.paymentType.includes(option.value)
                    ? "default"
                    : "outline"
                }
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "min-h-[160px] p-6 text-left flex flex-col items-start justify-start whitespace-normal rounded-xl transition-all duration-200",
                  paymentPreferences.paymentType.includes(option.value)
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                )}
              >
                <span
                  className={cn(
                    "font-semibold text-lg",
                    paymentPreferences.paymentType.includes(option.value)
                      ? "text-white"
                      : "text-gray-900"
                  )}
                >
                  {option.title}
                </span>
                <span
                  className={cn(
                    "text-base mt-2",
                    paymentPreferences.paymentType.includes(option.value)
                      ? "text-white/90"
                      : "text-muted-foreground"
                  )}
                >
                  {option.description}
                </span>
              </Button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="h-12 border-2 border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Complete Onboarding
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}