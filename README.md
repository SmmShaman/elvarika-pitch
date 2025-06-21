# Elvarika Pitch

Elvarika is a text-to-speech demo platform with a React 18 frontend and an Express backend. TypeScript is used across the stack and Drizzle ORM integrates a PostgreSQL database. The app can run locally or inside Docker, and a GitHub workflow deploys to Google Cloud Run.

## Project Structure

- **client/** – Vite based React application
- **server/** – Express API with email verification
- **shared/** – database schema and validation
- **Dockerfile** – multi stage container build
- **.github/workflows/deploy.yml** – Cloud Run deployment pipeline

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL instance for production (`DATABASE_URL`)

## Environment Variables

Set the following variables for a working setup:

- `GMAIL_EMAIL` – Gmail address used to send verification mails
- `GMAIL_APP_PASSWORD` – app password for the Gmail account
- `DATABASE_URL` – PostgreSQL connection string
- `REPLIT_DOMAINS` – comma separated domains when running on Replit
- `BASE_URL` – fallback public URL for verification links
- `RESEND_API_KEY`, `BREVO_API_KEY` – optional keys for alternative email services

## Useful Commands

- `npm run dev` – start Express and Vite in development mode
- `npm run build` – compile client and server into `dist/`
- `npm start` – run the compiled production server

## Deployment

The included `Dockerfile` builds the application and starts it on port 8080. The workflow in `.github/workflows/deploy.yml` builds this image and deploys it to Google Cloud Run whenever the `main` branch is updated.
