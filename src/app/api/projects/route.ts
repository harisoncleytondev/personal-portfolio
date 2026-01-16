import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { NextRequestDeleteDTO } from "@/types/dtos";

export async function POST(req: NextRequest) {
  try {
    let body: Project;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    const query = await prisma.project.create({
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
