import { useEffect, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoaderCircle, BookOpen, BarChart3, FileText } from 'lucide-react';
import { QuestionFeed } from '@/components/QuestionFeed';
import { StatsSection } from '@/components/StatsSection';
import { units } from '@/data/units';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

interface MCQData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const pdfHref = (filename: string) => `/MTH166/${encodeURIComponent(filename)}`;

export const MCQPractice = () => {
  const [pdfText, setPdfText] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState(units[0]?.id ?? 'unit-1');
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedPdfFile, setSelectedPdfFile] = useState(
    units[0]?.chapterPdfs?.[0]?.[0] ?? ''
  );
  const [error, setError] = useState('');
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pagesLoaded, setPagesLoaded] = useState<number | null>(null);

  const selectedUnit = units.find((unit) => unit.id === selectedUnitId) ?? units[0];
  const selectedChapterTitle = selectedUnit.chapters[selectedChapterIndex] ?? '';
  const availablePdfFiles = selectedUnit.chapterPdfs?.[selectedChapterIndex] ?? [];

  useEffect(() => {
    const initialUnit = units.find((unit) => unit.id === selectedUnitId) ?? units[0];
    setSelectedChapterIndex(0);
    setSelectedPdfFile(initialUnit.chapterPdfs?.[0]?.[0] ?? '');
    setPdfText('');
    setFileName('');
    setNotesGenerated(false);
    setPagesLoaded(null);
  }, [selectedUnitId]);

  useEffect(() => {
    const chapterFiles = availablePdfFiles;
    setSelectedPdfFile(chapterFiles[0] ?? '');
    setPdfText('');
    setFileName('');
    setPagesLoaded(null);
  }, [selectedChapterIndex, selectedUnitId]);

  const extractPdfTextFromUrl = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load PDF: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item: any) => item.str).join(' ');
      fullText += `\n--- Page ${pageNum} ---\n${text}`;
    }

    setPagesLoaded(pdf.numPages);
    return fullText;
  };

  const loadLibraryPdf = async () => {
    if (!selectedPdfFile) {
      setError('Please choose a PDF from the library.');
      return;
    }

    setLoadingPdf(true);
    setError('');

    try {
      const pdfUrl = pdfHref(selectedPdfFile);
      const extractedText = await extractPdfTextFromUrl(pdfUrl);
      setPdfText(extractedText);
      setFileName(selectedPdfFile);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unable to load PDF.';
      setError(errorMsg);
    } finally {
      setLoadingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">MCQ Practice</h1>
        <p className="text-blue-100">
          Practice with the preloaded course PDFs instead of uploading new files.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="library" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="library" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Practice</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Stats</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Choose a Course PDF</CardTitle>
              <CardDescription>
                Select a preloaded textbook file from the MTH166 library.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Unit</label>
                  <Select value={selectedUnitId} onValueChange={setSelectedUnitId}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.number} — {unit.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Chapter</label>
                  <Select
                    value={String(selectedChapterIndex)}
                    onValueChange={(value) => setSelectedChapterIndex(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedUnit.chapters.map((chapter, index) => (
                        <SelectItem key={chapter} value={String(index)}>
                          {index + 1}. {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">PDF File</label>
                  <Select value={selectedPdfFile} onValueChange={setSelectedPdfFile}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePdfFiles.map((pdf) => (
                        <SelectItem key={pdf} value={pdf}>
                          {pdf}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={loadLibraryPdf}
                  disabled={!selectedPdfFile || loadingPdf}
                  className="flex-1"
                >
                  {loadingPdf && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                  {loadingPdf ? 'Loading PDF...' : 'Load Selected PDF'}
                </Button>
              </div>

              {fileName && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Loaded PDF:</strong> {fileName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Chapter:</strong> {selectedChapterTitle}
                  </p>
                  {pagesLoaded && (
                    <p className="text-sm text-gray-600">
                      <strong>Pages extracted:</strong> {pagesLoaded}
                    </p>
                  )}
                </div>
              )}

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          {pdfText ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Practice from Library PDF</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">
                      <strong>PDF:</strong> {fileName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Chapter:</strong> {selectedChapterTitle}
                    </p>
                  </div>

                      <Alert>
                    <AlertDescription>
                      Assessment generation is disabled in this version.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <QuestionFeed pdfSourceText={pdfText} />
            </>
          ) : (
            <Alert>
              <AlertDescription>
                Select a PDF from the Library tab to begin practice.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="stats">
          <StatsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
