import Link from "next/link";
import { ArrowRight, Sparkles, Palette, Package } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  division: string;
  category: string;
  description: string;
  features: string[];
  coverage?: string;
  coveragePerLiter?: number;
  image?: string;
  beforeImage?: string;
  afterImage?: string;
  tutorialUrl?: string;
  shades?: string[];
  colors?: string[];
  finishes?: string[];
  sizes?: string[];
  specs?: Record<string, string>;
  colorNote?: string;
}

export const WOOD_STAIN_SHADES = [
  { name: "Natural", color: "#E5B27A", desc: "Warm birch & pine tone" },
  { name: "Jak Wood", color: "#D38837", desc: "Golden jackfruit timber" },
  { name: "Larch Teak", color: "#B7682C", desc: "Warm reddish copper teak" },
  { name: "Burma Teak", color: "#8E4D1E", desc: "Classic golden brown teak" },
  { name: "Mahogony", color: "#732D24", desc: "Deep rich reddish mahogany" },
  { name: "Dark Teak", color: "#5C361B", desc: "Deep chocolate dark teak" },
  { name: "Walnut", color: "#63442C", desc: "Warm roasted earthy walnut" },
  { name: "Black", color: "#1E1E1E", desc: "Deep satin ebony black" },
  { name: "Green", color: "#2C5530", desc: "Heritage forest timber green" },
  { name: "Red", color: "#9E2A2B", desc: "Colonial rich ruby redwood" },
  { name: "Dark Walnut", color: "#382115", desc: "Intense dark roast espresso" },
];

export const WOOD_STAIN_SIZES = ["0.5L", "1L", "4L"];

export const WOOD_PUTTY_COLORS = [
  { name: "Jak Wood", color: "#D38837", desc: "Golden honey timber" },
  { name: "Burma Teak", color: "#8E4D1E", desc: "Warm golden brown" },
  { name: "Mahogony", color: "#732D24", desc: "Rich reddish mahogany" },
  { name: "Walnut", color: "#63442C", desc: "Deep roasted walnut" },
  { name: "White", color: "#FFFFFF", desc: "Clean base & primed timber" },
];

export const WOOD_PUTTY_SIZES = ["250g", "500g", "1kg"];

export const SANDING_SEALER_COLORS = [
  { name: "Clear", color: "#F8FAF8", desc: "Translucent crystal-clear protective base" },
];

export const SANDING_SEALER_SIZES = ["0.5L", "1L", "4L"];

export const TOP_COAT_COLORS = [
  { name: "Clear", color: "#F8FAF8", desc: "Crystal-clear high-protection shield (Clear Only)" },
];
export const TOP_COAT_FINISHES = ["Gloss", "Matt", "Semi Gloss"];
export const TOP_COAT_SIZES = ["0.5L", "1L", "4L"];

export const WOODSHIELD_ALL_IN_ONE_COLORS = [
  { name: "Jak Wood", color: "#D38837", desc: "Golden jackfruit timber" },
  { name: "Larch Teak", color: "#B7682C", desc: "Warm reddish copper teak" },
  { name: "Burma Teak", color: "#8E4D1E", desc: "Classic golden brown teak" },
  { name: "Mahogony", color: "#732D24", desc: "Rich reddish mahogany" },
  { name: "Dark Teak", color: "#5C361B", desc: "Deep chocolate dark teak" },
  { name: "Walnut", color: "#63442C", desc: "Warm roasted earthy walnut" },
  { name: "Black", color: "#1E1E1E", desc: "Deep satin ebony black" },
  { name: "Dark Mahogony", color: "#4A1E17", desc: "Rich roasted deep mahogany" },
  { name: "Dark Walnut", color: "#382115", desc: "Intense dark roast espresso" },
];

export const WOODSHIELD_ALL_IN_ONE_FINISH = ["Semi Gloss"];
export const WOODSHIELD_ALL_IN_ONE_SIZES = ["0.5L", "1L", "4L"];

export const FLOOR_COAT_COLORS = [
  { name: "Clear", color: "#F8FAF8", desc: "Crystal-clear high-traffic floor shield" },
];
export const FLOOR_COAT_FINISHES = ["Semi Gloss"];
export const FLOOR_COAT_SIZES = ["0.5L", "1L", "4L"];

