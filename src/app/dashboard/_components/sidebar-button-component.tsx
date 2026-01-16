"use client";
import { IconType } from "react-icons";

interface SidebarButtonComponentInterface {
  id: string;
  activeTab: string;
  icon: IconType;
  label: string;
  setActive: (id: string) => void;
}

export const SidebarButtonComponent = ({
  id,
  activeTab,
  icon: Icon,
  label,
  setActive,
}: SidebarButtonComponentInterface) => (
  <button
    onClick={() => setActive(id)}
    className={`w-full flex items-center gap-3 p-4 transition-all duration-200 border-r-4 ${
      activeTab === id
        ? "bg-white border-secondary text-secondary font-bold shadow-sm"
        : "text-gray/70 border-transparent hover:bg-white/50 hover:text-dark-gray"
    }`}
  >
    <Icon className="text-lg" />
    <span className="font-primary text-sm uppercase tracking-wider">
      {label}
    </span>
  </button>
);
