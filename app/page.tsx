import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6 overflow-hidden">
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f2937_0%,transparent_35%)] opacity-60" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="text-6xl mb-5">🐧</div>

            <h1 className="text-6xl font-bold tracking-widest mb-4">
              PENGUINS
            </h1>

            <p className="text-zinc-400 text-lg">
              Digital Product Passport
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 shadow-2xl mb-6">
            <p className="text-sm text-zinc-500 mb-3">NFC DEMO EXPERIENCE</p>

            <h2 className="text-3xl font-semibold mb-4">
              Every product has a digital identity.
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-6">
              Tap an NFC tag to verify authenticity, register ownership and
              track real product interactions through a connected digital
              passport.
            </p>

            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <div className="bg-zinc-900 rounded-2xl p-3">
                <p className="text-2xl">🔐</p>
                <p className="text-xs text-zinc-400 mt-1">Verified</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-3">
                <p className="text-2xl">📱</p>
                <p className="text-xs text-zinc-400 mt-1">NFC</p>
              </div>

              <div className="bg-zinc-900 rounded-2xl p-3">
                <p className="text-2xl">🌍</p>
                <p className="text-xs text-zinc-400 mt-1">Tracked</p>
              </div>
            </div>

            <Link
              href="/product/PGN-000001"
              className="block w-full bg-white text-black rounded-2xl py-4 text-center font-semibold"
            >
              Explore Demo
            </Link>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 mb-6">
            <h3 className="font-semibold mb-3">Demo flow</h3>

            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex gap-3">
                <span className="text-green-400">●</span>
                <p>Scan NFC tag</p>
              </div>

              <div className="flex gap-3">
                <span className="text-green-400">●</span>
                <p>Verify product authenticity</p>
              </div>

              <div className="flex gap-3">
                <span className="text-green-400">●</span>
                <p>Register ownership</p>
              </div>

              <div className="flex gap-3">
                <span className="text-green-400">●</span>
                <p>Store scan history in Supabase</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/product/PGN-000001"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl py-3 text-center font-semibold"
            >
              Product
            </Link>

            <Link
              href="/admin"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl py-3 text-center font-semibold"
            >
              Admin
            </Link>
          </div>

          <p className="text-center text-zinc-600 text-xs mt-8">
            Powered by NFC · Supabase · Vercel
          </p>
        </div>
      </div>
    </main>
  );
}