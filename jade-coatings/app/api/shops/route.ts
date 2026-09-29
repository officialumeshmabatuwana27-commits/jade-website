import { NextResponse } from "next/server";
import { getShops, createShop } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const shops = getShops();
    return NextResponse.json(shops);
  } catch (error) {
    console.error("GET /api/shops error:", error);
    return NextResponse.json({ error: "Failed to fetch shops" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, address, city, district, phone, lat, lng, openingHours, isAuthorizedDealer } = body;

    if (!name || !address || !phone) {
      return NextResponse.json(
        { error: "Shop Name, Address, and Phone Number are required" },
        { status: 400 }
      );
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    const newShop = createShop({
      name: String(name).trim(),
      address: String(address).trim(),
      city: String(city || "Sri Lanka").trim(),
      district: String(district || city || "Sri Lanka").trim(),
      phone: String(phone).trim(),
      lat: isNaN(latNum) ? 6.9271 : latNum,
      lng: isNaN(lngNum) ? 79.8612 : lngNum,
      openingHours: String(openingHours || "Mon - Sat: 8:00 AM - 6:00 PM").trim(),
      isAuthorizedDealer: isAuthorizedDealer !== false,
    });

    return NextResponse.json({ success: true, shop: newShop }, { status: 201 });
  } catch (error) {
    console.error("POST /api/shops error:", error);
    return NextResponse.json({ error: "Failed to create shop" }, { status: 500 });
  }
}
