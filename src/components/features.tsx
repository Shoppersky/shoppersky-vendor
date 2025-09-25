import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  BarChart3, 
  CreditCard, 
  Users, 
  Settings, 
  TrendingUp,
  ArrowRight,
  Play,
  DollarSign,
  Globe,
  Clock,
  Megaphone,
  Shield,
  Ticket,
  MessageSquare
} from 'lucide-react';

const App = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Ticket,
      title: "Event Creation & Management",
      description: "Create unlimited events with custom branding, pricing tiers, and detailed descriptions",
      color: "from-blue-500 to-cyan-500",
      stats: "Unlimited Events"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track ticket sales, revenue, attendee demographics, and engagement metrics",
      color: "from-purple-500 to-pink-500",
      stats: "Live Dashboard"
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure payment handling with instant payouts and multiple payment methods",
      color: "from-green-500 to-emerald-500",
      stats: "2.9% Fee Only"
    },
    {
      icon: Megaphone,
      title: "Marketing Tools",
      description: "Built-in promotional tools, social media integration, and email campaigns",
      color: "from-orange-500 to-red-500",
      stats: "10x Reach"
    },
    {
      icon: Users,
      title: "Attendee Management",
      description: "Comprehensive attendee database with check-in tools and communication features",
      color: "from-indigo-500 to-blue-500",
      stats: "Smart Check-in"
    },
    {
      icon: Settings,
      title: "Customization",
      description: "White-label solutions with custom domains, branding, and registration forms",
      color: "from-yellow-500 to-orange-500",
      stats: "Full Control"
    }
  ];

  const eventTypes = [
    { name: "Sports Events", count: "15K+ Organizers", icon: "🏆" },
    { name: "Conferences", count: "8K+ Organizers", icon: "🎯" },
    { name: "Concerts", count: "12K+ Organizers", icon: "🎵" },
    { name: "Workshops", count: "6K+ Organizers", icon: "🛠️" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Events
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  2Go
                </span>
                <span className="block text-3xl md:text-4xl text-gray-600 mt-2">for Organizers</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                The complete event management platform for organizers. Create, promote, and manage your events with powerful tools and analytics.
              </p>
            </div>
          </div>

          {/* Event Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {eventTypes.map((type, index) => (
              <div 
                key={type.name}
                className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3">{type.icon}</div>
                <h3 className="text-gray-900 font-semibold text-lg mb-1">{type.name}</h3>
                <p className="text-blue-600 font-bold">{type.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Features Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools and features designed specifically for event organizers to create, manage, and grow their events.
          </p>
        </div>

        {/* Main Feature Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Feature Content */}
          <div className="space-y-8">
            <div className="bg-white backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-xl">
              <div className={`bg-gradient-to-r ${features[activeFeature].color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                {React.createElement(features[activeFeature].icon, { 
                  className: "w-8 h-8 text-white" 
                })}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {features[activeFeature].title}
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                {features[activeFeature].description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  {features[activeFeature].stats}
                </span>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105">
                  <span>Try Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Feature Navigation */}
            <div className="grid grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-blue-50 border-blue-200 scale-105 shadow-md'
                      : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${feature.color} w-8 h-8 rounded-lg flex items-center justify-center mb-2 mx-auto`}>
                    {React.createElement(feature.icon, { 
                      className: "w-4 h-4 text-white" 
                    })}
                  </div>
                  <p className="text-gray-900 text-sm font-medium">{feature.title}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Demo */}
          <div className="relative">
            <div className="bg-white backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-xl">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 text-sm">events2go.com</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span className="text-white">$12,450 Revenue Today</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Ticket className="w-5 h-5 text-blue-400" />
                      <span className="text-white">847 Tickets Sold</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-purple-400" />
                      <span className="text-white">98% Satisfaction Rate</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
                  <div className="text-gray-400 text-sm">Active Organizers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">$2.1B</div>
                  <div className="text-gray-400 text-sm">Revenue Processed</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center animate-bounce">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center animate-pulse">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg rounded-3xl p-12 border border-gray-200 shadow-lg">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Grow Your Events?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful event organizers who trust Events2Go to manage their events and maximize their revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Create Your Event</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>View Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;