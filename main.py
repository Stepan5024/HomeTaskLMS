from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from handlers import router
import uvicorn

app = FastAPI()

app.include_router(router)

allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://frontend:3000",
    "https://adapstory.com",
    "https://www.adapstory.com",
    "https://adapstory.ru",
    "https://www.adapstory.ru",
    "https://45.12.114.84",
    "http://45.12.114.84",
    r"http://123.123.123.1(:/d+)",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https?://(?:[a-zA-Z0-9-]+\.)*\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="debug")
