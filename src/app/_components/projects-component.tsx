import Image from "next/image";
import { TagsComponent } from "./tag-component";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface ProjectsComponentProps {
  title: string;
  description: string;
  url: string;
  urlRepository: string;
  languages: string[];
  imageUrl?: string | null;
}

export const ProjectsComponent = ({
  title,
  description,
  url,
  urlRepository,
  languages = [],
  imageUrl,
}: ProjectsComponentProps) => {
  return (
    <article className="group relative bg-white rounded-2xl shadow-sm border border-gray/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-secondary/30">
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/10">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[2deg]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-primary text-6xl font-bold text-secondary/10 select-none">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-5 right-5 z-10">
          <h3 className="font-primary text-xl font-bold text-white drop-shadow-lg">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {languages.slice(0, 4).map((tag, index) => (
              <TagsComponent key={index} language={tag} />
            ))}
            {languages.length > 4 && (
              <span className="text-[10px] bg-white/20 text-white/80 px-2 py-0.5 rounded-full font-bold uppercase">
                +{languages.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Ver Projeto ao Vivo"
            className="flex items-center justify-center w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full text-secondary hover:text-primary hover:bg-white hover:scale-110 transition-all shadow-lg"
          >
            <FaExternalLinkAlt className="text-sm" />
          </a>
          <a
            href={urlRepository}
            target="_blank"
            rel="noreferrer"
            title="Ver Código no GitHub"
            className="flex items-center justify-center w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full text-secondary hover:text-primary hover:bg-white hover:scale-110 transition-all shadow-lg"
          >
            <FaGithub className="text-sm" />
          </a>
        </div>
      </div>

      <div className="p-5">
        <p className="font-secondary text-sm text-dark-gray/70 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
};
