import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  Leaf,
  ShieldCheck,
  Calculator,
  Sparkles,
  Palette,
  Package,
} from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import {
  WOOD_STAIN_SHADES,
  WOOD_STAIN_SIZES,
  WOOD_PUTTY_COLORS,
  WOOD_PUTTY_SIZES,
  SANDING_SEALER_SIZES,
  SANDING_SEALER_COLORS,
  TOP_COAT_COLORS,
  TOP_COAT_FINISHES,
  TOP_COAT_SIZES,
  WOODSHIELD_ALL_IN_ONE_COLORS,
  WOODSHIELD_ALL_IN_ONE_FINISH,
  WOODSHIELD_ALL_IN_ONE_SIZES,
  FLOOR_COAT_COLORS,
  FLOOR_COAT_FINISHES,
  FLOOR_COAT_SIZES,
  WET_LOOK_PAVING_SEALER_COLORS,
  WET_LOOK_PAVING_SEALER_FINISHES,
  WET_LOOK_PAVING_SEALER_SIZES,
  MASOGUARD_PRIMER_COLORS,
  MASOGUARD_PRIMER_SIZES,
  MASOGUARD_ALL_IN_ONE_COLORS,
  MASOGUARD_ALL_IN_ONE_FINISH,
  MASOGUARD_ALL_IN_ONE_SIZES,
  MASOGUARD_TOP_COAT_COLORS,
  MASOGUARD_TOP_COAT_FINISHES,
  MASOGUARD_TOP_COAT_SIZES,
  ROOF_WALL_SHIELD_COLORS,
  ROOF_WALL_SHIELD_FINISHES,
  ROOF_WALL_SHIELD_SIZES,
  EASY_FLOOR_COLORS,
  EASY_FLOOR_FINISHES,
  EASY_FLOOR_SIZES,
  UNIVERSAL_CLEANER_SIZES,
  ANTI_CORROSIVE_COLORS,
  ANTI_CORROSIVE_SIZES,
  TYRESHIELD_ALL_IN_ONE_COLORS,
} from "@/components/ProductCard";

interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  division: string;
  category: string;
  description: string;
  features: string[];
  tutorialUrl?: string;
  shades?: string[];
  colors?: string[];
  finishes?: string[];
  sizes?: string[];
  specs?: Record<string, string>;
  colorNote?: string;
}

