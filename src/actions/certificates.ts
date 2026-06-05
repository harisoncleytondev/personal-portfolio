"use server";

import { prisma } from "@/lib/prisma";
import { verifyAuth } from "./auth";
import { revalidateTag } from "next/cache";

export async function createCertificate(data: Record<string, unknown>) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  await prisma.certificates.create({ data: data as any });

  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}

export async function updateCertificate(id: string, data: Record<string, unknown>) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  const existing = await prisma.certificates.findUnique({ where: { id } });
  if (!existing) {
    return { success: false, error: "Certificado não encontrado." } as const;
  }

  await prisma.certificates.update({
    where: { id },
    data: data as any,
  });

  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}

export async function deleteCertificate(id: string) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  if (!id) {
    return { success: false, error: "ID é obrigatório" } as const;
  }

  await prisma.certificates.delete({ where: { id } });

  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}
