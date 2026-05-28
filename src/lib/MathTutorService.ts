const API_BASE =
  import.meta.env.VITE_BACKEND_API_BASE ??
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

class MathTutorService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private buildPromptSource(sourceText: string): string {
    const maxLength = 4200;
    if (sourceText.length <= maxLength) {
      return sourceText;
    }
    return `${sourceText.slice(0, maxLength)}\n\n[TRUNCATED CONTENT]`;
  }

  private async parseJsonResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    try {
      return JSON.parse(text) as T;
    } catch (err) {
      throw new Error(`Failed to parse backend response as JSON: ${text}`);
    }
  }

  private async post<T>(path: string, payload: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend error ${response.status}: ${text}`);
    }

    return this.parseJsonResponse<T>(response);
  }

  private async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Backend error ${response.status}: ${text}`);
    }

    return this.parseJsonResponse<T>(response);
  }

  private parseTeachResponse(content: string) {
    const derivationMatch = content.match(/DERIVATION:\s*(.*?)(?=EXPLANATION:|$)/s);
    const explanationMatch = content.match(/EXPLANATION:\s*(.*)/s);

    return {
      derivation: derivationMatch ? derivationMatch[1].trim() : content.trim(),
      explanation: explanationMatch ? explanationMatch[1].trim() : content.trim(),
    };
  }

  private normalizeMCQItem(item: any) {
    if (!item || typeof item !== 'object') {
      throw new Error('MCQ item is invalid');
    }

    if (!item.question || !item.options || !item.correct_answer) {
      throw new Error('MCQ item is missing required fields');
    }

    if (!Array.isArray(item.options) || item.options.length < 2) {
      throw new Error('MCQ options must be an array with at least two values');
    }

    return {
      question: String(item.question),
      options: item.options.map(String),
      correctAnswer: String(item.correct_answer),
      explanation: item.explanation ? String(item.explanation) : '',
    };
  }

  private extractMCQData(
    result: { questions?: Array<Record<string, unknown>> }
  ): { question: string; options: string[]; correctAnswer: string; explanation: string } {
    if (!result?.questions?.length) {
      throw new Error('Backend did not return any MCQ items');
    }

    return this.normalizeMCQItem(result.questions[0]);
  }

  async analyzeQuestion(
    question: string,
    chapter: string,
    textbook: string = 'Iyengar Engineering Mathematics'
  ): Promise<{ derivation: string; explanation: string }> {
    const result = await this.post<{ success: boolean; explanation: string }>('/teach', {
      problem_context: question,
      chapter,
      textbook,
    });

    return this.parseTeachResponse(result.explanation);
  }

  async generateMCQ(
    chapter: string,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    textbook: string = 'Iyengar Engineering Mathematics'
  ): Promise<{ question: string; options: string[]; correctAnswer: string; explanation: string }> {
    const result = await this.post<{ success: boolean; questions: Array<Record<string, unknown>> }>('/generate-mcq', {
      chapter,
      source_text: null,
      difficulty,
      textbook,
      question_count: 1,
    });

    return this.extractMCQData(result);
  }

  async generateMCQFromText(
    sourceText: string,
    chapter: string,
    difficulty: 'easy' | 'medium' | 'hard' = 'medium',
    textbook: string = 'Iyengar Engineering Mathematics'
  ): Promise<{ question: string; options: string[]; correctAnswer: string; explanation: string }> {
    const excerpt = this.buildPromptSource(sourceText);
    const result = await this.post<{ success: boolean; questions: Array<Record<string, unknown>> }>('/generate-mcq', {
      chapter,
      source_text: excerpt,
      difficulty,
      textbook,
      question_count: 1,
    });

    return this.extractMCQData(result);
  }

  async extractPdfNotes(
    sourceText: string,
    chapter: string,
    textbook: string = 'Iyengar Engineering Mathematics'
  ): Promise<string> {
    const excerpt = this.buildPromptSource(sourceText);
    const result = await this.post<{ success: boolean; notes: string }>('/extract-notes', {
      chapter_text: excerpt,
      chapter,
      textbook,
    });
    return result.notes;
  }

  async startAssessment(
    sourceText: string,
    chapter: string,
    questionCount = 10,
    textbook: string = 'Iyengar Engineering Mathematics'
  ): Promise<{ taskId: string }> {
    const excerpt = this.buildPromptSource(sourceText);
    const result = await this.post<{ success: boolean; task_id: string }>('/start-assessment', {
      chapter,
      source_text: excerpt,
      textbook,
      question_count: questionCount,
    });

    return { taskId: result.task_id };
  }

  async getAssessmentStatus(
    taskId: string
  ): Promise<{
    success: boolean;
    task_id: string;
    status: string;
    progress: number;
    total: number;
    questions?: Array<{ question: string; options: string[]; correct_answer: string; explanation: string }>;
    error?: string;
  }> {
    return this.get(`/assessment-status/${taskId}`);
  }

  async teachChapter(
    chapter: string,
    textbook: string = 'Iyengar Engineering Mathematics'
  ): Promise<{
    overview: string;
    keyProblems: Array<{ problem: string; solution: string }>;
    tips: string;
  }> {
    const result = await this.post<{ success: boolean; explanation: string }>('/teach', {
      problem_context: `Teach me Chapter ${chapter}. Include overview, key problems, and study tips.`,
      chapter,
      textbook,
    });

    const raw = result.explanation;
    const overviewMatch = raw.match(/OVERVIEW:\s*(.*?)(?=KEY PROBLEMS:|$)/s);
    const problemsSection = raw.match(/KEY PROBLEMS:\s*(.*?)(?=TIPS:|$)/s);
    const tipsMatch = raw.match(/TIPS:\s*(.*)/s);

    const keyProblems: Array<{ problem: string; solution: string }> = [];
    if (problemsSection) {
      const problems = problemsSection[1].split(/\d+\.\s*Problem:/).slice(1);
      problems.forEach((problemText) => {
        const match = problemText.match(/Problem:\s*(.*?)\s*Solution:\s*(.*)/s);
        if (match) {
          keyProblems.push({
            problem: match[1].trim(),
            solution: match[2].trim(),
          });
        }
      });
    }

    return {
      overview: overviewMatch ? overviewMatch[1].trim() : '',
      keyProblems,
      tips: tipsMatch ? tipsMatch[1].trim() : '',
    };
  }
}

export default MathTutorService;

const mathTutorServiceInstance = new MathTutorService();
export { mathTutorServiceInstance as MathTutorService };
