"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Navigation,
  Phone,
  Search,
  Crosshair,
  Clock,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  AlertCircle,
  Building,
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

// Calculate distance between two lat/lng points in kilometers (Haversine formula)
function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const MAPBOX_ACCESS_TOKEN =
  typeof window !== "undefined"
    ? atob(
        "cGsuZXlKMUlqb2lkVzFsYzJneU4ycGhaR1VpTENKaElqb2lZMjExYlRsb1luQnJNREEwYURKNGN6bHdOMnBxZGpnM09TSjkuMVQwOUFER3FVWDltTWdQc0RCV0pVZw=="
      )
    : "";

export default function FindAShopPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRadius, setSelectedRadius] = useState<number | null>(10); // 5, 10, 20 or null for All
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  } | null>(null);
  const [locating, setLocating] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);

  // Fetch shops from database
  useEffect(() => {
    async function loadShops() {
      try {
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
    }
    loadShops();
  }, []);

  // Compute distance and filter by radius
  const filteredShops = useMemo(() => {
    return shops
      .map((shop) => {
        let distance: number | null = null;
        if (userLocation) {
          distance = calculateDistanceKm(
            userLocation.lat,
            userLocation.lng,
            shop.lat,
            shop.lng
          );
        }
        return { ...shop, distance };
      })
      .filter((shop) => {
        // If search query is entered and no userLocation, filter textually
        if (searchQuery.trim() && !userLocation) {
          const q = searchQuery.toLowerCase();
          return (
            shop.name.toLowerCase().includes(q) ||
            shop.city.toLowerCase().includes(q) ||
            shop.address.toLowerCase().includes(q)
          );
        }

        // If radius is set and user location is available, filter by distance
        if (selectedRadius !== null && shop.distance !== null) {
          return shop.distance <= selectedRadius;
        }

        return true;
      })
      .sort((a, b) => {
        if (a.distance !== null && b.distance !== null) {
          return a.distance - b.distance; // Minimum to longest distance
        }
        return a.name.localeCompare(b.name);
      });
  }, [shops, userLocation, selectedRadius, searchQuery]);

  // Dynamically load Mapbox GL JS and CSS
  useEffect(() => {
    if (!document.getElementById("mapbox-gl-css")) {
      const link = document.createElement("link");
      link.id = "mapbox-gl-css";
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById("mapbox-gl-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "mapbox-gl-script";
      script.src = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js";
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else if ((window as any).mapboxgl) {
      initMap();
    }
  }, [shops]);

  const initMap = () => {
    if (!mapRef.current || !(window as any).mapboxgl) return;
    (window as any).mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    const center = userLocation
      ? [userLocation.lng, userLocation.lat]
      : [79.8612, 6.9271];

    const map = new (window as any).mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom: userLocation ? 12 : 8.5,
    });

    map.addControl(new (window as any).mapboxgl.NavigationControl(), "top-right");
    map.addControl(new (window as any).mapboxgl.FullscreenControl(), "top-right");

    map.on("load", () => {
      mapInstance.current = map;
      renderMarkers();
    });

    mapInstance.current = map;
  };

  // Re-render markers whenever shops or userLocation change
  const renderMarkers = () => {
    const map = mapInstance.current;
    if (!map || !(window as any).mapboxgl) return;

    // Clear existing shop markers
    markersRef.current.forEach((m) => {
      if (m && m.marker) m.marker.remove();
    });
    markersRef.current = [];

    // User location marker
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const el = document.createElement("div");
      el.className = "w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center animate-pulse";
      el.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-white"></span>';

      userMarkerRef.current = new (window as any).mapboxgl.Marker({ element: el })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new (window as any).mapboxgl.Popup({ offset: 15 }).setHTML(`<strong>${userLocation.name || "Your Location"}</strong>`))
        .addTo(map);
    }

    // Add markers for filtered shops
    const bounds = new (window as any).mapboxgl.LngLatBounds();
    if (userLocation) {
      bounds.extend([userLocation.lng, userLocation.lat]);
    }

    filteredShops.forEach((shop) => {
      bounds.extend([shop.lng, shop.lat]);

      const pinEl = document.createElement("div");
      pinEl.className = "cursor-pointer transform hover:scale-125 transition-transform duration-200";
      pinEl.innerHTML = `
        <div class="relative flex items-center justify-center">
          <svg class="w-9 h-9 drop-shadow-md" viewBox="0 0 24 24" fill="${shop.isAuthorizedDealer ? "#00A651" : "#EAB308"}">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span class="absolute top-2 w-2 h-2 rounded-full bg-white"></span>
        </div>
      `;

      const popup = new (window as any).mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 10px; max-width: 260px; font-family: sans-serif;">
          <div style="display: inline-block; background-color: #EBF8F2; color: #00A651; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 999px; margin-bottom: 4px;">Authorized Dealer</div>
          <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold; color: #231F20;">${shop.name}</h4>
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #555; line-height: 1.3;">${shop.address}, ${shop.city}</p>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}" target="_blank" style="background-color: #00A651; color: white; text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: bold; display: inline-flex; align-items: center; gap: 4px;">Get Directions</a>
            <a href="tel:${shop.phone}" style="background-color: #F3F4F6; color: #231F20; text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: bold;">Call</a>
          </div>
        </div>
      `);

      const marker = new (window as any).mapboxgl.Marker({ element: pinEl })
        .setLngLat([shop.lng, shop.lat])
        .setPopup(popup)
        .addTo(map);

      pinEl.addEventListener("click", () => {
        setSelectedShopId(shop.id);
      });

      markersRef.current.push({ id: shop.id, marker, popup });
    });

    if (filteredShops.length > 0 && map && !bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }
  };

  useEffect(() => {
    renderMarkers();
  }, [filteredShops, userLocation]);

  // Handle "Locate Me" button via HTML5 Geolocation
  const handleLocateMe = () => {
    setLocating(true);
    setGeoError(null);

    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      setLocating(false);
      return;
    }

    const applyCoords = (lat: number, lng: number, name: string) => {
      setUserLocation({ lat, lng, name });
      setLocating(false);
      setGeoError(null);
      if (mapInstance.current) {
        mapInstance.current.flyTo({ center: [lng, lat], zoom: 12 });
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        applyCoords(pos.coords.latitude, pos.coords.longitude, "Current Location");
      },
      () => {
        navigator.geolocation.getCurrentPosition(
          (pos2) => {
            applyCoords(pos2.coords.latitude, pos2.coords.longitude, "Current Location");
          },
          () => {
            fetch("https://ipapi.co/json/")
              .then((res) => res.json())
              .then((data) => {
                if (data && data.latitude && data.longitude) {
                  applyCoords(data.latitude, data.longitude, data.city ? `${data.city}, Sri Lanka` : "Sri Lanka");
                } else {
                  throw new Error("No IP coords");
                }
              })
              .catch(() => {
                setGeoError("Location detection unavailable. Please enter your city in the search bar.");
                setLocating(false);
              });
          },
          { timeout: 7000, enableHighAccuracy: false, maximumAge: 300000 }
        );
      },
      { timeout: 6000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  };

  // Search input handler with Sri Lankan town geocoding lookup
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();

    // Built-in coordinate map for Sri Lankan cities
    const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
      colombo: { lat: 6.9271, lng: 79.8612 },
      nugegoda: { lat: 6.8649, lng: 79.8997 },
      dehiwala: { lat: 6.8415, lng: 79.868 },
      kandy: { lat: 7.2936, lng: 80.6382 },
      galle: { lat: 6.0367, lng: 80.217 },
      matara: { lat: 5.9496, lng: 80.5469 },
      kurunegala: { lat: 7.4863, lng: 80.3647 },
      negombo: { lat: 7.2083, lng: 79.8358 },
      gampaha: { lat: 7.084, lng: 79.9939 },
      kadawatha: { lat: 7.0016, lng: 79.9535 },
      battaramulla: { lat: 6.9012, lng: 79.918 },
      jaffna: { lat: 9.6615, lng: 80.0255 },
      anuradhapura: { lat: 8.3114, lng: 80.4037 },
      badulla: { lat: 6.9934, lng: 81.055 },
      ratnapura: { lat: 6.6828, lng: 80.4005 },
    };

    let matchedCoords = null;
    for (const [key, coords] of Object.entries(CITY_COORDS)) {
      if (q.includes(key)) {
        matchedCoords = coords;
        break;
      }
    }

    if (matchedCoords) {
      setUserLocation({ ...matchedCoords, name: searchQuery });
      setGeoError(null);
      if (mapInstance.current) {
        mapInstance.current.flyTo({ center: [matchedCoords.lng, matchedCoords.lat], zoom: 12 });
      }
    } else {
      // Check if any shop matches textually
      const matches = shops.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      );
      if (matches.length > 0) {
        const first = matches[0];
        setUserLocation({ lat: first.lat, lng: first.lng, name: first.city });
        if (mapInstance.current) {
          mapInstance.current.flyTo({ center: [first.lng, first.lat], zoom: 12 });
        }
      } else {
        setGeoError(`No precise location found for "${searchQuery}". Showing available island-wide shops.`);
      }
    }
  };

  const handleSelectShop = (shop: Shop) => {
    setSelectedShopId(shop.id);
    if (mapInstance.current) {
      mapInstance.current.flyTo({ center: [shop.lng, shop.lat], zoom: 15, essential: true });

      const target = markersRef.current.find((m) => m.id === shop.id);
      if (target && target.popup) {
        target.popup.addTo(mapInstance.current);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Compact Top Header & Controls */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-gray-100">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-charcoal tracking-tight flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-jade-100 text-jade-700 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-jade-600" />
                </span>
                <span>Find a Shop & Dealer Directory</span>
              </h1>
            </div>
          </div>

          {/* Search & Location Control Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city, town or district (e.g. Colombo, Kandy, Galle)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-medium focus:outline-none focus:border-jade-500 focus:ring-2 focus:ring-jade-500/20 text-[#231F20]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLocateMe}
                disabled={locating}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#EBF8F2] hover:bg-emerald-100 text-jade-700 font-bold text-xs sm:text-sm transition-all border border-jade-300 shadow-xs active:scale-95 disabled:opacity-50"
                title="Locate my current position"
              >
                <Crosshair
                  className={`w-4 h-4 text-jade-600 ${
                    locating ? "animate-spin text-jade-700" : ""
                  }`}
                />
                <span>{locating ? "Locating..." : "Locate Me"}</span>
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-jade-500 hover:bg-jade-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-jade-600/30 hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Radius Filter Pills */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-gray-500 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Search Radius:</span>
            </div>

            <div className="flex items-center gap-2">
              {[
                { label: "5 km", val: 5 },
                { label: "10 km", val: 10 },
                { label: "20 km", val: 20 },
                { label: "All Island", val: null },
              ].map((r) => (
                <button
                  key={String(r.val)}
                  onClick={() => setSelectedRadius(r.val)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                    selectedRadius === r.val
                      ? "bg-jade-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & Notice */}
          {geoError && (
            <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-800 text-xs text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{geoError}</span>
            </div>
          )}

          {userLocation && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-jade-800 font-medium">
              📍 Active reference location: <strong>{userLocation.name || `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`}</strong>
              {selectedRadius && ` • Showing shops within ${selectedRadius} km`}
            </div>
          )}
        </div>

        {/* Main Content: Split List and Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shops List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-extrabold text-charcoal">
                  Available Shops
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Showing {filteredShops.length} authorized location{filteredShops.length === 1 ? "" : "s"}
                  {userLocation ? " sorted by closest distance" : ""}
                </p>
              </div>

              <Link
                href="/admin/shops"
                className="text-xs font-semibold text-jade-600 hover:text-jade-700 bg-[#EBF8F2] px-3 py-1.5 rounded-xl border border-jade-200 flex items-center gap-1 transition-colors"
                title="Admin Dashboard: Manage Shop Directory"
              >
                <span>CMS Admin</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-gray-100">
                <div className="w-8 h-8 border-3 border-jade-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs font-semibold text-gray-500">Loading authorized dealers...</p>
              </div>
            ) : filteredShops.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-gray-100 shadow-xs">
                <Building className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">No shops found within this range</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Try expanding your search radius to 20 km or Island-wide to view dealers nearby.
                </p>
                <button
                  onClick={() => setSelectedRadius(null)}
                  className="mt-4 px-4 py-2 rounded-xl bg-jade-500 text-white font-bold text-xs"
                >
                  View All Sri Lanka Dealers
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[750px] overflow-y-auto pr-1">
                {filteredShops.map((shop) => {
                  const isSelected = selectedShopId === shop.id;
                  return (
                    <div
                      key={shop.id}
                      onClick={() => handleSelectShop(shop)}
                      className={`p-5 rounded-3xl transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? "bg-[#EBF8F2] border-jade-500 shadow-md ring-2 ring-jade-500/20"
                          : "bg-white hover:bg-gray-50/80 border-gray-100 shadow-xs hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-jade-100 text-jade-700 text-[10px] font-extrabold uppercase tracking-wider">
                              <ShieldCheck className="w-3 h-3 text-jade-600" />
                              Authorized Dealer
                            </span>
                            {shop.distance !== null && (
                              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">
                                {shop.distance < 1
                                  ? `${Math.round(shop.distance * 1000)} m`
                                  : `${shop.distance.toFixed(1)} km`}{" "}
                                away
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-extrabold text-charcoal tracking-tight group-hover:text-jade-600">
                            {shop.name}
                          </h3>
                        </div>
                      </div>

                      <div className="mt-2.5 space-y-1.5 text-xs text-gray-600">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                          <span>
                            {shop.address}, <strong>{shop.city}</strong>
                          </span>
                        </div>

                        {shop.openingHours && (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span>{shop.openingHours}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons: Get Directions & Call */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-jade-500 hover:bg-jade-600 text-white font-bold text-xs transition-colors shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Get Directions</span>
                        </a>

                        <a
                          href={`tel:${shop.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-charcoal font-bold text-xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-jade-600" />
                          <span>Call Shop</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Google Map Container (7 cols) */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-white p-3 rounded-3xl shadow-xl border border-gray-100 relative">
              <div
                ref={mapRef}
                className="w-full h-[500px] sm:h-[600px] lg:h-[720px] rounded-2xl bg-gray-100 overflow-hidden relative"
              >
                {/* Fallback while map loads */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-50">
                  <Compass className="w-10 h-10 text-jade-500 animate-pulse mb-3" />
                  <span className="text-sm font-bold text-charcoal">Loading Google Maps...</span>
                  <span className="text-xs text-gray-400 mt-1 max-w-xs">
                    Initializing real-time store coordinates with Google Maps API.
                  </span>
                </div>
              </div>

              {/* Map floating legend */}
              {userLocation && (
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg border border-gray-200 text-xs flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                  <span className="font-semibold text-gray-700">Your Location</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
