"use server";

import { prisma } from "@/lib/prisma";
import { uploadBase64, deleteFile } from "@/lib/minio";
import { verifyAuth } from "./auth";
import { revalidateTag } from "next/cache";

export async function createSkill(data: { name: string; description: string; image: string }) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  if (!data.name || !data.description || !data.image) {
    return { success: false, error: "name, description e image são obrigatórios" } as const;
  }

  const filename = await uploadBase64(data.image, "skill");

  const maxOrder = await prisma.skills.aggregate({ _max: { order: true } });

  await prisma.skills.create({
    data: { name: data.name, description: data.description, image: filename, order: (maxOrder._max.order ?? -1) + 1 },
  });

  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}

export async function deleteSkill(id: string) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  if (!id) {
    return { success: false, error: "ID é obrigatório" } as const;
  }

  const skill = await prisma.skills.findUnique({ where: { id } });
  if (!skill) {
    return { success: false, error: "Habilidade não encontrada." } as const;
  }

  if (skill.image && skill.image.length < 200) {
    await deleteFile(skill.image).catch(() => {});
  }

  await prisma.skills.delete({ where: { id } });
  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}
