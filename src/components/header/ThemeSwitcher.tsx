import { useState, useEffect } from "react";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";

import { ThemeSwitcherProps } from "../../types/types";

function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = window.localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        } else if (theme === "light") {
            document.documentElement.classList.remove("dark");
            setDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        window.localStorage.setItem("theme", newDarkMode ? "dark" : "light");
        if (newDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className={`${className} items-center justify-center w-10 h-10 rounded-full text-ink transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/10`}
            aria-label={darkMode ? "Light mode" : "Dark mode"}
        >
            {darkMode ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
        </button>
    );
}

export default ThemeSwitcher;