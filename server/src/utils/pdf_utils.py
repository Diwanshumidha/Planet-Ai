from PyPDF2 import PdfReader
from fastapi import UploadFile
from langchain.text_splitter import RecursiveCharacterTextSplitter
# import docx
from docx import Document

from logger import logger


async def get_text_from_file(file: UploadFile):
  """Extracts text from a file based on its content type."""
  content_type = file.content_type

  if content_type == "application/pdf":
    text =  get_text_from_pdf(file)
  elif content_type == "text/plain":
    text = await get_text_from_txt(file)
  elif content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    text =  get_text_from_docx(file)


  return text

async def get_text_from_txt(txt: UploadFile):
  """Extracts text from a text file (assuming UTF-8 encoding)."""
  try:
    text = await txt.read()
    text = text.decode("utf-8")
    return text  # Remove unnecessary print statement
  except Exception as e:
    logger.error(f"Error reading text file: {e}")
    return None


def get_text_from_pdf(pdf):
    text=""
    pdf_reader= PdfReader(pdf.file)
    for page in pdf_reader.pages:
        text+= page.extract_text()
    return  text

def get_text_from_docx(doc):
    text = ""
    doc = Document(doc.file)
    for para in doc.paragraphs:
        text += para.text
    return text




def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

