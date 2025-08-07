"use client";

import { TrendingUp, Users, Zap, ShoppingBag, Star } from "lucide-react";

export default function VendorLoginComponent() {
  return (
    <>
      {/* Mobile Header - visible only on mobile */}
      <div className="lg:hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-4 sm:p-6 text-white relative overflow-hidden">
        {/* Mobile background elements */}
        <div className="absolute inset-0 ">
          <div className="absolute top-2 right-4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-4   ">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-sm">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Turn Your Passion Into Profit
          </h2>
          <p className="text-sm sm:text-base text-blue-100">
            Join thousands of successful vendors on our platform.
          </p>
          
          {/* Mobile stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">25K+</div>
              <div className="text-blue-100 text-xs sm:text-sm">Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">$2.5M+</div>
              <div className="text-blue-100 text-xs sm:text-sm">Monthly Sales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:flex bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 relative overflow-hidden items-center justify-center py-12 px-8">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="flex flex-col items-center justify-center p-12 relative z-10 text-white">
          <div className="text-center space-y-8 max-w-lg">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl backdrop-blur-sm">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Turn Your Passion Into Profit
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join thousands of successful vendors who've transformed their
                businesses with our powerful platform.
              </p>
            </div>

            {/* Success metrics with icons */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold">25K+</div>
                <div className="text-blue-100 text-sm">Happy Vendors</div>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold">$2.5M+</div>
                <div className="text-blue-100 text-sm">Monthly Sales</div>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-blue-100 text-sm">Uptime</div>
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Star className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-blue-100 text-sm">Vendor Rating</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-8">
              <p className="text-blue-100 italic mb-3">
                "This platform transformed my small business into a thriving
                online store. The tools are incredible!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">SJ</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Sarah Johnson</div>
                  <div className="text-blue-200 text-xs">
                    Fashion Boutique Owner
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
