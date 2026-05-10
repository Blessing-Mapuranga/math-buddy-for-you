import type { ComponentType } from "react";
import { FileText, Video, BookOpen, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Resource = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: string;
  type: "download" | "link";
  file?: string;
};

const resources: Resource[] = [
  {
    icon: FileText,
    title: "Lecture Notes",
    description: "Comprehensive PDF notes covering all topics with solved examples",
    action: "Open Lecture Notes",
    type: "download",
    file: "lecture-notes.pdf",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video explanations for complex concepts",
    action: "Watch Now",
    type: "link",
  },
  {
    icon: BookOpen,
    title: "Practice Problems",
    description: "Extensive problem sets with solutions for self-assessment",
    action: "Start Practice",
    type: "link",
  },
];

const formulas = [
  { name: "Derivative", formula: "d/dx[f(x)] = lim(h→0) [f(x+h) - f(x)]/h" },
  { name: "Integral", formula: "∫f(x)dx = F(x) + C" },
  { name: "Taylor Series", formula: "f(x) = Σ f⁽ⁿ⁾(a)(x-a)ⁿ/n!" },
  { name: "Laplace", formula: "L{f(t)} = ∫₀^∞ e⁻ˢᵗf(t)dt" },
];

type ResourcesSectionProps = {
  onOpenPdf?: (fileName: string) => void;
};

const ResourcesSection = ({ onOpenPdf }: ResourcesSectionProps) => {
  return (
    <section id="resources" className="py-24 bg-muted/50 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Study Materials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Learning Resources
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to succeed in your engineering mathematics course
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Resource Cards */}
          <div className="space-y-6">
            {resources.map((resource, index) => (
              <div
                key={resource.title}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {resource.description}
                    </p>
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => {
                        if (resource.type === "download" && resource.file) {
                          onOpenPdf?.(resource.file);
                        }
                      }}
                    >
                      {resource.type === "download" ? (
                        <Download className="w-4 h-4 mr-2" />
                      ) : (
                        <ExternalLink className="w-4 h-4 mr-2" />
                      )}
                      {resource.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formula Reference Card */}
          <div className="bg-card rounded-xl p-8 shadow-card border border-border/50 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-semibold text-foreground text-xl mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">∑</span>
              </span>
              Quick Reference
            </h3>

            <div className="space-y-4">
              {formulas.map((item) => (
                <div
                  key={item.name}
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                >
                  <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                    {item.name}
                  </div>
                  <div className="font-mono text-foreground group-hover:text-accent transition-colors">
                    {item.formula}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button variant="outline" className="w-full">
                View Complete Formula Sheet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
