import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

function generateNextSerial(lastSerial?: string | null) {
  const match = lastSerial?.match(/PGN-(\d+)/);
  const nextNumber = match ? Number(match[1]) + 1 : 1;

  return `PGN-${String(nextNumber).padStart(6, "0")}`;
}

export async function POST(request: Request) {
  const body = await request.json();

  const {
    password,
    name,
    batch,
    madeIn,
    material,
    collection,
  } = body;

  if (password !== process.env.PENGUINS_ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!name || String(name).trim().length < 2) {
    return NextResponse.json(
      { error: "Product name is required" },
      { status: 400 }
    );
  }

  const { data: lastProduct, error: lastError } = await supabaseAdmin
    .from("products")
    .select("serial")
    .like("serial", "PGN-%")
    .order("serial", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastError) {
    return NextResponse.json(
      { error: lastError.message },
      { status: 500 }
    );
  }

  const serial = generateNextSerial(lastProduct?.serial);

  const { data: product, error } = await supabaseAdmin
    .from("products")
    .insert({
      serial,
      name: String(name).trim(),
      batch: batch || null,
      made_in: madeIn || "Italy",
      status: "Original",
      material: material || null,
      collection: collection || "Penguins Digital Passport",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    product,
    productPath: `/product/${serial}`,
  });
}