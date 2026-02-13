"use client";

import { useState, useMemo } from "react";
import { Certificates } from "@prisma/client";
import {
  FaTrophy,
  FaCalendarAlt,
  FaBuilding,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

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
    <section
      id="page-certificates"
      className="min-h-screen py-20 px-4 flex flex-col items-center bg-light-gray relative overflow-hidden transition-colors duration-300"
    >
      <h2 className="font-primary text-4xl text-primary mb-10 border-b-4 border-secondary pb-2 z-10">
        Qualificações
      </h2>

      <div className="w-full max-w-2xl mb-16 z-10 flex flex-col gap-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            placeholder="Buscar qualificações..."
            className="w-full pl-12 pr-4 py-3 bg-secondary backdrop-blur-sm border border-secondary/20 rounded-xl outline-none focus:border-secondary transition-all font-secondary text-dark-gray"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 justify-center">
          {(["all", "completed", "ongoing"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setFilter(t);
                setLimit(4);
              }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                filter === t
                  ? "bg-secondary text-white border-secondary"
                  : "bg-transparent text-secondary border-secondary/30 hover:border-secondary"
              }`}
            >
              {t === "all"
                ? "Todos"
                : t === "completed"
                  ? "Concluídos"
                  : "Cursando"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary/5 via-secondary/40 to-secondary/5 transform md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-12">
          {visibleCertificates.map((cert, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={cert.id}
                className={`relative flex flex-col md:flex-row items-center w-full animate-fade-in ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-secondary rounded-full border-4 border-light-gray shadow-xl transform -translate-x-1/2 z-20 flex items-center justify-center transition-colors duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>

                <div className="w-full md:w-1/2"></div>

                <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-10">
                  <div
                    className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 border-secondary hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden ${
                      isEven
                        ? "md:text-right md:border-l-0 md:border-r-4"
                        : "md:text-left"
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                      <FaTrophy className="text-7xl text-secondary" />
                    </div>

                    <h3 className="font-primary text-lg font-bold text-secondary mb-1 transition-colors">
                      {cert.title}
                    </h3>

                    <div
                      className={`flex items-center gap-2 text-secondary mb-2 font-medium text-xs ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <FaBuilding className="text-secondary" />
                      <span>{cert.institution}</span>
                    </div>

                    <div
                      className={`font-secondary text-[10px] font-bold mb-3 flex flex-col gap-1 uppercase tracking-wider ${
                        isEven ? "md:items-end" : "md:items-start"
                      }`}
                    >
                      <span
                        className={`flex items-center gap-2 ${
                          cert.completed ? "text-secondary" : "text-yellow-600"
                        } ${isEven ? "md:flex-row-reverse" : ""}`}
                      >
                        {cert.completed ? (
                          <FaCheckCircle />
                        ) : (
                          <FaHourglassHalf />
                        )}
                        {cert.completed ? "Concluído em: " : "Iniciado em: "}
                        {formatDate(cert.issuedAt)}
                      </span>
                    </div>

                    <p className="font-secondary text-sm text-secondary leading-relaxed mb-4 line-clamp-3">
                      {cert.description}
                    </p>

                    {cert.credentialUrl && (
                      <div
                        className={`flex ${isEven ? "md:justify-end" : "md:justify-start"}`}
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-secondary px-4 py-2 rounded-lg hover:bg-primary hover:text-secondary transition-all shadow-md active:scale-95"
                        >
                          Credencial <FaExternalLinkAlt />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredCertificates.length > limit && (
        <button
          onClick={() => setLimit(limit + 4)}
          className="mt-20 z-10 px-10 py-3 bg-transparent border-2 border-secondary text-secondary font-primary font-bold rounded-full hover:bg-secondary hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-xs flex items-center gap-3 group"
        >
          Ver mais qualificações
          <FaChevronDown className="group-hover:translate-y-1 transition-transform" />
        </button>
      )}

      {filteredCertificates.length === 0 && (
        <p className="mt-10 text-primary/50 font-secondary italic">
          Nenhum resultado encontrado.
        </p>
      )}
    </section>
  );
};
