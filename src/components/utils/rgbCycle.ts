/**
 * Single source of truth for the animated RGB accent hue.
 *
 * Drives:
 *   - The CSS custom property `--accentHue` on :root (every var(--accentColor)
 *     reference in the stylesheets re-resolves automatically each frame).
 *   - Any JS subscriber (Three.js lights, materials, etc.) that wants the same
 *     hue in sync.
 *
 * Honors prefers-reduced-motion by locking the hue to a stable value.
 */

type Subscriber = (hue: number) => void;

const PERIOD_MS = 8000; // full red → green → blue → red cycle
const STATIC_HUE = 270; // fallback hue (purple) for reduced-motion users

const subscribers = new Set<Subscriber>();
let started = false;
let rafId = 0;

function applyHue(hue: number) {
  document.documentElement.style.setProperty("--accentHue", hue.toFixed(2));
  subscribers.forEach((fn) => fn(hue));
}

export function startRgbCycle() {
  if (started || typeof window === "undefined") return;
  started = true;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    applyHue(STATIC_HUE);
    return;
  }

  const start = performance.now();
  const loop = (t: number) => {
    const hue = (((t - start) / PERIOD_MS) * 360) % 360;
    applyHue(hue);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
}

export function stopRgbCycle() {
  if (!started) return;
  cancelAnimationFrame(rafId);
  started = false;
}

/** Subscribe to hue updates. Returns an unsubscribe function. */
export function subscribeRgb(fn: Subscriber): () => void {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}
