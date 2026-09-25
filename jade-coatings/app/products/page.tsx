"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";

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

const divisions = ["All", "Domestic", "Industrial"] as const;
type Division = (typeof divisions)[number];

const domesticBrands = ["WOODSHIELD", "MASOGUARD", "ECO-CLEANER", "DECORATIVES"];
const industrialBrands = ["METASHIELD", "TYRESHIELD"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDiv, setActiveDiv] = useState<Division>("All");
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const divParam = params.get("division");
    const brandParam = params.get("brand");
    if (divParam === "Domestic" || divParam === "Industrial") {
      setActiveDiv(divParam);
    }
    if (brandParam) {
      setActiveBrand(brandParam);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query =
          activeDiv !== "All" ? `?division=${activeDiv}` : "";
        const res = await fetch(`/api/products${query}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    setActiveBrand("All");
  }, [activeDiv]);

  const currentBrands =
    activeDiv === "Domestic"
      ? domesticBrands
      : activeDiv === "Industrial"
      ? industrialBrands
      : [...domesticBrands, ...industrialBrands];

  const filteredProducts = products.filter((p) => {
    const brandMatch = activeBrand === "All" || p.brand === activeBrand;
    const searchMatch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return brandMatch && searchMatch;
  });

  // Group by brand for the grouped display
  const brandGroups = currentBrands
    .filter((b) => activeBrand === "All" || b === activeBrand)
    .map((brand) => ({
      brand,
      products: filteredProducts.filter((p) => p.brand === brand),
    }))
    .filter((g) => g.products.length > 0);

  return (
    <div className="pt-20">
      {/* 3D Animated Hero Section */}
      <section className="relative py-20 lg:py-28 bg-jade-gradient overflow-hidden">
        {/* Subtle geometric grid backdrop */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Dynamic ambient radial glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-jade-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            Engineered for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-jade-300 to-emerald-100">
              Unrivaled Protection
            </span>
          </h1>

          <p className="text-jade-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Five specialised brand families and 20+ formulations. Explore our interactive before/after comparisons and discover ultra-low VOC solutions engineered for tropical resilience.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Division tabs */}
            <div className="flex items-center gap-1 bg-jade-pale rounded-xl p-1 flex-shrink-0">
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setActiveDiv(div)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeDiv === div
                      ? "bg-jade-500 text-white shadow-md shadow-jade-500/25"
                      : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>

            {/* Brand filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-charcoal/40" />
              {["All", ...currentBrands].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrand(brand)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    activeBrand === brand
                      ? "bg-charcoal text-white border-charcoal"
                      : "border-gray-200 text-charcoal/60 hover:border-jade-300 hover:text-jade-500"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex-1 min-w-48 sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:border-jade-400 focus:ring-2 focus:ring-jade-400/20 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-cream min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-10 h-10 border-4 border-jade-200 border-t-jade-500 rounded-full animate-spin" />
            </div>
          ) : brandGroups.length === 0 ? (
            <div className="text-center py-32 text-charcoal/40">
              <p className="text-lg font-medium">No products found.</p>
              <p className="text-sm mt-2">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {brandGroups.map(({ brand, products: brandProducts }) => (
                <div key={brand}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-display text-2xl font-bold text-charcoal">
                      {brand}
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-charcoal/40 text-sm">
                      {brandProducts.length}{" "}
                      {brandProducts.length === 1 ? "product" : "products"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {brandProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
