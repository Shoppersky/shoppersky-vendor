import React from 'react';
import { BarChart, Shield, Truck, Users, ArrowRight, Star, Package } from 'lucide-react';

const VendorSection = () => {
  const stats = [
    { id: 1, label: "Total Sales", value: "$12,450", icon: <BarChart className="h-6 w-6 text-indigo-600" /> },
    { id: 2, label: "Products Listed", value: "248", icon: <Package className="h-6 w-6 text-green-600" /> },
    { id: 3, label: "Active Customers", value: "1,320", icon: <Users className="h-6 w-6 text-blue-600" /> },
    { id: 4, label: "Avg. Rating", value: "4.8", icon: <Star className="h-6 w-6 text-yellow-500" /> }
  ];

  return (
    <section id="vendors" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Sell with  <span className="bg-gradient-to-r from-blue-500  to-purple-500 bg-clip-text text-transparent bg-clip-text text-transparent">Confidence </span>
           
              
           
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
            Join our growing vendor network, reach thousands of customers, 
            and manage your business effortlessly with our powerful tools.
          </p>
        </div>

        {/* Features + Stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Vendor Benefits */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500  to-purple-500 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-500">Easy Store Setup</h3>
                  <p className="text-white">List products quickly and manage inventory with ease</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500  to-purple-500 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-500">Secure Transactions</h3>
                  <p className="text-white">Payments are encrypted and payouts are guaranteed</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500  to-purple-500 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-500">Logistics Support</h3>
                  <p className="text-white">Integrated shipping partners for fast & reliable delivery</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-500  to-purple-500 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-500">Customer Insights</h3>
                  <p className="text-white">Get analytics to understand buyer behavior and grow sales</p>
                </div>
              </div>
            </div>

          </div>

          {/* Vendor Dashboard Preview */}
          <div className="space-y-6 animate-slide-in-right">
            <h3 className="text-2xl font-bold text-blue-500 mb-6">Your Vendor Dashboard</h3>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center space-x-4 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-gray-100 p-3 rounded-lg">{stat.icon}</div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vendor Growth Showcase */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-8 lg:p-12 animate-fade-in-up hover-lift">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Grow Your Business with Us</h3>
              <p className="text-gray-600 text-lg">
                Manage your store, track performance, and increase sales with 
                real-time analytics and vendor-focused tools.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 hover-lift animate-scale-in">
                  <img
                    src="/images/Dashboard.png"
                    alt="Dashboard"
                    className="w-full h-32 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                  />
                  <h4 className="font-semibold text-gray-900 mb-2">Powerful Dashboard</h4>
                  <p className="text-gray-600 text-sm">Track sales, revenue & customer activity in one place</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 hover-lift animate-scale-in delay-200">
                  <img
                    src="/images/support.jpg"
                    alt="Support"
                    className="w-full h-32 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                  />
                  <h4 className="font-semibold text-gray-900 mb-2">Dedicated Support</h4>
                  <p className="text-gray-600 text-sm">24/7 vendor support to help you scale smoothly</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/images/growing.jpg"
                alt="Happy vendor"
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-lg font-semibold animate-pulse">10K+ Vendors Growing</div>
                <div className="text-sm opacity-90">Be part of our trusted marketplace</div>
              </div>
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-3 animate-float">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VendorSection;
