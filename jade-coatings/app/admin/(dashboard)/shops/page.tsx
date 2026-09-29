"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  Phone,
  Clock,
  Search,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Building,
  Navigation,
  X,
  Compass,
} from "lucide-react";

interface Shop {
  id: number;
  name: string;
  address: string;
  city: string;
  district?: string;
  phone: string;
  lat: number;
  lng: number;
  openingHours?: string;
  isAuthorizedDealer?: boolean;
}

// Quick City coordinate presets to assist the admin
const SRI_LANKA_CITY_PRESETS: { city: string; lat: number; lng: number }[] = [
  { city: "Colombo", lat: 6.9271, lng: 79.8612 },
  { city: "Nugegoda", lat: 6.8649, lng: 79.8997 },
  { city: "Dehiwala", lat: 6.8415, lng: 79.868 },
  { city: "Battaramulla", lat: 6.9012, lng: 79.918 },
  { city: "Gampaha", lat: 7.084, lng: 79.9939 },
  { city: "Kadawatha", lat: 7.0016, lng: 79.9535 },
  { city: "Negombo", lat: 7.2083, lng: 79.8358 },
  { city: "Kandy", lat: 7.2936, lng: 80.6382 },
  { city: "Galle", lat: 6.0367, lng: 80.217 },
  { city: "Matara", lat: 5.9496, lng: 80.5469 },
  { city: "Kurunegala", lat: 7.4863, lng: 80.3647 },
  { city: "Ratnapura", lat: 6.6828, lng: 80.4005 },
  { city: "Badulla", lat: 6.9934, lng: 81.055 },
  { city: "Anuradhapura", lat: 8.3114, lng: 80.4037 },
  { city: "Jaffna", lat: 9.6615, lng: 80.0255 },
];

