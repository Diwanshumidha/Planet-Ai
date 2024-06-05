import re
import uuid
from langchain.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings



def sanitize_input(filename:str) -> str:
    return re.sub(r'[^a-zA-Z0-9_-]', '_', filename)


def save_to_vector(text_chunks, filename):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)

    # Generate a unique filename for the FAISS index
    sanitized_filename:str = sanitize_input(filename)
    
    unique_filename = f"{sanitized_filename}_{uuid.uuid4().hex}"
    vector_store.save_local("vectors", unique_filename)
    return unique_filename