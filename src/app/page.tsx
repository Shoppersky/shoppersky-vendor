'use client';

import { useState } from "react";
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
import axiosInstance from "@/lib/axiosInstance";
import useStore from "@/lib/Zustand";
import { toast } from "sonner";
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
  const { login } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await axiosInstance.post("/api/v1/admin-auth/login", {
        email: data.email,
        password: data.password,
      });
 
      const statusCode = response.data.statusCode;
      const userId = response.data.user_id;
 
      if (statusCode === 200) {
        const { access_token, user_id } = response.data.data;
        console.log(response.data.data)
        login(access_token);
        localStorage.setItem('id', user_id);
        router.push('/Dashboard');
        toast.success('Login Successful.');
      } else if (statusCode === 201) {
        router.push(`/ResetPassword?email=${encodeURIComponent(data.email)}`);
        toast.success('Login Success. Please reset your password.');
      }
    } catch (error: any) {
      console.log(error.response)
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          toast(data.detail.message === "User not found." ? 'User Not Found.' : 'Invalid credentials or account issues.');
        } else if (status === 403) {
          toast(data.detail.message);
          
        }
         else if (status === 423) {
          toast(data.detail.message);
          
        }  else if (status === 404) {
          toast('Account not found.');
        } else {
          toast('Unexpected error: ' + (data.detail.message || 'An error occurred.'));
        }
      } else {
        toast('An error occurred: ' + (error.message || 'Unknown error.'));
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Fullscreen background image */}
      <Image
        src="/loginprofile.webp"
        alt="Background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay to dim image for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Login form on top of image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex items-center justify-center z-20"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-10 w-full max-w-sm shadow-lg"
        >
            <div className="flex justify-center mb-4">
    <Image
      src="/logo.png" // Replace with your actual logo path
      alt="Logo"
      width={80}
      height={80}
      className="object-contain"
    />
  </div>
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
                className="pl-10"
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
                className="pl-10 pr-10"
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
      </motion.div>
    </div>
  );
}


// 'use client';

// import { useState } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { Lock, User, Eye, EyeOff } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const loginSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid email format"),
//   password: z
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .regex(/[A-Z]/, "Must include at least one uppercase letter")
//     .regex(/[a-z]/, "Must include at least one lowercase letter")
//     .regex(/[0-9]/, "Must include at least one number")
//     .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
// });


// type LoginFormData = z.infer<typeof loginSchema>;

// export default function Home() {
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = (data: LoginFormData) => {
//     console.log("Login data:", data);
//     router.push("/Dashboard");
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white font-sans">
//       {/* Left Side: Image */}
//     <motion.div
//   initial={{ opacity: 0, x: 0 }}
//   animate={{ opacity: 1, x: 10 }}
//   transition={{ duration: 0.6 }}
//   className="hidden md:flex justify-center items-center border-r border-gray-200 min-h-screen relative"
// >
//   <div className="w-full h-full relative">
//     <Image
//       src="/loginprofile.webp"
//       alt="Illustration"
//       fill
//       className="object-cover"
//       priority
//     />
//   </div>
// </motion.div>


//       {/* Right Side: Login Form */}
//       <motion.div
//         initial={{ opacity: 0, x: 30 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="flex items-center justify-center px-4 sm:px-8 py-12"
//       >
//         <div className="w-full max-w-sm rounded-2xl">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="p-10 flex flex-col justify-center z-10"
//           >
//             <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

//             {/* Email */}
//             <div className="mb-4">
//               <Label htmlFor="email" className="text-sm mb-1 block">
//                 Email
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="email"
//                   type="email"
//                   {...register("email")}
//                   className="pl-10 focus-visible:ring-0 focus-visible:border-purple-500"
//                 />
//                 <User className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="mb-4">
//               <Label htmlFor="password" className="text-sm mb-1 block">
//                 Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   {...register("password")}
//                   className="pl-10 pr-10 bg-transparent border-b focus-visible:ring-0 focus-visible:border-purple-500"
//                 />
//                 <Lock className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full cursor-pointer"
//             >
//               Login
//             </Button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

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
