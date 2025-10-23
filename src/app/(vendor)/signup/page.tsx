// "use client";

// import Link from "next/link";
// import { FormEvent, useState } from "react";
// import { Eye, EyeOff, Rocket, CheckCircle2, XCircle } from "lucide-react";
// import * as Tooltip from "@radix-ui/react-tooltip";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import VendorSignupComponent from "@/components/vendor/auth/signup";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "sonner";
// import Image from "next/image";

// export default function VendorSignup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [emailValid, setEmailValid] = useState<boolean>(false);
//   const [passwordValidations, setPasswordValidations] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     number: false,
//     special: false,
//   });
//   const [isPasswordFocused, setIsPasswordFocused] = useState(false);
//   const router = useRouter();

//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   // New state for password match validation
//   const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setEmailValid(emailRegex.test(email));
//   };

//   const validatePassword = (password: string) => {
//     const validations = {
//       length: password.length >= 8 && password.length <= 12,
//       uppercase: /[A-Z]/.test(password),
//       lowercase: /[a-z]/.test(password),
//       number: /[0-9]/.test(password),
//       special: /[\W_]/.test(password),
//     };
//     setPasswordValidations(validations);
//   };

//   // New function to validate password match
//   const validatePasswordsMatch = (
//     password: string,
//     confirmPassword: string
//   ) => {
//     setPasswordsMatch(password === confirmPassword || confirmPassword === "");
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!emailValid) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     const allPasswordValidationsCompleted =
//       Object.values(passwordValidations).every(Boolean);
//     if (!allPasswordValidationsCompleted) {
//       toast.error("Please ensure your password meets all requirements.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axiosInstance.post("/vendor/register", {
//         email,
//         password,
//       });

//       if (response.status === 201) {
//         toast.success("Registration successful! Please check your email.");
//         setTimeout(() => {
//           router.push("/signin");
//         }, 2000);
//       }
//     } catch (error: any) {
//       if (error.response?.status === 409) {
//         toast.error(
//           "A vendor with this email already exists. Please log in instead."
//         );
//       } else {
//         const errorMessage =
//           error.response?.data?.detail?.message ||
//           error.response?.data?.message ||
//           "Something went wrong. Please try again.";
//         toast.error(errorMessage);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full lg:grid lg:grid-cols-2 from-cyan-600 to-blue-600 via-white to-blue-50">
//     <div className="flex items-center justify-center relative bg-gradient-to-br from-cyan-600 to-blue-600">
//     <Image
//       src="/images/koalalogo.png"
//       alt="Vendor Signup Illustration"
//       width={400}
//       height={400}
//       className="object-contain rounded-lg"
//     />
//   </div>
//      <div className="flex items-center justify-center p-6 lg:p-8 relative max-h-screen overflow-y-auto">
  
//         {/* <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-10 animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-400 rounded-full opacity-10 animate-pulse delay-500"></div> */}

//         <div className="mx-auto w-full max-w-md space-y-8 relative z-10">
//           <div className="text-center space-y-4">
//             {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
//               <Rocket className="w-8 h-8 text-white" />
//             </div> */}
//             {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
//               Start Your Journey!
//             </h1> */}
//             {/* <p className="text-lg text-gray-600">
//               Join thousands of successful vendors and turn your passion into a
//               thriving business.
//             </p> */}
//           </div>
//           <form onSubmit={handleSubmit}>
//             <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
//               <CardContent className="p-4 space-y-3">
//                 <div className="text-center mb-6">
//                   <h2 className="text-2xl font-semibold text-gray-800">
//                     Create Your Account
//                   </h2>
//                   <p className="text-gray-500 mt-1">
//                     Let's get your store set up in minutes
//                   </p>
//                 </div>

