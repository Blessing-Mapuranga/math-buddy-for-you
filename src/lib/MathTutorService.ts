const API_BASE =
  import.meta.env.VITE_BACKEND_API_BASE ??
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

class MathTutorService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async parseJsonResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    try {
      return JSON.parse(text) as T;
    } catch (err) {
      throw new Error(`Failed to parse backend response as JSON: ${text}`);
    }
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

  async getStats(): Promise<{ success: boolean; total_questions: number; total_answers: number; correct_answers: number; accuracy: number }> {
    return this.get('/stats');
  }
}

export default MathTutorService;

const mathTutorServiceInstance = new MathTutorService();
export { mathTutorServiceInstance as MathTutorService };
