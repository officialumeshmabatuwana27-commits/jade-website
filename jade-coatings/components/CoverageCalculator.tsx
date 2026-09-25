"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface ProductPreset {
  id: string;
  name: string;
  brand: string;
  coveragePerLiter: number;
  recoatHours: string;
  dryHours: string;
  description: string;
}

const productPresets: ProductPreset[] = [
  {
    id: "woodshield-sanding-sealer",
    name: "WOODSHIELD Sanding Sealer",
    brand: "WOODSHIELD",
    coveragePerLiter: 100,
    recoatHours: "2 - 3 hrs",
    dryHours: "4 hrs",
    description: "Premium high-build sealer that fills grain pores for ultra-smooth sanding",
  },
  {
    id: "woodshield-topcoat",
    name: "WOODSHIELD Top Coat",
    brand: "WOODSHIELD",
    coveragePerLiter: 120,
    recoatHours: "2 - 3 hrs",
    dryHours: "4 hrs",
    description: "Crystal clear exterior/interior wood varnish and protective topcoat",
  },
  {
    id: "woodshield-stains",
    name: "WOODSHIELD Wood Stains",
    brand: "WOODSHIELD",
    coveragePerLiter: 150,
    recoatHours: "1 - 2 hrs",
    dryHours: "3 hrs",
    description: "Deep penetrating natural dye stains highlighting organic wood grains",
  },
  {
    id: "woodshield-allinone",
    name: "WOODSHIELD All in One",
    brand: "WOODSHIELD",
    coveragePerLiter: 130,
    recoatHours: "2 - 3 hrs",
    dryHours: "4 hrs",
    description: "Multi-functional penetrating stain + sealer + weather shield coat",
  },
  {
    id: "woodshield-floor",
    name: "WOODSHIELD Floor Coat",
    brand: "WOODSHIELD",
    coveragePerLiter: 150,
    recoatHours: "3 - 4 hrs",
    dryHours: "6 hrs",
    description: "High-spread protective wood floor coat and finish",
  },
  {
    id: "jade-easy-floor",
    name: "JADE Easy Floor",
    brand: "DECORATIVES",
    coveragePerLiter: 150,
    recoatHours: "4 - 6 hrs",
    dryHours: "24 hrs (Full cure)",
    description: "Heavy-duty abrasion-resistant water-borne floor coating",
  },
  {
    id: "jade-roof-wall",
    name: "JADE Roof & Wall Shield",
    brand: "DECORATIVES",
    coveragePerLiter: 220,
    recoatHours: "3 - 4 hrs",
    dryHours: "6 hrs",
    description: "Weatherproof UV-reflective elastomeric roof and exterior wall coating",
  },
  {
    id: "masoguard-paving",
    name: "MASOGUARD Wet Look Paving Sealer",
    brand: "MASOGUARD",
    coveragePerLiter: 180,
    recoatHours: "2 - 3 hrs",
    dryHours: "6 hrs",
    description: "Deep-enhancement hydrophobic wet-look protective paving sealer",
  },
  {
    id: "masoguard-primer",
    name: "MASOGUARD Primer",
    brand: "MASOGUARD",
    coveragePerLiter: 120,
    recoatHours: "3 - 4 hrs",
    dryHours: "6 hrs",
    description: "Moisture-resistant masonry primer and adhesion promoter",
  },
  {
    id: "masoguard-allinone",
    name: "MASOGUARD All in One",
    brand: "MASOGUARD",
    coveragePerLiter: 150,
    recoatHours: "3 - 4 hrs",
    dryHours: "6 hrs",
    description: "All-in-one masonry barrier against dampness and efflorescence",
  },
  {
    id: "masoguard-topcoat",
    name: "MASOGUARD Top Coat",
    brand: "MASOGUARD",
    coveragePerLiter: 150,
    recoatHours: "3 - 4 hrs",
    dryHours: "6 hrs",
    description: "Weather-resistant protective masonry exterior top coat",
  },
  {
    id: "metashield-anticorrosive",
    name: "METASHIELD Anti Corrosive - Black",
    brand: "METASHIELD",
    coveragePerLiter: 210,
    recoatHours: "2 hrs",
    dryHours: "4 hrs",
    description: "Heavy-duty anti-corrosion water-borne passivating metal coating",
  },
];

