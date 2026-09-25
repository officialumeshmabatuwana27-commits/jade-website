"use client";

import { useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  brand?: string;
  compact?: boolean;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/products/Before after.jpg",
  afterImage = "/images/products/Woodshield All in One new.jpg",
  beforeLabel = "Untreated",
  afterLabel = "JADE Finish",
  brand = "JADE",
  compact = false,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div
      className={`relative w-full overflow-hidden select-none group ${
        compact ? "h-44 sm:h-48 rounded-xl" : "h-56 sm:h-72 lg:h-80 rounded-2xl"
      } bg-charcoal/5 border border-gray-200/80 shadow-inner`}
    >
      {/* After image (Underneath / Full Width) */}
      <img
        src={afterImage}
        alt={`${brand} Coated Result`}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Before image (Clipped by slider position) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-none"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt={`${brand} Untreated Surface`}
          className="absolute inset-0 w-full h-full object-cover object-center max-w-none pointer-events-none filter contrast-90 brightness-95"
          style={{ width: "100%", height: "100%", minWidth: "100%" }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Transparent Glassmorphic Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/45 backdrop-blur-sm shadow-[0_0_8px_rgba(0,0,0,0.3)] pointer-events-none z-10"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Transparent Frosted Glass Grab Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md shadow-lg flex items-center justify-center border border-white/80 transition-transform group-hover:scale-110">
          <svg
            className="w-4 h-4 text-white drop-shadow-sm"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 3 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Transparent Glass Floating Labels */}
      <span className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md uppercase tracking-wider z-10 pointer-events-none shadow-sm border border-white/20">
        {beforeLabel}
      </span>
      <span className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md uppercase tracking-wider z-10 pointer-events-none shadow-sm border border-white/20">
        {afterLabel}
      </span>

      {/* Invisible Interactive Range Input with touch-action pan-y */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        aria-label="Before and After Comparison Slider"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0 p-0"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
