export const dynamic = "force-dynamic";

import { NavbarComponent } from "./_components/navbar-component";
import { ProjectsComponent } from "./_components/projects-component";
import { SkillsComponent } from "./_components/skills-component";
import { CertificatesComponent } from "./_components/certificates-component";
import { FooterComponent } from "./_components/footer-component";
import { TitleComponent } from "./_components/title-component";
import { prisma } from "@/lib/prisma";

const Home = async () => {
  const skills = await prisma.skills.findMany();
  const projects = await prisma.project.findMany();
  const certificates = await prisma.certificates.findMany();
  const settings = await prisma.settings.findFirst();

  if (!skills) return null;
  if (!projects) return null;
  if (!certificates) return null;
  if (!settings) return null;

  return (
    <div className="w-full min-h-screen bg-light-gray text-dark-gray transition-colors duration-300">
      <NavbarComponent
        github={settings.github}
        instagram={settings.instagram}
        linkedin={settings.linkedin}
      />

      <section
        id="page-home"
        className="min-h-screen flex flex-col justify-center items-center py-20 px-4 gap-8"
      >
        <ul className="flex gap-6 list-none mb-8 flex-wrap justify-center">
          <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
            <a
              href={`#page-home`}
              className={
                "font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
              }
            >
              Início
            </a>
          </li>

          <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
            <a
              href={`#page-skills`}
              className={
                "font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
              }
            >
              Tecnologias
            </a>
          </li>

          <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
            <a
              href={`#page-projects`}
              className={
                "font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
              }
            >
              Projetos
            </a>
          </li>
          <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
            <a
              href={`#page-certificates`}
              className={
                "font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
              }
            >
              Qualificações
            </a>
          </li>
        </ul>

        <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
          <h1 className="font-primary text-5xl md:text-6xl font-bold text-secondary">
            <TitleComponent />
            <span className="text-primary border-r-4 border-primary ml-1 animate-cursor-blink">
              &nbsp;
            </span>
          </h1>

          <p className="font-secondary text-lg md:text-xl text-primary font-normal leading-relaxed">
            Harison, desenvolvedor frontend de 16 anos, cria interfaces web
            intuitivas e dinâmicas. Atualmente, aprofunda seus conhecimentos em
            Análise e Desenvolvimento de Sistemas (ADS) para construir soluções
            web robustas e inovadoras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#page-contact"
              className="px-8 py-3 bg-secondary text-white font-primary font-bold rounded-full shadow-md hover:bg-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center"
            >
              Contato
            </a>

            <a
              href="/api/download/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border-2 border-secondary text-secondary font-primary font-bold rounded-full hover:bg-secondary hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center"
            >
              Currículo
            </a>
          </div>
        </div>
      </section>

      <div id="page-skills">
        <SkillsComponent technologies={skills} />
      </div>

      <section
        id="page-projects"
        className="min-h-screen py-20 px-8 bg-light-gray flex flex-col items-center"
      >
        <h2 className="font-primary text-4xl text-primary mb-16 border-b-4 border-secondary pb-2 self-start md:self-center">
          Projetos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
          {projects.length > 0
            ? projects.map((p) => (
                <ProjectsComponent
                  key={p.id}
                  description={p.description}
                  languages={p.languages}
                  title={p.title}
                  url={p.url}
                  urlRepository={p.urlRepository}
                />
              ))
            : ""}
        </div>
      </section>

      <CertificatesComponent certificates={certificates} />
      <FooterComponent
        email={settings.email}
        github={settings.github}
        instagram={settings.instagram}
        linkedin={settings.linkedin}
        phone={settings.phone}
      />
    </div>
  );
};

export default Home;
