from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import StatsResponse
from .services import get_stats

app = FastAPI(
    title="Math Buddy Backend",
    description="Math Buddy backend without AI integrations.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/stats", response_model=StatsResponse)
async def api_stats() -> StatsResponse:
    return await get_stats()
