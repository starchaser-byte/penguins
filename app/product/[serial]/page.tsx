export default function ProductPage({
  params,
}: {
  params: { serial: string };
}) {
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
            <p><b>Product:</b> Hoodie Black Edition</p>
            <p><b>Serial:</b> {params.serial}</p>
            <p><b>Batch:</b> B24-05</p>
            <p><b>Made in:</b> Italy</p>
            <p><b>Status:</b> Original</p>
          </div>
        </div>

      </div>
    </main>
  );
}