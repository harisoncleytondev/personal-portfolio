import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { uploadBase64 } from '@/lib/minio';

export async function PUT(req: NextRequest) {
  try {
    if (!(await verifyAuth(req))) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: 'Body inválido' }, { status: 400 });
    }

    let cv = body.cv as string | undefined;

    if (cv && cv.length > 100) {
      const filename = await uploadBase64(cv, "cv");
      body.cv = filename;
    }

    const query = await prisma.settings.upsert({
      where: { id: 'main' },
      update: body as any,
      create: { id: 'main', ...body } as any,
    });

    return NextResponse.json({ query });
  } catch {
    return NextResponse.json({ message: 'Erro ao salvar.' }, { status: 500 });
  }
}
