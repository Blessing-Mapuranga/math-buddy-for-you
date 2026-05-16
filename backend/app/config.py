from pydantic import BaseSettings, Field, HttpUrl


class Settings(BaseSettings):
    gemini_api_key: str = Field(..., env="GEMINI_API_KEY")
    deepseek_api_key: str = Field(..., env="DEEPSEEK_API_KEY")
    deepseek_base_url: HttpUrl = Field("https://api.deepseek.com", env="DEEPSEEK_BASE_URL")
    gemini_base_url: HttpUrl = Field("https://api.gemini.google.com", env="GEMINI_BASE_URL")
    deepseek_model: str = Field("deepseek-r1", env="DEEPSEEK_MODEL")
    gemini_model: str = Field("gemini-3-flash", env="GEMINI_MODEL")
    backend_url: str = Field("http://localhost:5000/api", env="BACKEND_API_BASE")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
