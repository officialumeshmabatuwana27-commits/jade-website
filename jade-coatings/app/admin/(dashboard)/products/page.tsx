"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  Check,
  AlertCircle,
  Loader2,
  ExternalLink,
  ImageIcon,
  Sparkles,
  Layers,
  Filter,
} from "lucide-react";

interface Product {
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
  colors?: string[];
  sizes?: string[];
  finishes?: string[];
}

const BRANDS_BY_DIVISION: Record<string, string[]> = {
  Domestic: ["WOODSHIELD", "MASOGUARD", "DECORATIVES", "ECO-CLEANER"],
  Industrial: ["METASHIELD", "TYRESHIELD"],
};

function AdminProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("All");
  const [filterBrand, setFilterBrand] = useState<string>("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [division, setDivision] = useState<"Domestic" | "Industrial">("Domestic");
  const [brand, setBrand] = useState("WOODSHIELD");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [coveragePerLiter, setCoveragePerLiter] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete Confirmation Modal
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch Products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Check URL params for auto-open edit modal
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId && products.length > 0) {
      const p = products.find((x) => x.id === Number(editId));
      if (p) openEditModal(p);
    }
  }, [searchParams, products]);

  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setDivision("Domestic");
    setBrand("WOODSHIELD");
    setCategory("WOODSHIELD");
    setDescription("");
    setFeaturesText("");
    setCoveragePerLiter("");
    setImage("");
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setDivision((p.division as "Domestic" | "Industrial") || "Domestic");
    setBrand(p.brand);
    setCategory(p.category || p.brand);
    setDescription(p.description);
    setFeaturesText(Array.isArray(p.features) ? p.features.join("\n") : "");
    setCoveragePerLiter(p.coveragePerLiter || "");
    setImage(p.image || p.afterImage || "");
    setFormError(null);
    setIsModalOpen(true);
  };

  // Image upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setFormError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to upload image");
        setUploadingImage(false);
        return;
      }

      setImage(data.url);
    } catch {
      setFormError("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save product (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Product name is required");
      return;
    }
    if (!description.trim()) {
      setFormError("Description is required");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: name.trim(),
        division,
        brand,
        category: category.trim() || brand,
        description: description.trim(),
        features: featuresText
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
        coverage: coveragePerLiter ? `1L = ${coveragePerLiter} sq.ft` : undefined,
        coveragePerLiter: coveragePerLiter ? Number(coveragePerLiter) : undefined,
        image: image || undefined,
        afterImage: image || undefined,
      };

      if (editingProduct) {
        // UPDATE
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update product");
        }
      } else {
        // CREATE
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create product");
        }
      }

      setIsModalOpen(false);
      await loadProducts();
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to delete product");
        setDeleting(false);
        return;
      }

      setProductToDelete(null);
      await loadProducts();
      router.refresh();
    } catch {
      alert("Error deleting product");
    } finally {
      setDeleting(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchesDivision =
      filterDivision === "All" || p.division === filterDivision;

    const matchesBrand =
      filterBrand === "All" || p.brand === filterBrand;

    return matchesSearch && matchesDivision && matchesBrand;
  });

  return (
    <div className="space-y-6 pt-14 lg:pt-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#131B26] p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal dark:text-white tracking-tight">
              Product Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-jade-50 dark:bg-jade-900/30 text-jade-700 dark:text-jade-300 font-bold text-xs">
              {products.length} Products
            </span>
          </div>
          <p className="text-charcoal/60 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Add, update, or remove coatings, formulas, coverage ratings, and imagery.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-jade-600 hover:bg-jade-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-jade-900/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Filters Strip */}
      <div className="bg-white dark:bg-[#131B26] p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center gap-3 justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or brand..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500"
          />
        </div>

        {/* Division & Brand Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Division Filter */}
          <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {["All", "Domestic", "Industrial"].map((div) => (
              <button
                key={div}
                onClick={() => {
                  setFilterDivision(div);
                  setFilterBrand("All");
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterDivision === div
                    ? "bg-white dark:bg-slate-700 text-jade-700 dark:text-jade-300 shadow-xs font-bold"
                    : "text-charcoal/60 dark:text-slate-400 hover:text-charcoal dark:hover:text-white"
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          {/* Sub-category / Brand Filter */}
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500"
          >
            <option value="All">All Sub-categories</option>
            <option value="WOODSHIELD">WOODSHIELD</option>
            <option value="MASOGUARD">MASOGUARD</option>
            <option value="DECORATIVES">DECORATIVES</option>
            <option value="METASHIELD">METASHIELD</option>
            <option value="TYRESHIELD">TYRESHIELD</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#131B26] rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-charcoal/50 dark:text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-jade-500 mb-2" />
            <span className="text-xs font-semibold">Loading product catalog...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-charcoal/50 dark:text-slate-400">
            <Package className="w-10 h-10 mx-auto text-charcoal/30 mb-2" />
            <p className="font-semibold text-sm">No products found matching filters</p>
            <button
              onClick={() => {
                setSearch("");
                setFilterDivision("All");
                setFilterBrand("All");
              }}
              className="mt-3 text-xs text-jade-600 font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50/80 dark:bg-slate-900/60 border-b border-gray-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-charcoal/60 dark:text-slate-400">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Product</th>
                  <th className="py-3.5 px-4">Division</th>
                  <th className="py-3.5 px-4">Sub-Category (Brand)</th>
                  <th className="py-3.5 px-4">Coverage Rate</th>
                  <th className="py-3.5 px-4">Features</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
                {filteredProducts.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {p.image || p.afterImage ? (
                            <img
                              src={p.image || p.afterImage}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-xs text-jade-600 dark:text-jade-400">
                              {p.brand.substring(0, 2)}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-charcoal dark:text-white truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-charcoal/50 dark:text-slate-400 truncate max-w-xs">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          p.division === "Domestic"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        }`}
                      >
                        {p.division}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-charcoal dark:text-slate-200">
                        {p.brand}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {p.coveragePerLiter ? (
                        <span className="font-mono text-jade-600 dark:text-jade-400 font-bold">
                          {p.coveragePerLiter} sq.ft/L
                        </span>
                      ) : p.coverage ? (
                        <span className="text-charcoal/70 dark:text-slate-300 text-xs">
                          {p.coverage}
                        </span>
                      ) : (
                        <span className="text-charcoal/30 dark:text-slate-500 italic">
                          Standard
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[11px] text-charcoal/60 dark:text-slate-400">
                        {Array.isArray(p.features) ? `${p.features.length} points` : "None"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          title="View on Public Website"
                          className="p-1.5 rounded-lg text-charcoal/50 hover:text-charcoal dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(p)}
                          title="Edit Product"
                          className="p-1.5 rounded-lg text-jade-600 hover:text-jade-700 hover:bg-jade-50 dark:hover:bg-jade-900/30 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(p)}
                          title="Delete Product"
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white dark:bg-[#131B26] border border-gray-100 dark:border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-charcoal dark:text-white">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="text-xs text-charcoal/50 dark:text-slate-400">
                  {editingProduct
                    ? `Updating ${editingProduct.name} (${editingProduct.brand})`
                    : "Fill in the product specifications to publish to the catalog"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-charcoal/40 hover:text-charcoal dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* 1. Name & Division */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. WOODSHIELD Sanding Sealer"
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                    Category (Division) *
                  </label>
                  <select
                    value={division}
                    onChange={(e) => {
                      const div = e.target.value as "Domestic" | "Industrial";
                      setDivision(div);
                      if (div === "Domestic") setBrand("WOODSHIELD");
                      if (div === "Industrial") setBrand("METASHIELD");
                    }}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-semibold"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>

              {/* 2. Sub-category (Brand) & Coverage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                    Sub-category (Brand) *
                  </label>
                  <input
                    type="text"
                    required
                    list="brand-suggestions"
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setCategory(e.target.value);
                    }}
                    placeholder="e.g. WOODSHIELD, MASOGUARD, METASHIELD"
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-semibold"
                  />
                  <datalist id="brand-suggestions">
                    {(BRANDS_BY_DIVISION[division] || []).map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                    Coverage (sq.ft per Liter)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={coveragePerLiter}
                    onChange={(e) =>
                      setCoveragePerLiter(e.target.value ? Number(e.target.value) : "")
                    }
                    placeholder="e.g. 120"
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-semibold"
                  />
                  <span className="text-[10px] text-charcoal/50 dark:text-slate-400 mt-1 block">
                    Automatically powers the Coverage Calculator widget.
                  </span>
                </div>
              </div>

              {/* 3. Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description of the coating system, formula, substrate compatibility, and key applications..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 leading-relaxed"
                />
              </div>

              {/* 4. Key Features */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                  Key Features (One feature per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Superior adhesion & water-repellency&#10;Scratch & UV-resistant cross-linked polymer&#10;Eco-friendly zero-VOC formulation"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-mono text-[11px]"
                />
              </div>

              {/* 5. Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                  Product Image / Comparison Photograph
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Preview Thumbnail */}
                  <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                    {image ? (
                      <img
                        src={image}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-2 text-charcoal/40 dark:text-slate-500">
                        <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-60" />
                        <span className="text-[10px] block">No image</span>
                      </div>
                    )}

                    {image && (
                      <button
                        type="button"
                        onClick={() => setImage("")}
                        className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-charcoal dark:text-white text-xs font-bold transition-colors cursor-pointer">
                      {uploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-jade-500" />
                          <span>Uploading image...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-jade-600" />
                          <span>Upload Image File (PNG, JPG, WEBP)</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-charcoal/40 dark:text-slate-500">
                        Or enter path/URL:
                      </span>
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="/images/products/woodshield.png"
                        className="flex-1 px-3 py-1 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-charcoal dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-charcoal/70 dark:text-slate-300 font-semibold text-xs hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-5 py-2.5 rounded-xl bg-jade-600 hover:bg-jade-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-jade-900/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {editingProduct ? "Update Product" : "Publish Product"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#131B26] border border-gray-100 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-charcoal dark:text-white">
                Delete Product?
              </h3>
              <p className="text-xs text-charcoal/60 dark:text-slate-400 mt-1">
                Are you sure you want to delete <strong>{productToDelete.name}</strong>? This action will remove it from the catalog and cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-charcoal/70 dark:text-slate-300 font-semibold text-xs hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-red-900/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>Delete Permanently</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center text-charcoal/50 dark:text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-jade-500 mb-2" />
          <span className="text-xs font-semibold">Loading product management...</span>
        </div>
      }
    >
      <AdminProductsContent />
    </Suspense>
  );
}