export default function AdminShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "Colombo",
    district: "Colombo",
    phone: "",
    lat: "6.9271",
    lng: "79.8612",
    openingHours: "Mon - Sat: 8:00 AM - 6:00 PM",
    isAuthorizedDealer: true,
  });

  const fetchShops = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/shops");
      if (res.ok) {
        const data = await res.json();
        setShops(data);
      }
    } catch (err) {
      console.error("Failed to fetch shops:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleCityPresetChange = (cityName: string) => {
    const preset = SRI_LANKA_CITY_PRESETS.find(
      (p) => p.city.toLowerCase() === cityName.toLowerCase()
    );
    if (preset) {
      setFormData((prev) => ({
        ...prev,
        city: preset.city,
        district: preset.city,
        lat: String(preset.lat),
        lng: String(preset.lng),
      }));
    } else {
      setFormData((prev) => ({ ...prev, city: cityName }));
    }
  };

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!formData.name.trim() || !formData.address.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in Shop Name, Address, and Phone Number.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lat: parseFloat(formData.lat) || 6.9271,
          lng: parseFloat(formData.lng) || 79.8612,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create shop");
      }

      setSuccessMsg(`Shop "${formData.name}" was successfully added!`);
      setIsModalOpen(false);
      setFormData({
        name: "",
        address: "",
        city: "Colombo",
        district: "Colombo",
        phone: "",
        lat: "6.9271",
        lng: "79.8612",
        openingHours: "Mon - Sat: 8:00 AM - 6:00 PM",
        isAuthorizedDealer: true,
      });
      fetchShops();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to add shop.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteShop = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete the shop "${name}"?`)) return;

    try {
      const res = await fetch(`/api/shops/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setShops((prev) => prev.filter((s) => s.id !== id));
        setSuccessMsg(`Shop "${name}" deleted.`);
      } else {
        alert("Failed to delete shop.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting shop.");
    }
  };

  const filtered = shops.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pt-14 lg:pt-0">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jade-500/10 border border-jade-500/20 text-jade-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5" />
              Store & Dealer Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Manage Authorized Shops & Dealers
            </h1>
            <p className="text-white/70 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Add new retail outlets, hardware paint distributors, and technical service centers with precise latitude/longitude coordinates to appear instantly on the public interactive map.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-jade-500 hover:bg-jade-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-jade-900/40 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add New Shop
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-500 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Stats bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by shop name, city, address..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-jade-500"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
          <span>
            Total Shops: <strong className="text-charcoal">{shops.length}</strong>
          </span>
          <span className="text-gray-300">|</span>
          <span>
            Showing: <strong className="text-jade-600">{filtered.length}</strong>
          </span>
        </div>
      </div>

      {/* Shops Table / Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100">
          <div className="w-8 h-8 border-3 border-jade-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500 font-semibold">Loading shops directory...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-gray-100">
          <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-bold text-gray-700">No shops found</h3>
          <p className="text-xs text-gray-400 mt-1">Try a different search term or add a new shop above.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-5">Shop Details</th>
                  <th className="py-3.5 px-5">City / District</th>
                  <th className="py-3.5 px-5">Phone & Hours</th>
                  <th className="py-3.5 px-5">Coordinates</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((shop) => (
                  <tr key={shop.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-charcoal">{shop.name}</span>
                        {shop.isAuthorizedDealer && (
                          <span className="px-2 py-0.5 rounded-full bg-jade-50 text-jade-700 text-[10px] font-bold border border-jade-200">
                            Authorized
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{shop.address}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-bold text-charcoal">{shop.city}</span>
                      {shop.district && shop.district !== shop.city && (
                        <span className="block text-[11px] text-gray-400">
                          {shop.district} District
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 space-y-1">
                      <a
                        href={`tel:${shop.phone}`}
                        className="inline-flex items-center gap-1 font-semibold text-jade-600 hover:underline"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{shop.phone}</span>
                      </a>
                      {shop.openingHours && (
                        <div className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{shop.openingHours}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-5 text-xs text-gray-500 font-mono">
                      <span>{shop.lat.toFixed(4)}, {shop.lng.toFixed(4)}</span>
                      <a
                        href={`https://www.google.com/maps?q=${shop.lat},${shop.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[10px] text-blue-600 hover:underline mt-0.5"
                      >
                        Preview Map ↗
                      </a>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleDeleteShop(shop.id, shop.name)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        title="Delete Shop"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Shop Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 animate-in fade-in">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-charcoal">Add New Shop / Dealer</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Enter dealer information to register on the interactive locator.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShop} className="p-6 space-y-4 text-xs sm:text-sm">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Shop / Dealer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Colombo City Paint & Hardware Mart"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-charcoal focus:outline-none focus:border-jade-500"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Full Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 182 Sri Sangaraja Mawatha, Colombo 10"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-charcoal focus:outline-none focus:border-jade-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-charcoal mb-1">
                    City / Town <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleCityPresetChange(e.target.value)}
                    placeholder="e.g. Colombo"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-charcoal focus:outline-none focus:border-jade-500"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Type a city to auto-fill coordinates preset.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-charcoal mb-1">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +94 11 243 1245 / 077 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-charcoal focus:outline-none focus:border-jade-500"
                  />
                </div>
              </div>

              {/* Coordinates: Lat & Lng */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-charcoal text-xs flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-jade-600" />
                    Map Coordinates (Latitude & Longitude)
                  </span>
                  <select
                    onChange={(e) => handleCityPresetChange(e.target.value)}
                    className="text-[11px] font-semibold bg-white border border-gray-200 rounded-lg px-2 py-1 text-charcoal"
                  >
                    <option value="">Quick City Preset...</option>
                    {SRI_LANKA_CITY_PRESETS.map((p) => (
                      <option key={p.city} value={p.city}>
                        {p.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={formData.lat}
                      onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={formData.lng}
                      onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  placeholder="e.g. Mon - Sat: 8:00 AM - 6:00 PM"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-charcoal focus:outline-none focus:border-jade-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="authorizedCheck"
                  checked={formData.isAuthorizedDealer}
                  onChange={(e) => setFormData({ ...formData, isAuthorizedDealer: e.target.checked })}
                  className="w-4 h-4 rounded text-jade-600 focus:ring-jade-500"
                />
                <label htmlFor="authorizedCheck" className="text-xs font-bold text-charcoal cursor-pointer">
                  Mark as Authorized JADE Coatings Dealer
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-jade-500 hover:bg-jade-600 text-white font-bold transition-all shadow-md shadow-jade-900/30 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save Shop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
