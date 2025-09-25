import React from "react";
import {
  UserPlus,
  Package,
  ShoppingBag,
  BarChart3,
  FileText,
  Layers,
  ShieldCheck,
  User,
} from "lucide-react";

const steps = [
  {
    icon: <User className="h-8 w-8 text-white" />,
    title: "Sign Up with Account",
    desc: "Create your account to get started quickly.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: <UserPlus className="h-8 w-8 text-white" />,
    title: "Register Your Store",
    desc: "Set up your digital storefront in minutes.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: <FileText className="h-8 w-8 text-white" />,
    title: "Enter ABN Number",
    desc: "Provide your Australian Business Number for verification.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    title: "Verify Store",
    desc: "Ensure your store meets compliance and verification.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: <Layers className="h-8 w-8 text-white" />,
    title: "Select Business Categories",
    desc: "Choose categories that best match your business.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: <Package className="h-8 w-8 text-white" />,
    title: "List Your Products",
    desc: "Upload and manage your product catalog with ease.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-white" />,
    title: "Start Selling",
    desc: "Reach thousands of customers instantly and grow sales.",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    title: "Track Performance",
    desc: "Monitor sales and analytics to scale your business.",
    color: "from-purple-500 to-blue-500",
  },
];

const VendorJourney = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-9xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Vendor Journey,{" "}
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Simplified
          </span>
        </h2>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
          Follow these steps and grow your business seamlessly.
        </p>

        {/* Horizontal rotating container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee space-x-12">
            {[...steps, ...steps].map((step, i) => (
              <div key={i} className="flex-shrink-0 w-64 text-center">
                {/* Icon */}
                <div
                  className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-tr ${step.color} flex items-center justify-center shadow-lg`}
                >
                  {step.icon}
                </div>

                {/* Glass Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center shadow-xl">
                  <h3 className="text-lg font-semibold mb-1 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default VendorJourney;
