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

const GOOGLE_MAPS_API_KEY = "AIzaSyBP-ueKJpsUrkC53YibfeSHA7rzZEynclw";

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
  const googleMapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

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

  // Dynamically load Google Maps script
  useEffect(() => {
    const existingScript = document.getElementById("google-maps-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else if ((window as any).google?.maps) {
      initMap();
    }
  }, [shops]);

  const initMap = () => {
    if (!mapRef.current || !(window as any).google?.maps) return;

    // Default center Sri Lanka
    const center = userLocation || { lat: 6.9271, lng: 79.8612 };

    const map = new (window as any).google.maps.Map(mapRef.current, {
      center,
      zoom: userLocation ? 12 : 9,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });

    googleMapInstance.current = map;
    infoWindowRef.current = new (window as any).google.maps.InfoWindow();
    renderMarkers();
  };

  // Re-render markers whenever shops or userLocation change
  const renderMarkers = () => {
    const map = googleMapInstance.current;
    if (!map || !(window as any).google?.maps) return;

    // Clear existing shop markers
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // User location marker
    if (userLocation) {
      if (userMarkerRef.current) userMarkerRef.current.setMap(null);
      userMarkerRef.current = new (window as any).google.maps.Marker({
        position: { lat: userLocation.lat, lng: userLocation.lng },
        map,
        title: "Your Location",
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: "#2563EB",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 3,
        },
      });
    }

    // Add markers for filtered shops
    const bounds = new (window as any).google.maps.LatLngBounds();
    if (userLocation) {
      bounds.extend(new (window as any).google.maps.LatLng(userLocation.lat, userLocation.lng));
    }

    filteredShops.forEach((shop) => {
      const position = { lat: shop.lat, lng: shop.lng };
      bounds.extend(new (window as any).google.maps.LatLng(shop.lat, shop.lng));

      const marker = new (window as any).google.maps.Marker({
        position,
        map,
        title: shop.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        },
      });

      marker.addListener("click", () => {
        setSelectedShopId(shop.id);
        const content = `
          <div style="padding: 10px; max-width: 260px; font-family: sans-serif;">
            <div style="display: inline-block; background-color: #EBF8F2; color: #00A651; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 999px; margin-bottom: 4px;">Authorized Dealer</div>
            <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: bold; color: #231F20;">${shop.name}</h4>
            <p style="margin: 0 0 6px 0; font-size: 12px; color: #555; line-height: 1.3;">${shop.address}, ${shop.city}</p>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}" target="_blank" style="background-color: #00A651; color: white; text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: bold; display: inline-flex; align-items: center; gap: 4px;">Get Directions</a>
              <a href="tel:${shop.phone}" style="background-color: #F3F4F6; color: #231F20; text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: bold;">Call</a>
            </div>
          </div>
        `;
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open(map, marker);
      });

      markersRef.current.push(marker);
    });

    if (filteredShops.length > 0 && map) {
      map.fitBounds(bounds);
      if (filteredShops.length === 1 && userLocation) {
        map.setZoom(13);
      }
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

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          name: "Current GPS Location",
        };
        setUserLocation(coords);
        setLocating(false);

        if (googleMapInstance.current) {
          googleMapInstance.current.panTo({ lat: coords.lat, lng: coords.lng });
          googleMapInstance.current.setZoom(12);
        }
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setGeoError("Unable to retrieve your location. Please check browser permissions or search manually.");
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
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
      if (googleMapInstance.current) {
        googleMapInstance.current.panTo(matchedCoords);
        googleMapInstance.current.setZoom(12);
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
        if (googleMapInstance.current) {
          googleMapInstance.current.panTo({ lat: first.lat, lng: first.lng });
          googleMapInstance.current.setZoom(12);
        }
      } else {
        setGeoError(`No precise location found for "${searchQuery}". Showing available island-wide shops.`);
      }
    }
  };



  const handleSelectShop = (shop: Shop) => {
    setSelectedShopId(shop.id);
    if (googleMapInstance.current) {
      googleMapInstance.current.panTo({ lat: shop.lat, lng: shop.lng });
      googleMapInstance.current.setZoom(15);

      const marker = markersRef.current.find(
        (m) =>
          Math.abs(m.getPosition().lat() - shop.lat) < 0.0001 &&
          Math.abs(m.getPosition().lng() - shop.lng) < 0.0001
      );
      if (marker && infoWindowRef.current) {
        (window as any).google.maps.event.trigger(marker, "click");
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#032613] via-[#074626] to-[#0B0F17] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-jade-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-jade-500/15 border border-jade-500/30 text-jade-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
            <MapPin className="w-4 h-4 text-jade-400" />
            Official Store Locator
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Find a JADE Coatings Dealer Near You
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Locate authorized paint centers, hardware distributors, and retail partners across Sri Lanka. Type your location or use auto-detect to find the closest store with instant driving directions.
          </p>

          {/* Search & Location Control Box */}
          <div className="mt-8 max-w-3xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-gray-100 text-charcoal">
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
          </div>

          {/* Feedback & Notice */}
          {geoError && (
            <div className="mt-4 max-w-xl mx-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{geoError}</span>
            </div>
          )}

          {userLocation && (
            <div className="mt-3 text-xs text-jade-300 font-medium">
              📍 Active reference location: <strong>{userLocation.name || `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`}</strong>
              {selectedRadius && ` • Showing shops within ${selectedRadius} km`}
            </div>
          )}
        </div>
      </section>

      {/* Main Content: Split List and Google Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
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
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg border border-gray-200 text-xs flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  <span className="font-semibold text-gray-700">JADE Dealer</span>
                </div>
                {userLocation && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                    <span className="font-semibold text-gray-700">Your Location</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
