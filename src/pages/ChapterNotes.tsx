import { Link, useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import ChapterNotesView from "@/components/ChapterNotesView";
import { getChapterNotes } from "@/data/notes";
import { ArrowLeft } from "lucide-react";

const ChapterNotes = () => {
  const { unitId, chapterIndex } = useParams();
  const index = chapterIndex ? Number(chapterIndex) : NaN;
  const notes = unitId && !Number.isNaN(index) ? getChapterNotes(unitId, index) : undefined;

  if (!notes) {
    return (
      <AppLayout title="Chapter notes not found">
        <div className="p-8">
          <Link to="/" className="inline-flex items-center gap-2 text-accent">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <p className="mt-4 text-muted-foreground">The selected internal chapter notes could not be found.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`${notes.title} • ${notes.unitId}`}>
      <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        <div className="mb-6">
          <Link
            to={`/unit/${notes.unitId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4" /> Back to unit
          </Link>
        </div>
        <ChapterNotesView notes={notes} backPath={`/unit/${notes.unitId}`} />
      </div>
    </AppLayout>
  );
};

export default ChapterNotes;
