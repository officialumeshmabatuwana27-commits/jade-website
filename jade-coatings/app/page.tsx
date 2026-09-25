import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import Hero from "@/components/Hero";
import KeyHighlights from "@/components/KeyHighlights";

interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  division: string;
  category: string;
  description: string;
  features: string[];
}

interface Project {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  type: string;
}

const clients = [
  "Prime Lands",
  "Pizza Hut",
  "Sri Lanka Army",
  "El Toro",
  "Conwood",
  "Yokohama TWS",
  "Michelin",
  "Home Lands",
  "Furnicraft",
  "Karapitiya Hospital",
  "Shangri-La",
  "Jetwing Blue",
  "Heritance",
];

function getClientLogo(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes("prime lands")) return "/images/clients/prime-lands.png";
  if (lower.includes("pizza hut")) return "/images/clients/pizza-hut.png";
  if (lower.includes("army")) return "/images/clients/army.png";
  if (lower.includes("amaya")) return "/images/clients/amaya resort.png";
  if (lower.includes("toro")) return "/images/clients/EL toro.png";
  if (lower.includes("conwood")) return "/images/clients/conwood.png";
  if (lower.includes("margosa")) return "/images/clients/Margosa Bay.png";
  if (lower.includes("yokohama")) return "/images/clients/Yokohama.png";
  if (lower.includes("michelin")) return "/images/clients/Michelin.png";
  if (lower.includes("home lands")) return "/images/clients/home lands.png";
  if (lower.includes("furnicraft")) return "/images/clients/furnicraft.png";
  if (lower.includes("karapitiya")) return "/images/clients/karapitiya hospital.png";
  if (lower.includes("shangri")) return "/images/clients/Shangrila hambanthota.png";
  if (lower.includes("heritance")) return "/images/clients/Heritance ahungalla.png";
  return null;
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products as Product[]).slice(0, 6);
  } catch {
    return [];
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.projects as Project[]).slice(0, 3);
  } catch {
    return [];
  }
}

const brandInfo = [
  {
    name: "WOODSHIELD",
    desc: "Premium wood protection & finishing system",
    color: "from-amber-700 to-amber-900",
    count: "7 Products",
  },
  {
    name: "MASOGUARD",
    desc: "Advanced masonry coating & sealing",
    color: "from-stone-600 to-stone-800",
    count: "5 Products",
  },
  {
    name: "ECO-CLEANER",
    desc: "Eco-friendly surface preparation cleaners",
    color: "from-emerald-600 to-emerald-800",
    count: "2 Products",
  },
  {
    name: "DECORATIVES",
    desc: "Architectural floor and roof & wall protection",
    color: "from-teal-700 to-emerald-900",
    count: "2 Products",
  },
  {
    name: "METASHIELD",
    desc: "Industrial metal corrosion protection",
    color: "from-slate-600 to-slate-800",
    count: "1 Product",
  },
  {
    name: "TYRESHIELD",
    desc: "Specialised tyre industry coatings",
    color: "from-gray-700 to-gray-900",
    count: "3 Products",
  },
];