export default function CoverageCalculator() {
  const [selectedProductId, setSelectedProductId] = useState<string>("woodshield-sanding-sealer");
  const [unit, setUnit] = useState<"sqft" | "sqm">("sqft");
  const [areaInput, setAreaInput] = useState<number>(500);

  const currentProduct = productPresets.find((p) => p.id === selectedProductId) || productPresets[0];
  const areaInSqFt = unit === "sqft" ? areaInput : areaInput * 10.7639;
  const totalLitersRaw = areaInSqFt > 0 ? areaInSqFt / currentProduct.coveragePerLiter : 0;
  const totalLiters = Math.ceil(totalLitersRaw * 10) / 10;

  return (
    <div className="bg-white dark:bg-[#131B26] rounded-3xl shadow-xl border border-jade-100 dark:border-slate-800 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-jade-700 via-jade-600 to-emerald-600 p-5 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Coverage Calculator
          </h2>
          <p className="text-white/85 text-xs sm:text-sm mt-1 max-w-2xl">
            Please note: This is an estimated figure. Actual results may vary depending on the specific surface characteristics, porosity, and the chosen method of application.
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Step 1: Select Product */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
              1. Select JADE Coating Product
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-charcoal dark:text-white font-semibold focus:ring-2 focus:ring-jade-500 focus:outline-none transition-all"
            >
              {productPresets.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.name}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-charcoal/50 dark:text-slate-400 mt-1 italic">
              {currentProduct.description}
            </p>
          </div>

          {/* Step 2: Surface Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300">
                2. Project Surface Area
              </label>
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setUnit("sqft")}
                  className={`px-2.5 sm:px-3 py-1 rounded-md text-xs transition-colors ${
                    unit === "sqft"
                      ? "bg-white dark:bg-slate-700 text-jade-700 dark:text-jade-300 shadow-sm font-bold"
                      : "text-charcoal/60 dark:text-slate-400 hover:text-charcoal dark:hover:text-white"
                  }`}
                >
                  Sq. Ft
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("sqm")}
                  className={`px-2.5 sm:px-3 py-1 rounded-md text-xs transition-colors ${
                    unit === "sqm"
                      ? "bg-white dark:bg-slate-700 text-jade-700 dark:text-jade-300 shadow-sm font-bold"
                      : "text-charcoal/60 dark:text-slate-400 hover:text-charcoal dark:hover:text-white"
                  }`}
                >
                  Sq. Meters
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                min="1"
                step="1"
                value={areaInput || ""}
                onChange={(e) => setAreaInput(Math.max(0, Number(e.target.value)))}
                placeholder="Enter area..."
                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 sm:py-3 text-base sm:text-lg font-bold text-charcoal dark:text-white focus:ring-2 focus:ring-jade-500 focus:outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-charcoal/40 dark:text-slate-400 uppercase">
                {unit === "sqft" ? "Sq. Ft" : "m²"}
              </span>
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-gradient-to-br from-charcoal via-slate-900 to-charcoal rounded-2xl p-5 sm:p-7 text-white flex-1 flex flex-col justify-between shadow-xl border border-white/10">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-jade-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Estimated Requirements
                </span>
              </div>

              {/* Big Quantity Display */}
              <div className="text-center py-4 bg-white/5 rounded-2xl border border-white/10 mb-5">
                <div className="text-[11px] text-white/60 uppercase font-bold tracking-wider mb-1">
                  Total JADE Coating Needed
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-jade-400 tracking-tight">
                  {totalLiters}{" "}
                  <span className="text-xl sm:text-2xl font-bold text-white/80">Liters</span>
                </div>
                <div className="text-[11px] text-white/50 mt-1">
                  For {areaInput} {unit === "sqft" ? "sq.ft" : "m²"} coverage
                </div>
              </div>

              {/* Technical Times */}
              <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs text-white/70">
                <div className="flex justify-between text-[11px] sm:text-xs">
                  <span>Recoat Window:</span>
                  <span className="font-semibold text-white">{currentProduct.recoatHours}</span>
                </div>
                <div className="flex justify-between text-[11px] sm:text-xs">
                  <span>Full Cure:</span>
                  <span className="font-semibold text-white">{currentProduct.dryHours}</span>
                </div>
                <div className="flex items-center gap-1.5 text-jade-300 pt-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  Eco-friendly, water-based formula
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-5 pt-3 border-t border-white/10">
              <Link
                href={`/contact?product=${encodeURIComponent(currentProduct.name)}&liters=${totalLiters}`}
                className="w-full py-3 sm:py-3.5 px-4 bg-jade-500 hover:bg-jade-400 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-jade-900/50 hover:shadow-jade-500/40 transition-all"
              >
                Order / Request Bulk Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
