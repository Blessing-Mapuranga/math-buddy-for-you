import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { units } from "@/data/units";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";

const Unit = () => {
  const { unitId } = useParams();
  const unit = units.find((u) => u.id === unitId);
  const storageKey = `mth166-pdf-${unitId}`;
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      setPdfName(parsed.name);
      setPdfData(parsed.data);
    } else {
      setPdfName(null);
      setPdfData(null);
    }
  }, [storageKey]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      try {
        localStorage.setItem(storageKey, JSON.stringify({ name: file.name, data }));
        setPdfName(file.name);
        setPdfData(data);
      } catch {
        alert("File too large to store in browser. Please use a smaller PDF.");
      }
    };
    reader.readAsDataURL(file);
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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6 border border-border shadow-card">
            <h3 className="font-semibold text-foreground text-lg mb-4">Chapters</h3>
            <ol className="space-y-2">
              {unit.chapters.map((c, i) => (
                <li key={c} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                  <span className="w-7 h-7 rounded-md bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{c}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-card">
            <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> Lecture PDF
            </h3>
            {pdfData ? (
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground truncate">{pdfName}</div>
                <a href={pdfData} target="_blank" rel="noreferrer">
                  <Button variant="accent" className="w-full">Open PDF</Button>
                </a>
                <label className="block">
                  <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
                  <span className="block text-center text-sm text-muted-foreground hover:text-accent cursor-pointer">
                    Replace PDF
                  </span>
                </label>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <div className="text-sm font-medium text-foreground">Upload PDF</div>
                <div className="text-xs text-muted-foreground mt-1">Saved in your browser</div>
                <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" />
              </label>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Unit;