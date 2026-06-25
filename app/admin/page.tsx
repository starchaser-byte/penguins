"use client";

import { useState } from "react";

type CreatedProduct = {
  serial: string;
  name: string;
  batch: string | null;
  made_in: string | null;
  material: string | null;
  collection: string | null;
  link: string;
};

type ResetAction = "resetOwnership" | "clearScans" | "resetAll";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("Penguins Hoodie Black Edition");
  const [batch, setBatch] = useState("B24-05");
  const [madeIn, setMadeIn] = useState("Italy");
  const [material, setMaterial] = useState("Cotton / Polyester");
  const [collection, setCollection] = useState("Digital Passport Demo");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState<CreatedProduct | null>(null);

  const [resetSerial, setResetSerial] = useState("PGN-000001");
  const [resetLoading, setResetLoading] = useState<ResetAction | null>(null);
  const [resetMessage, setResetMessage] = useState("");

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setCreated(null);

    const response = await fetch("/api/admin/create-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        name,
        batch,
        madeIn,
        material,
        collection,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Create product failed");
      setLoading(false);
      return;
    }

    const fullLink = `${window.location.origin}${result.productPath}`;

    setCreated({
      ...result.product,
      link: fullLink,
    });

    setMessage("Product created successfully");
    setLoading(false);
  }

  async function resetProduct(action: ResetAction) {
    setResetLoading(action);
    setResetMessage("");

    const response = await fetch("/api/admin/reset-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        serial: resetSerial,
        action,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setResetMessage(result.error || "Reset failed");
      setResetLoading(null);
      return;
    }

    setResetMessage(result.message || "Done");
    setResetLoading(null);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-md mx-auto pt-10 pb-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐧</div>
          <h1 className="text-4xl font-bold tracking-widest mb-2">
            PENGUINS ADMIN
          </h1>
          <p className="text-zinc-400">Create digital product passports</p>
        </div>

        <form
          onSubmit={createProduct}
          className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800 space-y-4 mb-6"
        >
          <div>
            <label className="text-sm text-zinc-500">Admin password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white outline-none"
              placeholder="Admin password"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-500">Product name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-500">Batch</label>
            <input
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-500">Made in</label>
            <input
              value={madeIn}
              onChange={(e) => setMadeIn(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-500">Material</label>
            <input
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-500">Collection</label>
            <input
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black rounded-2xl py-3 font-semibold disabled:opacity-40"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>

          {message && <p className="text-zinc-400 text-sm">{message}</p>}
        </form>

        {created && (
          <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800 mb-6">
            <h2 className="text-xl font-semibold mb-4">Product created</h2>

            <div className="space-y-2 text-sm">
              <p>
                <b>Serial:</b> {created.serial}
              </p>
              <p>
                <b>Name:</b> {created.name}
              </p>
              <p>
                <b>Batch:</b> {created.batch}
              </p>
            </div>

            <div className="mt-5 bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
              <p className="text-zinc-500 text-sm mb-2">NFC link</p>
              <p className="break-all text-sm">{created.link}</p>
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(created.link)}
              className="w-full mt-4 bg-zinc-800 rounded-2xl py-3 font-semibold"
            >
              Copy NFC Link
            </button>

            <a
              href={created.link}
              target="_blank"
              className="block text-center mt-4 bg-zinc-800 rounded-2xl py-3 font-semibold"
            >
              Open Product Passport
            </a>
          </div>
        )}

        <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-3">Demo reset</h2>

          <p className="text-zinc-400 text-sm mb-4">
            Reset ownership and scans before showing the demo again.
          </p>

          <div className="mb-4">
            <label className="text-sm text-zinc-500">Product serial</label>
            <input
              value={resetSerial}
              onChange={(e) => setResetSerial(e.target.value)}
              className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-white outline-none"
              placeholder="PGN-000001"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={() => resetProduct("resetOwnership")}
              disabled={resetLoading !== null || password.length === 0}
              className="w-full bg-zinc-800 rounded-2xl py-3 font-semibold disabled:opacity-40"
            >
              {resetLoading === "resetOwnership"
                ? "Resetting..."
                : "Reset ownership"}
            </button>

            <button
              onClick={() => resetProduct("clearScans")}
              disabled={resetLoading !== null || password.length === 0}
              className="w-full bg-zinc-800 rounded-2xl py-3 font-semibold disabled:opacity-40"
            >
              {resetLoading === "clearScans" ? "Clearing..." : "Clear scans"}
            </button>

            <button
              onClick={() => resetProduct("resetAll")}
              disabled={resetLoading !== null || password.length === 0}
              className="w-full bg-white text-black rounded-2xl py-3 font-semibold disabled:opacity-40"
            >
              {resetLoading === "resetAll" ? "Resetting..." : "Reset full demo"}
            </button>
          </div>

          {resetMessage && (
            <p className="text-zinc-400 text-sm mt-4">{resetMessage}</p>
          )}
        </div>
      </div>
    </main>
  );
}