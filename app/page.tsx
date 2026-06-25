export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-6xl font-bold mb-4">
          PENGUINS
        </h1>

        <p className="text-green-400 text-3xl mb-6">
          ✔ Product Authentic
        </p>

        <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl">

          <p><b>Product:</b> Hoodie Black Edition</p>

          <p><b>Serial:</b> PGN-000001</p>

          <p><b>Batch:</b> B24-05</p>

          <p><b>Made in:</b> Italy</p>

          <p><b>Status:</b> Original</p>

        </div>

      </div>
    </main>
  );
}