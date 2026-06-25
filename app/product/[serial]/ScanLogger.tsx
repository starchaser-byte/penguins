"use client";

import { useEffect } from "react";

export default function ScanLogger({ serial }: { serial: string }) {
  useEffect(() => {
    async function logScan() {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serial,
          device: navigator.userAgent,
        }),
      });

      const result = await response.json();
      console.log("SCAN RESPONSE:", result);
    }

    logScan();
  }, [serial]);

  return null;
}