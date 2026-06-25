import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

type ResetAction = "resetOwnership" | "clearScans" | "resetAll";

export async function POST(request: Request) {
  const body = await request.json();

  const { password, serial, action } = body as {
    password?: string;
    serial?: string;
    action?: ResetAction;
  };

  if (password !== process.env.PENGUINS_ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!serial) {
    return NextResponse.json(
      { error: "Missing serial" },
      { status: 400 }
    );
  }

  if (
    action !== "resetOwnership" &&
    action !== "clearScans" &&
    action !== "resetAll"
  ) {
    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  }

  const cleanSerial = serial.trim();

  const { data: product } = await supabaseAdmin
    .from("products")
    .select("serial")
    .eq("serial", cleanSerial)
    .maybeSingle();

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  if (action === "resetOwnership" || action === "resetAll") {
    const { error } = await supabaseAdmin
      .from("products")
      .update({
        owner_name: null,
        owner_registered_at: null,
      })
      .eq("serial", cleanSerial);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  if (action === "clearScans" || action === "resetAll") {
    const { error } = await supabaseAdmin
      .from("scans")
      .delete()
      .eq("product_serial", cleanSerial);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    message:
      action === "resetOwnership"
        ? "Ownership reset successfully"
        : action === "clearScans"
        ? "Scans cleared successfully"
        : "Demo reset successfully",
  });
}