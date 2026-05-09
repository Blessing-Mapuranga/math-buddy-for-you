import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { units } from "@/data/units";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Download, FileText, Files, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { getChapterNotes } from "@/data/notes";
import ChapterNotesView from "@/components/ChapterNotesView";

type PdfEntry = { name: string; data: string };

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const dataUrlToBytes = (dataUrl: string) => {
  const [, base64 = ""] = dataUrl.split(",");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

const dataUrlToBlob = (dataUrl: string) => {
  const [meta] = dataUrl.split(",");
  const mime = /data:(.*?);base64/.exec(meta)?.[1] || "application/pdf";
  return new Blob([dataUrlToBytes(dataUrl)], { type: mime });
};

const PdfCanvasViewer = ({ pdf }: { pdf: PdfEntry }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);
  const [doc, setDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setDoc(null);
    setPageNumber(1);
    setError("");

    const task = pdfjsLib.getDocument({ data: dataUrlToBytes(pdf.data) });
    task.promise
      .then((loadedDoc) => {
        if (!cancelled) setDoc(loadedDoc);
      })
      .catch((err) => {
        console.error("Failed to load PDF", err);
        if (!cancelled) setError("This PDF could not be displayed. Please try replacing it.");
      });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      task.destroy();
    };
  }, [pdf.data]);

  useEffect(() => {
    if (!doc || !canvasRef.current) return;
    let cancelled = false;

    renderTaskRef.current?.cancel();
    doc.getPage(pageNumber).then((page) => {
      if (cancelled || !canvasRef.current) return;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const renderTask = page.render({ canvasContext: context, viewport });
      renderTaskRef.current = renderTask;
      renderTask.promise.catch((err) => {
        if (err?.name !== "RenderingCancelledException") console.error("Failed to render PDF page", err);
      });
    });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [doc, pageNumber, scale]);

  if (error) {
    return <div className="flex-1 grid place-items-center p-6 text-center text-destructive">{error}</div>;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-muted/40">
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border bg-card px-3 py-2">
        <Button variant="outline" size="sm" onClick={() => setPageNumber((p) => Math.max(1, p - 1))} disabled={!doc || pageNumber <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="min-w-28 text-center text-sm text-foreground">
          {doc ? `Page ${pageNumber} of ${doc.numPages}` : "Loading PDF"}
        </span>
        <Button variant="outline" size="sm" onClick={() => setPageNumber((p) => Math.min(doc?.numPages || p, p + 1))} disabled={!doc || pageNumber >= doc.numPages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.max(0.75, Number((s - 0.15).toFixed(2))))} disabled={!doc}>
          −
        </Button>
        <span className="w-14 text-center text-sm text-muted-foreground">{Math.round(scale * 100)}%</span>
        <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.min(2, Number((s + 0.15).toFixed(2))))} disabled={!doc}>
          +
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <div className="mx-auto w-fit min-w-64">
          {!doc && (
            <div className="flex h-64 items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading PDF
            </div>
          )}
          <canvas ref={canvasRef} className="max-w-none rounded-md bg-background shadow-card" />
        </div>
      </div>
    </div>
  );
};

