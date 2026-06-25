import { supabase } from "@/lib/supabase";
import ScanLogger from "./ScanLogger";

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
          <h1 className="text-5xl font-bold mb-6">PENGUINS</h1>
          <p className="text-red-400 text-3xl">⚠ Product Not Found</p>
          <p className="text-zinc-400 mt-4">Serial: {serial}</p>
        </div>
      </main>
    );
  }

  const scanCount = scans?.length || 0;
  const lastScan = scans?.[0];
  const recentScans = scans?.slice(0, 5) || [];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <ScanLogger serial={serial} />

      <div className="w-full max-w-md mx-auto pt-10 pb-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐧</div>
          <h1 className="text-5xl font-bold tracking-widest mb-2">PENGUINS</h1>
          <p className="text-zinc-400">Digital Product Passport</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl border border-zinc-800 mb-6">
          <div className="text-green-400 text-3xl mb-6 text-center">
            ✔ Product Authentic
          </div>

          <div className="text-left space-y-3">
            <p><b>Product:</b> {product.name}</p>
            <p><b>Serial:</b> {product.serial}</p>
            <p><b>Batch:</b> {product.batch}</p>
            <p><b>Made in:</b> {product.made_in}</p>
            <p><b>Status:</b> {product.status}</p>
            <p><b>Material:</b> {product.material}</p>
            <p><b>Collection:</b> {product.collection}</p>
          </div>
        </div>

        <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800 mb-6">
          <h2 className="text-xl font-semibold mb-4">Scan Activity</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-zinc-900 rounded-2xl p-4">
              <p className="text-zinc-500 text-sm">Total scans</p>
              <p className="text-3xl font-bold">{scanCount}</p>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-4">
              <p className="text-zinc-500 text-sm">Status</p>
              <p className="text-green-400 font-semibold">Verified</p>
            </div>
          </div>

          {lastScan && (
            <div className="text-sm text-zinc-400">
              Last scan:{" "}
              {new Date(lastScan.scanned_at).toLocaleString("it-IT")}
            </div>
          )}
        </div>

        <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recent Verifications</h2>

          {recentScans.length === 0 ? (
            <p className="text-zinc-500 text-sm">No scans yet.</p>
          ) : (
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800"
                >
                  <div className="flex items-center justify-between gap-3">
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
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Journey Timeline</h2>

          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <span className="text-green-400">●</span>
              <div>
                <p className="font-semibold">Product created</p>
                <p className="text-zinc-500">
                  {new Date(product.created_at).toLocaleString("it-IT")}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="text-green-400">●</span>
              <div>
                <p className="font-semibold">Digital passport active</p>
                <p className="text-zinc-500">NFC identity linked</p>
              </div>
            </div>

            {lastScan && (
              <div className="flex gap-3">
                <span className="text-green-400">●</span>
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
      </div>
    </main>
  );
}