"use client";

import { NavbarComponent } from "./_components/navbar-component";
import { ProjectsComponent } from "./_components/projects-component";
import { SkillsComponent } from "./_components/skills-component";
import { CertificatesComponent } from "./_components/certificates-component";
import { FooterComponent } from "./_components/footer-component";
import { TitleComponent } from "./_components/title-component";
import { useLoading } from "@/hooks/useLoading";

const Home = () => {
  const { data, isLoading } = useLoading();

  const HeroSection = () => (
    <section
      id="page-home"
      className="min-h-screen flex flex-col justify-center items-center py-20 px-4 gap-8"
    >
      <ul className="flex gap-6 list-none mb-8 flex-wrap justify-center">
        <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
          <a
            href="#page-home"
            className="font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
          >
            Início
          </a>
        </li>

        <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
          <a
            href="#page-skills"
            className="font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
          >
            Tecnologias
          </a>
        </li>

        <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
          <a
            href="#page-projects"
            className="font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
          >
            Projetos
          </a>
        </li>
        <li className="cursor-pointer transition-transform hover:-translate-y-1 hover:scale-105">
          <a
            href="#page-certificates"
            className="font-primary text-lg transition-colors duration-300 capitalize text-dark-gray hover:text-secondary"
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
          Harison, desenvolvedor backend de {new Date().getFullYear() - 2009} anos, cria sistemas web robustos e eficientes, integrando APIs, bancos de dados e automação. Apaixonado por resolver problemas com código limpo e aprender constantemente novas tecnologias para construir aplicações que realmente funcionam.
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
  );

  if (isLoading || !data || !data.settings) {
    return (
      <div className="w-full min-h-screen bg-light-gray text-dark-gray transition-colors duration-300 flex flex-col">
        <div className="h-20 w-full bg-light-gray animate-pulse"></div>
        <HeroSection />
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const { skills, projects, certificates, settings } = data;

  return (
    <div className="w-full min-h-screen bg-light-gray text-dark-gray transition-colors duration-300">
      <NavbarComponent
        github={settings.github}
        instagram={settings.instagram}
        linkedin={settings.linkedin}
      />

      <HeroSection />

      <div id="page-skills">
        <SkillsComponent technologies={skills} />
      </div>

      <section
        id="page-projects"
        className="relative py-28 px-8 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-light-gray via-secondary/[0.03] to-light-gray pointer-events-none" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-3">
              Portfolio
            </span>
            <h2 className="font-primary text-4xl md:text-5xl font-bold text-primary">
              Projetos
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full" />
            <p className="text-dark-gray/50 mt-4 max-w-md mx-auto font-secondary text-sm">
              Projetos que desenvolvi ao longo da minha trajetória
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {projects.length > 0
              ? projects.map((p: any) => (
                  <ProjectsComponent
                    key={p.id}
                    description={p.description}
                    languages={p.languages}
                    title={p.title}
                    url={p.url}
                    urlRepository={p.urlRepository}
                    imageUrl={(p as any).imageUrl}
                  />
                ))
              : null}
          </div>
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
