"use client";

import React from "react";

const KoalaCartAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Cart */}
      <img
        src="/koala-cart.png" // replace with your PNG or SVG path
        alt="Koala Cart"
        className="absolute w-72 top-1/3 animate-move"
      />

      <style jsx>{`
        @keyframes moveCart {
          0% {
            transform: translateX(-120%) scaleX(1); /* start left, facing right */
          }
          49% {
            transform: translateX(100vw) scaleX(1); /* reach right side */
          }
          50% {
            transform: translateX(100vw) scaleX(-1); /* flip */
          }
          100% {
            transform: translateX(-120%) scaleX(-1); /* back to left, facing left */
          }
        }

        .animate-move {
          animation: moveCart 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default KoalaCartAnimation;
