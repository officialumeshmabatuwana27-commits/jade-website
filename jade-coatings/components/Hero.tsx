"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Calculator } from "lucide-react";

const taglines = [
  "Coatings that bring out the best",
  "We render life to your coatings",
];

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-16">
      {/* 3D Animated Deck Transformation Background */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ perspective: "1000px" }}>
        {/* State 1: Dried Out / Weathered Wooden Deck (Base Layer) */}
        <img
          src="/images/deck-weathered.jpg"
          alt="Weathered Dried Out Wooden Deck"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />

        {/* State 2: Elegant Coated Wooden Deck (3D Transformed Layer) */}
        <img
          src="/images/deck-restored.jpg"
          alt="Restored Elegant Golden Teak Wooden Deck"
          className="hero-deck-3d-restored absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* 3D Energy Transformation Scanline */}
        <div className="hero-deck-scanline" />

        {/* Neutral Charcoal/Slate Glass Depth Overlays (Replaces green tint) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-charcoal/70 to-black/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/70" />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-jade-500/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {/* Eco Water-Borne Badge */}
        <div className="block mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-jade-400 animate-pulse" />
            <span>Pioneering Water-Borne Technology Since 2015</span>
          </div>
        </div>

        {/* Company name */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight sm:leading-none drop-shadow-md">
          JADE
          <span className="text-jade-400"> Coatings</span>
        </h1>

        {/* Animated tagline */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-4 sm:mb-6">
          <p
            className={`text-lg sm:text-xl md:text-2xl text-white/90 font-medium italic font-display transition-all duration-400 drop-shadow-sm ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            &ldquo;{taglines[taglineIndex]}&rdquo;
          </p>
        </div>

        {/* Sub description */}
        <p className="text-white/80 text-xs sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 drop-shadow-sm">
          A brand of Colour Max Lanka Pvt Ltd. Pioneers in low-VOC, eco-friendly
          water-borne paints for domestic and industrial applications.
        </p>

        {/* CTA Buttons (Mobile Stack / Desktop Inline) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full">
          <Link
            href="/products"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-jade-500 hover:bg-jade-400 text-white rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-xl shadow-jade-900/50 hover:scale-105"
          >
            Explore Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/calculator"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all duration-200 shadow-md"
          >
            <Calculator className="w-4 h-4 text-jade-400" />
            Coverage Calculator
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-8 max-w-lg mx-auto">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "20+", label: "Product Lines" },
            { value: "50+", label: "Premium Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-2.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10">
              <div className="font-display text-2xl sm:text-3xl font-bold text-jade-400">
                {stat.value}
              </div>
              <div className="text-white/70 text-[10px] sm:text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/50">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
}
