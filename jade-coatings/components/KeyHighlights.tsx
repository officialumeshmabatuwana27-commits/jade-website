"use client";

import { Droplets, Leaf, Sun, Shield } from "lucide-react";

const highlights = [
  {
    icon: Droplets,
    title: "Low VOC Formula",
    description:
      "Ultra-low volatile organic compounds for safer application in enclosed spaces and reduced environmental impact.",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
  },
  {
    icon: Leaf,
    title: "Eco Friendly",
    description:
      "Water-based coatings that are kind to the planet. Biodegradable, non-toxic during application, and environmentally responsible.",
    color: "from-jade-500/20 to-jade-600/10",
    iconColor: "text-jade-400",
  },
  {
    icon: Sun,
    title: "UV Protection",
    description:
      "Advanced UV-stabilised pigments and resins that preserve colour and prevent coating degradation under intense tropical sunlight.",
    color: "from-amber-500/20 to-amber-600/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Shield,
    title: "No Added Lead / Mercury",
    description:
      "Formulated entirely without lead, mercury, or other heavy metals — safe for homes, schools, hospitals, and sensitive environments.",
    color: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-400",
  },
];

export default function KeyHighlights() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-jade-pale text-jade-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Why Choose JADE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Built on the Principles of Health &amp; Nature
          </h2>
          <p className="text-charcoal/60 mt-4 max-w-xl mx-auto">
            Every JADE product is formulated with the health of people and the
            planet at the forefront.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-jade-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-jade-pale flex items-center justify-center mb-5 ${item.iconColor} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-charcoal text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
