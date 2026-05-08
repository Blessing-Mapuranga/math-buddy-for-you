export interface WorkedExample {
  problem: string;
  steps: string[]; // each step is markdown-ish text; LaTeX wrapped in $$...$$ or $...$
}

export interface NotesSection {
  heading: string;
  body: string[]; // paragraphs (LaTeX inline with $...$, block with $$...$$)
}

export interface PracticeProblem {
  question: string;
  answer: string;
}

export interface ChapterNotes {
  unitId: string;
  chapterIndex: number;
  title: string;
  intro: string;
  sections: NotesSection[];
  examples: WorkedExample[];
  practice: PracticeProblem[];
  references?: string[];
}