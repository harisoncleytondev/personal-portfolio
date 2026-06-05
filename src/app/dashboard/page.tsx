"use client";

import { useLogout } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaSave,
  FaTrash,
  FaPlus,
  FaPen,
  FaProjectDiagram,
  FaCode,
  FaCertificate,
  FaTimes,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaFileAlt,
  FaGripVertical,
} from "react-icons/fa";
import { SidebarButtonComponent } from "./_components/sidebar-button-component";
import { useLoading } from "@/hooks/useLoading";
import { useQueryClient } from "@tanstack/react-query";
import { NextRequestDeleteDTO } from "@/types/dtos";
import { toast } from "sonner";
import { createProject as createProjectAction, updateProject as updateProjectAction, deleteProject as deleteProjectAction } from "@/actions/projects";
import { createSkill as createSkillAction, updateSkill as updateSkillAction, deleteSkill as deleteSkillAction } from "@/actions/skills";
import { saveSettings as saveSettingsAction, toggleMaintenance } from "@/actions/settings";
import { createCertificate as createCertificateAction, updateCertificate as updateCertificateAction, deleteCertificate as deleteCertificateAction } from "@/actions/certificates";
import { reorderItems } from "@/actions/reorder";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("settings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [orderedProjects, setOrderedProjects] = useState<any[]>([]);
  const [orderedSkills, setOrderedSkills] = useState<any[]>([]);
  const [orderedCertificates, setOrderedCertificates] = useState<any[]>([]);
  const dragItem = useRef<{ index: number; type: string } | null>(null);

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
    image: FileList;
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

  useEffect(() => {
    if (data) {
      setOrderedProjects(data.projects);
      setOrderedSkills(data.skills);
      setOrderedCertificates(data.certificates);
    }
  }, [data]);

  const projectForm = useForm<ProjectFormValues>();
  const skillForm = useForm<SkillFormValues>();
  const certificateForm = useForm<CertificateFormValues>();

  const queryClient = useQueryClient();

  const inputClass =
    "w-full bg-[#0f0f1a] p-3 border border-[#2a2a40] outline-none text-sm text-[#e8e8ed] focus:border-[#7c3aed] transition-colors font-mono placeholder:text-[#555570]";
  const fileInputClass =
    "w-full bg-[#0f0f1a] p-2 border border-[#2a2a40] text-sm text-[#e8e8ed] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono file:bg-[#7c3aed]/20 file:text-[#7c3aed] hover:file:bg-[#7c3aed]/30 font-mono";

  const handleToggleMaintenance = async () => {
    const newValue = !data?.settings?.maintenance;
    const toastId = toast.loading(
      newValue ? "Ativando modo manutenção..." : "Desativando modo manutenção..."
    );
    const result = await toggleMaintenance(newValue);
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
      toast.success(
        newValue ? "Modo manutenção ativado." : "Modo manutenção desativado.",
        { id: toastId }
      );
    } else {
      toast.error(result.error || "Erro ao alterar modo manutenção.", { id: toastId });
    }
  };

  const handleSaveSettings = async (data: SettingsFormValues) => {
    const file = data.cv && data.cv.length > 0 ? data.cv[0] : null;
    const toastId = toast.loading("Salvando configurações...");

    const submitData = async (payload: any) => {
      const result = await saveSettingsAction(payload);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
        toast.success("Configurações salvas com sucesso!", { id: toastId });
      } else {
        toast.error(result.error || "Erro ao salvar configurações.", { id: toastId });
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string)?.split(",")[1];
        const { cv, ...rest } = data;
        await submitData({ ...rest, cv: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      const { cv, ...rest } = data;
      await submitData(rest);
    }
  };

  const handleCreateProject = async (formData: ProjectFormValues) => {
    setIsModalOpen(false);

    const toastId = toast.loading("Criando projeto...");
    const file = formData.image?.[0];
    const { technologies, image: _imageFile, ...rest } = formData;
    const techList = technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((t) => t !== "");

    const submitProject = async (payload: any) => {
      const result = await createProjectAction(payload);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
        projectForm.reset();
        toast.success("Projeto criado com sucesso!", { id: toastId });
      } else {
        toast.error(result.error || "Erro ao criar projeto.", { id: toastId });
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(",")[1];
        await submitProject({ ...rest, languages: techList, image: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      await submitProject({ ...rest, languages: techList });
    }
  };

  const handleDeleteProject = async (item: NextRequestDeleteDTO) => {
    const toastId = toast.loading("Deletando projeto...");
    const result = await deleteProjectAction(item.id);
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
      toast.success("Projeto deletado com sucesso!", { id: toastId });
    } else {
      toast.error(result.error || "Erro ao deletar projeto.", { id: toastId });
    }
  };

  const handleCreateSkill = async (formData: SkillFormValues) => {
    setIsModalOpen(false);
    const file = formData.image?.[0];
    if (!file) return;

    const toastId = toast.loading("Criando habilidade...");
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(",")[1];
      const { image: _, ...restData } = formData;

      const result = await createSkillAction({
        ...restData,
        image: base64String,
      } as any);

      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
        skillForm.reset();
        toast.success("Habilidade criada com sucesso!", { id: toastId });
      } else {
        toast.error(result.error || "Erro ao criar habilidade.", { id: toastId });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteSkill = async (item: NextRequestDeleteDTO) => {
    const toastId = toast.loading("Deletando habilidade...");
    const result = await deleteSkillAction(item.id);
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
      toast.success("Habilidade deletada com sucesso!", { id: toastId });
    } else {
      toast.error(result.error || "Erro ao deletar habilidade.", { id: toastId });
    }
  };

  const handleCreateCertificate = async (formData: CertificateFormValues) => {
    setIsModalOpen(false);
    const toastId = toast.loading("Criando certificado...");

    const langList = formData.languages
      ? formData.languages
          .split(",")
          .map((lang) => lang.trim())
          .filter(Boolean)
      : [];

    const date = formData.issuedAt ? new Date(formData.issuedAt) : new Date();

    const result = await createCertificateAction({
      ...formData,
      languages: langList,
      issuedAt: date,
      credentialUrl: formData.credentialUrl || undefined,
    } as any);

    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
      certificateForm.reset();
      toast.success("Certificado criado com sucesso!", { id: toastId });
    } else {
      toast.error(result.error || "Erro ao criar certificado.", { id: toastId });
    }
  };

  const handleDeleteCertificate = async (item: NextRequestDeleteDTO) => {
    const toastId = toast.loading("Deletando certificado...");
    const result = await deleteCertificateAction(item.id);
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
      toast.success("Certificado deletado com sucesso!", { id: toastId });
    } else {
      toast.error(result.error || "Erro ao deletar certificado.", { id: toastId });
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    projectForm.reset();
    skillForm.reset();
    certificateForm.reset();
    setIsModalOpen(true);
  };

  const openEditModal = (item: any, type: string) => {
    setEditingItem(item);
    if (type === "project") {
      projectForm.reset({
        title: item.title,
        description: item.description,
        url: item.url,
        urlRepository: item.urlRepository,
        technologies: (item.languages || []).join(", "),
      });
    } else if (type === "skill") {
      skillForm.reset({
        name: item.name,
        description: item.description,
      });
    } else if (type === "certificate") {
      certificateForm.reset({
        title: item.title,
        institution: item.institution || "",
        description: item.description || "",
        issuedAt: item.issuedAt ? item.issuedAt.split("T")[0] : "",
        languages: (item.languages || []).join(", "),
        credentialUrl: item.credentialUrl || "",
        completed: item.completed ?? true,
      });
    }
    setIsModalOpen(true);
  };

  const handleUpdateProject = async (formData: ProjectFormValues) => {
    if (!editingItem) return;
    setIsModalOpen(false);

    const toastId = toast.loading("Atualizando projeto...");
    const file = formData.image?.[0];
    const { technologies, image: _imageFile, ...rest } = formData;
    const techList = technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((t) => t !== "");

    const submitUpdate = async (payload: any) => {
      const result = await updateProjectAction(editingItem.id, payload);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
        toast.success("Projeto atualizado com sucesso!", { id: toastId });
      } else {
        toast.error(result.error || "Erro ao atualizar projeto.", { id: toastId });
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(",")[1];
        await submitUpdate({ ...rest, languages: techList, image: base64String });
      };
      reader.readAsDataURL(file);
    } else {
      await submitUpdate({ ...rest, languages: techList });
    }
  };

  const handleUpdateSkill = async (formData: SkillFormValues) => {
    if (!editingItem) return;
    setIsModalOpen(false);

    const toastId = toast.loading("Atualizando habilidade...");
    const file = formData.image?.[0];
    const { image: _, ...restData } = formData;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(",")[1];
        const result = await updateSkillAction(editingItem.id, { ...restData, image: base64String });
        if (result.success) {
          queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
          toast.success("Habilidade atualizada com sucesso!", { id: toastId });
        } else {
          toast.error(result.error || "Erro ao atualizar habilidade.", { id: toastId });
        }
      };
      reader.readAsDataURL(file);
    } else {
      const result = await updateSkillAction(editingItem.id, restData);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
        toast.success("Habilidade atualizada com sucesso!", { id: toastId });
      } else {
        toast.error(result.error || "Erro ao atualizar habilidade.", { id: toastId });
      }
    }
  };

  const handleUpdateCertificate = async (formData: CertificateFormValues) => {
    if (!editingItem) return;
    setIsModalOpen(false);

    const toastId = toast.loading("Atualizando certificado...");
    const langList = formData.languages
      ? formData.languages.split(",").map((lang) => lang.trim()).filter(Boolean)
      : [];
    const date = formData.issuedAt ? new Date(formData.issuedAt) : new Date();

    const result = await updateCertificateAction(editingItem.id, {
      ...formData,
      languages: langList,
      issuedAt: date,
      credentialUrl: formData.credentialUrl || undefined,
    } as any);

    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
      toast.success("Certificado atualizado com sucesso!", { id: toastId });
    } else {
      toast.error(result.error || "Erro ao atualizar certificado.", { id: toastId });
    }
  };

  const handleDragStart = useCallback((index: number, type: string) => {
    dragItem.current = { index, type };
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    async (dropIndex: number, type: string) => {
      if (!dragItem.current || dragItem.current.type !== type) return;

      const dragIdx = dragItem.current.index;
      if (dragIdx === dropIndex) return;

      let items: any[];
      let setItems: React.Dispatch<React.SetStateAction<any[]>>;

      if (type === "project") {
        items = [...orderedProjects];
        setItems = setOrderedProjects;
      } else if (type === "skill") {
        items = [...orderedSkills];
        setItems = setOrderedSkills;
      } else {
        items = [...orderedCertificates];
        setItems = setOrderedCertificates;
      }

      const [removed] = items.splice(dragIdx, 1);
      items.splice(dropIndex, 0, removed);

      const reordered = items.map((item, i) => ({ ...item, order: i }));
      setItems(reordered);

      dragItem.current = null;

      const result = await reorderItems(
        reordered.map((item) => ({ id: item.id, order: item.order })),
        type as "project" | "skill" | "certificate"
      );

      if (!result.success) {
        queryClient.invalidateQueries({ queryKey: ["query-loading-infos"] });
        toast.error(result.error || "Erro ao reordenar.");
      }
    },
    [orderedProjects, orderedSkills, orderedCertificates, queryClient]
  );

  const { mutate: logout } = useLogout();
  const router = useRouter();

  const handleButtonLogout = () => {
    logout(undefined, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <div className="min-h-screen bg-[#08080e] text-[#e8e8ed] flex flex-col md:flex-row font-mono">
      <aside className="w-full md:w-64 bg-[#0f0f1a] border-r border-[#1a1a28] flex flex-col">
        <div className="p-6 border-b border-[#1a1a28]">
          <h1 className="font-mono font-bold text-base text-[#7c3aed]">
            <span className="text-[#555570]">$</span> dashboard
          </h1>
          <p className="text-[10px] text-[#555570] mt-1 tracking-[0.1em] uppercase">v1.0.2 /admin</p>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 pt-2">
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

        <div className="p-4 border-t border-[#1a1a28] text-center">
          <button
            onClick={handleButtonLogout}
            className="text-[10px] text-red-500/70 hover:text-red-400 uppercase tracking-[0.15em] font-mono transition-colors"
          >
            $ ./logout.sh
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="font-mono text-lg text-[#e8e8ed]">
              <span className="text-[#7c3aed]">$</span>{" "}
              {activeTab === "settings" && "./configure.sh"}
              {activeTab === "projects" && "./projects.sh"}
              {activeTab === "skills" && "./skills.sh"}
              {activeTab === "certificates" && "./certificates.sh"}
            </h2>
            <p className="font-mono text-[10px] text-[#555570] mt-1 tracking-[0.1em]">
              <span className="text-[#555570]">//</span>{" "}
              {activeTab === "settings" && "configurações do sistema"}
              {activeTab === "projects" && "gerenciar projetos"}
              {activeTab === "skills" && "gerenciar habilidades"}
              {activeTab === "certificates" && "gerenciar certificados"}
            </p>
          </div>

          {activeTab === "settings" && (
            <form
              onSubmit={settingsForm.handleSubmit(handleSaveSettings)}
              className="border border-[#1a1a28] bg-[#0f0f1a]/50"
            >
              <div className="px-6 py-3 border-b border-[#1a1a28] bg-[#0f0f1a]">
                <span className="font-mono text-[10px] text-[#555570] uppercase tracking-[0.15em]">
                  <span className="text-[#7c3aed]">$</span> configurações do sistema
                </span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#555570] mb-2">
                    <FaEnvelope className="text-[#7c3aed]" /> Email
                  </label>
                  <input {...settingsForm.register("email")} className={inputClass} />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#555570] mb-2">
                    <FaPhone className="text-[#7c3aed]" /> Telefone
                  </label>
                  <input {...settingsForm.register("phone")} className={inputClass} />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#555570] mb-2">
                    <FaInstagram className="text-[#7c3aed]" /> Instagram
                  </label>
                  <input {...settingsForm.register("instagram")} className={inputClass} />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#555570] mb-2">
                    <FaLinkedin className="text-[#7c3aed]" /> LinkedIn
                  </label>
                  <input {...settingsForm.register("linkedin")} className={inputClass} />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#555570] mb-2">
                    <FaGithub className="text-[#7c3aed]" /> GitHub
                  </label>
                  <input {...settingsForm.register("github")} className={inputClass} />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-[#555570] mb-2">
                    <FaFileAlt className="text-[#7c3aed]" /> Currículo (PDF)
                  </label>
                  <input type="file" accept="application/pdf" {...settingsForm.register("cv")} className={fileInputClass} />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[#1a1a28] flex items-center justify-between bg-[#0f0f1a]/80">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#555570]">Modo Manutenção</span>
                  <button
                    type="button"
                    onClick={handleToggleMaintenance}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      data?.settings?.maintenance ? "bg-[#f59e0b]" : "bg-[#2a2a40]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[#e8e8ed] rounded-full transition-transform ${
                        data?.settings?.maintenance ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <button className="bg-[#7c3aed] text-[#e8e8ed] px-6 py-2.5 hover:bg-[#6d28d9] active:scale-[0.97] transition-all font-mono text-[10px] uppercase tracking-[0.15em] flex items-center gap-2">
                  <FaSave /> Salvar
                </button>
              </div>
            </form>
          )}

          {activeTab !== "settings" && (
            <button
              onClick={openCreateModal}
              className="mb-6 bg-[#7c3aed] text-[#e8e8ed] px-4 py-2.5 hover:bg-[#6d28d9] active:scale-[0.97] transition-all flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]"
            >
              <FaPlus /> Adicionar{" "}
              {activeTab === "projects" && "Projeto"}
              {activeTab === "skills" && "Habilidade"}
              {activeTab === "certificates" && "Certificado"}
            </button>
          )}

          {activeTab === "projects" && (
            <div className="flex flex-col gap-3">
              {orderedProjects.length === 0 && (
                <p className="font-mono text-xs text-[#555570] text-center py-12">
                  <span className="text-[#555570]">//</span> nenhum projeto cadastrado
                </p>
              )}
              {orderedProjects.map((p, index) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={() => handleDragStart(index, "project")}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index, "project")}
                  className="flex items-start gap-4 border border-[#1a1a28] bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] transition-colors cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex items-center self-stretch px-3 border-r border-[#1a1a28] text-[#555570] hover:text-[#7c3aed] transition-colors">
                    <FaGripVertical className="text-xs" />
                  </div>
                  {(p as any).imageUrl && (
                    <div className="w-24 h-16 mt-3 overflow-hidden bg-[#0f0f1a] shrink-0 border border-[#1a1a28]">
                      <img src={(p as any).imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 py-3 pr-4 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-[#555570] font-mono">#{index}</span>
                      <h3 className="font-mono text-sm text-[#e8e8ed] truncate">{p.title}</h3>
                    </div>
                    <p className="font-mono text-[11px] text-[#8888a0] line-clamp-2">{p.description}</p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-[10px] text-[#555570] truncate max-w-[200px]">url: {p.url}</span>
                      <span className="text-[10px] text-[#555570] truncate max-w-[200px]">repo: {p.urlRepository}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => openEditModal(p, "project")}
                    className="self-stretch px-3 text-[#555570] hover:text-[#7c3aed] hover:bg-[#7c3aed]/10 transition-colors flex items-center text-xs"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDeleteProject({ id: p.id })}
                    className="self-stretch px-4 text-[#555570] hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "skills" && (
            <div className="flex flex-col gap-3">
              {orderedSkills.length === 0 && (
                <p className="font-mono text-xs text-[#555570] text-center py-12">
                  <span className="text-[#555570]">//</span> nenhuma habilidade cadastrada
                </p>
              )}
              {orderedSkills.map((s, index) => (
                <div
                  key={s.id}
                  draggable
                  onDragStart={() => handleDragStart(index, "skill")}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index, "skill")}
                  className="flex items-center gap-4 border border-[#1a1a28] bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] transition-colors cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex items-center self-stretch px-3 border-r border-[#1a1a28] text-[#555570] hover:text-[#7c3aed] transition-colors">
                    <FaGripVertical className="text-xs" />
                  </div>
                  {(s as any).imageUrl && (
                    <div className="w-10 h-10 flex items-center justify-center bg-[#0f0f1a] shrink-0 border border-[#1a1a28]">
                      <img src={(s as any).imageUrl} alt={s.name} className="max-w-full max-h-full object-contain p-1" />
                    </div>
                  )}
                  <div className="flex-1 py-3 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-[#555570] font-mono">#{index}</span>
                      <h3 className="font-mono text-sm text-[#e8e8ed]">{s.name}</h3>
                    </div>
                    <p className="font-mono text-[11px] text-[#8888a0] truncate">{s.description}</p>
                  </div>
                  <button
                    onClick={() => openEditModal(s, "skill")}
                    className="self-stretch px-3 text-[#555570] hover:text-[#7c3aed] hover:bg-[#7c3aed]/10 transition-colors flex items-center text-xs"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill({ id: s.id })}
                    className="self-stretch px-4 text-[#555570] hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="flex flex-col gap-3">
              {orderedCertificates.length === 0 && (
                <p className="font-mono text-xs text-[#555570] text-center py-12">
                  <span className="text-[#555570]">//</span> nenhum certificado cadastrado
                </p>
              )}
              {orderedCertificates.map((c, index) => (
                <div
                  key={c.id}
                  draggable
                  onDragStart={() => handleDragStart(index, "certificate")}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index, "certificate")}
                  className="flex items-center gap-4 border border-[#1a1a28] bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] transition-colors cursor-grab active:cursor-grabbing group"
                >
                  <div className="flex items-center self-stretch px-3 border-r border-[#1a1a28] text-[#555570] hover:text-[#7c3aed] transition-colors">
                    <FaGripVertical className="text-xs" />
                  </div>
                  <div className="flex-1 py-3 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] text-[#555570] font-mono">#{index}</span>
                      <h3 className="font-mono text-sm text-[#e8e8ed]">{c.title}</h3>
                      <span className="text-[10px] text-[#555570] ml-auto">{c.institution}</span>
                    </div>
                    <p className="font-mono text-[11px] text-[#8888a0] truncate">{c.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-[#555570]">
                        {new Date(c.issuedAt).toLocaleDateString("pt-BR")}
                      </span>
                      <span className={`text-[10px] flex items-center gap-1 ${c.completed ? "text-[#22c55e]" : "text-[#f59e0b]"}`}>
                        <FaCheckCircle /> {c.completed ? "Concluído" : "Em andamento"}
                      </span>
                      <div className="flex gap-1">
                        {c.languages.map((l: string, i: number) => (
                          <span key={i} className="text-[9px] text-[#7c3aed] uppercase tracking-[0.1em]">
                            {l}{i < c.languages.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                    {c.credentialUrl && (
                      <span className="text-[10px] text-[#555570] truncate block max-w-xs mt-0.5">url: {c.credentialUrl}</span>
                    )}
                  </div>
                  <button
                    onClick={() => openEditModal(c, "certificate")}
                    className="self-stretch px-3 text-[#555570] hover:text-[#7c3aed] hover:bg-[#7c3aed]/10 transition-colors flex items-center text-xs"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDeleteCertificate({ id: c.id })}
                    className="self-stretch px-4 text-[#555570] hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center text-xs"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f1a] w-full max-w-lg border border-[#2a2a40]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a40] bg-[#0f0f1a]">
              <h3 className="font-mono text-sm text-[#e8e8ed] uppercase tracking-[0.1em]">
                <span className="text-[#7c3aed]">$</span>{" "}
                {activeTab === "projects" && (editingItem ? "./edit_project.sh" : "./create_project.sh")}
                {activeTab === "skills" && (editingItem ? "./edit_skill.sh" : "./create_skill.sh")}
                {activeTab === "certificates" && (editingItem ? "./edit_certificate.sh" : "./create_certificate.sh")}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#555570] hover:text-[#e8e8ed] transition-colors">
                <FaTimes />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {activeTab === "projects" && (
                <form onSubmit={projectForm.handleSubmit(editingItem ? handleUpdateProject : handleCreateProject)} className="flex flex-col gap-4">
                  <input {...projectForm.register("title", { required: true })} placeholder="Título *" className={inputClass} />
                  <textarea {...projectForm.register("description", { required: true })} placeholder="Descrição *" rows={4} className={`${inputClass} resize-none`} />
                  <input {...projectForm.register("technologies", { required: true })} placeholder="Tecnologias (separar por vírgula) *" className={inputClass} />
                  <input {...projectForm.register("url")} placeholder="URL Live" className={inputClass} />
                  <input {...projectForm.register("urlRepository")} placeholder="URL Repositório" className={inputClass} />
                  <input type="file" accept="image/*" {...projectForm.register("image")} className={fileInputClass} />
                  <button className="bg-[#7c3aed] text-[#e8e8ed] py-3 hover:bg-[#6d28d9] active:scale-[0.97] transition-all font-mono text-[10px] uppercase tracking-[0.15em]">
                    {editingItem ? "Atualizar" : "Salvar"}
                  </button>
                </form>
              )}

              {activeTab === "skills" && (
                <form onSubmit={skillForm.handleSubmit(editingItem ? handleUpdateSkill : handleCreateSkill)} className="flex flex-col gap-4">
                  <input {...skillForm.register("name", { required: true })} placeholder="Nome *" className={inputClass} />
                  <textarea {...skillForm.register("description", { required: true })} placeholder="Descrição *" rows={3} className={`${inputClass} resize-none`} />
                  <input type="file" {...skillForm.register("image")} className={fileInputClass} />
                  <button className="bg-[#7c3aed] text-[#e8e8ed] py-3 hover:bg-[#6d28d9] active:scale-[0.97] transition-all font-mono text-[10px] uppercase tracking-[0.15em]">
                    {editingItem ? "Atualizar" : "Salvar"}
                  </button>
                </form>
              )}

              {activeTab === "certificates" && (
                <form onSubmit={certificateForm.handleSubmit(editingItem ? handleUpdateCertificate : handleCreateCertificate)} className="flex flex-col gap-4">
                  <input {...certificateForm.register("title", { required: true })} placeholder="Título *" className={inputClass} />
                  <input {...certificateForm.register("institution", { required: true })} placeholder="Instituição *" className={inputClass} />
                  <textarea {...certificateForm.register("description")} placeholder="Descrição" rows={3} className={`${inputClass} resize-none`} />
                  <input {...certificateForm.register("issuedAt", { required: true })} type="date" className={inputClass} />
                  <input {...certificateForm.register("languages", { required: true })} placeholder="Linguagens (separar por vírgula) *" className={inputClass} />
                  <input {...certificateForm.register("credentialUrl")} placeholder="URL Credencial (Opcional)" className={inputClass} />
                  <label className="flex items-center gap-2 text-[11px] cursor-pointer select-none text-[#8888a0] font-mono">
                    <input type="checkbox" {...certificateForm.register("completed")} className="accent-[#7c3aed]" />
                    Concluído
                  </label>
                  <button className="bg-[#7c3aed] text-[#e8e8ed] py-3 hover:bg-[#6d28d9] active:scale-[0.97] transition-all font-mono text-[10px] uppercase tracking-[0.15em]">
                    {editingItem ? "Atualizar" : "Salvar"}
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
