from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel, Field, validator
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS
import os
import asyncio


from utils.pdf_utils import get_text_chunks,get_text_from_file
from services.vectorStore import save_to_vector
from services.GenerationService import get_conversational_chain
from logger import logger
from config import ALLOWED_TYPES

generation_router = APIRouter()

@generation_router.post("/file/upload")
async def upload_file(file: UploadFile = File()):
    try:
        if not file.content_type in ALLOWED_TYPES:
            return {"error": "Only PDF, DOCX OR TXT files are supported"}
        
        pdf_text = await get_text_from_file(file)
      
        text_chunks = get_text_chunks(pdf_text)
        # Remaining chunks
        chunks = text_chunks[:99]
        remaining_chunks = get_text_chunks(pdf_text)[99:]
       
        saved_filename = save_to_vector(text_chunks=chunks,filename=file.filename)

        logger.info("Successfully Uploaded")

        metadata = {
            "fileId":saved_filename,
            "filename": file.filename,
        }
    
        return {"success":True, "metadata":metadata}
    except Exception as e:
        logger.error(f"Error uploading file: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")


class RequestBody(BaseModel):
    filename: str = Field(..., min_length=3)
    message: str = Field(..., min_length=1)

    @validator('filename', 'message')
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError('must not be empty')
        return v


@generation_router.post("/answer")
def get_body(request_body: RequestBody) -> dict:
    filename = request_body.filename
    message = request_body.message

    try:
       
        vector_path = f"./vectors/{filename}.pkl"
        
        logger.info(f"Loading vector file from: {vector_path}")
        
        if not os.path.exists(vector_path):
            logger.error(f"Vector file {vector_path} not found.")
            raise FileNotFoundError(f"Vector file with Id {filename} is not Valid.")
        
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        new_db = FAISS.load_local("vectors", index_name=filename, embeddings=embeddings, allow_dangerous_deserialization=True)
        
        docs = new_db.similarity_search(message)
        chain = get_conversational_chain()
        response = chain({"input_documents": docs, "question": message}, return_only_outputs=True)
        
        return {"success": True, "answer": response["output_text"]}
    
    except FileNotFoundError as e:
        logger.error(f"File not found error: {e}")
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")


@generation_router.delete("/file/{filename}")
async def delete_file(filename: str):
    """Deletes a file based on the provided filename."""

    try:
        # Construct the path to the vector files with proper path joining
        base_path = "./vectors"
        pkl_file = os.path.join(base_path, f"{filename}.pkl")
        faiss_file = os.path.join(base_path, f"{filename}.faiss")

        # Check if both files exist using a single existence check for efficiency
        if not all(os.path.exists(path) for path in [pkl_file, faiss_file]):
            return {"success": False, "detail": f"File with filename {filename} not found."}

        # Delete both files using exception handling for each
        await asyncio.gather(
            delete_with_exception_handling(pkl_file),
            delete_with_exception_handling(faiss_file),
        )

        return {"success": True}

    except Exception as e:
        logger.error(f"An error occurred while deleting file(s): {e}")
        raise HTTPException(status_code=500, detail="An error occurred while deleting the file(s).")


async def delete_with_exception_handling(file_path: str):
    """Deletes a file with proper error handling."""
    try:
        os.remove(file_path)
    except FileNotFoundError:
        # Log and raise a more specific error for missing files
        logger.error(f"File '{file_path}' not found during deletion.")
        raise HTTPException(status_code=404, detail="File not found.")
    except PermissionError:
        # Log and raise an error indicating permission issues
        logger.error(f"Insufficient permissions to delete file '{file_path}'.")
        raise HTTPException(status_code=403, detail="Permission denied for file deletion.")
    except OSError as e:
        # Catch general OS errors and log specific details
        logger.error(f"An error occurred while deleting file '{file_path}': {e}")
        raise HTTPException(status_code=500, detail="An error occurred while deleting the file.")