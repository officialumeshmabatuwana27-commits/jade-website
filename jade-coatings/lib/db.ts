/**
 * lib/db.ts — Zero-dependency JSON file store
 * Uses Node.js built-in fs/path modules. No npm packages required.
 * Data is persisted to data/db.json on disk.
 */

import fs from "fs";
import path from "path";

// ─── Types ──────────────────────────────────────────────────────────────────

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

export interface Project {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  type: string; // 'project' | 'client'
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface DbSchema {
  products: Product[];
  projects: Project[];
  contacts: Contact[];
  seeded: boolean;
}

// ─── Setup ──────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDb(): DbSchema {
  ensureDir();
  if (!fs.existsSync(DB_PATH)) {
    const empty: DbSchema = { products: [], projects: [], contacts: [], seeded: false };
    fs.writeFileSync(DB_PATH, JSON.stringify(empty, null, 2));
    return empty;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as DbSchema;
}

function writeDb(data: DbSchema) {
  ensureDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ─── Public API ─────────────────────────────────────────────────────────────

let _initialized = false;

export function ensureInit() {
  if (_initialized) return;
  const db = readDb();
  if (!db.seeded) {
    seedData(db);
  }
  _initialized = true;
}

export function getProducts(division?: string): Product[] {
  ensureInit();
  const db = readDb();
  let products = db.products;
  if (division) {
    products = products.filter((p) => p.division === division);
  }
  return products.sort((a, b) =>
    a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name)
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  ensureInit();
  return readDb().products.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  ensureInit();
  return readDb().products.find((p) => p.id === id);
}

export function createProduct(data: Omit<Product, "id">): Product {
  ensureInit();
  const db = readDb();
  const nextId = db.products.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
  const newProduct: Product = {
    ...data,
    id: nextId,
    slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  };
  db.products.push(newProduct);
  writeDb(db);
  return newProduct;
}

export function updateProduct(id: number, data: Partial<Product>): Product | null {
  ensureInit();
  const db = readDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.products[index] = { ...db.products[index], ...data, id };
  writeDb(db);
  return db.products[index];
}

export function deleteProduct(id: number): boolean {
  ensureInit();
  const db = readDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.products.splice(index, 1);
  writeDb(db);
  return true;
}

export function getProjects(): { projects: Project[]; clients: Project[] } {
  ensureInit();
  const db = readDb();
  return {
    projects: db.projects.filter((p) => p.type === "project"),
    clients: db.projects.filter((p) => p.type === "client"),
  };
}

export function getProjectById(id: number): Project | undefined {
  ensureInit();
  return readDb().projects.find((p) => p.id === id);
}

export function createProject(data: Omit<Project, "id">): Project {
  ensureInit();
  const db = readDb();
  const nextId = db.projects.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
  const newProject: Project = {
    ...data,
    id: nextId,
  };
  db.projects.push(newProject);
  writeDb(db);
  return newProject;
}

export function updateProject(id: number, data: Partial<Project>): Project | null {
  ensureInit();
  const db = readDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.projects[index] = { ...db.projects[index], ...data, id };
  writeDb(db);
  return db.projects[index];
}

export function deleteProject(id: number): boolean {
  ensureInit();
  const db = readDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.projects.splice(index, 1);
  writeDb(db);
  return true;
}

export function getContacts(): Contact[] {
  ensureInit();
  return readDb().contacts;
}

export function saveContact(data: Omit<Contact, "id" | "created_at">): void {
  ensureInit();
  const db = readDb();
  const newContact: Contact = {
    ...data,
    id: (db.contacts[db.contacts.length - 1]?.id ?? 0) + 1,
    created_at: new Date().toISOString(),
  };
  db.contacts.push(newContact);
  writeDb(db);
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

function seedData(db: DbSchema) {
  db.products = [
    // WOODSHIELD – Domestic
    {
      id: 1,
      slug: "woodshield-wood-putty",
      name: "Wood Putty",
      brand: "WOODSHIELD",
      division: "Domestic",
      category: "Wood Putty",
      description: "This premium, water-based, and eco-friendly wood filler is expertly formulated to repair minor imperfections on both interior and exterior wooden surfaces, including nail holes, dents, scratches, and damaged edges. It is specifically designed for application prior to using sanding sealers and wood stains.\n\nIdeal for a variety of woodwork, including doors, windows, furniture, MDF, and plywood.",
      features: [
        "Superior Adhesion: Bonds securely to the wood surface.",
        "Exceptional Durability: Highly resistant to shrinking, cracking, or withdrawal.",
        "Effortless Sandability: Sands easily to achieve a smooth, flawless finish.",
        "Excellent Filling Capacity: Provides deep, flexible coverage for all imperfections.",
        "Fungal Resistance: Formulated to actively prevent mold and fungal growth."
      ],
      colors: ["Jak Wood", "Burma Teak", "Mahogony", "Walnut", "White"],
      sizes: ["250g", "500g", "1kg"],
      specs: {
        "Available Colors": "Jak Wood, Burma Teak, Mahogony, Walnut, White",
        "Available Sizes": "250g, 500g, 1kg",
        "Ideal Substrates": "Doors, windows, furniture, MDF, and plywood",
        "Application Timing": "Prior to using sanding sealers and wood stains",
        "Key Benefits": "Superior Adhesion, Exceptional Durability, Effortless Sandability, Excellent Filling Capacity, Fungal Resistance"
      }
    },
    {
      id: 2,
      slug: "woodshield-wood-stains",
      name: "Wood Stains",
      brand: "WOODSHIELD",
      division: "Domestic",
      category: "Wood Stains",
      description: "This high-performance, eco-friendly, and water-based wood stain is expertly formulated to enhance and protect both interior and exterior wooden surfaces. It serves as the perfect foundational layer, specifically designed for application prior to your final topcoat.\n\nIdeal for a diverse range of woodwork, including doors, windows, furniture, and plywood.",
      features: [
        "Effortless Application: A user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Optimum Durability & UV Protection: Delivers exceptional, long-lasting resilience while shielding the wood from harmful ultraviolet rays.",
        "Superior Water Resistance: Forms a robust protective barrier against moisture and environmental weathering.",
        "Blue Fungi Resistance: Actively prevents the growth of blue stain fungi and mold, preserving the wood's natural integrity.",
        "Advanced Block Resistance: Prevents coated or stained surfaces from sticking together upon contact (such as doors in frames).",
        "Exceptional Color Retention: Maintains deep, vibrant, and fade-resistant hues over time."
      ],
      shades: [
        "Natural",
        "Jak Wood",
        "Larch Teak",
        "Burma Teak",
        "Mahogony",
        "Dark Teak",
        "Walnut",
        "Black",
        "Green",
        "Red",
        "Dark Walnut"
      ],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Shades": "Natural, Jak Wood, Larch Teak, Burma Teak, Mahogony, Dark Teak, Walnut, Black, Green, Red, Dark Walnut",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Doors, windows, furniture, and plywood",
        "Application Timing": "Foundational layer prior to your final topcoat",
        "Formula": "High-performance, eco-friendly, and water-based",
        "Key Merits": "UV protection, water resistance, blue fungi resistance, block resistance, color retention"
      }
    },
    {
      id: 3,
      slug: "woodshield-sanding-sealer",
      name: "Sanding Sealer",
      brand: "WOODSHIELD",
      division: "Domestic",
      category: "Sanding Sealer",
      description: "This premium, water-based, and eco-friendly sealer is expertly formulated for all types of interior and exterior wooden surfaces. It is specifically designed to be applied directly onto well-prepared bare wood or seamlessly layered over interior and exterior wood stains.\n\nIdeal for protecting and preparing wooden doors, windows, furniture, MDF, plywood, and wooden brush handles.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula for a flawlessly smooth application.",
        "Optimal Filling Capacity: Penetrates deeply to provide superior grain filling and surface preparation.",
        "Fungal Resistance: Actively prevents mold and fungal growth, ensuring the long-term integrity of the wood.",
        "Effortless Sandability: Sands quickly and easily to create a perfectly smooth foundation for final topcoats.",
        "Exceptional Sealing: Delivers an outstanding protective seal, resulting in an exquisitely fine finish."
      ],
      colors: ["Clear"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Color": "Clear",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Wooden doors, windows, furniture, MDF, plywood, and wooden brush handles",
        "Application Timing": "Directly onto bare wood or layered over wood stains prior to final topcoats",
        "Formula": "Premium water-based & eco-friendly sealer",
        "Key Merits": "Self-leveling, deep grain filling, fungal resistance, effortless sandability, exceptional sealing"
      }
    },
    {
      id: 4,
      slug: "woodshield-top-coat",
      name: "Top Coat",
      brand: "WOODSHIELD",
      division: "Domestic",
      category: "Top Coat",
      description: "This high-performance, water-based, and eco-friendly clear coating is expertly formulated to protect and enhance both interior and exterior wooden surfaces. It is specifically designed to be applied over Woodshield stains, serving as a premium protective topcoat that beautifully complements our wide selection of popular colors.\n\nIdeal for preserving and beautifying wooden doors, windows, and furniture.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Optimum Durability: Delivers exceptional, long-lasting resilience with advanced water and UV protection to withstand the elements.",
        "Color Preservation & Fungal Resistance: Protects the vibrancy of underlying stains from fading while actively preventing mold and fungal growth.",
        "Superior Chemical Resistance: Forms a robust protective barrier against everyday wear, offering excellent resistance to most common household chemicals and spills."
      ],
      colors: ["Clear"],
      finishes: ["Gloss", "Matt", "Semi Gloss"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Color": "Clear (Clear Only)",
        "Available Finishes": "Gloss, Matt, Semi Gloss",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Wooden doors, windows, and furniture",
        "Application Timing": "Applied over Woodshield stains as a premium protective topcoat",
        "Formula": "High-performance, water-based, and eco-friendly clear coating",
        "Key Benefits": "Effortless application, optimum durability, color preservation, fungal resistance, superior chemical resistance"
      }
    },
    {
      id: 5,
      slug: "woodshield-all-in-one",
      name: "All in One",
      brand: "WOODSHIELD",
      division: "Domestic",
      category: "All in One",
      description: "This high-performance, water-based, and eco-friendly color coating is expertly formulated to elevate and protect both interior and exterior wooden surfaces. Engineered as an innovative 3-in-1 solution, it seamlessly functions as a base, stain, and topcoat in a single application. Remarkably versatile, it can be applied directly over previously treated NC (Nitrocellulose), PU (Polyurethane), and Alkyd finishes, eliminating the need for laborious scraping or sanding down to bare wood.\n\nIdeal for enhancing and protecting wooden doors, windows, ceilings, furniture, MDF, plywood, and timber decks.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Optimum Durability & Protection: Delivers exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions.",
        "Exceptional Color Retention & Block Resistance: Maintains vibrant, fade-resistant hues over time while preventing coated surfaces from sticking together upon contact.",
        "Comprehensive Fungal Defense: Actively prevents the growth of mold, mildew, and blue stain fungi, preserving the wood's natural integrity.",
        "Superior Chemical Resistance: Forms a robust protective barrier against everyday wear and most common household chemicals or spills.",
        "Ultimate Surface Versatility: Designed for direct, hassle-free application over existing NC, PU, and Alkyd-based paints without the need for intensive surface stripping."
      ],
      colors: [
        "Jak Wood",
        "Larch Teak",
        "Burma Teak",
        "Mahogony",
        "Dark Teak",
        "Walnut",
        "Black",
        "Dark Mahogony",
        "Dark Walnut"
      ],
      finishes: ["Semi Gloss"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Colors": "Jak Wood, Larch Teak, Burma Teak, Mahogony, Dark Teak, Walnut, Black, Dark Mahogony, Dark Walnut (9 Colors)",
        "Available Finish": "Semi Gloss",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Wooden doors, windows, ceilings, furniture, MDF, plywood, and timber decks",
        "Surface Versatility": "Direct application over existing NC, PU, and Alkyd finishes without stripping",
        "Formula": "Innovative 3-in-1 water-based, eco-friendly color coating (base + stain + topcoat)"
      },
      tutorialUrl: "https://youtu.be/p5zWiq1RJk8?si=l--sZVHhkiyW4KRE"
    },
    {
      id: 7,
      slug: "woodshield-floor-coat",
      name: "Floor Coat",
      brand: "WOODSHIELD",
      division: "Domestic",
      category: "Floor Coat",
      description: "This eco-friendly, water-borne, and highly durable decorative coating is expertly engineered to protect and enhance both interior and exterior timber floors.\n\nIdeal for wooden floors, timber decks, and high-traffic areas.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Superior Adhesion & Resilience: Bonds securely to the wood, providing a tough, hard-wearing protective layer specifically designed to withstand heavy foot traffic.",
        "Optimum Durability: Delivers outstanding longevity with advanced water and dirt resistance, keeping your floors looking pristine.",
        "Exceptional Scratch & Abrasion Resistance: Shields against daily wear and tear, effectively minimizing scuffs, scratches, and impact damage.",
        "Superior Chemical Resistance: Forms a robust protective barrier against everyday spills and most common household chemicals.",
        "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a hygienic and enduring surface."
      ],
      colors: ["Clear"],
      finishes: ["Semi Gloss"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Color": "Clear (Clear Only)",
        "Available Finish": "Semi Gloss (Semi Gloss Only)",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Wooden floors, timber decks, and high-traffic areas",
        "Formula": "Eco-friendly, water-borne, and highly durable decorative coating",
        "Key Benefits": "Self-leveling, heavy foot-traffic resilience, scratch & abrasion resistance, algal & fungal protection"
      }
    },
    // MASOGUARD – Domestic
    {
      id: 8,
      slug: "masoguard-wet-look-paving-sealer",
      name: "Wet Look Paving Sealer",
      brand: "MASOGUARD",
      division: "Domestic",
      category: "Wet Look Paving Sealer",
      description: "This premium, water-based, and eco-friendly clear sealer is expertly engineered to provide hard-wearing protection, effectively repelling moisture and water from both horizontal and vertical surfaces, indoors and outdoors.\n\nIdeal for interlocking bricks, cement pavers, natural stones, clay tiles, and most unglazed surfaces, including slate, terracotta, ceramic, marble, and tile grout.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Optimum Durability: Delivers exceptional, long-lasting resilience with advanced water and UV protection to withstand harsh environmental conditions.",
        "Exceptional Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring surface.",
        "Superior Chemical & Alkali Resistance: Forms a robust protective barrier against common household chemicals, spills, and harsh alkaline environments.",
        "Hot Tire Mark Resistance: Specially formulated to withstand vehicular traffic and effectively resist hot tire pick-up, making it perfect for driveways and garages.",
        "Self-Cleaning Technology: Engineered with advanced dirt pick-up resistance, allowing the surface to naturally shed grime and maintain a pristine appearance over time."
      ],
      colors: ["Clear"],
      finishes: ["Wet Finish"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Color": "Clear (Clear Only)",
        "Available Finish": "Wet Finish (Wet Finish Only)",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Interlocking bricks, cement pavers, natural stones, clay tiles, slate, terracotta, ceramic, marble, and tile grout",
        "Formula": "Premium water-based & eco-friendly clear sealer",
        "Key Benefits": "Self-leveling, hot tire mark resistance, self-cleaning tech, algal/fungal defense, superior chemical & alkali resistance"
      }
    },
    {
      id: 9,
      slug: "masoguard-primer",
      name: "Primer",
      brand: "MASOGUARD",
      division: "Domestic",
      category: "Primer",
      description: "This premium, water-based, and eco-friendly pigmented primer is expertly formulated for all types of interior and exterior masonry surfaces.\n\nIdeal for clay tiles, interlocking bricks, cement, cellulose fiber boards, and general masonry applications.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Superior Surface Preparation: Delivers optimal filling, sealing, and priming properties to create the perfect foundational layer for subsequent topcoats.",
        "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, preserving the integrity and cleanliness of the surface.",
        "Optimum Durability & Protection: Provides exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions."
      ],
      colors: ["Grey"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Color": "Grey (Grey Only)",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Clay tiles, interlocking bricks, cement, cellulose fiber boards, and general masonry applications",
        "Formula": "Premium, water-based, and eco-friendly pigmented primer",
        "Key Benefits": "Effortless application, superior surface preparation, algal & fungal resistance, optimum durability & protection"
      }
    },
    {
      id: 10,
      slug: "masoguard-all-in-one",
      name: "All in One",
      brand: "MASOGUARD",
      division: "Domestic",
      category: "All in One",
      description: "This high-performance, water-based, and eco-friendly color coating is expertly formulated to create a stunning, authentic timber effect on both interior and exterior masonry surfaces. It is specifically designed for seamless application over Masoguard Primer.\n\nIdeal for transforming cement, concrete, general masonry surfaces, plasterboards, and cement or cellulose fiber boards.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Optimum Durability & Protection: Delivers exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions.",
        "Exceptional Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, preserving the integrity and cleanliness of the surface.",
        "Outstanding Color Retention & Salt Spray Resistance: Maintains deep, vibrant hues over time while offering robust protection against harsh coastal or saline environments.",
        "Superior Chemical Resistance: Forms a durable protective barrier against everyday wear, spills, and most common household chemicals.",
        "Self-Cleaning Technology: Engineered with advanced dirt pick-up resistance, allowing the surface to naturally shed grime and maintain a pristine appearance over time."
      ],
      colors: [
        "Larch Teak",
        "Burma Teak",
        "Mahogony",
        "Dark Teak",
        "Walnut",
        "Titanium"
      ],
      finishes: ["Semi Gloss"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Colors": "Larch Teak, Burma Teak, Mahogony, Dark Teak, Walnut, Titanium (6 Colors)",
        "Available Finish": "Semi Gloss (Semi Gloss Only)",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Cement, concrete, general masonry surfaces, plasterboards, and cement or cellulose fiber boards",
        "Application Timing": "Applied seamlessly over Masoguard Primer for authentic timber effect",
        "Formula": "High-performance, water-based, and eco-friendly timber-effect color coating",
        "Key Benefits": "Self-leveling, salt spray & UV protection, self-cleaning tech, algal/fungal defense, superior chemical resistance"
      }
    },
    {
      id: 11,
      slug: "masoguard-top-coat",
      name: "Top Coat",
      brand: "MASOGUARD",
      division: "Domestic",
      category: "Top Coat",
      description: "This high-performance, water-based, and eco-friendly clear coating is expertly formulated to protect and enhance both interior and exterior concrete and masonry surfaces. It is specifically designed to be applied as a premium protective topcoat over Masoguard All in One, beautifully complementing our wide selection of popular colors.\n\nIdeal for preserving and elevating cement, concrete, general masonry surfaces, and plasterboards.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Optimum Durability & Protection: Delivers exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions.",
        "Exceptional Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, preserving the integrity and cleanliness of the surface.",
        "Outstanding Color Preservation & Salt Spray Resistance: Protects the vibrancy of underlying colors from fading while offering robust defense against harsh coastal or saline environments.",
        "Superior Chemical Resistance: Forms a durable protective barrier against everyday wear, spills, and most common household chemicals.",
        "Self-Cleaning Technology: Engineered with advanced dirt pick-up resistance, allowing the surface to naturally shed grime and maintain a pristine appearance over time."
      ],
      colors: ["Clear"],
      finishes: ["Semi Gloss"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Color": "Clear (Clear Only)",
        "Available Finish": "Semi Gloss (Semi Gloss Only)",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Cement, concrete, general masonry surfaces, and plasterboards",
        "Application Timing": "Applied as a premium protective topcoat over Masoguard All in One",
        "Formula": "High-performance, water-based, and eco-friendly clear coating",
        "Key Benefits": "Effortless application, optimum durability, color preservation, salt spray resistance, self-cleaning tech"
      }
    },
    // ECO-CLEANER – Domestic
    {
      id: 13,
      slug: "eco-cleaner-universal-cleaner",
      name: "Universal Cleaner",
      brand: "ECO-CLEANER",
      division: "Domestic",
      category: "Universal Cleaner",
      description: "This eco-friendly, 3-in-1 aqueous solution is expertly formulated to clean, condition, and prepare a diverse range of substrates—including metal, masonry, rubber, and wood—for flawless paint application.",
      features: [
        "Comprehensive Masonry Restoration: Effectively eradicates algae, fungi, and embedded dirt from all masonry surfaces, ensuring a pristine and hygienic foundation.",
        "Advanced Metal Degreasing & Derusting: Powerfully strips away stubborn rust, oil, and heavy grease from metal substrates, promoting a clean and receptive profile.",
        "Superior Substrate Conditioning: Acts as an advanced surface conditioner, significantly enhancing the adhesion, durability, and longevity of subsequent water-based or solvent-based paint coatings on both metal and masonry."
      ],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Metal, masonry, rubber, and wood",
        "Formula": "Eco-friendly, 3-in-1 aqueous cleaning and conditioning solution",
        "Key Benefits": "Masonry restoration, metal degreasing & derusting, superior substrate conditioning for subsequent water-based or solvent-based paint coatings"
      }
    },
    // DECORATIVES – Domestic
    {
      id: 15,
      slug: "jade-easy-floor",
      name: "JADE Easy Floor",
      brand: "DECORATIVES",
      division: "Domestic",
      category: "Decoratives",
      description: "This premium, water-based, and eco-friendly formulation delivers exceptional sealing and priming properties, creating the perfect foundation for subsequent topcoats.\n\nIdeal for both interior and exterior masonry surfaces.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Superior Adhesion & Resilience: Bonds securely to the substrate, providing a tough, hard-wearing base layer.",
        "Optimum Durability: Delivers outstanding longevity with advanced water and dirt resistance to withstand the elements.",
        "Exceptional Scratch & Abrasion Resistance: Shields against physical wear and tear, effectively minimizing scuffs and surface damage.",
        "Superior Chemical Resistance: Forms a robust protective barrier against environmental exposure and most common household chemicals.",
        "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring finish."
      ],
      colors: [
        "Grey",
        "Red",
        "Black",
        "Green",
        "Reddish Brown",
        "Titanium"
      ],
      finishes: ["Semi Gloss"],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Colors": "Grey, Red, Black, Green, Reddish Brown, Titanium (6 Colors)",
        "Available Finish": "Semi Gloss (Semi Gloss only)",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Interior and exterior masonry surfaces",
        "Formula": "Premium, water-based, and eco-friendly sealing & priming formulation",
        "Key Benefits": "Self-leveling, exceptional sealing and priming, superior adhesion, scratch & abrasion resistance, algal & fungal protection"
      }
    },
    {
      id: 16,
      slug: "jade-roof-wall-shield",
      name: "JADE Roof & WAll Shield",
      brand: "DECORATIVES",
      division: "Domestic",
      category: "Decoratives",
      description: "This self-priming, water-based, and eco-friendly decorative coating is a highly durable solution expertly engineered to protect exterior walls and roofing materials. Formulated for maximum efficiency, it delivers an impressive four times the coverage of standard emulsion paints.\n\nIdeal for masonry walls and a wide variety of roofing materials, including cement, terracotta, clay tiles, and asbestos sheets.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Superior Adhesion & Resilience: Bonds securely to the surface, providing a tough, hard-wearing protective layer designed to withstand the elements.",
        "Optimum Durability: Delivers outstanding longevity with advanced water and dirt resistance, keeping exteriors looking pristine.",
        "Exceptional Scratch & Abrasion Resistance: Shields against physical wear and tear, effectively minimizing scuffs and surface damage.",
        "Superior Chemical Resistance: Forms a robust protective barrier against environmental exposure and most common household chemicals.",
        "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring finish."
      ],
      colors: [
        "White",
        "Tile Red",
        "Roof Red",
        "Coffee Brown",
        "Spruce"
      ],
      finishes: ["Matt"],
      sizes: ["1L", "4L", "10L"],
      specs: {
        "Available Colors": "White, Tile Red, Roof Red, Coffee Brown, Spruce (5 Colors)",
        "Available Finish": "Matt (Matt Only)",
        "Available Sizes": "1L, 4L, 10L",
        "Ideal Substrates": "Masonry walls, cement, terracotta, clay tiles, and asbestos sheets",
        "Coverage Efficiency": "Delivers up to 4x the coverage of standard emulsion paints",
        "Formula": "Self-priming, water-based, and eco-friendly decorative coating",
        "Key Benefits": "Self-leveling, 4x coverage, self-priming, superior adhesion, scratch & abrasion resistance, algal & fungal protection"
      }
    },
    // METASHIELD – Industrial
    {
      id: 17,
      slug: "metashield-anti-corrosive-black",
      name: "Anti Corrosive – Black",
      brand: "METASHIELD",
      division: "Industrial",
      category: "Anti Corrosive",
      description: "This eco-friendly, water-based pigmented coating is expertly engineered to provide superior corrosion resistance for a variety of metal substrates. This innovative, fast-drying formula delivers exceptional adhesion and remarkable hardness. It is meticulously crafted from a specialized blend of premium resins and additives, specifically selected to ensure optimal substrate binding and robust anti-corrosive protection.\n\nIdeal for heavy-duty and decorative applications, including steel structures, metal furniture, vehicle undercarriages, and the steel bands of solid tires.",
      features: [
        "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
        "Exceptional Adhesion & Hardness: Bonds securely to metal surfaces, providing a tough, resilient, and highly durable protective layer.",
        "Superior Inter-Coat Adhesion: Creates an optimal foundation that seamlessly anchors subsequent topcoats for a lasting, professional finish.",
        "Outstanding Corrosion Resistance: Forms a robust barrier against rust and oxidation, significantly extending the lifespan of the metal.",
        "Optimum Weather & UV Protection: Delivers advanced resistance to harsh environmental conditions, weathering, and harmful ultraviolet rays."
      ],
      colors: [
        "Black"
      ],
      sizes: ["0.5L", "1L", "4L"],
      specs: {
        "Available Color": "Black (Black only)",
        "Available Sizes": "0.5L, 1L, 4L",
        "Ideal Substrates": "Steel structures, metal furniture, vehicle undercarriages, and steel bands of solid tires",
        "Formula": "Eco-friendly, water-based pigmented anti-corrosive coating",
        "Key Benefits": "Self-leveling, exceptional adhesion & hardness, superior inter-coat adhesion, outstanding corrosion & rust resistance, optimum weather & UV protection"
      }
    },
    // TYRESHIELD – Industrial
    {
      id: 18,
      slug: "tyreshield-wax-stick-black",
      name: "Wax Stick (Black)",
      brand: "TYRESHIELD",
      division: "Industrial",
      category: "Wax Stick",
      description: "This premium, eco-friendly TyreShield Wax Stick is expertly designed to seamlessly repair minor to moderate damage on solid rubber and plastic surfaces. Formulated for ultimate convenience and precision, it serves as the perfect preparatory treatment prior to the application of final topcoats, such as TyreShield All-In-One.\n\nIdeal for: Restoring, filling, and preparing solid rubber tires and plastic substrates to ensure a flawlessly smooth final finish.",
      features: [
        "Seamless Surface Repair: Expertly formulated to repair minor to moderate damage on solid rubber and plastic surfaces.",
        "Precision Preparatory Treatment: Serves as the perfect foundational treatment prior to applying final topcoats like TyreShield All-In-One.",
        "Restores & Fills Substrates: Fills and conditions solid rubber tires and plastic substrates to guarantee a flawlessly smooth finish.",
        "Eco-Friendly Formulation: Water-borne, eco-friendly compound engineered for clean handling and substrate safety.",
        "Convenient Application: Designed for rapid, hassle-free repair and optimal substrate binding."
      ],
      specs: {
        "Primary Function": "Repair minor to moderate damage on solid rubber and plastic surfaces",
        "Recommended System": "Preparatory treatment prior to TyreShield All-In-One topcoat",
        "Ideal Substrates": "Solid rubber tires and plastic substrates",
        "Formula": "Premium, eco-friendly solid wax repair compound",
        "Key Benefits": "Restores, fills, and prepares substrates for a flawlessly smooth final finish"
      }
    },
    {
      id: 19,
      slug: "tyreshield-all-in-one",
      name: "All in One",
      brand: "TYRESHIELD",
      division: "Industrial",
      category: "All in One",
      description: "This eco-friendly, water-based pigmented coating is expertly formulated to seamlessly mask minor cosmetic touch-ups and buffering repairs on cured tires.\n\nIdeal for restoring and refining the visual appearance of solid and cured rubber tires.",
      features: [
        "Superior Adhesion & Coverage: Bonds securely to the rubber surface while providing exceptional opacity to flawlessly conceal imperfections.",
        "Outstanding Inter-Coat Adhesion & Durability: Ensures a seamless bond with subsequent layers and delivers long-lasting resilience against harsh outdoor elements.",
        "Versatile Compatibility: Expertly engineered to perform consistently and safely across a diverse range of rubber compounds.",
        "Effortless Application & Cleanup: Features a user-friendly formulation that applies smoothly and cleans up effortlessly with just water."
      ],
      colors: [
        "White",
        "Black",
        "Grey",
        "Beige Light",
        "Beige Dark"
      ],
      colorNote: "Color may vary with the type of rubber compound",
      specs: {
        "Available Colors": "White, Black, Grey, Beige Light, Beige Dark (5 Colors - color may vary with the type of rubber compound)",
        "Ideal Substrates": "Solid and cured rubber tires",
        "Formula": "Eco-friendly, water-based pigmented coating",
        "Primary Applications": "Cosmetic touch-ups and buffering repairs on cured tires",
        "Key Benefits": "Superior adhesion & coverage, outstanding inter-coat durability, versatile rubber compound compatibility, effortless water cleanup"
      }
    },
    {
      id: 20,
      slug: "tyreshield-bladder-releaser",
      name: "Bladder Releaser",
      brand: "TYRESHIELD",
      division: "Industrial",
      category: "Bladder Releaser",
      description: "This eco-friendly, water-based pigmented coating is expertly formulated for rubber substrates. It is specifically engineered for the precise internal application of green tires (uncured tires) during the manufacturing process.\n\nIdeal for optimizing the molding and curing stages of rubber tire production.",
      features: [
        "Superior Slip Properties: Significantly reduces internal friction to ensure smooth handling, shaping, and flawless processing.",
        "Outstanding Air Release: Expertly formulated to facilitate the efficient escape of trapped air between the tire and the curing bladder, effectively minimizing manufacturing defects.",
        "Optimal Bladder Release: Ensures a seamless, residue-free separation from the vulcanizing bladder, extending bladder life and maintaining tire integrity.",
        "Effortless Application: Features a user-friendly consistency that guarantees even, efficient, and trouble-free coverage.",
        "Hassle-Free Cleanup: The premium water-based composition allows for quick, effortless equipment cleaning using only water."
      ],
      specs: {
        "Ideal Substrates": "Rubber substrates & green tires (uncured tires)",
        "Formula": "Eco-friendly, water-based pigmented coating",
        "Primary Application": "Internal application during molding and curing stages of rubber tire production",
        "Key Benefits": "Superior slip properties, outstanding air release, optimal bladder release, effortless application, water cleanup"
      }
    },
  ];

  db.projects = [
    { id: 1, name: "Shangri-La Hambantota", location: "Hambantota, Sri Lanka", description: "JADE Coatings supplied premium WOODSHIELD and MASOGUARD systems for the luxury Shangri-La resort, covering both interior timber finishes and exterior masonry protection.", image_url: "/images/projects/Shangrila hambanthota.png", type: "project" },
    { id: 2, name: "Heritance Ahungalla", location: "Ahungalla, Sri Lanka", description: "Eco-friendly water-based coatings were applied throughout the Heritance Ahungalla property, reflecting the resort's commitment to environmental stewardship.", image_url: "/images/projects/Heritance ahungalla.png", type: "project" },
    { id: 3, name: "Jetwing Blue Negombo", location: "Negombo, Sri Lanka", description: "Full-scope coating application for Jetwing Blue, utilising WOODSHIELD marine-grade finishes for beach-facing timber surfaces and MASOGUARD for facade protection.", image_url: "/images/projects/jetwing blue negombo.png", type: "project" },
    { id: 4, name: "Palm Resort Nilaveli", location: "Nilaveli, Sri Lanka", description: "Comprehensive wood and masonry protection for this coastal resort, where JADE's marine-resistant formulas excel in the high-humidity, salt-air environment.", image_url: "/images/projects/palm resort.png", type: "project" },
    { id: 5, name: "Thissa Safari Hotel", location: "Tissamaharama, Sri Lanka", description: "JADE Coatings provided durable, eco-friendly finishes for the Safari Hotel's timber chalets and outdoor structures, designed to withstand the tropical climate.", image_url: "/images/projects/thissa safari.png", type: "project" },
    { id: 15, name: "Amaya Resorts & Spas", location: "Kandy & Cultural Triangle, Sri Lanka", description: "Premium timber conditioning, deck preservation, and masonry protection across luxury chalets, suites, and eco-heritage wellness pavilions.", image_url: "/images/projects/amaya resort.png", type: "project" },
    { id: 16, name: "Margosa Bay", location: "Trincomalee, Sri Lanka", description: "Marine-grade eco-friendly coastal finishes delivering ultimate UV, high-humidity, and saline resistance for beachfront boutique chalets.", image_url: "/images/projects/Margosa Bay.png", type: "project" },
    { id: 6, name: "Prime Lands", location: "Sri Lanka", description: "Trusted real estate developer", image_url: "/images/clients/prime-lands.png", type: "client" },
    { id: 7, name: "Pizza Hut", location: "Sri Lanka", description: "International QSR chain", image_url: "/images/clients/pizza-hut.png", type: "client" },
    { id: 8, name: "Sri Lanka Army", location: "Sri Lanka", description: "National defence institution", image_url: "/images/clients/sla.png", type: "client" },
    { id: 10, name: "El Toro", location: "Sri Lanka", description: "Restaurant & dining brand", image_url: "/images/clients/el-toro.png", type: "client" },
    { id: 11, name: "Conwood", location: "Sri Lanka", description: "Building materials manufacturer", image_url: "/images/clients/conwood.png", type: "client" },
    { id: 13, name: "Yokohama TWS", location: "Global / Sri Lanka", description: "Global leader in off-highway tyre systems & specialty wheel solutions", image_url: "/images/clients/yokohama.png", type: "client" },
    { id: 14, name: "Michelin", location: "Global / Sri Lanka", description: "Global tyre manufacturing leader", image_url: "/images/clients/Michelin.png", type: "client" },
    { id: 18, name: "Home Lands", location: "Sri Lanka", description: "Leading real estate & residential developer", image_url: "/images/clients/home lands.png", type: "client" },
    { id: 19, name: "Furnicraft", location: "Sri Lanka", description: "Architectural furniture & interior manufacturing", image_url: "/images/clients/furnicraft.png", type: "client" },
    { id: 20, name: "Karapitiya Hospital", location: "Galle, Sri Lanka", description: "National healthcare & teaching hospital institution", image_url: "/images/clients/karapitiya hospital.png", type: "client" },
  ];

  db.contacts = [];
  db.seeded = true;
  writeDb(db);
}
