// features/notes/services/notes.service.ts
export async function fetchNotes() {
  console.log("*************");
  const res = await fetch("/api/notes");
  console.log(res, "RRRRR");
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function fetchSingleNote(id: string) {
  const numericId = Number(id); // convert string to number
  if (isNaN(numericId)) throw new Error("Invalid note id");

  const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to get single note");

  return res.json();
}

export async function createNote(note: { title: string; content: string }) {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(
  id: string,
  note: { title?: string; content?: string },
) {
  const res = await fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(id: string) {
  const res = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
}
