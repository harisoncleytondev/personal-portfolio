import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    console.log(body);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: `Contato do Portfólio: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
    });

    return NextResponse.json(
      { message: "Email enviado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Falha ao enviar o email" },
      { status: 500 }
    );
  }
}
