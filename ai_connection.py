from openai import OpenAI


class GPTModel:
    api_key = "sk-UjgGs8wc2grEbfIRxDnYzvQIa41L2iji"
    base_url = "https://api.proxyapi.ru/openai/v1"
    model = "gpt-3.5-turbo"

    client = OpenAI(api_key=api_key, base_url = base_url)

    result_example = str ({
      "criteria_type": "Номер критерия",
      "explanation": "Объяснение за что поставлена оценка",
      "rate": "Оценка не превосходящая максимальную "
    })

    # Цепочка запросов
    def request_to_check_homework(self, criterias: str, examplers: str, feedback:str, student_homework: str):
        # Получить аргументы и факты
        useful_info = self.extract_useful_info(student_homework)

        # Проверка формальным критериям да - нет
        verdict = self.check_for_criteria(criterias, useful_info, student_homework)
        if verdict == "Нет":
            return self.why_incorrect(criterias, useful_info, student_homework)

        # Выставление оценки по всем критериям отдельно
        rates = self.rate_homework(criterias, useful_info, student_homework)

        # Проверка у арбитра Есть ли поводы для сомнений
        check_result = self.second_check(useful_info, student_homework, rates)
        if check_result == "Да":
            md_file = self.make_md(criterias, rates)
            return {
            "code": -1,
            "MD_FILE": rates,
            "result": None,
            "transcription": student_homework}# Отправляем преподу

        # Итоговая оценка
        summary = self.summary_rate(rates)

        # Формирование md файла
        md_file = self.make_md(criterias, rates)
        return {
            "code": 0,
            "MD_FILE": md_file,
            "result": summary,
            "transcription": student_homework
        }

    # Получение полезной информации
    def extract_useful_info(self, student_homework: str):
        start_text = """
        Проанализируй текст и извлеки из него полезную информацию. Структурируй данные в формате JSON, выделяя аргументы, факты и знания. Убедись, что информация точна, релевантна и не содержит избыточных данных. Формат ответа:

```json
{
  "аргументы": [],
  "факты": [],
  "знания": []
}
```
В поле "аргументы" добавь утверждения, которые используются для обоснования или опровержения какой-либо позиции.

В поле "факты" включи проверяемые и объективные данные, такие как даты, события, статистика и т.д.

В поле "знания" добавь обобщенные идеи, принципы или концепции, которые могут быть полезны для понимания темы.

Если какой-либо из разделов не применим, оставь его пустым. Убедись, что текст анализируется максимально тщательно.
        """
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": start_text},
                {"role": "user",
                 "content": student_homework}
            ]
        )
        response = completion.choices[0].message.content
        return response

    def check_for_criteria(self, criterias: str, useful_info: str, student_homework: str):
        start_text = "Прверь формальные требование по этим критериям и скажи одним словом Да/Нет смог ли пользователь набрать ПО ВСЕМ критериями больше чем 30%"
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": start_text},
                {"role": "system",
                 "content": criterias},
                {"role": "user",
                 "content": useful_info + student_homework},
            ]
        )
        response = completion.choices[0].message.content
        return response

    def rate_homework(self, criterias: str, useful_info: str, student_homework: str):
        start_text = "Оцени дз по критериям и дай пояснения с оценкой от 0 до 10. Формат вывода: Название критерия Оценка Пояснение"
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": start_text},
                {"role": "system",
                 "content": criterias},
                {"role": "user",
                 "content": useful_info + student_homework}
            ]
        )
        response = completion.choices[0].message.content
        return response

    def second_check(self, useful_info, student_homework, rates):
        start_text = """
        Системный промпт:
«Ты — строгий и дотошный проверяющий домашних заданий. Твоя задача — критически анализировать решения, фокусируясь на крайне спорных или неоднозначных моментах. Даже если ошибка кажется малозначительной или субъективной, но есть риск, что её пропустили, считай это недочётом. Всегда сомневайся в случаях, где:

Решение «на грани» правильного и неправильного.

Есть альтернативные трактовки условий.

Логика аргументации вызывает вопросы.

Формат ответа: только «Да» или «Нет» (одним словом). Если хотя бы один пункт выше вызывает сомнение — отвечай «Нет».»"""
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": start_text},
                {"role": "system",
                 "content": rates},
                {"role": "system",
                 "content": useful_info + student_homework}
            ]
        )
        response = completion.choices[0].message.content
        return response

    def why_incorrect(self, criterias, useful_info, student_homework):
        start_text = "Напиши объяснение почему дз пользователя не соответсвует критериям"
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": start_text},
                {"role": "system",
                 "content": criterias},
                {"role": "user",
                 "content": useful_info + student_homework}
            ]
        )
        response = completion.choices[0].message.content
        return response

    def summary_rate(self, rates):
        start_text = "Напиши итоговую оценку от 0 до 10 по промежуточным и выведи и сделай краткие выводы по критериям"
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": start_text},
                {"role": "system",
                 "content": rates},
            ]
        )
        response = completion.choices[0].message.content
        return response

    def make_md(self, criteria, rates):
        start_text = """
        🚀 Оценка работы: [краткая тема]
📌 Критерий 1: Оценка (числовое значение) [🟢/🟡/🔴] + комментарий (1-2 строки)

📌 Критерий 2: Оценка (числовое значение) [🟢/🟡/🔴] + комментарий (1-2 строки)

📌 Критерий 3: Оценка (числовое значение) [🟢/🟡/🔴] + комментарий (1-2 строки)

💡 Советы для роста:
[Мотивационная речь + ключевые точки для улучшения. Используй смайлы-акценты 🎯✨]

✨ Напоминание: [Конкретный совет на основе оценок, отличающийся от советов для роста]

Итоговая оценка: 🎯 X/10 🎯
(Где X — итоговая оценка по 10-балльной шкале, подчеркнутая для акцента)

Уточнения для GPT:
Форматирование:

Используй Markdown для выделения заголовков, списков и акцентов.

Обеспечь одинаковое оформление для каждого критерия (🟢/🟡/🔴 в зависимости от оценки).

Итоговая оценка должна быть выделена жирным и подчеркнута (например, 🎯 8/10 🎯).

Советы для роста:

Добавь мотивационную речь с акцентами на улучшение (например, "Ты на верном пути! 🚀 Обрати внимание на...").

Используй смайлы для акцента (✨, 🎯, 🔥).

Напоминание:

Напоминание должно быть конкретным и отличаться от советов для роста (например, "Не забывай проверять грамматику перед отправкой работы!").

Итоговая оценка:

Всегда выводи оценку по 10-балльной шкале, выделяя её жирным и подчеркивая (например, 🎯 7/10 🎯).

Пример вывода:

Обеспечь, чтобы каждый вывод был идентичным по структуре и оформлению, независимо от темы.
        """

        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": start_text},
                {"role": "system",
                 "content": rates + criteria},
            ]
        )
        response = completion.choices[0].message.content
        return response


    def ask_gpt(self, text) -> str:
        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system",
                 "content": "Представь, что ты преподаватель, а я задаю тебе вопрос по теме:"},
                {"role": "user",
                 "content": text}
            ]
        )
        response = completion.choices[0].message.content
        return response
