import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json();

  const { serial, ownerName } = body;

  if (!serial || !ownerName) {
    return NextResponse.json(
      { error: "Missing serial or owner name" },
      { status: 400 }
    );
  }

  const cleanOwnerName = String(ownerName).trim();

  if (cleanOwnerName.length < 2) {
    return NextResponse.json(
      { error: "Owner name too short" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("products")
    .update({
      owner_name: cleanOwnerName,
      owner_registered_at: new Date().toISOString(),
    })
    .eq("serial", serial)
    .is("owner_name", null)
    .select("serial, owner_name, owner_registered_at")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Product already claimed or not found" },
      { status: 409 }
    );
  }

  return NextResponse.json({
    success: true,
    product: data,
  });
}