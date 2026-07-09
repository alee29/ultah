import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const LOCAL_PHOTOS_DIR = path.join(process.cwd(), "public", "photos");
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export class UploadValidationError extends Error {}

function assertValidImage(file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new UploadValidationError(
      "Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF."
    );
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new UploadValidationError("Ukuran file maksimal 5MB.");
  }
}

function usesBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function saveUploadedPhoto(file: File): Promise<string> {
  assertValidImage(file);

  const extension = path.extname(file.name).toLowerCase() || ".jpg";
  const filename = `${randomUUID()}${extension}`;

  if (usesBlobStorage()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`photos/${filename}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  await mkdir(LOCAL_PHOTOS_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(LOCAL_PHOTOS_DIR, filename), buffer);
  return `/photos/${filename}`;
}

export async function deleteUploadedPhoto(url: string): Promise<void> {
  if (usesBlobStorage() && url.includes("blob.vercel-storage.com")) {
    const { del } = await import("@vercel/blob");
    await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN }).catch(
      () => {}
    );
    return;
  }

  if (url.startsWith("/photos/")) {
    const filename = path.basename(url);
    await unlink(path.join(LOCAL_PHOTOS_DIR, filename)).catch(() => {});
  }
}
