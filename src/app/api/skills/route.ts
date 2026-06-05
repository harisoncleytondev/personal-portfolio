import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { uploadBase64, deleteFile } from "@/lib/minio";

export async function POST(req: NextRequest) {
  try {
    if (!(await verifyAuth(req))) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    let body: { name: string; description: string; image: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    if (!body.name || !body.description || !body.image) {
      return NextResponse.json({ message: "name, description e image são obrigatórios" }, { status: 400 });
    }

    const filename = await uploadBase64(body.image, "skill");

    const query = await prisma.skills.create({
      data: { name: body.name, description: body.description, image: filename },
    });

    return NextResponse.json({ query }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Erro ao criar." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!(await verifyAuth(req))) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    let body: { id: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    if (!body.id) {
      return NextResponse.json({ message: "ID é obrigatório" }, { status: 400 });
    }

    const skill = await prisma.skills.findUnique({ where: { id: body.id } });

    if (!skill) {
      return NextResponse.json({ message: "Habilidade não encontrada." }, { status: 404 });
    }

    if (skill.image && skill.image.length < 200) {
      await deleteFile(skill.image).catch(() => {});
    }

    await prisma.skills.delete({ where: { id: body.id } });

    return NextResponse.json({ message: "Habilidade deletada com sucesso." });
  } catch {
    return NextResponse.json({ message: "Erro ao deletar." }, { status: 500 });
  }
}
