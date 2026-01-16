import { prisma } from "@/lib/prisma";
import { NextRequestDeleteDTO } from "@/types/dtos";
import { Skills } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body: Skills;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    const query = await prisma.skills.create({
      data: body,
    });

    return NextResponse.json({ query });
  } catch {
    return NextResponse.json({ message: "Erro ao criar." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    let body: NextRequestDeleteDTO;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    const query = await prisma.project.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({ query });
  } catch {
    return NextResponse.json({ message: "Erro ao deletar." }, { status: 500 });
  }
}
