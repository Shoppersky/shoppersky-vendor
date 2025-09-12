import React from 'react';
import { Target, DollarSign, Share2, Award, ArrowRight } from 'lucide-react';

const AffiliateSection = () => {
  return (
    <section id="affiliates" className="py-24 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative animate-slide-in-left">
            {/* Main earnings dashboard */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-500 animate-fade-in-up">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-gray-900">Alex's Earnings</h4>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Top Performer
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">$8,240</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-gray-600">Referrals</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Commission Rate</span>
                    <span className="font-semibold text-blue-600">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold text-green-600">8.2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating commission notifications */}
            <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-full">
              <Target className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            {/* Commission popup animations */}
            <div className="absolute -right-6 top-1/3 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
              <div className="text-sm font-semibold">+$45 Commission!</div>
            </div>
            
            <div className="absolute -left-6 bottom-1/3 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
              <div className="text-sm font-semibold">New Referral</div>
            </div>
            
            {/* Social media preview cards */}
            <div className="absolute -right-12 bottom-1/4 bg-white rounded-xl shadow-lg p-4 w-56 animate-float delay-500">
              <img
                src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg"
                alt="Social media post"
                className="w-full h-20 object-cover rounded-lg mb-3"
              />
              <div className="text-xs space-y-1">
                <div className="font-semibold text-gray-900">Instagram Post</div>
                <div className="text-gray-600">1.2K likes • 89 comments</div>
                <div className="text-blue-600 font-semibold">$127 earned</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8 animate-slide-in-right">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Earn While You
                <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  Influence
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join thousands of successful affiliates earning substantial commissions by promoting 
                quality products from our verified vendor network.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">High Commissions</h3>
                  <p className="text-gray-600">Earn up to 15% commission on every successful referral</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                  <Share2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Marketing Tools</h3>
                  <p className="text-gray-600">Access professional banners, links, and promotional content</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors duration-300 hover:scale-110 transform">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Performance Rewards</h3>
                  <p className="text-gray-600">Unlock bonus rates and exclusive perks as you grow</p>
                </div>
              </div>
            </div>

            <button className="group bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 hover-glow animate-shimmer">
              <span>Become an Affiliate</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateSection;