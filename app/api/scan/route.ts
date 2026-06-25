import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function decodeHeader(value: string | null) {
  if (!value) return null;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const { serial, device } = body;

  if (!serial) {
    return NextResponse.json(
      { error: "Missing serial" },
      { status: 400 }
    );
  }

  const city =
    decodeHeader(request.headers.get("x-vercel-ip-city")) ||
    decodeHeader(request.headers.get("x-vercel-ip-timezone"));

  const country =
    decodeHeader(request.headers.get("x-vercel-ip-country")) ||
    null;

  const { error } = await supabase.from("scans").insert({
    product_serial: serial,
    city,
    country,
    device: device || "Unknown device",
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    city,
    country,
  });
}