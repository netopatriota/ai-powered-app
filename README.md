# AI-Powered Translation App

Este projeto é um aplicativo de tradução alimentado por IA que utiliza React para o front-end e FastAPI para o back-end, integrando-se com a API da OpenAI para realizar traduções.

![screenshot](front-end/src/images/screenshot_app.PNG)

## Início Rápido

### Pré-requisitos

- Node.js e npm
- Python 3.7+ e pip

### Configuração do Ambiente

1. Clone o repositório

2. Configuração do Front-end:

- Navegue até o diretório do front-end:
  ```
  cd front-end
  ```
- Instale as dependências:
  ```
  npm install
  ```
- Inicie o servidor de desenvolvimento:
  ```
  npm start
  ```

3. Configuração do Back-end:

- Crie e ative um ambiente virtual Python:
  ```
  python3 -m venv venv
  source venv/bin/activate
  ```
- Instale as dependências:
  ```
  pip install fastapi uvicorn langchain openai
  ```
- Defina sua chave da API da OpenAI como uma variável de ambiente:
  ```
  export OPENAI_API_KEY="sua-chave-api-aqui"
  ```
- Inicie o servidor FastAPI:
  ```
  uvicorn main:app --reload
  ```

## Uso

Acesse o front-end em `http://localhost:3000`, digite uma sentença em inglês e clique em "Traduzir" para ver a tradução em português.
