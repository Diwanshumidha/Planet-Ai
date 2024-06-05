# Client-Side Application

## Overview

This client-side application is built using React and interacts with a FastAPI backend to upload files, generate answers, and delete files. The user can upload PDF, DOCX, or TXT files, ask questions related to the content of the uploaded files, and manage the uploaded files.

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

## Installation

1. Clone the repository:
2. Install the required packages:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

### Running the Application

To start the client-side application, run:

```bash
npm start
# or
yarn start
```

The application will start on `http://localhost:5173`.

### Available Scripts

In the project directory, you can run:

#### `npm start` or `yarn start`

Runs the app in development mode.
Open `http://localhost:3000` to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Features

### File Upload

- Upload PDF, DOCX, or TXT files to the backend.
- Supported file types are validated before upload.

### Generate Answers

- Ask questions related to the content of the uploaded files.
- Receive answers generated using the backend's AI capabilities.

### File Management

- View a list of uploaded files.
- Delete files from the backend.

## API Integration

### File Upload

To upload a file, the `FileUpload` component sends a POST request to the `/file/upload` endpoint of the backend API.

### Generate Answer

To generate an answer, the `QuestionForm` component sends a POST request with the filename and message to the `/answer` endpoint of the backend API.

### Delete File

To delete a file, the `FileList` component sends a DELETE request to the `/file/delete/{filename}` endpoint of the backend API.

## Environment Variables

Create a `.env` file in the root of the project to define environment variables. Example:

```
VITE_SERVER_BASE_PATH=http://localhost:8000
```
