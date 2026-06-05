import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function verifyAuth(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("token")?.value;

  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
