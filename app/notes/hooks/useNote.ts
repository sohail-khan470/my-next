"use client";

import useSWR from "swr";
import { fetchSingleNote } from "../services/note";

export function useNote(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/notes/${id}` : null,
    () => fetchSingleNote(id),
  );

  return { data, error, isLoading };
}
