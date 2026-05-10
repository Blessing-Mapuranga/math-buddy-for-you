import { useCallback, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Unit from "./pages/Unit";
import SearchPage from "./pages/Search";
import Settings from "./pages/Settings";
import Read from "./pages/Read";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPdf = useCallback((fileName: string) => {
    const normalizedUrl =
      fileName.startsWith("http://") || fileName.startsWith("https://") || fileName.startsWith("/")
        ? fileName
        : `/pdfs/${fileName}`;
    setPdfUrl(normalizedUrl);
    setIsOpen(true);
  }, []);

  const closePdf = useCallback(() => {
    setIsOpen(false);
    setPdfUrl(null);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/read" element={<Read />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/unit/:unitId" element={<Unit />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {isOpen && (
          <div className="fixed inset-0 lg:left-64 lg:right-0 bg-background/95 z-50 flex flex-col">
            <div className="flex items-center justify-between gap-4 p-4 border-b border-border bg-card shadow-sm">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm hover:bg-accent/90"
                onClick={closePdf}
              >
                ← Back to Dashboard
              </button>
              <span className="text-sm text-muted-foreground">Viewing lecture notes</span>
            </div>
            <iframe
              title="Lecture Notes PDF Viewer"
              src={pdfUrl ?? undefined}
              className="flex-1 w-full border-0 bg-white"
            />
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
