import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PDFUploadSection } from "@/components/PDFUpload";
import { EndlessQuestionFeed } from "@/components/QuestionFeed";
import { StatsSection } from "@/components/StatsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2, BookOpen, Zap } from "lucide-react";

const API_BASE = "http://localhost:5000/api";

export default function MCQPage() {
  const [selectedUnit, setSelectedUnit] = useState<number | undefined>(undefined);
  const [selectedChapter, setSelectedChapter] = useState<number | undefined>(undefined);
  const [pdfId, setPdfId] = useState<string | null>(null);
  const [generatingMore, setGeneratingMore] = useState(false);
  const [filterMode, setFilterMode] = useState<"all" | "filter">("all");

  const handleGenerateMore = async () => {
    if (!pdfId) return;

    setGeneratingMore(true);
    try {
      const response = await axios.post(`${API_BASE}/generate-more`, {
        pdf_id: pdfId,
        count: 10,
      });

      if (response.data.success) {
        alert(`✅ ${response.data.message}`);
      }
    } catch (error: any) {
      alert(`Failed to generate more questions: ${error.message}`);
    } finally {
      setGeneratingMore(false);
    }
  };

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
        <Tabs defaultValue="practice" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="practice">📝 Practice</TabsTrigger>
            <TabsTrigger value="upload">⬆️ Upload PDF</TabsTrigger>
            <TabsTrigger value="stats">📊 Stats</TabsTrigger>
          </TabsList>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
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

          {/* Upload Tab */}
          <TabsContent value="upload">
            <div className="max-w-2xl mx-auto">
              <PDFUploadSection
                onUploadSuccess={(id) => {
                  setPdfId(id);
                  // Auto-switch to practice tab
                  const practiceTab = document.querySelector(
                    '[role="tab"][value="practice"]'
                  ) as HTMLElement;
                  practiceTab?.click();
                }}
              />

              {/* Quick Tips */}
              <Card className="mt-6 bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">📚 Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    ✓ Upload chapters from Iyenger Math textbook (Units 1-6)
                  </p>
                  <p>
                    ✓ AI will generate unlimited practice questions automatically
                  </p>
                  <p>✓ Get instant AI explanations for every answer</p>
                  <p>✓ Track your progress and accuracy over time</p>
                  <p>✓ Generate more questions anytime with one click</p>
                </CardContent>
              </Card>
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
