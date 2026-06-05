import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getPresignedUrl } from "@/lib/minio";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    const skills = await prisma.skills.findMany();
    const certificates = await prisma.certificates.findMany();
    const settings = await prisma.settings.findFirst();

    const projectsWithUrls = await Promise.all(
      projects.map(async (p) => {
        let imageUrl: string | null = null;
        if (p.image && p.image.length < 200) {
          try {
            imageUrl = await getPresignedUrl(p.image);
          } catch {}
        }
        return { ...p, imageUrl };
      })
    );

    const skillsWithUrls = await Promise.all(
      skills.map(async (s) => {
        let imageUrl: string | null = null;
        if (s.image && s.image.length < 200) {
          try {
            imageUrl = await getPresignedUrl(s.image);
          } catch {}
        }
        return { ...s, imageUrl };
      })
    );

    let cvUrl: string | null = null;
    if (settings?.cv && settings.cv.length < 200) {
      try {
        cvUrl = await getPresignedUrl(settings.cv);
      } catch {}
    }

    return NextResponse.json({
      settings: settings ? { ...settings, cvUrl } : null,
      projects: projectsWithUrls,
      skills: skillsWithUrls,
      certificates,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao acessar banco de dados." },
      { status: 500 }
    );
  }
}
