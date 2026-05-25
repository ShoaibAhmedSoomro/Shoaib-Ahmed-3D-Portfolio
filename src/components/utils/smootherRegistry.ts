import type { ScrollSmoother } from "gsap/ScrollSmoother";

let instance: ScrollSmoother | null = null;

export function setSmoother(s: ScrollSmoother | null) {
  instance = s;
}

export function getSmoother(): ScrollSmoother | null {
  return instance;
}
