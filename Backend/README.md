# Restoping - Backend

This is the backend API for the Restoping application, built with Node.js and Express.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (via Knex.js, Sequelize, and mysql2 drivers)
- **Authentication**: JWT, Google Auth Library, Bcrypt
- **AI Integration**: Huggingface Inference, Xenova Transformers
- **File Storage**: Vercel Blob, Multer
- **Emails**: Nodemailer

## Prerequisites

- Node.js (v18 or higher recommended)
- MySQL Database

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the Backend directory. You can use `.env.example` as a template if it exists, otherwise ensure you set the necessary variables for:
   - Database connection (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
   - JWT Secret
   - Email configuration
   - AI service keys (if applicable)

3. **Database Migration**
   (Add migration commands here if you have knex migrations, e.g., `npx knex migrate:latest`)

## Running the Server

### Development
```bash
npm start
```
This runs `npx nodemon src/index.js` watching for changes.

### Production
Ensure environment variables are set for production and run using a process manager or deploy to your hosting provider (e.g., Vercel).

## API Documentation

(Add information about API endpoints here)
