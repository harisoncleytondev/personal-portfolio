"use client";
import { useSettings } from "@/contexts/app-settings-context";
import { Settings } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoGithub, IoMdSunny, IoMdMenu, IoMdClose } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

type NavbarComponentType = Pick<Settings, "github" | "instagram" | "linkedin">;

export const NavbarComponent = ({
  github,
  instagram,
  linkedin,
}: NavbarComponentType) => {
  const { theme, setTheme } = useSettings();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleButtonTheme = () => {
    if (theme === "dark") return setTheme("light");
    return setTheme("dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-light-gray shadow-md transition-colors duration-300">
      <div className="flex items-center justify-between px-6 md:px-20 py-3 relative z-50 bg-light-gray">
        <button onClick={() => router.push("/dashboard")}>
          <h4 className="font-primary font-extrabold text-primary text-xl cursor-default transition-all hover:scale-105 hover:bg-secondary hover:text-white hover:px-2 hover:rounded hover:shadow-sm">
            Harison
          </h4>
        </button>

        <div className="hidden md:flex gap-4">
          <a
            href={github}
            className="text-2xl text-primary transition-all duration-300 hover:text-secondary hover:scale-110 hover:-translate-y-1"
          >
            <IoLogoGithub />
          </a>

          <a
            href={instagram}
            className="text-2xl text-primary transition-all duration-300 hover:text-secondary hover:scale-110 hover:-translate-y-1"
          >
            <AiFillInstagram />
          </a>

          <a
            href={linkedin}
            className="text-2xl text-primary transition-all duration-300 hover:text-secondary hover:scale-110 hover:-translate-y-1"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="hidden md:flex gap-3 items-center">
          <button
            onClick={handleButtonTheme}
            className="p-1 rounded hover:bg-gray/20 transition-all hover:scale-110"
          >
            {theme === "dark" ? (
              <IoMdSunny className="w-6 h-6 text-[#e0e013]" />
            ) : (
              <IoMoon className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-1 text-primary text-3xl focus:outline-none transition-transform active:scale-95"
        >
          {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-light-gray shadow-lg flex flex-col items-center gap-6 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-64 py-6 border-t border-gray/10" : "max-h-0 py-0"
        }`}
      >
        <div className="flex gap-8">
          <a
            href={github}
            className="text-3xl text-primary transition-all active:scale-90"
          >
            <IoLogoGithub />
          </a>

          <a
            href={instagram}
            className="text-3xl text-primary transition-all active:scale-90"
          >
            <AiFillInstagram />
          </a>

          <a
            href={linkedin}
            className="text-3xl text-primary transition-all active:scale-90"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="flex items-center gap-4 bg-gray/5 px-6 py-2 rounded-full">
          <span className="text-primary font-medium text-sm">Tema</span>
          <button
            onClick={handleButtonTheme}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray/10 transition-all active:scale-95"
          >
            {theme === "dark" ? (
              <IoMdSunny className="w-6 h-6 text-[#e0e013]" />
            ) : (
              <IoMoon className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};