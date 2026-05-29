from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import (
    AnswerReportRequest,
    AssessmentStartRequest,
    AssessmentStatusResponse,
    ExtractNotesRequest,
    ExtractNotesResponse,
    MCQGenerateRequest,
    MCQGenerateResponse,
    SolveRequest,
    SolveResponse,
    StatsResponse,
    TeachRequest,
    TeachResponse,
    TextbookParseRequest,
    TextbookParseResponse,
)
from .services import (
    get_assessment_status,
    get_stats,
    parse_textbook_content,
    report_answer,
    start_assessment_task,
    teach_problem,
    extract_notes,
    generate_mcq,
    solve_live_question,
)

app = FastAPI(
    title="Math Buddy Tutor Backend",
    description="Python backend for Math Buddy that routes Gemini 3 Flash and DeepSeek-R1 payloads through a lightweight API.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/parse-textbook", response_model=TextbookParseResponse)
async def api_parse_textbook(request: TextbookParseRequest) -> TextbookParseResponse:
    try:
        return await parse_textbook_content(
            request.chapter_text,
            local_json_data=request.local_json_data,
            chapter=request.chapter,
            textbook=request.textbook,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/teach", response_model=TeachResponse)
async def api_teach(request: TeachRequest) -> TeachResponse:
    try:
        return await teach_problem(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/extract-notes", response_model=ExtractNotesResponse)
async def api_extract_notes(request: ExtractNotesRequest):
    try:
        return await extract_notes(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/generate-mcq", response_model=MCQGenerateResponse)
async def api_generate_mcq(request: MCQGenerateRequest):
    try:
        return await generate_mcq(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/solve", response_model=SolveResponse)
async def api_solve(request: SolveRequest) -> SolveResponse:
    try:
        return await solve_live_question(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.api_route("/api/solve", methods=["GET", "PUT", "PATCH", "DELETE", "OPTIONS"])
async def api_solve_method_not_allowed():
    raise HTTPException(
        status_code=405,
        detail="Method not allowed. Use POST /api/solve with { question: string, topic?: string }.",
    )


@app.post("/api/start-assessment", response_model=AssessmentStatusResponse)
async def api_start_assessment(request: AssessmentStartRequest):
    task = await start_assessment_task(request.chapter, request.source_text, request.textbook, request.question_count)
    return AssessmentStatusResponse(
        success=True,
        task_id=task.task_id,
        status=task.status,
        progress=task.progress,
        total=task.total,
        questions=None,
        error=None,
    )


@app.get("/api/assessment-status/{task_id}", response_model=AssessmentStatusResponse)
async def api_assessment_status(task_id: str):
    try:
        task = await get_assessment_status(task_id)
        return AssessmentStatusResponse(
            success=True,
            task_id=task.task_id,
            status=task.status,
            progress=task.progress,
            total=task.total,
            questions=task.questions if task.status == "completed" else None,
            error=task.error,
        )
    except KeyError:
        raise HTTPException(status_code=404, detail="Assessment task not found")


@app.post("/api/report-answer", response_model=StatsResponse)
async def api_report_answer(request: AnswerReportRequest) -> StatsResponse:
    try:
        return await report_answer(request)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.get("/api/stats", response_model=StatsResponse)
async def api_stats() -> StatsResponse:
    return await get_stats()
