import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getPresignedUrl } from "@/lib/minio";

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: "main" },
    });

    if (!settings?.cv) {
      return new NextResponse("Currículo não encontrado", { status: 404 });
    }

    if (settings.cv.length < 200) {
      const url = await getPresignedUrl(settings.cv);
      return NextResponse.redirect(url);
    }

    const pdfBuffer = Buffer.from(settings.cv, "base64");

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Harison_Cleyton_CV.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Erro interno", { status: 500 });
  }
}