const Unit = () => {
  const { unitId } = useParams();
  const unit = units.find((u) => u.id === unitId);
  const [pdfs, setPdfs] = useState<Record<number, PdfEntry>>({});
  const [viewer, setViewer] = useState<PdfEntry | null>(null);
  const [notesChapter, setNotesChapter] = useState<number | null>(null);
  // extra PDFs per chapter. key = `${chapterIndex}-${slot}` where slot is 0..4
  const [extraPdfs, setExtraPdfs] = useState<Record<string, PdfEntry>>({});

  useEffect(() => {
    if (!unit) return;
    const loaded: Record<number, { name: string; data: string }> = {};
    unit.chapters.forEach((_, i) => {
      const stored = localStorage.getItem(`mth166-pdf-${unitId}-ch${i}`);
      if (stored) {
        try {
          loaded[i] = JSON.parse(stored);
        } catch {}
      }
    });
    setPdfs(loaded);
  }, [unitId, unit]);

  useEffect(() => {
    if (!unit) return;
    const loaded: Record<string, PdfEntry> = {};
    unit.chapters.forEach((_, i) => {
      for (let s = 0; s < 5; s++) {
        const key = `${i}-${s}`;
        const stored =
          localStorage.getItem(`mth166-extrapdf-${unitId}-ch${i}-s${s}`) ||
          localStorage.getItem(`mth166-ppt-${unitId}-ch${i}-s${s}`);
        if (stored) {
          try {
            loaded[key] = JSON.parse(stored);
          } catch {}
        }
      }
    });
    setExtraPdfs(loaded);
  }, [unitId, unit]);

  const handleUpload = (chapterIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      try {
        const entry = { name: file.name, data };
        localStorage.setItem(`mth166-pdf-${unitId}-ch${chapterIndex}`, JSON.stringify(entry));
        setPdfs((prev) => ({ ...prev, [chapterIndex]: entry }));
      } catch {
        alert("File too large to store in browser. Please use a smaller PDF.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOpen = (chapterIndex: number) => {
    const pdf = pdfs[chapterIndex];
    if (pdf) setViewer(pdf);
  };

  const closeViewer = () => {
    setViewer(null);
  };

  const handleDownload = (pdf: PdfEntry) => {
    const url = URL.createObjectURL(dataUrlToBlob(pdf.data));
    const link = document.createElement("a");
    link.href = url;
    link.download = pdf.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRemove = (chapterIndex: number) => {
    localStorage.removeItem(`mth166-pdf-${unitId}-ch${chapterIndex}`);
    setPdfs((prev) => {
      const next = { ...prev };
      delete next[chapterIndex];
      return next;
    });
  };

  const handleExtraUpload = (chapterIndex: number, slot: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      try {
        const entry = { name: file.name, data };
        localStorage.setItem(`mth166-extrapdf-${unitId}-ch${chapterIndex}-s${slot}`, JSON.stringify(entry));
        setExtraPdfs((prev) => ({ ...prev, [`${chapterIndex}-${slot}`]: entry }));
      } catch {
        alert("File too large to store in browser. Please use a smaller file.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExtraRemove = (chapterIndex: number, slot: number) => {
    localStorage.removeItem(`mth166-extrapdf-${unitId}-ch${chapterIndex}-s${slot}`);
    localStorage.removeItem(`mth166-ppt-${unitId}-ch${chapterIndex}-s${slot}`);
    setExtraPdfs((prev) => {
      const next = { ...prev };
      delete next[`${chapterIndex}-${slot}`];
      return next;
    });
  };

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
          <p className="text-sm text-muted-foreground mb-4">Upload a PDF for each chapter. Files are saved in your browser.</p>
          <ol className="space-y-3">
            {unit.chapters.map((c, i) => {
              const pdf = pdfs[i];
              return (
                <li key={c} className="p-4 rounded-lg border border-border bg-background/50">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="w-7 h-7 rounded-md bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-foreground font-medium flex-1">{c}</span>
                    {getChapterNotes(unit.id, i) && (
                      <Button variant="accent" size="sm" onClick={() => setNotesChapter(i)}>
                        <BookOpen className="w-4 h-4" /> Study Notes
                      </Button>
                    )}
                  </div>
                  {pdf ? (
                    <div className="flex flex-wrap items-center gap-2 pl-10">
                      <FileText className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground truncate flex-1 min-w-0">{pdf.name}</span>
                      <Button variant="accent" size="sm" onClick={() => handleOpen(i)}>Open</Button>
                      <label>
                        <input type="file" accept="application/pdf" onChange={(e) => handleUpload(i, e)} className="hidden" />
                        <span className="inline-block px-3 py-1.5 text-sm rounded-md border border-border hover:border-accent cursor-pointer">
                          Replace
                        </span>
                      </label>
                      <Button variant="outline" size="sm" onClick={() => handleRemove(i)}>Remove</Button>
                    </div>
                  ) : (
                    <label className="ml-10 flex items-center gap-2 border-2 border-dashed border-border rounded-lg px-4 py-3 cursor-pointer hover:border-accent transition-colors">
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">Upload PDF for this chapter</span>
                      <input type="file" accept="application/pdf" onChange={(e) => handleUpload(i, e)} className="hidden" />
                    </label>
                  )}

                  <div className="ml-10 mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Files className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold text-foreground">Additional PDFs (up to 5)</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {Array.from({ length: 5 }).map((_, s) => {
                        const extra = extraPdfs[`${i}-${s}`];
                        return (
                          <div key={s} className="flex items-center gap-2 p-2 rounded-md border border-border bg-background/40">
                            <span className="w-6 h-6 rounded bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center flex-shrink-0">
                              {s + 1}
                            </span>
                            {extra ? (
                              <>
                                <span className="text-xs text-foreground truncate flex-1 min-w-0" title={extra.name}>{extra.name}</span>
                                <Button variant="accent" size="sm" onClick={() => setViewer(extra)} className="h-7 px-2 text-xs">
                                  Open
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleDownload(extra)} className="h-7 px-2">
                                  <Download className="w-3 h-3" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleExtraRemove(i, s)} className="h-7 px-2">
                                  <X className="w-3 h-3" />
                                </Button>
                              </>
                            ) : (
                              <label className="flex-1 cursor-pointer text-xs text-muted-foreground hover:text-accent flex items-center gap-1">
                                <Upload className="w-3 h-3" /> Upload PDF {s + 1}
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) => handleExtraUpload(i, s, e)}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      {viewer && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background">
          <div className="flex items-center justify-between gap-3 px-4 py-2 bg-card border-b border-border">
            <span className="text-sm font-medium text-foreground truncate">{viewer.name}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleDownload(viewer)}>
                <Download className="w-4 h-4" /> Download
              </Button>
              <Button variant="outline" size="sm" onClick={closeViewer}><X className="w-4 h-4" /></Button>
            </div>
          </div>
          <PdfCanvasViewer pdf={viewer} />
        </div>
      )}
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