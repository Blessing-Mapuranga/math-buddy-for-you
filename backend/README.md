# Math Buddy Python Backend

This Python backend supports Math Buddy with a small statistics endpoint.

## Endpoints

- `GET /api/stats` — return user progress totals and accuracy

## Setup

1. Create a virtual environment.
2. Install dependencies:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

3. Start the server:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

## Notes

- The frontend is configured to use `http://localhost:5000/api` by default.
- This backend no longer includes AI integration.
