"use server";

import { prisma } from "@/lib/prisma";
import { uploadBase64 } from "@/lib/minio";
import { verifyAuth } from "./auth";
import { revalidateTag } from "next/cache";

export async function saveSettings(data: Record<string, unknown>) {
  if (!(await verifyAuth())) {
    return { success: false, error: "Não autorizado." } as const;
  }

  let cv = data.cv as string | undefined;

  if (cv && cv.length > 100) {
    const filename = await uploadBase64(cv, "cv");
    data.cv = filename;
  }

  await prisma.settings.upsert({
    where: { id: "main" },
    update: data as any,
    create: { id: "main", ...data } as any,
  });

  revalidateTag("loading-infos", "max");
  return { success: true } as const;
}
