"use client";

import Note from "./Note";
import { useNotes } from "../hooks/useNotes";
import Link from "next/link";
import { navigate } from "next/dist/client/components/segment-cache/navigation";

interface Note {
  id: number;
  title: string;
  content: string;
  created: Date;
}

const NotesList = () => {
  const { data, error, isLoading } = useNotes();

  console.log(
    "NotesList data:",
    data,
    "error:",
    error,
    "isLoading:",
    isLoading,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-red-100 dark:bg-red-900 rounded-full p-6 mb-4">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          Error loading notes
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Failed to load notes. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No notes yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Create your first note to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((note: Note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
