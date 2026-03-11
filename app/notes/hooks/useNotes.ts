"use client";

import useSWR from "swr";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/note";

export function useNotes() {
  const { data, error, isLoading, mutate } = useSWR("/api/notes", fetchNotes);

  // Fetch all notes manually
  const fetchAllNotes = async () => {
    try {
      const notes = await fetchNotes();
      // Update the SWR cache with the latest notes
      mutate(notes, { revalidate: false });
      return notes;
    } catch (err) {
      console.error("Failed to fetch all notes", err);
      return [];
    }
  };

  // Create
  const addNote = async (note: { title: string; content: string }) => {
    const newNote = await createNote(note);
    mutate([...data, newNote], { revalidate: false }); // optimistic update
  };

  // Update
  const editNote = async (
    id: string,
    note: { title?: string; content?: string },
  ) => {
    const updated = await updateNote(id, note);
    mutate(
      data.map((n: any) => (n.id === id ? updated : n)),
      { revalidate: false },
    );
  };

  // Delete
  const removeNote = async (id: string) => {
    await deleteNote(id);
    mutate(
      data.filter((n: any) => n.id !== id),
      { revalidate: false },
    );
  };

  return {
    data,
    error,
    isLoading,
    addNote,
    editNote,
    removeNote,
    fetchAllNotes,
  };
}
