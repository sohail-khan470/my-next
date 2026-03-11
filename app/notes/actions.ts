"use server";

import { prisma } from "@/lib/prisma";

export async function createNote(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const created = formData.get("created") as string;
  const userId = formData.get("userId") as number | any;
  const is_completed = formData.get("is_completed") as boolean | any;

  await prisma.note.create({
    data: { title, content, created, userId, is_completed },
  });
}
