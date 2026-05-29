import asyncio
import json
import logging
import re
import uuid
from typing import Any, Dict, List, Optional

import httpx
from pydantic import ValidationError

from .config import settings
from .models import (
    AnswerReportRequest,
    AssessmentTask,
    AssessmentTaskStatus,
    ExtractNotesRequest,
    ExtractNotesResponse,
    MCQGenerateRequest,
    MCQGenerateResponse,
    MCQItem,
    StatsResponse,
    StudyBlock,
    TeachRequest,
    TeachResponse,
    TextbookParseResponse,
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

http_client = httpx.AsyncClient(timeout=45.0)

assessment_tasks: Dict[str, AssessmentTask] = {}
stats_store = {
    "total_questions": 0,
    "total_answers": 0,
    "correct_answers": 0,
}


async def call_gemini(messages: List[Dict[str, str]], max_tokens: int = 3000, temperature: float = 0.0) -> str:
    response = await http_client.post(
        f"{settings.gemini_base_url}/v1/chat/completions",
        json={
            "model": settings.gemini_model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        },
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.gemini_api_key}",
        },
    )
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"]


async def call_deepseek(messages: List[Dict[str, str]], max_tokens: int = 2000, temperature: float = 0.25) -> str:
    response = await http_client.post(
        f"{settings.deepseek_base_url}/v1/chat/completions",
        json={
            "model": settings.deepseek_model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
        },
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.deepseek_api_key}",
        },
    )
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"]


def _safe_json_load(raw: str) -> Any:
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        cleaned = re.sub(r"\n+", " ", raw).strip()
        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            logger.warning("Failed to parse JSON from model output")
            return None


async def parse_textbook_content(chapter_text: str, local_json_data: Optional[str] = None, chapter: Optional[str] = None, textbook: str = "Iyengar Engineering Mathematics") -> TextbookParseResponse:
    prompt = (
        "You are an expert Engineering Mathematics textbook parser. "
        "Map 100% of the mathematical content in the chapter. "
        "Isolate every primary definition, core theorem, and underlying formula. "
        "Return a cleanly organized index of study blocks as valid JSON. "
        "Each block must contain category, title, statement, formula, references, and summary. "
        "Do not include any prose outside the JSON structure."
    )

    if chapter:
        prompt += f" Chapter: {chapter}."

    if local_json_data:
        prompt += " Use the local JSON data as additional textbook metadata."

    user_content = """
Chapter text:
{chapter_text}

Local JSON data:
{local_json_data}
""".format(chapter_text=chapter_text, local_json_data=local_json_data or "None")

    try:
        raw_response = await call_gemini(
            [
                {"role": "system", "content": prompt},
                {"role": "user", "content": user_content},
            ],
            max_tokens=2800,
            temperature=0.0,
        )

        parsed = _safe_json_load(raw_response)
        if isinstance(parsed, list):
            study_blocks = [StudyBlock(**item) for item in parsed]
            return TextbookParseResponse(success=True, study_blocks=study_blocks, raw_output=raw_response)

        # Attempt to find JSON substring
        match = re.search(r"(\[\s*\{.*\}\s*\])", raw_response, re.DOTALL)
        if match:
            parsed = _safe_json_load(match.group(1))
            if isinstance(parsed, list):
                study_blocks = [StudyBlock(**item) for item in parsed]
                return TextbookParseResponse(success=True, study_blocks=study_blocks, raw_output=raw_response)

    except Exception as exc:
        logger.exception("Gemini parsing failed")
        raise

    raise ValueError("Gemini response did not return a valid study block JSON payload")


