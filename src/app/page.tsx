'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
});


type LoginFormData = z.infer<typeof loginSchema>;

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    router.push("/Dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white font-sans">
      {/* Left Side: Image */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 10 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex items-center justify-center border-r border-gray-200 bg-blue-50"
      >
        <Card className="shadow-none border-none bg-transparent">
          <CardHeader className="text-center text-lg font-semibold text-gray-700">
            Welcome to Our Platform
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src="/login-illustration.svg"
              alt="Illustration"
              width={500}
              height={300}
              className="w-full h-auto object-contain"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Right Side: Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center px-4 sm:px-8 py-12"
      >
        <div className="w-full max-w-sm rounded-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-10 flex flex-col justify-center z-10"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

            {/* Email */}
            <div className="mb-4">
              <Label htmlFor="email" className="text-sm mb-1 block">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="pl-10 focus-visible:ring-0 focus-visible:border-purple-500"
                />
                <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <Label htmlFor="password" className="text-sm mb-1 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="pl-10 pr-10 bg-transparent border-b focus-visible:ring-0 focus-visible:border-purple-500"
                />
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full"
            >
              Login
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// 'use client';

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { User, Lock, Eye, EyeOff } from "lucide-react";
// import { useState } from "react";

// const formSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type FormValues = z.infer<typeof formSchema>;

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = async (data: FormValues) => {
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       alert(`Login success for ${data.email}`);
//     } catch (error) {
//       alert("Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 font-sans">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-4xl"
//       >
//         <Card className="grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">
//           {/* Left */}
//           <div className="hidden md:flex flex-col items-center justify-center bg-blue-50 p-8">
//             <Image
//               src="/login-illustration.svg"
//               alt="Illustration"
//               width={300}
//               height={300}
//               className="object-contain"
//             />
//             <h2 className="text-2xl font-bold text-gray-700 mt-4 text-center">
//               Welcome to Our Platform
//             </h2>
//           </div>

//           {/* Right */}
//           <CardContent className="p-8 bg-white flex flex-col justify-center">
//             <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <Label htmlFor="email" className="text-sm block">
//                   Email
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="email"
//                     type="email"
//                     {...register("email")}
//                     className="pl-10"
//                     placeholder="you@example.com"
//                   />
//                   <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 </div>
//                 {errors.email && (
//                   <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
//                 )}
//               </div>

//               <div>
//                 <Label htmlFor="password" className="text-sm block">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     {...register("password")}
//                     className="pl-10 pr-10"
//                     placeholder=""
//                   />
//                   <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
//                 )}
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:opacity-90"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </Button>
//             </form>

           
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
