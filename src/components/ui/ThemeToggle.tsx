import { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { getTheme, setTheme, type Theme } from "../../utils/theme";

const ThemeToggle = () => {
  const [theme, set] = useState<Theme>(getTheme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      data-cursor="disable"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => {
        setTheme(next);
        set(next);
      }}
    >
      {theme === "dark" ? <LuSun aria-hidden="true" /> : <LuMoon aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
