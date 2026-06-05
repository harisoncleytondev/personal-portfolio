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
    <article className="group h-[450px] bg-light-gray rounded-2xl shadow-lg border border-transparent hover:border-secondary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col relative">
      <div className="h-48 w-full overflow-hidden relative bg-gradient-to-br from-secondary/20 to-primary/20">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-primary text-4xl font-bold text-secondary/20 select-none">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-y-4 lg:group-hover:translate-y-0">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Ver Projeto ao Vivo"
            className="flex items-center justify-center bg-white/90 p-3 rounded-full text-secondary hover:text-primary hover:scale-110 transition-all shadow-lg cursor-pointer"
          >
            <FaExternalLinkAlt className="text-xl" />
          </a>
          <a
            href={urlRepository}
            target="_blank"
            rel="noreferrer"
            title="Ver Código no GitHub"
            className="flex items-center justify-center bg-white/90 p-3 rounded-full text-secondary hover:text-primary hover:scale-110 transition-all shadow-lg cursor-pointer"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1 bg-light-gray z-30">
        <div className="flex flex-col gap-3">
          <h3 className="font-primary text-2xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((tag, index) => (
              <TagsComponent key={index} language={tag} />
            ))}
          </div>
        </div>

        <p className="font-secondary text-sm text-dark-gray leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>
    </article>
  );
};
