from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from dotenv import load_dotenv
from logger import logger 
from fastapi.middleware.cors import CORSMiddleware

from routes.GenerationRoutes import generation_router



app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()

logger.info("Starting the app......")

app.include_router(generation_router)






