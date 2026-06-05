"use client";

import { useState } from "react";
import { NavbarComponent } from "./_components/navbar-component";
import { ProjectsComponent } from "./_components/projects-component";
import { SkillsComponent } from "./_components/skills-component";
import { CertificatesComponent } from "./_components/certificates-component";
import { FooterComponent } from "./_components/footer-component";
import { TitleComponent } from "./_components/title-component";
import { useLoading } from "@/hooks/useLoading";

const Home = () => {
  const { data, isLoading } = useLoading();
  const [visibleProjects, setVisibleProjects] = useState(2);

  const HeroSection = () => (
    <section id="page-home" className="min-h-screen flex flex-col justify-center items-center py-20 px-4 gap-10">
      <nav className="flex gap-8 flex-wrap justify-center font-mono text-xs">
        {["#inicio", "#tecnologias", "#projetos", "#qualificacoes"].map((item, i) => (
          <a key={i} href={`#page-${["home", "skills", "projects", "certificates"][i]}`}
            className="text-[#555570] hover:text-[#7c3aed] transition-colors tracking-[0.05em]">
            {item}
          </a>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-4 max-w-3xl text-center">
        <div className="font-mono text-[10px] text-[#555570] tracking-[0.3em] uppercase mb-2">
          <span className="text-[#22c55e]">●</span> sistema disponível
        </div>

        <h1 className="font-mono text-3xl md:text-5xl font-bold text-[#e8e8ed] leading-tight">
          <span className="text-[#7c3aed]">$</span> echo &quot;
          <TitleComponent />
          <span className="text-[#555570]">&quot;</span>
          <span className="border-r-2 border-[#22c55e] ml-0.5 animate-cursor-blink">&nbsp;</span>
        </h1>

        <p className="font-mono text-xs md:text-sm text-[#8888a0] leading-relaxed max-w-2xl mt-2">
          <span className="text-[#555570]">//</span> Desenvolvedor backend, construo sistemas web robustos — apis resilientes, bancos otimizados e código limpo.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <a href="#page-contact"
            className="font-mono text-[10px] px-5 py-2.5 bg-[#7c3aed] text-[#e8e8ed] hover:bg-[#6d28d9] active:scale-[0.97] transition-all uppercase tracking-[0.15em]">
            $ ./contato.sh
          </a>
          <a href="/api/download/cv" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[10px] px-5 py-2.5 border border-[#2a2a40] text-[#8888a0] hover:text-[#e8e8ed] hover:border-[#555570] active:scale-[0.97] transition-all uppercase tracking-[0.15em]">
            $ ./curriculo.pdf
          </a>
        </div>
      </div>
    </section>
  );

  if (isLoading || !data || !data.settings) {
    return (
      <div className="w-full min-h-screen bg-[#08080e] text-[#e8e8ed] transition-colors duration-300 flex flex-col">
        <div className="h-16 w-full bg-[#0f0f1a] border-b border-[#1a1a28] flex items-center px-6">
          <span className="font-mono text-xs text-[#555570]"><span className="text-[#22c55e]">●</span> carregando...</span>
        </div>
        <HeroSection />
        <div className="flex justify-center items-center py-20">
          <div className="font-mono text-xs text-[#555570]">
            <span className="animate-cursor-blink text-[#22c55e]">_</span> inicializando módulos...
          </div>
        </div>
      </div>
    );
  }

  const { skills, projects, certificates, settings } = data;

  return (
    <div className="w-full min-h-screen bg-[#08080e] text-[#e8e8ed] transition-colors duration-300">
      <NavbarComponent github={settings.github} instagram={settings.instagram} linkedin={settings.linkedin} />

      <HeroSection />

      <div id="page-skills"><SkillsComponent technologies={skills} /></div>

      <section id="page-projects" className="relative py-28 px-8 bg-[#08080e] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7c3aed]/10 to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-[#555570] tracking-[0.3em] uppercase">~/portfolio/projects</span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-[#e8e8ed] mt-3">
              <span className="text-[#7c3aed]">$</span> Projetos
              <span className="text-[#555570]"> —n 5</span>
            </h2>
            <p className="font-mono text-xs text-[#555570] mt-3 max-w-lg mx-auto"># sistemas distribuídos, apis resilientes e arquiteturas escaláveis</p>
          </div>

          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {projects.length > 0
              ? projects.slice(0, visibleProjects).map((p: any, i: number) => (
                  <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <ProjectsComponent index={i} description={p.description} languages={p.languages} title={p.title} url={p.url} urlRepository={p.urlRepository} imageUrl={(p as any).imageUrl} />
                  </div>
                ))
              : null}
          </div>

          {visibleProjects < projects.length && (
            <div className="flex justify-center mt-10">
              <button onClick={() => setVisibleProjects((prev) => prev + 1)}
                className="font-mono text-xs px-6 py-3 bg-transparent border border-[#2a2a40] text-[#8888a0] hover:text-[#22c55e] hover:border-[#22c55e]/50 active:scale-[0.97] transition-all duration-200 tracking-[0.1em] uppercase">
                <span className="text-[#555570]">$</span> ./load_next.sh
              </button>
            </div>
          )}
        </div>
      </section>

      <CertificatesComponent certificates={certificates} />
      <FooterComponent email={settings.email} github={settings.github} instagram={settings.instagram} linkedin={settings.linkedin} phone={settings.phone} />
    </div>
  );
};

export default Home;
