import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown, RotateCw } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

interface QuestionResponse {
  success: boolean;
  questions: Question[];
  page: number;
  limit: number;
  total_count: number;
}

interface AnswerResponse {
  success: boolean;
  is_correct: boolean;
  correct_answer: string;
  explanation: string;
  ai_guidance: string;
  options: string[];
}

interface MCQFeedProps {
  unit?: number;
  chapter?: number;
}

export const EndlessQuestionFeed: React.FC<MCQFeedProps> = ({
  unit,
  chapter,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<
    Record<string, AnswerResponse>
  >({});
  const [expandedExplanations, setExpandedExplanations] = useState<
    Set<string>
  >(new Set());
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (unit) params.append("unit", unit.toString());
      if (chapter) params.append("chapter", chapter.toString());
      params.append("page", page.toString());
      params.append("limit", "3");

      const response = await axios.get<QuestionResponse>(
        `${API_BASE}/questions?${params}`
      );

      if (response.data.success) {
        setQuestions((prev) => [...prev, ...response.data.questions]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  }, [unit, chapter, page]);

  // Initial fetch
  useEffect(() => {
    if (questions.length === 0) {
      fetchQuestions();
    }
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchQuestions();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchQuestions, loading]);

  // Submit answer
  const handleSubmitAnswer = async (questionId: string) => {
    const answer = selectedAnswers[questionId];
    if (!answer) return;

    try {
      const response = await axios.post<AnswerResponse>(
        `${API_BASE}/submit-answer`,
        {
          question_id: questionId,
          user_answer: answer,
        }
      );

      if (response.data.success) {
        setResults((prev) => ({
          ...prev,
          [questionId]: response.data,
        }));
        setSubmitted((prev) => new Set([...prev, questionId]));
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleExplanation = (questionId: string) => {
    setExpandedExplanations((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Math Questions</h2>
        <p className="text-gray-600">
          Test your knowledge with AI-generated MCQs from textbook content
        </p>
      </div>

      {questions.map((question, index) => {
        const isSubmitted = submitted.has(question.id);
        const result = results[question.id];
        const selectedAnswer = selectedAnswers[question.id];
        const showExplanation = expandedExplanations.has(question.id);

        return (
          <Card key={question.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    Question {index + 1}
                  </CardTitle>
                  <p className="text-base font-medium mt-2 text-gray-900">
                    {question.question}
                  </p>
                </div>
                <Badge className={`whitespace-nowrap ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="space-y-3 mb-6">
                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={(value) =>
                    setSelectedAnswers((prev) => ({
                      ...prev,
                      [question.id]: value,
                    }))
                  }
                  disabled={isSubmitted}
                >
                  {question.options.map((option, idx) => {
                    const optionKey = String.fromCharCode(65 + idx); // A, B, C, D
                    const isCorrect =
                      optionKey === result?.correct_answer;
                    const isSelected =
                      optionKey === selectedAnswer;
                    const isWrong =
                      isSelected && isSubmitted && !result?.is_correct;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSubmitted
                            ? isCorrect
                              ? "border-green-500 bg-green-50"
                              : isWrong
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200"
                            : isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => {
                          if (!isSubmitted) {
                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [question.id]: optionKey,
                            }));
                          }
                        }}
                      >
                        <RadioGroupItem
                          value={optionKey}
                          id={`${question.id}-${optionKey}`}
                        />
                        <Label
                          htmlFor={`${question.id}-${optionKey}`}
                          className="flex-1 cursor-pointer font-medium"
                        >
                          {option}
                        </Label>
                        {isSubmitted && isCorrect && (
                          <span className="text-green-600 font-bold">✓</span>
                        )}
                        {isSubmitted && isWrong && (
                          <span className="text-red-600 font-bold">✗</span>
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              {!isSubmitted ? (
                <Button
                  onClick={() => handleSubmitAnswer(question.id)}
                  disabled={!selectedAnswer}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <div className="space-y-3">
                  {result?.is_correct ? (
                    <Alert className="bg-green-50 border-green-200">
                      <span className="text-green-800 font-semibold">
                        ✓ Correct! Well done!
                      </span>
                    </Alert>
                  ) : (
                    <Alert className="bg-red-50 border-red-200">
                      <span className="text-red-800 font-semibold">
                        ✗ Incorrect. Let's learn more!
                      </span>
                    </Alert>
                  )}

                  <Button
                    onClick={() => toggleExplanation(question.id)}
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <span>
                      {showExplanation ? "Hide" : "Show"} Explanation
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showExplanation ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {showExplanation && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Standard Explanation:
                        </p>
                        <p className="text-sm text-blue-800">
                          {result?.explanation}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-purple-900 mb-1">
                          AI Tutoring Guide:
                        </p>
                        <p className="text-sm text-purple-800">
                          {result?.ai_guidance}
                        </p>
                      </div>

                      <div className="text-xs text-gray-600 pt-2">
                        Correct answer: <span className="font-bold">{result?.correct_answer}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      )}

      <div ref={observerTarget} className="h-10" />
    </div>
  );
};
