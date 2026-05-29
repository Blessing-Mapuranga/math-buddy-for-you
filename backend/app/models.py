from pydantic import BaseModel


class StatsResponse(BaseModel):
    success: bool
    total_questions: int
    total_answers: int
    correct_answers: int
    accuracy: float
