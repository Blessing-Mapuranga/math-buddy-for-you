from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    backend_url: str = Field("http://localhost:5000/api", env="BACKEND_API_BASE")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
