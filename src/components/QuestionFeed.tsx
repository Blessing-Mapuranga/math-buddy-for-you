import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

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

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          Practice questions are currently unavailable because AI generation has been removed.
        </AlertDescription>
      </Alert>
    </div>
  );
};
