"use client";
import { useSettings } from "@/contexts/app-settings-context";
import { Settings } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoGithub, IoMdMenu, IoMdClose } from "react-icons/io";

type NavbarComponentType = Pick<Settings, "github" | "instagram" | "linkedin">;

export const NavbarComponent = ({
  github,
  instagram,
  linkedin,
}: NavbarComponentType) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-[#1a1a28] bg-[#08080e]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 md:px-20 py-3 relative">
        <button onClick={() => router.push("/dashboard")} className="font-mono text-sm text-[#8888a0] hover:text-[#22c55e] transition-colors">
          <span className="text-[#555570]">~</span> <span className="text-[#7c3aed]">$</span> <span className="text-[#e8e8ed]">harison</span>
        </button>

        <div className="hidden md:flex gap-4">
          <a href={github} className="text-lg text-[#555570] hover:text-[#e8e8ed] transition-colors"><IoLogoGithub /></a>
          <a href={instagram} className="text-lg text-[#555570] hover:text-[#e8e8ed] transition-colors"><AiFillInstagram /></a>
          <a href={linkedin} className="text-lg text-[#555570] hover:text-[#e8e8ed] transition-colors"><FaLinkedin /></a>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[#8888a0] text-2xl">
          {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-[#08080e] border-b border-[#1a1a28] flex flex-col items-center gap-6 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-64 py-6" : "max-h-0 py-0"}`}>
        <div className="flex gap-8">
          <a href={github} className="text-2xl text-[#555570] hover:text-[#e8e8ed] transition-colors"><IoLogoGithub /></a>
          <a href={instagram} className="text-2xl text-[#555570] hover:text-[#e8e8ed] transition-colors"><AiFillInstagram /></a>
          <a href={linkedin} className="text-2xl text-[#555570] hover:text-[#e8e8ed] transition-colors"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
};
