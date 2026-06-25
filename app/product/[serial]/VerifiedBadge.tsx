"use client";

import { useEffect, useState } from "react";

export default function VerifiedBadge() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!verified) {
    return (
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 h-14 w-14 rounded-full border-4 border-zinc-700 border-t-white animate-spin" />

        <p className="text-zinc-400 text-lg">
          Verifying NFC identity...
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-6">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-400 text-black flex items-center justify-center text-3xl font-bold">
        ✓
      </div>

      <p className="text-green-400 text-3xl font-semibold">
        Product Authentic
      </p>

      <p className="text-zinc-500 text-sm mt-2">
        Digital identity verified
      </p>
    </div>
  );
}