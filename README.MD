# Document Handler Backend

A simple Express + TypeScript backend for handling PDF documents using AWS services.

## Features

* User authentication with AWS Cognito
* Upload and store PDF files in AWS S3
* Optional processing with AWS Lambda
* REST API for document management

## Tech Stack

* Node.js + Express
* TypeScript
* AWS Cognito
* AWS S3
* AWS Lambda

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```
PORT=8080
```

## Run the App

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

## API Endpoints

* POST /auth/login

* POST /auth/register

* POST /documents/upload

* GET /documents

* GET /documents/:id

* DELETE /documents/:id

## Notes

* Protected routes require a valid JWT token from Cognito
* Only PDF files are supported
* Files are stored in S3

## License

MIT
