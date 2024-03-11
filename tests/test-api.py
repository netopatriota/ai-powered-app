import requests

url = "http://localhost:3000/translate"
sentence_to_translate = "Translate this sentence to Portuguese."

response = requests.post(url, json={"sentence": sentence_to_translate})

if response.status_code == 200:
    translated_sentence = response.json().get("translated_sentence")
    print(f"Translated sentence: {translated_sentence}")
else:
    print(f"Error: {response.status_code} - {response.text}")