export const WET_LOOK_PAVING_SEALER_COLORS = [
  { name: "Clear", color: "#F8FAF8", desc: "Crystal-clear high-penetration sealer" },
];
export const WET_LOOK_PAVING_SEALER_FINISHES = ["Wet Finish"];
export const WET_LOOK_PAVING_SEALER_SIZES = ["0.5L", "1L", "4L"];

export const MASOGUARD_PRIMER_COLORS = [
  { name: "Grey", color: "#8B959E", desc: "Foundational opaque pigmented grey masonry primer (Grey Only)" },
];
export const MASOGUARD_PRIMER_SIZES = ["0.5L", "1L", "4L"];

export const MASOGUARD_ALL_IN_ONE_COLORS = [
  { name: "Larch Teak", color: "#B7682C", desc: "Warm reddish copper teak" },
  { name: "Burma Teak", color: "#8E4D1E", desc: "Classic golden brown teak" },
  { name: "Mahogony", color: "#732D24", desc: "Rich reddish mahogany" },
  { name: "Dark Teak", color: "#5C361B", desc: "Deep chocolate dark teak" },
  { name: "Walnut", color: "#63442C", desc: "Warm roasted earthy walnut" },
  { name: "Titanium", color: "#7D848C", desc: "Modern architectural titanium grey" },
];
export const MASOGUARD_ALL_IN_ONE_FINISH = ["Semi Gloss"];
export const MASOGUARD_ALL_IN_ONE_SIZES = ["0.5L", "1L", "4L"];

export const MASOGUARD_TOP_COAT_COLORS = [
  { name: "Clear", color: "#F8FAF8", desc: "Crystal-clear high-protection masonry topcoat (Clear Only)" },
];
export const MASOGUARD_TOP_COAT_FINISHES = ["Semi Gloss"];
export const MASOGUARD_TOP_COAT_SIZES = ["0.5L", "1L", "4L"];

export const ROOF_WALL_SHIELD_COLORS = [
  { name: "White", color: "#FFFFFF", desc: "Clean bright reflective white" },
  { name: "Tile Red", color: "#B84A39", desc: "Traditional terracotta & clay tile red" },
  { name: "Roof Red", color: "#8B2624", desc: "Rich deep architectural roofing red" },
  { name: "Coffee Brown", color: "#4B3621", desc: "Deep roasted warm earth coffee brown" },
  { name: "Spruce", color: "#2C5E43", desc: "Rich evergreen forest spruce" },
];
export const ROOF_WALL_SHIELD_FINISHES = ["Matt"];
export const ROOF_WALL_SHIELD_SIZES = ["1L", "4L", "10L"];

export const EASY_FLOOR_COLORS = [
  { name: "Grey", color: "#8B959E", desc: "Contemporary architectural slate grey" },
  { name: "Red", color: "#B83226", desc: "Classic rich vibrant floor red" },
  { name: "Black", color: "#1E1E1E", desc: "Deep modern protective black" },
  { name: "Green", color: "#2C5E43", desc: "Deep rich resilient exterior green" },
  { name: "Reddish Brown", color: "#7E3524", desc: "Warm earthy terracotta reddish brown" },
  { name: "Titanium", color: "#7D848C", desc: "Sleek industrial titanium tone" },
];
export const EASY_FLOOR_FINISHES = ["Semi Gloss"];
export const EASY_FLOOR_SIZES = ["0.5L", "1L", "4L"];

export const UNIVERSAL_CLEANER_SIZES = ["0.5L", "1L", "4L"];

export const ANTI_CORROSIVE_COLORS = [
  { name: "Black", color: "#1E1E1E", desc: "Heavy-duty protective black (Black only)" },
];
export const ANTI_CORROSIVE_SIZES = ["0.5L", "1L", "4L"];

