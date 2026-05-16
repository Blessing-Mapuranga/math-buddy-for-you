import { useEffect, useRef, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { LoaderCircle, CheckCircle2, XCircle } from 'lucide-react';
import { MathTutorService } from '@/lib/MathTutorService';

interface MCQData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuestionFeedProps {
  unit: string;
  chapter: string;
  pdfSourceText?: string;
  assessmentMode?: boolean;
  assessmentQuestion?: MCQData;
  onAssessmentAnswer?: (answer: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const QuestionFeed = ({
  unit,
  chapter,
  pdfSourceText,
  assessmentMode = false,
  assessmentQuestion,
  onAssessmentAnswer,
}: QuestionFeedProps) => {
  const [questions, setQuestions] = useState<MCQData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, string>>(
    new Map()
  );
  const [showExplanations, setShowExplanations] = useState<Set<string>>(
    new Set()
  );
  const [error, setError] = useState('');
  const observerTarget = useRef(null);

  const generateQuestions = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      if (!pdfSourceText) {
        throw new Error('No PDF text provided for question generation');
      }

      for (let i = 0; i < 3; i++) {
        // Generate 3 questions per batch
        const difficulty = ['Easy', 'Medium', 'Hard'][i];
        const mcqData = await MathTutorService.generateMCQFromText(
          pdfSourceText,
          chapter,
          difficulty,
          'Iyengar Engineering Mathematics'
        );

        const questionId = `q_${Date.now()}_${i}`;
        const newQuestion: MCQData = {
          id: questionId,
          question: mcqData.question,
          options: mcqData.options,
          correctAnswer: mcqData.correctAnswer,
          explanation: mcqData.explanation,
        };

        setQuestions((prev) => [...prev, newQuestion]);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to generate questions';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [pdfSourceText, chapter, loading]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && pdfSourceText) {
          generateQuestions();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [generateQuestions, loading, pdfSourceText]);

  // Initial load
  useEffect(() => {
    if (questions.length === 0 && pdfSourceText && !loading) {
      generateQuestions();
    }
  }, [pdfSourceText]);

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

  const isCorrect = (questionId: string): boolean => {
    const question = questions.find((q) => q.id === questionId);
    const selected = selectedAnswers.get(questionId);
    if (!question || !selected) return false;

    const optionIndex = parseInt(selected);
    return question.options[optionIndex] === question.correctAnswer;
  };

  // Assessment mode - show single question
  if (assessmentMode && assessmentQuestion) {
    const qId = assessmentQuestion.id;
    const userAnswer = selectedAnswers.get(qId);
    const isAnswerCorrect = userAnswer !== undefined && isCorrect(qId);

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
                    <span>Incorrect. The correct answer is{' '}
                    {String.fromCharCode(65 + assessmentQuestion.options.indexOf(assessmentQuestion.correctAnswer))}</span>
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

  // Practice mode - infinite scroll
  if (!pdfSourceText) {
    return (
      <Alert variant="destructive">
        <AlertDescription>No PDF text available. Please upload a PDF first.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {questions.map((question) => {
        const userAnswer = selectedAnswers.get(question.id);
        const answered = userAnswer !== undefined;
        const correct = answered && isCorrect(question.id);

        return (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-base">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={userAnswer || ''}
                onValueChange={(value) => handleAnswerSelect(question.id, value)}
                disabled={answered}
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 rounded p-2 ${
                      answered && index.toString() === userAnswer
                        ? correct
                          ? 'bg-green-100'
                          : 'bg-red-100'
                        : ''
                    }`}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`${question.id}-opt-${index}`}
                    />
                    <Label
                      htmlFor={`${question.id}-opt-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {String.fromCharCode(65 + index)}) {option}
                    </Label>
                    {answered && index.toString() === userAnswer && (
                      <span>{correct ? '✓' : '✗'}</span>
                    )}
                  </div>
                ))}
              </RadioGroup>

              {answered && (
                <>
                  <Alert
                    variant={correct ? 'default' : 'destructive'}
                    className={correct ? 'border-green-200 bg-green-50' : ''}
                  >
                    <AlertDescription className={correct ? 'text-green-900' : ''}>
                      {correct ? 'Correct! Well done!' : 'Incorrect. Try another question.'}
                    </AlertDescription>
                  </Alert>

                  <Button
                    variant="outline"
                    onClick={() => toggleExplanation(question.id)}
                    className="w-full"
                  >
                    {showExplanations.has(question.id) ? 'Hide' : 'Show'} Explanation
                  </Button>

                  {showExplanations.has(question.id) && (
                    <Card className="bg-blue-50">
                      <CardContent className="pt-6">
                        <p className="text-sm text-blue-900">{question.explanation}</p>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );
      })}

      {loading && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      <div ref={observerTarget} className="h-4" />
    </div>
  );
};
