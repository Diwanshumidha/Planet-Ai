from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from dotenv import load_dotenv
from logger import logger 

from routes.GenerationRoutes import generation_router


app = FastAPI()
load_dotenv()

logger.info("Starting the app......")

app.include_router(generation_router)






