"use client";
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import VendorSection from '../components/VendorSection';
import AffiliateSection from '../components/AffiliateSection';
import ShopperSection from '../components/ShopperSection';
import ProductShowcase from '../components/Vendorjourney';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';
import Features from '@/components/features';
function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
       <ShopperSection />
      <AffiliateSection />
     
      {/* <Features /> */}
      <VendorSection />
      <ProductShowcase />
      <TrustSection />
      <Footer />
    </div>
  );
}
export default App;