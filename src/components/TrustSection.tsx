import React from "react";
import { Star, Quote, CheckCircle } from "lucide-react";

const TrustSection = () => {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Boutique Owner",
      content:
        "Shoppersky transformed my small business into a thriving online empire. Sales increased by 300% in just 6 months!",
      avatar:
        "https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Top Affiliate",
      content:
        "The affiliate program is incredible. I'm earning consistent 5-figure monthly commissions with their excellent support and tools.",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      rating: 5,
    },
    {
      name: "Jennifer Adams",
      role: "Happy Shopper",
      content:
        "I love the variety and quality of products. The shopping experience is smooth and I always find exactly what I need.",
      avatar:
        "https://images.pexels.com/photos/3782227/pexels-photo-3782227.jpeg",
      rating: 5,
    },
  ];

  const stats = [
    {
      label: "Customer Satisfaction",
      value: "99%",
      icon: CheckCircle,
      color: "from-green-400 to-emerald-600",
    },
    {
      label: "Average Rating",
      value: "4.9★",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
    },
    {
      label: "Repeat Customers",
      value: "87%",
      icon: CheckCircle,
      color: "from-blue-400 to-indigo-600",
    },
    {
      label: "Vendor Success Rate",
      value: "94%",
      icon: CheckCircle,
      color: "from-purple-400 to-pink-600",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative background gradients */}
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Infographic Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why People{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform empowers vendors, delights shoppers, and drives
            affiliates with results you can measure.
          </p>
        </div>

        {/* Infographic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Connector line (infographic style) */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 z-0"></div>
              )}

              {/* Icon */}
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-9 w-9 text-white" />
              </div>

              {/* Value */}
              <div className="text-4xl font-extrabold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Community Testimonials */}
        <div className="space-y-12">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Community
            </span>{" "}
            Says
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Quote Badge */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-full shadow-md">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-400"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
