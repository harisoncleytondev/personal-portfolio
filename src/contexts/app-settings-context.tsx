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
    "--color-primary": "#f8f7ff",
    "--color-secondary": "#bf7af0",
    "--color-light-gray": "#0b090f",
    "--color-gray": "#8e89a3",
    "--color-dark-gray": "#e2e0e7",
    "--color-card": "#15121d",
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
