"use client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? "light" : theme;

  useEffect(() => setMounted(true), []);

  return (
    <div>
      {mounted && currentTheme === "dark" && (
        <div
          onClick={() => setTheme("light")}
          className="flex cursor-pointer w-10 h-10 items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faSun}
            className=" w-full h-full group-hover:text-[#fc5d0f] transition-colors duration-300"
            size="lg"
            tabIndex={0}
            aria-label="light mode button"
          />
        </div>
      )}
      {mounted && currentTheme === "light" && (
        <div
          onClick={() => setTheme("dark")}
          className="flex cursor-pointer w-10 h-10 items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faMoon}
            className="w-auto h-auto group-hover:text-yellow-300 transition-colors duration-300"
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
