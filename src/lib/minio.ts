import { Client } from "minio";

const serverUrl = new URL(process.env.MINIO_SERVER_URL!);
const accessKey = process.env.MINIO_ROOT_USER!;
const secretKey = process.env.MINIO_ROOT_PASSWORD!;
const bucket = process.env.MINIO_BUCKET || "portfolio";

const minio = new Client({
  endPoint: serverUrl.hostname,
  port: Number(serverUrl.port) || (serverUrl.protocol === "https:" ? 443 : 80),
  useSSL: serverUrl.protocol === "https:",
  accessKey,
  secretKey,
});

function detectMime(base64: string): string {
  const buf = Buffer.from(base64.slice(0, 8), "base64");
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "image/png";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return "image/gif";
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46) return "image/webp";
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) return "application/pdf";
  return "image/png";
}

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
  };
  return map[mime] || "bin";
}

async function ensureBucket(): Promise<void> {
  const exists = await minio.bucketExists(bucket);
  if (!exists) await minio.makeBucket(bucket);
}

export async function uploadBase64(base64: string, prefix: string): Promise<string> {
  const mime = detectMime(base64);
  const ext = extFromMime(mime);
  const buffer = Buffer.from(base64, "base64");
  const filename = `${Date.now()}-${prefix}.${ext}`;

  await ensureBucket();
  await minio.putObject(bucket, filename, buffer, buffer.length, { "Content-Type": mime });

  return filename;
}

export async function getPresignedUrl(filename: string): Promise<string> {
  return minio.presignedGetObject(bucket, filename, 60 * 60);
}

export async function deleteFile(filename: string): Promise<void> {
  await minio.removeObject(bucket, filename);
}
