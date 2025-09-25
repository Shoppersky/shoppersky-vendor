"use client";
import React from "react";
import { DollarSign, Share2, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import router from "next/router";

const CleanVendorAffiliateSection = () => {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Decorative floating shapes */}
      <div className=""></div>
      <div className=""></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Features */}
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Grow Your Affiliate
              <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Network
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              Easily manage your affiliates, provide marketing resources, and empower your network to maximize revenue.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                <DollarSign className="h-10 w-10 text-green-400 mb-4" />
                <h3 className="text-white font-semibold text-lg">Flexible Commissions</h3>
                <p className="text-gray-300">Set and adjust commission rates for your affiliates easily.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                <Share2 className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-white font-semibold text-lg">Marketing Tools</h3>
                <p className="text-gray-300">Provide banners, links, and content to boost your affiliate network.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                <Award className="h-10 w-10 text-yellow-400 mb-4" />
                <h3 className="text-white font-semibold text-lg">Performance Rewards</h3>
                <p className="text-gray-300">Motivate top affiliates with exclusive perks and bonuses.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
                <Share2 className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-white font-semibold text-lg">Easy Onboarding</h3>
                <p className="text-gray-300">Quickly onboard new affiliates with intuitive tools and guidance.</p>
              </div>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
              <img
                src="/images/affliate.jpg"
                alt="Top affiliate"
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h4 className="text-white font-bold text-lg">Top Affiliate</h4>
              <p className="text-gray-300 text-sm">Emily R. – Leading your network to success</p>
            </div>

          {/* <button
  onClick={() => router.push("/signin")}
  className="group cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
>
  <span>Manage Affiliate Program</span>
  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
</button> */}


        </div>
      </div>
      </div>
    </section>
  );
};

export default CleanVendorAffiliateSection;
