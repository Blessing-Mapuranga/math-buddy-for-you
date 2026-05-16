# Math Buddy Python Backend

This Python backend routes the Math Buddy frontend to DeepSeek-R1 and Gemini 3 Flash.

## Endpoints

- `POST /api/parse-textbook` — textbook parsing with Gemini 3 Flash
- `POST /api/teach` — DeepSeek-R1 teaching and derivation output
- `POST /api/extract-notes` — study note extraction from chapter text
- `POST /api/generate-mcq` — MCQ generation aligned with engineering syllabus difficulty
- `POST /api/start-assessment` — start a 50-question assessment generation job
- `GET /api/assessment-status/{task_id}` — poll assessment progress and fetch results
- `POST /api/report-answer` — update answer tracking statistics
- `GET /api/stats` — return user progress totals and accuracy

## Setup

1. Create a virtual environment.
2. Install dependencies:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

3. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` and `DEEPSEEK_API_KEY`.

4. Start the server:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

## Notes

- The frontend is configured to use `http://localhost:5000/api` by default.
- The Flutter stub in `backend/flutter` shows how to call the same API from a Dart/Flutter app.
