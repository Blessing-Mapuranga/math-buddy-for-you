from datetime import datetime
from enum import Enum
from typing import List, Literal, Optional

from pydantic import BaseModel, Field


class StudyBlock(BaseModel):
    category: Literal["definition", "theorem", "formula", "study-guide"]
    title: str
    statement: str
    formula: Optional[str] = None
    references: Optional[str] = None
    summary: Optional[str] = None


class TextbookParseRequest(BaseModel):
    chapter_text: str
    local_json_data: Optional[str] = None
    chapter: Optional[str] = None
    textbook: str = "Iyengar Engineering Mathematics"


class TextbookParseResponse(BaseModel):
    success: bool
    study_blocks: List[StudyBlock]
    raw_output: Optional[str] = None


class TeachRequest(BaseModel):
    problem_context: str
    chapter: Optional[str] = None
    textbook: str = "Iyengar Engineering Mathematics"


class TeachResponse(BaseModel):
    success: bool
    explanation: str


class MCQItem(BaseModel):
    question: str
    options: List[str]
    correct_answer: str
    explanation: str
    difficulty: Optional[str] = None
    topic: Optional[str] = None


class MCQGenerateRequest(BaseModel):
    chapter: Optional[str] = None
    source_text: Optional[str] = None
    difficulty: Literal["easy", "medium", "hard"] = "medium"
    textbook: str = "Iyengar Engineering Mathematics"
    question_count: int = 1


class MCQGenerateResponse(BaseModel):
    success: bool
    questions: List[MCQItem]


class ExtractNotesRequest(BaseModel):
    chapter_text: str
    chapter: Optional[str] = None
    textbook: str = "Iyengar Engineering Mathematics"


class ExtractNotesResponse(BaseModel):
    success: bool
    notes: str


class AssessmentStartRequest(BaseModel):
    chapter: Optional[str] = None
    source_text: str
    textbook: str = "Iyengar Engineering Mathematics"
    question_count: int = Field(default=50, ge=1, le=100)


class AssessmentTaskStatus(str, Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"


class AssessmentTask(BaseModel):
    task_id: str
    chapter: Optional[str] = None
    textbook: str
    source_text: str
    question_count: int
    progress: int = 0
    total: int = 0
    status: AssessmentTaskStatus = AssessmentTaskStatus.pending
    questions: List[MCQItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    error: Optional[str] = None


class AssessmentStatusResponse(BaseModel):
    success: bool
    task_id: str
    status: AssessmentTaskStatus
    progress: int
    total: int
    questions: Optional[List[MCQItem]] = None
    error: Optional[str] = None


class AnswerReportRequest(BaseModel):
    question_id: str
    user_answer: str
    correct_answer: str
    is_correct: bool


class StatsResponse(BaseModel):
    success: bool
    total_questions: int
    total_answers: int
    correct_answers: int
    accuracy: float
