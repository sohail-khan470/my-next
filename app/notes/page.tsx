import { prisma } from "@/lib/prisma";
import React from "react";

const Notes = async () => {
  const notes = await prisma.note.findMany();
  console.log(notes);

  return <div>Notes</div>;
};

export default Notes;
