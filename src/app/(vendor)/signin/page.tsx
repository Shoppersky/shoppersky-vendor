"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Store, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import VendorLoginComponent from "@/components/vendor/auth/login";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import useStore from "@/lib/Zustand";


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
              )}&comment=${encodeURIComponent(user?.reviewer_comment || "")}`
            );
            break;
          default:
            router.push("/home");
            break;
        }
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.info("Please change your default password.");
        router.push(`/changepassword?email=${encodeURIComponent(email)}`);
      } else if (error.response?.status === 401) {
        toast.info("Please verify your email before logging in.");
      } else if (error.response?.status === 404) {
        toast.info("Account not found, please signup.");
      } else if (error.response?.status === 423) {
        toast.info("Account locked, please contact support");
      }else if (error.response?.status === 422) {
        toast.info("Account verification pending");
      } 
       else if (error.response?.status === 409) {
        toast.info("Account is inactive, please contact support");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <VendorLoginComponent />
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 relative min-h-screen lg:min-h-0 py-8 sm:py-12 lg:py-8">
        {/* Floating elements for visual interest - responsive positioning */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-r from-blue-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-10 sm:w-16 h-10 sm:h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10 animate-pulse delay-1000"></div>

        <div className="mx-auto w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 relative z-10 px-2 sm:px-0">
          <div className="text-center space-y-3 sm:space-y-4">
            {/* <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
              <Store className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
            </div> */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 px-2 sm:px-0">
              Ready to grow your business? Let's get you signed in to your
              vendor dashboard.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Sign In
                  </h2>
                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Access your vendor control center
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5">
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
                      className="h-10 sm:h-12 border-2 border-gray-200 focus:border-emerald-500 transition-colors duration-200 text-sm sm:text-base"
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
                        className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
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
                        placeholder="Please enter your password"
                        className="h-12 border-2 border-gray-200 focus:border-emerald-500 transition-colors duration-200 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                        ) : (
                          <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>

                <div className="text-center pt-3 sm:pt-4">
                  <p className="text-gray-600 text-sm sm:text-base">
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

          {/* Mobile-only additional info */}
          <div className="lg:hidden mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                  <Store className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xs text-gray-600">Easy Setup</div>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xs text-gray-600">Grow Sales</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
