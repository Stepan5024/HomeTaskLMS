from ai_connection import GPTModel
import moviepy
import json
import nemo.collections.asr as nemo_asr
import os

#print(torch.version.cuda)

UPLOAD_DIR = "videos"
gpt_model = GPTModel()

def process_checking(filename: str) -> str:
    # Преобразовываем в текст
    text = speech_to_text(f"videos/{filename}")

    # Проверяем дз
    check_result = check_homework(text)
    return check_result

# Нейросеть по транскрибации
def speech_to_text(path: str) -> str:
    asr_model = nemo_asr.models.EncDecRNNTBPEModel.from_pretrained("nvidia/stt_ru_conformer_transducer_large") # Аналог stt_en_conformer_ctc_large
    output = asr_model.transcribe([path])
    return output[0][0]


# Проверка домашнего задания, текст
def check_homework(student_answer: str) -> str:
    # Запрос данных
    with open("2-POST criteria.json", "r", encoding="utf-8") as file:
        criterias = json.load(file)
    with open("3-POST Examplars.json", "r", encoding="utf-8") as file:
        exemplars = json.load(file)
    with open("1-GET Feedback.json", "r", encoding="utf-8") as file:
        feedback = json.load(file)
    answer = gpt_model.request_to_check_homework(str(criterias), str(exemplars), str(feedback), student_answer)
    return answer

def ask_gpt(text: str):
    return gpt_model.ask_gpt(text)