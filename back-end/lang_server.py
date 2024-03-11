import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()
OPEN_API_KEY = os.getenv("OPEN_API_KEY")
APP_PORT = int(os.getenv("APP_PORT", "8001"))

# Instantiate the language model with the API key
language_model = ChatOpenAI(openai_api_key=OPEN_API_KEY)

# Define the prompt template and output parser
prompt_template = ChatPromptTemplate.from_messages([
    ("system", "Traduzir a seguinte frase para o português: {sentence}"),
])

output_parser = StrOutputParser()

# Configure the language processing chain
processing_chain = prompt_template | language_model | output_parser

# Initialize the FastAPI application with basic metadata
app = FastAPI(
    title="Servidor LangChain",
    version="1.0",
    description="Um servidor de API simples usando as interfaces Runnable do Langchain.",
)

# Configure CORS middleware
# NOTE: In production, restrict 'allow_origins' to specific domains for greater security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Open to all domains for demo convenience
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Add routes to the application
add_routes(app, processing_chain, path="/translate")

# Entry point for server execution
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=APP_PORT)
