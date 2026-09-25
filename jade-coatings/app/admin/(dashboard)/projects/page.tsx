"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Users,
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
  MapPin,
} from "lucide-react";

interface ProjectItem {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  type: string; // 'project' | 'client'
}

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [clients, setClients] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "project" | "client">("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [type, setType] = useState<"project" | "client">("project");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete State
  const [itemToDelete, setItemToDelete] = useState<ProjectItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
      setClients(data.clients || []);
    } catch (err) {
      console.error("Failed to load projects/clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = (presetType: "project" | "client" = "project") => {
    setEditingItem(null);
    setName("");
    setType(presetType);
    setLocation(presetType === "project" ? "Sri Lanka" : "National / Sri Lanka");
    setDescription("");
    setImageUrl("");
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: ProjectItem) => {
    setEditingItem(item);
    setName(item.name);
    setType(item.type === "client" ? "client" : "project");
    setLocation(item.location);
    setDescription(item.description);
    setImageUrl(item.image_url);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Upload Logo / Photograph
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

      setImageUrl(data.url);
    } catch {
      setFormError("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Name is required");
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
        type,
        location: location.trim() || (type === "project" ? "Sri Lanka" : "National / Sri Lanka"),
        description: description.trim(),
        image_url: imageUrl.trim() || "/images/projects/default.png",
      };

      if (editingItem) {
        // UPDATE
        const res = await fetch(`/api/projects/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update item");
        }
      } else {
        // CREATE
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create item");
        }
      }

      setIsModalOpen(false);
      await loadData();
      router.refresh();
    } catch (err: any) {
      setFormError(err.message || "Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!itemToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/projects/${itemToDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to delete item");
        setDeleting(false);
        return;
      }

      setItemToDelete(null);
      await loadData();
      router.refresh();
    } catch {
      alert("Error deleting item");
    } finally {
      setDeleting(false);
    }
  };

  const allItems = [...projects, ...clients];

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === "all" || item.type === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 pt-14 lg:pt-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#131B26] p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal dark:text-white tracking-tight">
              Projects & Clients Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-xs">
              {projects.length} Projects • {clients.length} Clients
            </span>
          </div>
          <p className="text-charcoal/60 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Manage resort portfolios, architectural case studies, enterprise brand partners, and logos.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openAddModal("project")}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Landmark Project
          </button>
          <button
            onClick={() => openAddModal("client")}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-jade-600 hover:bg-jade-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Enterprise Client
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-[#131B26] p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center gap-3 justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, location, or description..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500"
          />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold w-full md:w-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-white dark:bg-slate-700 text-charcoal dark:text-white shadow-xs font-bold"
                : "text-charcoal/60 dark:text-slate-400 hover:text-charcoal dark:hover:text-white"
            }`}
          >
            All Items ({allItems.length})
          </button>
          <button
            onClick={() => setActiveTab("project")}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "project"
                ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs font-bold"
                : "text-charcoal/60 dark:text-slate-400 hover:text-charcoal dark:hover:text-white"
            }`}
          >
            Landmark Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("client")}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "client"
                ? "bg-white dark:bg-slate-700 text-jade-600 dark:text-jade-400 shadow-xs font-bold"
                : "text-charcoal/60 dark:text-slate-400 hover:text-charcoal dark:hover:text-white"
            }`}
          >
            Enterprise Clients ({clients.length})
          </button>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white dark:bg-[#131B26] rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-charcoal/50 dark:text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-jade-500 mb-2" />
            <span className="text-xs font-semibold">Loading projects & clients...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center text-charcoal/50 dark:text-slate-400">
            <Building2 className="w-10 h-10 mx-auto text-charcoal/30 mb-2" />
            <p className="font-semibold text-sm">No items found matching search</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50/80 dark:bg-slate-900/60 border-b border-gray-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-charcoal/60 dark:text-slate-400">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Name & Image</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location / Region</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
                {filteredItems.map((item) => (
                  <tr
                    key={`${item.type}-${item.id}`}
                    className="hover:bg-gray-50/60 dark:hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 p-1 overflow-hidden">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="font-bold text-xs text-charcoal/50">
                              {item.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-charcoal dark:text-white truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-charcoal/40 dark:text-slate-500 truncate max-w-xs font-mono">
                            {item.image_url}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.type === "project"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                        }`}
                      >
                        {item.type === "project" ? "Landmark Project" : "Enterprise Client"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-charcoal/70 dark:text-slate-300 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-jade-500 flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-xs text-charcoal/60 dark:text-slate-400 line-clamp-2">
                        {item.description}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          title="Edit"
                          className="p-1.5 rounded-lg text-jade-600 hover:text-jade-700 hover:bg-jade-50 dark:hover:bg-jade-900/30 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setItemToDelete(item)}
                          title="Delete"
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

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white dark:bg-[#131B26] border border-gray-100 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-charcoal dark:text-white">
                  {editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}
                </h2>
                <p className="text-xs text-charcoal/50 dark:text-slate-400">
                  {editingItem ? `Editing ${editingItem.name}` : "Configure project or corporate client"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-charcoal/40 hover:text-charcoal dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Name & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Amaya Resorts & Spas"
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                    Type *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "project" | "client")}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-semibold"
                  >
                    <option value="project">Landmark Project (Hotels & Resorts)</option>
                    <option value="client">Enterprise Client (Industry Leader)</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                  Location / Sub-Region
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kandy & Cultural Triangle, Sri Lanka"
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 font-semibold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details of the coating solution applied, client profile, or architectural scope..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-jade-500 leading-relaxed"
                />
              </div>

              {/* Logo / Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 dark:text-slate-300 mb-1.5">
                  Logo / Cover Image
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0 relative group">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-1 text-charcoal/40 dark:text-slate-500">
                        <ImageIcon className="w-5 h-5 mx-auto mb-1 opacity-60" />
                        <span className="text-[9px] block">No logo</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-charcoal dark:text-white text-xs font-bold transition-colors cursor-pointer">
                      {uploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-jade-500" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-jade-600" />
                          <span>Upload Image / Logo (PNG, JPG)</span>
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

                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/images/projects/shangrila.png"
                      className="w-full px-3 py-1 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-xs text-charcoal dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {editingItem ? "Update Item" : "Save Item"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-[#131B26] border border-gray-100 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-charcoal dark:text-white">
                Delete {itemToDelete.type === "project" ? "Project" : "Client"}?
              </h3>
              <p className="text-xs text-charcoal/60 dark:text-slate-400 mt-1">
                Are you sure you want to remove <strong>{itemToDelete.name}</strong> from the website?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
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
