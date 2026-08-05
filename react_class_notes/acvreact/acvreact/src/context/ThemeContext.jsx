import { createContext, useEffect, useState } from "react";

// 1. Creating the Context
export const ThemeContext = createContext();

// 2. Creating a custom provider component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        // We pass both the data (theme) and function (toggleTheme)
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
