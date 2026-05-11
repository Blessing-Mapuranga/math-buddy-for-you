import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { units } from "@/data/units";
import { ArrowLeft, BookOpen, ExternalLink, FileText } from "lucide-react";
import { type MouseEvent } from "react";

const pdfHref = (filename: string) => `/MTH166/${encodeURI(filename)}`;

const Unit = () => {
  const { unitId } = useParams();
  const unit = units.find((u) => u.id === unitId);

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
            Open the lecture PDFs and study note PDFs in a new tab.
          </p>
          <ol className="space-y-3">
            {unit.chapters.map((c, i) => {
              const files = unit.chapterPdfs?.[i] ?? [];
              const studyNotesFile = files[0];
              const studyNotesLink = studyNotesFile ? `/MTH166/${encodeURI(studyNotesFile)}` : undefined;
              return (
                <li key={c} className="p-4 rounded-lg border border-border bg-background/50">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="w-7 h-7 rounded-md bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-foreground font-medium">{c}</span>
                    </div>
                    <a
                      href={studyNotesLink ?? undefined}
                      
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-accent/90 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" /> Study Notes
                    </a>
                  </div>

                  {files.length > 0 ? (
                    <ul className="ml-10 space-y-2">
                      {files.map((f) => (
                        <li key={f}>
                          <a
                            href={pdfHref(f)}
                            
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

    </AppLayout>
  );
};

export default Unit;
