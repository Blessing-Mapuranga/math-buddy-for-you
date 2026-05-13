import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

interface UploadResponse {
  success: boolean;
  pdf_id: string;
  unit: number;
  chapter: number;
  questions_generated: number;
  message: string;
}

export const PDFUploadSection: React.FC<{
  onUploadSuccess?: (pdfId: string) => void;
}> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [unit, setUnit] = useState(1);
  const [chapter, setChapter] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.name.endsWith(".pdf")) {
      setError("Please upload a PDF file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("unit", unit.toString());
      formData.append("chapter", chapter.toString());

      const response = await axios.post<UploadResponse>(
        `${API_BASE}/upload-pdf`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess(`✅ ${response.data.message}`);
      if (onUploadSuccess) {
        onUploadSuccess(response.data.pdf_id);
      }

      // Reset form
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err: any) {
      setError(
        `Upload failed: ${err.response?.data?.error || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Textbook PDF
        </CardTitle>
        <CardDescription>
          Upload a math textbook chapter to generate MCQs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="unit">Unit Number</Label>
            <Input
              id="unit"
              type="number"
              value={unit}
              onChange={(e) => setUnit(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
            />
          </div>
          <div>
            <Label htmlFor="chapter">Chapter Number</Label>
            <Input
              id="chapter"
              type="number"
              value={chapter}
              onChange={(e) => setChapter(parseInt(e.target.value) || 1)}
              min="1"
              max="20"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            disabled={loading}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            variant="outline"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Select PDF File"
            )}
          </Button>
          <p className="text-sm text-gray-500 mt-2">or drag and drop</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
