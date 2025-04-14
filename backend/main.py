from fastapi import FastAPI, Request
from pydantic import BaseModel
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm= Ollama(model="llama3")

class NotesInputs(BaseModel):
    notes:list[str]


@app.post("/summarize-notes")
async def summarize_notes(data:NotesInputs):
    combined_notes="\n\n".join(data.notes)
    prompt=PromptTemplate.from_template(
        "Summarize the following notes briefly:\n\n{notes}"
    )
    chain =LLMChain(llm=llm, prompt=prompt)
    summary=chain.run(notes=combined_notes)
    return{"summary":summary}


if __name__ == "__main__":
    uvicorn.run("main:app", port=8001, reload=True)