import { NextResponse } from "next/server";
import { getShopById, updateShop, deleteShop } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const shop = getShopById(id);
    if (!shop) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }
    return NextResponse.json(shop);
  } catch (error) {
    console.error("GET /api/shops/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch shop" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    const body = await request.json();

    const updated = updateShop(id, {
      ...body,
      lat: body.lat !== undefined ? parseFloat(body.lat) : undefined,
      lng: body.lng !== undefined ? parseFloat(body.lng) : undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, shop: updated });
  } catch (error) {
    console.error("PUT /api/shops/[id] error:", error);
    return NextResponse.json({ error: "Failed to update shop" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    const deleted = deleteShop(id);

    if (!deleted) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/shops/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete shop" }, { status: 500 });
  }
}
