"use client";

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import NoteForm from "./NoteForm";
import { useState } from "react";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
    created: Date;
  };
}

const Note = ({ note }: NoteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const formattedDate = new Date(note.created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="relative">
      {/* The clickable card for navigation */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
        onClick={() => router.push(`/notes/${note.id}`)}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {note.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {note.content}
        </p>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formattedDate}
        </div>
      </div>

      {/* Edit button to open modal */}
      <button
        className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 text-xs hover:bg-gray-300 dark:hover:bg-gray-600"
        onClick={(e) => {
          e.stopPropagation(); // prevent card navigation
          setIsOpen(true);
        }}
      >
        Edit
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NoteForm />
      </Modal>
    </div>
  );
};

export default Note;
