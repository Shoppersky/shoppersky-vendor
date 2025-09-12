import React from 'react';
import { Store, BarChart3, Globe, Zap, Users, Star, ArrowRight } from 'lucide-react';

const VendorSection = () => {
  return (
    <section id="vendors" className="py-24 bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Build Your Digital
                <span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Empire
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your business with a powerful online storefront. Reach millions of customers, 
                track your success, and grow your revenue with our comprehensive vendor platform.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-300 hover:scale-110 transform">
                  <Store className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Custom Storefront</h3>
                  <p className="text-gray-600">Design your unique brand experience with customizable themes and layouts</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-300 hover:scale-110 transform">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
                  <p className="text-gray-600">Track sales, customer behavior, and optimize your performance</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg hover:bg-purple-200 transition-colors duration-300 hover:scale-110 transform">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Global Reach</h3>
                  <p className="text-gray-600">Access to our worldwide customer base and marketing channels</p>
                </div>
              </div>
            </div>

            <button className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 hover-glow animate-shimmer">
              <span>Open Your Store</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right side dashboard mockup */}
          <div className="relative animate-slide-in-right">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500 animate-fade-in-up">
              
              {/* Dashboard Header */}
              <h4 className="text-xl font-bold text-gray-900 mb-6">Sarah's Boutique</h4>
              
              {/* Main Dashboard Widgets */}
              <div className="grid grid-cols-2 gap-6">
                {/* Revenue Widget */}
                <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-lg font-semibold text-green-600">$12,500</p>
                  <div className="bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                {/* Orders Widget */}
                <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
                  <p className="text-sm text-gray-600">Orders This Month</p>
                  <p className="text-lg font-semibold text-purple-600">342</p>
                </div>

                {/* Customers Widget */}
                <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
                  <p className="text-sm text-gray-600">New Customers</p>
                  <p className="text-lg font-semibold text-blue-600">+250</p>
                </div>

                {/* Rating Widget */}
                <div className="bg-gray-50 rounded-xl p-4 shadow-inner">
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  <p className="text-lg font-semibold text-yellow-500">95%</p>
                </div>
              </div>
            </div>

            {/* Floating success indicators */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
              <Zap className="h-8 w-8 text-white animate-pulse" />
            </div>

            {/* Floating Customers Badge */}
            <div className="absolute -top-6 -left-6 bg-white rounded-full p-3 shadow-lg animate-bounce text-center">
              <Users className="h-6 w-6 text-blue-500 mx-auto" />
              <span className="block text-xs text-gray-700 font-medium mt-1">+250</span>
            </div>

            {/* Floating Top Seller Badge */}
            <div className="absolute -right-8 top-1/4 bg-white rounded-xl shadow-lg p-4 w-40 animate-float delay-300">
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <span className="font-semibold text-gray-900 text-sm">Top Seller</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Badge Earned</p>
            </div>

            {/* Floating Orders Badge */}
            <div className="absolute -left-8 bottom-1/4 bg-gradient-to-r from-green-100 to-green-200 rounded-xl shadow-lg p-4 w-40 animate-float delay-700">
              <p className="text-sm font-semibold text-green-700">+120 Orders</p>
              <p className="text-xs text-gray-600">this week</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
