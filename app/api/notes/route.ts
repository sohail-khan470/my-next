import { NextResponse } from "next/server";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/app/notes/services/note";

// GET /api/notes
export async function GET() {
  try {
    const notes = await fetchNotes();
    return NextResponse.json(notes);
  } catch (err) {
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
    const note = await createNote(body); // expects { title, content }
    return NextResponse.json(note, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}

// PUT /api/notes/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const updated = await updateNote(params.id, body);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 },
    );
  }
}

// DELETE /api/notes/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await deleteNote(params.id);
    return NextResponse.json({ message: "Note deleted" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
