import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { units } from "@/data/units";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";

const Unit = () => {
  const { unitId } = useParams();
  const unit = units.find((u) => u.id === unitId);
  const [pdfs, setPdfs] = useState<Record<number, { name: string; data: string }>>({});

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

  const handleRemove = (chapterIndex: number) => {
    localStorage.removeItem(`mth166-pdf-${unitId}-ch${chapterIndex}`);
    setPdfs((prev) => {
      const next = { ...prev };
      delete next[chapterIndex];
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
                  </div>
                  {pdf ? (
                    <div className="flex flex-wrap items-center gap-2 pl-10">
                      <FileText className="w-4 h-4 text-accent" />
                      <span className="text-sm text-muted-foreground truncate flex-1 min-w-0">{pdf.name}</span>
                      <a href={pdf.data} target="_blank" rel="noreferrer">
                        <Button variant="accent" size="sm">Open</Button>
                      </a>
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