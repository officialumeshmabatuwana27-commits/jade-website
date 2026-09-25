import { NextResponse } from "next/server";
import { getProducts, createProduct, Product } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get("division") ?? undefined;
    const products = getProducts(division);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = getAdminSession();
    if (!session.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      brand,
      division,
      category,
      description,
      features,
      coverage,
      coveragePerLiter,
      image,
      beforeImage,
      afterImage,
      colors,
      sizes,
      finishes,
    } = body;

    if (!name || !brand || !division || !description) {
      return NextResponse.json(
        { error: "Product name, brand, division, and description are required" },
        { status: 400 }
      );
    }

    const newProduct = createProduct({
      name,
      brand,
      division,
      category: category || brand,
      description,
      features: Array.isArray(features)
        ? features
        : typeof features === "string"
        ? features.split("\n").map((f: string) => f.trim()).filter(Boolean)
        : [],
      coverage: coverage || (coveragePerLiter ? `1L = ${coveragePerLiter} sq.ft` : undefined),
      coveragePerLiter: coveragePerLiter ? Number(coveragePerLiter) : undefined,
      image: image || undefined,
      beforeImage: beforeImage || undefined,
      afterImage: afterImage || undefined,
      colors: Array.isArray(colors) ? colors : undefined,
      sizes: Array.isArray(sizes) ? sizes : undefined,
      finishes: Array.isArray(finishes) ? finishes : undefined,
      slug: "",
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