//                 <div className="space-y-5">
//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="email"
//                       className="text-sm font-medium text-gray-700"
//                     >
//                       Email Address
//                     </Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => {
//                         const val = e.target.value;
//                         setEmail(val);
//                         validateEmail(val);
//                       }}
//                       placeholder="your.business@example.com"
//                       className="h-12 border-2 border-gray-200 focus:border-cyan-500 transition-colors duration-200"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="password"
//                       className="text-sm font-medium text-gray-700"
//                     >
//                       Password
//                     </Label>
//                     <div className="relative">
//                       <Tooltip.Provider>
//                         <Tooltip.Root open={isPasswordFocused}>
//                           <Tooltip.Trigger asChild>
//                             <Input
//                               id="password"
//                               type={showPassword ? "text" : "password"}
//                               value={password}
//                               onChange={(e) => {
//                                 const val = e.target.value;
//                                 setPassword(val);
//                                 validatePassword(val);
//                                 validatePasswordsMatch(val, confirmPassword); // Validate password match on password change
//                               }}
//                               onFocus={() => setIsPasswordFocused(true)}
//                               onBlur={() => setIsPasswordFocused(false)}
//                               placeholder="Create a strong password"
//                               className="h-12 border-2 border-gray-200 focus:border-cyan-500 transition-colors duration-200 pr-12"
//                               required
//                             />
//                           </Tooltip.Trigger>
//                           <Tooltip.Portal>
//                             <Tooltip.Content
//                               className="bg-white border-2 border-cyan-200 shadow-lg p-4 rounded-lg max-w-xs z-50"
//                               side="right"
//                               align="center"
//                               sideOffset={5}
//                             >
//                               <div className="space-y-2 text-sm">
//                                 <p className="font-semibold text-cyan-600 mb-2">
//                                   🔒 Password Requirements
//                                 </p>
//                                 <div className="flex items-center gap-2">
//                                   {passwordValidations.length ? (
//                                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                                   ) : (
//                                     <XCircle className="w-4 h-4 text-red-500" />
//                                   )}
//                                   <span
//                                     className={
//                                       passwordValidations.length
//                                         ? "text-green-600"
//                                         : "text-gray-600"
//                                     }
//                                   >
//                                     8-12 characters
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   {passwordValidations.uppercase ? (
//                                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                                   ) : (
//                                     <XCircle className="w-4 h-4 text-red-500" />
//                                   )}
//                                   <span
//                                     className={
//                                       passwordValidations.uppercase
//                                         ? "text-green-600"
//                                         : "text-gray-600"
//                                     }
//                                   >
//                                     One uppercase letter
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   {passwordValidations.lowercase ? (
//                                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                                   ) : (
//                                     <XCircle className="w-4 h-4 text-red-500" />
//                                   )}
//                                   <span
//                                     className={
//                                       passwordValidations.lowercase
//                                         ? "text-green-600"
//                                         : "text-gray-600"
//                                     }
//                                   >
//                                     One lowercase letter
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   {passwordValidations.number ? (
//                                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                                   ) : (
//                                     <XCircle className="w-4 h-4 text-red-500" />
//                                   )}
//                                   <span
//                                     className={
//                                       passwordValidations.number
//                                         ? "text-green-600"
//                                         : "text-gray-600"
//                                     }
//                                   >
//                                     One number
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                   {passwordValidations.special ? (
//                                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                                   ) : (
//                                     <XCircle className="w-4 h-4 text-red-500" />
//                                   )}
//                                   <span
//                                     className={
//                                       passwordValidations.special
//                                         ? "text-green-600"
//                                         : "text-gray-600"
//                                     }
//                                   >
//                                     One special character
//                                   </span>
//                                 </div>
//                               </div>
//                               <Tooltip.Arrow className="fill-white" />
//                             </Tooltip.Content>
//                           </Tooltip.Portal>
//                         </Tooltip.Root>
//                       </Tooltip.Provider>
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="w-5 h-5" />
//                         ) : (
//                           <Eye className="w-5 h-5" />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="confirmPassword"
//                       className="text-sm font-medium text-gray-700"
//                     >
//                       Confirm Password
//                     </Label>
//                     <div className="relative">
//                       <Input
//                         id="confirmPassword"
//                         type={showConfirmPassword ? "text" : "password"}
//                         value={confirmPassword}
//                         onChange={(e) => {
//                           const val = e.target.value;
//                           setConfirmPassword(val);
//                           validatePasswordsMatch(password, val); // Validate password match on confirm password change
//                         }}
//                         placeholder="Confirm your password"
//                         className="h-12 border-2 border-gray-200 focus:border-cyan-500 transition-colors duration-200 pr-12"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowConfirmPassword(!showConfirmPassword)
//                         }
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                       >
//                         {showConfirmPassword ? (
//                           <EyeOff className="w-5 h-5" />
//                         ) : (
//                           <Eye className="w-5 h-5" />
//                         )}
//                       </button>
//                     </div>
//                     {/* Display password mismatch error */}
//                     {!passwordsMatch && confirmPassword.length > 0 && (
//                       <p className="text-red-500 text-sm mt-1">
//                         Passwords do not match
//                       </p>
//                     )}
//                   </div>

//                   <Button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
//                   >
//                     {loading
//                       ? "Creating Account..."
//                       : "Create My Vendor Account"}
//                   </Button>
//                 </div>

//                 <div className="text-center pt-4">
//                   <p className="text-gray-600">
//                     Already have an account?{" "}
//                     <Link
//                       href="/signin"
//                       className="text-cyan-600 hover:text-cyan-800 font-semibold transition-colors"
//                     >
//                       Sign In Here
//                     </Link>
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Rocket, CheckCircle2, XCircle, Sparkles, Shield, Zap } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import VendorSignupComponent from "@/components/vendor/auth/signup";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";
import Image from "next/image";

export default function VendorSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const validatePassword = (password: string) => {
    const validations = {
      length: password.length >= 8 && password.length <= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[\W_]/.test(password),
    };
    setPasswordValidations(validations);
  };

  const validatePasswordsMatch = (
    password: string,
    confirmPassword: string
  ) => {
    setPasswordsMatch(password === confirmPassword || confirmPassword === "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const allPasswordValidationsCompleted =
      Object.values(passwordValidations).every(Boolean);
    if (!allPasswordValidationsCompleted) {
      toast.error("Please ensure your password meets all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post("/vendor/register", {
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration successful! Please check your email.");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error(
          "A vendor with this email already exists. Please log in instead."
        );
      } else {
        const errorMessage =
          error.response?.data?.detail?.message ||
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Left Side - Illustration with Animated Background */}
      <div className="hidden lg:flex items-center justify-center relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-40 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-8 space-y-8">
        
          
          <Image
            src="/images/koalalogo.png"
            alt="Vendor Signup Illustration"
            width={450}
            height={450}
            className="object-contain rounded-2xl drop-shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
          />
          
          <div className="space-y-4 text-white">
           
            
            {/* Feature Pills */}
          
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex items-center justify-center p-6 lg:p-8 relative overflow-y-auto">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 blur-2xl"></div>

        <div className="mx-auto w-full max-w-md space-y-8 relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Start Your Journey
            </h1>
            <p className="text-lg text-gray-600">
              Create your vendor account and unlock unlimited possibilities
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl hover:shadow-cyan-200/50 transition-shadow duration-300">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2 group">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      Email Address
                      {emailValid && email && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </Label>
                    <div className="relative">
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
                        className="h-12 border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 rounded-xl pl-4"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Tooltip.Provider>
                        <Tooltip.Root open={isPasswordFocused}>
                          <Tooltip.Trigger asChild>
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPassword(val);
                                validatePassword(val);
                                validatePasswordsMatch(val, confirmPassword);
                              }}
                              onFocus={() => setIsPasswordFocused(true)}
                              onBlur={() => setIsPasswordFocused(false)}
                              placeholder="Create a strong password"
                              className="h-12 border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 rounded-xl pl-4 pr-12"
                              required
                            />
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="bg-white border-2 border-cyan-200 shadow-2xl p-5 rounded-2xl max-w-xs z-50 animate-in fade-in slide-in-from-left-5 duration-200"
                              side="right"
                              align="center"
                              sideOffset={10}
                            >
                              <div className="space-y-3 text-sm">
                                <p className="font-bold text-cyan-700 mb-3 flex items-center gap-2 text-base">
                                  <Shield className="w-5 h-5" />
                                  Password Requirements
                                </p>
                                {[
                                  { key: 'length', text: '8-12 characters' },
                                  { key: 'uppercase', text: 'One uppercase letter' },
                                  { key: 'lowercase', text: 'One lowercase letter' },
                                  { key: 'number', text: 'One number' },
                                  { key: 'special', text: 'One special character' }
                                ].map(({ key, text }) => (
                                  <div key={key} className="flex items-center gap-2 py-1">
                                    {passwordValidations[key as keyof typeof passwordValidations] ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    ) : (
                                      <XCircle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                                    )}
                                    <span
                                      className={`${
                                        passwordValidations[key as keyof typeof passwordValidations]
                                          ? "text-green-600 font-medium"
                                          : "text-gray-600"
                                      } transition-colors duration-200`}
                                    >
                                      {text}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <Tooltip.Arrow className="fill-white" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      Confirm Password
                      {passwordsMatch && confirmPassword && password && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          const val = e.target.value;
                          setConfirmPassword(val);
                          validatePasswordsMatch(password, val);
                        }}
                        placeholder="Confirm your password"
                        className={`h-12 border-2 ${
                          !passwordsMatch && confirmPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                            : "border-gray-200 focus:border-cyan-500 focus:ring-cyan-100"
                        } focus:ring-4 transition-all duration-200 rounded-xl pl-4 pr-12`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {!passwordsMatch && confirmPassword.length > 0 && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-1 animate-in slide-in-from-top-1">
                        <XCircle className="w-4 h-4" />
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-13 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Create My Vendor Account
                      </span>
                    )}
                  </Button>
                </div>

                {/* Sign In Link */}
                <div className="text-center pt-4 border-t border-gray-100">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="text-cyan-600 hover:text-cyan-800 font-semibold transition-colors relative group"
                    >
                      Sign In Here
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Trust Badges */}
      
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
