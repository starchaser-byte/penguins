import { supabase } from "@/lib/supabase";
import ScanLogger from "./ScanLogger";
import ClaimProduct from "./ClaimProduct";
import VerifiedBadge from "./VerifiedBadge";
import Image from "next/image";
function formatDevice(device: string | null) {
  if (!device) return "Unknown device";

  const value = device.toLowerCase();

  if (value.includes("iphone")) return "iPhone";
  if (value.includes("ipad")) return "iPad";
  if (value.includes("android")) return "Android";
  if (value.includes("windows")) return "Windows PC";
  if (value.includes("macintosh")) return "Mac";

  return "Device";
}

function formatLocation(city: string | null, country: string | null) {
  if (city && country) return `${city}, ${country}`;
  if (country) return country;
  if (city) return city;
  return "Unknown location";
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("serial", serial)
    .single();

  const { data: scans } = await supabase
    .from("scans")
    .select("*")
    .eq("product_serial", serial)
    .order("scanned_at", { ascending: false });

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-6">🐧</div>
          <h1 className="text-5xl font-bold mb-6 tracking-widest">PENGUINS</h1>
          <p className="text-red-400 text-3xl">Product Not Found</p>
          <p className="text-zinc-500 mt-4">Serial: {serial}</p>
        </div>
      </main>
    );
  }

  const scanCount = scans?.length || 0;
  const lastScan = scans?.[0];
  const recentScans = scans?.slice(0, 3) || [];

  return (
    <main className="min-h-screen bg-black text-white p-5 overflow-hidden">
      <ScanLogger serial={serial} />

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,#334155_0%,transparent_35%)] opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom,#052e16_0%,transparent_30%)] opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto pt-8 pb-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-zinc-400 tracking-widest">
              NFC DIGITAL PASSPORT
            </span>
          </div>

<div className="flex justify-center mb-4">
  <Image
    src="/peng.png"
    alt="Penguins logo"
    width={96}
    height={96}
    className="rounded-2xl"
  />
</div>
          <h1 className="text-5xl font-black tracking-[0.22em] mb-3">
            PENGUINS
          </h1>

          <p className="text-zinc-400">
            Authenticity · Ownership · Traceability
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-zinc-900 to-black rounded-[2rem] p-6 border border-zinc-800 shadow-2xl mb-6 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-green-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10">
            <div className="bg-black/50 border border-zinc-800 rounded-[1.5rem] p-5 mb-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs text-zinc-500 tracking-widest">
                    DIGITAL ID
                  </p>
                  <p className="text-lg font-semibold">{product.serial}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-zinc-500 tracking-widest">
                    STATUS
                  </p>
                  <p className="text-green-400 font-semibold">ACTIVE</p>
                </div>
              </div>

              <div className="text-center py-8">
<div className="flex justify-center mb-5">
  <Image
    src="/pixie.png"
    alt="Pixie Penguins"
    width={160}
    height={160}
    className="object-contain"
  />
</div>
                <p className="text-2xl font-bold tracking-widest">
                  PENGUINS
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                    Digital Product Passport
                </p>
              </div>
            </div>

            <VerifiedBadge />

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-black/60 border border-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Product</p>
                <p className="font-semibold leading-tight">{product.name}</p>
              </div>

              <div className="bg-black/60 border border-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Made in</p>
                <p className="font-semibold">{product.made_in}</p>
              </div>

              <div className="bg-black/60 border border-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Batch</p>
                <p className="font-semibold">{product.batch}</p>
              </div>

              <div className="bg-black/60 border border-zinc-800 rounded-2xl p-4">
                <p className="text-zinc-500 text-xs mb-1">Material</p>
                <p className="font-semibold">{product.material}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zinc-950/90 rounded-3xl p-5 border border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">Total scans</p>
            <p className="text-4xl font-black">{scanCount}</p>
          </div>

          <div className="bg-zinc-950/90 rounded-3xl p-5 border border-zinc-800">
            <p className="text-zinc-500 text-sm mb-2">Identity</p>
            <p className="text-green-400 font-bold">Verified</p>
            <p className="text-zinc-600 text-xs mt-1">NFC linked</p>
          </div>
        </div>

        <ClaimProduct
          serial={serial}
          ownerName={product.owner_name}
          ownerRegisteredAt={product.owner_registered_at}
        />

        <div className="bg-zinc-950/90 rounded-3xl p-6 border border-zinc-800 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold">Recent Verifications</h2>
            <span className="text-xs text-zinc-500">LIVE</span>
          </div>

          {recentScans.length === 0 ? (
            <p className="text-zinc-500 text-sm">No scans yet.</p>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800"
                >
                  <div>
                    <p className="font-semibold">
                      {formatLocation(scan.city, scan.country)}
                    </p>
                    <p className="text-zinc-500 text-sm">
                      {formatDevice(scan.device)}
                    </p>
                  </div>

                  <div className="text-right text-xs text-zinc-500">
                    {new Date(scan.scanned_at).toLocaleString("it-IT", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-zinc-950/90 rounded-3xl p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-5">Product Journey</h2>

          <div className="space-y-5 text-sm">
            <div className="flex gap-4">
              <span className="mt-1 h-3 w-3 rounded-full bg-green-400" />
              <div>
                <p className="font-semibold">Passport created</p>
                <p className="text-zinc-500">
                  {new Date(product.created_at).toLocaleString("it-IT")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="mt-1 h-3 w-3 rounded-full bg-green-400" />
              <div>
                <p className="font-semibold">NFC identity activated</p>
                <p className="text-zinc-500">
                  Physical tag connected to digital product
                </p>
              </div>
            </div>

            {product.owner_name && (
              <div className="flex gap-4">
                <span className="mt-1 h-3 w-3 rounded-full bg-green-400" />
                <div>
                  <p className="font-semibold">Ownership registered</p>
                  <p className="text-zinc-500">
                    {product.owner_name}
                    {product.owner_registered_at
                      ? ` · ${new Date(
                          product.owner_registered_at
                        ).toLocaleString("it-IT")}`
                      : ""}
                  </p>
                </div>
              </div>
            )}

            {lastScan && (
              <div className="flex gap-4">
                <span className="mt-1 h-3 w-3 rounded-full bg-green-400" />
                <div>
                  <p className="font-semibold">Latest verification</p>
                  <p className="text-zinc-500">
                    {new Date(lastScan.scanned_at).toLocaleString("it-IT")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-zinc-700 text-xs mt-8">
          Penguins Digital Passport
        </p>
      </div>
    </main>
  );
}