async def teach_problem(request: TeachRequest) -> TeachResponse:
    system_prompt = (
        "You are an elite Engineering Mathematics Professor specializing in Advanced Engineering Mathematics. "
        "Your task is to break down the requested problem or derivation into crystalline, atomic steps. "
        "For every line of calculus or matrix manipulation, explicitly detail the intermediate algebraic changes. "
        "Output all math exclusively using standard Markdown LaTeX format ($...$ or $$...$$)."
    )

    user_prompt = (
        f"Chapter: {request.chapter or 'unknown'}\n"
        f"Textbook: {request.textbook}\n"
        f"Problem context:\n{request.problem_context}\n"
        "Provide a full walkthrough with atomic algebraic detail and LaTeX math."
    )

    raw_response = await call_deepseek(
        [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        max_tokens=2800,
        temperature=0.2,
    )

    return TeachResponse(success=True, explanation=raw_response.strip())


async def extract_notes(request: ExtractNotesRequest) -> ExtractNotesResponse:
    prompt = (
        "You are an AI textbook coach. Read the provided chapter excerpt and create a concise study guide. "
        "Include OVERVIEW, KEY CONCEPTS, and STEP-BY-STEP PROBLEM SOLVING GUIDE. "
        "Keep the output structured but readable for engineering learners."
    )

    user_content = f"Chapter: {request.chapter or 'unknown'}\nTextbook: {request.textbook}\n\nExcerpt:\n{request.chapter_text}"
    raw_response = await call_gemini(
        [
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_content},
        ],
        max_tokens=2200,
        temperature=0.25,
    )

    return ExtractNotesResponse(success=True, notes=raw_response.strip())


async def generate_mcq(request: MCQGenerateRequest) -> MCQGenerateResponse:
    prompt = (
        "You are an advanced engineering syllabus assessment writer. "
        "Review the chapter context and generate MCQ items that map precisely to engineering mathematics difficulty. "
        "Return valid JSON only. Each item must include question, four options, correct_answer, explanation, difficulty, and topic."
    )

    user_content = (
        f"Chapter: {request.chapter or 'unknown'}\n"
        f"Textbook: {request.textbook}\n"
        f"Difficulty: {request.difficulty}\n"
        f"Question count: {request.question_count}\n"
        f"Context:\n{request.source_text or 'No additional text provided.'}"
    )

    raw_response = await call_deepseek(
        [
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_content},
        ],
        max_tokens=2600,
        temperature=0.45,
    )

    parsed = _safe_json_load(raw_response)
    questions: List[MCQItem] = []

    if isinstance(parsed, list):
        for item in parsed:
            questions.append(MCQItem(**item))
    else:
        match = re.search(r"(\[\s*\{.*\}\s*\])", raw_response, re.DOTALL)
        if match:
            parsed = _safe_json_load(match.group(1))
            if isinstance(parsed, list):
                for item in parsed:
                    questions.append(MCQItem(**item))

    if not questions:
        raise ValueError("DeepSeek did not return valid MCQ JSON")

    stats_store["total_questions"] += len(questions)
    return MCQGenerateResponse(success=True, questions=questions)


async def _build_assessment_task(task_id: str) -> None:
    task = assessment_tasks[task_id]
    task.status = AssessmentTaskStatus.running
    task.total = task.question_count

    try:
        for index in range(task.question_count):
            if not task.source_text:
                raise ValueError("Assessment task has no source text")

            request = MCQGenerateRequest(
                chapter=task.chapter,
                source_text=task.source_text,
                difficulty="hard" if index % 3 == 2 else "medium" if index % 3 == 1 else "easy",
                textbook=task.textbook,
                question_count=1,
            )
            response = await generate_mcq(request)
            task.questions.extend(response.questions)
            task.progress = index + 1

        task.status = AssessmentTaskStatus.completed
    except Exception as exc:
        task.status = AssessmentTaskStatus.failed
        task.error = str(exc)
        logger.exception("Assessment generation failed")


async def start_assessment_task(chapter: Optional[str], source_text: str, textbook: str, question_count: int) -> AssessmentTask:
    task_id = str(uuid.uuid4())
    task = AssessmentTask(
        task_id=task_id,
        chapter=chapter,
        textbook=textbook,
        question_count=question_count,
        progress=0,
        total=question_count,
        status=AssessmentTaskStatus.pending,
        questions=[],
    )
    task.source_text = source_text
    assessment_tasks[task_id] = task

    asyncio.create_task(_build_assessment_task(task_id))
    return task


async def get_assessment_status(task_id: str) -> AssessmentTask:
    task = assessment_tasks.get(task_id)
    if not task:
        raise KeyError("Task not found")
    return task


async def report_answer(request: AnswerReportRequest) -> StatsResponse:
    stats_store["total_answers"] += 1
    if request.is_correct:
        stats_store["correct_answers"] += 1

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