export const TYRESHIELD_ALL_IN_ONE_COLORS = [
  { name: "White", color: "#FFFFFF", desc: "Solid tire white" },
  { name: "Black", color: "#1E1E1E", desc: "Deep rich rubber black" },
  { name: "Grey", color: "#8B959E", desc: "Architectural compound grey" },
  { name: "Beige Light", color: "#EADBB6", desc: "Light warm beige rubber compound tone" },
  { name: "Beige Dark", color: "#C4A86C", desc: "Deep tan beige rubber compound tone" },
];




const brandColors: Record<string, string> = {
  WOODSHIELD: "bg-amber-100 text-amber-800 border-amber-200",
  MASOGUARD: "bg-stone-100 text-stone-700 border-stone-200",
  "ECO-CLEANER": "bg-green-100 text-green-700 border-green-200",
  METASHIELD: "bg-gray-100 text-gray-700 border-gray-200",
  TYRESHIELD: "bg-slate-100 text-slate-700 border-slate-200",
  DECORATIVES: "bg-teal-100 text-teal-800 border-teal-200",
};

const divisionColors: Record<string, string> = {
  Domestic: "bg-jade-pale text-jade-500",
  Industrial: "bg-amber-50 text-amber-700",
};

const brandAccents: Record<string, string> = {
  WOODSHIELD: "from-amber-600 to-amber-800",
  MASOGUARD: "from-stone-500 to-stone-700",
  "ECO-CLEANER": "from-emerald-500 to-emerald-700",
  METASHIELD: "from-slate-600 to-slate-800",
  TYRESHIELD: "from-gray-600 to-gray-800",
  DECORATIVES: "from-teal-600 to-emerald-800",
};

