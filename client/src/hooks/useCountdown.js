import { useEffect, useState } from "react";

// targetMs: epoch ms when the countdown reaches zero. Returns remaining
// seconds (clamped at 0) and re-renders once per second while pending.
export function useCountdown(targetMs) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!targetMs) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (!targetMs) return { remaining: 0, ready: true };

  const remaining = Math.max(0, Math.ceil((targetMs - now) / 1000));
  return { remaining, ready: remaining === 0 };
}
