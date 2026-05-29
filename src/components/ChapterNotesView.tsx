import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import type { ChapterNotes } from "@/data/notes/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";

/**
 * Renders a string that may contain inline ($...$) and block ($$...$$) LaTeX.
 * Supports simple **bold** markdown.
 */
const renderRich = (text: string, key: string) => {
  // Split by block math first: $$...$$
  const blockParts = text.split(/(\$\$[^$]+\$\$)/g);
  return (
    <span key={key}>
      {blockParts.map((bp, bi) => {
        if (bp.startsWith("$$") && bp.endsWith("$$")) {
          return <BlockMath key={`${key}-b${bi}`} math={bp.slice(2, -2)} />;
        }
        // Inline math: $...$
        const inlineParts = bp.split(/(\$[^$]+\$)/g);
        return (
          <span key={`${key}-i${bi}`}>
            {inlineParts.map((ip, ii) => {
              if (ip.startsWith("$") && ip.endsWith("$") && ip.length > 1) {
                return <InlineMath key={`${key}-i${bi}-${ii}`} math={ip.slice(1, -1)} />;
              }
              // Bold via **...**
              const boldParts = ip.split(/(\*\*[^*]+\*\*)/g);
              return (
                <span key={`${key}-i${bi}-${ii}-t`}>
                  {boldParts.map((bp2, bi2) =>
                    bp2.startsWith("**") && bp2.endsWith("**") ? (
                      <strong key={bi2}>{bp2.slice(2, -2)}</strong>
                    ) : (
                      <span key={bi2}>{bp2}</span>
                    ),
                  )}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

const PracticeItem = ({ q, a, idx }: { q: string; a: string; idx: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="p-4 rounded-lg border border-border bg-background/50">
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-md bg-accent/10 text-accent text-sm font-semibold flex items-center justify-center flex-shrink-0">
          {idx + 1}
        </span>
        <div className="flex-1">
          <div className="text-foreground">{renderRich(q, `q-${idx}`)}</div>
          <Button variant="ghost" size="sm" className="mt-2 -ml-2 text-accent" onClick={() => setOpen((v) => !v)}>
            {open ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
            {open ? "Hide answer" : "Show answer"}
          </Button>
          {open && (
            <div className="mt-2 p-3 rounded-md bg-muted text-foreground">
              {renderRich(a, `a-${idx}`)}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const ChapterNotesView = ({ notes, backPath }: { notes: ChapterNotes; backPath?: string }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {backPath && (
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate(backPath)} className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to unit
          </Button>
        </div>
      )}
      <section className="bg-card rounded-xl p-6 border border-border shadow-card">
        <h3 className="font-semibold text-foreground text-lg mb-3">Overview</h3>
        <p className="text-muted-foreground leading-relaxed">{notes.intro}</p>
      </section>

      <section className="bg-card rounded-xl p-6 border border-border shadow-card">
        <h3 className="font-semibold text-foreground text-lg mb-4">Notes</h3>
        <div className="space-y-6">
          {notes.sections.map((s, i) => (
            <div key={i}>
              <h4 className="font-semibold text-foreground mb-2">{s.heading}</h4>
              <div className="space-y-3 text-foreground/90 leading-relaxed">
                {s.body.map((p, j) => (
                  <div key={j}>{renderRich(p, `s${i}-p${j}`)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card rounded-xl p-6 border border-border shadow-card">
        <h3 className="font-semibold text-foreground text-lg mb-4">Worked Examples</h3>
        <ol className="space-y-5">
          {notes.examples.map((ex, i) => (
            <li key={i} className="p-4 rounded-lg border border-border bg-background/50">
              <div className="text-sm font-semibold text-accent mb-2">Example {i + 1}</div>
              <div className="text-foreground mb-3">{renderRich(ex.problem, `ex${i}-p`)}</div>
              <div className="text-sm font-semibold text-foreground/80 mb-2">Solution</div>
              <ol className="list-decimal list-inside space-y-2 text-foreground/90">
                {ex.steps.map((st, j) => (
                  <li key={j}>{renderRich(st, `ex${i}-s${j}`)}</li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-card rounded-xl p-6 border border-border shadow-card">
        <h3 className="font-semibold text-foreground text-lg mb-4">Practice Problems</h3>
        <ul className="space-y-3">
          {notes.practice.map((p, i) => (
            <PracticeItem key={i} q={p.question} a={p.answer} idx={i} />
          ))}
        </ul>
      </section>

      <section className="bg-card rounded-xl p-6 border border-border shadow-card">
        <h3 className="font-semibold text-foreground text-lg mb-4">Study Resources</h3>
        <p className="text-muted-foreground mb-4">
          This view shows curated chapter notes and worked examples. AI-powered tutoring has been removed from this build.
        </p>
        <p className="text-foreground/90">
          Use these notes and examples to review concepts and practice problems directly.
        </p>
      </section>
    </div>
  );
};

export default ChapterNotesView;
