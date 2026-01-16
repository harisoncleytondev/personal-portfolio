"use client";
import { useSettings } from "@/contexts/app-settings-context";
import { Settings } from "@prisma/client";
import { useRouter } from "next/navigation";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoGithub, IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

type NavbarComponentType = Pick<Settings, "github" | "instagram" | "linkedin">;

export const NavbarComponent = ({
  github,
  instagram,
  linkedin,
}: NavbarComponentType) => {
  const { theme, setTheme } = useSettings();
  const router = useRouter();

  const handleButtonTheme = () => {
    if (theme === "dark") return setTheme("light");
    return setTheme("dark");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-20 py-3 bg-light-gray shadow-md transition-colors duration-300">
      <button onClick={() => router.push("/dashboard")}>
        <h4 className="font-primary font-extrabold text-primary text-xl cursor-default transition-all hover:scale-105 hover:bg-secondary hover:text-white hover:px-2 hover:rounded hover:shadow-sm">
          Harison
        </h4>
      </button>

      <div className="flex gap-4">
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

      <div className="flex gap-3 items-center">
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
    </div>
  );
};