export default async function HomePage() {
  const [products, projects] = await Promise.all([
    getFeaturedProducts(),
    getProjects(),
  ]);

  return (
    <>
      <Hero />
      <KeyHighlights />

      {/* About Snippet */}
      <section className="py-20 bg-jade-pale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-jade-500/10 text-jade-500 text-xs font-semibold uppercase tracking-widest mb-5">
                About Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-6 leading-tight">
                Pioneers in Water-Based Solutions Since{" "}
                <span className="text-jade-500">2015</span>
              </h2>
              <p className="text-charcoal/65 leading-relaxed mb-5">
                JADE Coatings, a brand of Colour Max Lanka Pvt Ltd, has been at
                the forefront of eco-friendly coating technology since 2015. In
                association with global experts, we offer low to ultra-low VOC
                water-borne paints for both domestic and industrial applications.
              </p>
              <p className="text-charcoal/65 leading-relaxed mb-8">
                Our vision is the harmonious integration of water-based products
                with the community — creating coatings that protect your
                surfaces while protecting the world we all share.
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-jade-500 font-semibold hover:text-jade-600 transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Feature boxes */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "🌿",
                  title: "Non-Carcinogenic",
                  desc: "All raw materials are carefully selected to ensure zero cancer-causing agents.",
                },
                {
                  icon: "🏭",
                  title: "Clean Manufacturing",
                  desc: "Our production processes are designed with zero environmental discharge.",
                },
                {
                  icon: "🔬",
                  title: "Continuous R&D",
                  desc: "Ongoing research ensures our formulas stay ahead of global standards.",
                },
                {
                  icon: "🤝",
                  title: "Global Expertise",
                  desc: "Formulated in partnership with international coating science experts.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-5 shadow-sm border border-jade-100 hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h4 className="font-semibold text-charcoal text-sm mb-2">
                    {item.title}
                  </h4>
                  <p className="text-charcoal/55 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-jade-pale text-jade-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Our Brands
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
              Premium Coating Systems
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-xl mx-auto">
              Five specialised product families covering every surface and
              industry need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {brandInfo.map((brand) => (
              <Link
                key={brand.name}
                href={`/products?brand=${brand.name}`}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${brand.color} p-6 h-full min-h-[160px] flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="font-display text-white font-bold text-sm sm:text-base leading-tight mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed">
                      {brand.desc}
                    </p>
                  </div>
                  <span className="text-white/50 text-xs mt-4">
                    {brand.count}
                  </span>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3 bg-jade-500 hover:bg-jade-400 text-white rounded-full font-semibold text-sm transition-all duration-200 shadow-lg shadow-jade-500/25 hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products (from API) */}
      {products.length > 0 && (
        <section className="py-20 bg-jade-pale/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-jade-500/10 text-jade-500 text-xs font-semibold uppercase tracking-widest mb-4">
                  Products
                </span>
                <h2 className="font-display text-3xl font-bold text-charcoal">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-2 text-jade-500 font-semibold text-sm hover:text-jade-600 transition-colors"
              >
                See All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-jade-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                      <div className="h-2 bg-gradient-to-r from-jade-500 to-jade-700" />
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border bg-jade-pale text-jade-600 border-jade-200">
                            {product.brand}
                          </span>
                        </div>
                        <h3 className="font-semibold text-charcoal text-base mb-2 group-hover:text-jade-500 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-charcoal/55 text-sm leading-relaxed flex-1 line-clamp-3">
                          {product.description}
                        </p>
                        <div className="mt-5 flex items-center gap-1 text-jade-500 text-sm font-semibold">
                          View Details{" "}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Snippet */}
      {projects.length > 0 && (
        <section className="py-20 bg-charcoal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-jade-500/20 text-jade-400 text-xs font-semibold uppercase tracking-widest mb-4">
                  Portfolio
                </span>
                <h2 className="font-display text-3xl font-bold text-white">
                  Landmark Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-2 text-jade-400 font-semibold text-sm hover:text-jade-300 transition-colors"
              >
                See All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-jade-400/40 hover:bg-white/10 transition-all"
                >
                  <Award className="w-8 h-8 text-jade-400 mb-4" />
                  <h3 className="font-semibold text-white text-base mb-1">
                    {proj.name}
                  </h3>
                  <p className="text-jade-400 text-xs mb-3">{proj.location}</p>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clients Marquee / Slide Logos */}
      <section className="py-16 bg-gradient-to-b from-white via-jade-pale/20 to-white border-y border-gray-100 overflow-hidden relative">
        {/* Soft edge gradient fades for seamless sliding aesthetic */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-jade-500/10 text-jade-600 text-xs font-bold uppercase tracking-widest mb-2">
            Enterprise & Industry Partners
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
            Trusted by Leading Brands
          </h3>
          <p className="text-charcoal/50 text-xs sm:text-sm mt-1">
            Certified water-borne coating systems chosen by industry pioneers nationwide
          </p>
        </div>

        <div className="flex overflow-hidden py-4">
          <div className="animate-slide-logos flex items-center gap-10 sm:gap-14 whitespace-nowrap pl-4">
            {[...clients, ...clients, ...clients].map((client, i) => {
              const logo = getClientLogo(client);
              return logo ? (
                <div
                  key={i}
                  className="group inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/90 hover:bg-white border border-gray-100 hover:border-jade-300 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  <img
                    src={logo}
                    alt={`${client} Logo`}
                    className="h-12 sm:h-14 max-w-[180px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="font-display font-bold text-base sm:text-lg text-charcoal/80 group-hover:text-jade-600 transition-colors">
                    {client}
                  </span>
                </div>
              ) : (
                <div
                  key={i}
                  className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/80 hover:bg-white border border-gray-100 hover:border-jade-200 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-jade-pale text-jade-600 font-black flex items-center justify-center text-base">
                    {client.charAt(0)}
                  </div>
                  <span className="text-charcoal/70 font-display font-bold text-base sm:text-lg group-hover:text-jade-600 transition-colors">
                    {client}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-jade-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5">
            Ready to Transform Your Project?
          </h2>
          <p className="text-jade-200 mb-10 text-base leading-relaxed">
            Whether it&apos;s a luxury resort, a residential home, or an
            industrial facility — JADE Coatings has the right solution for every
            surface.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-jade-600 rounded-full font-semibold hover:bg-jade-50 transition-colors shadow-xl"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 bg-jade-400/20 text-white rounded-full font-semibold border border-jade-400/30 hover:bg-jade-400/30 transition-colors backdrop-blur-sm"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
