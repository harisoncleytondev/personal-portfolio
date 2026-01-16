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
      const scrollAmount = direction === "left" ? -350 : 350;

      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-4 md:px-20 bg-light-gray/50 flex flex-col items-center overflow-hidden">
      <h2 className="font-primary text-4xl text-primary mb-12 border-b-4 border-secondary pb-2 text-center">
        Minhas tecnologias
      </h2>

      <div className="relative w-full max-w-7xl group/carousel">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white/80 items-center justify-center rounded-full shadow-lg text-primary hover:bg-secondary hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-8 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="snap-center shrink-0 w-[300px] md:w-[350px] bg-light-gray rounded-2xl p-8 border border-transparent hover:border-secondary hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center shadow-lg select-none"
            >
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-md transform hover:rotate-12 transition-transform duration-300">
                <img
                  src={`data:image/png;base64,${tech.image}`}
                  alt={tech.name}
                  className="w-10 h-10 filter brightness-0 invert"
                  draggable="false"
                />
              </div>

              <h3 className="font-primary text-2xl font-bold text-secondary mb-4">
                {tech.name}
              </h3>

              <p className="font-secondary text-sm text-dark-gray leading-relaxed opacity-80 line-clamp-4">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white/80 items-center justify-center rounded-full shadow-lg text-primary hover:bg-secondary hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </section>
  );
};
