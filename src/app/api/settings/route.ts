import { prisma } from '@/lib/prisma';
import { Settings } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    let body: Settings;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: 'Body inválido' }, { status: 400 });
    }

    const query = await prisma.settings.upsert({
      where: { id: 'main' },
      update: {
        ...body,
      },
      create: {
        id: 'main',
      },
    });

    return NextResponse.json({query})
  } catch {
    return NextResponse.json({ message: 'Erro ao salvar.' }, { status: 500 });
  }
}
