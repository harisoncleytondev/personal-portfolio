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
    className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 border-l-2 font-mono text-xs uppercase tracking-[0.1em] ${
      activeTab === id
        ? "bg-[#1a1a28] border-l-[#7c3aed] text-[#e8e8ed]"
        : "border-l-transparent text-[#555570] hover:text-[#8888a0] hover:bg-[#0f0f1a]"
    }`}
  >
    <Icon className="text-sm" />
    <span>{label}</span>
  </button>
);
