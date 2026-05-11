import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { units } from "@/data/units";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ExternalLink, FileText, X } from "lucide-react";
import { useState } from "react";
import { getChapterNotes } from "@/data/notes";
import ChapterNotesView from "@/components/ChapterNotesView";

const pdfHref = (filename: string) => `/MTH166/${encodeURI(filename)}`;

const Unit = () => {
  const { unitId } = useParams();
  const unit = units.find((u) => u.id === unitId);
  const [notesChapter, setNotesChapter] = useState<number | null>(null);

  if (!unit) {
    return (
      <AppLayout title="Unit not found">
        <div className="p-8">
          <Link to="/" className="text-accent">← Back to Home</Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`${unit.number}: ${unit.title}`}>
      <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to topics
        </Link>

        <div className={`rounded-2xl p-8 mb-8 bg-gradient-to-br ${unit.color} text-white shadow-card-hover`}>
          <div className="text-sm font-semibold opacity-90">{unit.number}</div>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-3">{unit.title}</h2>
          <p className="opacity-90 max-w-2xl">{unit.description}</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border shadow-card">
          <h3 className="font-semibold text-foreground text-lg mb-4">Chapters</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Open the lecture PDFs in a new tab, or read in-app study notes with worked examples.
          </p>
          <ol className="space-y-3">
            {unit.chapters.map((c, i) => {
              const files = unit.chapterPdfs?.[i] ?? [];
              return (
                <li key={c} className="p-4 rounded-lg border border-border bg-background/50">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-7 h-7 rounded-md bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-foreground font-medium flex-1">{c}</span>
                    {getChapterNotes(unit.id, i) && (
                      <Button
                        variant="accent"
                        onClick={() => setNotesChapter(i)}
                        className="min-h-[44px] min-w-[44px]"
                      >
                        <BookOpen className="w-4 h-4" /> Study Notes
                      </Button>
                    )}
                  </div>

                  {files.length > 0 ? (
                    <ul className="ml-10 space-y-2">
                      {files.map((f) => (
                        <li key={f}>
                          <a
                            href={pdfHref(f)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 min-h-[44px] rounded-md border border-border bg-background/40 hover:border-accent active:bg-accent/5 transition-colors group"
                          >
                            <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm text-foreground flex-1 truncate" title={f}>{f}</span>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent flex-shrink-0" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="ml-10 text-sm text-muted-foreground italic">
                      Lecture PDF not available for this chapter yet.
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {notesChapter !== null && (() => {
        const n = getChapterNotes(unit.id, notesChapter);
        if (!n) return null;
        return (
          <div className="fixed inset-0 z-50 flex flex-col bg-background">
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-card border-b border-border">
              <div className="min-w-0">
                <div className="text-xs text-accent font-semibold">{unit.number} · Chapter {notesChapter + 1}</div>
                <div className="text-sm font-semibold text-foreground truncate">{n.title}</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setNotesChapter(null)}><X className="w-4 h-4" /></Button>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="max-w-4xl mx-auto p-6 lg:p-10">
                <ChapterNotesView notes={n} />
              </div>
            </div>
          </div>
        );
      })()}
    </AppLayout>
  );
};

export default Unit;
