from typing import Dict

from .models import StatsResponse

stats_store: Dict[str, int] = {
    "total_questions": 0,
    "total_answers": 0,
    "correct_answers": 0,
}


async def get_stats() -> StatsResponse:
    accuracy = 0.0
    if stats_store["total_answers"]:
        accuracy = round((stats_store["correct_answers"] / stats_store["total_answers"]) * 100, 2)
    return StatsResponse(
        success=True,
        total_questions=stats_store["total_questions"],
        total_answers=stats_store["total_answers"],
        correct_answers=stats_store["correct_answers"],
        accuracy=accuracy,
    )
