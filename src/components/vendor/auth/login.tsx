"use client";

import { ShieldCheck, Gift, TrendingUp, Headphones, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function VendorLoginComponent() {
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-4 sm:p-6 text-white relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 ">
          <div className="absolute top-2 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-sm">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Launch Your Store Today</h2>
          <p className="text-sm sm:text-base text-blue-100">
            Be among the first vendors to join and grow with us.
          </p>

          {/* Mobile Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">🚀</div>
              <div className="text-blue-100 text-xs sm:text-sm">Early Access</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">0%</div>
              <div className="text-blue-100 text-xs sm:text-sm">Commission (Intro Offer)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 relative overflow-hidden items-center justify-center py-12 px-8">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* <div className="flex flex-col items-center justify-center p-12 relative z-10 text-white">
          <div className="text-center space-y-8 max-w-lg">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-sm">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Become a Founding Vendor 
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join our new platform and be among the first to showcase your products
                to a growing customer base.
              </p>
            </div>

            
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="text-lg font-semibold">Intro Offer</div>
                <div className="text-blue-100 text-sm">0% Commission</div>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-lg font-semibold">Growth Potential</div>
                <div className="text-blue-100 text-sm">Be First 100 Vendors</div>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-lg font-semibold">Secure</div>
                <div className="text-blue-100 text-sm">Payments & Orders</div>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                  <Headphones className="w-6 h-6" />
                </div>
                <div className="text-lg font-semibold">24/7 Support</div>
                <div className="text-blue-100 text-sm">For All Vendors</div>
              </div>
            </div>

            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-8">
              <p className="text-blue-100 italic mb-3">
                "Early vendors will get exclusive benefits and priority support."
              </p>
              <div className="font-semibold">Be part of the journey from Day 1 </div>
            </div>
          </div>
        </div> */}
        <div>
          <Image
            src="/images/koalalogo.png"
            alt="Vendor Signup Illustration"
            width={450}
            height={450}
            className="object-contain rounded-2xl drop-shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300"
            />
        </div>
      </div>
    </>
  );
}
