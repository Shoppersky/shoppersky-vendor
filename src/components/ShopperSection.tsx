import React from 'react';
import { Search, Shield, Truck, Heart, ArrowRight, Star } from 'lucide-react';

const ShopperSection = () => {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      vendor: "TechWorld",
      price: "$199",
      rating: 4.8,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      discount: "20% OFF"
    },
    {
      id: 2,
      name: "Organic Skincare Set",
      vendor: "NaturalGlow",
      price: "$89",
      rating: 4.9,
      image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg",
      discount: "NEW"
    },
    {
      id: 3,
      name: "Artisan Coffee Beans",
      vendor: "RoastMaster",
      price: "$24",
      rating: 4.7,
      image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg",
      discount: "BESTSELLER"
    },
    {
      id: 4,
      name: "Smart Fitness Tracker",
      vendor: "FitTech",
      price: "$149",
      rating: 4.6,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
      discount: "15% OFF"
    },
    {
      id: 5,
      name: "Handmade Ceramic Vase",
      vendor: "ArtisanCraft",
      price: "$65",
      rating: 4.8,
      image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
      discount: "LIMITED"
    }
  ];

  return (
    <section id="shoppers" className="py-24 bg-gradient-to-r from-teal-50 to-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Shop with
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Confidence
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover curated products from verified vendors, enjoy secure transactions, 
            and experience shopping like never before.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg hover:bg-teal-200 transition-colors duration-300 hover:scale-110 transform">
                  <Search className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Smart Search</h3>
                  <p className="text-gray-600">Find exactly what you're looking for across all vendor stores</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg hover:bg-teal-200 transition-colors duration-300 hover:scale-110 transform">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Secure Payments</h3>
                  <p className="text-gray-600">Shop with confidence using our encrypted payment system</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg hover:bg-teal-200 transition-colors duration-300 hover:scale-110 transform">
                  <Truck className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Fast Delivery</h3>
                  <p className="text-gray-600">Quick and reliable shipping from verified vendors</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg hover:bg-teal-200 transition-colors duration-300 hover:scale-110 transform">
                  <Heart className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Wishlist & Reviews</h3>
                  <p className="text-gray-600">Save favorites and read authentic customer reviews</p>
                </div>
              </div>
            </div>

            <button className="group bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 hover-glow animate-shimmer">
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h3>
            
            {/* Shopping categories */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover-lift animate-scale-in">
                <img
                  src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg"
                  alt="Electronics"
                  className="w-full h-16 object-cover rounded-lg mb-2 hover:scale-110 transition-transform duration-300"
                />
                <div className="text-sm font-semibold text-gray-900">Electronics</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover-lift animate-scale-in delay-100">
                <img
                  src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
                  alt="Fashion"
                  className="w-full h-16 object-cover rounded-lg mb-2 hover:scale-110 transition-transform duration-300"
                />
                <div className="text-sm font-semibold text-gray-900">Fashion</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover-lift animate-scale-in delay-200">
                <img
                  src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg"
                  alt="Home & Garden"
                  className="w-full h-16 object-cover rounded-lg mb-2 hover:scale-110 transition-transform duration-300"
                />
                <div className="text-sm font-semibold text-gray-900">Home</div>
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                    <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                      {product.discount && (
                        <span className={`absolute -top-2 -right-2 text-white text-xs px-2 py-1 rounded-full animate-pulse ${
                          product.discount.includes('OFF') ? 'bg-red-500' : 
                          product.discount === 'NEW' ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {product.discount}
                        </span>
                      )}
                    </div>
                      {product.discount && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          {product.discount}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">by {product.vendor}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      </div>
                    </div>
                    <button className="bg-teal-100 hover:bg-teal-200 text-teal-600 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Shopping experience showcase */}
        <div className="mt-20 bg-white rounded-3xl shadow-2xl p-8 lg:p-12 animate-fade-in-up hover-lift">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Experience Shopping Reimagined</h3>
              <p className="text-gray-600 text-lg">
                Browse through thousands of products from verified vendors, compare prices, 
                read authentic reviews, and enjoy a seamless checkout experience.
              </p>
              
              {/* Shopping features with images */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 hover-lift animate-scale-in">
                  <img
                    src="https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg"
                    alt="Secure checkout"
                    className="w-full h-32 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                  />
                  <h4 className="font-semibold text-gray-900 mb-2">Secure Checkout</h4>
                  <p className="text-gray-600 text-sm">256-bit SSL encryption for all transactions</p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 hover-lift animate-scale-in delay-200">
                  <img
                    src="https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg"
                    alt="Fast delivery"
                    className="w-full h-32 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                  />
                  <h4 className="font-semibold text-gray-900 mb-2">Fast Delivery</h4>
                  <p className="text-gray-600 text-sm">Same-day delivery in major cities</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
                alt="Happy shopper"
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl hover:from-black/40 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-lg font-semibold animate-pulse">Join 1M+ Happy Shoppers</div>
                <div className="text-sm opacity-90">Discover your next favorite product</div>
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

export default ShopperSection;