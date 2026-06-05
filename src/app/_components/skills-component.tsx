"use client";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Skills } from "@prisma/client";

interface SkillsComponentInterface {
  technologies: Skills[];
}

export const SkillsComponent = ({ technologies }: SkillsComponentInterface) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const { current } = carouselRef;
    if (current) {
      current.scrollBy({ left: direction === "left" ? -350 : 350, behavior: "smooth" });
    }
  };

  return (
    <section className="py-28 px-4 md:px-20 bg-[#08080e] flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent pointer-events-none" />

      <div className="text-center mb-14">
        <span className="font-mono text-[10px] text-[#555570] tracking-[0.3em] uppercase">~/portfolio/tech-stack</span>
        <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#e8e8ed] mt-3">
          <span className="text-[#7c3aed]">$</span> Tecnologias
          <span className="text-[#555570]"> —ls</span>
        </h2>
        <p className="font-mono text-xs text-[#555570] mt-3"># ferramentas e stacks que domino</p>
      </div>

      <div className="relative w-full max-w-7xl group/carousel">
        <button onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 bg-[#0f0f1a] border border-[#2a2a40] items-center justify-center text-[#555570] hover:text-[#e8e8ed] hover:border-[#7c3aed]/50 transition-all opacity-0 group-hover/carousel:opacity-100"
        ><FaChevronLeft className="text-sm" /></button>

        <div ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-8 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {technologies.map((tech, index) => (
            <div key={index}
              className="snap-center shrink-0 w-[280px] bg-[#0f0f1a] border border-[#1e1e30] p-6 flex flex-col items-center text-center select-none hover:border-[#7c3aed]/40 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#1a1a28] flex items-center justify-center mb-5">
                <img src={(tech as any).imageUrl || `data:image/png;base64,${tech.image}`}
                  alt={tech.name} className="w-8 h-8 opacity-80" draggable="false" />
              </div>
              <h3 className="font-mono text-base font-bold text-[#e8e8ed] mb-2">
                <span className="text-[#7c3aed]">#</span>{tech.name}
              </h3>
              <p className="font-mono text-[11px] text-[#8888a0] leading-relaxed line-clamp-3">
                {tech.description}
              </p>
              <span className="mt-4 font-mono text-[9px] text-[#555570] tracking-[0.15em] uppercase border-t border-[#1e1e30] pt-3 w-full">
                {index % 2 === 0 ? "stack principal" : "experiência"}
              </span>
            </div>
          ))}
        </div>

        <button onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 bg-[#0f0f1a] border border-[#2a2a40] items-center justify-center text-[#555570] hover:text-[#e8e8ed] hover:border-[#7c3aed]/50 transition-all opacity-0 group-hover/carousel:opacity-100"
        ><FaChevronRight className="text-sm" /></button>
      </div>
    </section>
  );
};
