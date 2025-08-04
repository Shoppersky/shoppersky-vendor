"use client";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function VerificationPending() {
  const searchParams = useSearchParams();
  const referenceNumber = searchParams.get("ref") || "N/A";
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    console.log("User logged out!");
    router.push("/");
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      {/* Image Side */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-yellow-50 to-amber-50 h-full">
        <div className="text-center space-y-6 max-w-md">
          <Image
            src="/images/pending.jpg"
            alt="Verification pending illustration"
            width={400}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Verification In Progress
          </h2>
          <p className="text-gray-600 text-lg">
            Your information has been received and is currently under review.
            You'll be notified once the process is complete.
          </p>
        </div>
      </div>

      {/* Pending Side */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative h-full">
        <Button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-sm bg-amber-500 hover:bg-amber-600 text-white font-medium px-3 py-1.5 rounded-full shadow transition-all duration-200"
        >
          Logout
        </Button>
        <div className="w-full max-w-md bg-white/80 p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mb-4 shadow-lg mx-auto">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Verification Pending
            </h1>
            <p className="text-lg text-gray-600">
              We're reviewing your application. This may take some time, and
              we'll notify you once a decision is made.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
              <p className="text-sm text-gray-500">Your Reference Number:</p>
              <p className="text-3xl font-extrabold text-gray-800 tracking-wide">
                {referenceNumber}
              </p>
            </div>
          </div>

          <div className="text-left space-y-3">
            <h3 className="text-xl font-semibold text-gray-800">What to Expect</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Your information is being reviewed by our team.</li>
              <li>You will be notified via email once your verification is complete.</li>
              <li>If we need more details, we'll reach out to you.</li>
            </ul>
          </div>

          <div className="flex justify-center pt-2">
            <div className="pt-2 flex justify-center">
              <Link href="/support" className="group">
                <div
                  className="h-12 px-6 bg-gradient-to-r from-yellow-500 to-amber-600 
        group-hover:from-yellow-600 group-hover:to-amber-700 
        text-white font-semibold rounded-lg shadow-lg 
        group-hover:shadow-xl transition-all duration-200 
        transform group-hover:scale-[1.02] flex items-center 
        justify-center"
                >
                  Contact Support
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
