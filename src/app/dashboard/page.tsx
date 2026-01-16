"use client";

import { useLogout } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaSave,
  FaTrash,
  FaPlus,
  FaProjectDiagram,
  FaCode,
  FaCertificate,
  FaTimes,
  FaCheckCircle,
  FaSortNumericDown,
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaFileAlt,
} from "react-icons/fa";
import { SidebarButtonComponent } from "./_components/sidebar-button-component";
import { createSkill, deleteSkill } from "@/hooks/useSkills";
import { useLoading } from "@/hooks/useLoading";
import { useQueryClient } from "@tanstack/react-query";
import { createProject, deleteProject } from "@/hooks/useProjects";
import { createCertificate, deleteCertificate } from "@/hooks/useCertificates";
import { NextRequestDeleteDTO } from "@/types/dtos";
import { saveSettings } from "@/hooks/useSettings";
import { toast } from "sonner";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("settings");
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface SkillFormValues {
    name: string;
    description: string;
    image: FileList;
  }

  interface ProjectFormValues {
    title: string;
    description: string;
    url: string;
    urlRepository: string;
    technologies: string;
  }

  interface CertificateFormValues {
    order: number;
    title: string;
    institution: string;
    description: string;
    issuedAt: string;
    languages: string;
    credentialUrl?: string;
    completed: boolean;
  }

  interface SettingsFormValues {
    email: string;
    phone: string;
    instagram: string;
    linkedin: string;
    github: string;
    cv?: FileList;
  }

  const settingsForm = useForm<SettingsFormValues>({
    defaultValues: {
      email: "harisoncleytondev@outlook.com",
      phone: "xxxx-xxxx",
      instagram: "username",
      linkedin: "username",
      github: "username",
    },
  });

  const { data } = useLoading();

  useEffect(() => {
    if (data?.settings) {
      settingsForm.reset({
        email: data.settings.email,
        phone: data.settings.phone,
        instagram: data.settings.instagram,
        linkedin: data.settings.linkedin,
        github: data.settings.github,
      });
    }
  }, [data?.settings, settingsForm]);

  const projectForm = useForm<ProjectFormValues>();
  const skillForm = useForm<SkillFormValues>();
  const certificateForm = useForm<CertificateFormValues>();

  const { mutate: saveSetts } = saveSettings();

  const { mutate: postSkill } = createSkill();
  const { mutate: postProject } = createProject();
  const { mutate: postCertificate } = createCertificate();

  const { mutate: delCertificate } = deleteCertificate();
  const { mutate: delSkill } = deleteSkill();
  const { mutate: delProject } = deleteProject();

  const queryClient = useQueryClient();

  const inputClass =
    "w-full bg-[var(--color-card)] p-3 rounded border border-gray/10 outline-none text-sm focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors text-dark-gray invalid:border-red-500";
  const fileInputClass =
    "w-full bg-[var(--color-card)] p-2 rounded border border-gray/10 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 text-dark-gray";

  const handleSaveSettings = (data: SettingsFormValues) => {
    const file = data.cv && data.cv.length > 0 ? data.cv[0] : null;

    const submitData = (payload: any) => {
      const toastId = toast.loading("Salvando configurações...");
      saveSetts(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["query-loading-infos"],
          });
          toast.success("Configurações salvas com sucesso!", { id: toastId });
        },
        onError: () => {
          toast.error("Erro ao salvar configurações.", { id: toastId });
        },
      });
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string)?.split(",")[1];

        const { cv, ...rest } = data;
        submitData({ ...rest, cv: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      const { cv, ...rest } = data;
      submitData(rest);
    }
  };

  const handleCreateProject = (data: ProjectFormValues) => {
    setIsModalOpen(false);

    const toastId = toast.loading("Criando projeto...");
    const { technologies, ...rest } = data;
    const techList = technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((t) => t !== "");

    postProject({ ...rest, languages: techList } as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-loading-infos"],
        });
        projectForm.reset();
        toast.success("Projeto criado com sucesso!", { id: toastId });
      },
      onError: () => {
        toast.error("Erro ao criar projeto.", { id: toastId });
      },
    });
  };

  const handleDeleteProject = (data: NextRequestDeleteDTO) => {
    const toastId = toast.loading("Deletando projeto...");

    delProject(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-loading-infos"],
        });
        toast.success("Projeto deletado com sucesso!", { id: toastId });
      },
      onError: () => {
        toast.error("Erro ao deletar projeto.", { id: toastId });
      },
    });
  };

  const handleCreateSkill = (data: SkillFormValues) => {
    setIsModalOpen(false);
    const file = data.image?.[0];
    if (!file) return;

    const toastId = toast.loading("Criando habilidade...");
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      const { image: _, ...restData } = data;

      postSkill(
        {
          ...restData,
          image: base64String,
        } as any,
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["query-loading-infos"],
            });
            skillForm.reset();
            toast.success("Habilidade criada com sucesso!", { id: toastId });
          },
          onError: () => {
            toast.error("Erro ao criar habilidade.", { id: toastId });
          },
        }
      );
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteSkill = (data: NextRequestDeleteDTO) => {
    const toastId = toast.loading("Deletando habilidade...");

    delSkill(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-loading-infos"],
        });
        toast.success("Habilidade deletada com sucesso!", { id: toastId });
      },
      onError: () => {
        toast.error("Erro ao deletar habilidade.", { id: toastId });
      },
    });
  };

  const handleCreateCertificate = (data: CertificateFormValues) => {
    setIsModalOpen(false);
    const toastId = toast.loading("Criando certificado...");

    const langList = data.languages
      ? data.languages
          .split(",")
          .map((lang) => lang.trim())
          .filter(Boolean)
      : [];

    const date = data.issuedAt ? new Date(data.issuedAt) : new Date();

    postCertificate(
      {
        ...data,
        languages: langList,
        issuedAt: date,
        credentialUrl: data.credentialUrl || undefined,
      } as any,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["query-loading-infos"],
          });
          certificateForm.reset();
          toast.success("Certificado criado com sucesso!", { id: toastId });
        },
        onError: () => {
          toast.error("Erro ao criar certificado.", { id: toastId });
        },
      }
    );
  };

  const handleDeleteCertificate = (data: NextRequestDeleteDTO) => {
    const toastId = toast.loading("Deletando certificado...");

    delCertificate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["query-loading-infos"],
        });
        toast.success("Certificado deletado com sucesso!", { id: toastId });
      },
      onError: () => {
        toast.error("Erro ao deletar certificado.", { id: toastId });
      },
    });
  };

  const { mutate: logout } = useLogout();
  const router = useRouter();

  const handleButtonLogout = () => {
    logout(undefined, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <div className="min-h-screen bg-light-gray flex flex-col md:flex-row font-secondary text-dark-gray relative transition-colors duration-300">
      <p className="text-red"></p>
      <aside className="w-full md:w-64 bg-[var(--color-light-gray)] border-r border-gray/10 flex flex-col">
        <div className="p-6 border-b border-gray/10 mb-2">
          <h1 className="font-primary font-bold text-xl text-secondary">
            Dashboard
          </h1>
          <p className="text-xs text-gray mt-1">v1.0.2 Admin Panel</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          <SidebarButtonComponent
            id="settings"
            icon={FaSave}
            label="Geral"
            activeTab={activeTab}
            setActive={setActiveTab}
          />
          <SidebarButtonComponent
            id="projects"
            icon={FaProjectDiagram}
            label="Projetos"
            activeTab={activeTab}
            setActive={setActiveTab}
          />
          <SidebarButtonComponent
            id="skills"
            icon={FaCode}
            label="Habilidades"
            activeTab={activeTab}
            setActive={setActiveTab}
          />
          <SidebarButtonComponent
            id="certificates"
            icon={FaCertificate}
            label="Certificados"
            activeTab={activeTab}
            setActive={setActiveTab}
          />
        </nav>

        <div className="p-4 border-t border-gray/10 text-center">
          <button
            onClick={handleButtonLogout}
            className="text-xs text-red-500 hover:underline uppercase tracking-widest font-bold"
          >
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeTab === "settings" && (
            <form
              onSubmit={settingsForm.handleSubmit(handleSaveSettings)}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray/10 animate-fade-in"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray mb-2">
                    <FaEnvelope /> Email
                  </label>
                  <input
                    {...settingsForm.register("email")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray mb-2">
                    <FaPhone /> Telefone
                  </label>
                  <input
                    {...settingsForm.register("phone")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray mb-2">
                    <FaInstagram /> Instagram
                  </label>
                  <input
                    {...settingsForm.register("instagram")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray mb-2">
                    <FaLinkedin /> LinkedIn
                  </label>
                  <input
                    {...settingsForm.register("linkedin")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray mb-2">
                    <FaGithub /> GitHub
                  </label>
                  <input
                    {...settingsForm.register("github")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray mb-2">
                    <FaFileAlt /> Currículo (PDF)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    {...settingsForm.register("cv")}
                    className={fileInputClass}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="bg-secondary text-white px-8 py-3 rounded shadow hover:bg-primary transition-all font-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <FaSave /> Salvar Alterações
                </button>
              </div>
            </form>
          )}

          {activeTab !== "settings" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary text-white px-4 py-2 rounded shadow hover:bg-primary transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <FaPlus /> Adicionar
            </button>
          )}

          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray/10"
                >
                  <h3 className="font-bold text-secondary">{p.title}</h3>
                  <p className="text-sm text-gray mt-2">{p.description}</p>
                  <p className="text-xs mt-2">Live: {p.url}</p>
                  <p className="text-xs">Repo: {p.urlRepository}</p>
                  <button
                    onClick={() => handleDeleteProject({ id: p.id })}
                    className="mt-4 text-xs text-red-500 flex items-center gap-1"
                  >
                    <FaTrash /> Deletar
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data?.skills.map((s) => (
                <div
                  key={s.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray/10 text-center flex flex-col items-center"
                >
                  {s.image && (
                    <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg">
                      <img
                        src={`data:image/png;base64,${s.image}`}
                        alt={s.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}

                  <h3 className="font-bold text-secondary">{s.name}</h3>
                  <p className="text-sm text-gray mt-2">{s.description}</p>

                  <button
                    onClick={() => handleDeleteSkill({ id: s.id })}
                    className="mt-4 text-xs text-red-500 flex items-center justify-center gap-1 hover:text-red-700 transition-colors"
                  >
                    <FaTrash /> Deletar
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="flex flex-col gap-4">
              {data?.certificates.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray/10"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">{c.title}</h3>
                    <span className="text-xs text-gray flex items-center gap-1">
                      <FaSortNumericDown /> {c.order}
                    </span>
                  </div>
                  <p className="text-sm text-secondary">{c.institution}</p>
                  <p className="text-xs text-gray mt-1">{c.description}</p>
                  <p className="text-xs mt-1">
                    Emitido em:{" "}
                    {new Date(c.issuedAt).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-xs flex items-center gap-1 mt-1">
                    <FaCheckCircle />{" "}
                    {c.completed ? "Concluído" : "Em andamento"}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {c.languages.map((l, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-secondary/10 text-secondary px-2 py-1 rounded font-bold uppercase"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs mt-2">{c.credentialUrl}</p>
                  <button
                    onClick={() => handleDeleteCertificate({ id: c.id })}
                    className="mt-4 text-xs text-red-500 flex items-center gap-1"
                  >
                    <FaTrash /> Deletar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-card)] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300">
            <div className="bg-secondary p-4 flex justify-between items-center text-white">
              <h3 className="font-primary font-bold uppercase tracking-wider text-sm">
                Adicionar
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {activeTab === "projects" && (
                <form
                  onSubmit={projectForm.handleSubmit(handleCreateProject)}
                  className="flex flex-col gap-4"
                >
                  <input
                    {...projectForm.register("title", { required: true })}
                    placeholder="Título *"
                    className={inputClass}
                  />

                  <textarea
                    {...projectForm.register("description", { required: true })}
                    placeholder="Descrição *"
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />

                  <input
                    {...projectForm.register("technologies", {
                      required: true,
                    })}
                    placeholder="Tecnologias (separar por vírgula) *"
                    className={inputClass}
                  />

                  <input
                    {...projectForm.register("url")}
                    placeholder="URL Live"
                    className={inputClass}
                  />
                  <input
                    {...projectForm.register("urlRepository")}
                    placeholder="URL Repositório"
                    className={inputClass}
                  />
                  <button className="bg-secondary text-white py-3 rounded font-bold uppercase text-xs">
                    Salvar Registro
                  </button>
                </form>
              )}

              {activeTab === "skills" && (
                <form
                  onSubmit={skillForm.handleSubmit(handleCreateSkill)}
                  className="flex flex-col gap-4"
                >
                  <input
                    {...skillForm.register("name", { required: true })}
                    placeholder="Nome *"
                    className={inputClass}
                  />

                  <textarea
                    {...skillForm.register("description", { required: true })}
                    placeholder="Descrição *"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />

                  <input
                    type="file"
                    {...skillForm.register("image", { required: true })}
                    className={fileInputClass}
                  />

                  <button className="bg-secondary text-white py-3 rounded font-bold uppercase text-xs">
                    Salvar Registro
                  </button>
                </form>
              )}

              {activeTab === "certificates" && (
                <form
                  onSubmit={certificateForm.handleSubmit(
                    handleCreateCertificate
                  )}
                  className="flex flex-col gap-4"
                >
                  <input
                    {...certificateForm.register("order", {
                      valueAsNumber: true,
                      required: true,
                    })}
                    type="number"
                    placeholder="Ordem *"
                    className={inputClass}
                  />
                  <input
                    {...certificateForm.register("title", { required: true })}
                    placeholder="Título *"
                    className={inputClass}
                  />
                  <input
                    {...certificateForm.register("institution", {
                      required: true,
                    })}
                    placeholder="Instituição *"
                    className={inputClass}
                  />

                  <textarea
                    {...certificateForm.register("description")}
                    placeholder="Descrição"
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />

                  <input
                    {...certificateForm.register("issuedAt", {
                      required: true,
                    })}
                    type="date"
                    placeholder="Data *"
                    className={inputClass}
                  />
                  <input
                    {...certificateForm.register("languages", {
                      required: true,
                    })}
                    placeholder="Linguagens (separar por vírgula) *"
                    className={inputClass}
                  />

                  <input
                    {...certificateForm.register("credentialUrl")}
                    placeholder="URL Credencial (Opcional)"
                    className={inputClass}
                  />

                  <label className="flex items-center gap-2 text-xs cursor-pointer select-none text-dark-gray">
                    <input
                      type="checkbox"
                      {...certificateForm.register("completed")}
                      className="accent-secondary"
                    />
                    Concluído
                  </label>

                  <button className="bg-secondary text-white py-3 rounded font-bold uppercase text-xs">
                    Salvar Registro
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
