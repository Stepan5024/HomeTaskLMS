from openai import OpenAI


class GPTModel:
    api_key = "sk-UjgGs8wc2grEbfIRxDnYzvQIa41L2iji"
    base_url = "https://api.proxyapi.ru/openai/v1"
    model = "gpt-3.5-turbo"

    client = OpenAI(api_key=api_key, base_url = base_url)

    check_homework_default = ("У нас есть json файл с критериями, с эталонными заданиями, "
                              "и с дз ученика проверь его и выдай результат по макету json_result и поставь оценку по максимальному баллу 10")
    show_stats = "Предоставь статистику по всем этим домашним работам"
    show_progress = "Расскажи по шагам, что можно улучшить в каждом этом критерии"

    result_example = str ({
      "criteria_type": "Номер критерия",
      "explanation": "Объяснение за что поставлена оценка",
      "rate": "Оценка не превосходящая максимальную "
    })

    def request_to_check_homework(self, criterias: str, examplers: str, student_homework: str):
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "user",
                 "content": self.check_homework_default},
                {"role": "user",
                 "content": examplers},
                {"role": "user",
                 "content": criterias},
                {"role": "user",
                 "content": student_homework},
                {"role": "system",
                 "content": self.result_example}
            ]
        )

        response = completion.choices[0].message.content
        return response

