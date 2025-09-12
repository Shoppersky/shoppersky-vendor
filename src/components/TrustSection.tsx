import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const TrustSection = () => {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Boutique Owner",
      content: "Shoppersky transformed my small business into a thriving online empire. Sales increased by 300% in just 6 months!",
      avatar: "https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Top Affiliate",
      content: "The affiliate program is incredible. I'm earning consistent 5-figure monthly commissions with their excellent support and tools.",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      rating: 5
    },
    {
      name: "Jennifer Adams",
      role: "Happy Shopper",
      content: "I love the variety and quality of products. The shopping experience is smooth and I always find exactly what I need.",
      avatar: "https://images.pexels.com/photos/3782227/pexels-photo-3782227.jpeg",
      rating: 5
    }
  ];

  const stats = [
    { label: "Customer Satisfaction", value: "99%", icon: CheckCircle, color: "text-green-600" },
    { label: "Average Rating", value: "4.9★", icon: Star, color: "text-yellow-500" },
    { label: "Repeat Customers", value: "87%", icon: CheckCircle, color: "text-blue-600" },
    { label: "Vendor Success Rate", value: "94%", icon: CheckCircle, color: "text-purple-600" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Stats */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
            Trusted by
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Thousands</span>
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-white p-6 rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-12">
          <h3 className="text-3xl font-bold text-center text-gray-900">What Our Community Says</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up hover-glow"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-full animate-wiggle">
                  <Star className="h-4 w-4 text-white" />
                </div>
                
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-gray-300 mb-4 group-hover:text-purple-400 transition-colors duration-300" />
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300 ring-2 ring-purple-200 group-hover:ring-purple-400"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Vendors */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Featured Vendor Partners</h3>
          
          {/* Vendor showcase with images */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {[
              { name: "TechWorld", image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg", category: "Electronics" },
              { name: "NaturalGlow", image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg", category: "Beauty" },
              { name: "RoastMaster", image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg", category: "Food" },
              { name: "StyleHub", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", category: "Fashion" },
              { name: "FitnessPro", image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg", category: "Sports" },
              { name: "HomeDecor", image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg", category: "Home" }
            ].map((vendor, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-24 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-500"
                />
                <div className="p-4">
                  <div className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {vendor.name}
                  </div>
                  <div className="text-xs text-gray-600">{vendor.category}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Success metrics with animations */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center animate-fade-in-up">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/4386345/pexels-photo-4386345.jpeg"
                    alt="Vendor success"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="text-2xl font-bold text-purple-600 animate-pulse">500+</div>
                <div className="text-gray-600 text-sm">Verified Vendors</div>
              </div>
              
              <div className="text-center animate-fade-in-up delay-100">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"
                    alt="Affiliate success"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="text-2xl font-bold text-blue-600 animate-pulse delay-200">$2M+</div>
                <div className="text-gray-600 text-sm">Affiliate Earnings</div>
              </div>
              
              <div className="text-center animate-fade-in-up delay-200">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
                    alt="Happy customers"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="text-2xl font-bold text-teal-600 animate-pulse delay-300">98%</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
              
              <div className="text-center animate-fade-in-up delay-300">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
                    alt="Fast delivery"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="text-2xl font-bold text-green-600 animate-pulse delay-400">24h</div>
                <div className="text-gray-600 text-sm">Avg Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;