import { NextResponse } from "next/server";
import {
  getProductBySlug,
  getProductById,
  updateProduct,
  deleteProduct,
} from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: { slug: string };
}

function resolveProduct(param: string) {
  const numId = Number(param);
  if (!isNaN(numId)) {
    const byId = getProductById(numId);
    if (byId) return byId;
  }
  return getProductBySlug(param);
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const product = resolveProduct(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const session = getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = resolveProduct(params.slug);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await request.json();
    const updated = updateProduct(existing.id, {
      ...body,
      features: Array.isArray(body.features)
        ? body.features
        : typeof body.features === "string"
        ? body.features.split("\n").map((f: string) => f.trim()).filter(Boolean)
        : existing.features,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error("PUT /api/products/[slug] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const session = getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = resolveProduct(params.slug);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const deleted = deleteProduct(existing.id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("DELETE /api/products/[slug] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

