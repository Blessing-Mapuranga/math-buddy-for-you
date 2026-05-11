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
import StaticPdfRedirect from "./pages/StaticPdfRedirect.tsx";

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
            <Route path="/unit/:unitId" element={<Unit />} />
            <Route path="/MTH166/Unit:unitNumber/Chapter:chapterNumber.pdf" element={<StaticPdfRedirect />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
