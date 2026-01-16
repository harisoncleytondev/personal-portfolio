import { Project } from "@prisma/client";
import { TagsComponent } from "./tag-component";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

type ProjectsComponentType = Pick<
  Project,
  "title" | "description" | "url" | "urlRepository" | "languages"
>;

export const ProjectsComponent = ({
  title,
  description,
  url,
  urlRepository,
  languages = [],
}: ProjectsComponentType) => {
  return (
    <div className="group h-[450px] bg-light-gray rounded-2xl shadow-lg border border-transparent hover:border-secondary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col relative">
      <div className="h-48 w-full overflow-hidden relative border-b border-gray/10 bg-white">
        <iframe
          src={url}
          title={title}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] border-none pointer-events-none select-none opacity-90 transition-opacity group-hover:opacity-100"
        />
        <div className="absolute inset-0 z-10 bg-black/10 lg:bg-transparent lg:group-hover:bg-black/10 transition-colors duration-300"></div>

        <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
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
          <h3 className="font-primary text-2xl font-bold text-secondary group-hover:text-primary transition-colors">
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
    </div>
  );
};
