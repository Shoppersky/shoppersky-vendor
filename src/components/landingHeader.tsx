
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-6 left-1/2 -translate-x-1/2
    w-full max-w-5xl h-14
    rounded-full border border-gray-200
    shadow-md z-[9999] flex items-center transition-colors duration-300
    ${isScrolled ? "bg-white/70 backdrop-blur-md" : "bg-white"}
  `}
>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r   from-purple-600 to-blue-600 p-2 rounded-lg hover:scale-110 transition-transform duration-300 animate-shimmer">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold mr-40 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Shoppersky
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center  space-x-8">
            <a
              href="#vendors"
              className="text-gray-700 hover:text-purple-600 transition-all duration-200 hover:scale-105 relative group"
            >
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              For Vendors
            </a>
            <a
              href="#affiliates"
              className="text-gray-700 hover:text-purple-600 transition-all duration-200 hover:scale-105 relative group"
            >
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              For Affiliates
            </a>
            <a
              href="#shoppers"
              className="text-gray-700 hover:text-purple-600 transition-all duration-200 hover:scale-105 relative group"
            >
              <span className="absolute inset-x-0 -bottom-1 h-05 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              For Shoppers
            </a>
            <button className="bg-gradient-to-r  ml-20 from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover-glow animate-shimmer">
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 rounded-b-3xl">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#vendors"
              className="block px-3 py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              For Vendors
            </a>
            <a
              href="#affiliates"
              className="block px-3 py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              For Affiliates
            </a>
            <a
              href="#shoppers"
              className="block px-3 py-2 text-gray-700 hover:text-purple-600"
              onClick={() => setIsMenuOpen(false)}
            >
              For Shoppers
            </a>
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full mt-4">
              Get Started
            </button>
          </div>
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
