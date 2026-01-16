"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

interface AppSettingsContextInterface {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export const AppSettingsContext = createContext<
  AppSettingsContextInterface | undefined
>(undefined);

export const AppSettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const light = {
    "--color-primary": "#4d3166",
    "--color-secondary": "#9b59b6",
    "--color-light-gray": "#f2f2f2",
    "--color-gray": "#a3a3a3",
    "--color-dark-gray": "#333333",
    "--color-card": "#ffffff",
  };

  const dark = {
    "--color-primary": "#ffffff",
    "--color-secondary": "#9b59b6",
    "--color-light-gray": "#111111",
    "--color-gray": "#a3a3a3",
    "--color-dark-gray": "#f5f5f5",
    "--color-card": "#1e1e1e",
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const themeVariables = theme === "light" ? light : dark;
    Object.entries(themeVariables).forEach(([varName, value]) => {
      document.documentElement.style.setProperty(varName, value);
    });
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AppSettingsContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within an AppSettingsProvider");
  }

  return context;
};
