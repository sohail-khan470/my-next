import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/notes
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { created: "desc" },
    });
    return NextResponse.json(notes);
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

// POST /api/notes
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Default userId for now - in production this would come from auth
    const userId = 1;
    const note = await prisma.note.create({
      data: {
        title: body.title,
        content: body.content,
        userId,
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (err) {
    console.error("Failed to create note:", err);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
