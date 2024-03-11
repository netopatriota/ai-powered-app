import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get('OPENAI_API_KEY'),
)

chat_completion = client.chat.completions.create(
    messages=[
        {"role": "user", "content": "Diga que isso é um teste"},
    ],
    model="gpt-3.5-turbo",
)

response_content = chat_completion.choices[0].message.content
print(response_content)

