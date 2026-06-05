import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { VscTerminalBash } from "react-icons/vsc";

interface ProjectsComponentProps {
  title: string;
  description: string;
  url: string;
  urlRepository: string;
  languages: string[];
  imageUrl?: string | null;
  index: number;
}

const codeSnippets = [
  `GET /api/v1/projects HTTP/1.1
Host: api.harisoncleyton.tech
Authorization: Bearer ****

{
  "data": [
    {
      "id": "obj_01",
      "status": "production",
      "latency": "24ms"
    }
  ]
}`,
  `func handleRequest(w http.ResponseWriter, r *http.Request) {
  ctx := r.Context()
  result, err := db.Projects.
    Find(ctx, bson.M{
      "status": "active",
    })
  if err != nil {
    log.Fatal(err)
  }
  json.NewEncoder(w).
    Encode(result)
}`,
  `class ProjectService {
  @Cacheable("projects")
  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      include: {
        techStack: true,
        metrics: true,
      },
      orderBy: { priority: "desc" },
    });
  }
}`,
  `spring:
  data:
    mongodb:
      uri: ${process.env.MONGO_URI}
      database: portfolio
  cache:
    type: redis
    redis:
      ttl: 3600
      enabled: true
server:
  compression: enabled
  rate-limit: 100/1m`,
  `model Project {
  id        String   @id @default(auto())
  title     String
  stack     String[]
  metrics   Metrics?
  status    Status   @default(ACTIVE)
  createdAt DateTime @default(now())
}

enum Status {
  ACTIVE
  ARCHIVED
}`,
];

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
  const snippet = codeSnippets[index % codeSnippets.length];

  return (
    <article className="group w-full bg-[#0f0f1a] border border-[#1e1e30] hover:border-[#7c3aed]/40 transition-colors duration-500">
      <div className="flex flex-col lg:flex-row lg:h-72">
        <div
          className={`relative w-full lg:w-1/2 h-56 lg:h-full bg-[#08080e] ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {imageUrl ? (
            <div className="w-full h-full">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0a0a12] border-b border-[#1a1a28]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[10px] text-[#555570] font-mono">preview — {title.toLowerCase().replace(/\s+/g, "-")}</span>
              </div>
              <div className="w-full h-[calc(100%-36px)] bg-[#08080e]">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0a0a12] border-b border-[#1a1a28]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[10px] text-[#555570] font-mono">terminal — {title.toLowerCase().replace(/\s+/g, "-")}</span>
              </div>
              <div className="p-4 font-mono text-[11px] leading-relaxed overflow-hidden h-[calc(100%-36px)]">
                <pre className="text-[#22c55e] whitespace-pre-wrap m-0">
                  <span className="text-[#555570]">$ </span>
                  <span className="text-[#e8e8ed]">cat ./arch/{title.toLowerCase().replace(/\s+/g, "-")}.api</span>
                  {"\n\n"}
                  <code>{snippet}</code>
                  {"\n\n"}
                  <span className="text-[#555570]">$ </span>
                  <span className="text-[#e8e8ed]">curl -s https://api.harisoncleyton.tech/health</span>
                  {"\n"}
                  <span className="text-[#22c55e]">✓ 200 OK</span>
                  <span className="animate-cursor-blink text-[#e8e8ed]">▌</span>
                </pre>
              </div>
            </>
          )}
        </div>

        <div
          className={`relative w-full lg:w-1/2 px-7 py-6 flex flex-col justify-center bg-[#0f0f1a] ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <VscTerminalBash className="text-[#7c3aed] text-sm" />
            <span className="font-mono text-[10px] text-[#555570] tracking-[0.15em] uppercase">
              ./projeto_{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-mono text-lg lg:text-xl font-bold text-[#e8e8ed] leading-snug">
            <span className="text-[#7c3aed]">$</span> {title}
          </h3>

          <p className="font-mono text-[12px] text-[#8888a0] leading-relaxed mt-2.5 line-clamp-2">
            <span className="text-[#555570]">//</span> {description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {languages.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-[10px] px-2.5 py-1 bg-[#1a1a28] text-[#7c3aed] border border-[#2a2a40]"
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#1a1a28]">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] px-4 py-2 bg-[#7c3aed] text-[#e8e8ed] hover:bg-[#6d28d9] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 uppercase tracking-[0.1em]"
            >
              <FaExternalLinkAlt className="text-[8px]" />
              Live
            </a>
            <a
              href={urlRepository}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] px-4 py-2 border border-[#2a2a40] text-[#8888a0] hover:text-[#e8e8ed] hover:border-[#555570] active:scale-[0.97] transition-all duration-200 flex items-center gap-2 uppercase tracking-[0.1em]"
            >
              <FaGithub className="text-xs" />
              Source
            </a>
            <span className="ml-auto font-mono text-[9px] text-[#555570]">
              [{languages.length} tech{languages.length !== 1 ? "s" : ""}]
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
