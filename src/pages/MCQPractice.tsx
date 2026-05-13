import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoaderCircle, BookOpen, BarChart3, Upload } from 'lucide-react';
import { PDFUpload } from '@/components/PDFUpload';
import { QuestionFeed } from '@/components/QuestionFeed';
import { StatsSection } from '@/components/StatsSection';
import { MathTutorService } from '@/lib/MathTutorService';

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

export const MCQPractice = () => {
  const [pdfText, setPdfText] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('Unit 1');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [notesGenerated, setNotesGenerated] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [assessment, setAssessment] = useState<AssessmentState | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const handlePdfExtracted = (data: {
    pdfText: string;
    fileName: string;
    unit: string;
    chapter: string;
  }) => {
    setPdfText(data.pdfText);
    setFileName(data.fileName);
    setSelectedUnit(data.unit);
    setSelectedChapter(data.chapter);
    setError('');
    setNotesGenerated(false);
  };

  const generateStudyNotes = async () => {
    if (!pdfText || !selectedChapter) {
      setError('Please upload a PDF and select a chapter first');
      return;
    }

    setGeneratingNotes(true);
    setError('');

    try {
      const extractedNotes = await MathTutorService.extractPdfNotes(
        pdfText,
        selectedChapter,
        'Iyengar Engineering Mathematics'
      );
      setNotes(extractedNotes.notes);
      setNotesGenerated(true);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to generate notes';
      setError(errorMsg);
    } finally {
      setGeneratingNotes(false);
    }
  };

  const startAssessment = async () => {
    if (!pdfText || !selectedChapter) {
      setError('Please upload a PDF and select a chapter first');
      return;
    }

    try {
      const questions: MCQData[] = [];

      // Generate 20 questions for assessment
      for (let i = 0; i < 20; i++) {
        const difficulty = ['Easy', 'Medium', 'Hard'][i % 3];
        const mcqData = await MathTutorService.generateMCQFromText(
          pdfText,
          selectedChapter,
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
    const isCorrect = assessment.questions[assessment.currentQuestion].options[
      parseInt(answer)
    ] === currentQ.correctAnswer;

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
      // Assessment complete
      const timeSpent = Math.round((Date.now() - assessment.timeStarted) / 1000);
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
                <p className="text-2xl font-bold text-blue-900">
                  {assessment.score}/20
                </p>
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
                style={{
                  width: `${((assessment.currentQuestion + 1) / 20) * 100}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <QuestionFeed
          unit={selectedUnit}
          chapter={selectedChapter}
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
          Master math concepts through AI-powered question generation
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload</span>
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

        <TabsContent value="upload" className="space-y-4">
          <PDFUpload onPdfExtracted={handlePdfExtracted} />

          {pdfText && (
            <Card>
              <CardHeader>
                <CardTitle>Generate Study Notes</CardTitle>
                <CardDescription>
                  Extract key concepts and create study materials from your PDF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">
                    <strong>File:</strong> {fileName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Chapter:</strong> {selectedChapter}
                  </p>
                </div>

                <Button
                  onClick={generateStudyNotes}
                  disabled={generatingNotes || !selectedChapter}
                  className="w-full"
                >
                  {generatingNotes && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {generatingNotes ? 'Generating Notes...' : 'Generate Study Notes'}
                </Button>

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
          )}
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          {pdfText ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Select Chapter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a chapter..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={selectedChapter || 'Current Chapter'}>
                        {selectedChapter || 'Current Chapter'}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    <Button
                      onClick={startAssessment}
                      disabled={!selectedChapter}
                      className="flex-1"
                    >
                      Start 20-Question Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <QuestionFeed
                unit={selectedUnit}
                chapter={selectedChapter}
                pdfSourceText={pdfText}
              />
            </>
          ) : (
            <Alert>
              <AlertDescription>
                Please upload a PDF in the Upload tab to start practicing.
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
