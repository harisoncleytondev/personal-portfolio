import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from "react-icons/fa";
import { TagsComponent } from "./tag-component";

interface ProjectsComponentProps {
  title: string;
  description: string;
  url: string;
  urlRepository: string;
  languages: string[];
  imageUrl?: string | null;
  index: number;
}

export const ProjectsComponent = ({
  title,
  description,
  url,
  urlRepository,
  languages = [],
  imageUrl,
  index,
}: ProjectsComponentProps) => {
  const isEven = index % 2 === 0;

  return (
    <article className="group relative w-full bg-white rounded-2xl shadow-sm border border-gray/10 overflow-hidden transition-all duration-500 hover:shadow-xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col lg:flex-row min-h-[320px]">
        <div
          className={`relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/10 ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-primary text-7xl font-bold text-secondary/10 select-none">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div
          className={`relative w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-[0.25em]">
            Projeto {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="font-primary text-2xl lg:text-3xl font-bold text-primary mt-2 group-hover:text-secondary transition-colors duration-300">
            {title}
          </h3>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {languages.map((tag, i) => (
              <TagsComponent key={i} language={tag} />
            ))}
          </div>

          <p className="font-secondary text-sm text-dark-gray/70 leading-relaxed mt-4 line-clamp-4 lg:line-clamp-5">
            {description}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-primary hover:-translate-y-0.5 transition-all shadow-md"
            >
              <FaExternalLinkAlt className="text-[10px]" />
              Live
            </a>
            <a
              href={urlRepository}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 px-5 py-2.5 border-2 border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider rounded-full hover:border-secondary hover:bg-secondary/5 hover:-translate-y-0.5 transition-all"
            >
              <FaGithub className="text-sm" />
              Código
            </a>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-xs text-dark-gray/40 hover:text-secondary transition-colors flex items-center gap-1"
            >
              Detalhes <FaArrowRight className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
