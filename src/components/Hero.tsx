import { Button } from "@/components/ui/button";
import { ArrowRight, Store, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/dashboard-mockup.jpg";
import Image from "next/image";
import {useRouter} from "next/navigation";


const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background decoration */}
     <div className="absolute inset-0 bg-black" />
{/* <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl" /> */}
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />

      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2  backdrop-blur-sm px-4 py-2 rounded-full border">
              <span className="text-sm bg text bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent font-medium">Join ShopperSky</span>
            </div>
            
           <div className="space-y-6">
  <h1 className="text-5xl text-white lg:text-7xl font-bold leading-tight">
    <span>The </span>
    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
      AI
    </span>{" "}
    Powered{" "}
    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
      future
    </span>
    <br />
    of Commerce
  </h1>

  <p className="text-xl text-white max-w-lg leading-relaxed">
    Join thousands of successful vendors on ShopperSky. Get powerful analytics, 
    seamless inventory management, and access to millions of customers.
  </p>
</div>

            
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
        size="lg"
        className="shadow-button bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl transition-all duration-300 group"
        onClick={() => router.push("/signup")}
      >
        Open your storefront
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
              <Button variant="outline" size="lg" className="border-2">
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center ">
                <div className="text-3xl bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent font-bold  text-primary">99.9%</div>
                <div className="text-sm text-white font-bold">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent text-primary">$2M+</div>
                <div className="text-sm  text-white font-bold ">Daily Sales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold  bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent text-primary">24/7</div>
                <div className="text-sm  text-white font-bold">Support</div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="relative">
            <div className="relative z-10">
             <Image
  src="/images/Grow1.jpg"
  alt="ShopperSky Vendor Dashboard"
  width={1200} // set your preferred width
  height={700} // set your preferred height
  className="w-full h-auto rounded-2xl shadow-hero transform hover:scale-105 transition-transform duration-700"
/>

            </div>
            
            {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500  to-purple-500 text-success-foreground px-4 py-2 rounded-lg shadow-lg z-20">
  <div className="flex  text-white tems-center gap-2">
    <TrendingUp className="h-4 w-4" />
    <span className="font-semibold">+25% Growth</span>
  </div>
</div>

<div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500  to-purple-500 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border z-20">
  <div className="flex items-center gap-2">
    <Shield className="h-4 w-4 text-white" />
    <span className=" text-white font-semibold">Secure & Trusted</span>
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;