function getProductSliderConfig(product: Product): {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
} {
  const lowerName = product.name.toLowerCase();
  const lowerSlug = product.slug.toLowerCase();

  if (product.beforeImage && product.afterImage) {
    return {
      beforeImage: product.beforeImage,
      afterImage: product.afterImage,
      beforeLabel: "Before",
      afterLabel: "After",
    };
  }
  if (product.image) {
    return {
      beforeImage: product.image,
      afterImage: product.image,
      beforeLabel: product.name,
      afterLabel: product.name,
    };
  }

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

export default function ProductCard({ product }: { product: Product }) {
  const accentGradient = brandAccents[product.brand] || "from-jade-500 to-jade-700";
  const brandBadge = brandColors[product.brand] || "bg-gray-100 text-gray-600";
  const divBadge = divisionColors[product.division] || "bg-gray-100 text-gray-600";
  const sliderConfig = getProductSliderConfig(product);
  const isPutty =
    product.name.toLowerCase().includes("putty") ||
    product.category?.toLowerCase().includes("putty") ||
    product.slug.toLowerCase().includes("putty");
  const isWoodStains =
    product.slug.includes("wood-stains") ||
    product.name.toLowerCase().includes("stain") ||
    product.category?.toLowerCase().includes("stain") ||
    Boolean(product.shades && product.shades.length > 0);
  const isSealer =
    product.slug.includes("sanding-sealer") ||
    product.name.toLowerCase().includes("sanding sealer") ||
    product.category?.toLowerCase().includes("sanding sealer");
  const isWoodshieldTopCoat =
    product.brand === "WOODSHIELD" &&
    (product.slug.includes("top-coat") ||
      product.name.toLowerCase().includes("top coat"));
  const isMasoguardTopCoat =
    product.brand === "MASOGUARD" &&
    (product.slug.includes("top-coat") ||
      product.name.toLowerCase().includes("top coat"));
  const isWoodshieldAllInOne =
    product.brand === "WOODSHIELD" &&
    (product.slug.includes("all-in-one") ||
      product.name.toLowerCase().includes("all in one"));
  const isFloorCoat =
    product.brand === "WOODSHIELD" &&
    (product.slug.includes("floor-coat") ||
      product.name.toLowerCase().includes("floor coat"));
  const isPavingSealer =
    product.slug.includes("paving-sealer") ||
    product.name.toLowerCase().includes("paving sealer") ||
    product.name.toLowerCase().includes("wet look");
  const isPrimer =
    product.brand === "MASOGUARD" &&
    (product.slug.includes("primer") ||
      product.name.toLowerCase().includes("primer"));
  const isMasoguardAllInOne =
    product.brand === "MASOGUARD" &&
    (product.slug.includes("all-in-one") ||
      product.name.toLowerCase().includes("all in one"));
  const isRoofWallShield =
    product.slug.includes("roof") ||
    product.slug.includes("wall-shield") ||
    product.name.toLowerCase().includes("roof") ||
    product.name.toLowerCase().includes("wall shield");
  const isEasyFloor =
    product.slug.includes("easy-floor") ||
    product.name.toLowerCase().includes("easy floor");
  const isCleaner =
    product.slug.includes("cleaner") ||
    product.name.toLowerCase().includes("cleaner");
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
    <div className="bg-white dark:bg-[#131B26] rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:border-jade-200 dark:hover:border-jade-500/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col group">
      {/* Color top bar */}
      <div className={`h-2 bg-gradient-to-r ${accentGradient}`} />

      {/* Interactive Transparent Before / After Slider Preview */}
      <div className="p-3 pb-0">
        <BeforeAfterSlider
          beforeImage={sliderConfig.beforeImage}
          afterImage={sliderConfig.afterImage}
          beforeLabel={sliderConfig.beforeLabel}
          afterLabel={sliderConfig.afterLabel}
          brand={product.brand}
          compact={true}
        />
        <div className="flex items-center justify-between text-[11px] text-charcoal/50 dark:text-slate-400 px-1 pt-1.5 font-medium">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-jade-500" />
            Drag transparent slider to inspect
          </span>
          <span>Water-Based</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${brandBadge}`}
          >
            {product.brand}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${divBadge}`}
          >
            {product.division}
          </span>
        </div>

        {/* Product name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-charcoal dark:text-white text-base mb-2 group-hover:text-jade-600 dark:group-hover:text-jade-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-charcoal/65 dark:text-slate-300 text-xs leading-relaxed flex-1 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Product Specs: 11 Available Shades (Wood Stains) */}
        {isWoodStains && (
          <div className="mb-3.5 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                Available colors
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-800/60 text-amber-950 dark:text-amber-100">
                11 Tones
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {WOOD_STAIN_SHADES.map((shade) => (
                <div
                  key={shade.name}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-amber-200/60 dark:border-amber-900/40 shadow-xs hover:border-amber-400 transition-colors"
                  title={`Wood Stain shade: ${shade.name} (${shade.desc})`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/15 shadow-xs"
                    style={{ backgroundColor: shade.color }}
                  />
                  <span className="text-[10px] font-semibold text-charcoal dark:text-slate-200 truncate">
                    {shade.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Available Sizes */}
            <div className="mt-2.5 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-900/80 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {WOOD_STAIN_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Colors & Sizes (Wood Putty) */}
        {isPutty && (
          <div className="mb-3.5 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
            {/* Available Colors */}
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  Available colors
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-800/60 text-amber-950 dark:text-amber-100">
                  5 Colors
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {WOOD_PUTTY_COLORS.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-amber-200/60 dark:border-amber-900/40 shadow-xs hover:border-amber-400 transition-colors"
                    title={`Wood Putty color: ${col.name} (${col.desc})`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/15 shadow-xs"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[10px] font-semibold text-charcoal dark:text-slate-200 truncate">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-900/80 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {WOOD_PUTTY_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Color & Sizes (Sanding Sealer) */}
        {isSealer && (
          <div className="mb-3.5 p-3 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-2.5">
            {/* Available Color */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                Available color:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-emerald-300 dark:border-emerald-800 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-white border border-gray-400 shadow-xs" />
                <span className="text-[10px] font-bold text-emerald-950 dark:text-emerald-100">
                  Clear
                </span>
              </div>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-emerald-900/80 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {SANDING_SEALER_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-emerald-200/70 dark:border-emerald-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Color, Finishes & Sizes (Woodshield Top Coat) */}
        {isWoodshieldTopCoat && (
          <div className="mb-3.5 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
            {/* Available Color */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                Available color:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-amber-300 dark:border-amber-800 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-white border border-gray-400 shadow-xs" />
                <span className="text-[10px] font-bold text-amber-950 dark:text-amber-100">
                  Clear
                </span>
                <span className="text-[9px] font-medium text-amber-700/80 dark:text-amber-300/80">
                  (Clear only)
                </span>
              </div>
            </div>

            {/* Available Finishes */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                Available finishes:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {TOP_COAT_FINISHES.map((f) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-900/80 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {TOP_COAT_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Colors, Finish & Sizes (Woodshield All in One) */}
        {isWoodshieldAllInOne && (
          <div className="mb-3.5 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
            {/* Available Colors */}
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  Available colors
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-800/60 text-amber-950 dark:text-amber-100">
                  9 Colors
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {WOODSHIELD_ALL_IN_ONE_COLORS.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-amber-200/60 dark:border-amber-900/40 shadow-xs hover:border-amber-400 transition-colors"
                    title={`Woodshield All in One color: ${col.name} (${col.desc})`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/15 shadow-xs"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[10px] font-semibold text-charcoal dark:text-slate-200 truncate">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Finish */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-900/80 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Available finish:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-amber-900 dark:text-amber-200 shadow-xs">
                Semi Gloss
              </span>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-900/80 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {WOODSHIELD_ALL_IN_ONE_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Color, Finish & Sizes (Floor Coat) */}
        {isFloorCoat && (
          <div className="mb-3.5 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
            {/* Available Color */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                Available color:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-amber-300 dark:border-amber-800 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-white border border-gray-400 shadow-xs" />
                <span className="text-[10px] font-bold text-amber-950 dark:text-amber-100">
                  Clear
                </span>
              </div>
            </div>

            {/* Available Finish */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-900/80 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Available finish:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-amber-900 dark:text-amber-200 shadow-xs">
                Semi Gloss
              </span>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-amber-900/80 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {FLOOR_COAT_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-amber-200/70 dark:border-amber-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Color, Finish & Sizes (Wet Look Paving Sealer) */}
        {isPavingSealer && (
          <div className="mb-3.5 p-3 rounded-xl bg-stone-50/90 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2.5">
            {/* Available Color */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-stone-700 dark:text-stone-400" />
                Available color:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-stone-300 dark:border-stone-700 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-white border border-gray-400 shadow-xs" />
                <span className="text-[10px] font-bold text-stone-950 dark:text-stone-100">
                  Clear
                </span>
              </div>
            </div>

            {/* Available Finish */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-stone-900/80 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                Available finish:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700 text-[10px] font-bold text-stone-900 dark:text-stone-200 shadow-xs">
                Wet Finish
              </span>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-stone-900/80 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {WET_LOOK_PAVING_SEALER_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Color & Sizes (Masoguard Primer) */}
        {isPrimer && (
          <div className="mb-3.5 p-3 rounded-xl bg-stone-50/90 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2.5">
            {/* Available Color */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-stone-700 dark:text-stone-400" />
                Available color:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-stone-300 dark:border-stone-700 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#8B959E] border border-black/20 shadow-xs" />
                <span className="text-[10px] font-bold text-stone-950 dark:text-stone-100">
                  Grey
                </span>
                <span className="text-[9px] font-medium text-stone-600 dark:text-stone-300">
                  (Grey only)
                </span>
              </div>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-stone-900/80 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {MASOGUARD_PRIMER_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Colors, Finish & Sizes (Masoguard All in One) */}
        {isMasoguardAllInOne && (
          <div className="mb-3.5 p-3 rounded-xl bg-stone-50/90 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2.5">
            {/* Available Colors */}
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-stone-700 dark:text-stone-400" />
                  Available colors
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-stone-200/80 dark:bg-stone-800/80 text-stone-950 dark:text-stone-100">
                  6 Colors
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {MASOGUARD_ALL_IN_ONE_COLORS.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700/60 shadow-xs hover:border-stone-400 transition-colors"
                    title={`Masoguard All in One color: ${col.name} (${col.desc})`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/15 shadow-xs"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[10px] font-semibold text-charcoal dark:text-slate-200 truncate">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Finish */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-stone-900/80 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                Available finish:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700 text-[10px] font-bold text-stone-900 dark:text-stone-200 shadow-xs">
                Semi Gloss
              </span>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-stone-900/80 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {MASOGUARD_ALL_IN_ONE_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Color, Finish & Sizes (Masoguard Top Coat) */}
        {isMasoguardTopCoat && (
          <div className="mb-3.5 p-3 rounded-xl bg-stone-50/90 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800 space-y-2.5">
            {/* Available Color */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-stone-900 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-stone-700 dark:text-stone-400" />
                Available color:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-stone-300 dark:border-stone-700 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-white border border-gray-400 shadow-xs" />
                <span className="text-[10px] font-bold text-stone-950 dark:text-stone-100">
                  Clear
                </span>
                <span className="text-[9px] font-medium text-stone-600 dark:text-stone-300">
                  (Clear only)
                </span>
              </div>
            </div>

            {/* Available Finish */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-stone-900/80 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                Available finish:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700 text-[10px] font-bold text-stone-900 dark:text-stone-200 shadow-xs">
                Semi Gloss
              </span>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-stone-900/80 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-stone-600 dark:text-stone-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {MASOGUARD_TOP_COAT_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-stone-200/70 dark:border-stone-700 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Colors, Finish & Sizes (Roof & Wall Shield) */}
        {isRoofWallShield && (
          <div className="mb-3.5 p-3 rounded-xl bg-teal-50/90 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/50 space-y-2.5">
            {/* Available Colors */}
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-bold text-teal-950 dark:text-teal-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  Available colors
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-200/80 dark:bg-teal-800/60 text-teal-950 dark:text-teal-100">
                  5 Colors
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {ROOF_WALL_SHIELD_COLORS.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-teal-200/60 dark:border-teal-900/40 shadow-xs hover:border-teal-400 transition-colors"
                    title={`Roof & Wall Shield color: ${col.name} (${col.desc})`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/15 shadow-xs"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[10px] font-semibold text-charcoal dark:text-slate-200 truncate">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Finish */}
            <div className="pt-2 border-t border-teal-200/60 dark:border-teal-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-teal-950/80 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                Available finish:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-teal-200/70 dark:border-teal-900/50 text-[10px] font-bold text-teal-950 dark:text-teal-200 shadow-xs">
                Matt
              </span>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-teal-200/60 dark:border-teal-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-teal-950/80 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {ROOF_WALL_SHIELD_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-teal-200/70 dark:border-teal-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Colors, Finish & Sizes (JADE Easy Floor) */}
        {isEasyFloor && (
          <div className="mb-3.5 p-3 rounded-xl bg-teal-50/90 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/50 space-y-2.5">
            {/* Available Colors */}
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-bold text-teal-950 dark:text-teal-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  Available colors
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-200/80 dark:bg-teal-800/60 text-teal-950 dark:text-teal-100">
                  6 Colors
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {EASY_FLOOR_COLORS.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-teal-200/60 dark:border-teal-900/40 shadow-xs hover:border-teal-400 transition-colors"
                    title={`Easy Floor color: ${col.name} (${col.desc})`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/15 shadow-xs"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[10px] font-semibold text-charcoal dark:text-slate-200 truncate">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Finish */}
            <div className="pt-2 border-t border-teal-200/60 dark:border-teal-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-teal-950/80 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                Available finish:
              </span>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-teal-200/70 dark:border-teal-900/50 text-[10px] font-bold text-teal-950 dark:text-teal-200 shadow-xs">
                  Semi Gloss
                </span>
                <span className="text-[9px] font-medium text-teal-800/80 dark:text-teal-300/80">
                  (Semi gloss only)
                </span>
              </div>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-teal-200/60 dark:border-teal-900/40 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-teal-950/80 dark:text-teal-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {EASY_FLOOR_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-teal-200/70 dark:border-teal-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Sizes (Universal Cleaner) */}
        {isCleaner && (
          <div className="mb-3.5 p-3 rounded-xl bg-green-50/90 dark:bg-green-950/30 border border-green-200/80 dark:border-green-900/50 space-y-2.5">
            {/* Available Sizes */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-green-950/80 dark:text-green-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-green-600 dark:text-green-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {UNIVERSAL_CLEANER_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-green-200/70 dark:border-green-900/50 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Available Color & Sizes (Anti Corrosive) */}
        {isAntiCorrosive && (
          <div className="mb-3.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            {/* Available Color */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                Available color:
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-slate-300 dark:border-slate-700 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-[#1E1E1E] border border-black/40 shadow-xs" />
                <span className="text-[10px] font-bold text-slate-950 dark:text-slate-100">
                  Black
                </span>
                <span className="text-[9px] font-medium text-slate-600 dark:text-slate-400">
                  (Black only)
                </span>
              </div>
            </div>

            {/* Available Sizes */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-slate-900/80 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
                <Package className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                Available sizes:
              </span>
              <div className="flex items-center gap-1.5">
                {ANTI_CORROSIVE_SIZES.map((sz) => (
                  <span
                    key={sz}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-[#1A2333] border border-slate-200/70 dark:border-slate-700 text-[10px] font-bold text-charcoal dark:text-slate-200 shadow-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Specs: Repair & Preparation Guidance (TyreShield Wax Stick Black) */}
        {isWaxStick && (
          <div className="mb-3.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                Substrate Repair
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-200">
                Preparatory
              </span>
            </div>
            <div className="text-[11px] text-charcoal/80 dark:text-slate-300 font-medium leading-relaxed">
              Restores, fills, and prepares solid rubber tires & plastic substrates for a smooth final finish.
            </div>
          </div>
        )}

        {/* Product Specs: Available Colors (TyreShield All in One) */}
        {isTyreshieldAllInOne && (
          <div className="mb-3.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                  Available colors
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-200">
                  5 Colors
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {TYRESHIELD_ALL_IN_ONE_COLORS.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#1A2333] border border-slate-200/60 dark:border-slate-800/80 shadow-xs hover:border-slate-400 transition-colors"
                    title={`TyreShield All in One color: ${col.name} (${col.desc})`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-black/20 shadow-xs"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[10px] font-semibold text-charcoal dark:text-slate-200 truncate">
                      {col.name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[10px] italic text-charcoal/70 dark:text-slate-400">
                * Color may vary with the type of rubber compound
              </p>
            </div>
          </div>
        )}

        {/* Product Specs: Precision Curing Guidance (TyreShield Bladder Releaser) */}
        {isBladderReleaser && (
          <div className="mb-3.5 p-3 rounded-xl bg-slate-50/90 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400" />
                Curing & Mold Release
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-950 dark:bg-slate-800 dark:text-slate-200">
                Green Tires
              </span>
            </div>
            <div className="text-[11px] text-charcoal/80 dark:text-slate-300 font-medium leading-relaxed">
              Internal application for green tires to optimize molding, superior slip & seamless vulcanizing bladder release.
            </div>
          </div>
        )}


        {/* Features preview */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-1 mb-3 pt-2 border-t border-gray-50 dark:border-slate-800/80">
            {product.features.slice(0, 2).map((feat, i) => (
              <li
                key={i}
                className="flex items-center gap-1.5 text-xs text-charcoal/70 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-jade-500 flex-shrink-0" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Applying Tutorial Link */}
        {product.tutorialUrl && (
          <a
            href={product.tutorialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center justify-between hover:bg-red-100 dark:hover:bg-red-900/50 transition-all group/tut"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 fill-current text-red-600 dark:text-red-400" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Applying Tutorial</span>
            </span>
            <span className="text-[11px] opacity-75 group-hover/tut:translate-x-0.5 transition-transform">Watch ↗</span>
          </a>
        )}

        {/* CTA */}
        <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1 text-jade-600 dark:text-jade-400 text-xs font-bold hover:text-jade-700 dark:hover:text-jade-300 transition-all"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          {isPutty || isCleaner || product.brand === "TYRESHIELD" ? (
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              className="text-[11px] text-charcoal/50 dark:text-slate-400 hover:text-jade-600 dark:hover:text-jade-400 font-medium"
            >
              Request Quote →
            </Link>
          ) : (
            <Link
              href="/calculator"
              className="text-[11px] text-charcoal/50 dark:text-slate-400 hover:text-jade-600 dark:hover:text-jade-400 font-medium"
            >
              Coverage Calculator →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
