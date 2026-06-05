"use client";
import React, { createContext, useContext } from "react";

interface AppSettingsContextInterface {
  theme: "dark";
}

export const AppSettingsContext = createContext<
  AppSettingsContextInterface | undefined
>(undefined);

const dark = {
  "--color-primary": "#e8e8ed",
  "--color-secondary": "#7c3aed",
  "--color-light-gray": "#08080e",
  "--color-gray": "#555570",
  "--color-dark-gray": "#8888a0",
  "--color-card": "#0f0f1a",
};

if (typeof document !== "undefined") {
  Object.entries(dark).forEach(([varName, value]) => {
    document.documentElement.style.setProperty(varName, value);
  });
}

export const AppSettingsProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <AppSettingsContext.Provider value={{ theme: "dark" }}>
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
