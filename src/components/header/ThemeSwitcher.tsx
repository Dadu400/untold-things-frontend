import { useState } from "react";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";

interface ThemeSwitcherProps {
    className?: string;
}

function ThemeSwitcher({ className }: ThemeSwitcherProps) {
    const [darkMode, setDarkMode] = useState(
        window.localStorage.getItem("theme") === "dark"
    );

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
        <button onClick={toggleDarkMode} className={className}>
            {darkMode ? <LightModeIcon /> : <DarkModeOutlinedIcon />}
        </button>
    );
}

export default ThemeSwitcher;
