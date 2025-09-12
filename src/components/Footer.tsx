import React from 'react';
import { ShoppingBag, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 py-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg hover:scale-110 transition-transform duration-300 animate-shimmer">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Shoppersky
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting vendors, affiliates, and shoppers in the world's most innovative e-commerce ecosystem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Vendors */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">For Vendors</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Open Your Store</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Seller Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Analytics Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Marketing Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Success Stories</a></li>
            </ul>
          </div>

          {/* For Affiliates */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">For Affiliates</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Join Program</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Commission Rates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Marketing Tools</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Track Earnings</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Resources</a></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            
            {/* Contact image */}
            <div className="mb-4">
              <img
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
                alt="Customer support"
                className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@shoppersky.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-1" />
                <span>123 Commerce St, Business District, NY 10001</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover-glow animate-shimmer">
              Contact Support
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Shoppersky. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;