import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, LoaderCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

interface MCQData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuestionFeedProps {
  pdfSourceText?: string;
  assessmentMode?: boolean;
  assessmentQuestion?: MCQData;
  onAssessmentAnswer?: (answer: string) => void;
}

export const QuestionFeed = ({
  pdfSourceText,
  assessmentMode = false,
  assessmentQuestion,
  onAssessmentAnswer,
}: QuestionFeedProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, string>>(new Map());
  const [showExplanations, setShowExplanations] = useState<Set<string>>(new Set());
  const [questions, setQuestions] = useState<MCQData[]>([]);
  const [generating, setGenerating] = useState(false);
  const [count, setCount] = useState(5);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => {
      const newMap = new Map(prev);
      newMap.set(questionId, answer);
      return newMap;
    });
  };

  const toggleExplanation = (questionId: string) => {
    setShowExplanations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  if (assessmentMode && assessmentQuestion) {
    const qId = assessmentQuestion.id;
    const userAnswer = selectedAnswers.get(qId);
    const isAnswerCorrect = userAnswer !== undefined && assessmentQuestion.options[Number(userAnswer)] === assessmentQuestion.correctAnswer;

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{assessmentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={userAnswer || ''}
            onValueChange={(value) => handleAnswerSelect(qId, value)}
          >
            {assessmentQuestion.options.map((option, index) => {
              const optionId = `${qId}-opt-${index}`;
              return (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={optionId} />
                  <Label htmlFor={optionId} className="flex-1 cursor-pointer">
                    {String.fromCharCode(65 + index)}) {option}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          {userAnswer !== undefined && (
            <Alert
              variant={isAnswerCorrect ? 'default' : 'destructive'}
              className={isAnswerCorrect ? 'border-green-200 bg-green-50' : ''}
            >
              <AlertDescription className="flex items-center gap-2">
                {isAnswerCorrect ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-green-900">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    <span>
                      Incorrect. The correct answer is{' '}
                      {String.fromCharCode(65 + assessmentQuestion.options.indexOf(assessmentQuestion.correctAnswer))}
                    </span>
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}

          {userAnswer !== undefined && (
            <>
              <Button
                variant="outline"
                onClick={() => toggleExplanation(qId)}
                className="w-full"
              >
                {showExplanations.has(qId) ? 'Hide' : 'Show'} Explanation
              </Button>

              {showExplanations.has(qId) && (
                <Card className="bg-blue-50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-blue-900">{assessmentQuestion.explanation}</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {userAnswer !== undefined && (
            <Button
              onClick={() => onAssessmentAnswer?.(userAnswer)}
              className="w-full"
            >
              Next Question
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!pdfSourceText) {
    return (
      <Alert variant="destructive">
        <AlertDescription>No PDF text available. Please upload a PDF first.</AlertDescription>
      </Alert>
    );
  }

  const generate = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-mcq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PUBLISHABLE_KEY}`,
          apikey: PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ pdfText: pdfSourceText, count }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setQuestions(data.questions ?? []);
      setSelectedAnswers(new Map());
      setShowExplanations(new Set());
      if (!data.questions?.length) toast.warning('No questions returned. Try a different PDF.');
      else toast.success(`Generated ${data.questions.length} questions`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to generate questions');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
          <div className="flex-1 space-y-1">
            <Label htmlFor="mcq-count" className="text-sm font-medium">Number of questions</Label>
            <select
              id="mcq-count"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              disabled={generating}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {[3, 5, 7, 10, 15].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <Button onClick={generate} disabled={generating} className="sm:w-auto">
            {generating ? (
              <><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />Generating…</>
            ) : (
              <><Sparkles className="mr-2 h-4 w-4" />Generate MCQs</>
            )}
          </Button>
        </CardContent>
      </Card>

      {questions.length === 0 && !generating && (
        <Alert>
          <AlertDescription>
            Click <strong>Generate MCQs</strong> to create AI-powered practice questions from the loaded PDF.
          </AlertDescription>
        </Alert>
      )}

      {questions.map((q, qIdx) => {
        const userAnswer = selectedAnswers.get(q.id);
        const userAnswerText = userAnswer !== undefined ? q.options[Number(userAnswer)] : undefined;
        const isCorrect = userAnswerText === q.correctAnswer;
        const correctIdx = q.options.indexOf(q.correctAnswer);
        return (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Q{qIdx + 1}. {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={userAnswer || ''}
                onValueChange={(v) => handleAnswerSelect(q.id, v)}
              >
                {q.options.map((opt, idx) => {
                  const id = `${q.id}-opt-${idx}`;
                  return (
                    <div key={idx} className="flex items-start space-x-2">
                      <RadioGroupItem value={idx.toString()} id={id} className="mt-1" />
                      <Label htmlFor={id} className="flex-1 cursor-pointer leading-relaxed">
                        {String.fromCharCode(65 + idx)}) {opt}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>

              {userAnswer !== undefined && (
                <Alert
                  variant={isCorrect ? 'default' : 'destructive'}
                  className={isCorrect ? 'border-green-200 bg-green-50' : ''}
                >
                  <AlertDescription className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-green-900">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        <span>
                          Incorrect. Correct answer: {String.fromCharCode(65 + correctIdx)}) {q.correctAnswer}
                        </span>
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {userAnswer !== undefined && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExplanation(q.id)}
                  >
                    {showExplanations.has(q.id) ? 'Hide' : 'Show'} Explanation
                  </Button>
                  {showExplanations.has(q.id) && (
                    <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-900 whitespace-pre-wrap">
                      {q.explanation}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
