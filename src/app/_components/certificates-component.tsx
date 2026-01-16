import { Certificates } from "@prisma/client";
import {
  FaTrophy,
  FaCalendarAlt,
  FaBuilding,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

interface CertificatesComponentInterface {
  certificates: Certificates[];
}

export const CertificatesComponent = ({
  certificates,
}: CertificatesComponentInterface) => {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      id="page-certificates"
      className="min-h-screen py-20 px-4 flex flex-col items-center bg-light-gray relative overflow-hidden transition-colors duration-300"
    >
      <h2 className="font-primary text-4xl text-primary mb-20 border-b-4 border-secondary pb-2 z-10">
        Qualificações
      </h2>

      <div className="max-w-4xl w-full relative z-10">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary/20 via-secondary to-secondary/20 transform md:-translate-x-1/2"></div>

        <div className="flex flex-col gap-12">
          {certificates.map((cert, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={cert.id}
                className={`relative flex flex-col md:flex-row items-center w-full ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-secondary rounded-full border-4 border-[var(--color-light-gray)] shadow-xl transform -translate-x-1/2 z-20 flex items-center justify-center transition-colors duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>

                <div className="w-full md:w-1/2"></div>

                <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-10">
                  <div
                    className={`bg-[var(--color-card)] p-6 rounded-2xl shadow-lg border-l-4 border-secondary hover:shadow-2xl hover:scale-105 transition-all duration-300 group relative overflow-hidden ${
                      isEven
                        ? "md:text-right md:border-l-0 md:border-r-4"
                        : "md:text-left"
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FaTrophy className="text-8xl text-secondary" />
                    </div>

                    <h3 className="font-primary text-xl font-bold text-dark-gray mb-1 group-hover:text-secondary transition-colors">
                      {cert.title}
                    </h3>

                    {cert.institution && (
                      <div
                        className={`flex items-center gap-2 text-gray mb-2 font-medium text-sm ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <FaBuilding className="text-secondary" />
                        <span>{cert.institution}</span>
                      </div>
                    )}

                    <div
                      className={`font-secondary text-sm font-semibold mb-3 flex flex-col gap-1 ${
                        isEven ? "md:items-end" : "md:items-start"
                      }`}
                    >
                      <span
                        className={`flex items-center gap-2 ${
                          cert.completed ? "text-secondary" : "text-yellow-600"
                        } ${isEven ? "md:flex-row-reverse" : ""}`}
                      >
                        {cert.completed ? (
                          <>
                            <FaCheckCircle /> Concluído em:{" "}
                            {formatDate(cert.issuedAt)}
                          </>
                        ) : (
                          <>
                            <FaHourglassHalf /> Iniciado em:{" "}
                            {formatDate(cert.issuedAt)} (Em andamento)
                          </>
                        )}
                      </span>
                    </div>

                    {cert.description && (
                      <p className="font-secondary text-sm text-gray leading-relaxed mb-4">
                        {cert.description}
                      </p>
                    )}

                    {cert.languages && cert.languages.length > 0 && (
                      <div
                        className={`flex gap-2 flex-wrap mb-4 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        {cert.languages.map((lang, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-light-gray text-xs text-secondary rounded font-bold transition-colors duration-300 border border-secondary/10"
                          >
                            #{lang}
                          </span>
                        ))}
                      </div>
                    )}

                    {cert.credentialUrl && (
                      <div
                        className={`flex ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-secondary px-4 py-2 rounded-lg hover:bg-primary transition-colors shadow-md"
                        >
                          Ver Credencial <FaExternalLinkAlt />
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
    </section>
  );
};
