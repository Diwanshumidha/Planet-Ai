# README

## Overview

This FastAPI application provides endpoints for uploading, processing, and deleting files. It supports PDF, DOCX, and TXT files, and utilizes Google Generative AI for embeddings and FAISS for vector storage. The application also features a conversational chain service to generate responses based on the uploaded files.

## Prerequisites

- Python 3.8+
- FastAPI
- Pydantic
- LangChain
- FAISS
- asyncio
- Logging
- utils.pdf_utils module
- services.vectorStore module
- services.GenerationService module
- config module for allowed file types

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/your-project.git
   cd your-project
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables as needed in a `.env` file.
   GOOGLE_API_KEY=

## Usage

### Running the Application

To start the FastAPI application, run:

```bash
 fastapi run src/main.py
```

### Endpoints

#### 1. Upload a File

**Endpoint:** `POST /file/upload`

Uploads a file for processing.

**Request:**

- **file**: The file to be uploaded (PDF, DOCX, TXT).

**Response:**

- `200 OK` with metadata about the uploaded file.
- `400 Bad Request` if the file type is not supported.
- `500 Internal Server Error` if an error occurs during processing.

#### 2. Generate Answer

**Endpoint:** `POST /answer`

Processes the provided filename and message to generate an answer.

**Request Body:**

- **filename**: The name of the file to be processed.
- **message**: The question/message to generate an answer for.

**Response:**

- `200 OK` with the generated answer.
- `404 Not Found` if the file is not found.
- `500 Internal Server Error` if an error occurs during processing.

#### 3. Delete a File

**Endpoint:** `DELETE /file/delete/{filename}`

Deletes the specified file and its associated vectors.

**Path Parameter:**

- **filename**: The name of the file to be deleted.

**Response:**

- `200 OK` if the file is successfully deleted.
- `404 Not Found` if the file is not found.
- `500 Internal Server Error` if an error occurs during deletion.

## Logging

This application uses a logger to log information, warnings, and errors. The logs are helpful for debugging and monitoring the application's behavior.

## Error Handling

Custom error handling is implemented to provide meaningful error messages and appropriate HTTP status codes for various failure scenarios, such as file not found, permission issues, and general server errors.
