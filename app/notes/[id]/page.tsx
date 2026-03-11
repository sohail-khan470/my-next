import { fetchSingleNote } from "../services/note";
import Note from "../ui/Note";

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const note = await fetchSingleNote(id);

  return <Note note={note} />;
};

export default NotePage;
