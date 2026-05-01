"use client";

import { useState, useEffect } from "react";

/**
 * Returns a live countdown from now + offsetMs.
 * Starts at 0 on SSR to avoid hydration mismatches.
 */
export function useCountdown(offsetMs: number) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const target = Date.now() + offsetMs;
    const update = () => setRemaining(Math.max(0, target - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const d = Math.floor(remaining / 86400000);
  const h = Math.floor((remaining % 86400000) / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    d, h, m, s,
    /** e.g. "23h 41m 07s" */
    formatted: `${pad(h)}h ${pad(m)}m ${pad(s)}s`,
    /** e.g. "2d 03h 41m" */
    formattedLong: d > 0 ? `${d}d ${pad(h)}h ${pad(m)}m` : `${pad(h)}h ${pad(m)}m ${pad(s)}s`,
  };
}
