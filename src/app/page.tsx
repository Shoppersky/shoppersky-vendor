"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import VendorLoginComponent from "@/components/vendor/auth/login";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import useStore from "../lib/Zustand";

export default function VendorLogin() {
  const { login } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/vendor/login", {
        email,
        password,
      });

      const { access_token, user } = response.data;

      if (access_token) {
        login({ access_token, user });

        toast.success("Login successful!");

        // Handle based on onboarding status
        switch (user?.onboarding_status) {
          case "approved":
            router.push("/home");
            break;
          case "not_started":
            router.push("/onboarding");
            break;
          case "under_review":
            router.push("/verification");
            break;
          case "rejected":
            router.push(
              `/rejected?ref=${encodeURIComponent(user?.ref_number || "N/A")}`
            );

            break;
          default:
            router.push("/error");
            break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <VendorLoginComponent />
      <div className="flex items-center justify-center p-6 lg:p-8 relative">
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse delay-1000"></div>

        <div className="mx-auto w-full max-w-md space-y-8 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-600">
              Ready to grow your business? Let's get you signed in to your
              vendor dashboard.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Sign In
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Access your vendor control center
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEmail(val);
                        validateEmail(val);
                      }}
                      placeholder="your.business@example.com"
                      className="h-12 border-2 border-gray-200 focus:border-emerald-500 transition-colors duration-200"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <Link
                        href="/forgotpassword"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPassword(val);
                        }}
                        placeholder="Create a strong password"
                        className="h-12 border-2 border-gray-200 focus:border-emerald-500 transition-colors duration-200 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Sign In
                  </Button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    New to our marketplace?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Start Selling Today
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>

          {/* <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Shopping as a customer? Customer login →
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
