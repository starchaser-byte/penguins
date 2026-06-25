"use client";

import { useEffect } from "react";

export default function ScanLogger({ serial }: { serial: string }) {
  useEffect(() => {
    async function logScan() {
      const key = `last_scan_${serial}`;
      const now = Date.now();
      const lastScan = Number(localStorage.getItem(key) || 0);

      // evita scansioni duplicate entro 60 secondi
      if (now - lastScan < 60000) {
        console.log("SCAN SKIPPED: duplicate within 60 seconds");
        return;
      }

      // salvo subito per evitare doppio trigger in sviluppo
      localStorage.setItem(key, String(now));

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