"use client";
import Image from "next/image";
import type React from "react";
import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Step2Props {
  generalQuestions: {
    mainGoals: string[];
  };
  setGeneralQuestions: React.Dispatch<
    React.SetStateAction<{
      mainGoals: string[];
    }>
  >;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Goals({
  generalQuestions,
  setGeneralQuestions,
  onNext,
  onBack,
}: Step2Props) {
  const goals = [
    "Collect feedback",
    "Prioritize my roadmap",
    "Product announcements",
    "Increase Sales",
    "Brand Awareness",
    "Expand Reach",
    "Operational Efficiency",
    "Other",
  ];

  const handleGoalToggle = (goal: string) => {
    setGeneralQuestions((prev) => {
      const newGoals = prev.mainGoals.includes(goal)
        ? prev.mainGoals.filter((g) => g !== goal)
        : [...prev.mainGoals, goal];
      return { ...prev, mainGoals: newGoals };
    });
  };

  const handleSubmit = () => {
    if (generalQuestions.mainGoals.length > 0) {
      onNext();
    } else {
      alert("Please select at least one goal.");
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
      <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-cyan-50 to-blue-50 h-full">
        <div className="text-center space-y-6 max-w-md">
          <Image
            src="/images/2.jpg"
            alt="Goals and purpose illustration"
            width={400}
            height={400}
            className="mx-auto rounded-lg shadow-lg"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Define Your Path to Success
          </h2>
          <p className="text-gray-600 text-lg">
            Help us understand your objectives so we can provide the best tools
            and support for your journey.
          </p>
        </div>
      </div>
      {/* Form Side */}
      <div className="flex items-center justify-center p-6 lg:p-8 h-full">
          <Button
                          onClick={handleLogout}
                          className="absolute top-4 right-4 text-sm bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1.5 rounded-full shadow transition-all duration-200"
                        >
                          Logout
                        </Button>
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4 shadow-lg mx-auto">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Hey partner, what brings you to our platform?
            </h1>
            <p className="text-lg text-gray-600">
              I would like to (select all that apply):
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[calc(100vh-280px)]">
            {goals.map((goal) => (
              <Button
                key={goal}
                variant={
                  generalQuestions.mainGoals.includes(goal)
                    ? "default"
                    : "outline"
                }
                onClick={() => handleGoalToggle(goal)}
                className={cn(
                  "h-12 rounded-lg transition-all duration-200",
                  generalQuestions.mainGoals.includes(goal)
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                    : "border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                )}
              >
                {goal}
              </Button>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="h-12 border-2 border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Continue →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
