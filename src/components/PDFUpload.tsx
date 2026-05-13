import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoaderCircle } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFUploadProps {
  onPdfExtracted: (data: {
    pdfText: string;
    fileName: string;
    unit: string;
    chapter: string;
  }) => void;
}

export const PDFUpload = ({ onPdfExtracted }: PDFUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [unit, setUnit] = useState('Unit 1');
  const [chapter, setChapter] = useState('');
  const [error, setError] = useState('');
  const [extractedPages, setExtractedPages] = useState(0);

  const extractPdfText = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(' ');
        fullText += `\n--- Page ${pageNum} ---\n${text}`;
      }

      setExtractedPages(pdf.numPages);
      return fullText;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to extract PDF';
      throw new Error(`PDF extraction failed: ${errorMsg}`);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF file');
      return;
    }

    setError('');
    setLoading(true);
    setFileName(file.name);

    try {
      const pdfText = await extractPdfText(file);

      if (!chapter.trim()) {
        setError('Please enter a chapter name');
        setLoading(false);
        return;
      }

      onPdfExtracted({
        pdfText,
        fileName: file.name,
        unit,
        chapter,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Textbook PDF</CardTitle>
        <CardDescription>
          Upload your math textbook or chapter for AI-powered learning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Unit</label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'].map(
                (u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="chapter" className="block text-sm font-medium">
            Chapter Name
          </label>
          <Input
            id="chapter"
            placeholder="e.g., Limit and Continuity"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="pdf-file" className="block text-sm font-medium">
            PDF File
          </label>
          <Input
            id="pdf-file"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            disabled={loading}
          />
        </div>

        {fileName && (
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-sm text-blue-900">
              <strong>File:</strong> {fileName}
            </p>
            {extractedPages > 0 && (
              <p className="text-sm text-blue-900">
                <strong>Pages extracted:</strong> {extractedPages}
              </p>
            )}
          </div>
        )}

        <Button
          onClick={() => {
            const fileInput = document.getElementById('pdf-file') as HTMLInputElement;
            if (fileInput) {
              fileInput.click();
            }
          }}
          disabled={loading || !chapter.trim()}
          className="w-full"
        >
          {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? 'Extracting PDF...' : 'Select & Upload PDF'}
        </Button>
      </CardContent>
    </Card>
  );
};
