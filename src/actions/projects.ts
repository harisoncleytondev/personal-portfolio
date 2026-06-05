"use server";

import { prisma } from "@/lib/prisma";
import { createProjectSchema, deleteProjectSchema } from "@/lib/validations/project";
import { uploadBase64, deleteFile } from "@/lib/minio";
import { verifyAuth } from "./auth";
import { revalidateTag } from "next/cache";

export async function createProject(data: Record<string, unknown>) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  const parsed = createProjectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos", errors: parsed.error.flatten().fieldErrors } as const;
  }

  const { image: imageBase64, ...projectData } = parsed.data;
  let image = "";

  if (imageBase64) {
    image = await uploadBase64(imageBase64, "project");
  }

  await prisma.project.create({
    data: { ...projectData, image },
  });

  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}

export async function deleteProject(id: string) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  const parsed = deleteProjectSchema.safeParse({ id });
  if (!parsed.success) {
    return { success: false, error: "ID inválido" } as const;
  }

  const project = await prisma.project.findUnique({ where: { id: parsed.data.id } });
  if (!project) {
    return { success: false, error: "Projeto não encontrado." } as const;
  }

  if (project.image && project.image.length < 200) {
    await deleteFile(project.image).catch(() => {});
  }

  await prisma.project.delete({ where: { id: parsed.data.id } });
  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}
