export type Theme = "dark" | "light";

const KEY = "theme";
const META: Record<Theme, string> = { dark: "#0b080c", light: "#f6f3f8" };

export const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/** Apply + persist. The inline script in index.html applies the initial value pre-paint. */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", META[theme]);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage blocked: theme still applies for this visit */
  }
}
