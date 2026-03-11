import { prisma } from "@/lib/prisma";
import React from "react";

const Notes = async () => {
  // In a real app, you'd get the userId from the session/auth
  // For now, we'll get all notes or filter by a userId
  const notes = await prisma.note.findMany({});
  console.log(notes);

  return <div>Notes</div>;
};

export default Notes;
