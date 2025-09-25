"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Store, BarChart3, Globe, ArrowRight } from "lucide-react";
import {useRouter} from "next/navigation";

const World = dynamic(() => import("./ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function GlobeWithVendors() {
  const router = useRouter();
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#a855f7",
    atmosphereAltitude: 0.15,
    emissive: "#ffffff",
    emissiveIntensity: 0.5,
    shininess: 1,
    polygonColor: "rgba(255, 255, 255, 0.15)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#8b5cf6",
    directionalTopLight: "#3b82f6",
    pointLight: "#ffffff",
    arcTime: 1200,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.7,
  };

  const colors = ["#f0f0f0", "#8b5cf6", "#3b82f6", "#a855f7", "#38bdf8"];
  const sampleArcs = Array.from({ length: 6 }, () => ({
    startLat: Math.random() * 180 - 90,
    startLng: Math.random() * 360 - 180,
    endLat: Math.random() * 180 - 90,
    endLng: Math.random() * 360 - 180,
    arcAlt: 0.2 + Math.random() * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  return (
    <section className="relative w-8xl h-screen overflow-hidden bg-black">
     {/* Globe Background */}
<div className="absolute ml-36 inset-0 right-10">
  <div className=" h-full w-40 translate-x-32 scale-110">
    <World data={sampleArcs} globeConfig={globeConfig} />
  </div>
  {/* Dark overlay */}
  <div className="absolute w-full inset-0 bg-black/40" />
</div>


      {/* Left Side Content */}
      <div className="relative z-10 flex items-center  h-full max-w-8xl mx-auto px-6 lg:px-12">
        <div className="w-full ml-35 lg:w-1/2 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <p className="text-sm uppercase tracking-widest text-purple-400 font-semibold">
              Empowering Businesses Worldwide
            </p>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
              Build Your Digital{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Empire
              </span>
            </h2>
            <p className="text-lg text-white/80">
              Transform your business with a powerful online storefront. Reach
              millions of customers, track growth, and scale globally.
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-6">
            {[
              {
                icon: <Store className="h-6 w-6 text-white" />,
                title: "Custom Storefront",
                desc: "Design your unique brand experience with customizable layouts.",
              },
              {
                icon: <BarChart3 className="h-6 w-6 text-white" />,
                title: "Analytics Dashboard",
                desc: "Track sales, customer insights, and optimize strategy.",
              },
              {
                icon: <Globe className="h-6 w-6 text-white" />,
                title: "Global Reach",
                desc: "Expand worldwide through seamless integrations.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                className="flex items-start space-x-4 group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg shadow-lg shadow-purple-500/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 group-hover:text-purple-300">
                    {item.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
        <button
      type="button"
      onClick={() => router.push("/signin")}
      className="group relative cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <span className="relative z-10 flex items-center space-x-2">
        <span>Open Your Store</span>
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute inset-0 bg-white/10 animate-pulse rounded-full" />
    </button>
        </div>
      </div>
    </section>
  );
}
