import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EndlessQuestionFeed } from "@/components/QuestionFeed";
import { StatsSection } from "@/components/StatsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import MathTutorService from "@/lib/MathTutorService";
import { Loader2, BookOpen, Zap, Target } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

export default function MCQPage() {
  const [selectedUnit, setSelectedUnit] = useState<string>("1");
  const [selectedChapter, setSelectedChapter] = useState<string>("1");
  const [tutorService] = useState(() => new MathTutorService(process.env.DEEPSEEK_API_KEY || ''));
  const [assessmentMode, setAssessmentMode] = useState(false);
  const [assessmentQuestions, setAssessmentQuestions] = useState<any[]>([]);
  const [currentAssessmentIndex, setCurrentAssessmentIndex] = useState(0);
  const [assessmentStartTime, setAssessmentStartTime] = useState<Date | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<any[]>([]);
  const [showAssessmentSummary, setShowAssessmentSummary] = useState(false);

  const handleStartAssessment = async () => {
    setAssessmentMode(true);
    setAssessmentStartTime(new Date());
    setCurrentAssessmentIndex(0);
    setAssessmentResults([]);
    setShowAssessmentSummary(false);

    // Generate 50 questions
    const questions = [];
    for (let i = 0; i < 50; i++) {
      try {
        const mcq = await tutorService.generateMCQ(selectedChapter, 'medium');
        questions.push(mcq);
      } catch (error) {
        console.error('Failed to generate question:', error);
      }
    }
    setAssessmentQuestions(questions);
  };

  const handleAssessmentAnswer = (isCorrect: boolean, answer: string) => {
    const result = {
      question: assessmentQuestions[currentAssessmentIndex].question,
      userAnswer: answer,
      correctAnswer: assessmentQuestions[currentAssessmentIndex].correctAnswer,
      isCorrect,
      explanation: assessmentQuestions[currentAssessmentIndex].explanation,
    };
    setAssessmentResults(prev => [...prev, result]);

    if (currentAssessmentIndex < 49) {
      setCurrentAssessmentIndex(prev => prev + 1);
    } else {
      // Assessment complete
      setShowAssessmentSummary(true);
      setAssessmentMode(false);
    }
  };

  const assessmentProgress = assessmentMode ? ((currentAssessmentIndex + 1) / 50) * 100 : 0;
  const correctCount = assessmentResults.filter(r => r.isCorrect).length;
  const totalTime = assessmentStartTime ? (new Date().getTime() - assessmentStartTime.getTime()) / 1000 / 60 : 0; // minutes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Math Buddy for You</h1>
          </div>
          <p className="text-blue-100">
            AI-Powered MCQ Practice from Textbooks
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <Tabs defaultValue="tutor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tutor">🎓 Iyengar Master Tutor</TabsTrigger>
            <TabsTrigger value="practice">📝 Practice</TabsTrigger>
            <TabsTrigger value="stats">📊 Stats</TabsTrigger>
          </TabsList>

          {/* Iyengar Master Tutor Tab */}
          <TabsContent value="tutor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Iyengar Master Tutor
                </CardTitle>
                <CardDescription>
                  Get personalized tutoring from the Iyengar Engineering Mathematics textbook
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit-select">Unit</Label>
                    <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 6 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Unit {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chapter-select">Chapter</Label>
                    <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Chapter" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Chapter {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Teaching Session
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar Filters */}
              <div>
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                    <CardDescription>
                      Customize your practice session
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        type="number"
                        placeholder="e.g., 1"
                        min="1"
                        max="10"
                        value={selectedUnit || ""}
                        onChange={(e) =>
                          setSelectedUnit(
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chapter">Chapter</Label>
                      <Input
                        id="chapter"
                        type="number"
                        placeholder="e.g., 1"
                        min="1"
                        max="20"
                        value={selectedChapter || ""}
                        onChange={(e) =>
                          setSelectedChapter(
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                      />
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedUnit(undefined);
                        setSelectedChapter(undefined);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Filters
                    </Button>

                    {pdfId && (
                      <Button
                        onClick={handleGenerateMore}
                        disabled={generatingMore}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {generatingMore ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Generate 10 More
                          </>
                        )}
                      </Button>
                    )}

                    <div className="pt-4 border-t">
                      <p className="text-xs text-gray-600 mb-3">
                        💡 Upload a PDF from Unit 1-6 of Iyenger Math textbook to get
                        started!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <EndlessQuestionFeed
                  unit={selectedUnit}
                  chapter={selectedChapter}
                />
              </div>
            </div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Performance</h2>
              <StatsSection />

              {/* Performance Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-900 mb-2">
                      How to improve your score:
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • Practice consistently with questions from all units
                      </li>
                      <li>• Review explanations carefully after each answer</li>
                      <li>• Focus on difficult questions to strengthen weak areas</li>
                      <li>• Try multiple attempts until you master each topic</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-300 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">
            Powered by DeepSeek AI • Endless Learning • Mathematics Mastery
          </p>
          <p className="text-sm text-gray-400">
            © 2024 Math Buddy. Your AI Tutor for Mathematics Excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
