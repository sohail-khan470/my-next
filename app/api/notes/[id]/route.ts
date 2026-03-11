import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error("Invalid note id");

    const note = await prisma.note.findUnique({
      where: { id: numericId },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (err) {
    console.error("Failed to fetch note:", err);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 },
    );
  }
}

// PUT /api/notes/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error("Invalid note id");

    const updated = await prisma.note.update({
      where: { id: numericId },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Failed to update note:", err);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 },
    );
  }
}

// DELETE /api/notes/:id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (isNaN(numericId)) throw new Error("Invalid note id");

    await prisma.note.delete({
      where: { id: numericId },
    });
    return NextResponse.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Failed to delete note:", err);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
