import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Unit from "./pages/Unit";
import ChapterNotes from "./pages/ChapterNotes";
import SearchPage from "./pages/Search";
import Settings from "./pages/Settings";
import Read from "./pages/Read";
import About from "./pages/About";
import { MCQPractice } from "./pages/MCQPractice";
import Ask from "./pages/Ask";

const queryClient = new QueryClient();

const App = () => {
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
            <Route path="/mcq" element={<MCQPractice />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/unit/:unitId" element={<Unit />} />
            <Route path="/unit/:unitId/chapter/:chapterIndex" element={<ChapterNotes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
