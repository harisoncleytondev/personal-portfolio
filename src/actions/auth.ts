import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function verifyAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}