interface Props {
  params: { slug: string };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — ${product.brand} | JADE Coatings`,
    description: product.description,
  };
}

const brandAccents: Record<string, string> = {
  WOODSHIELD: "from-amber-600 to-amber-800",
  MASOGUARD: "from-stone-500 to-stone-700",
  "ECO-CLEANER": "from-emerald-500 to-emerald-700",
  METASHIELD: "from-slate-600 to-slate-800",
  TYRESHIELD: "from-gray-600 to-gray-800",
  DECORATIVES: "from-teal-600 to-emerald-800",
};

const divisionColors: Record<string, string> = {
  Domestic: "bg-jade-pale text-jade-600",
  Industrial: "bg-amber-50 text-amber-700",
};

function getProductSliderConfig(product: Product): {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
} {
  const lowerName = product.name.toLowerCase();
  const lowerSlug = product.slug.toLowerCase();

  if (lowerName.includes("roof") || lowerSlug.includes("roof") || lowerName.includes("wall")) {
    return {
      beforeImage: "/images/products/JADE Roof & WAll Shield Before.png",
      afterImage: "/images/products/JADE Roof & WAll Shield After.png",
      beforeLabel: "Damp Moldy Wall",
      afterLabel: "JADE Shield Coated",
    };
  }
  if (lowerName.includes("easy floor") || lowerSlug.includes("easy-floor")) {
    return {
      beforeImage: "/images/products/JADE Easy Floor Before.png",
      afterImage: "/images/products/JADE Easy Floor After.png",
      beforeLabel: "Damaged Peeling Floor",
      afterLabel: "JADE Easy Floor Finish",
    };
  }
  if (lowerName.includes("primer") || lowerSlug.includes("primer")) {
    return {
      beforeImage: "/images/products/Masoguard Primer Before.png",
      afterImage: "/images/products/Masoguard Primer After.png",
      beforeLabel: "Unfinished Plaster Wall",
      afterLabel: "Masoguard Primer Sealed",
    };
  }
  if (lowerName.includes("paving") || lowerSlug.includes("paving") || lowerName.includes("wet look")) {
    return {
      beforeImage: "/images/products/Wet Look Paving Sealer Before.png",
      afterImage: "/images/products/Wet Look Paving Sealer After.png",
      beforeLabel: "Chalky Dull Pavers",
      afterLabel: "Permanent Wet-Look Gloss",
    };
  }
  if (lowerName.includes("anti corrosive") || lowerSlug.includes("anti-corrosive")) {
    return {
      beforeImage: "/images/products/Anti Corrosive - Black Before.png",
      afterImage: "/images/products/Anti Corrosive - Black After.png",
      beforeLabel: "Rusted Corroded Steel",
      afterLabel: "Jet-Black Inhibited Shield",
    };
  }
  if (lowerName.includes("wax stick") || lowerSlug.includes("wax-stick")) {
    return {
      beforeImage: "/images/products/wax stick black before.png",
      afterImage: "/images/products/wax stick black after.png",
      beforeLabel: "Damaged Solid Rubber",
      afterLabel: "Wax Stick Repaired",
    };
  }
  if (product.brand === "TYRESHIELD" && (lowerName.includes("all in one") || lowerSlug.includes("all-in-one"))) {
    return {
      beforeImage: "/images/products/tyreshield all in one before.png",
      afterImage: "/images/products/tyreshield all in one after.png",
      beforeLabel: "Buffed Damaged Tire",
      afterLabel: "TyreShield Restored",
    };
  }
  if (product.brand === "TYRESHIELD" && (lowerName.includes("bladder") || lowerSlug.includes("bladder"))) {
    return {
      beforeImage: "/images/products/tyreshield bladder releaser before.png",
      afterImage: "/images/products/tyreshield bladder releaser after.png",
      beforeLabel: "Green Tire Internal",
      afterLabel: "Bladder Release Coated",
    };
  }
  if (product.brand === "MASOGUARD" && (lowerName.includes("all in one") || lowerSlug.includes("all-in-one"))) {
    return {
      beforeImage: "/images/products/Masoguard All in one Before.png",
      afterImage: "/images/products/After Masoguard All in one After.png",
      beforeLabel: "Weathered Cracked Substrate",
      afterLabel: "Masoguard All in One Shield",
    };
  }
  if (product.brand === "MASOGUARD" && (lowerName.includes("top coat") || lowerSlug.includes("top-coat"))) {
    return {
      beforeImage: "/images/products/Masoguard top coat before.png",
      afterImage: "/images/products/Masoguard top coat after.png",
      beforeLabel: "Matte Unsealed Surface",
      afterLabel: "Protective Gloss Top Coat",
    };
  }
  if (product.brand === "MASOGUARD") {
    return {
      beforeImage: "/images/products/Before after.jpg",
      afterImage: "/images/products/Masoguard All in one.jpg",
      beforeLabel: "Porous Masonry",
      afterLabel: "MASOGUARD Barrier",
    };
  }
  if (product.brand === "WOODSHIELD" && (lowerName.includes("all in one") || lowerSlug.includes("all-in-one"))) {
    return {
      beforeImage: "/images/products/JADE woodshield all in one before.png",
      afterImage: "/images/products/JADE woodshield all in one after.png",
      beforeLabel: "Weathered Raw Wood",
      afterLabel: "Woodshield All in One",
    };
  }
  if (product.brand === "WOODSHIELD" && (lowerName.includes("sanding sealer") || lowerSlug.includes("sanding-sealer"))) {
    return {
      beforeImage: "/images/products/JADE woodshield sanding sealer before.png",
      afterImage: "/images/products/JADE woodshield sanding sealer after.png",
      beforeLabel: "Porous Open Grain",
      afterLabel: "Glass-Sealed Foundation",
    };
  }
  if (product.brand === "WOODSHIELD" && (lowerName.includes("putty") || lowerSlug.includes("putty"))) {
    return {
      beforeImage: "/images/products/JADE woodshield wood putty before.png",
      afterImage: "/images/products/JADE woodshield wood putty after.png",
      beforeLabel: "Blemished Raw Timber",
      afterLabel: "Filled & Sanded Smooth",
    };
  }
  if (product.brand === "WOODSHIELD" && (lowerName.includes("stain") || lowerSlug.includes("stain"))) {
    return {
      beforeImage: "/images/products/JADE Woodshield stain before.png",
      afterImage: "/images/products/JADE Woodshield stain after.png",
      beforeLabel: "Pale Dry Raw Wood",
      afterLabel: "Rich Stained Lustre",
    };
  }
  if (product.brand === "WOODSHIELD" && (lowerName.includes("top coat") || lowerSlug.includes("top-coat"))) {
    return {
      beforeImage: "/images/products/JADE woodshield top coat before.png",
      afterImage: "/images/products/JADE woodshield top coat After.png",
      beforeLabel: "Unprotected Wood",
      afterLabel: "High-Clarity Top Shield",
    };
  }
  if (product.brand === "WOODSHIELD" && (lowerName.includes("floor") || lowerSlug.includes("floor"))) {
    return {
      beforeImage: "/images/products/JADE woodshield top coat before.png",
      afterImage: "/images/products/JADE woodshield top coat After.png",
      beforeLabel: "Scuffed Living Timber",
      afterLabel: "Satin Abrasion Armor",
    };
  }
  if (lowerName.includes("cleaner") || lowerSlug.includes("cleaner")) {
    return {
      beforeImage: "/images/products/universal cleaner before.png",
      afterImage: "/images/products/universal cleaner after.png",
      beforeLabel: "Greasy Soot Build-Up",
      afterLabel: "Cleaned Residue-Free",
    };
  }
  if (product.brand === "WOODSHIELD") {
    return {
      beforeImage: "/images/products/Before after.jpg",
      afterImage: "/images/products/Woodshield All in One new.jpg",
      beforeLabel: "Weathered Wood",
      afterLabel: "WOODSHIELD Finish",
    };
  }
  return {
    beforeImage: "/images/products/Before after.jpg",
    afterImage: "/images/products/Woodshield All in One.jpg",
    beforeLabel: "Raw Surface",
    afterLabel: `${product.brand} Finish`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const accentGradient =
    brandAccents[product.brand] || "from-jade-500 to-jade-700";
  const divBadge = divisionColors[product.division] || "bg-gray-100 text-gray-600";
  const sliderConfig = getProductSliderConfig(product);
  const isPutty =
    product.name.toLowerCase().includes("putty") ||
    product.category?.toLowerCase().includes("putty") ||
    product.slug.toLowerCase().includes("putty");
  const isCleaner =
    product.name.toLowerCase().includes("cleaner") ||
    product.category?.toLowerCase().includes("cleaner") ||
    product.slug.toLowerCase().includes("cleaner");
  const isEasyFloor =
    product.slug.includes("easy-floor") ||
    product.name.toLowerCase().includes("easy floor");
  const isAntiCorrosive =
    product.slug.includes("anti-corrosive") ||
    product.name.toLowerCase().includes("anti corrosive");
  const isWaxStick =
    product.slug.includes("wax-stick") ||
    product.name.toLowerCase().includes("wax stick");
  const isTyreshieldAllInOne =
    product.brand === "TYRESHIELD" &&
    (product.slug.includes("all-in-one") ||
      product.name.toLowerCase().includes("all in one"));
  const isBladderReleaser =
    product.brand === "TYRESHIELD" &&
    (product.slug.includes("bladder-releaser") ||
      product.name.toLowerCase().includes("bladder releaser"));

  return (
    <div className="pt-24 pb-20 bg-gray-50/50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-charcoal/50 flex-wrap">
            <Link href="/" className="hover:text-jade-500 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-jade-500 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?brand=${product.brand}`}
              className="hover:text-jade-500 transition-colors font-medium text-charcoal/70"
            >
              {product.brand}
            </Link>
            <span>/</span>
            <span className="text-jade-700 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Visual Panel with Transparent Glassmorphic Before / After Slider */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-gray-200/80 shadow-md">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/70 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-jade-500" />
                  Interactive Finish Inspector
                </span>
                <span className="text-[11px] bg-jade-50 text-jade-700 font-semibold px-2.5 py-0.5 rounded-full">
                  Drag glass slider to compare
                </span>
              </div>
              <BeforeAfterSlider
                beforeImage={sliderConfig.beforeImage}
                afterImage={sliderConfig.afterImage}
                beforeLabel={sliderConfig.beforeLabel}
                afterLabel={sliderConfig.afterLabel}
                brand={product.brand}
                compact={false}
              />
            </div>

            {/* Substrate & Eco specs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                <Leaf className="w-6 h-6 text-jade-500 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-charcoal">Water-Based Formula</div>
                  <div className="text-[11px] text-charcoal/50">Ultra Low VOC · Non-toxic</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-jade-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-charcoal">Long-Term Shield</div>
                  <div className="text-[11px] text-charcoal/50">UV & weather-resistant</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-md">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-charcoal text-white">
                {product.brand}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${divBadge}`}>
                {product.division}
              </span>
              <span className="text-xs text-charcoal/60 bg-gray-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-charcoal mb-4">
              {product.name}
            </h1>

            <p className="text-charcoal/70 leading-relaxed mb-6 text-base">
              {product.description}
            </p>

            {/* 11 Available Shades Gallery & Specs for Wood Stains */}
            {(product.slug.includes("wood-stains") || product.name.toLowerCase().includes("stain") || Boolean(product.shades && product.shades.length > 0)) && (
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-stone-900/40 rounded-3xl border border-amber-200/80 dark:border-amber-900/50 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Wood Stain Shades
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          11 authentic deep-penetrating organic wood tones
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      11 Shades
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {WOOD_STAIN_SHADES.map((shade) => (
                      <div
                        key={shade.name}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/40 shadow-xs flex items-center gap-3 hover:border-amber-400 hover:shadow-sm transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 border border-black/15 shadow-inner"
                          style={{ backgroundColor: shade.color }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                            {shade.name}
                          </div>
                          <div className="text-[10px] text-charcoal/55 dark:text-slate-400 truncate">
                            {shade.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {WOOD_STAIN_SIZES.map((size) => (
                      <div
                        key={size}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/40 text-center shadow-xs"
                      >
                        <div className="font-extrabold text-base text-amber-950 dark:text-amber-100">
                          {size}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Woodwork & Application Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1">
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🪵 Ideal Woodwork: <span className="font-normal text-charcoal/80 dark:text-slate-300">Doors, windows, furniture, and plywood.</span>
                  </div>
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    ⏱️ Foundational Layer: <span className="font-normal text-charcoal/80 dark:text-slate-300">Specifically designed for application prior to your final topcoat.</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5 Available Colors & Sizes Gallery & Specs for Wood Putty */}
            {(product.slug.includes("wood-putty") || product.name.toLowerCase().includes("putty")) && (
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-stone-900/40 rounded-3xl border border-amber-200/80 dark:border-amber-900/50 shadow-sm space-y-5">
                {/* Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Colors
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Formulated to blend seamlessly with natural timber surfaces
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      5 Colors
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {WOOD_PUTTY_COLORS.map((col) => (
                      <div
                        key={col.name}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/40 shadow-xs flex items-center gap-3 hover:border-amber-400 hover:shadow-sm transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 border border-black/15 shadow-inner"
                          style={{ backgroundColor: col.color }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                            {col.name}
                          </div>
                          <div className="text-[10px] text-charcoal/55 dark:text-slate-400 truncate">
                            {col.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Sizes */}
                <div className="pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {WOOD_PUTTY_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Tub / Can
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Woodwork & Application Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1">
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🪵 Ideal Woodwork: <span className="font-normal text-charcoal/80 dark:text-slate-300">Doors, windows, furniture, MDF, and plywood.</span>
                  </div>
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    ⏱️ Recommended Application: <span className="font-normal text-charcoal/80 dark:text-slate-300">Specifically designed for application prior to using sanding sealers and wood stains.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Sanding Sealer Showcase: Available Color, Sizes & Application */}
            {(product.slug.includes("sanding-sealer") || product.name.toLowerCase().includes("sanding sealer")) && (
              <div className="mb-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-stone-900/40 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/50 shadow-sm space-y-5">
                {/* Available Color */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Finish & Color
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Crystal-clear protective grain seal
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200">
                      Clear Only
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-emerald-200/70 dark:border-emerald-900/40 shadow-xs max-w-xs">
                    <span className="w-7 h-7 rounded-lg flex-shrink-0 bg-white border border-gray-300 shadow-inner flex items-center justify-center text-xs font-bold text-emerald-600">
                      ✨
                    </span>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Clear
                      </div>
                      <div className="text-[10px] text-charcoal/55 dark:text-slate-400">
                        Translucent, non-yellowing grain sealer
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Sizes */}
                <div className="pt-4 border-t border-emerald-200/60 dark:border-emerald-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {SANDING_SEALER_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-emerald-200/80 dark:border-emerald-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Woodwork & Application Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-emerald-200/60 dark:border-emerald-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1">
                  <div className="font-semibold text-emerald-950 dark:text-emerald-300">
                    🪵 Ideal Woodwork: <span className="font-normal text-charcoal/80 dark:text-slate-300">Protecting and preparing wooden doors, windows, furniture, MDF, plywood, and wooden brush handles.</span>
                  </div>
                  <div className="font-semibold text-emerald-950 dark:text-emerald-300">
                    ⏱️ Recommended Application: <span className="font-normal text-charcoal/80 dark:text-slate-300">Applied directly onto well-prepared bare wood or seamlessly layered over interior and exterior wood stains prior to final topcoats.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Woodshield Top Coat Showcase: Available Color, Finishes, Sizes & Application */}
            {((product.slug.includes("top-coat") || product.name.toLowerCase().includes("top coat")) && product.brand === "WOODSHIELD") && (
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-stone-900/40 rounded-3xl border border-amber-200/80 dark:border-amber-900/50 shadow-sm space-y-5">
                {/* Available Color (Clear Only) */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Color
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Formulated exclusively in clear to protect and showcase underlying wood & stains
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      Clear Only
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 shadow-xs max-w-sm">
                    <span className="w-7 h-7 rounded-lg flex-shrink-0 bg-white border border-gray-300 shadow-inner flex items-center justify-center text-xs font-bold text-amber-600">
                      ✨
                    </span>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Clear
                      </div>
                      <div className="text-[10px] text-charcoal/55 dark:text-slate-400">
                        High-clarity, non-yellowing protective topcoat (Clear only)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Finishes */}
                <div className="pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Protective Finishes
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Clear protective sheen options to match any woodwork design
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      3 Finishes
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {TOP_COAT_FINISHES.map((f) => (
                      <div
                        key={f}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 text-center shadow-xs"
                      >
                        <div className="text-sm font-extrabold text-amber-950 dark:text-amber-100 font-display">
                          {f}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          {f === "Gloss" ? "High Lustre" : f === "Semi Gloss" ? "Soft Sheen" : "Natural Non-Reflective"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Sizes */}
                <div className="pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {TOP_COAT_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Woodwork & Application Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1">
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🪵 Ideal Woodwork: <span className="font-normal text-charcoal/80 dark:text-slate-300">Preserving and beautifying wooden doors, windows, and furniture.</span>
                  </div>
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    ⏱️ Recommended Application: <span className="font-normal text-charcoal/80 dark:text-slate-300">Specifically designed to be applied over Woodshield stains, serving as a premium protective topcoat that beautifully complements our wide selection of popular colors.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Woodshield All in One Showcase: 9 Available Colors, Semi Gloss Finish, Sizes & 3-in-1 Guidance */}
            {(product.slug.includes("all-in-one") && product.brand === "WOODSHIELD") && (
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-stone-900/40 rounded-3xl border border-amber-200/80 dark:border-amber-900/50 shadow-sm space-y-5">
                {/* 9 Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Colors
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Rich semi-gloss wood tones for complete timber restoration
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      9 Colors
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {WOODSHIELD_ALL_IN_ONE_COLORS.map((col) => (
                      <div
                        key={col.name}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/40 shadow-xs flex items-center gap-3 hover:border-amber-400 hover:shadow-sm transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 border border-black/15 shadow-inner"
                          style={{ backgroundColor: col.color }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                            {col.name}
                          </div>
                          <div className="text-[10px] text-charcoal/55 dark:text-slate-400 truncate">
                            {col.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Finish */}
                <div className="pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                        Available Finish
                      </h4>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-0.5 rounded-full bg-amber-200/80 text-amber-950 dark:bg-amber-800/60 dark:text-amber-100">
                      Semi Gloss Only
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 shadow-xs flex items-center gap-3 max-w-sm">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
                      ✨
                    </div>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Semi Gloss Finish
                      </div>
                      <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                        Lustrous, self-leveling protection combining base, stain, and topcoat
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {WOODSHIELD_ALL_IN_ONE_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Woodwork & Surface Versatility Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🪵 Ideal Woodwork: <span className="font-normal text-charcoal/80 dark:text-slate-300">Wooden doors, windows, ceilings, furniture, MDF, plywood, and timber decks.</span>
                  </div>
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🔄 3-in-1 Innovation: <span className="font-normal text-charcoal/80 dark:text-slate-300">Seamlessly functions as a base, stain, and topcoat in a single application.</span>
                  </div>
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    ⚡ Direct Surface Versatility: <span className="font-normal text-charcoal/80 dark:text-slate-300">Direct application over previously treated NC (Nitrocellulose), PU (Polyurethane), and Alkyd finishes, eliminating the need for laborious scraping or sanding down to bare wood.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Woodshield Floor Coat Showcase: Clear Color, Semi Gloss Finish, Pack Sizes & Guidance */}
            {(product.slug.includes("floor-coat") && product.brand === "WOODSHIELD") && (
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/20 dark:to-stone-900/40 rounded-3xl border border-amber-200/80 dark:border-amber-900/50 shadow-sm space-y-5">
                {/* Available Color & Finish */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Color & Finish
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          High-clarity decorative semi-gloss protection for heavy foot traffic
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      Clear • Semi Gloss
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                    <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 shadow-xs flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-gray-300 dark:border-slate-700 shadow-inner flex items-center justify-center text-xs font-bold text-amber-700">
                        ✨
                      </div>
                      <div>
                        <div className="text-xs font-bold text-charcoal dark:text-white">
                          Clear Only
                        </div>
                        <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                          Non-yellowing, crystal-clear transparent floor film
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 shadow-xs flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
                        🛡️
                      </div>
                      <div>
                        <div className="text-xs font-bold text-charcoal dark:text-white">
                          Semi Gloss Only
                        </div>
                        <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                          Smooth soft sheen with optimal abrasion resistance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-amber-200/60 dark:border-amber-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {FLOOR_COAT_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-amber-200/80 dark:border-amber-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Surfaces & High-Traffic Footwear Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🪵 Ideal Surfaces: <span className="font-normal text-charcoal/80 dark:text-slate-300">Wooden floors, timber decks, and high-traffic areas.</span>
                  </div>
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🚶 Heavy Foot-Traffic Resilience: <span className="font-normal text-charcoal/80 dark:text-slate-300">Bonds securely to provide a tough, hard-wearing protective layer specifically engineered to resist scuffs, scratches, and daily impacts.</span>
                  </div>
                  <div className="font-semibold text-amber-950 dark:text-amber-300">
                    🌿 Algal & Fungal Resistance: <span className="font-normal text-charcoal/80 dark:text-slate-300">Actively prevents the growth of algae, mold, and mildew, ensuring a hygienic and enduring surface.</span>
                  </div>
                </div>
              </div>
            )}

            {/* MASOGUARD Wet Look Paving Sealer Showcase: Clear Color, Wet Finish, Pack Sizes & Guidance */}
            {(product.slug.includes("paving-sealer") || product.name.toLowerCase().includes("paving sealer") || product.name.toLowerCase().includes("wet look")) && (
              <div className="mb-8 p-6 bg-gradient-to-br from-stone-50 to-emerald-50/40 dark:from-stone-900/40 dark:to-emerald-950/20 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
                {/* Available Color & Finish */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-stone-700 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Color & Finish
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Permanent wet-look gloss protection for masonry, pavers, and stone
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-200">
                      Clear • Wet Finish
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                    <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-gray-300 dark:border-slate-700 shadow-inner flex items-center justify-center text-xs font-bold text-stone-700">
                        ✨
                      </div>
                      <div>
                        <div className="text-xs font-bold text-charcoal dark:text-white">
                          Clear Only
                        </div>
                        <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                          Deep-penetrating non-yellowing moisture barrier
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-sm">
                        💧
                      </div>
                      <div>
                        <div className="text-xs font-bold text-charcoal dark:text-white">
                          Wet Finish Only
                        </div>
                        <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                          Lustrous permanent "just washed" wet-look enhancement
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-stone-700 dark:text-stone-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {WET_LOOK_PAVING_SEALER_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Substrates & High-Traffic Footwear/Vehicular Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-stone-200/60 dark:border-stone-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🧱 Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Interlocking bricks, cement pavers, natural stones, clay tiles, and unglazed surfaces (slate, terracotta, ceramic, marble, and tile grout).</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🚗 Hot Tire Mark Resistance: <span className="font-normal text-charcoal/80 dark:text-slate-300">Specially formulated to withstand vehicular traffic and resist hot tire pick-up on driveways and garages.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    ✨ Self-Cleaning Technology: <span className="font-normal text-charcoal/80 dark:text-slate-300">Advanced dirt pick-up resistance naturally sheds grime and maintains a pristine appearance over time.</span>
                  </div>
                </div>
              </div>
            )}

            {/* MASOGUARD Primer Showcase: Grey Color, Pack Sizes & Masonry Guidance */}
            {(product.brand === "MASOGUARD" && (product.slug.includes("primer") || product.name.toLowerCase().includes("primer"))) && (
              <div className="mb-8 p-6 bg-gradient-to-br from-stone-50 to-slate-100/50 dark:from-stone-900/40 dark:to-slate-900/30 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
                {/* Available Color */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-stone-700 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Color
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Pigmented foundational masonry primer for interior and exterior surfaces
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-200">
                      Grey Only
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 shadow-xs max-w-sm">
                    <span className="w-7 h-7 rounded-lg flex-shrink-0 bg-[#8B959E] border border-gray-400 shadow-inner flex items-center justify-center text-xs font-bold text-white">
                      🧱
                    </span>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Grey
                      </div>
                      <div className="text-[10px] text-charcoal/55 dark:text-slate-400">
                        Pigmented opaque foundational masonry primer (Grey only)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-stone-700 dark:text-stone-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {MASOGUARD_PRIMER_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Substrates & Foundation Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-stone-200/60 dark:border-stone-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🧱 Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Clay tiles, interlocking bricks, cement, cellulose fiber boards, and general masonry applications.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🎯 Superior Surface Preparation: <span className="font-normal text-charcoal/80 dark:text-slate-300">Delivers optimal filling, sealing, and priming properties to create the perfect foundational layer for subsequent topcoats.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🌿 Algal & Fungal Resistance: <span className="font-normal text-charcoal/80 dark:text-slate-300">Actively prevents the growth of algae, mold, and mildew, preserving the integrity and cleanliness of the surface.</span>
                  </div>
                </div>
              </div>
            )}

            {/* MASOGUARD All in One Showcase: 6 Colors, Semi Gloss Finish, Pack Sizes & Timber-Effect Guidance */}
            {(product.brand === "MASOGUARD" && (product.slug.includes("all-in-one") || product.name.toLowerCase().includes("all in one"))) && (
              <div className="mb-8 p-6 bg-gradient-to-br from-stone-50 to-slate-100/50 dark:from-stone-900/40 dark:to-slate-900/30 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
                {/* 6 Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-stone-700 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Colors
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Authentic timber-effect shades for interior and exterior masonry
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-200">
                      6 Colors
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {MASOGUARD_ALL_IN_ONE_COLORS.map((col) => (
                      <div
                        key={col.name}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700/60 shadow-xs flex items-center gap-3 hover:border-stone-400 hover:shadow-sm transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 border border-black/15 shadow-inner"
                          style={{ backgroundColor: col.color }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                            {col.name}
                          </div>
                          <div className="text-[10px] text-charcoal/50 dark:text-slate-400 truncate">
                            {col.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Finish */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-stone-700 dark:text-stone-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
                        Available Protective Finish
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Semi Gloss Only
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-3 max-w-sm">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-sm">
                      ✨
                    </div>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Semi Gloss
                      </div>
                      <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                        Smooth soft sheen timber effect with high UV & dirt pick-up resistance
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-stone-700 dark:text-stone-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {MASOGUARD_ALL_IN_ONE_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Substrates & Timber Effect Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-stone-200/60 dark:border-stone-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🧱 Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Cement, concrete, general masonry surfaces, plasterboards, and cement or cellulose fiber boards.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🪵 Authentic Timber Effect: <span className="font-normal text-charcoal/80 dark:text-slate-300">Formulated to create a stunning timber aesthetic on masonry; specifically designed for seamless application over Masoguard Primer.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🌊 Salt Spray & Weather Defense: <span className="font-normal text-charcoal/80 dark:text-slate-300">Maintains deep vibrant hues over time with robust protection against harsh coastal/saline environments and advanced self-cleaning dirt shed technology.</span>
                  </div>
                </div>
              </div>
            )}

            {/* MASOGUARD Top Coat Showcase: Clear Color, Semi Gloss Finish, Pack Sizes & Topcoat Guidance */}
            {((product.slug.includes("top-coat") || product.name.toLowerCase().includes("top coat")) && product.brand === "MASOGUARD") && (
              <div className="mb-8 p-6 bg-gradient-to-br from-stone-50 to-slate-100/50 dark:from-stone-900/40 dark:to-slate-900/30 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
                {/* Available Color (Clear Only) */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-stone-700 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Color
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Formulated exclusively in clear to protect and enhance masonry colors
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-stone-200">
                      Clear Only
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 shadow-xs max-w-sm">
                    <span className="w-7 h-7 rounded-lg flex-shrink-0 bg-white border border-gray-300 shadow-inner flex items-center justify-center text-xs font-bold text-stone-600">
                      ✨
                    </span>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Clear
                      </div>
                      <div className="text-[10px] text-charcoal/55 dark:text-slate-400">
                        Crystal-clear high-protection masonry topcoat (Clear only)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Finish */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-stone-700 dark:text-stone-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
                        Available Protective Finish
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Semi Gloss Only
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-3 max-w-sm">
                    <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center font-bold text-sm">
                      ✨
                    </div>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Semi Gloss
                      </div>
                      <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                        Lustrous protective clear sheen with advanced UV & salt spray defense
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-stone-700 dark:text-stone-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {MASOGUARD_TOP_COAT_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-stone-200/80 dark:border-stone-800 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Substrates & Topcoat Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-stone-200/60 dark:border-stone-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🧱 Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Preserving and elevating cement, concrete, general masonry surfaces, and plasterboards.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🛡️ Recommended Application: <span className="font-normal text-charcoal/80 dark:text-slate-300">Specifically designed to be applied as a premium protective topcoat over Masoguard All in One, beautifully complementing our wide selection of popular colors.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    🌊 Color Preservation & Salt Spray Defense: <span className="font-normal text-charcoal/80 dark:text-slate-300">Protects the vibrancy of underlying colors from fading while offering robust defense against harsh coastal or saline environments.</span>
                  </div>
                  <div className="font-semibold text-stone-950 dark:text-stone-300">
                    ✨ Self-Cleaning Technology: <span className="font-normal text-charcoal/80 dark:text-slate-300">Engineered with advanced dirt pick-up resistance, allowing the surface to naturally shed grime and maintain a pristine appearance over time.</span>
                  </div>
                </div>
              </div>
            )}

            {/* JADE Roof & Wall Shield Showcase: 5 Colors, Matt Finish, Pack Sizes & 4x Coverage Guidance */}
            {(product.slug.includes("roof") || product.name.toLowerCase().includes("roof") || product.name.toLowerCase().includes("wall shield")) && (
              <div className="mb-8 p-6 bg-gradient-to-br from-teal-50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/30 rounded-3xl border border-teal-200/80 dark:border-teal-900/50 shadow-sm space-y-5">
                {/* 5 Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Colors
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Highly durable, fade-resistant exterior protective decorative shades
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-200 text-teal-950 dark:bg-teal-900/60 dark:text-teal-200">
                      5 Colors
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ROOF_WALL_SHIELD_COLORS.map((col) => (
                      <div
                        key={col.name}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#1A2333] border border-teal-200/70 dark:border-teal-800/60 shadow-xs flex items-center gap-3 hover:border-teal-400 hover:shadow-sm transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 border border-black/15 shadow-inner"
                          style={{ backgroundColor: col.color }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                            {col.name}
                          </div>
                          <div className="text-[10px] text-charcoal/50 dark:text-slate-400 truncate">
                            {col.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Finish */}
                <div className="pt-4 border-t border-teal-200/60 dark:border-teal-900/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 dark:text-teal-200">
                        Available Protective Finish
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-teal-900 dark:text-teal-300">
                      Matt Only
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-teal-200/80 dark:border-teal-900/40 shadow-xs flex items-center gap-3 max-w-sm">
                    <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                      ✨
                    </div>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Matt
                      </div>
                      <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                        Smooth non-reflective decorative finish specifically engineered to resist dirt & weathering
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-teal-200/60 dark:border-teal-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 dark:text-teal-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {ROOF_WALL_SHIELD_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-teal-200/80 dark:border-teal-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Substrates & 4X Coverage Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-teal-200/60 dark:border-teal-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    🧱 Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Masonry walls and a wide variety of roofing materials, including cement, terracotta, clay tiles, and asbestos sheets.</span>
                  </div>
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    ⚡ 4X Coverage Efficiency: <span className="font-normal text-charcoal/80 dark:text-slate-300">Formulated for maximum efficiency, it delivers an impressive four times the coverage of standard emulsion paints.</span>
                  </div>
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    🛡️ Self-Priming & Superior Adhesion: <span className="font-normal text-charcoal/80 dark:text-slate-300">Bonds securely to raw and previously painted surfaces without requiring a separate primer layer.</span>
                  </div>
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    🌿 Algal & Fungal Resistance: <span className="font-normal text-charcoal/80 dark:text-slate-300">Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring finish.</span>
                  </div>
                </div>
              </div>
            )}

            {/* JADE Easy Floor Showcase: 6 Colors, Semi Gloss Finish, Pack Sizes & Substrate Sealing Guidance */}
            {isEasyFloor && (
              <div className="mb-8 p-6 bg-gradient-to-br from-teal-50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/30 rounded-3xl border border-teal-200/80 dark:border-teal-900/50 shadow-sm space-y-5">
                {/* 6 Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Colors
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Highly durable, premium protective floor shades
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-teal-200 text-teal-950 dark:bg-teal-900/60 dark:text-teal-200">
                      6 Colors
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {EASY_FLOOR_COLORS.map((col) => (
                      <div
                        key={col.name}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#1A2333] border border-teal-200/70 dark:border-teal-800/60 shadow-xs flex items-center gap-3 hover:border-teal-400 hover:shadow-sm transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 border border-black/15 shadow-inner"
                          style={{ backgroundColor: col.color }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                            {col.name}
                          </div>
                          <div className="text-[10px] text-charcoal/50 dark:text-slate-400 truncate">
                            {col.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Finish */}
                <div className="pt-4 border-t border-teal-200/60 dark:border-teal-900/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 dark:text-teal-200">
                        Available Protective Finish
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-teal-900 dark:text-teal-300">
                      Semi Gloss Only
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-teal-200/80 dark:border-teal-900/40 shadow-xs flex items-center gap-3 max-w-sm">
                    <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                      ✨
                    </div>
                    <div>
                      <div className="text-xs font-bold text-charcoal dark:text-white">
                        Semi Gloss
                      </div>
                      <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                        Smooth, elegant semi-gloss finish engineered for superior adhesion, wear, and effortless washability
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-teal-200/60 dark:border-teal-900/40">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-950 dark:text-teal-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {EASY_FLOOR_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-teal-200/80 dark:border-teal-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Substrates & Foundation Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-teal-200/60 dark:border-teal-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    🧱 Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Both interior and exterior masonry surfaces.</span>
                  </div>
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    🏗️ Exceptional Sealing & Priming: <span className="font-normal text-charcoal/80 dark:text-slate-300">Delivers exceptional sealing and priming properties, creating the perfect foundation for subsequent topcoats.</span>
                  </div>
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    🛡️ Superior Adhesion & Resilience: <span className="font-normal text-charcoal/80 dark:text-slate-300">Bonds securely to the substrate, providing a tough, hard-wearing base layer that resists scuffs, scratches, and common chemicals.</span>
                  </div>
                  <div className="font-semibold text-teal-950 dark:text-teal-300">
                    🌿 Algal & Fungal Defense: <span className="font-normal text-charcoal/80 dark:text-slate-300">Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring finish.</span>
                  </div>
                </div>
              </div>
            )}

            {/* ECO-CLEANER Universal Cleaner Showcase: Pack Sizes & 3-in-1 Substrate Preparation Guidance */}
            {isCleaner && (
              <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/30 rounded-3xl border border-green-200/80 dark:border-green-900/50 shadow-sm space-y-5">
                {/* Available Pack Sizes */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-green-700 dark:text-green-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-green-950 dark:text-green-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {UNIVERSAL_CLEANER_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-green-200/80 dark:border-green-900/40 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Substrate Preparation Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-green-200/60 dark:border-green-900/30 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-green-950 dark:text-green-300">
                    🧼 3-in-1 Surface Preparation: <span className="font-normal text-charcoal/80 dark:text-slate-300">Expertly formulated to clean, condition, and prepare a diverse range of substrates—including metal, masonry, rubber, and wood—for flawless paint application.</span>
                  </div>
                  <div className="font-semibold text-green-950 dark:text-green-300">
                    🧱 Comprehensive Masonry Restoration: <span className="font-normal text-charcoal/80 dark:text-slate-300">Effectively eradicates algae, fungi, and embedded dirt from all masonry surfaces, ensuring a pristine and hygienic foundation.</span>
                  </div>
                  <div className="font-semibold text-green-950 dark:text-green-300">
                    ⚙️ Advanced Metal Degreasing & Derusting: <span className="font-normal text-charcoal/80 dark:text-slate-300">Powerfully strips away stubborn rust, oil, and heavy grease from metal substrates, promoting a clean and receptive profile.</span>
                  </div>
                  <div className="font-semibold text-green-950 dark:text-green-300">
                    🛡️ Superior Substrate Conditioning: <span className="font-normal text-charcoal/80 dark:text-slate-300">Acts as an advanced surface conditioner, significantly enhancing the adhesion, durability, and longevity of subsequent water-based or solvent-based paint coatings on both metal and masonry.</span>
                  </div>
                </div>
              </div>
            )}

            {/* METASHIELD Anti Corrosive Showcase: Color, Pack Sizes & Substrate Protection Guidance */}
            {isAntiCorrosive && (
              <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-gray-100/50 dark:from-slate-950/20 dark:to-gray-950/30 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
                {/* Available Color */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Color
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Heavy-duty industrial pigmented anti-corrosive coating
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-200">
                      Black Only
                    </span>
                  </div>

                  <div className="max-w-md">
                    <div className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex-shrink-0 bg-[#1E1E1E] border border-black/40 shadow-inner"
                      />
                      <div>
                        <div className="text-xs font-bold text-charcoal dark:text-white">
                          Black
                        </div>
                        <div className="text-[10px] text-charcoal/60 dark:text-slate-400">
                          Heavy-duty protective black formulation (Black only)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Pack Sizes */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Package className="w-4 h-4 text-slate-700 dark:text-slate-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-200">
                      Available Pack Sizes
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {ANTI_CORROSIVE_SIZES.map((sz) => (
                      <div
                        key={sz}
                        className="p-3 rounded-2xl bg-white dark:bg-[#1A2333] border border-slate-200/80 dark:border-slate-800 text-center shadow-xs"
                      >
                        <div className="text-lg font-extrabold text-charcoal dark:text-white font-display">
                          {sz}
                        </div>
                        <div className="text-[10px] text-charcoal/50 dark:text-slate-400 uppercase font-semibold mt-0.5">
                          Can / Pack
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Substrates & Metal Defense Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🏗️ Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Heavy-duty and decorative applications, including steel structures, metal furniture, vehicle undercarriages, and the steel bands of solid tires.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛡️ Exceptional Adhesion & Hardness: <span className="font-normal text-charcoal/80 dark:text-slate-300">Bonds securely to metal surfaces, providing a tough, resilient, and highly durable protective layer.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    ⚓ Superior Inter-Coat Adhesion: <span className="font-normal text-charcoal/80 dark:text-slate-300">Creates an optimal foundation that seamlessly anchors subsequent topcoats for a lasting, professional finish.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🌊 Outstanding Corrosion Resistance: <span className="font-normal text-charcoal/80 dark:text-slate-300">Forms a robust barrier against rust and oxidation, significantly extending the lifespan of the metal.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    ☀️ Optimum Weather & UV Protection: <span className="font-normal text-charcoal/80 dark:text-slate-300">Delivers advanced resistance to harsh environmental conditions, weathering, and harmful ultraviolet rays.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TYRESHIELD Wax Stick Black Showcase: Preparatory Substrate Repair Guidance */}
            {isWaxStick && (
              <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-gray-100/50 dark:from-slate-950/20 dark:to-gray-950/30 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal dark:text-white text-base">
                        Preparatory Repair Compound
                      </h3>
                      <p className="text-xs text-charcoal/60 dark:text-slate-400">
                        Premium solid rubber and plastic surface restoration wax
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-200">
                    Solid Wax Stick
                  </span>
                </div>

                {/* Substrate Restoration Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛞 Ideal For: <span className="font-normal text-charcoal/80 dark:text-slate-300">Restoring, filling, and preparing solid rubber tires and plastic substrates to ensure a flawlessly smooth final finish.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛠️ Seamless Surface Repair: <span className="font-normal text-charcoal/80 dark:text-slate-300">Expertly designed to seamlessly repair minor to moderate damage on solid rubber and plastic surfaces.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛡️ Optimal Foundation for Topcoats: <span className="font-normal text-charcoal/80 dark:text-slate-300">Formulated for ultimate convenience and precision, serving as the perfect preparatory treatment prior to the application of final topcoats, such as TyreShield All-In-One.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🌿 Eco-Friendly Compounding: <span className="font-normal text-charcoal/80 dark:text-slate-300">Engineered with high substrate binding efficiency and clean handling for industrial and automotive applications.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TYRESHIELD All in One Showcase: Available Colors & Tire Cosmetic Repair Guidance */}
            {isTyreshieldAllInOne && (
              <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-gray-100/50 dark:from-slate-950/20 dark:to-gray-950/30 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
                {/* Available Colors */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-sm">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal dark:text-white text-base">
                          Available Colors
                        </h3>
                        <p className="text-xs text-charcoal/60 dark:text-slate-400">
                          Water-based pigmented rubber coatings (color may vary with the type of rubber compound)
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-200">
                      5 Colors
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {TYRESHIELD_ALL_IN_ONE_COLORS.map((col) => (
                      <div
                        key={col.name}
                        className="p-2.5 rounded-xl bg-white dark:bg-[#1A2333] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3 hover:border-slate-400 transition-all"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 border border-black/20 shadow-inner"
                          style={{ backgroundColor: col.color }}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                            {col.name}
                          </div>
                          <div className="text-[10px] text-charcoal/55 dark:text-slate-400 truncate">
                            {col.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2.5 text-xs italic text-charcoal/65 dark:text-slate-400">
                    * Available colors: White, Black, Grey, Beige Light and Beige Dark (color may vary with the type of rubber compound).
                  </p>
                </div>

                {/* Substrate Restoration & Repair Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛞 Ideal Substrates: <span className="font-normal text-charcoal/80 dark:text-slate-300">Restoring and refining the visual appearance of solid and cured rubber tires.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🎯 Minor Cosmetic Touch-Ups & Buffering: <span className="font-normal text-charcoal/80 dark:text-slate-300">Seamlessly masks minor cosmetic touch-ups and buffering repairs on cured tires.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛡️ Superior Adhesion & Opacity: <span className="font-normal text-charcoal/80 dark:text-slate-300">Bonds securely to the rubber surface while providing exceptional opacity to flawlessly conceal imperfections.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    ⚡ Outstanding Inter-Coat Adhesion & Durability: <span className="font-normal text-charcoal/80 dark:text-slate-300">Ensures a seamless bond with subsequent layers and delivers long-lasting resilience against harsh outdoor elements.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🌿 Versatile Compatibility & Effortless Cleanup: <span className="font-normal text-charcoal/80 dark:text-slate-300">Safely performs across a diverse range of rubber compounds and cleans up effortlessly with just water.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TYRESHIELD Bladder Releaser Showcase: Internal Green Tire Curing & Release Guidance */}
            {isBladderReleaser && (
              <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-gray-100/50 dark:from-slate-950/20 dark:to-gray-950/30 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal dark:text-white text-base">
                        Green Tire Internal Lubrication & Release
                      </h3>
                      <p className="text-xs text-charcoal/60 dark:text-slate-400">
                        Optimizing molding & curing stages in rubber tire manufacturing
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-200">
                    Industrial Solution
                  </span>
                </div>

                {/* Substrate & Processing Guidance Banner */}
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-black/20 border border-slate-200/60 dark:border-slate-800 text-xs text-charcoal/80 dark:text-slate-200 space-y-1.5">
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛞 Ideal For: <span className="font-normal text-charcoal/80 dark:text-slate-300">Optimizing the molding and curing stages of rubber tire production.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    ⚙️ Precise Internal Application: <span className="font-normal text-charcoal/80 dark:text-slate-300">Specifically engineered for the precise internal application of green tires (uncured tires) during the manufacturing process.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🏎️ Superior Slip Properties: <span className="font-normal text-charcoal/80 dark:text-slate-300">Significantly reduces internal friction to ensure smooth handling, shaping, and flawless processing.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    💨 Outstanding Air Release: <span className="font-normal text-charcoal/80 dark:text-slate-300">Expertly formulated to facilitate the efficient escape of trapped air between the tire and the curing bladder, effectively minimizing manufacturing defects.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    🛡️ Optimal Bladder Release: <span className="font-normal text-charcoal/80 dark:text-slate-300">Ensures a seamless, residue-free separation from the vulcanizing bladder, extending bladder life and maintaining tire integrity.</span>
                  </div>
                  <div className="font-semibold text-slate-950 dark:text-slate-300">
                    💧 Hassle-Free Cleanup: <span className="font-normal text-charcoal/80 dark:text-slate-300">The premium water-based composition allows for quick, effortless equipment cleaning using only water.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-jade-600" />
                  <h3 className="font-bold text-charcoal text-sm uppercase tracking-wider">
                    {product.slug.includes("wood-stains") || product.slug.includes("sanding-sealer")
                      ? "Key Features & Technical Merits"
                      : product.slug.includes("wood-putty") || product.slug.includes("top-coat") || product.slug.includes("all-in-one") || product.slug.includes("floor-coat") || product.slug.includes("paving-sealer") || product.slug.includes("primer") || product.slug.includes("roof") || product.slug.includes("cleaner") || product.slug.includes("easy-floor") || product.slug.includes("anti-corrosive") || product.slug.includes("wax-stick") || product.slug.includes("bladder")
                      ? "Features and Benefits"
                      : "Key Performance Highlights"}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-jade-500 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal/80 text-sm font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Applying Video Tutorial */}
            {product.tutorialUrl && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-600/30">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal dark:text-white">
                      Applying Tutorial
                    </h4>
                    <p className="text-xs text-charcoal/60 dark:text-slate-300">
                      Watch the official application guide on YouTube
                    </p>
                  </div>
                </div>
                <a
                  href={product.tutorialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 flex-shrink-0"
                >
                  <span>Watch Tutorial</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-jade-500 hover:bg-jade-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-jade-900/20 hover:scale-[1.01]"
                >
                  Request Quotation / Samples
                </Link>
                {!isPutty && !isCleaner && product.brand !== "TYRESHIELD" && (
                  <Link
                    href="/calculator"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-jade-50 hover:bg-jade-100 text-jade-700 border border-jade-200 rounded-xl font-bold transition-all text-sm"
                  >
                    <Calculator className="w-4 h-4" />
                    Coverage Calculator
                  </Link>
                )}
              </div>

              <Link
                href="/products"
                className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 text-charcoal/70 rounded-xl font-semibold hover:border-jade-300 hover:text-jade-600 transition-all text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Product Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
