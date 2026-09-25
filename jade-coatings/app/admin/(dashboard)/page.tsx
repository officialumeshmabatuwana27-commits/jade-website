import Link from "next/link";
import { getProducts, getProjects } from "@/lib/db";
import {
  Package,
  Building2,
  Users,
  ShieldCheck,
  Plus,
  ArrowRight,
  Sparkles,
  Database,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const products = getProducts();
  const { projects, clients } = getProjects();

  const domesticCount = products.filter((p) => p.division === "Domestic").length;
  const industrialCount = products.filter((p) => p.division === "Industrial").length;

  return (
    <div className="space-y-6 pt-14 lg:pt-0">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-slate-900 via-charcoal to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-jade-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jade-500/10 border border-jade-500/20 text-jade-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Content Management Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Control Panel & Live Data Store
            </h1>
            <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Manage product catalogs, technical coverage estimations, landmark project portfolios, and enterprise client partnerships with instantaneous dynamic updates across the public website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-jade-500 hover:bg-jade-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-jade-900/40 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Project / Client
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white dark:bg-[#131B26] p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-slate-400">
              Total Products
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-charcoal dark:text-white">
              {products.length}
            </span>
            <span className="text-xs text-charcoal/50 dark:text-slate-400">
              Active SKU items
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-charcoal/70 dark:text-slate-300">
            <span>Domestic: <strong>{domesticCount}</strong></span>
            <span>Industrial: <strong>{industrialCount}</strong></span>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="bg-white dark:bg-[#131B26] p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-slate-400">
              Landmark Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-charcoal dark:text-white">
              {projects.length}
            </span>
            <span className="text-xs text-charcoal/50 dark:text-slate-400">
              Resorts & Landmarks
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-jade-600 dark:text-jade-400">
            <Link href="/admin/projects" className="hover:underline flex items-center gap-1 font-medium">
              Manage portfolio <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Industry Clients */}
        <div className="bg-white dark:bg-[#131B26] p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-slate-400">
              Enterprise Clients
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-charcoal dark:text-white">
              {clients.length}
            </span>
            <span className="text-xs text-charcoal/50 dark:text-slate-400">
              Corporate & Leaders
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-jade-600 dark:text-jade-400">
            <Link href="/admin/projects" className="hover:underline flex items-center gap-1 font-medium">
              Manage clients <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white dark:bg-[#131B26] p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 dark:text-slate-400">
              Database Sync
            </span>
            <div className="w-9 h-9 rounded-xl bg-jade-50 dark:bg-jade-500/10 text-jade-600 dark:text-jade-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-lg font-bold text-charcoal dark:text-white">
              Active & Persisted
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 text-[11px] text-charcoal/50 dark:text-slate-400">
            Storage: <code className="font-mono text-jade-600 dark:text-jade-400">data/db.json</code>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Products Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#131B26] rounded-2xl border border-gray-100 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-slate-800">
            <div>
              <h2 className="font-bold text-base text-charcoal dark:text-white">
                Live Products
              </h2>
              <p className="text-xs text-charcoal/50 dark:text-slate-400">
                Latest coatings available on public catalog
              </p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-jade-600 dark:text-jade-400 hover:underline flex items-center gap-1"
            >
              View all ({products.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-slate-800/80">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="py-3 flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-charcoal/60 dark:text-slate-300 flex-shrink-0">
                    {product.brand.substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-charcoal dark:text-white truncate group-hover:text-jade-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-charcoal/50 dark:text-slate-400 mt-0.5">
                      <span className="font-medium text-jade-600 dark:text-jade-400">
                        {product.brand}
                      </span>
                      <span>•</span>
                      <span>{product.division}</span>
                      {product.coverage && (
                        <>
                          <span>•</span>
                          <span>{product.coverage}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/admin/products?edit=${product.id}`}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-slate-800 hover:bg-jade-50 dark:hover:bg-jade-900/30 text-charcoal dark:text-slate-200 hover:text-jade-600 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#131B26] rounded-2xl border border-gray-100 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-slate-800">
              <div>
                <h2 className="font-bold text-base text-charcoal dark:text-white">
                  Projects & Clients
                </h2>
                <p className="text-xs text-charcoal/50 dark:text-slate-400">
                  Resorts and corporate partnerships
                </p>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs font-semibold text-jade-600 dark:text-jade-400 hover:underline flex items-center gap-1"
              >
                Manage <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {[...projects.slice(0, 3), ...clients.slice(0, 3)].map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="p-3 rounded-xl bg-gray-50/70 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-charcoal dark:text-white truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-charcoal/50 dark:text-slate-400 truncate">
                      {item.location}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.type === "project"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
            <Link
              href="/projects"
              target="_blank"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-jade-500 text-charcoal dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>View Public Projects Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
