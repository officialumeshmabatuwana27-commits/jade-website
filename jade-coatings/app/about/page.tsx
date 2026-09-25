import type { Metadata } from "next";
import Link from "next/link";
import {
  FlaskConical,
  Globe,
  Leaf,
  Recycle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JADE Coatings, a brand of Colour Max Lanka Pvt Ltd — pioneers in water-based, eco-friendly coating solutions in Sri Lanka since 2015.",
};

const rdPoints = [
  {
    icon: FlaskConical,
    title: "Continuous Innovation",
    description:
      "Our R&D team is committed to continuously improving formulations, staying ahead of international environmental standards and performance benchmarks.",
  },
  {
    icon: Leaf,
    title: "Non-Carcinogenic Raw Materials",
    description:
      "Every raw material is rigorously screened. We only use ingredients that are proven safe for human health — no carcinogens, no heavy metals, no compromises.",
  },
  {
    icon: Recycle,
    title: "Zero Environmental Impact Manufacturing",
    description:
      "Our manufacturing processes are designed to eliminate waste discharge. We operate with a closed-loop ethos: what goes in, must come out clean.",
  },
  {
    icon: Globe,
    title: "Global Standards, Local Solutions",
    description:
      "In partnership with global experts, we formulate products that meet and exceed international VOC and safety standards while being perfectly suited to the Sri Lankan climate.",
  },
];

const timeline = [
  { year: "2015", title: "Company Founded", desc: "JADE Coatings established as a brand of Colour Max Lanka Pvt Ltd, with a mission to bring water-based solutions to Sri Lanka." },
  { year: "2017", title: "Product Range Expansion", desc: "Launched the WOODSHIELD and MASOGUARD product families, covering domestic wood and masonry applications." },
  { year: "2019", title: "Industrial Division Launch", desc: "Introduced METASHIELD and TYRESHIELD for industrial clients, expanding into metal protection and tyre manufacturing." },
  { year: "2021", title: "Premium Hotel Portfolio", desc: "Completed coatings projects at Shangri-La Hambantota and Heritance Ahungalla, cementing our reputation in luxury hospitality." },
  { year: "2024", title: "Expanding Impact", desc: "Continued growth across Sri Lanka with 50+ premium clients and ongoing R&D into next-generation ultra-low VOC formulas." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-jade-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-jade-400/20 border border-jade-400/30 text-jade-200 text-xs font-semibold uppercase tracking-widest mb-6">
            About JADE Coatings
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Coatings with a <span className="text-jade-300">Conscience</span>
          </h1>
          <p className="text-jade-200 text-lg leading-relaxed max-w-2xl mx-auto">
            We believe that protecting your surfaces should never come at the
            cost of the environment or your health.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-jade-pale text-jade-500 text-xs font-semibold uppercase tracking-widest mb-5">
                Who We Are
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                Pioneers in Water-Based Coating Technology
              </h2>
              <div className="space-y-4 text-charcoal/65 leading-relaxed">
                <p>
                  JADE Coatings is a brand of <strong className="text-charcoal">Colour Max Lanka Pvt Ltd</strong>,
                  founded in 2015 with a singular purpose: to introduce
                  eco-friendly, water-based coating solutions to the Sri Lankan
                  market.
                </p>
                <p>
                  In association with global experts in coating chemistry, we
                  offer a comprehensive range of low to ultra-low VOC
                  water-borne paints and coatings designed for both domestic and
                  industrial applications. Our products carry the performance of
                  premium solvent-based systems — without the harmful
                  environmental or health trade-offs.
                </p>
                <p>
                  From luxury hotels to industrial manufacturing plants, JADE
                  Coatings has built a reputation for quality, reliability, and
                  environmental responsibility across Sri Lanka.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "Low to Ultra-Low VOC formulations",
                  "No added lead, mercury, or heavy metals",
                  "Non-carcinogenic raw materials throughout",
                  "Partners with global coating science experts",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-jade-500 flex-shrink-0" />
                    <span className="text-charcoal/70 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2015", label: "Year Founded", sub: "9+ years of expertise" },
                { value: "20+", label: "Product SKUs", sub: "Across 5 brand families" },
                { value: "50+", label: "Premium Clients", sub: "Hotels, Military & more" },
                { value: "Zero", label: "Heavy Metals", sub: "No lead or mercury added" },
              ].map((stat) => (
                <div key={stat.label} className="bg-jade-pale rounded-2xl p-6 text-center">
                  <div className="font-display text-3xl font-bold text-jade-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-charcoal text-sm">
                    {stat.label}
                  </div>
                  <div className="text-charcoal/50 text-xs mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-jade-500/20 text-jade-400 text-xs font-semibold uppercase tracking-widest mb-8">
            Our Vision
          </span>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-relaxed italic">
            &ldquo;Our vision is the harmonious integration of water based
            products with the community.&rdquo;
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-jade-500" />
            <Leaf className="w-5 h-5 text-jade-400" />
            <div className="h-px w-16 bg-jade-500" />
          </div>
          <p className="text-jade-300/70 mt-6 text-sm">
            — JADE Coatings, Colour Max Lanka Pvt Ltd
          </p>
        </div>
      </section>

      {/* R&D Policy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-jade-pale text-jade-500 text-xs font-semibold uppercase tracking-widest mb-4">
              R&D Policy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
              Innovation That Never Stops
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-xl mx-auto">
              Our commitment to research and development is the backbone of every
              JADE product on the market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rdPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="group flex gap-5 p-6 bg-jade-pale rounded-2xl hover:bg-jade-500/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-jade-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2">
                      {point.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-jade-pale">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-jade-500/10 text-jade-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Our Journey
            </span>
            <h2 className="font-display text-3xl font-bold text-charcoal">
              A Decade of Growth
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-jade-300" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-8">
                  <div className="w-16 h-16 rounded-full bg-jade-500 flex items-center justify-center flex-shrink-0 z-10 shadow-lg shadow-jade-500/30">
                    <span className="text-white text-xs font-bold">{item.year}</span>
                  </div>
                  <div className="bg-white rounded-xl p-5 flex-1 shadow-sm border border-jade-100">
                    <h3 className="font-semibold text-charcoal mb-2">{item.title}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-charcoal/60 mb-8 text-sm">
            Get in touch with our team to discuss your coating needs or request
            product samples.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-jade-500 hover:bg-jade-400 text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-jade-500/25 hover:scale-105"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
