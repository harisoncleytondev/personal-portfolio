"use client";

import { useState, useMemo } from "react";
import { Certificates } from "@prisma/client";
import { FaSearch, FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import { VscTerminalBash } from "react-icons/vsc";

interface CertificatesComponentInterface {
  certificates: Certificates[];
}

export const CertificatesComponent = ({
  certificates,
}: CertificatesComponentInterface) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "ongoing">("all");
  const [limit, setLimit] = useState(4);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    });
  };

  const filteredCertificates = useMemo(() => {
    return certificates
      .filter((cert) => {
        const matchesSearch =
          cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cert.institution?.toLowerCase().includes(searchTerm.toLowerCase());
        if (filter === "completed") return matchesSearch && cert.completed;
        if (filter === "ongoing") return matchesSearch && !cert.completed;
        return matchesSearch;
      })
      .sort((a, b) => a.order - b.order);
  }, [certificates, searchTerm, filter]);

  const visibleCertificates = filteredCertificates.slice(0, limit);

  return (
    <section id="page-certificates" className="py-16 px-4 bg-[#08080e] flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7c3aed]/15 to-transparent pointer-events-none" />

      <div className="text-center mb-10">
        <span className="font-mono text-[10px] text-[#555570] tracking-[0.3em] uppercase">~/portfolio/certificates</span>
        <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#e8e8ed] mt-3">
          <span className="text-[#7c3aed]">$</span> Qualificações
          <span className="text-[#555570]"> —grep</span>
        </h2>
        <p className="font-mono text-xs text-[#555570] mt-3"># certificados e cursos concluídos</p>
      </div>

      <div className="w-full max-w-2xl mb-12 flex flex-col gap-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555570] text-xs" />
          <input type="text" placeholder="Buscar qualificações..."
            className="w-full pl-10 pr-4 py-3 bg-[#0f0f1a] border border-[#2a2a40] font-mono text-xs text-[#e8e8ed] outline-none focus:border-[#7c3aed]/50 transition-colors placeholder:text-[#555570]"
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="flex gap-2 justify-center">
          {(["all", "completed", "ongoing"] as const).map((t) => (
            <button key={t}
              onClick={() => { setFilter(t); setLimit(4); }}
              className={`font-mono text-[9px] px-3 py-1.5 uppercase tracking-[0.15em] border transition-all ${
                filter === t
                  ? "bg-[#7c3aed] text-[#e8e8ed] border-[#7c3aed]"
                  : "bg-transparent text-[#555570] border-[#2a2a40] hover:border-[#7c3aed]/50 hover:text-[#e8e8ed]"
              }`}
            >
              {t === "all" ? "todos" : t === "completed" ? "concluídos" : "cursando"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl w-full flex flex-col gap-4">
        {visibleCertificates.map((cert) => (
          <div key={cert.id} className="bg-[#0f0f1a] border border-[#1e1e30] p-5 hover:border-[#7c3aed]/30 transition-colors duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <VscTerminalBash className="text-[#7c3aed] text-xs shrink-0" />
                  <span className="font-mono text-[10px] text-[#555570] uppercase tracking-[0.15em] truncate">
                    {cert.institution || "unknown"}
                  </span>
                  <span className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-[0.1em] shrink-0 ${
                    cert.completed ? "text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20" : "text-[#febc2e] bg-[#febc2e]/10 border border-[#febc2e]/20"
                  }`}>
                    {cert.completed ? "done" : "progress"}
                  </span>
                </div>
                <h3 className="font-mono text-sm font-bold text-[#e8e8ed] truncate">
                  <span className="text-[#7c3aed]">#</span> {cert.title}
                </h3>
                <p className="font-mono text-[11px] text-[#8888a0] mt-1.5 line-clamp-2">
                  {cert.description || "Sem descrição"}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="font-mono text-[9px] text-[#555570] tracking-[0.1em]">
                    {cert.completed ? "concluído" : "iniciado"} em {formatDate(cert.issuedAt)}
                  </span>
                  {cert.languages.length > 0 && (
                    <span className="font-mono text-[9px] text-[#555570]">
                      [{cert.languages.join(", ")}]
                    </span>
                  )}
                </div>
              </div>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 font-mono text-[9px] px-3 py-2 border border-[#2a2a40] text-[#8888a0] hover:text-[#e8e8ed] hover:border-[#7c3aed]/50 transition-all flex items-center gap-1.5 uppercase tracking-[0.1em]">
                  <FaExternalLinkAlt className="text-[7px]" />
                  ver
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCertificates.length > limit && (
        <button onClick={() => setLimit(limit + 4)}
          className="mt-10 font-mono text-xs px-6 py-3 bg-transparent border border-[#2a2a40] text-[#8888a0] hover:text-[#22c55e] hover:border-[#22c55e]/50 active:scale-[0.97] transition-all duration-200 tracking-[0.1em] uppercase">
          <span className="text-[#555570]">$</span> ./load_more.sh
        </button>
      )}

      {filteredCertificates.length === 0 && (
        <p className="font-mono text-xs text-[#555570] mt-10">// nenhum resultado encontrado</p>
      )}
    </section>
  );
};
