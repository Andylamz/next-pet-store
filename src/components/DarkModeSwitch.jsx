"use client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  return (
    <div>
      {mounted && currentTheme === "dark" && (
        <div onClick={() => setTheme("light")} className="cursor-pointer">
          <FontAwesomeIcon
            icon={faSun}
            className=" w-5 hover:text-[#fc5d0f] transition-colors duration-300"
            size="lg"
            tabIndex={0}
            aria-label="light mode button"
          />
        </div>
      )}
      {mounted && currentTheme === "light" && (
        <div onClick={() => setTheme("dark")} className="cursor-pointer">
          <FontAwesomeIcon
            icon={faMoon}
            className="w-5 hover:text-yellow-300 transition-colors duration-300"
            size="lg"
            tabIndex={0}
            aria-label="dark mode button"
          />
        </div>
      )}
    </div>
  );
}

export default DarkModeSwitch;
