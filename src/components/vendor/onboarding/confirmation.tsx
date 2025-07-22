
"use client";
import Image from "next/image";
import { Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step5Props {
  referenceNumber: string;
  onGoHome: () => void;
}

export default function Step5VerificationConfirmation({
  referenceNumber,
  onGoHome,
}: Step5Props) {
  return (
    <div className="w-full h-full lg:grid lg:grid-cols-2">
      {/* Image Side */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-emerald-50 to-green-50 h-full">
        <div className="text-center space-y-6 max-w-md">
          <Image
            src="/images/5.jpg"
            alt="Onboarding completion illustration"
            width={400}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to the Platform!
          </h2>
          <p className="text-gray-600 text-lg">
            Your vendor account is ready to go. Start exploring and setting up your business now!
          </p>
        </div>
      </div>
      {/* Confirmation Side */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative h-full">
        <div className="w-full max-w-md bg-white/80 p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-4 shadow-lg mx-auto">
              <Hourglass className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Verification in Process!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for completing your onboarding. Your application is now under review.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
              <p className="text-sm text-gray-500">Your Reference Number:</p>
              <p className="text-3xl font-extrabold text-gray-800 tracking-wide">
                {referenceNumber}
              </p>
            </div>
          </div>

          <div className="text-left space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">What's Next?</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Our team is now reviewing your business details and ABN verification.
              </li>
              <li>
                You will receive an email notification within 2-3 business days
                regarding the status of your application.
              </li>
              <li>
                Once approved, you'll gain full access to your vendor dashboard to
                start listing products!
              </li>
            </ul>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              onClick={onGoHome}
              className="h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}