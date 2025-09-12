import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';

const ProductShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredProducts = [
    {
      id: 1,
      name: "Luxury Smartwatch",
      vendor: "TechElite",
      price: "$299",
      originalPrice: "$399",
      rating: 4.9,
      reviews: 1247,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
      badge: "TRENDING"
    },
    {
      id: 2,
      name: "Designer Sunglasses",
      vendor: "StyleCo",
      price: "$129",
      originalPrice: "$179",
      rating: 4.7,
      reviews: 892,
      image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
      badge: "50% OFF"
    },
    {
      id: 3,
      name: "Artisan Leather Bag",
      vendor: "CraftMasters",
      price: "$189",
      originalPrice: "$249",
      rating: 4.8,
      reviews: 634,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
      badge: "HANDMADE"
    },
    {
      id: 4,
      name: "Wireless Earbuds Pro",
      vendor: "AudioTech",
      price: "$159",
      originalPrice: "$199",
      rating: 4.6,
      reviews: 2156,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      badge: "BESTSELLER"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trending
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most popular products from our top-rated vendors
          </p>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-2 gap-8 bg-white p-8 lg:p-12">
                    <div className="relative group">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white animate-pulse ${
                          product.badge === 'TRENDING' ? 'bg-purple-500' :
                          product.badge.includes('OFF') ? 'bg-red-500' :
                          product.badge === 'BESTSELLER' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="h-6 w-6 text-red-500 hover:scale-125 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-6">
                      <div>
                        <div className="text-sm text-purple-600 font-semibold mb-2">by {product.vendor}</div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h3>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} animate-pulse`}
                                style={{ animationDelay: `${i * 100}ms` }}
                              />
                            ))}
                          </div>
                          <span className="text-gray-600">({product.reviews} reviews)</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 mb-6">
                          <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                          <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                            Save ${parseInt(product.originalPrice.slice(1)) - parseInt(product.price.slice(1))}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 hover-glow">
                          <ShoppingCart className="h-5 w-5" />
                          <span>Add to Cart</span>
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                          <Heart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;