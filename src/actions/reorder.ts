"use server";

import { prisma } from "@/lib/prisma";
import { verifyAuth } from "./auth";
import { revalidateTag } from "next/cache";

type EntityType = "project" | "skill" | "certificate";

export async function reorderItems(
  items: { id: string; order: number }[],
  type: EntityType
) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  const modelMap: Record<EntityType, any> = {
    project: prisma.project,
    skill: prisma.skills,
    certificate: prisma.certificates,
  };

  const model = modelMap[type];
  if (!model) {
    return { success: false, error: "Tipo inválido." } as const;
  }

  await Promise.all(
    items.map((item) =>
      model.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );

  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}
