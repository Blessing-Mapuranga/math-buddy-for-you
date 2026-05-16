import { useEffect, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoaderCircle, BookOpen, BarChart3, FileText } from 'lucide-react';
import { QuestionFeed } from '@/components/QuestionFeed';
import { StatsSection } from '@/components/StatsSection';
import { MathTutorService } from '@/lib/MathTutorService';
import { units } from '@/data/units';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface MCQData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface AssessmentState {
  active: boolean;
  currentQuestion: number;
  totalQuestions: number;
  questions: MCQData[];
  score: number;
  timeStarted: number;
  answers: Map<number, string>;
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
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [notesGenerated, setNotesGenerated] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [assessment, setAssessment] = useState<AssessmentState | null>(null);
  const [showResults, setShowResults] = useState(false);
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
    setNotesGenerated(false);
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
    setNotesGenerated(false);

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

  const generateStudyNotes = async () => {
    if (!pdfText || !selectedChapterTitle) {
      setError('Please load a library PDF and select a chapter first.');
      return;
    }

    setGeneratingNotes(true);
    setError('');

    try {
      const extractedNotes = await MathTutorService.extractPdfNotes(
        pdfText,
        selectedChapterTitle,
        'Iyengar Engineering Mathematics'
      );
      setNotes(extractedNotes);
      setNotesGenerated(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to generate notes';
      setError(errorMsg);
    } finally {
      setGeneratingNotes(false);
    }
  };

  const startAssessment = async () => {
    if (!pdfText || !selectedChapterTitle) {
      setError('Please load a library PDF and select a chapter first.');
      return;
    }

    try {
      const questions: MCQData[] = [];

      for (let i = 0; i < 20; i++) {
        const difficulty = ['Easy', 'Medium', 'Hard'][i % 3];
        const mcqData = await MathTutorService.generateMCQFromText(
          pdfText,
          selectedChapterTitle,
          difficulty,
          'Iyengar Engineering Mathematics'
        );

        questions.push({
          id: `assess_${i}`,
          question: mcqData.question,
          options: mcqData.options,
          correctAnswer: mcqData.correctAnswer,
          explanation: mcqData.explanation,
        });
      }

      setAssessment({
        active: true,
        currentQuestion: 0,
        totalQuestions: 20,
        questions,
        score: 0,
        timeStarted: Date.now(),
        answers: new Map(),
      });
      setShowResults(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to start assessment';
      setError(errorMsg);
    }
  };

  const handleAssessmentAnswer = (answer: string) => {
    if (!assessment) return;

    const currentQ = assessment.questions[assessment.currentQuestion];
    const isCorrect = currentQ.options[parseInt(answer)] === currentQ.correctAnswer;
    const newAnswers = new Map(assessment.answers);
    newAnswers.set(assessment.currentQuestion, answer);
    const newScore = isCorrect ? assessment.score + 1 : assessment.score;

    if (assessment.currentQuestion < assessment.totalQuestions - 1) {
      setAssessment({
        ...assessment,
        currentQuestion: assessment.currentQuestion + 1,
        score: newScore,
        answers: newAnswers,
      });
    } else {
      setAssessment({
        ...assessment,
        score: newScore,
        answers: newAnswers,
        active: false,
      });
      setShowResults(true);
    }
  };

  if (assessment && showResults) {
    const timeSpent = Math.round((Date.now() - assessment.timeStarted) / 1000);
    const percentage = Math.round((assessment.score / 20) * 100);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-2xl font-bold text-blue-900">{assessment.score}/20</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <p className="text-sm text-gray-600">Percentage</p>
                <p className="text-2xl font-bold text-purple-900">{percentage}%</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-2xl font-bold text-green-900">
                  {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                setAssessment(null);
                setShowResults(false);
              }}
              className="w-full"
            >
              Try Another Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessment && assessment.active) {
    const currentQuestion = assessment.questions[assessment.currentQuestion];

    return (
      <div className="space-y-4">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">
                Question {assessment.currentQuestion + 1}/{assessment.totalQuestions}
              </span>
              <span className="text-sm font-medium text-green-600">
                Score: {assessment.score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((assessment.currentQuestion + 1) / 20) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <QuestionFeed
          unit={selectedUnit.number}
          chapter={selectedChapterTitle}
          assessmentMode={true}
          assessmentQuestion={currentQuestion}
          onAssessmentAnswer={handleAssessmentAnswer}
        />
      </div>
    );
  }

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

              {pdfText && (
                <Button
                  onClick={generateStudyNotes}
                  disabled={generatingNotes || !selectedChapterTitle}
                  className="w-full"
                >
                  {generatingNotes && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {generatingNotes ? 'Generating Notes...' : 'Generate Study Notes'}
                </Button>
              )}

              {notesGenerated && notes && (
                <Card className="bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-base text-green-900">
                      Study Notes Generated
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-sm whitespace-pre-wrap text-gray-800">
                      {notes}
                    </div>
                  </CardContent>
                </Card>
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

                  <Button
                    onClick={startAssessment}
                    disabled={!selectedChapterTitle || loadingPdf}
                    className="w-full"
                  >
                    Start 20-Question Assessment
                  </Button>
                </CardContent>
              </Card>

              <QuestionFeed
                unit={selectedUnit.number}
                chapter={selectedChapterTitle}
                pdfSourceText={pdfText}
              />
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
