"use client";

import { useState } from "react";

export default function ClaimProduct({
  serial,
  ownerName,
  ownerRegisteredAt,
}: {
  serial: string;
  ownerName: string | null;
  ownerRegisteredAt: string | null;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (ownerName) {
    return (
      <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800 mb-6">
        <h2 className="text-xl font-semibold mb-3">Ownership</h2>

        <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
          <p className="text-zinc-500 text-sm">Registered owner</p>
          <p className="text-2xl font-bold">{ownerName}</p>

          {ownerRegisteredAt && (
            <p className="text-zinc-500 text-sm mt-2">
              Registered on{" "}
              {new Date(ownerRegisteredAt).toLocaleString("it-IT")}
            </p>
          )}
        </div>
      </div>
    );
  }

  async function claimProduct() {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serial,
        ownerName: name,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.error || "Claim failed");
      setLoading(false);
      return;
    }

    setMessage("Product claimed successfully");
    setTimeout(() => {
      window.location.reload();
    }, 700);
  }

  return (
    <div className="bg-zinc-950 rounded-3xl p-6 border border-zinc-800 mb-6">
      <h2 className="text-xl font-semibold mb-3">Ownership</h2>

      <p className="text-zinc-400 text-sm mb-4">
        This product has not been claimed yet.
      </p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Owner name"
        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 mb-3 text-white outline-none"
      />

      <button
        onClick={claimProduct}
        disabled={loading || name.trim().length < 2}
        className="w-full bg-white text-black rounded-2xl py-3 font-semibold disabled:opacity-40"
      >
        {loading ? "Claiming..." : "Claim this product"}
      </button>

      {message && (
        <p className="text-zinc-400 text-sm mt-3">{message}</p>
      )}
    </div>
  );
}