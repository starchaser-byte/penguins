import { supabase } from "@/lib/supabase";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("serial", serial)
    .single();

  console.log("SERIAL:", serial);
  console.log("PRODUCT:", product);
  console.log("ERROR:", error);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">PENGUINS</h1>
          <p className="text-red-400 text-3xl">⚠ Product Not Found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-bold mb-2">PENGUINS</h1>
        <p className="text-zinc-400 mb-8">Digital Product Passport</p>

        <div className="bg-zinc-900 rounded-3xl p-8 shadow-xl border border-zinc-800">
          <div className="text-green-400 text-3xl mb-6">
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
      </div>
    </main>
  );
}