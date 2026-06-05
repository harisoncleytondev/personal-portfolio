import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createProjectSchema, deleteProjectSchema } from "@/lib/validations/project";
import { verifyAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    if (!(await verifyAuth(req))) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: parsed.data,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!(await verifyAuth(req))) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    const parsed = deleteProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "ID inválido", errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    await prisma.project.delete({
      where: { id: parsed.data.id },
    });

    return NextResponse.json({ message: "Projeto deletado com sucesso." });
  } catch {
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
  }
}
