import { ensureSettings } from '@/lib/ensureSettings';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  await ensureSettings();

  try {
    const projects = await prisma.project.findMany();
    const skills = await prisma.skills.findMany();
    const certificates = await prisma.certificates.findMany();
    const settings = await prisma.settings.findFirst();

    return NextResponse.json({ settings, skills, projects, certificates });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao acessar banco de dados.' },
      { status: 500 }
    );
  }
}
