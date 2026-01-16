import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export interface NextRequestLoginDTO {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    let body: NextRequestLoginDTO;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: "Body inválido" }, { status: 400 });
    }

    const { username, password } = body;

    if (!process.env.LOGIN_USER || !process.env.LOGIN_PASS) {
      return NextResponse.json(
        { message: "Credenciais ADMIN não salvas." },
        { status: 500 }
      );
    }

    if (
      username !== process.env.LOGIN_USER ||
      password !== process.env.LOGIN_PASS
    ) {
      return NextResponse.json(
        { message: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "JWT_SECRET não definido." },
        { status: 500 }
      );
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });

    const res = NextResponse.json({ token });
    res.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 20,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch {
    return NextResponse.json({ message: "Erro ao validar." }, { status: 500 });
  }
}
