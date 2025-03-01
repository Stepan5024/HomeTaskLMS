from ai_connection import GPTModel
import json
import nemo.collections.asr as nemo_asr

gpt_model = GPTModel()
def speech_to_text():
    asr_model = nemo_asr.models.EncDecRNNTBPEModel.from_pretrained("nvidia/stt_ru_conformer_transducer_large")
    output = asr_model.transcribe(['sample.wav'])
    print(output[0].text)


def check_homework(homework: str):
    # Отправляем проверку дз в гпт
    # Сохраняем в бд результаты проверки
    # Отправлем ответ пользователю

    with open("database/criterias.json", "r", encoding="utf-8") as file:
        criterias = json.load(file)
    with open("database/exemplars.json", "r", encoding="utf-8") as file:
        exemplars = json.load(file)
    student_answer = "Agile — это методология, которая помогает управлять проектами. Мы начали с планирования спринта, где посмотрели задачи в бэклоге. Стейкхолдеры были не очень активны, но мы все равно смогли закончить спринт. В конце мы провели встречу, чтобы обсудить результаты. В будущем нужно больше вовлекать стейкхолдеров."
    answer = gpt_model.request_to_check_homework(str(criterias), str(exemplars), student_answer)
    print(answer)
    with open("database/student_results.json", "a", encoding="utf-8") as result_file:
        result_file.write(answer)

speech_to_text()