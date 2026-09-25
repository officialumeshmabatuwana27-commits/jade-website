import CoverageCalculator from "@/components/CoverageCalculator";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata = {
  title: "Coverage Calculator | JADE Coatings",
  description: "Calculate the exact volume of JADE eco-friendly water-based paint and coatings needed for your domestic or industrial project.",
};

export default function CalculatorPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 min-h-screen bg-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-jade-600 hover:text-jade-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight font-display mb-3">
            Coverage Calculator
          </h1>
          <p className="text-charcoal/65 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please note: This is an estimated figure. Actual results may vary depending on the specific surface characteristics, porosity, and the chosen method of application.
          </p>
        </div>

        {/* Calculator Widget */}
        <CoverageCalculator />

        {/* Technical Guidance */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-jade-50 text-jade-600 flex items-center justify-center font-bold text-sm sm:text-base mb-3">
              1
            </div>
            <h3 className="font-bold text-charcoal text-sm sm:text-base mb-1.5">Surface Preparation</h3>
            <p className="text-charcoal/60 text-xs sm:text-sm leading-relaxed">
              Clean, degrease, and dry the substrate thoroughly. For porous timber or masonry, apply our recommended primer to maximize topcoat yield.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-jade-50 text-jade-600 flex items-center justify-center font-bold text-sm sm:text-base mb-3">
              2
            </div>
            <h3 className="font-bold text-charcoal text-sm sm:text-base mb-1.5">Two Coats for Optimal Shield</h3>
            <p className="text-charcoal/60 text-xs sm:text-sm leading-relaxed">
              While JADE coatings offer high opacity, two coats ensure complete UV cross-linking, waterproofing, and mechanical durability.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="w-9 h-9 rounded-xl bg-jade-50 text-jade-600 flex items-center justify-center font-bold text-sm sm:text-base mb-3">
              3
            </div>
            <h3 className="font-bold text-charcoal text-sm sm:text-base mb-1.5">Technical Assistance</h3>
            <p className="text-charcoal/60 text-xs sm:text-sm leading-relaxed">
              Have unique industrial or commercial specifications? Contact Colour Max Lanka engineering team for custom batch sizing and technical data sheets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
