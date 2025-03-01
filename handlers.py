from fastapi import APIRouter, FastAPI, File, UploadFile, HTTPException, Body
import moviepy
from fastapi.responses import JSONResponse
import os
from service import process_checking, ask_gpt
from pydub import AudioSegment
from uuid import uuid1
from pydantic import BaseModel

class QuestionRequest(BaseModel):
    question: str  # Обязательное строковое поле

UPLOAD_DIR = "videos"
router = APIRouter(prefix="/api/v1", tags=["file"])

@router.post("/homework/upload_file")
async def upload_video(file: UploadFile = File(...)):
    # Проверяем, что файл имеет формат mp4
    if file.content_type != "video/mp4":
        raise HTTPException(
            status_code=400, detail="Файл должен быть в формате MP4")
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Укажите путь к вашему видеофайлу
    video_path = f"videos/{file.filename}"

    # Укажите путь для сохранения аудиофайла
    save_filename = f"{uuid1()}.wav"
    audio_path = f"videos/{save_filename}"

    # Загрузите видео
    video = moviepy.VideoFileClip(video_path)

    # Извлеките аудио
    audio = video.audio

    # Сохраните аудио в файл
    audio.write_audiofile(audio_path)

    # Закройте видео и аудио
    video.close()
    audio.close()

    # Загрузите аудиофайл
    audio = AudioSegment.from_file(f"videos/{save_filename}")

    # Преобразуйте в моно
    audio = audio.set_channels(1)

    # Сохраните результат
    audio.export(f"videos/{save_filename}", format="wav")
    return process_checking(save_filename)

@router.post("/question")
def question(question = Body()):
    return {"answer": ask_gpt(question['question'])}