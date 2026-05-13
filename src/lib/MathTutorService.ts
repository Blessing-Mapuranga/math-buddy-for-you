class MathTutorService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.deepseek.com') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async analyzeQuestion(question: string, chapter: string, textbook: string = 'Iyengar Engineering Mathematics'): Promise<{
    derivation: string;
    explanation: string;
  }> {
    const prompt = `You are an AI tutor specialized in ${textbook}. Analyze this question from Chapter ${chapter}: "${question}"

Provide a step-by-step mathematical derivation that is easy for engineering students to follow. Include:
1. Step-by-step solution
2. Mathematical logic behind each step
3. Key concepts used
4. Common mistakes to avoid

Format your response as:
DERIVATION:
[step-by-step solution]

EXPLANATION:
[detailed explanation]`;

    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the response
    const derivationMatch = content.match(/DERIVATION:\s*(.*?)(?=EXPLANATION:|$)/s);
    const explanationMatch = content.match(/EXPLANATION:\s*(.*)/s);

    return {
      derivation: derivationMatch ? derivationMatch[1].trim() : content,
      explanation: explanationMatch ? explanationMatch[1].trim() : '',
    };
  }

  async generateMCQ(chapter: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium', textbook: string = 'Iyengar Engineering Mathematics'): Promise<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }> {
    const prompt = `Generate a multiple-choice question from Chapter ${chapter} of ${textbook} at ${difficulty} difficulty level.

Format as:
QUESTION: [question text]
A) [option1]
B) [option2]
C) [option3]
D) [option4]
CORRECT: [letter]
EXPLANATION: [brief explanation]`;

    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the response
    const questionMatch = content.match(/QUESTION:\s*(.*?)(?=A\)|$)/s);
    const options = content.match(/A\)\s*(.*?)\nB\)\s*(.*?)\nC\)\s*(.*?)\nD\)\s*(.*?)(?=CORRECT:|$)/s);
    const correctMatch = content.match(/CORRECT:\s*([A-D])/);
    const explanationMatch = content.match(/EXPLANATION:\s*(.*)/s);

    if (!questionMatch || !options || !correctMatch) {
      throw new Error('Failed to parse MCQ response');
    }

    const optionList = [options[1], options[2], options[3], options[4]];
    const correctIndex = correctMatch[1].charCodeAt(0) - 65; // A=0, B=1, etc.

    return {
      question: questionMatch[1].trim(),
      options: optionList,
      correctAnswer: optionList[correctIndex],
      explanation: explanationMatch ? explanationMatch[1].trim() : '',
    };
  }

  async teachChapter(chapter: string, textbook: string = 'Iyengar Engineering Mathematics'): Promise<{
    overview: string;
    keyProblems: Array<{ problem: string; solution: string }>;
    tips: string;
  }> {
    const prompt = `Provide a comprehensive teaching session for Chapter ${chapter} of ${textbook}.

Include:
1. Chapter overview
2. 3-5 key problems with step-by-step solutions
3. Study tips for engineering students

Format as:
OVERVIEW:
[overview text]

KEY PROBLEMS:
1. Problem: [problem]
   Solution: [step-by-step solution]

2. ...

TIPS:
[study tips]`;

    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the response
    const overviewMatch = content.match(/OVERVIEW:\s*(.*?)(?=KEY PROBLEMS:|$)/s);
    const problemsSection = content.match(/KEY PROBLEMS:\s*(.*?)(?=TIPS:|$)/s);
    const tipsMatch = content.match(/TIPS:\s*(.*)/s);

    const keyProblems: Array<{ problem: string; solution: string }> = [];
    if (problemsSection) {
      const problems = problemsSection[1].split(/\d+\.\s*Problem:/).slice(1);
      problems.forEach(problemText => {
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